from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, FileResponse
from docxtpl import DocxTemplate
from num2words import num2words
import math
import os
import io
from docx import Document
from datetime import datetime
from datetime import date
from django.views.static import serve


import json
from .models import  OpenTender,Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus
from .models import Vendor,Employee,TECC,BODC,QR,Indenter
from .models import *
from .functions_need import *
from django.forms.models import model_to_dict

def createsq(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid = Bid(
            indent_number = data['indent_no'],
            bid_subject = data['subject'],
            bid_type = 'SpotQuotation',
            tender_category =  data['tendertype'],
            contract_type = data['contracttype'],
            product_category = data['productcategory'],
        )
        bid.save()
        proposal = Proposal(
            bid = bid,
            proposalRefNo = data['proposalDetails']['proposalRefNo'],
            proposalDate = getDate(data['proposalDetails']['proposalDate']),
            proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
            proposalApprovedDate = getDate(data['proposalDetails']['proposalApprovedDate']),
            indentDept = data['proposalDetails']['indentDept'],
            indentDesignation = (Employee.objects.get(id = data['proposalDetails']['indentedBy']["id"])).designation
        )
        proposal.save()
        indenter = Indenter(
            bid = bid,
            indenter = Employee.objects.get(id = data['proposalDetails']['indentedBy']["id"])
        )
        indenter.save()
        sqdetails = SpotQuotationDetails(
            bid = bid,
            estCost = data["amountDetails"]["estCost"],
            completionperiod = str(data["completionperiod"]) + " " + data["durationmeasured"],
            gstIncl = data["amountDetails"]["gstIncl"],
            emdwaivedoff = data["amountDetails"]["emdwaivedoff"]
        )
        sqdetails.save()
        changeStatus(bid,"Recieved SpotQuotation Proposal")
        return JsonResponse({'success':True})
    except Exception as e:
        pass
        return JsonResponse({'success':False})

def prepare_sq_enquiry_doc(bid):
    """
    Prepare Spot Quotation Enquiry Document with the Same Procedure as Docxtemplate rendering
    """
    sqdetails = SpotQuotationDetails.objects.get(bid = bid)
    sqenquirydetails = SpotEnquiryDetails.objects.get(bid = bid)
    indent_no = str(bid.indent_number)
    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'delivery_days' : sqdetails.completionperiod,
        'special_conditions' : sqenquirydetails.includeSpecialConditions,
        'engineer_incharge' : sqenquirydetails.engineerInchargeDesignation + ', ' + sqenquirydetails.engineerInchargeDepartment,
    }
    context['delivery_contract'] = 'Delivery' if bid.tender_category == 'Goods' else 'Contract'
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_SpotEnquiry"
    doc = DocxTemplate("Template_Spot_Enquiry.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"

def createsqenquiry(request):
    """
        1. Create a row in SpotEnquiry Details table with Engineer Incharge Details
        2. Then prepare enquiry document by calling function prepare_sq_enquiry_doc
        3. Send the Document as FileResponse
        4. No try/catch .. Exception handling. Let Internal Server Errors reach the front end
    """
    data = json.loads(request.body.decode('utf-8'))
    bid  = Bid.objects.get(indent_number = data['indentNo'])
    sqenquirydetails = SpotEnquiryDetails(
        bid = bid,
        engineerInchargeDesignation =  data['engineerInchargeDesg'],
        engineerInchargeDepartment = data['engineerInchargeDept'],
        includeSpecialConditions = data['specialConditions'],
        enquirydate = date.today(),
    )
    sqenquirydetails.save()
    res = prepare_sq_enquiry_doc(bid)
    response = send_file_docx(res)
    changeStatus(bid,"Spot Enquiry Prepared for Vetting")
    return response

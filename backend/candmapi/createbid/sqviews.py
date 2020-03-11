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
        import pdb; pdb.set_trace()
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

def prepare_sq_tec_doc(bid):
    """
    Prepare Spot Quotation Committe Report Document with the Same Procedure as Docxtemplate rendering
    """
    sqdetails = SpotQuotationDetails.objects.get(bid = bid)
    sqenquirydetails = SpotEnquiryDetails.objects.get(bid = bid)
    proposalDetails = Proposal.objects.get(bid = bid)
    comMembers = SpotQuotationCommittee.objects.filter(bid = bid)
    participatedbidders = participatedBidders.objects.filter(bid = bid)
    pbs = participatedBidders.objects.filter(bid = bid)
    bqs = biddersquotedetails.objects.filter(bid = bid)
    indent_no = str(bid.indent_number)
    bqs2 = list(bqs)
    bqs1 = sorted(bqs2,key = lambda obj1: obj1.quoteamount)
    l1bq = bqs1[0]
    submitted_vendors = []


    for pb in pbs:
        bqvn = bqs.get(vendor = pb.vendor)
        s_vendor = {
            'name' : pb.vendor.name,
            'quoteamnt' : bqvn.quoteamount,
            'status' : 'L'+str(bqs1.index(bqvn)+1),
            'remarks' : pb.remarks
        }
        submitted_vendors.append(s_vendor)


    if l1bq.quoteamount<sqdetails.estCost:
        l1_est_diff = 'less'
        l1_est_percent = round(((sqdetails.estCost-l1bq.quoteamount)*100)/sqdetails.estCost,2)
    else:
        l1_est_diff = 'greater'
        l1_est_percent = -1 * round(((sqdetails.estCost-l1bq.quoteamount)*100)/sqdetails.estCost,2)

    committe_members = []
    for comMem in comMembers:
        c_mem = {
            'name': comMem.committeeMember.name,
            'designation': comMem.committeeMember.designation,
            'department': 'DEPARTMENT'
        }
        committe_members.append(c_mem)

    l1_vendor = {
        'name' : l1bq.vendor.name,
        'quoteamnt': str(l1bq.quoteamount),
        'qouteamntwords': amount2words(l1bq.quoteamount),
        'great_less': l1_est_diff,
        'diff_percent': l1_est_percent
    }

    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'proposal_ref_no' : proposalDetails.proposalRefNo,
        'proposal_date': proposalDetails.proposalDate,
        'estCost': sqdetails.estCost,
        'committee_members': committe_members,
        'sq_enquiry_date': datetime.strftime(sqenquirydetails.enquirydate,"%d.%m.%Y"),
        'sq_bod_date': datetime.strftime(sqenquirydetails.bidopeningdate,"%d.%m.%Y"),
        'submitted_vendors': submitted_vendors,
        'l1_vendor': l1_vendor,
        'gstIncl': 'Inclusive of GST' if sqdetails.gstIncl else 'Exclusive of GST',
        'no_parties_words': amount2words(len(bqs2))
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_CommitteeReport"
    doc = DocxTemplate("Template_SQ_Committee_Report.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"



def preparesqtec(request):
    """
        1.Get the request with form details of TEC
        2.Store the details of Committee Members, Participated Bidders, and dates of Spot Enquiry and Bid bidopeningdate
        3.Then Prepare SQ TEC Report by calling function prepare_sq_tec_doc
        4.Send the Document as FileResponse
        5.No try/catch .. Exception handling. Let Internal Server Errors reach the front end
    """
    data = json.loads(request.body.decode('utf-8'))
    bid  = Bid.objects.get(indent_number = data['indentNo'])
    sqenquirydetails = SpotEnquiryDetails.objects.get(bid = bid)
    for comMember in data['committeemembers']:
        sqComMem = SpotQuotationCommittee(
            bid = bid,
            committeeMember = Employee.objects.get(id = comMember["id"])
        )
        sqComMem.save()
    sqenquirydetails.enquirydate = getDate(data["sqenquirydate"])
    sqenquirydetails.bidopeningdate = getDate(data["sqboddate"])
    sqenquirydetails.save()
    for participatedVendor in data["participated_bidders"]:
        pb = participatedBidders(
            bid = bid,
            vendor = Vendor.objects.get(id = participatedVendor['vendor']['id']),
            remarks = participatedVendor['remarks']
        )
        pb.save()
        pbq = biddersquotedetails(
            bid = bid,
            vendor = Vendor.objects.get(id = participatedVendor['vendor']['id']),
            quoteamount = participatedVendor['quoted_amount']
        )
        pbq.save()
    changeStatus(bid,"Committee Report Prepared for Vetting")
    res = prepare_sq_tec_doc(bid)
    response = send_file_docx(res)
    return response

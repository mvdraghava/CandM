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

from .views import *

import json
from .models import  OpenTender,Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus
from .models import Vendor,Employee,TECC,BODC,QR,Indenter
from .models import *
from .functions_need import send_file_docx, amount2words
from django.forms.models import model_to_dict

def getDate(datestr):
    try:
        datestr = datestr.split('T')[0]
        d1 = datetime.strptime(datestr,'%Y-%m-%d')
        return d1
    except Exception as e:
        return None

def changeStatus(bid,status):
    try:
        bids = BidStatus.objects.get(bid=bid)
        bids.bid_status = status
        bids.save()
    except:
        bids  =  BidStatus(
            bid = bid,
            bid_status = status
        )
        bids.save()

def get_ref_no(bid):
    if(bid.bid_type == "OpenTender"):
        et = EprocTender.objects.get(bid = bid)
        ref_no = "SRLDC/C&M/ET-"+str(et.etNo)+"/I-"+str(bid.indent_number)+"/2019-20"
        return ref_no
    else:
        ref_no = "SRLDC/C&M/I-"+str(bid.indent_number)+"/2019-20"
        return ref_no
def getDocPrice(est_cost):
    doc_price = 0
    if est_cost<=2500000:
        doc_price = 1250
    elif est_cost>2500000 and est_cost<=5000000:
        doc_price = 2000
    elif est_cost>5000000 and est_cost<=10000000:
        doc_price = 2500
    elif est_cost>10000000 and est_cost<=20000000:
        doc_price = 5000
    elif est_cost>20000000 and est_cost<=50000000:
        doc_price = 12500
    elif est_cost>50000000:
        doc_price = 25000
    return doc_price

def getEmdPrice(est_cost):
    return round(math.ceil((est_cost*0.02)/1000.0)*1000.0)


def createlte(request):
    data = json.loads(request.body.decode('utf-8'))
    bid = Bid(
        indent_number = data['indent_no'],
        bid_subject = data['subject'],
        bid_type = 'LTE'
    )
    bid.save()
    proposal = Proposal(
        bid = bid,
        proposalRefNo = data['proposalDetails']['proposalRefNo'],
        proposalDate = getDate(data['proposalDetails']['proposalDate']),
        proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
        indentDept = data['proposalDetails']['indentDept']
    )
    proposal.save()
    indenter = Indenter(
        bid = bid,
        indenter = Employee.objects.get(id = data['proposalDetails']['indentedBy']["id"])
    )
    indenter.save()
    ltedetails = LteDetails(
        bid = bid,
        estCost = data["amountDetails"]["estCost"],
        gstIncl = data["amountDetails"]["gstIncl"],
        emdwaivedoff = data["amountDetails"]["emdwaivedoff"],
        noteby = Employee.objects.get(id = data["noteby"]["id"]),
        notedate = getDate(data["notesheetdate"])
    )
    ltedetails.save()
    for vendor in data['ltevendors']:
        vn = VendorBid(
            bid = bid,
            vendor = Vendor.objects.get(id = vendor['id'])
        )
        vn.save()
    res = prepare_lte_notesheet(bid)
    response = send_file_docx(res)
    changeStatus(bid,"Created Proposal Notesheet")
    return response

def prepare_lte_notesheet(bid):
    indent_no = str(bid.indent_number)
    proposal = Proposal.objects.get(bid=bid)
    indenter = Indenter.objects.get(bid=bid)
    ltedetails = LteDetails.objects.get(bid=bid)
    ltevendors = VendorBid.objects.filter(bid = bid)
    vendors = []
    for vendor in ltevendors:
        vendor = vendor.vendor
        vn = {
            'name': vendor.name,
            'street1': vendor.street1,
            'city' : vendor.city,
            'state' : vendor.state,
            'pincode' :  str(vendor.pincode)
        }
        if(vendor.street2):
            vn['street2'] = vendor.street2
        if(len(vendor.mobilenos)):
            vn['mobileno'] : "Mobile No:"+vendor.mobilenos[0]
        if(len(vendor.emailids)):
            vn['emailid'] : "EmailId:"+vendor.emailids[0]
        vendors.append(vn)
    context = {
        'ref_no' : get_ref_no(bid),
        'note_date' : datetime.strftime(ltedetails.notedate,"%d.%m.%Y"),
        'subject' : bid.bid_subject,
        'proposal_ref_no' : proposal.proposalRefNo,
        'proposal_date' : datetime.strftime(proposal.proposalDate,"%d.%m.%Y"),
        'estCost' : str(ltedetails.estCost),
        'estCost_words' : amount2words(ltedetails.estCost),
        'proposal_received_date': datetime.strftime(proposal.proposalRecievedDate,"%d.%m.%Y"),
        'vendors' : vendors,
        'emd_price': getEmdPrice(ltedetails.estCost),
        'emd_price_words': amount2words(getEmdPrice(ltedetails.estCost)),
        'note_by' : ltedetails.noteby.name,
        'note_by_designation': ltedetails.noteby.designation
    }
    if(ltedetails.gstIncl):
        context['gst_incl'] = "Inclusive of GST"
    else:
        context['gst_incl'] = "Exclusive of GST"
    if(ltedetails.emdwaivedoff):
        context['emd_waive_off'] = " it is proposed to waive off EMD"
    else:
        context['emd_waive_off'] = " it is proposed to collect EMD"
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_LTE_Notesheet"
    doc = DocxTemplate("Template_LTE_Notesheet.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"

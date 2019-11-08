from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, FileResponse
from docxtpl import DocxTemplate
from num2words import num2words
import math
import os
import io
from docx import Document
from datetime import datetime
from django.views.static import serve

import json
from .models import  OpenTender,Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus
from .functions_need import send_file_docx, amount2words
from django.forms.models import model_to_dict

def getDate(datestr):
    datestr = datestr.split('T')[0]
    d1 = datetime.strptime(datestr,'%Y-%m-%d')
    return d1

#def next_indentnumber(request):
   # return JsonResponse({'indentNumber': increment_indent_number()})


def create_ot_notesheet(data):
    context = {
        'ref_no': '',
        'note_dt': datetime.strftime(getDate(data['noteDetails']['noteDate']),"%d.%m.%Y"),
        'subject': data['tenderDetails']['tenderSubject'],
        'proposal_ref_no': data['proposalDetails']['proposalRefNo'],
        'proposal_date': datetime.strftime(getDate(data['proposalDetails']['proposalDate']),"%d.%m.%Y"),
        'proposal_recieved_date': datetime.strftime(getDate(data['proposalDetails']['proposalRecievedDate']),"%d.%m.%Y"),
        'est_cost': str(int(data['amountDetails']['estCost'])),
        'est_cost_words': '',
        'emd_price': '',
        'emd_price_words': '',
        'doc_price': '',
        'doc_price_words': '',
        'paper_adv_clause': '',
        'intend_dpt': data['proposalDetails']['indentDept'],
        'engineer_incharge': data['proposalDetails']['engineerIncharge'],
        'tender_cat': data['tenderDetails']['tenderCategory'],
        'product_cat': data['tenderDetails']['productCategory'],
        'bid_open_days': '21',
        'note_by': data['noteDetails']['noteBy'],
        'note_by_designation': data['noteDetails']['notebyDesg']
    }
    indent_no = str(data['tenderDetails']['indentNo'])
    context['ref_no'] = "SRLDC/CnM/ET-"+str(data['tenderDetails']['etNo'])+"/I-"+str(data['tenderDetails']['indentNo'])+"/2019-20"
    est_cost = int(context['est_cost'])
    context['est_cost_words'] = amount2words(est_cost)
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
    context['doc_price'] = str(doc_price)
    context['doc_price_words'] = amount2words(doc_price)
    emd_price = round(math.ceil((est_cost*0.02)/500.0)*500.0)
    context['emd_price'] = str(emd_price)
    context['emd_price_words'] = amount2words(emd_price)
    if est_cost<5000000:
        context['paper_adv_clause'] = "The subject proposal NIT estimate is less than 50 Lakhs, as per Clause B4.7.5 (i) (a) of WPPP, the Newspaper advertisement is not required. But the NIT shall be uploaded in CPP Portal and also in SRLDC Website. The copy of NIT shall be sent to all RLDCs, NLDC, KPTCL, BESCOM etc., to display in their respective notice boards  for wide circulation" 
    else:
        context['paper_adv_clause'] = "As per Clause B4.7.5 (i) (a) of WPPP, the details of Newspaper where NIT shall be published together with the cost of publication may be furnished by HR/SRLDC. "
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername)) 
    filename = foldername+"I-"+indent_no+"_OpenTender_Notesheet"
    doc = DocxTemplate("Template_OpenTender_Notesheet.docx")
    doc.render(context)
    doc.save(filename+".docx")
    return filename+".docx"


def changeStatus(bid,status):
    bids  =  BidStatus(
        bid = bid,
        bid_status = status
    )
    bids.save()

def create_ot(request):
    data = json.loads(request.body.decode('utf-8'))
    bid = Bid(
        indent_number = data['tenderDetails']['indentNo'],
        bid_subject = data['tenderDetails']['tenderSubject'],
        bid_type = 'OpenTender'
    )
    bid.save()
    eproc = EprocTender(
        bid = bid,
        etNo = data['tenderDetails']['etNo']
    )
    eproc.save()
    proposal = Proposal(
        bid = bid,
        proposalRefNo = data['proposalDetails']['proposalRefNo'],
        proposalDate = getDate(data['proposalDetails']['proposalDate']),
        proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
        indentDept = data['proposalDetails']['indentDept']
    )
    proposal.save()
    pns = OtProposalNoteSheet(
        bid = bid,
        estCost = data['amountDetails']['estCost'],
        gstIncl = data['amountDetails']['gstIncl'],
        noteDate = getDate(data['noteDetails']['noteDate']),
        noteBy = data['noteDetails']['noteBy'],
        notebyDesg = data['noteDetails']['notebyDesg'],
        tenderCategory = data['tenderDetails']['tenderCategory'],
        productCategory = data['tenderDetails']['productCategory'],
        engineerIncharge = data['proposalDetails']['engineerIncharge'],
        addressConsignee = data['proposalDetails']['addressConsignee']
    )
    pns.save()
    ot = OpenTender(
        bid = bid,
        et = eproc,
        proposal = proposal,
        proposalnotesheet = pns
    )
    ot.save()
    import pdb
    pdb.set_trace()
    res = create_ot_notesheet(data)
    response = send_file_docx(res)
    changeStatus(bid,"Created Proposal Notesheet")
    return response
# Create your views here.

def get_open_bids(request):
    bids_data = []
    for i in range(0,1000):
        bid = {
            'indent_no': i,
            'tender_subject': 'ADSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            'bid_status': 'Created Proposal Notesheet',
            'indent_dept': 'HHDSFGDGDGDGD GDGDGD',
            'bid_type': 'Open Tender'
        }
        bids_data.append(bid)
    return JsonResponse(bids_data,safe=False)
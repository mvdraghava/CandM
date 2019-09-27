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
from .models import  OpenTender,Bid,OpenTender,EprocTender,Proposal,proposalNoteSheet
from .functions_need import send_file_docx, amount2words
from django.forms.models import model_to_dict

def getDate(datestr):
    datestr = datestr.split('T')[0]
    d1 = datetime.strptime(datestr,'%Y-%m-%d')
    return d1

#def next_indentnumber(request):
   # return JsonResponse({'indentNumber': increment_indent_number()})


def create_ot_notesheet(indentNo):
    ot_obj = OpenTender.objects.get(indentNo = indentNo)
    ot_obj = model_to_dict( ot_obj )
    context = {
        'ref_no': '',
        'note_dt': datetime.strftime(ot_obj['noteDate'],"%d.%m.%Y"),
        'subject': ot_obj['tenderSubject'],
        'proposal_ref_no': ot_obj['proposalRefNo'],
        'proposal_date': datetime.strftime(ot_obj['proposalDate'],"%d.%m.%Y"),
        'proposal_recieved_date': datetime.strftime(ot_obj['proposalRecievedDate'],"%d.%m.%Y"),
        'est_cost': str(int(ot_obj['estCost'])),
        'est_cost_words': '',
        'emd_price': '',
        'emd_price_words': '',
        'doc_price': '',
        'doc_price_words': '',
        'paper_adv_clause': '',
        'intend_dpt': ot_obj['indentDept'],
        'engineer_incharge': ot_obj['engineerIncharge'],
        'tender_cat': ot_obj['tenderCategory'],
        'product_cat': ot_obj['productCategory'],
        'bid_open_days': '21',
        'note_by': ot_obj['noteBy'],
        'note_by_designation': ot_obj['notebyDesg']
    }
    indent_no = str(ot_obj["indentNo"])
    context['ref_no'] = "SRLDC/CnM/ET-"+str(ot_obj['etNo'])+"/I-"+str(ot_obj['indentNo'])+"/2019-20"
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

def create_bid(data,tenderType):



def create_ot(request):
    data = json.loads(request.body.decode('utf-8'))
    ot = OpenTender(
        indentNo = data['tenderDetails']['indentNo'],
        tenderSubject = data['tenderDetails']['tenderSubject'],
        etNo = data['tenderDetails']['etNo'],
        tenderCategory = data['tenderDetails']['tenderCategory'],
        productCategory = data['tenderDetails']['productCategory'],
        proposalRefNo = data['proposalDetails']['proposalRefNo'],
        proposalDate = getDate(data['proposalDetails']['proposalDate']),
        proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
        indentDept = data['proposalDetails']['indentDept'],
        engineerIncharge = data['proposalDetails']['engineerIncharge'],
        addressConsignee = data['proposalDetails']['addressConsignee'],
        estCost = data['amountDetails']['estCost'],
        gstIncl = data['amountDetails']['gstIncl'],
        noteDate = getDate(data['noteDetails']['noteDate']),
        noteBy = data['noteDetails']['noteBy'],
        notebyDesg = data['noteDetails']['notebyDesg'],
    )
    ot.save()
    res = create_ot_notesheet(data['tenderDetails']['indentNo'])
    response = send_file_docx(res)
    return response
# Create your views here.

from docx import Document
from django.http import  HttpResponse
from num2words import num2words
from .models import  OpenTender,Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus
from .models import Vendor,Employee,TECC,BODC,QR,Indenter
from .models import *
import math
import os
import io
from docx import Document
from datetime import datetime
from datetime import date
from datetime import *
def send_file_docx(data):
    document = Document(data)
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    response['Content-Disposition'] = 'attachment; filename = "download.docx"'
    document.save(response)
    return response

def amount2words(amt):
    amt_word = num2words(amt,lang="en_IN")
    amt_word = amt_word.replace("-"," ")
    amt_word = " ".join([i.capitalize() for i in amt_word.split(" ")])
    return amt_word

def getDate(datestr):
    try:
        datestr = datestr.split('T')[0]
        d1 = datetime.strptime(datestr,'%Y-%m-%d')
        d1 = d1 + timedelta(days=1)
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
    elif(bid.bid_type == "LTE"):
        ref_no = "SRLDC/C&M/I-"+str(bid.indent_number)+"/2019-20"
        return ref_no
    elif(bid.bid_type == "LTE-eproc"):
        et = EprocTender.objects.get(bid = bid)
        ref_no = "SRLDC/C&M/ET-"+str(et.etNo)+"/I-"+str(bid.indent_number)+"/2019-20"
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

def getVendor(vend_id):
    vend = Vendor.objects.filter(id = vend_id)
    vend = vend.values()[0]
    return vend

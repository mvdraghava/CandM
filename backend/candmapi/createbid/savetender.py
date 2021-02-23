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

def savetender(request):
    bid_types = {
        'LTE Manual': 'LTE',
        'LTE E-procurment': 'LTE-eproc',
        'Open Tender': 'OpenTender',
        'Single Tender': 'SingleTender',
        'Spot Quotation': 'SpotQuotation',
        'GeM(Direct Purchase)': 'GeM(Direct Purchase)',
        'GeM(Bidding)': 'GeM(Bidding)',
        'GeM(Custom Bidding)': 'GeM(Custom Bidding)'
    }
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid = Bid(
            indent_number = data['tenderDetails']['indent_no'],
            bid_subject = data['tenderDetails']['subject'],
            bid_type = bid_types[data['tenderDetails']['modeofprocurment']],
            tender_category = data['tenderDetails']['tendertype'],
            contract_type = data['tenderDetails']['contracttype'],
            product_category = data['tenderDetails']['productcategory'],
            completionperiod = str(data['tenderDetails']['completionperiod']) + ' ' + data['tenderDetails']['durationmeasured']
        )
        bid.save()
        indent_folder = 'E:\Contracts\WebsiteFiles\I-'+str(data['tenderDetails']['indent_no'])
        if not os.path.exists(indent_folder):
            os.makedirs(indent_folder)
        bidstatus = BidStatus(
            bid = bid,
            bid_status = 'Awarded Contract'
        )
        bidstatus.save()
        proposal = Proposal(
            bid = bid,
            proposalRefNo = data['proposalDetails']['proposalRefNo'],
            proposalDate = getDate(data['proposalDetails']['proposalDate']),
            proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
            indentDept = data['proposalDetails']['indentDept'],
        )
        proposal.save()
        indenter = Indenter(
            bid = bid,
            indenter = Employee.objects.get(id = data['proposalDetails']['indentedBy']["id"])
        )
        indenter.save()
        award = contractAward(
            bid = bid,
            typeofaward = data['loaDetails']['typeofaward'],
            referenceNo = str(data['loaDetails']['award_ref']),
            awardedDate = getDate(data['loaDetails']['award_date']),
            awardedVendor = Vendor.objects.get(id = data['loaDetails']['awardedVendor']['id']),
            contractStartDate = getDate(data['loaDetails']['contract_start_date']),
            contractEndDate = getDate(data['loaDetails']['contract_end_date']),
            estCost = float(data['estAmount']['cost']),
            estGstIncl = data['estAmount']['gstIncl'],
            awardedAmount = float(data['awardedAmount']['cost']),
            awardedGstIncl = data['awardedAmount']['gstIncl'],
            cpg = data['loaDetails']['cpg']
        )
        award.save()
        return JsonResponse({'success':True})
    except Exception as ex:
        import pdb
        pdb.set_trace()
        return JsonResponse({'success':False})
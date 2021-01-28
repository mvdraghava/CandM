from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, FileResponse
from docxtpl import DocxTemplate
from num2words import num2words
import math
import os
import io
import json
from .models import *
from .functions_need import *
from django.forms.models import model_to_dict

def createst(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid = Bid(
            indent_number = data['tenderDetails']['indent_no'],
            bid_subject = data['tenderDetails']['subject'],
            bid_type = 'SingleTender',
            tender_category =  data['tenderDetails']['tendertype'],
            contract_type = data['tenderDetails']['contracttype'],
            product_category = data['tenderDetails']['productcategory'],
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
        stdetails = SingleTenderDetails(
            bid = bid,
            estCost = data["amountDetails"]["estCost"],
            completionperiod = str(data['tenderDetails']["completionperiod"]) + " " + data['tenderDetails']["durationmeasured"],
            gstIncl = data["amountDetails"]["gstIncl"],
            reason = data["reason"],
            negotiationCommittee = data["negotiationCommitte"],
            vendor = Vendor.objects.get(id = data['vendor']['id'])
        )
        stdetails.save()
        if data["negotiationCommitte"]:
            for comMember in data["commiteeMembers"]:
                stComMem = SingleTenderCommittee(
                    bid = bid,
                    committeeMember = Employee.objects.get(id = comMember["id"])
                )
                stComMem.save()
            changeStatus(bid,"Recieved Single Tender Proposal")
        else:
            changeStatus(bid,"Approved to Award LOA/PO")
            bid.bid_stage = 5
            bid.save()
        return JsonResponse({'success':True})
    except Exception as e:
        pass
        import pdb; 
        pdb.set_trace()
        return JsonResponse({'success':False})
    return JsonResponse({'success': True})
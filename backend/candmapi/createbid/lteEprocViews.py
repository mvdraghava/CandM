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
from .functions_need import send_file_docx, amount2words
from django.forms.models import model_to_dict

def createlteEproc(request):
    data = json.loads(request.body.decode('utf-8'))
    bid = Bid(
        indent_number = data['indent_no'],
        bid_subject = data['subject'],
        bid_type = 'LTE-eproc'
    )
    bid.save()
    et = EprocTender(
        bid = bid,
        etNo = data['eproc_no']
    )
    et.save()
    proposal = Proposal(
        bid = bid,
        proposalRefNo = data['proposalDetails']['proposalRefNo'],
        proposalDate = getDate(data['proposalDetails']['proposalDate']),
        proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
        indentDept = data['proposalDetails']['indentDept'],
        indentDesignation = (Employee.objects.get(id = data['proposalDetails']['indentedBy']["id"])).designation
    )
    proposal.save()
    indenter = Indenter(
        bid = bid,
        indenter = Employee.objects.get(id = data['proposalDetails']['indentedBy']["id"])
    )
    indenter.save()
    lteEprocdetails = LteEprocDetails(
        bid = bid,
        estCost = data["amountDetails"]["estCost"],
        completionperiod = str(data["completionperiod"]) + " " + data["durationmeasured"],
        gstIncl = data["amountDetails"]["gstIncl"],
        emdwaivedoff = data["amountDetails"]["emdwaivedoff"],
        noteby = Employee.objects.get(id = data["noteby"]["id"]),
        notedate = getDate(data["notesheetdate"])
    )
    lteEprocdetails.save()
    for vendor in data['ltevendors']:
        vn = VendorBid(
            bid = bid,
            vendor = Vendor.objects.get(id = vendor['id'])
        )
        vn.save()
    res = prepare_lte_eproc_notesheet(bid)
    response = send_file_docx(res)
    changeStatus(bid,"Created Proposal Notesheet")
    return response

def prepare_lte_eproc_notesheet(bid):
    indent_no = str(bid.indent_number)
    proposal = Proposal.objects.get(bid=bid)
    indenter = Indenter.objects.get(bid=bid)
    ltedetails = LteEprocDetails.objects.get(bid=bid)
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
        'note_by_desg': ltedetails.noteby.designation,
        'no_of_parties'  : len(ltevendors),
        'no_of_parties_words' : amount2words(len(ltevendors))
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
    filename = foldername+"I-"+indent_no+"_LTE_EPROC_Notesheet"
    doc = DocxTemplate("Template_LTE_Eproc_Notesheet.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"

def prepare_lte_eproc_nit_doc(bid):
    nitdetails = LteEprocNitDetails.objects.get(bid = bid)
    lteeprocdetails = LteEprocDetails.objects.get(bid = bid)
    indent_no = str(bid.indent_number)
    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'emd_price' : str(getEmdPrice(lteeprocdetails.estCost)),
        'emd_price_words' : amount2words(getEmdPrice(lteeprocdetails.estCost)),
        'tender_category' : nitdetails.tender_category,
        'type_of_contract': nitdetails.type_of_contract,
        'prod_category' : nitdetails.product_category,
        'bid_valid_days': nitdetails.bid_valid_days,
        'engineer_incharge_type' : nitdetails.engineerincharge_type,
        'engineer_incharge' : nitdetails.engineerincharge_desg + ', ' + nitdetails.engineerincharge_dept,
        'address_consignee' : nitdetails.addressconsignee_desg + ', ' + nitdetails.addressconsignee_dept
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_LTE_EPROC_NIT"
    doc = DocxTemplate("Template_LTE_EPROC_NIT.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"

def getlteeprocnit(request):
    data = json.loads(request.body.decode('utf-8'))
    bid  = Bid.objects.get(indent_number = data['indentNo'])
    bodc = BODC(
        bid = bid,
        candmMem = Employee.objects.get(id = data["candmBodMem"]["id"]),
        indentMem = Employee.objects.get(id = data["indentBodMem"]["id"]),
        fandaMem = Employee.objects.get(id = data["fandaBodMem"]["id"])
    )
    bodc.save()
    tecc = TECC(
        bid = bid,
        candmMem = Employee.objects.get(id = data["candmTecMem"]["id"]),
        indentMem = Employee.objects.get(id = data["indentTecMem"]["id"]),
        fandaMem = Employee.objects.get(id = data["fandaTecMem"]["id"])
    )
    tecc.save()
    nitdetails = LteEprocNitDetails(
        bid = bid,
        engineerincharge_type = data['engineerincharge_type'],
        engineerincharge_desg = data['engineerincharge_desg'],
        engineerincharge_dept = data['engineerincharge_dept'],
        addressconsignee_desg = data['adressconsignee_desg'],
        addressconsignee_dept = data['adressconsignee_dept'],
        proposalapprovedDate = getDate(data['proposalapprovedDate']),
        tender_category = data['tender_category'],
        product_category = data['product_category'],
        type_of_contract = data['type_contract'],
        bid_valid_days = data['bid_valid_days']
    )
    nitdetails.save()
    res = prepare_lte_eproc_nit_doc(bid)
    response = send_file_docx(res)
    changeStatus(bid,"NIT prepared for Vetting")
    return response

def prepare_lte_eproc_bod_report(bid):
    lteeprocdetails = LteEprocDetails.objects.get(bid = bid)
    firstdates = FirstImpDates.objects.get(bid = bid)
    impdates = ImpDates.objects.get(bid = bid)
    pbs = participatedBidders.objects.filter(bid = bid)
    ltevendors = VendorBid.objects.filter(bid = bid)
    indent_no = str(bid.indent_number)
    bodc = BODC.objects.get(bid = bid)
    proposal = Proposal.objects.get(bid = bid)
    corrigendadetails = Corrigenda.objects.filter(bid = bid)
    corrigendadetails = [obj for obj in corrigendadetails]
    if len(corrigendadetails):
        corrigenda_b = True
        corrigenda = []
        for ind,corrigendum in enumerate(corrigendadetails):
            corri = {
                'title' : 'Corrigendum '+str(ind+1),
                'issued_dt' : datetime.strftime(corrigendum.issueddate,"%d.%m.%Y"),
                'description' : corrigendum.description,
                'reason' : corrigendum.reason
            }
            corrigenda.append(corri)
    else:
        corrigenda_b = False
        corrigenda = []
    indent_bod_mem = {
        'name' : bodc.indentMem.name,
        'desg' : bodc.indentMem.designation
    }
    cnm_bod_mem = {
        'name' : bodc.candmMem.name,
        'desg' : bodc.candmMem.designation
    }
    fna_bod_mem = {
        'name' : bodc.fandaMem.name,
        'desg' : bodc.fandaMem.designation
    }
    submitted_vendors = []
    offline_vendors = []
    for pb in pbs:
        s_vendor = {
            'name': pb.vendor.name,
            'emd' : pb.emddetail
        }
        if pb.emddetail == 'Paid EMD':
            s_vendor['emd'] = 'Submitted EMD'
        if pb.submittedonline != 'Participated in Online Bidding':
            offline_vendors.append(pb.vendor.name)
        else:
            submitted_vendors.append(s_vendor)
    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'bod_dt' : datetime.strftime(impdates.boddate,"%d.%m.%Y"),
        'issue_dt' : datetime.strftime(impdates.issueddate, "%d.%m.%Y"),
        'proposal_note_dt' : datetime.strftime(lteeprocdetails.notedate,"%d.%m.%Y"),
        'estCost' : str(lteeprocdetails.estCost),
        'estCost_words' : amount2words(lteeprocdetails.estCost),
        'no_of_vendors' : len(ltevendors),
        'first_bsd_date' : datetime.strftime(firstdates.bidsubdate,"%d.%m.%Y"),
        'first_bod_date' : datetime.strftime(firstdates.boddate,"%d.%m.%Y"),
        'indent_bod_mem' : indent_bod_mem,
        'cnm_bod_mem' : cnm_bod_mem,
        'fna_bod_mem' : fna_bod_mem,
        'indent_dept' : proposal.indentDept,
        'corrigenda_b': corrigenda_b,
        'corrigenda' : corrigenda,
        'no_par_ven' : len(pbs),
        'no_par_ven_words': amount2words(len(pbs)),
        'submitted_vendors' : submitted_vendors,
        'offline_bids_b' : len(offline_vendors),
        'offline_bids' : offline_vendors
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_BOD_Report"
    doc = DocxTemplate("Template_LTE_Eproc_BOD_Report.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"

def prepare_emd_iom(bid):
    indent_no = str(bid.indent_number)
    lteeprocdetails = LteEprocDetails.objects.get(bid = bid)
    impdates = ImpDates.objects.get(bid = bid)
    pbs = participatedBidders.objects.filter(bid = bid)
    paymentdetails = PaymentDetails.objects.filter(bid = bid)
    emd_vendors = []
    for pb in pbs:
        if pb.emddetail == 'Paid EMD':
            pd = paymentdetails.get(vendor = pb.vendor)
            emd_ven = {
                'name' : pb.vendor.name,
                'emddetail' : pd.paymentdetails
            }
            emd_vendors.append(emd_ven)
    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'bod_dt' : datetime.strftime(impdates.boddate,"%d.%m.%Y"),
        'issue_dt' : datetime.strftime(impdates.issueddate, "%d.%m.%Y"),
        'emdvendors' : emd_vendors,
        'emd_amount' : getEmdPrice(lteeprocdetails.estCost),
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_EMD_IOM"
    doc = DocxTemplate("Template_EMD_IOM.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"


def lteeprocbidopening(request):
    """
    Recieve request
    store the participatedbidders values
    store payment details values
    call preparebodreport function
    if payments are there call prepare Bill function
    return
    """
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid  = Bid.objects.get(indent_number = data['indentNo'])
        lteeprocdetails = LteEprocDetails.objects.get(bid = bid)
        paidemd = False
        for quotation in data['bidsubmissionDetails']:
            if quotation['participated']:
                pb = participatedBidders(
                    bid = bid,
                    vendor = Vendor.objects.get(id = quotation['vendor']['id']),
                    remarks = quotation['remarks'],
                    submittedonline = quotation['submittedonline'],
                    qualified = False
                )
                if not lteeprocdetails.emdwaivedoff:
                    pb.emddetail = quotation['emd']
                    if quotation['emd'] == 'Paid EMD':
                        paidemd = True
                        pd = PaymentDetails(
                            bid = bid,
                            vendor = Vendor.objects.get(id = quotation['vendor']['id']),
                            paymentfor = 'EMD',
                            paymentdetails = quotation['emddetails']
                        )
                        pd.save()
                pb.save()
        if paidemd:
            prepare_emd_iom(bid)
        prepare_lte_eproc_bod_report(bid)
        changeStatus(bid,"Bid Opening Done")
        return JsonResponse({'issued':True})
    except Exception as e:
        import pdb; pdb.set_trace()
        return JsonResponse({'issued':False})
    return

def prepare_eproc_tec_before_clarrification(bid):
    return

def prepare_eproc_tec_after_calrrification(bid):
    return

def prepare_clarrifications(bid):
    """
    Prepare Clarrification Letters with the Details
    Please update for the clarrification sent date and recieved date
    """
    indent_no = str(bid.indent_number)
    impdates = ImpDates.objects.get(bid = bid)
    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'issue_dt' : datetime.strftime(impdates.issueddate, "%d.%m.%Y"),
        'date_ltr': '{{date_ltr}}',
        'clarr_last_dt' : '{{clarr_last_dt}}',
        'ltr_by' : '{{ltr_by}}',
        'ltr_by_desg' : '{{ltr_by_desg}}'
    }
    pbs = participatedBidders.objects.filter(bid = bid)
    for pb in pbs:
        vendor = {
            'name' : pb.vendor.name,
            'street1' : pb.vendor.street1,
            'city' : pb.vendor.city,
            'state' : pb.vendor.state,
            'pincode' : pb.vendor.pincode,
        }
        if pb.vendor.street2:
            vendor['street2'] = pb.vendor.street2
        if len(pb.vendor.mobilenos)>0:
            vendor['mobileno'] = pb.vendor.mobilenos[0]
        if len(pb.vendor.emailids)>0:
            vendor['emailid'] = pb.vendor.emailids[0]
        context['vendor'] = vendor
        foldername = "I-"+indent_no+"/"
        if not os.path.exists(os.path.dirname(foldername)):
            os.makedirs(os.path.dirname(foldername))
        filename = foldername + "Clarr_"+pb.vendor.name+".docx"
        doc = DocxTemplate("Template_ClarrificationLetter.docx")
        doc.render(context, autoescape=True)
        doc.save(filename)
    return

def prepare_eproc_finance_tender_open_report(bid):
    return

def prepare_eproc_tec_after_financetender(bid):
    return


def get_participated_vendors(bid):
    response = []
    participatedvendors = participatedBidders.objects.filter(bid = bid)
    participatedvendors = participatedvendors.values()
    for obj in participatedvendors:
        pbvendorobj = {}
        pbvendorobj['vendor'] = getVendor(obj['vendor_id'])
        pbvendorobj['remarks'] = obj['remarks']
        pbvendorobj['qualified'] = obj['qualified']
        pbvendorobj['submittedonline'] = obj['submittedonline']
        pbvendorobj['emddetail'] = obj['emddetail']
        pbvendorobj['docfee'] = obj['docfee']
        response.append(pbvendorobj)
    return response

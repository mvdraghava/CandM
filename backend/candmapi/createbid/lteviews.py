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
        tendertype = data["tendertype"],
        completionperiod = str(data["completionperiod"]) + " " + data["durationmeasured"],
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
        vendor_V = vendor.vendor
        vn = {
            'name': vendor_V.name,
            'street1': vendor_V.street1,
            'city' : vendor_V.city,
            'state' : vendor_V.state,
            'pincode' :  str(vendor_V.pincode)
        }
        if(vendor_V.street2):
            vn['street2'] = vendor_V.street2
        if(len(vendor_V.mobilenos)):
            s = ', '
            vn['mobileno'] = "Mobile No:"+s.join(vendor_V.mobilenos)
        if(len(vendor_V.emailids) and vendor_V.emailids[0]):
            s = ', '
            vn['emailid'] = "EmailId:"+s.join(vendor_V.emailids)
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

def get_lte_conditions(ltegc):
    conditions = []
    if(ltegc.scopeofwork):
        cond = {
            'name': 'Scope of Work',
            'text' : ltegc.scopeofworkText
        }
        conditions.append(cond)
    if(ltegc.emd):
        cond = {
            'name': 'Terms of Payment',
            'text' : ltegc.emdText
        }
        conditions.append(cond)
    if(ltegc.paymentterms):
        cond = {
            'name': 'Terms of Payment',
            'text' : ltegc.paymenttermsText
        }
        conditions.append(cond)
    if(ltegc.contractperiod):
        cond = {
            'name': 'Contract Period',
            'text' : ltegc.contractperiodText
        }
        conditions.append(cond)
    if(ltegc.deliveryperiod):
        cond = {
            'name': 'Delivery Period',
            'text' : ltegc.delivaryperiodText
        }
        conditions.append(cond)
    if(ltegc.pricebasis):
        cond = {
            'name': 'Price Basis',
            'text' : ltegc.pricebasisText
        }
        conditions.append(cond)
    if(ltegc.validity):
        cond = {
            'name': 'Validity',
            'text' : ltegc.validityText
        }
        conditions.append(cond)
    if(ltegc.taxesandduties):
        cond = {
            'name': 'Taxes and Duties',
            'text' : ltegc.taxesanddutiestext
        }
        conditions.append(cond)
    if(ltegc.warranty):
        cond = {
            'name': 'Warranty',
            'text' : ltegc.warrantyText
        }
        conditions.append(cond)
    if(ltegc.cpg):
        cond = {
            'name': 'Contract Performance Guarntee',
            'text' : ltegc.cpgText
        }
        conditions.append(cond)
    if(ltegc.sd):
        cond = {
            'name': 'Security Deposit',
            'text' : ltegc.sdText
        }
        conditions.append(cond)
    if(ltegc.ld):
        cond = {
            'name': 'Liquidity Damage',
            'text' : ltegc.ldText
        }
        conditions.append(cond)
    if(ltegc.qv):
        cond = {
            'name': 'Quantity Variation',
            'text' : ltegc.qvText
        }
        conditions.append(cond)
    if(ltegc.arbitration):
        cond = {
            'name': 'Arbitration',
            'text' : ltegc.arbitrationText
        }
        conditions.append(cond)
    if(ltegc.officerincharge):
        cond = {
            'name': 'Scope of Work',
            'text' : ltegc.officerinchargeText
        }
        conditions.append(cond)

    return conditions


def prepare_lte_m_nit_doc(bid):
    ltegc = LteGeneralConditions.objects.get(bid = bid)
    indent_no = str(bid.indent_number)
    conditions = get_lte_conditions(ltegc)
    context = {
        'bod_date' : datetime.strftime(ltegc.boddt,"%d.%m.%Y"),
        'issue_date' : '{{issue_date}}',
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'special_conditions' : ltegc.specialconditions,
        'conditions' : conditions,
        'li': len(conditions)+1
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_LTE_NIT"
    doc = DocxTemplate("Template_LTE_M_NIT.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"

def prepare_lte_m_nit(request):
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
    ltegc = LteGeneralConditions(
        bid = bid,
        proposalnoteapproveddt = getDate(data["proposalapprovedDate"]),
        boddt = getDate(data["bodDate"]),
        specialconditions = data["specialconditions"],
        scopeofwork = data["scopeofwork"],
        scopeofworkText = data["scopeofworkText"] if data["scopeofwork"] else ' ',
        emd = data["emd"],
        emdText = data["emdText"] if data["emd"] else '',
        paymentterms = data["paymentterms"],
        paymenttermsText = data["paymenttermsText"] if data["paymentterms"] else ' ',
        contractperiod = data["contractperiod"],
        contractperiodText = data["contractperiodText"] if data["contractperiod"] else ' ',
        deliveryperiod = data["deliveryperiod"],
        delivaryperiodText = data["delivaryperiodText"] if data["deliveryperiod"] else ' ',
        pricebasis = data["pricebasis"],
        pricebasisText = data["pricebasisText"] if data["pricebasis"] else ' ',
        validity = data["validity"],
        validityText = data["validityText"] if data["validity"] else '',
        taxesandduties = data["taxesandduties"],
        taxesanddutiestext = data["taxesanddutiestext"] if data["taxesandduties"] else '',
        warranty = data["warranty"],
        warrantyText = data["warrantyText"] if data["warranty"] else '',
        cpg = data["cpg"],
        cpgText = data["cpgText"] if data["cpg"] else '',
        sd = data["sd"],
        sdText = data["sdText"] if data["sd"] else '',
        ld = data["ld"],
        ldText = data["ldText"] if data["ld"] else '',
        qv = data["qv"],
        qvText = data["qvText"] if data["qv"] else '',
        arbitration = data["arbitration"],
        arbitrationText = data["arbitrationText"] if data["arbitration"] else '',
        officerincharge = data["officerincharge"],
        officerinchargeText = data["officerinchargeText"] if data["officerincharge"] else ''
    )
    ltegc.save()
    res = prepare_lte_m_nit_doc(bid)
    response = send_file_docx(res)
    changeStatus(bid,"NIT prepared for Vetting")
    bid.bid_stage = 3
    bid.save()
    return response

def editcommittee(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid = Bid.objects.get(indent_number=data["indentNo"])
        bod =BODC.objects.get(bid=bid)
        tec = TECC.objects.get(bid=bid)
        bod.candmMem = Employee.objects.get(id = data["candmBodMem"]["id"])
        bod.indentMem = Employee.objects.get(id = data["indentBodMem"]["id"])
        bod.fandaMem = Employee.objects.get(id = data["fandaBodMem"]["id"])
        tec.candmMem = Employee.objects.get(id = data["candmTecMem"]["id"])
        tec.indentMem = Employee.objects.get(id = data["indentTecMem"]["id"])
        tec.fandaMem = Employee.objects.get(id = data["fandaTecMem"]["id"])
        bod.save()
        tec.save()
        return JsonResponse({'edited':True})
    except Exception as e:
        x = 1
        return JsonResponse({'edited':False})

def issuelteNIT(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid  = Bid.objects.get(indent_number = data['indentNo'])
        if bid.bid_type == 'LTE':
            impdates = ImpDates(
                bid = bid,
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bodDate"])
            )
            impdates.save()
            firstimpdates = FirstImpDates(
                bid = bid,
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bodDate"])
            )
            firstimpdates.save()
            ltegc = LteGeneralConditions.objects.get(bid = bid)
            ltegc.boddt = getDate(data["bodDate"])
            ltegc.save()
            changeStatus(bid,"NIT Issued")
            bid.bid_stage = 4
            bid.save()
        elif bid.bid_type == 'LTE-eproc':
            impdates = ImpDates(
                bid = bid,
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bidsubDate"])
            )
            impdates.save()
            firstimpdates = FirstImpDates(
                bid = bid,
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bidsubDate"])
            )
            firstimpdates.save()
            changeStatus(bid,"NIT Issued")
        elif bid.bid_type == 'OpenTender':
            impdates = ImpDates(
                bid = bid,
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bidsubDate"]),
                prebiddate = getDate(data['prebidDate'])
            )
            impdates.save()
            firstimpdates = FirstImpDates(
                bid = bid,
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bidsubDate"]),
                prebiddate = getDate(data['prebidDate'])
            )
            firstimpdates.save()
            changeStatus(bid,"NIT Issued")
        return JsonResponse({'issued':True})
    except Exception as e:
        x = 1
        return JsonResponse({'issued':False})

def preparedatecorrigendumfiles(corrigendum):
    indent_no = str(corrigendum.bid.indent_number)
    corrigenda = Corrigenda.objects.filter(bid = corrigendum.bid)
    corri_no = str(len(corrigenda))
    note_by = {
        'name' : corrigendum.issuedby.name,
        'desg' : corrigendum.issuedby.designation
    }
    context = {
        'corri_issue_dt' : datetime.strftime(corrigendum.issueddate,"%d.%m.%Y"),
        'ref_no' : get_ref_no(corrigendum.bid),
        'subject' : corrigendum.bid.bid_subject,
        'bid_sub_ext_date' : datetime.strftime(corrigendum.bidsubdate,"%d.%m.%Y"),
        'bid_open_ext_date' : datetime.strftime(corrigendum.boddate,"%d.%m.%Y"),
        'note_by' : note_by,
        'corri_no' : corri_no,
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_corrigendum"+corri_no
    doc = DocxTemplate("Template_date_corrigendum.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    filename = foldername+"I-"+indent_no+"_notebodext"+corri_no
    doc = DocxTemplate("Template_BODext_note.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"


def datecorrigendum(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid  = Bid.objects.get(indent_number = data['indentNo'])
        impdates = ImpDates.objects.get(bid = bid)
        if bid.bid_type == 'LTE':
            corrigendum = Corrigenda(
                bid = bid,
                description = "Date Corrigendum",
                reason = data["reason"],
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bodDate"]),
                issuedby = Employee.objects.get(id = data["issuedby"]["id"])
            )
            corrigendum.save()
            impdates.boddate =  getDate(data["bodDate"])
            impdates.save()
            preparedatecorrigendumfiles(corrigendum)
        elif bid.bid_type == 'LTE-eproc':
            desc = "Date Corrigendum" + "- Bid Submission Date was Extended to " + datetime.strftime(getDate(data["bidsubDate"]),"%d.%m.%Y")
            desc = desc + ", Bid Opening Date was Extended to " + datetime.strftime(getDate(data["bodDate"]),"%d.%m.%Y")
            corrigendum = Corrigenda(
                bid = bid,
                description = desc,
                reason = data["reason"],
                issueddate = getDate(data["issueDate"]),
                boddate = getDate(data["bodDate"]),
                bidsubdate = getDate(data["bidsubDate"]),
                issuedby = Employee.objects.get(id = data["issuedby"]["id"])
            )
            corrigendum.save()
            impdates.boddate =  getDate(data["bodDate"])
            impdates.bidsubdate = getDate(data["bidsubDate"])
            impdates.save()
            preparedatecorrigendumfiles(corrigendum)
        return JsonResponse({'issued':True})
    except Exception as e:
        x = 1
        return JsonResponse({'issued':False})

def prepare_lte_tec(bid):
    indent_no = str(bid.indent_number)
    ltegc = LteGeneralConditions.objects.get(bid = bid)
    ltedetails = LteDetails.objects.get(bid = bid)
    impdates = ImpDates.objects.get(bid = bid)
    firstimpdates = FirstImpDates.objects.get(bid = bid)
    pbs = participatedBidders.objects.filter(bid = bid)
    bqs = biddersquotedetails.objects.filter(bid = bid)
    ltevendors = VendorBid.objects.filter(bid = bid)
    proposal = Proposal.objects.get(bid = bid)
    bodc = BODC.objects.get(bid = bid)
    tecc = TECC.objects.get(bid = bid)
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
    indent_tec_mem = {
        'name' : tecc.indentMem.name,
        'desg' : tecc.indentMem.designation
    }
    cnm_tec_mem = {
        'name' : tecc.candmMem.name,
        'desg' : tecc.candmMem.designation
    }
    fna_tec_mem = {
        'name' : tecc.fandaMem.name,
        'desg' : tecc.fandaMem.designation
    }
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
    if l1bq.quoteamount<ltedetails.estCost:
        l1_est_diff = 'less'
        l1_est_percent = round(((ltedetails.estCost-l1bq.quoteamount)*100)/ltedetails.estCost,2)
    else:
        l1_est_diff = 'greater'
        l1_est_percent = -1 * round(((ltedetails.estCost-l1bq.quoteamount)*100)/ltedetails.estCost,2)
    context = {
        'ref_no' : get_ref_no(bid),
        'tec_date' : '{{tec_date}}',
        'subject' : bid.bid_subject,
        'proposal_approved_dt' : datetime.strftime(ltegc.proposalnoteapproveddt,"%d.%m.%Y"),
        'estCost' : str(ltedetails.estCost),
        'estCostWords' : amount2words(ltedetails.estCost),
        'no_of_vendors' : str(len(ltevendors)),
        'first_bod_date' : datetime.strftime(firstimpdates.boddate,"%d.%m.%Y"),
        'indent_dept' : proposal.indentDept,
        'indent_bod_mem': indent_bod_mem,
        'cnm_bod_mem': cnm_bod_mem,
        'fna_bod_mem': fna_bod_mem,
        'indent_tec_mem': indent_tec_mem,
        'cnm_tec_mem': cnm_tec_mem,
        'fna_tec_mem': fna_tec_mem,
        'corrigenda_b' : corrigenda_b,
        'corrigenda' : corrigenda,
        'no_par_ven' : len(pbs),
        'no_par_ven_words' : amount2words(len(pbs)),
        'bod_date' : datetime.strftime(impdates.boddate,"%d.%m.%Y"),
        'submitted_vendors' : submitted_vendors,
        'l1_vendor' : l1bq.vendor.name,
        'l1_amount' : str(l1bq.quoteamount),
        'l1_est_percent' : l1_est_percent,
        'l1_est_diff' : l1_est_diff,
        'l1_amount_words' : amount2words(l1bq.quoteamount)
    }
    if(ltedetails.gstIncl):
        context['gstIncl'] = "Inclusive of GST"
    else:
        context['gstIncl'] = "Exclusive of GST"
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_TEC_Report"
    doc = DocxTemplate("Template_LTE_TEC_Report.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"


#Function to prepare TEC ltetecvetting
#stores Quotation Price details and participated bidder LteDetails
#in the model biddersquotedetails
def ltetecvetting(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid  = Bid.objects.get(indent_number = data['indentNo'])
        ltedetails = LteDetails.objects.get(bid = bid)
        impdates = ImpDates.objects.get(bid = bid)
        impdates.boddate =  getDate(data["bodDate"])
        impdates.save()
        bod = BODC.objects.get(bid=bid)
        if bod.candmMem.id != data["candmBodMem"]["id"]:
            bod.candmMem = Employee.objects.get(id = data["candmBodMem"]["id"])
        if bod.indentMem.id != data["indentBodMem"]["id"]:
            bod.indentMem = Employee.objects.get(id = data["indentBodMem"]["id"])
        if bod.fandaMem.id != data["fandaBodMem"]["id"]:
            bod.fandaMem = Employee.objects.get(id = data["fandaBodMem"]["id"])
        bod.save()
        for quotation in data['quotationDetails']:
            if quotation['participated'] :
                pb = participatedBidders(
                    bid = bid,
                    vendor = Vendor.objects.get(id = quotation['vendor']['id']),
                    remarks = quotation['remarks']
                )
                if not ltedetails.emdwaivedoff:
                    pb.emddetail = quotation['emd']

                pb.save()
                bq = biddersquotedetails(
                    bid = bid,
                    vendor = Vendor.objects.get(id = quotation['vendor']['id']),
                    quoteamount = quotation['quoteamount']
                )
                bq.save()
        res = prepare_lte_tec(bid)
        changeStatus(bid,"TEC Prepared for Vetting")
        bid.bid_stage = 6
        bid.save()
        response = send_file_docx(res)
        return response
    except Exception as e:
        pass
        import pdb; pdb.set_trace()
        return JsonResponse({'issued':False})


#Function to prepare LOA or PO for the BIDs
def prepare_loa_po(bid):
    """
    Recieves bid as input to prepare LOA/PO.
    The prepared LOA/PO is stored in the respective folder
    """
    indent_no = str(bid.indent_number)
    loapogcc = loagcc.objects.get(bid=bid)
    loapodetails = Loapovetting.objects.get(bid=bid)
    bidimpdates = ImpDates.objects.get(bid = bid)
    awardvendor = loapodetails.awardvendor
    loapovendor = {
        'name' : awardvendor.name,
        'street1' : awardvendor.street1,
        'city' : awardvendor.city,
        'state' : awardvendor.state,
        'pincode' : awardvendor.pincode,
    }
    conditions = get_lte_conditions(loapogcc)
    if awardvendor.street2:
        loapovendor['street2'] = awardvendor.street2
    if len(awardvendor.mobilenos)>0:
        loapovendor['mobileno'] = awardvendor.mobilenos[0]
    if len(awardvendor.emailids)>0:
        loapovendor['emailid'] = awardvendor.emailids[0]
    RomanLetters = ['I','II','III','IV','V','VI','VII','VIII']
    romani = 2
    annexures = {
     'boq' : 'Annexure - I',
     'gcc' : 'Annexure - II'
    }
    if loapodetails.specialconditions:
        annexures['scc'] = 'Annexure - ' + RomanLetters[romani]
        romani = romani + 1
    if loapodetails.ndaclause:
        annexures['nda']  ='Annexure - ' + RomanLetters[romani]
        romani = romani + 1
    if loapodetails.saclause:
        annexures['sa'] = 'Annexure - ' + RomanLetters[romani]
        romani = romani + 1
    if loapodetails.cpgclause:
        annexures['cpg'] = 'Annexure - ' + RomanLetters[romani]
        romani = romani + 1
    context = {
        'ref_no' : get_ref_no(bid),
        'subject' : bid.bid_subject,
        'tender_ref_no' : get_ref_no(bid),
        'tender_ref_no_dt' : bidimpdates.issueddate,
        'loavendor_tender_ref_no' : '{{loavendor_tender_ref_no}}',
        'loavendor_tender_dt' : '{{loavendor_tender_dt}}',
        'loa_amount' : loapodetails.awardquoteamount,
        'loa_amount_words' : amount2words(loapodetails.awardquoteamount),
        'conditions' : conditions,
        'loa_dt' : '{{loa_dt}}',
        'loapo' : loapodetails.typeofaward,
        'loa_no' : '{{loa_no}}',
        'special_conditions' : loapodetails.specialconditions,
        'ndaclause' : loapodetails.ndaclause,
        'cpg_clause' : loapodetails.cpgclause,
        'saclause' : loapodetails.saclause,
        'loavendor' : loapovendor,
        'annexures' : annexures
    }
    if loapodetails.awardgstincl :
        context['gstIncl'] = 'Inclusive of GST'
    else:
        context['gstIncl'] = 'Exclusive of GST'
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_"+loapodetails.typeofaward
    doc = DocxTemplate("Template_LOA.docx")
    doc.render(context,autoescape=True)
    doc.save(filename+".docx")
    return filename+".docx"




#View to prepare LOA/PO for ltetecvetting
#Request with all GCCs and required LteDetails
#models stored -- loapovetting, loagcc
def loapovetting(request):
    """
    Recieve request
    Store the details in the Database Table LOAPO loapovetting
    And Call the function which returns the LOA docx
    Return the LOA Docx
    """
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid  = Bid.objects.get(indent_number = data['indentNo'])
        loapovet = Loapovetting(
            bid = bid,
            awardvendor = Vendor.objects.get(id = data['awardvendor']['id']),
            awardquoteamount = data['awardamount'],
            awardgstincl = data['awardgstincl'],
            ndaclause = data['ndaclause'],
            saclause = data['saclause'],
            cpgclause = data['cpgclause'],
            specialconditions = data['specialconditions'],
            typeofaward = data['typeofaward'],
            tecdate = getDate(data['tecdate']),
            loaapproveddate = getDate(data['loaapproveddate']),
        )
        loapovet.save()
        reqloagcc = data['gcc']
        loagenerals = loagcc(
            bid = bid,
            scopeofwork = reqloagcc["scopeofwork"],
            scopeofworkText = reqloagcc["scopeofworkText"] if reqloagcc["scopeofwork"] else ' ',
            emd = reqloagcc["emd"],
            emdText = reqloagcc["emdText"] if reqloagcc["emd"] else '',
            paymentterms = reqloagcc["paymentterms"],
            paymenttermsText = reqloagcc["paymenttermsText"] if reqloagcc["paymentterms"] else ' ',
            contractperiod = reqloagcc["contractperiod"],
            contractperiodText = reqloagcc["contractperiodText"] if reqloagcc["contractperiod"] else ' ',
            deliveryperiod = reqloagcc["deliveryperiod"],
            delivaryperiodText = reqloagcc["delivaryperiodText"] if reqloagcc["deliveryperiod"] else ' ',
            pricebasis = reqloagcc["pricebasis"],
            pricebasisText = reqloagcc["pricebasisText"] if reqloagcc["pricebasis"] else ' ',
            validity = False,
            validityText = '',
            taxesandduties = reqloagcc["taxesandduties"],
            taxesanddutiestext = reqloagcc["taxesanddutiestext"] if reqloagcc["taxesandduties"] else '',
            warranty = reqloagcc["warranty"],
            warrantyText = reqloagcc["warrantyText"] if reqloagcc["warranty"] else '',
            cpg = reqloagcc["cpg"],
            cpgText = reqloagcc["cpgText"] if reqloagcc["cpg"] else '',
            sd = reqloagcc["sd"],
            sdText = reqloagcc["sdText"] if reqloagcc["sd"] else '',
            ld = reqloagcc["ld"],
            ldText = reqloagcc["ldText"] if reqloagcc["ld"] else '',
            qv = reqloagcc["qv"],
            qvText = reqloagcc["qvText"] if reqloagcc["qv"] else '',
            arbitration = reqloagcc["arbitration"],
            arbitrationText = reqloagcc["arbitrationText"] if reqloagcc["arbitration"] else '',
            officerincharge = reqloagcc["officerincharge"],
            officerinchargeText = reqloagcc["officerinchargeText"] if reqloagcc["officerincharge"] else ''
        )
        loagenerals.save()
        response = {'prepared' : True}
        res = prepare_loa_po(bid)
        changeStatus(bid,"LOA/PO Prepared for Vetting")
        response = send_file_docx(res)
        return response
    except Exception as e:
        pass
        import pdb; pdb.set_trace()
        return JsonResponse({'prepared' : False})

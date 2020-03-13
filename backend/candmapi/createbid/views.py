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
from .models import Vendor,Employee,TECC,BODC,QR
from .functions_need import *
from django.forms.models import model_to_dict
from .lteEprocViews import *
from .lteviews import *
from .sqviews import *

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
    emd_price = round(math.ceil((est_cost*0.02)/1000.0)*1000.0)
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
        addressConsignee = data['proposalDetails']['addressConsignee'],
        completionperiod = float(data['amountDetails']['completionperiod'])
    )
    pns.save()
    ot = OpenTender(
        bid = bid,
        et = eproc,
        proposal = proposal,
        proposalnotesheet = pns
    )
    ot.save()
    res = create_ot_notesheet(data)
    response = send_file_docx(res)
    changeStatus(bid,"Created Proposal Notesheet")
    return response


def get_open_bids(request):
    bids_data = []
    for get_bid in Bid.objects.all().order_by('indent_number'):
        try:
            bid = {
                'Indentno': get_bid.indent_number,
                'TenderSubject': get_bid.bid_subject,
                'BidStatus': get_status(get_bid),
                'IndentDepartment': get_indentdept(get_bid),
                'BidType': get_bid.bid_type
            }
            bids_data.append(bid)
        except Exception as e:
            continue
    return JsonResponse(bids_data,safe=False)

def get_status(bid):
    sbid = BidStatus.objects.get(bid = bid)
    return sbid.bid_status

def get_indentdept(bid):
    pbid = Proposal.objects.get(bid = bid)
    return pbid.indentDept

def get_filenames(request):
    data = json.loads(request.body.decode('utf-8'))
    indentno = data['indentno']
    file_names = os.listdir('I-'+indentno)
    return JsonResponse(file_names,safe = False)

def add_vendor(request):
    result = {
        'created':''
    }
    try:
        data = json.loads(request.body.decode('utf-8'))
        vendor = Vendor(
            name = data['address']['name'],
            street1 = data['address']['street1'],
            street2 = data['address']['street2'],
            city = data['address']['city'],
            state = data['address']['state'],
            pincode = data['address']['pincode'],
            mobilenos = data['mobilenos'],
            emailids = data['emailids'],
            products = data['products'],
            services = data['services'],
            works =data['works'],
            msme = data['msme'],
            nsic = data['nsic'],
            cpp = data['cpp'],
            blacklisted = False,
            remarks = ''
        )
        vendor.save()
        result['created'] = True
    except Exception as ex:
        import pdb; pdb.set_trace()
        result['created'] = False
    return JsonResponse(result)

def get_vendors(request):
    vendors_data = []
    for get_vendor in Vendor.objects.all().order_by('id'):
        vendor = {
            'id' : get_vendor.id,
            'name': get_vendor.name,
            'street1' : get_vendor.street1,
            'street2' : get_vendor.street2,
            'city' : get_vendor.city,
            'state' : get_vendor.state,
            'pincode' : get_vendor.pincode,
            'mobilenos' : get_vendor.mobilenos,
            'emailids' : get_vendor.emailids,
            'products' : get_vendor.products,
            'services' : get_vendor.services,
            'works' : get_vendor.works,
            'msme' : get_vendor.msme,
            'nsic' : get_vendor.nsic,
            'cpp' : get_vendor.cpp,
            'blacklisted' : get_vendor.blacklisted,
            'remarks' : get_vendor.remarks
        }
        vendors_data.append(vendor)
    return JsonResponse(vendors_data,safe=False)


def edit_vendor(request):
    result = {
        'edited':''
    }
    try:
        data = json.loads(request.body.decode('utf-8'))
        vendor = Vendor.objects.get(id=data["id"])
        vendor.name = data["address"]["name"]
        vendor.street1 = data["address"]["street1"]
        vendor.street2 = data["address"]["street2"]
        vendor.city = data["address"]["city"]
        vendor.state = data["address"]["state"]
        vendor.pincode = data["address"]["pincode"]
        vendor.mobilenos = data["mobilenos"]
        vendor.emailids = data['emailids']
        vendor.products = data['products']
        vendor.services = data['services']
        vendor.works =data['works']
        vendor.msme = data['msme']
        vendor.nsic = data['nsic']
        vendor.blacklisted = data['blacklisted']
        vendor.remarks = data['remarks']
        vendor.save()
        result['edited'] = True
    except Exception as ex:
        print(ex)
        result['edited'] = False
    return JsonResponse(result)

def getEmployees(request):
    emp_data = list(Employee.objects.values())
    return JsonResponse(emp_data, safe=False)

def getEmployee(emp_id):
    emp = Employee.objects.filter(id = emp_id)
    emp = list(emp.values())
    return emp[0]

def getBidDetails(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid = Bid.objects.get(indent_number = int(data['indent_no']))
        pbid = Proposal.objects.get(bid = bid)
        response = {
            'Indentno': bid.indent_number,
            'TenderSubject': bid.bid_subject,
            'BidStatus': get_status(bid),
            'IndentDepartment': pbid.indentDept,
            'IndentDesignation': pbid.indentDesignation,
            'BidType': bid.bid_type,
            'estCost': get_est_cost(bid),
            'completionperiod' : get_completion_period(bid),
            'presentStage' : bid.bid_stage
        }
        try:
            stage_types = TenderStages.objects.filter(bid_type = bid.bid_type).order_by('stage_number')
            response['stages'] = [iter_stage.stage for iter_stage in stage_types]
        except Exception as e:
            pass
        try:
            indenter = Indenter.objects.get(bid = bid)
            response['IndenterName'] = indenter.indenter.name
        except Exception as e:
            pass
        try:
            impdates = ImpDates.objects.get(bid = bid)
            response["impdates"] = {
                'issuedate' : impdates.issueddate,
                'boddate' : impdates.boddate,
                'bidsubdate' : impdates.bidsubdate,
                'prebiddate' : impdates.prebiddate
            }
        except Exception as e:
            pass
        try:
            bod = BODC.objects.get(bid=bid)
            response['bodcomdetails'] = {
                'candmBodMem' : getEmployee(bod.candmMem.id),
                'indentBodMem' : getEmployee(bod.indentMem.id),
                'fandaBodMem' : getEmployee(bod.fandaMem.id)
            }
            tec = TECC.objects.get(bid=bid)
            response['teccomdetails'] = {
                'candmTecMem' : getEmployee(tec.candmMem.id),
                'indentTecMem' : getEmployee(tec.indentMem.id),
                'fandaTecMem' : getEmployee(tec.fandaMem.id)
            }
        except Exception as e:
            pass
        if(bid.bid_type == "OpenTender"):
            try:
                qr = QR.objects.get(bid=bid)
                response['qrdetails'] = {
                    'qrdate' : qr.qrdate,
                    'qrapproveddate' : qr.qrapproveddate,
                    'candmQrMem' : getEmployee(qr.candmMem.id),
                    'fandaQrMem' : getEmployee(qr.fandaMem.id),
                    'indentQrMem' : getEmployee(qr.indentMem.id),
                    'maatvalue' : qr.maatvalue,
                    'oneordervalue' : qr.oneordervalue,
                    'twoordervalue' : qr.twoordervalue,
                    'threeordervalue' : qr.threeordervalue
                }

            except Exception as e:
                pass
        elif(bid.bid_type == "LTE"):
            try:
                ltedetails = LteDetails.objects.get(bid = bid)
                response["emdwaivedoff"] = ltedetails.emdwaivedoff
                response['tendertype'] = ltedetails.tendertype
                nitsentvendors = VendorBid.objects.filter(bid = bid)
                nitsentvendors = nitsentvendors.values()
                response["nitsentvendors"] = [getVendor(obj['vendor_id']) for obj in nitsentvendors]
                if (not ltedetails.emdwaivedoff):
                    response["emd"] = getEmdPrice(ltedetails.estCost)
                    response["emdwords"] = amount2words(getEmdPrice(ltedetails.estCost))
            except Exception as e:
                pass
            try:
                ltegc = LteGeneralConditions.objects.get(bid = bid)
                response["boddate"] = ltegc.boddt
                response["proposalnoteapproveddt"] = ltegc.proposalnoteapproveddt
                response['nitgcc'] = {
                    'scopeofwork' : ltegc.scopeofwork,
                    'scopeofworkText' : ltegc.scopeofworkText,
                    'emd' : ltegc.emd,
                    'emdText' : ltegc.emdText,
                    'paymentterms' : ltegc.paymentterms,
                    'paymenttermsText' : ltegc.paymenttermsText,
                    'contractperiod' : ltegc.contractperiod,
                    'contractperiodText' : ltegc.contractperiodText,
                    'deliveryperiod' : ltegc.deliveryperiod,
                    'delivaryperiodText' : ltegc.delivaryperiodText,
                    'pricebasis' : ltegc.pricebasis,
                    'pricebasisText' : ltegc.pricebasisText,
                    'validity' : ltegc.validity,
                    'validityText' : ltegc.validityText,
                    'taxesandduties' : ltegc.taxesandduties,
                    'taxesanddutiestext' : ltegc.taxesanddutiestext,
                    'warranty' : ltegc.warranty,
                    'warrantyText' : ltegc.warrantyText,
                    'cpg' : ltegc.cpg,
                    'cpgText' : ltegc.cpgText,
                    'sd' : ltegc.sd,
                    'sdText' : ltegc.sdText,
                    'ld' : ltegc.ld,
                    'ldText' : ltegc.ldText,
                    'qv' : ltegc.qv,
                    'qvText' : ltegc.qvText,
                    'arbitration' : ltegc.arbitration,
                    'arbitrationText' : ltegc.arbitrationText,
                    'officerincharge' : ltegc.officerincharge,
                    'officerinchargeText' : ltegc.officerinchargeText
                }
            except Exception as e:
                pass
            try:
                participatedvendors = participatedBidders.objects.filter(bid = bid)
                participatedvendors = participatedvendors.values()
                response['participatedvendors'] = [getVendor(obj['vendor_id']) for obj in participatedvendors]
            except Exception as e:
                pass
        elif(bid.bid_type == "LTE-eproc"):
            try:
                ltedetails = LteEprocDetails.objects.get(bid = bid)
                response["emdwaivedoff"] = ltedetails.emdwaivedoff
                nitsentvendors = VendorBid.objects.filter(bid = bid)
                nitsentvendors = nitsentvendors.values()
                response["nitsentvendors"] = [getVendor(obj['vendor_id']) for obj in nitsentvendors]
                if (not ltedetails.emdwaivedoff):
                    response["emd"] = getEmdPrice(ltedetails.estCost)
                    response["emdwords"] = amount2words(getEmdPrice(ltedetails.estCost))
            except Exception as e:
                pass
            try:
                response['participatedvendors'] = get_participated_vendors(bid)
            except Exception as e:
                pass
        return JsonResponse(response)
    except Exception as ex:
        print(ex)
        response = {
            'status':False
        }
        return JsonResponse(response)

def create_qr(bid):
    qr = QR.objects.get(bid = bid)
    indent_no = str(bid.indent_number)
    context = {
        'ref_no' : get_ref_no(bid),
        'qr_date' : datetime.strftime(qr.qrdate,"%d.%m.%Y"),
        'subject' : bid.bid_subject,
        'cnm_qr_member' : qr.candmMem.name,
        'cnm_desg' : qr.candmMem.designation,
        'fna_qr_member' : qr.fandaMem.name,
        'fna_desg' : qr.fandaMem.designation,
        'intend_qr_member' : qr.indentMem.name,
        'intend_desg' : qr.indentMem.designation,
        'intend_dpt' : get_indentdept(bid),
        'maat_value' : qr.maatvalue,
        'one_order_value' : qr.oneordervalue,
        'two_order_value' : qr.twoordervalue,
        'three_order_value' : qr.threeordervalue
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_QR_Notesheet"
    doc = DocxTemplate("Template_QR_Notesheet.docx")
    doc.render(context,autoescape = True)
    doc.save(filename+".docx")
    filename = foldername+"I-"+indent_no+"_QR"
    doc = DocxTemplate("Template_QR.docx")
    doc.render(context,autoescape = True)
    doc.save(filename+".docx")
    return filename+".docx"


def get_est_cost(bid):
    if(bid.bid_type == "OpenTender"):
        otpns = OtProposalNoteSheet.objects.get(bid = bid)
        return otpns.estCost
    elif(bid.bid_type == "LTE"):
        ltedetails = LteDetails.objects.get(bid = bid)
        return ltedetails.estCost
    elif(bid.bid_type == "LTE-eproc"):
        lteEprocdetails = LteEprocDetails.objects.get(bid = bid)
        return lteEprocdetails.estCost
    elif(bid.bid_type == "SpotQuotation"):
        sqdetails = SpotQuotationDetails.objects.get(bid = bid)
        return sqdetails.estCost

def get_completion_period(bid):
    if(bid.bid_type == "OpenTender"):
        otpns = OtProposalNoteSheet.objects.get(bid = bid)
        return otpns.completionperiod
    elif(bid.bid_type == "LTE"):
        ltedetails = LteDetails.objects.get(bid = bid)
        return ltedetails.completionperiod
    elif(bid.bid_type == "LTE-eproc"):
        lteEprocdetails = LteEprocDetails.objects.get(bid = bid)
        return lteEprocdetails.completionperiod
    elif(bid.bid_type == "SpotQuotation"):
        sqdetails = SpotQuotationDetails.objects.get(bid = bid)
        return sqdetails.completionperiod

def prepareQR(request):
    data = json.loads(request.body.decode('utf-8'))
    bid = Bid.objects.get(indent_number=data["indentNo"])
    qr  = QR(
        bid = bid,
        candmMem = Employee.objects.get(id = data["candmQrMem"]["id"]),
        indentMem = Employee.objects.get(id = data["indentQrMem"]["id"]),
        fandaMem = Employee.objects.get(id = data["fandaQrMem"]["id"]),
        maatvalue = data["maatvalue"],
        oneordervalue = data["oneordervalue"],
        twoordervalue = data["twoordervalue"],
        threeordervalue = data["threeordervalue"]
    )
    qr.save()
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
    res = create_qr(bid)
    response = send_file_docx(res)
    changeStatus(bid,"QR to be Approved")
    return response

def editqr(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        bid = Bid.objects.get(indent_number=data["indentNo"])
        qr = QR.objects.get(bid=bid)
        bod =BODC.objects.get(bid=bid)
        tec = TECC.objects.get(bid=bid)
        qr.qrapproveddate = getDate(data["qrapproveddate"])
        qr.qrdate = getDate(data["qrdate"])
        qr.candmMem = Employee.objects.get(id = data["candmQrMem"]["id"])
        qr.indentMem = Employee.objects.get(id = data["indentQrMem"]["id"])
        qr.fandaMem = Employee.objects.get(id = data["fandaQrMem"]["id"])
        qr.maatvalue = data["maatvalue"]
        qr.oneordervalue = data["oneordervalue"]
        qr.twoordervalue = data["twoordervalue"]
        qr.threeordervalue = data["threeordervalue"]
        bod.candmMem = Employee.objects.get(id = data["candmBodMem"]["id"])
        bod.indentMem = Employee.objects.get(id = data["indentBodMem"]["id"])
        bod.fandaMem = Employee.objects.get(id = data["fandaBodMem"]["id"])
        tec.candmMem = Employee.objects.get(id = data["candmTecMem"]["id"])
        tec.indentMem = Employee.objects.get(id = data["indentTecMem"]["id"])
        tec.fandaMem = Employee.objects.get(id = data["fandaTecMem"]["id"])
        qr.save()
        bod.save()
        tec.save()
        res = create_qr(bid)
        return JsonResponse({'edited':True})
    except Exception as e:
        x = 1
        return JsonResponse({'edited':False})

def prepareOtNIT(bid):
    otpns = OtProposalNoteSheet.objects.get(bid = bid)
    qr = QR.objects.get(bid = bid)
    indent_no = str(bid.indent_number)
    context = {
    'indent_no': str(bid.indent_number),
    'ref_no' : get_ref_no(bid),
    'issue_dt' : "{{issue_dt}}",
    'subject': bid.bid_subject,
    'engineer_incharge': otpns.engineerIncharge,
    'address_consigne': otpns.addressConsignee,
    'doc_price': str(getDocPrice(otpns.estCost)),
    'emd_price': str(getEmdPrice(otpns.estCost)),
    'doc_price_words': amount2words(getDocPrice(otpns.estCost)),
    'emd_price_words': amount2words(getEmdPrice(otpns.estCost)),
    'bid_sub_dt': "{{bid_sub_dt}}",
    'pre_bid_dt': "{{pre_bid_dt}}",
    'bod_dt': "{{bod_dt}}",
    'est_cost': str(otpns.estCost),
    'three_order_value': str(qr.threeordervalue),
    'two_order_value': str(qr.twoordervalue),
    'one_order_value': str(qr.oneordervalue),
    'maat_value': str(qr.maatvalue),
    'est_cost_words': amount2words(otpns.estCost),
    'bid_open_days': otpns.bidopendays,
    'tender_cat': otpns.tenderCategory,
    'product_cat': otpns.productCategory,
    'intend_dpt': get_indentdept(bid),
    }
    foldername = "I-"+indent_no+"/"
    if not os.path.exists(os.path.dirname(foldername)):
        os.makedirs(os.path.dirname(foldername))
    filename = foldername+"I-"+indent_no+"_Tender_Document"
    doc = DocxTemplate("Template_Tender_Document.docx")
    doc.render(context,autoescape = True)
    doc.save(filename+".docx")
    return filename+".docx"

def getOtNIT(request):
    data = json.loads(request.body.decode('utf-8'))
    bid = Bid.objects.get(indent_number=data["indentNo"])
    qr =QR.objects.get(bid = bid)
    qr.qrapproveddate = data["qrapproveddate"]
    res = prepareOtNIT(bid)
    response = send_file_docx(res)
    changeStatus(bid,"NIT prepared for Vetting")
    return response

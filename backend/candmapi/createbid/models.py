from django.db import models
from django.contrib.postgres.fields import *
from datetime import date


def increment_indent_number():
   last_indent = Bid.objects.all().order_by('indent_number').last()
   if not last_indent:
        return 560
   return last_indent.indent_number+1

def increment_et_number():
    last_et = EprocTender.objects.all().order_by('etNo').last()
    if not last_et:
        return 34
    return last_et.etNo+1

def enter_stages():
    TenderStages.objects.all().delete()
    for bid in BID_STAGES:
        for i,stage in enumerate(BID_STAGES[bid]):
            ts = TenderStages(
                bid_type = bid,
                stage_number = i,
                stage = stage
            )
            ts.save()

BID_STAGES = {
    'LTE' : ['Approved NoteSheet'],
    'SpotQuotation' : [
        'Approved NoteSheet',
        'Spot Enquiry',
        'TEC Committee Report',
        'Clarrifications',
        'Award Contract',
        'Close Contract'
    ]
}


BID_STATUS = {
    0 : 'Created Proposal Notesheet',
}


class Bid(models.Model):
    BID_TYPES = [('LTE','LTE'),
    ('LTE-eproc',"LTE-eproc"),
    ('OpenTender','OpenTender'),
    ('Ammendment','Ammendment'),
    ('SpotQuotation','SpotQuotation'),
    ('SingleTender','SingleTender')
    ]
    indent_number = models.IntegerField(primary_key = True,default=increment_indent_number)
    bid_subject = models.TextField()
    bid_type = models.CharField(choices=BID_TYPES,max_length=15,default="LTE")
    tender_category = models.CharField(default = 'Other',max_length = 50)
    contract_type = models.CharField(default = 'Other',max_length = 50)
    product_category = models.CharField(default = 'Other',max_length = 50)
    bid_stage = models.IntegerField(default = 0)

#Model to store the stages of contract
class TenderStages(models.Model):
    bid_type = models.CharField(max_length=15)
    stage_number = models.IntegerField()
    stage = models.CharField(max_length=20)

#Model to store presentstage of Bid




class EprocTender(models.Model):
    bid = models.OneToOneField(Bid,on_delete=models.CASCADE)
    etNo = models.IntegerField(primary_key=True,default = increment_et_number)

class BidStatus(models.Model):
    bid = models.OneToOneField(Bid,on_delete=models.CASCADE)
    bid_status = models.CharField(max_length=100,default='Created Proposal Notesheet')

class Proposal(models.Model):
    bid = models.OneToOneField(Bid,on_delete=models.CASCADE)
    proposalRefNo = models.CharField(max_length=100)
    proposalDate = models.DateField()
    proposalRecievedDate = models.DateField()
    proposalApprovedDate = models.DateField(default = None, null = True)
    indentDept = models.CharField(max_length=100)
    indentDesignation = models.CharField(max_length = 100,default = None, null = True)

class OtProposalNoteSheet(models.Model):
    bid = models.OneToOneField(Bid,on_delete=models.CASCADE)
    estCost = models.FloatField()
    gstIncl = models.BooleanField()
    noteDate = models.DateField()
    noteApprovedDate = models.DateField(null = True)
    noteBy = models.CharField(max_length=100)
    notebyDesg = models.CharField(max_length=100)
    bidopendays = models.IntegerField(default=21)
    completionterms = models.TextField(default = '')
    tenderCategory = models.CharField(max_length=100)
    productCategory = models.CharField(max_length=100)
    engineerIncharge = models.CharField(max_length=100)
    addressConsignee = models.CharField(max_length=100)
    completionperiod = models.FloatField(default=1.0)

class OpenTender(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    et = models.OneToOneField(EprocTender,on_delete=models.CASCADE)
    proposal = models.OneToOneField(Proposal,on_delete=models.CASCADE)
    proposalnotesheet = models.OneToOneField(OtProposalNoteSheet,on_delete=models.CASCADE)

class Vendor(models.Model):
    name = models.CharField(max_length=100)
    street1 = models.CharField(max_length=1000)
    street2 = models.CharField(max_length=1000)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.IntegerField()
    mobilenos = ArrayField(models.CharField(max_length = 20))
    emailids = ArrayField(models.CharField(max_length = 50))
    products = ArrayField(models.CharField(max_length = 100))
    services = ArrayField(models.CharField(max_length = 100))
    works = ArrayField(models.CharField(max_length = 100))
    msme = models.BooleanField()
    nsic = models.BooleanField()
    cpp = models.BooleanField(default=False)
    blacklisted = models.BooleanField()
    remarks = models.CharField(max_length = 1000)

class Employee(models.Model):
    emp_no = models.CharField( max_length=15 )
    name = models.CharField( max_length=50)
    designation = models.CharField(max_length=50)

class Indenter(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    indenter = models.ForeignKey(Employee,on_delete = models.CASCADE)

class QR(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    candmMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='qrcandMem')
    indentMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='qrindentMem')
    fandaMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='qrfandaMem')
    maatvalue = models.FloatField()
    oneordervalue = models.FloatField()
    twoordervalue = models.FloatField()
    threeordervalue = models.FloatField()
    qrdate = models.DateField(default = date.today)
    qrapproveddate = models.DateField(blank=True,default =None,null=True)

class BODC(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    candmMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='bodcandMem')
    indentMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='bodindentMem')
    fandaMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='bodfandaMem')

class TECC(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    candmMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='teccandMem')
    indentMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='tecindentMem')
    fandaMem = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='tecfandaMem')

#Model to store lte details such as estimated cost, note by details, note date
class LteDetails(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    tendertype = models.CharField(max_length=50,default="supply")
    completionperiod = models.CharField(max_length=100,default="45 Days")
    estCost = models.FloatField()
    gstIncl = models.BooleanField()
    emdwaivedoff = models.BooleanField()
    noteby = models.ForeignKey(Employee,on_delete = models.CASCADE)
    notedate = models.DateField()

class VendorBid(models.Model):
    bid = models.ForeignKey(Bid,on_delete = models.CASCADE)
    vendor = models.ForeignKey(Vendor,on_delete = models.CASCADE)

class LteEprocDetails(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    estCost = models.FloatField()
    completionperiod = models.CharField(max_length = 150,default="30 Days")
    gstIncl = models.BooleanField()
    emdwaivedoff = models.BooleanField()
    noteby = models.ForeignKey(Employee,on_delete = models.CASCADE)
    notedate = models.DateField()

#Model to store the general conditions and nit proposal approve date
class LteGeneralConditions(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE, primary_key=True)
    proposalnoteapproveddt = models.DateField()
    boddt = models.DateField()
    specialconditions = models.BooleanField()
    scopeofwork = models.BooleanField()
    scopeofworkText = models.CharField(max_length=50000)
    emd = models.BooleanField(default=False)
    emdText = models.CharField(max_length = 50000,default=' ')
    paymentterms = models.BooleanField()
    paymenttermsText = models.CharField(max_length=50000)
    contractperiod = models.BooleanField()
    contractperiodText = models.CharField(max_length=50000,default=' ')
    deliveryperiod = models.BooleanField()
    delivaryperiodText = models.CharField(max_length=50000)
    pricebasis = models.BooleanField()
    pricebasisText = models.CharField(max_length=50000)
    validity = models.BooleanField()
    validityText = models.CharField(max_length=50000)
    taxesandduties = models.BooleanField()
    taxesanddutiestext = models.CharField(max_length=50000)
    warranty = models.BooleanField()
    warrantyText = models.CharField(max_length=50000)
    cpg = models.BooleanField()
    cpgText = models.CharField(max_length=50000)
    sd = models.BooleanField()
    sdText = models.CharField(max_length=50000)
    ld = models.BooleanField()
    ldText = models.CharField(max_length=50000)
    qv = models.BooleanField()
    qvText = models.CharField(max_length=50000)
    arbitration = models.BooleanField()
    arbitrationText = models.CharField(max_length=50000)
    officerincharge = models.BooleanField()
    officerinchargeText = models.CharField(max_length=50000)

class ImpDates(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE, primary_key=True)
    issueddate = models.DateField()
    boddate = models.DateField(blank=True,default =None,null=True)
    bidsubdate = models.DateField(blank=True,default =None,null=True)
    prebiddate = models.DateField(blank=True,default =None,null=True)

class FirstImpDates(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE, primary_key=True)
    issueddate = models.DateField()
    boddate = models.DateField(blank=True,default =None,null=True)
    bidsubdate = models.DateField(blank=True,default =None,null=True)
    prebiddate = models.DateField(blank=True,default =None,null=True)

#Model to store all the corrigenda issued
class Corrigenda(models.Model):
    bid = models.ForeignKey(Bid,on_delete = models.CASCADE)
    description = models.CharField(max_length=50000)
    reason = models.CharField(max_length=50000)
    issueddate = models.DateField()
    boddate = models.DateField(blank=True,default =None,null=True)
    bidsubdate = models.DateField(blank=True,default =None,null=True)
    prebiddate = models.DateField(blank=True,default =None,null=True)
    issuedby = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='issuedby')

#Model to store about who participated in the bid/tender
class participatedBidders(models.Model):
    bid = models.ForeignKey(Bid,on_delete = models.CASCADE)
    vendor = models.ForeignKey(Vendor,on_delete = models.CASCADE)
    remarks = models.CharField(max_length=10000)
    submittedonline = models.CharField(max_length=100, default = 'Offline')
    qualified = models.BooleanField(default=True)
    emddetail = models.CharField(max_length=100,default='emdwaivedoff')
    docfee = models.CharField(max_length=100,default='free')

#Model to store paymentdetails for EMD and Document Fee
class PaymentDetails(models.Model):
    bid = models.ForeignKey(Bid,on_delete = models.CASCADE)
    vendor = models.ForeignKey(Vendor,on_delete = models.CASCADE)
    paymentfor = models.CharField(max_length=30)
    paymentdetails = models.CharField(max_length = 1000)

#Model to store the quotations of different participated bidders
class biddersquotedetails(models.Model):
    bid = models.ForeignKey(Bid,on_delete = models.CASCADE)
    vendor = models.ForeignKey(Vendor,on_delete = models.CASCADE)
    quoteamount = models.FloatField()

#Model for LOA / PO loapovetting
class Loapovetting(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE)
    awardvendor = models.ForeignKey(Vendor,on_delete = models.CASCADE)
    awardquoteamount = models.FloatField()
    awardgstincl = models.BooleanField()
    ndaclause = models.BooleanField()
    saclause = models.BooleanField()
    cpgclause = models.BooleanField()
    specialconditions = models.BooleanField()
    typeofaward = models.CharField(max_length=20)
    tecdate = models.DateField()
    loaapproveddate = models.DateField()

#Model for General Conditions in LOA/property
class loagcc(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE)
    scopeofwork = models.BooleanField()
    scopeofworkText = models.CharField(max_length=50000)
    emd = models.BooleanField(default=False)
    emdText = models.CharField(max_length = 50000,default=' ')
    paymentterms = models.BooleanField()
    paymenttermsText = models.CharField(max_length=50000)
    contractperiod = models.BooleanField()
    contractperiodText = models.CharField(max_length=50000,default=' ')
    deliveryperiod = models.BooleanField()
    delivaryperiodText = models.CharField(max_length=50000)
    pricebasis = models.BooleanField()
    pricebasisText = models.CharField(max_length=50000)
    validity = models.BooleanField()
    validityText = models.CharField(max_length=50000)
    taxesandduties = models.BooleanField()
    taxesanddutiestext = models.CharField(max_length=50000)
    warranty = models.BooleanField()
    warrantyText = models.CharField(max_length=50000)
    cpg = models.BooleanField()
    cpgText = models.CharField(max_length=50000)
    sd = models.BooleanField()
    sdText = models.CharField(max_length=50000)
    ld = models.BooleanField()
    ldText = models.CharField(max_length=50000)
    qv = models.BooleanField()
    qvText = models.CharField(max_length=50000)
    arbitration = models.BooleanField()
    arbitrationText = models.CharField(max_length=50000)
    officerincharge = models.BooleanField()
    officerinchargeText = models.CharField(max_length=50000)

#Model for LTE Eprocurement NIT details
class LteEprocNitDetails(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE)
    engineerincharge_type = models.CharField(max_length = 100)
    engineerincharge_desg = models.CharField(max_length = 100)
    engineerincharge_dept = models.CharField(max_length = 100)
    addressconsignee_desg = models.CharField(max_length = 100)
    addressconsignee_dept = models.CharField(max_length = 100)
    proposalapprovedDate = models.DateField()
    tender_category = models.CharField(max_length = 100)
    product_category = models.CharField(max_length = 100)
    type_of_contract = models.CharField(max_length = 100)
    bid_valid_days = models.IntegerField()

#Model for Eprocurement datedetails
class EprocDates(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE)
    tecdate = models.DateField(blank=True,default =None,null=True)
    finbidopenapprovaldate = models.DateField(blank=True,default =None,null=True)
    finopendate = models.DateField(blank=True,default =None,null=True)
    tecafterclarrificationdate = models.DateField(blank=True,default =None,null=True)
    clarrificationsentdate = models.DateField(blank=True,default =None,null=True)
    clarrificationlastdate = models.DateField(blank=True,default =None,null=True)
    loapoapproveddate = models.DateField(blank=True,default =None,null=True)

#Model for SpotQuotation details
class SpotQuotationDetails(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    estCost = models.FloatField()
    completionperiod = models.CharField(max_length = 150,default="30 Days")
    gstIncl = models.BooleanField()
    emdwaivedoff = models.BooleanField()

#Model for SpotQuotation Enquiry Details
class SpotEnquiryDetails(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    engineerInchargeDesignation = models.CharField(max_length = 150)
    engineerInchargeDepartment = models.CharField(max_length = 150)
    includeSpecialConditions = models.BooleanField()
    enquirydate = models.DateField(blank=True,default =None,null=True)
    bidopeningdate = models.DateField(blank=True,default =None,null=True)

#Model for SpotQuotation Committee Members (As they can be more than three)
class SpotQuotationCommittee(models.Model):
    bid = models.ForeignKey(Bid,on_delete = models.CASCADE)
    committeeMember = models.ForeignKey(Employee,on_delete = models.CASCADE,related_name='committeeMember')



# Create your models here.

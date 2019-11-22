from django.db import models
from django.contrib.postgres.fields import *

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
    indentDept = models.CharField(max_length=100)

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
    blacklisted = models.BooleanField()
    remarks = models.CharField(max_length = 1000)

# Create your models here.

from djongo import models

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

class Proposal(models.Model):
    bid = models.OneToOneField(Bid,on_delete=models.CASCADE)
    proposalRefNo = models.CharField(max_length=100)
    proposalDate = models.DateField()
    proposalRecievedDate = models.DateField()
    indentDept = models.CharField(max_length=100)

class proposalNoteSheet(models.Model):
    bid = models.OneToOneField(Bid,on_delete=models.CASCADE)
    estCost = models.FloatField()
    gstIncl = models.BooleanField()
    noteDate = models.DateField()
    noteApprovedDate = models.DateField(null = True)
    noteBy = models.CharField(max_length=100)
    notebyDesg = models.CharField(max_length=100)
    bidopendays = models.IntegerField(default=21)
    completionterms = models.TextField()
    tenderCategory = models.CharField(max_length=100)
    productCategory = models.CharField(max_length=100)
    engineerIncharge = models.CharField(max_length=100)
    addressConsignee = models.CharField(max_length=100)

class OpenTender(models.Model):
    bid = models.OneToOneField(Bid,on_delete = models.CASCADE,primary_key=True)
    et = models.OneToOneField(EprocTender,on_delete=models.CASCADE)
    proposal = models.OneToOneField(Proposal,on_delete=models.CASCADE)
    proposalnotesheet = models.OneToOneField(proposalNoteSheet,on_delete=models.CASCADE)
    
    
# Create your models here.

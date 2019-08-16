from django.db import models

def increment_indent_number():
    last_indent = Bid.objects.all().order_by('indent_number').last()
    if not last_indent:
        return 560
    return last_indent.indent_number+1

class Bid(models.Model):
    BID_TYPES = [('LTE','LTE'),
    ('OpenTender','OpenTender'),
    ('Ammendment','Ammendment'),
    ('SpotQuotation','SpotQuotation'),
    ('SingleTender','SingleTender')
    ]
    indent_number = models.IntegerField(primary_key = True,default = increment_indent_number)
    bid_subject = models.TextField(default="Procurement")
    bid_type = models.CharField(choices=BID_TYPES,max_length=15,default="LTE")



# Create your models here.

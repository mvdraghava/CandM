from django.contrib import admin

from .models import Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor,Employee,TECC,BODC,QR


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor,Employee,
TECC,QR,BODC])

# Register your models here.

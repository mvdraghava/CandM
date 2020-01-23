from django.contrib import admin

from .models import *


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor,Employee,
TECC,QR,BODC,LteDetails,VendorBid,LteEprocDetails,Loapovetting,loagcc,Indenter])

# Register your models here.

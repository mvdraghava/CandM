from django.contrib import admin

from .models import *


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor,Employee,
TECC,QR,BODC,LteDetails,VendorBid])

# Register your models here.

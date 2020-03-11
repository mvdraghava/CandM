from django.contrib import admin

from .models import *


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor,Employee,
TECC,QR,BODC,LteDetails,VendorBid,LteEprocDetails,Loapovetting,loagcc,Indenter,SpotQuotationCommittee,participatedBidders,
biddersquotedetails])

# Register your models here.

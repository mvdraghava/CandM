from django.contrib import admin

from .models import Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet,BidStatus,Vendor])

# Register your models here.

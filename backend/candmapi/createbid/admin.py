from django.contrib import admin

from .models import Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet,BidStatus


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet,BidStatus])

# Register your models here.

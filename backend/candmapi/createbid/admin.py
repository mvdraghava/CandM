from django.contrib import admin

from .models import Bid,OpenTender,EprocTender,Proposal,OtProposalNoteSheet


admin.site.register([OpenTender,Bid,EprocTender,Proposal,OtProposalNoteSheet])

# Register your models here.

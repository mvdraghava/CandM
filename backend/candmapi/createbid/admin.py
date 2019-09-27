from django.contrib import admin

from .models import Bid,OpenTender,EprocTender,Proposal,proposalNoteSheet


admin.site.register([OpenTender,Bid,EprocTender,Proposal,proposalNoteSheet])

# Register your models here.

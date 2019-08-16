from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from .models import increment_indent_number

def next_indentnumber(request):
    return JsonResponse({'indentNumber': increment_indent_number()})
# Create your views here.

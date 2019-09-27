from docx import Document
from django.http import  HttpResponse

def send_file_docx(data):
    document = Document(data)
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    response['Content-Disposition'] = 'attachment; filename = "download.docx"'
    document.save(response)
    return response

def amount2words(amt):
    amt_word = num2words(amt,lang="en_IN")
    amt_word = amt_word.replace("-"," ")
    amt_word = " ".join([i.capitalize() for i in amt_word.split(" ")])
    return amt_word
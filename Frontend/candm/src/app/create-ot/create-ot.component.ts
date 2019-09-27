import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CreateTenderService, IndentNumber } from '../create-tender.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-create-ot',
  templateUrl: './create-ot.component.html',
  styleUrls: ['./create-ot.component.css']
})
export class CreateOtComponent implements OnInit {
  error: any;
  indnum: IndentNumber;
  createOtForm = this.formbuilder.group({
    tenderDetails: this.formbuilder.group({
      indentNo : '',
      tenderSubject: '',
      etNo: '',
      tenderCategory: '',
      productCategory: ''
    }),
    proposalDetails: this.formbuilder.group({
      proposalRefNo: '',
      proposalDate: '',
      proposalRecievedDate: '',
      indentDept: '',
      engineerIncharge: '',
      addressConsignee: ''
    }),
    amountDetails: this.formbuilder.group({
      estCost: '',
      gstIncl: '',
    }),
    noteDetails: this.formbuilder.group({
      noteDate: '',
      noteBy: '',
      notebyDesg: ''
    })
  });

  constructor(private formbuilder: FormBuilder, private cts: CreateTenderService) { }

  ngOnInit() {
    this.cts.getNextIndentNumber().subscribe((data: IndentNumber) => this.indnum = { ...data},
    error => this.error = error);
  }

  onSubmit() {
    console.warn(this.createOtForm.value);
    this.cts.postcreateOt(this.createOtForm.value).subscribe(
      data => {
        saveAs(data, 'OpenTenderNotesheet.docx' );
      });
  }
}

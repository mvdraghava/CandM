import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import { CreatesqserviceService } from './createsqservice.service';
import { Employee } from '../employee';
import {map, startWith} from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { departments,tendercategories,contracttypes,productcategories } from '../globalvariables';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createsq',
  templateUrl: './createsq.component.html',
  styleUrls: ['./createsq.component.css']
})
export class CreatesqComponent implements OnInit {

  employees:Employee[] = [];
  indentFilteredEmployees: Observable<Employee[]>;
  departments = departments;
  productcategories = productcategories;
  tendercategories = tendercategories;
  contracttypes = contracttypes;
  times = ['Days','Months','Years'];
  createSq = this.fb.group({
    indent_no: ['',Validators.required],
    subject: ['',Validators.required],
    tendertype : ['', Validators.required],
    contracttype : ['', Validators.required],
    productcategory : ['', Validators.required],
    completionperiod: ['',Validators.required],
    durationmeasured: ['',Validators.required],
    proposalDetails: this.fb.group({
      proposalRefNo: ['',Validators.required],
      proposalDate: ['',Validators.required],
      proposalRecievedDate: ['',Validators.required],
      proposalApprovedDate: ['',Validators.required],
      indentDept: ['',Validators.required],
      indentedBy: ['',[Validators.required, this.validateEmployee]]
    }),
    amountDetails: this.fb.group({
      estCost: ['',Validators.required],
      gstIncl: ['',Validators.required],
      emdwaivedoff : ['',Validators.required]
    })
  });

  get proposalDetails() {
    return this.createSq.get('proposalDetails') as FormGroup;
  }

  constructor(private fb: FormBuilder,private createSqService: CreatesqserviceService,private router: Router) { }

  ngOnInit() {
    this.createSqService.getemployees().subscribe(
      data => {
        this.employees = data;
        this.indentFilteredEmployees = this.proposalDetails.controls.indentedBy.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterEmployees(name) : this.employees.slice())
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  displayFnemp(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  validateEmployee(c: FormControl) {
    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }

  contractdelivery() {
    if(this.createSq.controls.tendertype.value == "Goods"){
      return "Delivery";
    }
    else
      return "Contract"
  }

  createsqtender() {
    this.createSqService.createsq(this.createSq.value).subscribe(
      data => {
        if(data['success']){
          window.alert('Created Spot Quatation');
          this.router.navigate(['open-bids']);
        }else{
            window.alert('Some Error has occured');
        }
      },
      error => {
        window.alert('Some Error has occured');
      }
    );
  }

}

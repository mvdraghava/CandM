import { Component, OnInit, Input } from '@angular/core';
import { FormsModule,
          ReactiveFormsModule,
          FormGroup,
          FormBuilder,
          FormControl,
          FormArray,
          Validators
} from '@angular/forms';
import { Employee } from '../../employee';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { CreateTenderService } from './../../create-tender.service';

@Component({
  selector: 'app-employee-field',
  templateUrl: './employee-field.component.html',
  styleUrls: ['./employee-field.component.css']
})
export class EmployeeFieldComponent implements OnInit {

  employees: Employee[] = [];
  FilteredEmployees: Observable<Employee[]>;
  @Input() empLabel: string;
  public inputEmployee = new FormControl('', {
    validators: [this.validateEmployee, Validators.required]
  });

  constructor(private cts: CreateTenderService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cts.getemployees().subscribe(
      data => {
        this.employees = data;
        this.FilteredEmployees = this.inputEmployee.valueChanges
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

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().includes(filterValue));
  }

  displayFnemp(emp?: Employee): String | undefined {
    return emp ? emp.name : undefined;
  }

  validateEmployee(c: FormControl) {
    return c.value.id ? null : {
      validateEmployee: {
        valid: false
      }
    };
  }



}

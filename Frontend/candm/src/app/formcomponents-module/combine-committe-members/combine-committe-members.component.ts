import { Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  ViewChildren
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeFieldComponent } from './../employee-field/employee-field.component';

@Component({
  selector: 'app-combine-committe-members',
  templateUrl: './combine-committe-members.component.html',
  styleUrls: ['./combine-committe-members.component.css']
})
export class CombineCommitteMembersComponent implements OnInit, AfterViewInit {


  @ViewChildren('empmems') empMems;
  Arr = [1, 2, 3];
  committeeMembers = new FormArray([]);
  constructor(private fb: FormBuilder,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.empMems.forEach(empComponent => {
      this.committeeMembers.push(empComponent.inputEmployee);
    });
  }

  addComMem() {
    this.Arr.push(1);
    setTimeout(() => {
      let results = this.empMems.toArray();
      this.committeeMembers.push(results[this.Arr.length - 1].inputEmployee);
    });
  }

  delComMem(i: number) {
    this.committeeMembers.removeAt(i);
    this.Arr.splice(i, 1);
  }
}

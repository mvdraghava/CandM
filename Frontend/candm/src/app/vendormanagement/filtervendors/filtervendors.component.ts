import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Vendor } from '../vendor';

@Component({
  selector: 'app-filtervendors',
  templateUrl: './filtervendors.component.html',
  styleUrls: ['./filtervendors.component.css']
})
export class FiltervendorsComponent implements OnInit {

  constructor() { }
  @Input() allVendors: Vendor[] = [];

  filteredVendors : Vendor[] = [];
  vendorname;
  works;

  @Output() emitDisplayVendors = new EventEmitter<Vendor[]>();
  ngOnInit() {
  }

  sendDisplayVendors(){
    this.filteredVendors = this.allVendors.filter(vendor => {
      if (vendor.name.toLowerCase().includes(this.vendorname.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    this.emitDisplayVendors.emit(this.filteredVendors);
  }

}

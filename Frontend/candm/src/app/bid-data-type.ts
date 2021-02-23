import {Vendor} from './vendor';
export class Bid {
  Indentno: number;
  TenderSubject: string;
  BidStatus: string;
  IndentDepartment: string;
  BidType: string;
  AwardedVendor: Vendor;
  AwardedAmount: number;
  constructor() {
    this.Indentno = null;
    this.TenderSubject = '';
    this.BidStatus = '';
    this.IndentDepartment = '';
    this.BidType = '';
    this.AwardedAmount = null;
    this.AwardedVendor = new Vendor();
  }
}

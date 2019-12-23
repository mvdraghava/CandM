export class Vendor {
  id: number;
  name: string;
  street1: string;
  street2: string;
  city : string;
  state : string;
  pincode : number;
  mobilenos: Array<string>;
  emailids: Array<string>;
  products : Array<string>;
  services: Array<string>;
  works: Array<string>;
  msme: boolean;
  nsic : boolean;
  blacklisted : boolean;
  remarks : string;
  cpp : boolean;

  constructor() {
    this.name = '';
    this.products = [''];
    this.services = [''];
    this.works = [''];
  }

}

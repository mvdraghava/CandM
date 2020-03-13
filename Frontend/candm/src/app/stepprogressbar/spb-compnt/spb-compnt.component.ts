import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spb-compnt',
  templateUrl: './spb-compnt.component.html',
  styleUrls: ['./spb-compnt.component.css']
})
export class SpbCompntComponent implements OnInit {
  @Input() stages;
  @Input() presentStage;
  @Input() mainStages;
  staticMainStages;
  constructor() { }
  appicon = "home";
  ngOnInit() {
    if(!this.mainStages.includes(0)){
      this.mainStages.push(0);
    }
    if(!this.mainStages.includes(this.stages.length - 1)){
      this.mainStages.push(this.stages.length - 1);
    }
    this.staticMainStages = Array.from(this.mainStages);
  }

  getarray(num: number){
    return Array(num);
  }

  geticon(num: number){
    if(num<this.presentStage+1){
      return "done";
    }
    else{
      return "";
    }
  }

  getSize(num: number){
    if(this.mainStages.includes(num)){
      return "100px";
    }
    else{
      return "22px";
    }
  }

  nearinstaticmainstages(search_num: number){
    for (var i of this.staticMainStages) {
      if(i>=search_num){
        let nearIndex =  this.staticMainStages.indexOf(i) - 1;
        if(this.staticMainStages.indexOf(i) == 0){
          return 0;
        }
        return nearIndex;
      }
    }
    return -1;
  }

  checksmallexpanded(){
    let res = -1; //first toggle if there is a toggle
    this.mainStages.forEach(i => {
      if(this.staticMainStages.includes(i)){
      }
      else{
        if(res == -1){
          res = this.nearinstaticmainstages(i);
        }
      }
    });
    return res;
  }

  toggleSmall(toggleat: number) {
    let nearIndex = this.nearinstaticmainstages(toggleat);
    let expandendspot = this.checksmallexpanded();
    if(expandendspot != -1){
      if(expandendspot == nearIndex){
          this.mainStages = Array.from(this.mainStages.filter(i => {return this.staticMainStages.includes(i);}));
      }
      else{
        let newStages = Array.from(this.staticMainStages);
        for(let i = this.staticMainStages[nearIndex]+1;i<this.staticMainStages[nearIndex+1];i++){
          newStages.push(i);
        }
        this.mainStages = Array.from(newStages);
      }
    }
    else if(expandendspot == -1){
      for(let i = this.staticMainStages[nearIndex]+1;i<this.staticMainStages[nearIndex + 1];i++){
        this.mainStages.push(i);
      }
    }

  }




}

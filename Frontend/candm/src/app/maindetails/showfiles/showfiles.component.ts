import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showfiles',
  templateUrl: './showfiles.component.html',
  styleUrls: ['./showfiles.component.css']
})
export class ShowfilesComponent implements OnInit {

  @ViewChild('iframe',{static: false}) iframe: ElementRef;

  reqdata = {
    'indentno':''
  };

  requrl = "";

  filenames = [];

  constructor(private route: ActivatedRoute, private ref: ElementRef) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => {
      this.requrl = "http://192.168.57.52/media/I-";
      let indentNo = params.get('indentno');
      this.requrl = this.requrl + indentNo;
    })
  }

  loaded() {
    var foldersvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var filesvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    if(!this.iframe){
      return;
    }
    var div = this.ref.nativeElement.querySelector('iframe');
    var ll = document.createElement('link');
    ll.rel = 'stylesheet';
    ll.href = '/assets/style.css';
    const iframDoc = this.iframe.nativeElement.contentWindow.document;
    iframDoc.head.appendChild(ll);
    var pre_tag = iframDoc.querySelector('pre');
    var pre_text = pre_tag.innerText;
    var pre_elems = pre_text.split('\n');
    pre_elems.splice(1,1);
    pre_elems = pre_elems.filter(el => {return !(!el);});
    var patt = /<dir>/;
    var dir_elems = [];
    for(var i=0;i<pre_elems.length;i++){
      if(pre_elems[i].match(patt)){
        dir_elems.push(1);
      }
      else{
        dir_elems.push(0);
      }
    }
    dir_elems[0] = 1;
    var pre_links = pre_tag.querySelectorAll('a');
    //for(var i=0;i<dir_elems.length;i++) {
      //pre_links[dir_elems[i]].className = 'dir';
    //}
    iframDoc.body.innerHTML = "";
    var bod_tag = iframDoc.body;
    var div_tag = document.createElement('div');
    div_tag.className = 'container';
    bod_tag.append(div_tag);
    for(var i = 0; i < pre_links.length; i++) {
      var divtag = document.createElement('div');
      var atag = document.createElement('a');
      atag.href = pre_links[i].href;
      divtag.className = 'dir';
      if(dir_elems[i]){
        divtag.innerHTML = foldersvg;
      }
      else {
        divtag.innerHTML = filesvg;
      }
      divtag.append(pre_links[i]);
      atag.append(divtag);
      div_tag.append(atag);
    }
    // console.log(pre_text);
    // console.log(pre_elems);
    // console.log(pre_links);
    // console.log(dir_elems);
    // console.log('printed');
  }

}

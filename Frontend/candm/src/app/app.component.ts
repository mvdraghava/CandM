import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'candm';
  curtain= false;
  curtain_click(){
    this.curtain = false;
  }
}

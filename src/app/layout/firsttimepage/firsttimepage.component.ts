import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firsttimepage',
  templateUrl: './firsttimepage.component.html',
  styleUrls: ['./firsttimepage.component.css']
})
export class FirsttimepageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  Home(){
  	this.router.navigateByUrl('/createteam');
  }

}

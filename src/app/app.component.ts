import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

    constructor(
    public router: Router){

    }
	ngOnInit() 
	{
		this.router.events.subscribe((evt) => 
			{
				if (!(evt instanceof NavigationEnd))
				 {
				 	return;
				 }
				 window.scrollTo(0, 0)
				});

	// var config = {
 //    apiKey: "AIzaSyAuNtmW0NzPywMil4tCMUPyEQko9liMP5s",
 //    authDomain: "scrimmagematch-204812.firebaseapp.com",
 //    databaseURL: "https://scrimmagematch-204812.firebaseio.com",
 //    projectId: "scrimmagematch-204812",
 //    storageBucket: "",
 //    messagingSenderId: "577687945631"
 //  };
 //  firebase.initializeApp(config);	
	}
  
}

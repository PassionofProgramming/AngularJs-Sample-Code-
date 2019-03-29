import { Component, OnInit,NgZone,ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../auth-service.service';
// import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [routerTransition()]
})
export class GridComponent implements OnInit {
   startAt = new Subject()
   endAt = new Subject()
   myControl: FormControl = new FormControl();
   filteredOptions: Observable<string[]>;
   rForm: FormGroup;
   users:any;
   res:any;
   option:any;
  text1:any;
  id:any;

   @ViewChild("search")
   public searchElementRef: ElementRef;
    constructor(    
    public router: Router,
     public authService: AuthServiceService,
     private fb: FormBuilder,
     private toastr: ToastrService) {
   this.rForm = fb.group({
      'user' : null,
      'random':null
      });

    }

    ngOnInit() {

    	this.Users();
    }

     clearForm() {

    this.rForm.reset({
          'user': '',
          'random':''
         });
  }
GenrateNum(){

    var text = "";
    var possible = this.rForm.value.random;
    for (var i = 0; i < 8; i++)
   text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.text1=text;
    console.log(this.text1)
}


   filter(val: string){
   	console.log(val)
    return this.users.filter(option =>
      option.first_name.toLowerCase().includes(val.toLowerCase())

      );
  }

    selectBeneficiary(val)
  {
  	console.log(val)
   // this.skill_id=val; 
  }

   setExchangeID(event)
   {
   	this.id=event;
     console.log(event)
   }

             /************************************Send Promo***************************/

    SendPromo() {
    	if(!this.text1)
    	{
    		 this.presentToast("Please genrate Promo Code First")
    	}
    	
    else{
    		let params=
    		{
    		'id':this.id,
    		'code':this.text1
    	}
     this.authService.sendPromo(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
        	this.rForm.value.random="";
        	this.option="";
        	this.clearForm();
        	 this.presentToast(this.res.message)
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
 }
        
  }

           /************************************Get Users***************************/

    Users() {
     this.authService.getUsers().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.users= this.res.data; 
          this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );

      console.log(this.users)
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        
  }
    /************************************Toast***************************/


   presentToast(msg) {

    this.toastr.success(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }
}

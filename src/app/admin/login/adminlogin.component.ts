import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthServiceService } from '../../auth-service.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'admin-login',
    templateUrl: './adminlogin.component.html',
    styleUrls: ['./adminlogin.component.scss'],
     animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
	 rForm: FormGroup;
      email:any;                     // A property for our submitted form
      password:any;
      res:any;
      alreadyemail: boolean = true;
      alreadypass: boolean = true;
      isValid: boolean = true;

    constructor(
     public router: Router,
     public authService: AuthServiceService,
     private fb: FormBuilder,
     private toastr: ToastrService) 
    {
       this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required])]
      });

    }

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

   /************************************Login***************************/

    login(val,valid: boolean) {
       
        if(valid){
          this.authService.AdminLogin(val).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true){
        	this.presentToast(this.res.message);
        	 localStorage.setItem('isadminLoggedin', JSON.stringify(this.res.data));
             this.router.navigateByUrl('/admin/dashboard');
           
        }
        else{
        	this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        }
        else
        {
         this.validateAllFormFields(this.rForm);
       
    }
  }

    /************************************Validation error***************************/
   

    validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
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

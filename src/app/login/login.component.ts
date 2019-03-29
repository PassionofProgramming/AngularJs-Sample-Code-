import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
 import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;
 res:any;
user: Observable<firebase.User>
 emailValidate = "^([a-zA-Z0-9]+@[a-zA-Z0-9].+)";
  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    public authService: AuthServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService) 
  { 
   this.user = this.afAuth.authState;
    this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
  }

 loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
        console.log(result.user);
         this.googleLogin(result.user.providerData);
        }, (err) => {
         alert(err);
        });
  }


loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((result) => {
        console.log(result.user);
        this.fbLogin(result.user.providerData);
        }, (err) => {
          alert(err);
        });
  }


 forgotPassword(){
    this.router.navigateByUrl('/forgotPassword');
  }
   signup(){
    this.router.navigateByUrl('/signup');
  }

    /************************************Google***************************/

  googleLogin(data){
    console.log(data[0])
    var name=data[0].displayName;
    var first_name = name.split(' ')[0]
    var last_name = name.substring(first_name.length).trim()
    console.log(first_name)
    console.log(last_name)
    // console.log(this.terms)
    var type='G';
    let params={
    first_name:first_name,
     last_name:last_name,
     email:data[0].email,
     id:data[0].uid
    }
    console.log(params)
      this.authService.Signup(params,type).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
           this.presentToast(this.res.message)
              localStorage.setItem('isLoggedin', JSON.stringify(this.res.data));
             this.router.navigateByUrl('/home');
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });

    

  }

  /************************************Facebook***************************/

  fbLogin(data){
    console.log(data[0])
    var name=data[0].displayName;
    var first_name = name.split(' ')[0]
    var last_name = name.substring(first_name.length).trim()
    console.log(first_name)
    console.log(last_name)
    // console.log(this.terms)
    var type='F';
    let params={
    first_name:first_name,
     last_name:last_name,
     email:data[0].email,
     id:data[0].uid
    }
    console.log(params)
      this.authService.Signup(params,type).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
           this.presentToast(this.res.message)
              localStorage.setItem('isLoggedin', JSON.stringify(this.res.data));
             this.router.navigateByUrl('/home');
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });

    

  }
   /************************************Login***************************/

  Login(val,valid){
    console.log(val,valid)
    if(valid){
      this.authService.Login(val).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200){
           
           this.presentToast(this.res.message);
            localStorage.setItem('isLoggedin', JSON.stringify(this.res.data));
             this.router.navigateByUrl('/home');
        }
        else{
          this.presentToast(this.res.message)
       console.log("falseeeee")
        
        }
         
        }, (err) => {
          console.log(err);
        });

    }
    else{
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

    this.toastr.success(this.res.message, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }
}

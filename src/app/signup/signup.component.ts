import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AngularFireDatabase} from 'angularfire2/database';
 import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

declare var jQuery:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 rForm: FormGroup;
 res:any;
 privacydata:any;
 termsdata:any;
 terms:any;
 check:any;
 user: Observable<firebase.User>
 emailValidate = "^([a-zA-Z0-9]+@[a-zA-Z0-9].+)";
  constructor( 
  	public router: Router,
    private afAuth: AngularFireAuth,
    public authService: AuthServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 

    this.user = this.afAuth.authState;
  	  this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required])],
      'first_name' : [null, Validators.compose([Validators.required])],
      'last_name' : [null, Validators.compose([Validators.required])],
      'cpassword' : [null, Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
     this.GetPrivacy();
    this.GetTerms();
  }
  login(){
    this.router.navigateByUrl('/login');
  }
   AcceptTerms(val){
    this.check=val;
    jQuery("#request").modal("show");

    }
    doCheck(){
      console.log(this.terms)
      console.log(this.check)
      if(!this.terms){
        this.presentToast("Please accept the Terms & Conditions and Privacy Policy")
        // alert("Please accept the Terms & Conditions and Privacy Policy")
      }
    else{
      if(this.check=='F'){
        this.loginFacebook();
      }
      else{
         this.loginGoogle();
      }
    }
    }


   loginGoogle() {
    jQuery("#request").modal("hide");
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
        console.log(result.user);
         this.googleLogin(result.user.providerData);
        }, (err) => {
         alert(err);
        });
  }

//   loginFacebook11(){
//    return new Promise<any>((resolve, reject) => {
//      let provider = new firebase.auth.FacebookAuthProvider();
//       provider.addScope('public_profile');
//      this.afAuth.auth
//      .signInWithPopup(provider)
//      .then(res => {
//        resolve(res);
//        console.log(res)
//      }, err => {
//        console.log(err);
//        reject(err);
//      })
//    })
// }


loginFacebook() {
   jQuery("#request").modal("hide");
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((result) => {
        console.log(result.user);
        this.fbLogin(result.user.providerData);
        // var endpoint = "https://graph.facebook.com/me/friends?access_token=";
         

        }, (err) => {
          alert(err);
        });
  }
     /************************************Google***************************/

  googleLogin(data){
    console.log(data[0])
   console.log(data[0].displayName)
    var name=data[0].displayName;
    var first_name = name.split(' ')[0]
    var last_name = name.substring(first_name.length).trim()
    console.log(first_name)
    console.log(last_name)
    var type='G';
    
    let params=
    {
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
    console.log(data[0].displayName)
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

/************************************Sign Up***************************/

  signUp(val,valid){
  	console.log(val,valid)
  	console.log(this.terms)
  	var type='O';
  	if(valid){
  		if(val.password!=val.cpassword){
  		alert("Password and Confirm Password does not match")	
  		}
  		else if(!this.terms){
  			alert("Please accept the Terms & Conditions and Privacy Policy")
  		}
  	
  	else{
      this.authService.Signup(val,type).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
        	 this.presentToast(this.res.message)
             localStorage.setItem('isLoggedin', JSON.stringify(this.res.data));
             this.router.navigateByUrl('/popup');
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
}
  	}
  	else{
  		 this.validateAllFormFields(this.rForm);
  	}

  }

     /************************************GEt Privacy***************************/

    GetTerms() {
     this.authService.getTerms().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         
          this.termsdata=this.res.data.terms_pdf;
        }
        else{
        }
         
        }, (err) => {
          console.log(err);
        });
   
        
  }

    /************************************GEt Privacy***************************/

    GetPrivacy() {
     this.authService.getPrivacy().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         
          this.privacydata=this.res.data.privacy_pdf;
        }
        else{
        }
         
        }, (err) => {
          console.log(err);
        });
   
        
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

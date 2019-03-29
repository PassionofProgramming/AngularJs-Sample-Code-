import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';

declare var jQuery:any;

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.css']
})
export class AccountsettingComponent implements OnInit {
data:any;
res:any;
pro_pic:any;
profile:any;
card_id:any;
img:any;
allcards:any;
id:any;
show_success:boolean=false;
datee:any;
name:any;
app_status:any;
rForm: FormGroup;
passForm: FormGroup;
cardForm: FormGroup;
payForm:FormGroup;
promoForm:FormGroup;
register:any;
promoo:any;
imageLoaded: boolean = false;
  constructor(
  	private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public authService: AuthServiceService) 
  { 
	 this.rForm = fb.group({
      'first_name' : [null, Validators.required],
      'last_name' : [null, Validators.compose([Validators.required])],
      'profile_image' : null,
      'email':null
      });
   this.passForm = fb.group({
      'old_password' : [null, Validators.required],
      'con_password' : [null, Validators.required],
      'new_password' : [null, Validators.compose([Validators.required])]
      });
   this.cardForm = fb.group({
      'card_number' : [null, Validators.required],
      'cvv' : [null, Validators.required],
      'expiry_date' : [null, Validators.compose([Validators.required])]
      });

    this.payForm = fb.group({
      'card_id' : [null, Validators.required]
      });

     this.promoForm = fb.group({
      'promo_code' : [null, Validators.required]
      });
    this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
      this.name=JSON.parse(localStorage.getItem('isLoggedin')).first_name;
    this.register=JSON.parse(localStorage.getItem('isLoggedin')).register_type;

  }

  ngOnInit() {
  	this.data=JSON.parse(localStorage.getItem('isLoggedin'));
    this.getAllCards();
    this.getSubscription();
	  console.log("dataaaaaa",this.data);
  	 this.rForm.get('first_name').setValue(this.data.first_name);
  	 this.rForm.get('last_name').setValue(this.data.last_name);
  	 this.rForm.get('email').setValue(this.data.email);
  	 this.profile=this.data.profile_image;

  }

  edit()
  {
   this.imageLoaded=true
  }

    chooseCard()
  {
      jQuery("#card").modal("show");

    }

    /************************************File REader for team***************************/

  _handleReaderLoaded(e){
       console.log('image', e.target.result);
       this.img=e.target.result;
     }

    /************************************Select File from Library for team***************************/

  onFileChange(event) {
    console.log(event); 
    if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
      if (event.target.files.length > 0) {
       // this.img = true;
        // this.img_valid = true;
        this.pro_pic = event.target.files[0];
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.pro_pic);
      }
    } else {
      // this.img_valid = true;
      // this.img = false;
    }
  }

  DeleteCardModal(id){
     console.log(id)
   this.card_id=id;
   jQuery("#deletecard").modal("show");
  }

      /************************************Promo Code***************************/

   PromoCode(valid,val){
   console.log(val)
    let params={
      id:this.id,
      promo_code:val.promo_code
    };
    if(valid){

      this.authService.addPromoCode(params).then((result) => {
        console.log("Stattttttttttttttus",result);
        this.res=result;
        if(this.res.status==200 || this.res.status==true) 
        {
          this.show_success=true;
          this.getSubscription();
         this.presentToast(this.res.message)
        }
        else
        {
       this.errorToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
    }
    else{
       this.validateAllFormFields(this.promoForm);
    }
 }

    /************************************Get Subscription status***************************/

   DeleteCard(){
   
    let params={
      id:this.card_id
    };
      this.authService.deleteCard(params).then((result) => {
        console.log("Stattttttttttttttus",result);
        this.res=result;
        jQuery("#deletecard").modal("hide");
        if(this.res.status==200 || this.res.status==true) 
        {
         this.presentToast(this.res.message)
         this.getAllCards();
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }


    /************************************Get Subscription status***************************/

   getSubscription(){
    let params={
      u_id:this.id
    };
      this.authService.getStatus(params).then((result) => {
        console.log("Stattttttttttttttus",result);
        this.res=result;
        if(this.res.status==200)
        {
          this.app_status= this.res.data;
        }
        else
        {
          this.getAllCards();
       // this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

        /***********************************Make Payment***************************/


  MakePayment(valid,value){
    console.log(valid,value)
    if(valid){
       let params={
       'id':this.id,
       'card':value.card_id
       }
     this.authService.makePayment(params).then((result) => {
        console.log("paymenttttt",result);
        this.res=result;
        if(this.res.status==200)
        {
          jQuery("#card").modal("hide");
       this.presentToast(this.res.message);
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });

    }
    else{
      this.validateAllFormFields(this.payForm);
    }

  }

  

      /************************************get Cards***************************/

  getAllCards(){

       let params={
       'id':this.id
       }
     this.authService.getCard(params).then((result) => {
        console.log("Cardsssssss",result);
        this.res=result;
        if(this.res.status==200)
        {
          this.allcards=this.res.data;
       // this.presentToast(this.res.message);
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });

  }

   clearForm() {

    this.cardForm.reset({
          'card_number': '',
          'cvv': '',
          'expiry_date': ''
         });
    }

    /************************************Save Card***************************/

  SaveCard(valid,value){
    console.log(valid,value)
  this.cardForm.value.expiry_date = moment(this.cardForm.value.expiry_date).format('MM/YYYY');
       let params={
    'id':this.id,
    'number':value.card_number,
    'cvv':value.cvv,
    'date':this.cardForm.value.expiry_date
       }
     this.authService.addCard(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
          this.clearForm();
          this.getAllCards();
       this.presentToast(this.res.message);
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });

  }

    /************************************Edit Profile***************************/


  EditProfile(valid) { 
  	// alert(valid)
        if(valid){
       const data = new FormData();
        data.append('first_name', this.rForm.get('first_name').value);
        data.append('last_name', this.rForm.get('last_name').value);
         data.append("user_id",  this.data._id);
        data.append('profile_image',this.pro_pic);
        console.log(data);
        this.authService.editProfile(data).then((result) => {
          console.log(result);
          this.res = result;
          if (this.res.status === 1 || this.res.status === '1' ||this.res.status === 200) 
          {
          	this.imageLoaded=false;
          	 localStorage.setItem('isLoggedin', JSON.stringify(this.res.data));
          // this.router.navigateByUrl('/myteam');
          this.presentToast(this.res.message)
          } else {
               this.toastr.error(this.res.message, '', {
                timeOut: 3000,
                tapToDismiss:true
              });
            // this.toastr.error(this.res.message);
          }

        }, (err) => {
          console.log(err);
        });
      
      }
      else{
         this.validateAllFormFields(this.rForm);
      }
    }

       clearr(){
          this.passForm.reset({
            'old_password': '',
            'con_password': '',
            'new_password': ''
           });
    }

        /************************************Delete account************/


    DeleteMyAccount(){
     console.log(this.id)
      this.authService.deletemyAccount(this.id).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
       this.presentToast(this.res.message);
        localStorage.removeItem('isLoggedin');
       this.router.navigateByUrl('/login');
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
    
    }

    /************************************Change Password***************************/


    ChangePassword(valid,value){
     console.log(valid,value)
     if(this.register=='O'){
     if(valid){
        let params=
      {
      'id':this.id,
      'oldpass':value.old_password,
      'newpass':value.new_password
      };
      if(value.con_password!=value.new_password)
      {
        this.presentToast("New Password and Confirm Password doesn't Matches")
        // alert("New Password and Confirm Password doesn't Matches")
      }
      else
      {
      this.authService.changePassword(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
       this.presentToast(this.res.message)
       this.clearr();
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
       this.validateAllFormFields(this.passForm);
     }
   }
   else{
     this.presentToast("Cannot change password for accounts signed in with social site");
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


errorToast(msg) {

    this.toastr.error(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }

   presentToast(msg) {

    this.toastr.success(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }
      
 

}

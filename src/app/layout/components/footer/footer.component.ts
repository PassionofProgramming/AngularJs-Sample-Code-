import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

declare var jQuery:any;
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    data:any;
    res:any;
    privacydata:any;
    termsdata:any;
    pushRightClass: string = 'push-right';
    rForm: FormGroup;
    constructor(
    	public router: Router,
    	private fb: FormBuilder,
    	private toastr: ToastrService,
    	public authService: AuthServiceService) {

  this.rForm = fb.group({
      'type' : [null, Validators.required],
      'content' : [null, Validators.compose([Validators.required])]
      });

  this.data=JSON.parse(localStorage.getItem('isLoggedin'));
  console.log(this.data)
    }

    ngOnInit() {
        this.GetPrivacy();
    this.GetTerms();
    }

    feedback()
    {
          jQuery("#feedbackModal").modal("show");
    }



       /************************************Skill Level***************************/

   addFeedBack(valid,value){
   	if(valid)
   	{
   	let params={
   		'id':this.data._id,
   		'first':this.data.first_name,
   		'last':this.data.last_name,
   		'type':value.type,
   		'content':value.content
   	}
      this.authService.doFeeback(params).then((result) => {
        console.log("doFeeback",result);
        this.res=result;
        if(this.res.status==200)
        {
        	 this.presentToast(this.res.message)
        	 jQuery("#feedbackModal").modal("hide");
         // this.skillist=this.res.data;
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

    this.toastr.success(this.res.message, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }
    
}

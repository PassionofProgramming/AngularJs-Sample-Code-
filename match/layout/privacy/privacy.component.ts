import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
 privacyUrl:any;
 res:any;
 privacydata:any;
 termsdata:any;

  @ViewChild('fileupload') fileInput: ElementRef;
   @ViewChild('fileupload1') fileInput1: ElementRef;
  constructor(
  	public authService: AuthServiceService,
    private fb: FormBuilder,
    public router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private vcr: ViewContainerRef) { 

   
}

  ngOnInit() {
  	this.GetPrivacy();
  	this.GetTerms();
  }


  /**********************************get image***************************************/

  onFileChange(event) {
    console.log(event);
    this.privacyUrl = event.target.files[0];;
    // if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
    //   if (event.target.files.length > 0) {
        
    //     const file = event.target.files[0];
    //     console.log(file);
    //     // this.imageUrl = file;
    //   }
    // } else {
    // }
  }

          /************************************Add Terams***************************/

    updateTerms() {

     const data = new FormData();
       data.append('terms_pdf',this.privacyUrl);
       this.spinner.show();
     this.authService.addtermCondition(data).then((result) => {
        console.log(result);
          this.spinner.hide();
        this.res=result;
        if(this.res.status==true)
        {
        	this.GetTerms();
         
            this.presentToast(this.res.message)
        }
        else{
           this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
   
        
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


         /************************************Add Gender***************************/

    updatePrivacy() {
     const data = new FormData();
      data.append('privacy_pdf',this.privacyUrl);
     this.spinner.show();
     this.authService.addPrivacy(data).then((result) => {
        console.log(result);
          this.spinner.hide();
        this.res=result;
        if(this.res.status==true)
        {
        	this.GetPrivacy();
          this.presentToast(this.res.message)
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

      /************************************Toast***************************/


   presentToast(msg) {

    this.toastr.success(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }
      

}

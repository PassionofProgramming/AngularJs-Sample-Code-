import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';

declare var jQuery:any;
@Component({
  selector: 'app-datamanage',
  templateUrl: './datamanage.component.html',
  styleUrls: ['./datamanage.component.scss']
})
export class DatamanageComponent implements OnInit {
  res:any;
  sports:any;
  skills:any;
  ages:any;
  gender:any;
  id:any;
  type:any;
  mytable:any;
  activePage: any;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = "asc";
  sportForm: FormGroup;
  skillForm: FormGroup;
  ageForm: FormGroup;
  genderForm: FormGroup;
  constructor(
  	 public router: Router,
  	 private fb: FormBuilder,
     public authService: AuthServiceService,
     // private fb: FormBuilder,
     private toastr: ToastrService) {
   this.sportForm = fb.group({
      'sport' : [null, Validators.required]
      });
      
      this.skillForm = fb.group({
      'skill' : [null, Validators.required]
      });

       this.ageForm = fb.group({
      'agegroup' : [null, Validators.required]
      });
        this.genderForm = fb.group({
      'gender' : [null, Validators.required]
      });

      }


  ngOnInit() {
  	this.Sports();
  	this.Skills();
  	this.AgeGroup();
    this.Gender();
  }

  removeList(id,type){
  	this.id=id;
  	this.type=type;
  	jQuery("#deletsport").modal("show");
  }

            /************************************Delete ***************************/

    deleteAll() {
    	
     this.authService.deleteSport(this.id,this.type).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
        jQuery("#deletsport").modal("hide");
        this.presentToast(this.res.message)
         this.Sports();
         this.Skills();
         this.AgeGroup();
         this.Gender();
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
   
        
  }

          /************************************Get Age Group***************************/

    AgeGroup() {
     this.authService.getAge().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.ages= this.res.data; 
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        
  }

        /************************************Get Skills***************************/

    Skills() {
     this.authService.getSkills().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.skills= this.res.data; 
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
  }

          /************************************Get Gender***************************/

    Gender() {
     this.authService.getGender().then((result) => {
        console.log("genderrrrr",result);
        this.res=result;
        if(this.res.status==true)
        {
         this.gender= this.res.data; 
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        
  }



            /************************************Add Gender***************************/

    AddGender(valid,value) {
      if(valid)
    {
     this.authService.addGender(value).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
        jQuery("#addgender").modal("hide");
        this.presentToast(this.res.message)
         this.Gender();
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
   }
   else{
    this.validateAllFormFields(this.genderForm);
   }
        
  }
      


            /************************************Add Age Group***************************/

    AddAge(valid,value) {
    	if(valid)
    {
     this.authService.addGroup(value).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
        jQuery("#addage").modal("hide");
        this.presentToast(this.res.message)
         this.AgeGroup();
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
   }
   else{
   	this.validateAllFormFields(this.ageForm);
   }
        
  }
          /************************************Add Skills***************************/

    AddSkills(valid,value) {
    	if(valid)
    	{
     this.authService.addSkill(value).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
        jQuery("#addskill").modal("hide");
        this.presentToast(this.res.message)
         this.Skills();
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
   }
   else{
   	this.validateAllFormFields(this.skillForm);
   }
        
  }
          /************************************Add Sports***************************/

    AddSports(valid,value) {
    	if(valid)
    	{
     this.authService.addSport(value).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
        jQuery("#addsport").modal("hide");
        this.presentToast(this.res.message)
         this.Sports();
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
   }
   else{
   	this.validateAllFormFields(this.sportForm);
   }
        
  }

         /************************************Get Sports***************************/

    Sports() {
     this.authService.getSports().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.sports= this.res.data; 
        }
        else{
            this.presentToast(this.res.message)
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

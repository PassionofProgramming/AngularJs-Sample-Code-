import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NeutronRatingModule } from 'neutron-star-rating';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

declare var jQuery:any;
@Component({
  selector: 'app-myscrimmage',
  templateUrl: './myscrimmage.component.html',
  styleUrls: ['./myscrimmage.component.css']
})
export class MyscrimmageComponent implements OnInit {
id:any;
res:any;
event:any;
scrim_id:any;
other_id:any;
other_team_id:any;
scrimmageData:any;
pendingData:any;
requetedData:any;
upcomingData:any;
completedData:any;
starsCount: number;
rForm: FormGroup;
  constructor(
  	public authService: AuthServiceService,
    public router: Router,
     private fb: FormBuilder,
    private toastr: ToastrService) { 
    this.rForm = fb.group({
      'rating' : [null, Validators.required]
      });
  }

  ngOnInit() {
  	this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
  	this.MyScrimmages();
    this.PendingScrimmages();
    this.RequestedScrimmages();
  }

    showRating(scrim_id,other_user_id,other_team_id){
    console.log(scrim_id,other_user_id,other_team_id)
    this.scrim_id=scrim_id;
    this.other_id=other_user_id;
    this.other_team_id=other_team_id;
    jQuery("#ratenow").modal("show");
  }
  onRatingClicked(event){
     console.log(event)
     this.event=event;
  }

      /************************************Add Rating***************************/

  AddRating(valid,value){
    let params={
      'u_id':this.id,
      'o_id':this.other_id,
      'o_t_id':this.other_team_id,
      's_id': this.scrim_id,
      'rating':this.event
    }
        this.authService.doRate(params).then((result) => {
        console.log("Ratingggg",result);
        this.res=result;
        if(this.res.status==true || this.res.status==200)
        {
           this.presentToast(this.res.message)
          jQuery("#ratenow").modal("hide");
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
  }


      /************************************Requested Scrimmages***************************/

   RequestedScrimmages(){
    let params={
    'id':this.id
    };
      this.authService.getRequestedScrimmages(params).then((result) => {
        console.log("requesteddddd",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.requetedData=this.res.data;
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }
  
      /************************************My Scrimmages***************************/

   MyScrimmages(){
    let params={
    'id':this.id
    };
      this.authService.getMyScrimmages(params).then((result) => {
        console.log("MyScrimmages",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.scrimmageData=this.res.data;
       this.upcomingData=this.res.data.upcomingScrimmages;
       this.completedData=this.res.data.completedScrimmages;
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

     /************************************Accept/Reject Scrimmages***************************/

   acceptRejectScrimmages(id,val){
    // alert("hiiii")
    let params={
    'id':id,
    'status':val
    };
      this.authService.accRejScrimmages(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
          this.presentToast(this.res.message)
          this.PendingScrimmages();
       // this.pendingData=this.res.data;
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

    /************************************Pending Scrimmages***************************/

   PendingScrimmages(){
    let params={
    'id':this.id
    };
      this.authService.getPendingScrimmages(params).then((result) => {
        console.log("PendingScrimmages",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.pendingData=this.res.data;
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
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

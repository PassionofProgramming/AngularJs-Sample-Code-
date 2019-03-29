import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
// import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
  user_id:any;
	res:any;
	userdetail:any;
  usermatches:any;
  match_status: any;
  
    constructor(
     private route: ActivatedRoute,
    public router: Router,
     private toastr: ToastrService,
     public authService: AuthServiceService) {
      this.route.params.subscribe(params => {
      console.log(params);
      this.user_id = params;
      
    });
     }

    ngOnInit() {
      this.Userdetail();
      this.MatchUpdates();
    }

           /************************************Get User Detail***************************/

    Userdetail() {
    	let params={
    		'id':this.user_id.id
    	}
     this.authService.getUserDetail(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.userdetail= this.res.data; 
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        
  }

             /************************************ User Match***************************/

    MatchUpdates() {
      let params={
        'id':this.user_id.id
      }
     this.authService.getUserMatches(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.usermatches= this.res.data.upcomingScrimmages; 
         this.match_status= this.res.data.upcomingScrimmages.length;
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

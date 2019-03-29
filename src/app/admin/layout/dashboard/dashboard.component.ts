import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthServiceService } from '../../../auth-service.service';
// import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
   res:any;
   reg_users:any;
   active_user:any;
    constructor(
    public router: Router,
     public authService: AuthServiceService,
     private toastr: ToastrService) {
   

    }

    ngOnInit() {
        this.RegisteredUsers();
        this.ActiveUsers();
    }


       /************************************Get Registered users***************************/

    RegisteredUsers() {
     this.authService.getUsers().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.reg_users= this.res.data.length; 
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
 }
        
           /************************************Get Registered users***************************/

    ActiveUsers() {
     this.authService.getActiveUsers().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.active_user= this.res.data.length; 
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

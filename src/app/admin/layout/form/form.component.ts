import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthServiceService } from '../../../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    res:any;
    payments:any;
    constructor(
     public router: Router,
     public authService: AuthServiceService,
     // private fb: FormBuilder,
     private toastr: ToastrService) {}

    ngOnInit() {
    	this.PaymentHistory();
    }

    /************************************Get Users***************************/

    PaymentHistory() {
     this.authService.getPayment().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.payments=this.res.data;
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

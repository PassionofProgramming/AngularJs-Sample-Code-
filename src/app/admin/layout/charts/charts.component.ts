import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthServiceService } from '../../../auth-service.service';
// import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
// declare var jQuery:any;

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
  res:any;
  users:any;
  mytable:any;
  activePage: any;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = "asc";

    constructor(
    public router: Router,
     public authService: AuthServiceService,
     // private fb: FormBuilder,
     private toastr: ToastrService
        ) {

        
    }

    ngOnInit() {
     this.Users();
   // $('#example').DataTable({
   //  "bPaginate": true,
   //  "bLengthChange": true,
   //  "bFilter": true,
   //  "bInfo": false,
   //  "bAutoWidth": true,
   //  });
    }

       /************************************Get Users***************************/

    Users() {
     this.authService.getUsers().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.users= this.res.data; 
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

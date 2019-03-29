import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthServiceService } from '../../../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';

declare var jQuery:any;
@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

  res:any;
  users:any;
  mytable:any;
  sus_id:any;
  activePage: any;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = "asc";
    constructor(
     public router: Router,
     public authService: AuthServiceService,
     private toastr: ToastrService) {}

    ngOnInit() {
    	this.ReportedUsers();
    }

     SuspendClick(id)
      {
      	this.sus_id=id;
      	console.log(id)
          jQuery("#report").modal("show");
    }

         /************************************Suspend Users***************************/

    SuspendUsers() {
    	let params={
    		'id':this.sus_id
    	}
     this.authService.doSuspendUser(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         this.presentToast(this.res.message)
         jQuery("#report").modal("hide");
         this.ReportedUsers();
        }
        else{
            this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        
  }

    /************************************Reported Users***************************/

    ReportedUsers() {
     this.authService.getReportedUsers().then((result) => {
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

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthServiceService } from '../../../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
    selector: 'app-bs-element',
    templateUrl: './bs-element.component.html',
    styleUrls: ['./bs-element.component.scss'],
    animations: [routerTransition()]
})
export class BsElementComponent implements OnInit {
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
     private toastr: ToastrService) {}

    ngOnInit() 
    {
      this.Complains();
    }

           /************************************Get Users***************************/

    Complains() {
     this.authService.getCompailns().then((result) => {
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

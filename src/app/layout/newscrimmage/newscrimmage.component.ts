import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newscrimmage',
  templateUrl: './newscrimmage.component.html',
  styleUrls: ['./newscrimmage.component.css']
})
export class NewscrimmageComponent implements OnInit {
id:any;
res:any;
scrimmageData:any;
pendingData:any;
  constructor(
  	public authService: AuthServiceService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  		this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
  		this.PendingScrimmages();
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
  /************************************Toast***************************/


   presentToast(msg) {

    this.toastr.success(this.res.message, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }

}

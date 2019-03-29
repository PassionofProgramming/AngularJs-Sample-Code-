import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  userid:any;
  res:any;
  notify_arry=[];
  constructor(
  	public authService: AuthServiceService,
  	public router: Router,
    private toastr: ToastrService) { 
   this.userid=JSON.parse(localStorage.getItem('isLoggedin'))._id;
   this.getNotifications();
  }

  ngOnInit() {
  }

    /************************************Get notifications***************************/

   getNotifications(){
     // console.log(this.message)
    let params={
      u_id:this.userid
    };
      this.authService.getNotification(params).then((result) => {
        console.log("notifyyy message",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.notify_arry=this.res.data;
        }
        else
        {
       // this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

}

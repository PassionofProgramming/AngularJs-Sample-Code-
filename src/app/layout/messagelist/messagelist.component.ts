import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent implements OnInit {
userid:any;
message_list:any;
res:any;
  constructor(    
  	private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    // private fb: FormBuilder,
    public authService: AuthServiceService) 
  {
this.userid=JSON.parse(localStorage.getItem('isLoggedin'))._id;
// alert(this.userid)
this.GetAllMessage();
  }

  ngOnInit() {
  	
  }

   Messages(){
    this.router.navigateByUrl('/message');
  }
      /************************************Get All MESSAGE list***************************/

   GetAllMessage(){
   	// alert("calledd")
     console.log(this.userid)
    let params=
    {
      u_id:this.userid
    };
      this.authService.getAllMessage(params).then((result) => {
        console.log("Messagesss",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.message_list=this.res.conversations;
       console.log("teamDatesssss",this.message_list)
       
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

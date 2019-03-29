import { Component, OnInit,AfterViewChecked,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';

declare var jQuery:any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,AfterViewChecked {
 userid:any;
 message:any;
 res:any;
 b_status:any;
 user_data:any;
 intervl:any;
 name:any;
 message_list=[];
  otherid:any;
  conid:any;
  reported:any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
  	private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public authService: AuthServiceService) { 
  this.userid=JSON.parse(localStorage.getItem('isLoggedin'))._id;

 this.route.params.subscribe(params => {
      console.log("paramssss",params);
      this.otherid=params.id;
      this.conid=params.conid;
      // this.getMessage();
    });
   
  }

  ngOnInit() {
    this.scrollToBottom();
    this.getMessage('1');
  //   this.intervl = setInterval(() => {
  //   this.getMessage('2'); 
  // }, 3000);
  }
  ngAfterViewChecked() {        
        // this.scrollToBottom();        
    } 
ngOnDestroy() {
  if (this.intervl) {
    clearInterval(this.intervl);
  }
}
 scrollToBottom(): void {
  // alert("scrollll")
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }
    /************************************Get MESSAGE list***************************/

   getMessage(val){
     console.log(val)
     var temp_length=this.message_list.length;
    let params=
    {
      u_id:this.userid,
      o_id:this.otherid,
      con:this.conid
    };
      this.authService.getUserMessage(params).then((result) => {
        console.log("Messagesss",result);
        this.res=result;
        if(this.res.status==200)
        {
          this.b_status=this.res.connection_status;
          this.reported=this.res.report;
          console.log(this.b_status)
          this.user_data=this.res.otherUser;
          // this.scrollToBottom(); 
          this.message_list=this.res.conversations;
          if(val=='1'){
            // alert("working")
            setTimeout(() => {
              this.scrollToBottom(); 
              
            }, 1000)
            
          }
          else{
            if(temp_length!=this.message_list.length){
              setTimeout(() => {
              this.scrollToBottom(); 
              
            }, 1000)
            }

          }

       // console.log("teamDatesssss",this.teamDates)
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }


  RemoveClick()
      {
          jQuery("#request").modal("show");
    }
  

  Block()
  {
      jQuery("#block").modal("show");

  }


     Report()
  {
      jQuery("#report").modal("show");

    }

    


  /************************************Block User***************************/

   blockUser(){
     // console.log(this.message)
    let params={
      u_id:this.userid,
      con:this.conid
    };
      this.authService.BlockUser(params).then((result) => {
        console.log("delete message",result);
        this.res=result;
        if(this.res.status==200)
        {
          
           jQuery("#block").modal("hide");
          this.router.navigateByUrl('/messagelist');
          // this.scrollToBottom();
          // this.conid=this.res.data.connection_id;
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

  /************************************Delete MESSAGE***************************/

   deleteMessage(){
     // console.log(this.message)
    let params={
      u_id:this.userid,
      con:this.conid
    };
      this.authService.deleteUserMessage(params).then((result) => {
        console.log("delete message",result);
        this.res=result;
        if(this.res.status==200)
        {
           jQuery("#request").modal("hide");
          this.router.navigateByUrl('/messagelist');
          // this.scrollToBottom();
          // this.conid=this.res.data.connection_id;
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

 /***********************************Report User***************************/

   reportUser(){
     // console.log(this.message)
    let params={
      u_id:this.userid,
      o_id:this.otherid,
      con:this.conid
    };
      this.authService.doReportUser(params).then((result) => {
        console.log("delete message",result);
        this.res=result;
        if(this.res.status==200)
        {
           jQuery("#report").modal("hide");
            this.presentToast(this.res.message)
          this.router.navigateByUrl('/messagelist');
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }


  /************************************Send MESSAGE***************************/

   sendMessage(val){
    console.log(val)
     // console.log(this.message)
    let params={
      u_id:this.userid,
      o_id:this.otherid,
      con:this.conid,
      mess:val
    };
    if(this.b_status=='BLOCK'){
      // alert("jjdfjhdf")
       this.toastr.error("You Had Blocked this person", '', {
        timeOut: 3000,
        tapToDismiss:true
      });
    // this.presentToast("You Had Blocked this person");
    }
    else
    {
      this.authService.sendUserMessage(params).then((result) => {
        console.log("Send message",result);
        this.res=result;
        this.message='';
        if(this.res.status==200)
        {
          this.getMessage('1');

          // this.scrollToBottom();
          this.conid=this.res.data.connection_id;

          
       console.log("teamDatesssss", this.res)
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
    }
 }

  /************************************Toast***************************/


   presentToast(msg) {

    this.toastr.success(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }


  

}

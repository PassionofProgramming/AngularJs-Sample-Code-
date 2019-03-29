import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthServiceService } from '../../../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    data:any;
    userid:any;
    res:any;
    notify_count:any;
    final_count:any;
    count:any;
    intervel:any;
    pushRightClass: string = 'push-right';

    constructor(
      public router: Router,
      public authService: AuthServiceService,
      private toastr: ToastrService)
    {
      // alert("headerrr")
       this.userid=JSON.parse(localStorage.getItem('isLoggedin'))._id;
       // this.getMessageCounter();
     this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

     openNav() 
     {
        document.getElementById("mySidenav").style.width = "300px";
    }

    closeNav() 
     {
            document.getElementById("mySidenav").style.width = "0";
        }

    ngOnInit() 
    {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
    }

    isToggled(): boolean 
    {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
    if (this.intervel) {
    clearInterval(this.intervel);
   }
    localStorage.removeItem('isLoggedin');
     this.router.navigateByUrl('/login');
   }

   messageList(){
  //  if (this.intervel) {
  //   clearInterval(this.intervel);
  // }
    this.router.navigateByUrl('/messagelist');
    document.getElementById("mySidenav").style.width = "0";
  }
   Home(){
  //    if (!this.intervel) {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
  //  }
    this.router.navigateByUrl('/home');
  }

   myTeams(){
  //     if (!this.intervel) {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
  //  }
    this.router.navigateByUrl('/myteam');
    document.getElementById("mySidenav").style.width = "0";
  }

   myScrimmages(){
  //     if (!this.intervel) {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
  //  }
    this.router.navigateByUrl('/myscrimmage');
    document.getElementById("mySidenav").style.width = "0";
  }
      Notification(){
  //     if (!this.intervel) {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
  //  }
    this.router.navigateByUrl('/notification');
    document.getElementById("mySidenav").style.width = "0";
  }
    AccountSettings(){
  //   if (!this.intervel) {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
  //  }
    this.router.navigateByUrl('/accountsetting');
    document.getElementById("mySidenav").style.width = "0";
  }
    NewScrimmages(){
  //   if (!this.intervel) {
  //   this.intervel = setInterval(() => {
  //   this.getMessageCounter(); 
  // }, 3000);
  //  }
    this.router.navigateByUrl('/newscrimmage');
    document.getElementById("mySidenav").style.width = "0";
  }

  /************************************Get Notification Counter***************************/

   getNotificationCounter(){
     // alert("notificationsss")
    let params={
      u_id:this.userid
    };
      this.authService.getNotificationCounter(params).then((result) => {
        // console.log("Counter message",result);
        // alert(result)
        this.res=result;
        if(this.res.status==200)
        {
          this.notify_count=this.res.data;
          console.log("notify countttt",this.notify_count)
          this.final_count= this.count+this.notify_count;
          console.log("final_counttttttttttttt",this.final_count)
          // if(temp_length!=this.count){
          //  this.presentToast("You "+ this.count +" Have New Message")
          // }
        }
        else
        {
       // this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

  /************************************Get MEssage Counter***************************/

   getMessageCounter(){
     // console.log(this.message)
     // alert("callleddddd")
     var temp_length=this.count;
     console.log("before",temp_length)
    let params={
      u_id:this.userid
    };
      this.authService.getCounter(params).then((result) => {
        // console.log("Counter message",result);
        // alert(result)
        this.res=result;
        if(this.res.status==200)
        {
          this.getNotificationCounter();
          this.count=this.res.data;
          console.log("messagggeee conuttt",this.count)
          // if(temp_length!=this.count){
          //  this.presentToast("You "+ this.count +" Have New Message")
          // }
        }
        else
        {
       // this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }


   presentToast(msg) {

    this.toastr.success(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }

}

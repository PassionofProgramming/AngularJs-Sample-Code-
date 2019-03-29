import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng2DeviceService } from 'ng2-device-detector';
import * as moment from 'moment/moment';

declare var jQuery:any;

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {
id:any;
res:any;
idd:any;
teamDates:any;
_id:any;
startFix:any;
startFixx:any;
date_arry=[];
teamList:any;
deviceInfo = null;
  constructor(
    public authService: AuthServiceService,
    private deviceService: Ng2DeviceService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.epicFunction();
    this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
    this.MyTeams();
  }
   newTeam(){
    this.router.navigateByUrl('/createteam');
  }
    teamDetail(id){
    this.router.navigateByUrl('/myteamdetail/id');
  }

  RemoveClick(id){
    jQuery("#request").modal("show");
    this._id=id;

    }

   epicFunction() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log("infooooo",this.deviceInfo);
  }
  showTeamModal(id){
  jQuery('#edit_dates').modal({backdrop: 'static', keyboard: false});
   jQuery('#edit_dates').modal('show');
   this.idd=id;
   this.team_Detail();
  }

cancel(){
jQuery('#calendar1').fullCalendar( 'destroy' );
jQuery("#edit_dates").modal("hide");
}

    /************************************Delete Team***************************/

   EditDates(){
    let params=
    {
    'id':this.idd,
    'arry':this.date_arry
    };
      this.authService.doeditDates(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
        jQuery('#calendar1').fullCalendar( 'destroy' );
        jQuery("#edit_dates").modal("hide");
       this.presentToast(this.res.message)
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

    /************************************Edit Dates***************************/

  editDates(){
    console.log("Teammmmm arrrayyyy calenmder",this.teamDates)
  let th=this;
   let eventss=this.teamDates;
   for(var i in this.teamDates) 
   {
     this.date_arry.push(this.teamDates[i].start)
   }
   console.log("dateeeee arrrayyyy",this.date_arry)
 

    if(this.deviceInfo.device=='android' || this.deviceInfo.device=='ios'){

      this.alertToast('long press day to set availability');
      }
  jQuery('#calendar1').fullCalendar({
    header: {
    left: 'prev',
    center: 'title',
    right: 'next'
    },
    defaultView: 'month',
    selectable: true,
    multiple_selection: true,
    unselectAuto:true,
    editable: true,
    eventLongPressDelay:1000,
    events: eventss,
    select: function (start, end, jsEvent, view) { 
   
      th.startFix= moment(jQuery.fullCalendar.formatDate(start, 'YYYY-MM-DD'));               
      th.date_arry.push(th.startFix._i);
       console.log(th.date_arry)
        jQuery("#calendar1").fullCalendar('addEventSource', [{
            start: start,
            end: end,
            rendering: 'background',
            block: true,
        }, ]);
    
    },
   eventRender: function (event, element, view)
   {
   if (event.status == "booked" ) 
   {
   element.css('background-color', '#0984e3');
   } 
   else if (event.status == "available") 
   {
   element.css('background-color', '#11c080');
   }
   },
    selectOverlap: function(event) {
      // console.log("eventtttttt",event)
      th.startFixx= moment(jQuery.fullCalendar.formatDate(event.start, 'YYYY-MM-DD'));               
        console.log("startttttttttttt", th.startFixx);
        
       jQuery("#calendar1").fullCalendar('removeEvents', event._id )
        for(var i = 0; i < th.date_arry.length; i++) {
         if(th.startFixx._i == th.date_arry[i]) {
         console.log(th.date_arry[i])
          th.date_arry.splice(i, 1);
            console.log(th.date_arry)
         }
      }
     
    }
});
} 

    /************************************Myteam Detail***************************/

   team_Detail()
   {
    this.date_arry=[];
    console.log("teammmm idddd",this.idd)
    

      this.authService.getMyTeamDetail(this.idd,this.id).then((result) => {
        console.log("team detail",result);
        this.res=result;
        if(this.res.status==200)
        {
        this.teamDates=this.res.data.booked_avail_dates;
        this.editDates();
       console.log("teamDatesssss sss",this.teamDates)
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }


      /************************************Delete Team***************************/

   DeleteTeams(){
    // console.log(id)
    let params=
    {
    'id':this._id
    };
      this.authService.deleteTeams(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
        this.MyTeams();
        jQuery("#request").modal("hide");
       this.presentToast(this.res.message)
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }
    /************************************Age Group***************************/

   MyTeams(){
    let params={
    'id':this.id
    };
      this.authService.getMyTeams(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
       this.teamList=this.res.data;
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


   alertToast(msg) {
    this.toastr.info(msg,'',  {
  timeOut: 3000,
   positionClass: 'toast-center-center',
  tapToDismiss:true
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

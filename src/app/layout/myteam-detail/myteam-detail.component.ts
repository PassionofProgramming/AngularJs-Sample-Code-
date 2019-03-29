import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as $ from "jquery";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { } from '@types/googlemaps';
import { Ng2DeviceService } from 'ng2-device-detector';
// import { MultipleDatePicker } from 'multiple-date-picker/index';
// import { MultipleDatePicker, DateRangeHelper } from '../multiple-date-picker/index';

import * as moment from 'moment/moment';
declare var jQuery: any;

export enum ToasterPosition {
  topRight = 'toast-top-right',
  topLeft = 'toast-top-left',
  center='toast-top-center',
  bottomRight = 'toast-bottom-right',
  bottomLeft= 'toast-bottom-left',
  // Other positions you would like
}
@Component({
  selector: 'app-myteam-detail',
  templateUrl: './myteam-detail.component.html',
  styleUrls: ['./myteam-detail.component.css']
})
export class MyteamDetailComponent implements OnInit {
  lat: any;
  lng: any;
  id:any;
  scrimmage_available:any;
  _id:any;
  avail_val:any;
  set_status:any;
  res:any;
  userData:any;
  teamDates:any;
  teamData:any;
  startFix:any;
  shown:any;
  startFixx:any;
  date_arry=[];
  deviceInfo = null;
  @ViewChild('map') gmapElement: any;
  @ViewChild('myTA') myTextArea: ElementRef;
  map: google.maps.Map;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private deviceService: Ng2DeviceService,
    public authService: AuthServiceService
    ) 
  { 
    this._id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
     this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      this.teamDetail();
    });

    this.lat=51.678418;
    this.lng=7.809007;
 
  }

  ngOnInit() 
  {
    this.epicFunction();
    var myLatLng = {lat: 18.5793, lng: 73.8143};
      var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
     var marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: 'Hello World!'
        });

 }

   epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log("infooooo",this.deviceInfo);
    }


 fullCalenderEvents()
 {
    console.log("teamDatesssss full",this.teamDates)
   let eventss=this.teamDates;
      jQuery('#calendar2').fullCalendar(
    
  {
    header: 
    {
    left: 'prev',
    center: 'title',
    right: 'next'
    },
    events: eventss,
  eventRender: function (event, element, view)
   {
     console.log("eventssssss",event)
   if (event.status == "booked" ) 
   {
   element.css('background-color', '#0984e3');
   } 
   else if (event.status == "available") 
   {
   element.css('background-color', '#11c080');
   }
   }
   });
 }

CancelDates(){
  jQuery('#edit_dates').modal('hide');
}

editDates(){
  let th=this;
   let eventss=this.teamDates;
   for(var i in this.teamDates) {
     this.date_arry.push(this.teamDates[i].start)
   }
   jQuery('#edit_dates').modal({backdrop: 'static', keyboard: false});
  jQuery('#edit_dates').modal('show');

    if(this.deviceInfo.device=='android' || this.deviceInfo.device=='ios'){

      this.alertToast('Tap day to set availability');
      }
  jQuery('#calendar1').fullCalendar({
    header: {
    left: 'prev',
    center: 'title',
    right: 'next'
    },
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

  RemoveClick(){
      jQuery("#request").modal("show");
      // this._id=id;

    }


    // changeScrimmage(val){
    //    console.log(val)
    //     var isChecked = document.getElementById('my_checkbox').checked;
    //   console.log(isChecked)
    //   if(isChecked==true){
    //  this.scrimmage_available='Y';
    //   }
    //   else{
    //   this.scrimmage_available='N';
    //   }
    //   console.log(this.scrimmage_available)
    // }
    /************************************Delete Team***************************/

   AvailableScrimmage(){
     let isChecked1 = this.myTextArea.nativeElement.checked;
      console.log(isChecked1)
      var isChecked=isChecked1;
     // var isChecked = document.getElementById('my_checkbox').checked;
      console.log(isChecked)
      if(isChecked==true){
     this.scrimmage_available='Y';
      }
      else{
      this.scrimmage_available='N';
      }


    let params=
    {
    'id':this.id,
    'status':this.scrimmage_available
    };
      this.authService.doAvailableScrimmage(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
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

   /************************************Delete Team***************************/

   EditDates(){
    let params=
    {
    'id':this.id,
    'arry':this.date_arry
    };
      this.authService.doeditDates(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
       this.router.navigateByUrl('/myteam');
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

      /************************************Delete Team***************************/

   DeleteTeams(){
    let params=
    {
    'id':this.id
    };
      this.authService.deleteTeams(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
       this.router.navigateByUrl('/myteam');
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

    /************************************Myteam Detail***************************/

   teamDetail()
   {
      this.authService.getMyTeamDetail(this.id,this._id).then((result) => {
        console.log("Sportssss",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.teamData=this.res.data;
       this.userData=this.res.data.user_id;
       this.set_status=this.teamData.available_status;
       if(this.set_status=='Y'){
        this.avail_val=true;
         // document.getElementById('my_checkbox')=this.avail_val;
       }
       else{
         this.avail_val=false;
          // document.getElementById('my_checkbox')=this.avail_val;
       }
       console.log("availableeeeeeee",this.avail_val)
       console.log("photoooo",this.userData.profile_image)
       this.teamDates=this.res.data.booked_avail_dates;
        this.fullCalenderEvents();
       console.log("teamDatesssss",this.teamDates)
       
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


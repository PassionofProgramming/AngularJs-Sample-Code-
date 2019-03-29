import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as $ from "jquery";
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as moment from 'moment/moment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { ToastrService } from 'ngx-toastr';
// import {IMyDpOptions} from 'mydatepicker';
import { } from '@types/googlemaps';
declare var jQuery: any;

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  // private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
id:any;
data:any;
lat: any;
lng: any;
teamss:any;
teamlist:any;
teamcount:any;
teams:any;
newTeams=[];
res:any;
term:any;
otheteam_id:any;
other_id:any;
teamList:any;
startFix:any;
teamDates:any;
genderlist:any;
selectedTime:any;
rForm: FormGroup;
eForm: FormGroup;
page = 2;
search: boolean = false;
pagination: boolean = true;
date_match: boolean = false;
deviceInfo = null;
fromtime:any;
@ViewChild('elementToFocus') _input: ElementRef;
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('picker') picker;
  map: google.maps.Map;
  constructor( 
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private atp: AmazingTimePickerService,
    public authService: AuthServiceService) 
  {
    
  var data=localStorage.getItem('isLoggedin');
  console.log(JSON.parse(localStorage.getItem('isLoggedin'))._id)
  this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
  this.route.params.subscribe(params => {
      console.log("paramssss",params);
      this.data=params;
      console.log("userrrr isddd",this.data._id)
      this.searchResult1();
    });
     this.rForm = fb.group({
      'date_of_match' : [null, Validators.required],
      'from_time' : [null, Validators.compose([Validators.required])],
      'to_time' : [null, Validators.compose([Validators.required])],
      'team_id' : [null, Validators.compose([Validators.required])]
      });
     this.eForm = fb.group({
      'team_name' : null,
       'location' : null,
       'gender':null
      });
 
   }
  open1() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.selectedTime = time;
        });
    }

// _openCalendar(picker: MatTimepicker<Date>) {
//     picker.open();
//     setTimeout(() => this._input.nativeElement.focus());
// }

  onDate(date){
console.log("dateeeeeee",date)

  }

             /************************************Get Gender***************************/

    Gender() {
     this.authService.getGender().then((result) => {
        console.log("genderrrrr",result);
        this.res=result;
        if(this.res.status==true)
        {
         this.genderlist= this.res.data; 
        }
        else{
            // this.presentToast(this.res.message)
        }
         
        }, (err) => {
          console.log(err);
        });
        
  }


   changeShape(val)
   {
    console.log(val)
    console.log("tesmaaaaaaaaaaaaaaaaaaaaaaa",this.teamss)
    this.search=false;
    this.term='';
    this.newTeams=[];
    this.teams= this.teamss;
    for(var i in this.teams)
    {
      if(this.teams[i].gender.gender==val)
      {
        console.log("hiiiiiiiiiii team match gender ",this.teams[i])
        this.newTeams.push(this.teams[i])
        
      }
    }
    this.teams=this.newTeams;
    this.teamcount=this.newTeams.length;
    console.log("neww teamss",this.teams);
    console.log("afetre filter",this.newTeams);
   }

   teamName(val)
   {
    console.log(val);
    this.search=true;
    console.log(this.teams);
    this.teams=this.teamss;
    this.teamcount= this.teamcount;
   }

 ngOnInit() 
  {
   // this.epicFunction();
   this.Gender();
    this.MyTeams();
     var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
 // this.newEvent.get('group_id').setValue(this.data1.group_id._id);

fullCalenderEvents(){
  // alert("fullCalenderEvents")
  console.log(this.teamDates);
   let els=this;
    let eventss=this.teamDates;
      jQuery('#calendar2').fullCalendar(
 {
    header: {
    left: 'prev',
    center: 'title',
    right: 'next'
    },
    editable: true,
    selectable: true,
    events: eventss,
    selectConstraint: {
        start: jQuery.fullCalendar.moment().subtract(1, 'days'),
        end: jQuery.fullCalendar.moment().startOf('month').add(1, 'month')
    },
    select: function (start, end, jsEvent, view) { 
     els.startFix= moment(jQuery.fullCalendar.formatDate(start, 'YYYY-MM-DD'));               
        console.log("eventssssss",eventss);
        var avail = false;
        for(var i in eventss){
          console.log("startFixxxxx",els.startFix, i);
          if(els.startFix._i==eventss[i].start)
          {
            console.log("match")
            if(eventss[i].status=="available"){
              avail = true;
              els.rForm.get('date_of_match').setValue(els.startFix._i)
              // alert("available")
              }
           
          }
          
        }
        if(avail==false){
          alert("Date might be unavailable or booked!!!")
        }
        console.log("avail",avail);
        // els.rForm.get('date_of_match').setValue(startFix._i);
       
        // $('#calendar1').fullCalendar('renderEvent', eventData, true);
       
    },
    // dayClick: function(date,jsEvent,view) {
    //     $('#myCalendar').fullcalendar('select', date);
    // },
  eventRender: function (event, element, view)
   {
    // alert(event)
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

  otherTeam()
  {
    this.router.navigateByUrl('/otherteam');
  }
  Message(id)
  {

    // this.router.navigateByUrl(['message:/id']);
  }

  requestModal(id,uid)
  {
     jQuery('#request_scrimmage').modal({ backdrop: 'static', keyboard: false });
      jQuery('#request_scrimmage').modal('show');

      console.log(id)
      this.otheteam_id=id;
      this.other_id=uid;
      this.teamDetail();
  }

  cancel()
  {
   jQuery('#calendar2').fullCalendar( 'destroy' );
    jQuery('#request_scrimmage').modal('hide');
  }
  
ngOnDestroy(){
    jQuery('#request_scrimmage').modal('hide');
  }

 /************************************Request Scrimmage***************************/

  RequestScrimmage(val,value)
  {
    console.log("frommmmmm",val)
    var timeeeee = $('#pickerr').val();
    var totimee=$('#pickerr1').val();
    console.log("value ",timeeeee)
    this.rForm.value.from_time = timeeeee;
    this.rForm.value.to_time=totimee;
      console.log("timeeeeeee",this.rForm.value.from_time)
     console.log("tooooooo",this.rForm.value.to_time)
  this.rForm.value.date_of_match = moment(this.rForm.value.date_of_match).format('YYYY-MM-DD');
   // this.rForm.value.from_time = moment(this.rForm.value.from_time).format('hh:mm a');
   // this.rForm.value.to_time = moment(this.rForm.value.to_time).format('hh:mm a');
    var usr_dat=new Date(this.rForm.value.date_of_match);
   for(var i in this.teamDates)
     {
      // alert("datesssss")
      var cal_dat=new Date(this.teamDates[i].start)
      
          if(this.teamDates[i].status=="available")
          {
                if(usr_dat.toString() == cal_dat.toString())
              {
                  this.date_match=true;
              }
             
          }
    }

  if(this.date_match==false){
        this.date_match=false;
          this.toastr.error("This Date is not available for match", '', {
          timeOut: 3000,
          tapToDismiss:true
        });
    }
  else{
       if(value)
       {
     
      let params=
      {
        'id': this.id,
        'teamid':val.team_id,
        'uid':this.other_id,
        'otherteamid':this.otheteam_id,
        'date':this.rForm.value.date_of_match,
        'from': this.rForm.value.from_time,
        'to':this.rForm.value.to_time
      }
         this.authService.doRequestScrimmage(params).then((result) => {
            console.log("Sportssss",result);
            this.res=result;
            if(this.res.status==200)
            {
         jQuery('#calendar2').fullCalendar( 'destroy' );
        jQuery('#request_scrimmage').modal('hide');
        this.presentToast(this.res.message);
       this.router.navigateByUrl('/home');
        }
            else
            {
           this.presentToast(this.res.message)
            
            }
             
            }, (err) => {
              console.log(err);
            });
       }
     else{
           this.validateAllFormFields(this.rForm);
     }
   }
  
  }

    /************************************Validation error***************************/
   

    validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

      /************************************Myteam Detail***************************/

   teamDetail(){
     // alert("teamDetail called")
      this.authService.getMyTeamDetail(this.otheteam_id,this.other_id).then((result) => {
        console.log("Sportssss",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.teamDates=this.res.data.booked_avail_dates;
         // localStorage.setItem('teamDataOther', JSON.stringify(this.teamDates));
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

    /************************************Search Scrimmages***************************/

   searchResult1()
   {
    // alert("searchResult1")
    let params={
      'id':this.id,
      'loc_lat':this.data.lat,
      'loc_lng':this.data.lng,
      'sport': this.data.sport,
      'skill_level':this.data.skill,
      'age_group':this.data.age,
      'page':1
    }
      this.authService.getSearchScrimmages(params).then((result) => {
        console.log("resulttttt",result);
        this.res=result;
        if(this.res.status==200)
        {
          // this.page++;
           // alert("result")
       this.teamlist=this.res.data;
       this.teams=this.res.data.search_teams;
       this.teamss= this.teams;
       this.teamcount=this.teamlist.count;
       this.pagination=this.res.data.pagination;
       // this.teamDates=this.res.data.search_teams.booked_avail_dates;
        // console.log("datesssss",this.teamDates);
       // this.fullCalenderEvents();
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

    /************************************Search Scrimmages***************************/

   loadMore()
   {
    var count=this.teamcount;
    let params={
      'id':this.id,
      'loc_lat':this.data.lat,
      'loc_lng':this.data.lng,
      'sport': this.data.sport,
      'skill_level':this.data.skill,
      'age_group':this.data.age,
      'page':this.page++
    }
    // alert(this.page)
      this.authService.getSearchScrimmages(params).then((result) => {
        console.log("pagination resulttttt",result);
        this.res=result;
        if(this.res.status==200)
        {
           this.pagination=this.res.data.pagination;
       // this.teamlist=this.res.data;
        for(let i=0; i<this.res.data.search_teams.length; i++) 
        {
          this.teams.push(this.res.data.search_teams[i]);
         }
       this.teamss= this.teams;
       console.log("pushinggggg",this.teamss)
       this.teamcount=this.res.data.count+count;
       console.log(this.teamcount);
       // this.teamlist.count=this.teamcount;
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

import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

declare var jQuery: any;

@Component({
  selector: 'app-otherteam-detail',
  templateUrl: './otherteam-detail.component.html',
  styleUrls: ['./otherteam-detail.component.css']
})
export class OtherteamDetailComponent implements OnInit {
id:any;
data:any;
lat: any;
lng: any;
teamlist:any;
teams:any;
res:any;
otheteam_id:any;
other_id:any;
teamList:any;
startFix:any;
teamDates:any;
rForm: FormGroup;
_id:any;
team_data:any;
otherteam_data:any;
date_match: boolean = false;
  constructor(
  	private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public authService: AuthServiceService) { 
  this.rForm = fb.group({
      'date_of_match' : [null, Validators.required],
      'from_time' : [null, Validators.compose([Validators.required])],
      'to_time' : [null, Validators.compose([Validators.required])],
      'team_id' : [null, Validators.compose([Validators.required])]
      });

     this._id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
     // this.teamDates=JSON.parse(localStorage.getItem('teamDataOther'));
     // console.log("other team dataa",JSON.parse(localStorage.getItem('teamDataOther')))
 this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      this.otherteamDetail();
    });
  }

  ngOnInit() {
    this.MyTeams();
  }

    /************************************Full Calender***************************/


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
    },
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

  requestModal()
  {
    jQuery('#request_scrimmage').modal({ backdrop: 'static', keyboard: false });
    jQuery('#request_scrimmage').modal('show');
    this.teamDetail();
  }
  
  cancel()
  {
    jQuery('#calendar2').fullCalendar( 'destroy' );
    jQuery('#request_scrimmage').modal('hide');
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

  selectedDate(){
    alert("modelll")
  }

  /************************************Request Scrimmage***************************/

    RequestScrimmage(val,value)
  {
  console.log(val)
  this.rForm.value.date_of_match = moment(this.rForm.value.date_of_match).format('YYYY-MM-DD');
   this.rForm.value.from_time = moment(this.rForm.value.from_time).format('hh:mm a');
   this.rForm.value.to_time = moment(this.rForm.value.to_time).format('hh:mm a');
    console.log(this.teamDates)
    var usr_dat=new Date(this.rForm.value.date_of_match);
   for(var i in this.teamDates){
    // alert("datesssss")
    var cal_dat=new Date(this.teamDates[i].start)
    console.log("userrrr dateee",usr_dat.toString())
     console.log("calenderrr dateee",cal_dat.toString())
    
      if(this.teamDates[i].status=="available")
      {
        if(usr_dat.toString() == cal_dat.toString())
      {
          this.date_match=true;
      }
         
      }
        
      
     console.log(this.date_match)

    }

    if(this.date_match==false){
      this.date_match=false;
      this.toastr.error("This Date is not available for match", '', {
      timeOut: 3000,
      tapToDismiss:true
    });
    }
   // console.log(this.data._id)
   else {

   if(value)
   {
   

  let params=
  {
    'id': this._id,
    'teamid':val.team_id,
    'uid':this.team_data.user_id._id,
    'otherteamid':this.team_data._id,
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
   this.router.navigateByUrl('/searchresult');
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

 
      /************************************Age Group***************************/

   MyTeams(){
    let params={
    'id':this._id
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

      /************************************Myteam Detail***************************/

   teamDetail(){
     // alert("teamDetail called")
      this.authService.getMyTeamDetail(this.team_data._id,this.team_data.user_id._id).then((result) => {
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



    /************************************Otherteam Detail***************************/

   otherteamDetail()
   {
      this.authService.otherMyTeamDetail(this.id).then((result) => {
        console.log("otherrrr teammm",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.team_data=this.res.data.teamDetail;
       this.otherteam_data=this.res.data.otherTeams;
         // this.teamDates=this.res.data.teamDetail.booked_avail_dates;
       
       
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

    this.toastr.success(msg, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }


}

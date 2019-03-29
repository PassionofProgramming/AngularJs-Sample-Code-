import { Component, OnInit,NgZone,ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';
import { AuthServiceService } from '../../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Ng2DeviceService } from 'ng2-device-detector';
import * as moment from 'moment/moment';
declare var jQuery: any;
@Component({
  selector: 'app-editteam',
  templateUrl: './editteam.component.html',
  styleUrls: ['./editteam.component.css']
})
export class EditteamComponent implements OnInit {
res:any;
id:any;
gender:any;
data:any;
team_data:any;
file:any;
file1:any;
name:any;
unique : any;
images:any;
imagesArray:any;
imagesArray1:any;
img:any;
img_cover:any;
cover: any;
logo : any;
img_array=[];
date_arry=[];
duplicate_array=[];
edit_img_array=[];
edit_img_api=[];
img_array1=[];
team_img:any;
_id:any;
cover_img:any;
skillist:any;
agelist:any;
addres:any;
sportList:any;
latitude: any;
deviceInfo = null;
imggg: boolean = false;
click_val:boolean=false;
longitude: any;
teamDates:any;
  startFix:any;
  startFixx:any;
rForm: FormGroup;
_idd:any;
@ViewChild("search")
  public searchElementRef: ElementRef;
@ViewChild('fileupload') fileInput: ElementRef;
  constructor(
  	private route: ActivatedRoute,
    public router: Router,
    private deviceService: Ng2DeviceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public authService: AuthServiceService) 
  {
     this._id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
     this.route.params.subscribe(params => 
     {
      console.log(params);
      this.id = params.id;
      this.teamDetail();
    });
      this.rForm = fb.group({
      'sport_name' : [null, Validators.required],
      'team_name' : [null, Validators.compose([Validators.required])],
      'age_group' : [null, Validators.compose([Validators.required])],
      'skill_level' : [null, Validators.compose([Validators.required])],
      'gender' : [null, Validators.compose([Validators.required])],
      'location' : [null, Validators.compose([Validators.required])],
      'team_image' : null,
      'cover_image' : null
      });
     }

  ngOnInit() {
  	this.AgeGroup();
    this.SkillLevel();
    this.Sports();
    this.Gender();
    this.epicFunction();
    let els=this;
        var input = <HTMLInputElement>document.getElementById("txtPlaces");
            var places = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                 console.log("place",place)
                  this.rForm.get('location').setValue(place.formatted_address);
                var address= place.formatted_address;
                els.addres=address;
                // els.addresss(address);
                els.latitude = place.geometry.location.lat();
                 console.log("latitude",els.addres)
               els.longitude = place.geometry.location.lng();
                var mesg = "Address: " + els.addres;
                mesg += "\nLatitude: " + els.latitude;
                mesg += "\nLongitude: " +  els.longitude;
                // alert(mesg);
            });
  }

  dragFileOverStart() {
  }
 
   dragFileOverEnd() {
  }

     epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log("infooooo00000000",this.deviceInfo);
      // alert(this.deviceInfo.device)
      // alert(this.deviceInfo.os)
      // alert(this.deviceInfo.browser)
    }

  /************************************Edit dates***************************/

editDates(){
  let th=this;
   let eventss=this.teamDates;
   for(var i in this.teamDates) {
     this.date_arry.push(this.teamDates[i].start)
   }
  jQuery('#edit_dates').modal('show');

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
    selectConstraint: {
        start: jQuery.fullCalendar.moment().subtract(1, 'days'),
        end: jQuery.fullCalendar.moment().startOf('month').add(1, 'month')
    },
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


   /************************************Delete Team***************************/

   EditDates(){

    console.log("edittt arrayyy",this.date_arry)
     console.log("teamsssss datess",this.teamDates)
    // for(var i in this.teamDates)
    // {
    //   for(var j in this.date_arry)
    //   {
    //     if(this.date_arry.[i]==this.teamDates[j])
    //     {
    //       alert("same dateeee")
    //     }
    //   }
    // }
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

  /************************************Drag Files***************************/


   dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) 
  {
     this.imggg= true;
     // this.imggg= true;
    console.log("clearrr in  hoya  this.img_array",this.img_array)
    console.log("clearrr  hoya this.edit_img_api",this.edit_img_api)
    var nowww = Date.now(); 
    console.log(acceptedFile)
   // acceptedFile.file.name = Date.now()
     this.file = acceptedFile.file;
     this.file.unique = nowww;
    // this.edit_img_api.push(this.file);
     this.unique= nowww;
        this.name=acceptedFile.file.name;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file);
  }



  /************************************File REader for team***************************/

      _handleReaderLoaded(e){
       console.log('image', e.target.result);
       this.img=e.target.result;
       // this.imagesArray = <FormArray>this.rForm.controls.imagearray;
       
       if(this.img_array.length==2)
       {
        alert("Maximum two photos allowed!!!")
       }
       else{
        this.img_array.push({'img':this.img,'name':this.name,'file': this.file, 'unique' : this.unique});
       
       }
     }

    /************************************Select File from Library for team***************************/

  onFileChange(event) {
     this.imggg= true;
    console.log(event);
     var nowww = Date.now(); 
    if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
      if (event.target.files.length > 0) {
       // this.img = true;
        // this.img_valid = true;
        this.file = event.target.files[0];
           this.file.unique = nowww;
           this.unique=nowww;
          this.name=  this.file.name;
        console.log(" this.img_array1 this.img_array1",this.edit_img_api)
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file);
      }
    } else {
      // this.img_valid = true;
      // this.img = false;
    }
  }

    /************************************File REader for cover***************************/

  // _handleReaderLoaded_cover(e){
  //      console.log('image', e.target.result);
  //      this.img_cover=e.target.result;
  //    }

    /************************************Select File from Library for cover***************************/

  // onFileChange_cover(event) {
  //   console.log(event);
  //    var nowww = Date.now(); 
  //   if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
  //     if (event.target.files.length > 0) {
  //      // this.img = true;
  //       // this.img_valid = true;
  //       this.cover_img = event.target.files[0];
  //       const reader = new FileReader();
  //       reader.onload = this._handleReaderLoaded_cover.bind(this);
  //       reader.readAsDataURL(this.cover_img);
  //     }
  //   } else {
  //     // this.img_valid = true;
  //     // this.img = false;
  //   }
  // }

  /************************************Delete Image**************************/


  deleteImg(indx,url){
   console.log(this.img_array)
   console.log(this.edit_img_api)
    for(var i = 0; i < this.img_array.length; i++) {
    //var obj = this.img_array1[i];
   if(url.unique == this.img_array[i].unique) {
    console.log(this.img_array[i])
    this.img_array.splice(i, 1);
     // this.edit_img_api.splice(i, 1);
     if(this.img_array.length==0){
      this.imggg= false;
     }
   }
    // if(listToDelete.indexOf(obj.unique) !== -1) {
    //     img_array1.splice(i, 1);
    // }
}
  }


  /************************************Select Cover***************************/

    checking(index, url) {
      console.log(index,url)
      this.click_val=true;
      $('.select_upload_img').removeClass('selected');
    $('.select_upload_img').eq(index).addClass('selected').siblings().removeClass('selected');
   
    if(this.img_array.length == 1) {
      if(this.img_array[0].file) {
          this.logo=this.img_array[0].file;
          this.cover=this.img_array[0].file;
      }
      else {
        this.logo=this.img_array[0].name;
        this.cover=this.img_array[0].name;
      }
      
    }
    else {

    var indexxx;
    for(var i in this.img_array){
      if(url.unique == this.img_array[i].unique) {
        // console.log("hiiiiiiii match")
        this.img_array[i].selected = true;
        indexxx = i;
        if(this.img_array[i].file) {
           this.cover=this.img_array[i].file;
        }
        else {
          this.cover=this.img_array[i].name;
        }
        console.log("dbcfdsjhfgbvdhybdjh ",this.cover)
      }

    }
    if(indexxx==0) {
      if(this.img_array[1].file) {
        this.logo=this.img_array[1].file;
      }
      else {
        this.logo=this.img_array[1].name;
      }
    }
    else {
     if(this.img_array[0].file) { 
         this.logo=this.img_array[0].file;
       }
       else {
        this.logo=this.img_array[0].name;
       }
    }
  }
    console.log("hiiii logo and cover ",this.cover,this.logo )
    // this.img_array1.
  }
 
   /************************************Edit Team***************************/


  EditTeam(valid) { 
     // console.log(this.img_array)
       console.log(this.click_val)
      if(!this.click_val){
      if(this.img_array.length == 1) {
        // this.cover = this.img_array1[0];
        if(this.img_array[0].file) {
            this.logo = this.img_array[0].file;
            console.log(this.img_array[0].file)
         }
         else {
          this.logo = this.img_array[0].name;
         }
      }
      else if(this.img_array.length >1){
         if(this.img_array[0].file) {
           this.cover = this.img_array[0].file;
          }
          else {
              this.cover = this.img_array[0].name;
          }
           if(this.img_array[1].file) {
             this.logo = this.img_array[1].file;
           }
           else {
            this.logo = this.img_array[1].name;
           }
      }
    }
    // this.logo=this.duplicate_array[0];
    console.log("hiiiii this logo ", this.logo)
        if(valid){
       
        const data = new FormData();
        data.append('sport_name', this.rForm.get('sport_name').value);
        data.append('team_name', this.rForm.get('team_name').value);
        data.append('age_group',this.rForm.get('age_group').value);
        data.append('skill_level', this.rForm.get('skill_level').value);
        data.append('location',  this.rForm.get('location').value);
        data.append('team_id', this.id);
        data.append('latitude', this.latitude);
        data.append('longitude', this.longitude);
        data.append('gender', this.rForm.get('gender').value);
         data.append("team_image", this.logo);
         data.append("user_id",  this._id);
        data.append('cover_image', this.cover);
        console.log(data);
        this.authService.editTeam(data).then((result) => {
          console.log(result);
          this.res = result;
          if (this.res.status === 200) 
          {
          // localStorage.setItem('teamData', JSON.stringify(this.res.data));

          this.router.navigateByUrl('/myteam');
          this.presentToast(this.res.message)
          } else {
               this.toastr.error(this.res.message, '', {
                timeOut: 3000,
                tapToDismiss:true
              });
            // this.toastr.error(this.res.message);
          }

        }, (err) => {
          console.log(err);
        });
      
      }
      else{
         // this.validateAllFormFields(this.rForm);
      }
    }
      
                 /************************************Get Gender***************************/

    Gender() {
     this.authService.getGender().then((result) => {
        console.log("genderrrrr",result);
        this.res=result;
        if(this.res.status==true)
        {
         this.gender= this.res.data; 
        }
        else{
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
       this.team_data=this.res.data;
       this.img_array=this.res.data.imageArray;
       this.edit_img_api=this.res.data.imageArray;
        this.rForm.get('sport_name').setValue(this.team_data.sport_name._id);
        this.rForm.get('skill_level').setValue(this.team_data.skill_level._id);
        this.rForm.get('age_group').setValue(this.team_data.age_group._id);
        this.rForm.get('gender').setValue(this.team_data.gender._id);
        this.rForm.get('location').setValue(this.team_data.location);
        this.rForm.get('team_name').setValue(this.team_data.team_name);
        console.log("teamDatesssss",this.team_data)
        this.teamDates=this.res.data.booked_avail_dates;
        console.log("dfdfdfdfdfdfd",this.teamDates)
       
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

   /************************************Select Sports***************************/

   Sports(){
      this.authService.getSports().then((result) => {
        console.log("Sportssss",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.sportList=this.res.data;
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

   AgeGroup(){
      this.authService.getAgeGroup().then((result) => {
        console.log("AgeGroup",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.agelist=this.res.data;
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

   /************************************Skill Level***************************/

   SkillLevel(){
      this.authService.getSkillLevel().then((result) => {
        console.log("SkillLevel",result);
        this.res=result;
        if(this.res.status==200)
        {
         this.skillist=this.res.data;
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

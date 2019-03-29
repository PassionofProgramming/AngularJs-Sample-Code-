import { Component, OnInit,NgZone,ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import 'assets/css/owl.carousel.css';
import { ToastrService } from 'ngx-toastr';
// import { MapsAPILoader } from '@agm/core';
import { AuthServiceService } from '../auth-service.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
startAt = new Subject()
endAt = new Subject()
myControl: FormControl = new FormControl();
filteredOptions: Observable<string[]>;
id:any;
privacydata:any;
termsdata:any;
nearlist:any
res:any;
notify_count:any;
final_count:any;
count:any;
currentFocus:any;
lat:any;
lng:any;
owl:any;
latitude: any;
longitude: any;
sportList:any;
skillist:any;
agelist:any;
option:any;
options:any;
skill_id:any;
rForm: FormGroup;
pushRightClass: string = 'push-right';
@ViewChild("search")
public searchElementRef: ElementRef;
@ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
  
 constructor(
    public authService: AuthServiceService,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ngZone: NgZone) 
  {
     this.rForm = fb.group({
      'sport' : null,
      'skill_level' : null,
      'age_group' : null
      });
  if(localStorage.getItem('isLoggedin')!=null){
    var data=localStorage.getItem('isLoggedin');
    this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
  }
 
}

  /***********************************Ng InIt***************************/


  ngOnInit() {
    this.GetPrivacy();
    this.GetTerms();
    this.AgeGroup();
    this.SkillLevel();
    this.Sports();
   this.getMessageCounter(); 
  this.getLocation();
 
 
    this.Scrimmages();
   
    let els=this;
      var input = <HTMLInputElement>document.getElementById("txtPlaces");
            var places = new google.maps.places.Autocomplete(input);
      
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                console.log("place",place)
                var address = place.formatted_address;
                els.latitude = place.geometry.location.lat();
                 console.log("latitude",els.latitude)
               els.longitude = place.geometry.location.lng();
                var mesg = "Address: " + address;
                mesg += "\nLatitude: " + els.latitude;
                mesg += "\nLongitude: " +  els.longitude;
            });
             // });
      var data=localStorage.getItem('isLoggedin');
      this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;


  }

 filter(val: string){
    return this.sportList.filter(option =>
      option.sport.toLowerCase().includes(val.toLowerCase())

      );
  }

  selectBeneficiary(val)
  {
   this.skill_id=val; 
  }

   setExchangeID(event)
   {

   }
  /************************************Open Nav***************************/

     openNav() 
    {
      if(localStorage.getItem('isLoggedin')!=null)
      {
       document.getElementById("mySidenav").style.width = "300px";
       }
     else
     {
      alert("You have to Login First!!")
     }
    }

  /************************************Close Nav***************************/

    closeNav() 
     {
            document.getElementById("mySidenav").style.width = "0";
     }

         isToggled(): boolean 
    {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

  /************************************Side Menu Data***************************/


    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
    localStorage.removeItem('isLoggedin');
     this.router.navigateByUrl('/login');
   }

    messageList(){
    this.router.navigateByUrl('/messagelist');
    document.getElementById("mySidenav").style.width = "0";
  }
   Home(){
    this.router.navigateByUrl('/home');
  }

   myTeams(){
    this.router.navigateByUrl('/myteam');
    document.getElementById("mySidenav").style.width = "0";
  }

   myScrimmages()
   {
    this.router.navigateByUrl('/myscrimmage');
    document.getElementById("mySidenav").style.width = "0";
  }
    Notification()
      {
    this.router.navigateByUrl('/notification');
    document.getElementById("mySidenav").style.width = "0";
   }

    AccountSettings()
    {
    this.router.navigateByUrl('/accountsetting');
    document.getElementById("mySidenav").style.width = "0";
    }

    NewScrimmages()
    {
    this.router.navigateByUrl('/newscrimmage');
    document.getElementById("mySidenav").style.width = "0";
  }



 /************************************Get Notification Counter***************************/

   getNotificationCounter(){
     // alert("notificationsss")
    let params={
      u_id:this.id
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
      u_id:this.id
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

     /************************************GEt Privacy***************************/

    GetTerms() {
     this.authService.getTerms().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         
          this.termsdata=this.res.data.terms_pdf;
        }
        else{
        }
         
        }, (err) => {
          console.log(err);
        });
   
        
  }

    /************************************GEt Privacy***************************/

    GetPrivacy() {
     this.authService.getPrivacy().then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==true)
        {
         
          this.privacydata=this.res.data.privacy_pdf;
        }
        else{
        }
         
        }, (err) => {
          console.log(err);
        });
   
        
  }


  /************************************Get Current Location***************************/



  getLocation() {
 // alert("getLocation called")
 var els=this;
  this.options = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 3600000
  };
  navigator.geolocation.getCurrentPosition(els.success,els.error, els.options);
 
  }

  success(pos) {
    // alert("success called")
  var crd = pos.coords;
  this.lat=crd.latitude;
  this.lng=crd.longitude;
 this.Scrimmages();
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

 error(err) {
  // alert("error called")
  alert('LOCATION ERROR: ' + err.message);
};

  /***************************************************************/


 createTeam(){
    if(localStorage.getItem('isLoggedin')!=null){
    this.router.navigateByUrl('/createteam');
  }
   else{
    alert("You have to Login First!!")
   }
  }
   newScrimmages(){
    if(localStorage.getItem('isLoggedin')!=null){
    this.router.navigateByUrl('/newscrimmage');
  }
   else{
    alert("You have to Login First!!")
   }
  }

/********************************Search Result*******************************/

 searchResult(val){

  for(var i in this.sportList){
    if(this.sportList[i].sport==this.skill_id){
     console.log(this.sportList[i]._id)
     this.skill_id=this.sportList[i]._id
    }
  }
    console.log("vlauessssss",val)
   // this.router.navigate( ['searchresult', {lat: this.latitude, lng: this.longitude,skill:val.skill_level,age:val.age_group,sport:val.age_group}]);
   console.log(this.latitude)
   if(this.latitude==undefined){
    this.latitude='undefined';
   }
    if(this.longitude==undefined){
    this.longitude='undefined';
   }
   if(val.skill_level==null){
    val.skill_level='undefined';
   }
   if(val.age_group==null){
    val.age_group='undefined';
   }
   if(!this.skill_id){
    this.skill_id='undefined';
   }
   if(localStorage.getItem('isLoggedin')!=null){
   this.router.navigate( ['searchresult',this.latitude,this.longitude,val.skill_level,val.age_group,this.skill_id]);
   }
   else{
    alert("You have to Login First!!")
   }
    // this.router.navigateByUrl('/searchresult');
  }

 


    /************************************Get Nearby Scrimmages***************************/

   Scrimmages(){
       // alert("third /called")
    console.log(this.lat,this.lng)
    let params={
      'id':this.id,
      'lat':this.lat,
      'lng':this.lng
    }
      this.authService.getNearScrimmages(params).then((result) => {
        console.log(result);
        this.res=result;
        if(this.res.status==200)
        {
       this.nearlist=this.res.data;
       var owl = jQuery("#owltheme");
         owl.owlCarousel({
            items:4,
            loop:true,
            nav: true,
            dots:false,
            autoplay:false,
            navText:['<img src="../assets/images/prev.png">', '<img src="../assets/images/next.png">'],
            responsiveClass:true,
              responsive:{
                  0:{
                      items:1
                  },
                  600:{
                      items:3
                  },
                  1000:{
                      items:4
                  }
                       }
        });
        owl.trigger('insertContent.owl',this.nearlist);
        }
        else
        {
       this.presentToast(this.res.message)
        
        }
         
        }, (err) => {
          console.log(err);
        });
 }

  signIn(){
    this.router.navigateByUrl('/login');
  }
 signUp(){
    this.router.navigateByUrl('/signup');
  }
   myTeam(){
    if(localStorage.getItem('isLoggedin')!=null){
    this.router.navigateByUrl('/myteam');
  }
   else{
    alert("You have to Login First!!")
   }
  }
  myScrimmage()
  {
     if(localStorage.getItem('isLoggedin')!=null){
    this.router.navigateByUrl('/myscrimmage');
  }
  else{
    alert("You have to Login First!!")
   }
  }
 

   /************************************Select Sports***************************/

   Sports(){
      this.authService.getSports().then((result) => {
        console.log("Sportssss",result);
        this.res=result;
        if(this.res.status==200)
        {
       this.sportList=this.res.data;
       this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
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


   presentToast(msg) {

    this.toastr.success(this.res.message, '', {
  timeOut: 3000,
  tapToDismiss:true
});
  }





}

import { Component, OnInit,NgZone,ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
// import { MapsAPILoader } from '@agm/core';
// declare var google: any

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.css']
})
export class CreateteamComponent implements OnInit {
res:any;
data:any;
file:any;
file1:any;
gender:any;
name:any;
unique : any;
images:any;
imagesArray:any;
imagesArray1:any;
skillist:any;
agelist:any;
img:any;
cover: any;
logo : any;
id:any;
addres:any;
sportList:any;
latitude: any;
longitude: any;
img_array=[];
img_array1=[];
imggg: boolean = false;
click_val:boolean=false;
imgg: boolean = true;
// img_valid: boolean = true;
rForm: FormGroup;
@ViewChild("search")
  public searchElementRef: ElementRef;
@ViewChild('fileupload') fileInput: ElementRef;

  constructor(
    public router: Router,
    private spinner: NgxSpinnerService,
    public authService: AuthServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
     // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) 
  {
    this.rForm = fb.group({
      'imagearray': this.fb.array([]),
      'imagearray1': this.fb.array([]),
      'sport_name' : [null, Validators.required],
      'team_name' : [null, Validators.compose([Validators.required])],
      'age_group' : [null, Validators.compose([Validators.required])],
      'skill_level' : [null, Validators.compose([Validators.required])],
      'gender' : [null, Validators.compose([Validators.required])],
      'location' : [null, Validators.compose([Validators.required])],
      'team_image' : null,
      });
  }

  ngOnInit() 
  {
    this.AgeGroup();
    this.SkillLevel();
    this.Sports();
    this.Gender();
    let els=this;
    this.id=JSON.parse(localStorage.getItem('isLoggedin'))._id;
     // google.maps.event.addDomListener(window, 'load', function () {
     var input = <HTMLInputElement>document.getElementById("txtPlaces");
      var places = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(places, 'place_changed', function () {
            var place = places.getPlace();
              console.log("place",place)
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


  /************************************Drag Files***************************/


   dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) 
  {
     this.imggg= true;
    console.log("clearrr in  hoya  this.img_array",this.img_array)
    console.log("clearrr  hoya this.img_array1",this.img_array1)
    var nowww = Date.now(); 
    console.log(acceptedFile)
   // acceptedFile.file.name = Date.now()
     this.file = acceptedFile.file;
     this.file.unique = nowww;
    // this.file = this.file1.toObject();
     
      //this.file.name = Date.now();
      console.log("hiiiiiiii fileeeeee ",this.file)
        console.log(acceptedFile.file.name);
        // this.imagesArray1 = <FormArray>this.rForm.controls.imagearray1;
        // this.imagesArray1.push(new FormControl(this.file));
        this.img_array1.push(this.file);
          console.log(" this.img_array1 this.img_array1",this.img_array1)

          this.unique= nowww;
        this.name=acceptedFile.file.name;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file);
  }


  /************************************File REader***************************/

  _handleReaderLoaded(e){
       console.log('image', e.target.result);
       this.img=e.target.result;
       // this.imagesArray = <FormArray>this.rForm.controls.imagearray;
       
       if(this.img_array.length==2)
       {
        alert("Maximum two photos allowed!!!")
       }
       else{
        this.img_array.push({'img':this.img,'name':this.name,'file':e, 'unique' : this.unique});
        console.log("imagesArray",this.img_array)
        // this.img_array=this.imagesArray.value;
       }
     }


  /************************************Delete Image**************************/


  deleteImg(indx,url){

    for(var i = 0; i < this.img_array.length; i++) {
    //var obj = this.img_array1[i];
   if(url.unique == this.img_array[i].unique) {
    console.log(this.img_array[i])
    this.img_array.splice(i, 1);
     this.img_array1.splice(i, 1);
     if(this.img_array.length==0){
      this.imggg= false;
     }
    console.log("this.img_array",this.img_array)
    console.log("this.img_array1",this.img_array1)
   }
    // if(listToDelete.indexOf(obj.unique) !== -1) {
    //     img_array1.splice(i, 1);
    // }
}
  }

  /************************************Select File from Library***************************/

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
           console.log("this.file this.file",this.file)
        //  this.imagesArray1 = <FormArray>this.rForm.controls.imagearray1;
        // this.imagesArray1.push(new FormControl(this.file));
        this.img_array1.push(this.file);
        console.log(" this.img_array1 this.img_array1",this.img_array1)
        this.name= this.file.name;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file);
      }
    } else {
      // this.img_valid = true;
      // this.img = false;
    }
  }
 
   dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
   console.log(rejectedFile)
  }


  /************************************Select Cover***************************/

    checking(index, url) {
      console.log(index)
      // alert("hiiii")
      this.click_val=true;
      $('.select_upload_img').removeClass('selected');
    $('.select_upload_img').eq(index).addClass('selected').siblings().removeClass('selected');
    // $(document).()
    console.log('inedx', index);
    console.log('url', url);
    if(this.img_array1.length == 1) {
      this.logo=this.img_array1[0];
      // this.cover=this.img_array1[0];
    }
    else {

    var indexxx;
    for(var i in this.img_array1){
      if(url.unique == this.img_array1[i].unique) {
        // console.log("hiiiiiiii match")
        this.img_array1[i].selected = true;
        indexxx = i;
        this.cover=this.img_array1[i];
        console.log("dbcfdsjhfgbvdhybdjh ",this.cover)
      }

    }
    if(indexxx==0) {
      this.logo=this.img_array1[1];
    }
    else {
     this.logo=this.img_array1[0];
    }
  }
    console.log("hiiii logo and cover ",this.cover,this.logo )
    // this.img_array1.
  }

  /************************************Create Team***************************/


  CreateTeam(valid) { 
    console.log(this.addres)
    console.log(this.latitude)
    console.log(this.longitude)
    if(!this.click_val){
      if(this.img_array1.length == 1) {
        // this.cover = this.img_array1[0];
        this.logo = this.img_array1[0];
      }
      else {
         this.cover = this.img_array1[0];
         this.logo = this.img_array1[1];
      }
    }
    console.log("hiiii this logo ", this.logo)
      console.log("hiiii logo and cover ",this.cover,this.logo )
        console.log("arrrraayyyyyyy",this.img_array1);
        if(valid){
       this.spinner.show();
        const data = new FormData();
        this.images= this.img_array1;
        console.log("imagessssss",this.images);
        data.append('sport_name', this.rForm.get('sport_name').value);
        data.append('team_name', this.rForm.get('team_name').value);
        data.append('age_group',this.rForm.get('age_group').value);
        data.append('skill_level', this.rForm.get('skill_level').value);
        data.append('location',  this.addres);
        data.append('latitude', this.latitude);
        data.append('longitude', this.longitude);
        data.append('gender', this.rForm.get('gender').value);
         data.append("team_image",  this.logo);
         data.append("user_id",  this.id);
         // for(let i =0; i < this.img_array1.length; i++)
         // {
         //  if(this.img_array1[i].selected==true){
         //     data.append("team_image",this.img_array1[i]);
         //  }
         //  else{
         //    data.append("team_image", this.img_array1[i]);
         //  }
        
         // }
        data.append('cover_image',  this.cover);
        console.log(data);
        this.authService.createTeam(data).then((result) => {
          console.log(result);
            this.spinner.hide();
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
         this.validateAllFormFields(this.rForm);
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

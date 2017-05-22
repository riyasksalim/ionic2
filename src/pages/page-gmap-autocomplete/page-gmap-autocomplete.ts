 import {Component, NgZone,ViewChild, ElementRef} from '@angular/core';
 import { Http} from '@angular/http';
 import {ViewController,ToastController,NavController} from 'ionic-angular';
 import { WelcomePage } from '../welcome/welcome';
declare var google:any;
 @Component({
  templateUrl: 'page-gmap-autocomplete.html'
 })

 export class  PageGmapAutocompletePage {
selectedData;
 autocompleteItems;
 autocomplete;
 public isbuttonshow=false;
 service = new google.maps.places.AutocompleteService();
  @ViewChild('map') mapElement: ElementRef;
  map: any;

 constructor (public viewCtrl: ViewController,public navCtrl: NavController, private zone: NgZone,public http:Http,public toastCtrl:ToastController) {
 this.autocompleteItems = [];
 this.selectedData=[];
 this.autocomplete = {
  query: ''
 };
 }

 dismiss() {
 this.viewCtrl.dismiss();

}
 load(placeid:any) {
  let a={
      lat:9.9312,
      long:76.2673
    }
   return a
  // return new Promise(resolve => {
   
  //   this.http.get('https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=ChIJsUcT7hMNCDsRxKruGn0myYk&key=AIzaSyC2zGeYgplhjSXcaQmbiAcTodM4w1Pzs4M')
  //     .map(res => res.json())
  //     .subscribe(data => {
      
         
  //       resolve(data);
  //     });
   
  // });
}


 chooseItem(item: any) {
 debugger;
 //this.viewCtrl.dismiss(item);
 var latlong=this.load(item.place_id);
 this.loadMap(latlong)
 }

 updateSearch() {
 
 if (this.autocomplete.query == '') {
  this.autocompleteItems = [];
  return;
 }
 let me = this;
 this.service.getPlacePredictions({ input: this.autocomplete.query,  componentRestrictions: {country: ''} }, function (predictions, status) {
  me.autocompleteItems = []; 
  me.zone.run(function () {
    predictions.forEach(function (prediction) {
      me.autocompleteItems.push(prediction);
      console.log(prediction);
    });
  });
  });
}
loadMap(latlong:any){
 debugger;

    let latLng = new google.maps.LatLng(latlong.lat, latlong.long);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.selectedData=this.autocompleteItems;
    this.autocompleteItems=[];
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: latLng
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
    this.isbuttonshow=true;
 
  }
  addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
  setlocation(){
    console.log(this.selectedData);
         let toast = this.toastCtrl.create({
                      message: 'Your location set to ....',
                      duration: 3000,
                      position: 'top'
                    });

                      toast.present();

                       this.viewCtrl.dismiss();


                       this.navCtrl.setRoot(WelcomePage, {}, {
                      animate: true,
                      direction: 'forward'
                    });
  }
  }
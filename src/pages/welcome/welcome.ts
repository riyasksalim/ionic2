import { Component ,NgZone,ViewChild, ElementRef} from '@angular/core';
import { NavController,NavParams,Platform } from 'ionic-angular';
 
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
 import {Model } from '../page-gmap-autocomplete/model'

 declare var google:any;
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
 //public service = new google.maps.places.PlacesService();
  @ViewChild('map') mapElement: ElementRef;
  public myCallback:void;
  public map:any;
  service:any;

 public ResultModel:Model.RootObject;

  constructor(public navCtrl: NavController,private navParams: NavParams,public plt: Platform) { 

      debugger;
      this.ResultModel=navParams.data;
      this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
        this.searchPOI();

       });
     
  }

  searchPOI(){
    debugger;
 var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);


 let mapOptions = {
      center: pyrmont,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  var request = {
    location: pyrmont,
    radius: '500',
    types: ['store']
  };

  this.service = new google.maps.places.PlacesService(this.map);
  this.service.nearbySearch(request, this.callback);




  };
 callback(results, status) {
  var map=this.map;
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      let marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.LatLng
       });
 
       let content = "<h4>Information!</h4>";  
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });
 
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });
    }
  }
};



  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

 
}

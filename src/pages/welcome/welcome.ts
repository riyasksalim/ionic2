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
      this.map=null;
        this.searchPOI();

       });
     
  }

  searchPOI(){
    debugger;
 var pyrmont = new google.maps.LatLng(this.ResultModel.result.geometry.location.lat,this.ResultModel.result.geometry.location.lng);


 let mapOptions = {
      center: pyrmont,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  // var request = {
  //   location: pyrmont,
  //   radius: '500',
  //   types: ['store']
  // };

  this.service = new google.maps.places.PlacesService(this.map);
 
  this.service.nearbySearch({location: pyrmont,radius: 500, type: ['pub']}, (results1, status) => {
                  for (var i = 0; i < results1.length; i++) {
                      var place = results1[i];
                        var geocoder = new google.maps.Geocoder;
                          var infowindow = new google.maps.InfoWindow;
                        geocoder.geocode({'placeId': place.place_id }, (results, status) => {
                        debugger;
                        if (status === 'OK') {
                                  if (results[0]) {
                                    this.map.setZoom(11);
                                    this.map.setCenter(results[0].geometry.location);
                                    var marker = new google.maps.Marker({
                                      map: this.map,
                                       animation: google.maps.Animation.DROP,
                                      position: results[0].geometry.location
                                    });
                                      let content = "<h4>"+results[0].formatted_address+"</h4>";  
                                      let infoWindow = new google.maps.InfoWindow({ content: content });
                                                    infoWindow.open(this.map, marker);
                                                    marker.setAnimation(google.maps.Animation.BOUNCE);
                                          //  google.maps.event.addListener(marker, 'click', () => {
                                          //           infoWindow.open(this.map, marker);
                                          //           marker.setAnimation(google.maps.Animation.BOUNCE);
                                          //         });
                                 
                                  } else {
                                    window.alert('No results found');
                                  }
                            } else {
                              //window.alert('Geocoder failed due to: ' + status);
                            }
                  });
                  }
                  
                   
                  });



};

// setmarker(results,status){

//  if (status == google.maps.places.PlacesServiceStatus.OK) {
//                     for (var i = 0; i < results.length; i++) {
//                       var place = results[i];
//                       let marker = new google.maps.Marker({
//                         map: this.map,
//                         animation: google.maps.Animation.DROP,
//                         position: place.geometry.location
//                       });
                
//                         let content = "<h4>Information!</h4>";  
//                         let infoWindow = new google.maps.InfoWindow({
//                           content: content
//                         });
                
//                         google.maps.event.addListener(marker, 'click', () => {
//                           infoWindow.open(this.map, marker);
//                         });
//                     }
//             }
// };

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

 
}

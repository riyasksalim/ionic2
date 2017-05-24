import { Component, NgZone, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController, AlertController, } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { Model } from '../page-gmap-autocomplete/model'

declare var google: any;
declare const FB: any;
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  public myCallback: void;
  public map: any;
  service: any;
  public token: any = "";
  public loged: boolean = false;
  public poititle: string = "Show List";
  public showlist = true;
  public user: any;

  public ResultModel: Model.RootObject;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    private toastCtrl: ToastController,
    public plt: Platform) {

    this.ResultModel = navParams.data;
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.map = null;
      this.searchPOI();
    });

  }

  searchPOI() {

    debugger;

    var pyrmont = new google.maps.LatLng(this.ResultModel.result.geometry.location.lat, this.ResultModel.result.geometry.location.lng);
    var styles = [{
      stylers: [{
        hue: "#00b2ff"
      }, {
        saturation: -50
      }, {
        lightness: 7
      }, {
        weight: 1
      }

      ]
    }, {
      featureType: "road",
      elementType: "geometry",
      stylers: [{
        lightness: 100
      }, {
        visibility: "on"
      }]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [{
        visibility: "on"
      }]
    }];

    var styledMap = new google.maps.StyledMapType(styles, {
      name: "Styled Map"
    });


    let mapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: pyrmont,
      zoom: 12,
      streetViewControl: false,
      panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.service = new google.maps.places.PlacesService(this.map);

    this.service.nearbySearch({ location: pyrmont, radius: 50000, type: ['point_of_interest'] }, (results1, status) => {
      for (var i = 0; i < results1.length; i++) {
        var place = results1[i];
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        geocoder.geocode({ 'placeId': place.place_id }, (results, status) => {
          debugger;
          if (status === 'OK') {
            if (results[0]) {
              this.map.setZoom(50);
              this.map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: results[0].geometry.location
              });
              let content = "<h4>" + results[0].formatted_address + "</h4>";
              let infoWindow = new google.maps.InfoWindow({ content: content });
              google.maps.event.addListener(marker, 'click', () => {
                infoWindow.open(this.map, marker);
                marker.setAnimation(google.maps.Animation.BOUNCE);
              });
              // infoWindow.open(this.map, marker);


              this.map.mapTypes.set('map_style', styledMap);
              this.map.setMapTypeId('map_style');

            } else {
              window.alert('No results found');
            }
          } else {
            //window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
      let primaryloader = this.loading.create({
        content: 'searching POI of the location...',
        delay: 3000
      });

      primaryloader.present().then(() => {

        let primaryloader1 = this.loading.create({
          content: 'Fetching POI of the location...',
          delay: 3000
        });
        primaryloader1.present().then(() => {
          primaryloader1.dismiss();
          this.showPrompt();
        })



      });


    });



  };
  ngOnInit() {
    FB.init({
      appId: '190665284750687',
      cookie: false,
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.5
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  showpoilist() {
    this.showlist = !this.showlist;
    this.poititle = (this.showlist) ? "show list in map" : "show list";
  }
  statusChangeCallback(response: any) {
    if (response.status === 'connected') {
      console.log('connected');
      this.loginfb();
    } else {

    }
  }

  loginfb() {
    FB.login((result: any) => {
      this.loged = true;
      this.token = result;
      this.me();
    }, { scope: 'user_friends,user_tagged_places,user_photos,user_likes' });
  }

  me() {
    FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends', ((result: any) => {

      if (result && !result.error) {
        debugger;

        this.user = result;
        console.log(this.user);

        let toast = this.toastCtrl.create({
          message: 'Hello ' + this.user.name,
          duration: 3000,
          position: 'top'
        });

        toast.present();

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
          let loader = this.loading.create({
            content: 'Getting latest entries...',
          });

          loader.present().then(() => {
            // this.someService.getLatestEntries()
            //   .subscribe(res => {
            //     this.latestEntries = res;
            //   });
            setTimeout(function () { loader.dismiss(); }, 5000);

          });
        });

      } else {
        debugger;
        console.log(result.error);
      }
    }));
  }

  sync() {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'App requires the permission to gather more about the user',
      message: "we recomment to sync with more social networks",

      buttons: [
        {
          text: 'Manual',
          handler: data => {
            console.log('Cancel clicked');

            // let modal = this.ModalCtrl.create(PageGmapAutocompletePage);

            // modal.present();


          }
        },
        {
          text: 'Current',
          handler: data => {
            console.log('Saved clicked');
            let loading = this.loading.create({
              spinner: 'circles',
              content: 'Locating current location Please Wait...',
            });

            loading.present();

            setTimeout(() => {
              console.log("Finded the location");
              loading.dismiss();

              let toast = this.toastCtrl.create({
                message: 'Your location set to ....',
                duration: 3000,
                position: 'top'
              });

              toast.present();

              this.navCtrl.setRoot(WelcomePage, {}, {
                animate: true,
                direction: 'forward'
              });
            }, 5000);
          }
        }
      ]
    });
    prompt.present();
  }

  filterwithuserinterest() {
    let primaryloader1 = this.loading.create({
      content: 'Fetching user interests from facebook...',

    });
    primaryloader1.present();

    FB.api(
      '/me',
      'GET',
      { "fields": "about,likes" },
      function (response) {
        debugger;
        // Insert your code here
      }
    );



  }

}

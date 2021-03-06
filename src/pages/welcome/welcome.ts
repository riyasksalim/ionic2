﻿import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController, AlertController, } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ListMasterPage } from '../list-master/list-master';
import { SignupPage } from '../signup/signup';
import { Model } from '../page-gmap-autocomplete/model'
import { FacebookResponse } from '../welcome/FbModel'
import { GooglePOI } from '../welcome/GooglePOI'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
    public likes: any = null;
    public Places: any = null;
    service: any;
    public token: any = "";
    public loged: boolean = false;
    public poititle: string = "Show List";
    public showlist = false;
    public user: any;
    public POIlist: any[] = null;
    public fbmodel: FacebookResponse.FacebookRoot;
    public GoogleModel: GooglePOI.POI[];
    public ResultModel: Model.RootObject;

    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        public alertCtrl: AlertController,
        public loading: LoadingController,
        private toastCtrl: ToastController,
        private fb: Facebook,
        public plt: Platform) {

        this.ResultModel = navParams.data;
        this.plt.ready().then((readySource) => {
            console.log('Platform ready from', readySource);
            this.map = null;
            this.searchPOI();
        });

    }

    public searchPOI() {

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
            mapTypeId: google.maps.MapTypeId.HYBRID,
            center: pyrmont,
            zoom: 18,
            streetViewControl: true,
            panControl: true,
        
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        //let toast = this.toastCtrl.create({
        //    message: 'searching POI nearby ' + this.ResultModel.result.formatted_address,
        //    duration: 3000,
        //    position: 'top'
        //});
        this.service = new google.maps.places.PlacesService(this.map);

        this.service.nearbySearch({ location: pyrmont, radius: 50000, type: ['point_of_interest'] }, (results1, status) => {
            let primaryloader = this.loading.create({
                content: 'Searching POI of the location selected...',
                delay: results1.length * 100
            });
            primaryloader.present();
            debugger;
            this.GoogleModel = results1;
            console.log(results1);
            for (var i = 0; i < results1.length; i++) {

                var place = results1[i];
                console.log(place);
                var geocoder = new google.maps.Geocoder;
             
                geocoder.geocode({ 'placeId': place.place_id }, (results, status) => {

                    if (status === 'OK') {
                        if (results[0]) {
                            this.map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: this.map,
                                animation: google.maps.Animation.DROP,
                                position: results[0].geometry.location
                            });
                            debugger;
                            this.setnameofPOI(results[0].formatted_address, i, primaryloader);
                            let content = "<h4>" + results[0].formatted_address + "</h4>";
                            let infoWindow = new google.maps.InfoWindow({ content: content });
                            google.maps.event.addListener(marker, 'click', () => {
                                infoWindow.open(this.map, marker);
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                            });

                            this.map.mapTypes.set('map_style', styledMap);
                            this.map.setMapTypeId('map_style');
                            
                        } else {
                            window.alert('No results found');
                        }

                       
                    } else {

                    }
                    primaryloader.dismiss();

                });
            }
          
          
        });
    };

    public setnameofPOI(name: any, iteration: number, loader: any) {  

        setTimeout(() => {
            loader.setContent(name);
        }, iteration * 100);
    };


    ngOnInit() {
        FB.init({
            appId: '190665284750687',
            cookie: false,
            xfbml: true,  
            version: 'v2.8' 
        });
    }
    public showlistofpoi() {
        debugger;
        this.navCtrl.push(ListMasterPage, this.GoogleModel);
    };
    public login() {
        
        this.navCtrl.push(LoginPage);
    };

    public signup() {
        this.navCtrl.push(SignupPage);
    };

    //public showpoilist() {
    //    this.navCtrl.push(ListMasterPage);
    //    //this.showlist = !this.showlist;
    //    //this.poititle = (this.showlist) ? "show list" : "show list in map";
    //}
    public statusChangeCallback(response: any) {
        if (response.status === 'connected') {
            console.log('connected');
            this.loginfb();
        } else {
            this.loginfb();
        }
    };

    public loginfb() {
        FB.login((result: any) => {
            this.loged = true;
            this.token = result;
            this.me();
        }, { scope: 'user_friends,user_tagged_places,user_photos,user_likes' });
    };

    public me() {
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
                        content: 'Analysing the user interests !!',
                    });

                    loader.present().then(() => {
                        // this.someService.getLatestEntries()
                        //   .subscribe(res => {
                        //     this.latestEntries = res;
                        //   });
                        setTimeout(()=> {

                            this.filterwithuserinterest();
                            loader.dismiss();
                        }, 5000);

                    });
                });

            } else {
                debugger;
                console.log(result.error);
            }
        }));
    };

    public loginfbstatus() {
        debugger;
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
        
        //this.fb.login(['public_profile', 'user_friends', 'email', 'user_tagged_places', 'user_photos','user_likes'])
        //    .then((res: FacebookLoginResponse) =>{
        //        this.loged = true;
        //        this.token = res.authResponse.accessToken;
        //        this.me();
        //        console.log('Logged into Facebook!', res)
            
                
        //        })
        //    .catch(e => console.log('Error logging into Facebook', e));

    };

    showPrompt() {
        let prompt = this.alertCtrl.create({
            title: 'App requires the permission to gather more about the user',
            message: "we recomment to sync with more social networks",

            buttons: [
                {
                    text: 'Manual',
                    handler: data => {
                        console.log('Cancel clicked');

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
    };

    public filterwithuserinterest() {
        let primaryloader1 = this.loading.create({
            content: 'Fetching user interests from facebook...',

        });
        primaryloader1.present();
        debugger;
        FB.api('/me', 'GET', { "fields": "about,likes,tagged_places" }, (response: FacebookResponse.FacebookRoot) => {
          
            debugger;
            primaryloader1.dismiss();
            console.log(response.likes);
            if (response.likes) {
                this.likes = response.likes.data;
                this.Places = response.tagged_places.data;

                let loader = this.loading.create({
                    content: "Authenticating...",
                    duration: response.likes.data.length * 1000
                });

                loader.present();


                for (var i = 1; i < response.likes.data.length; i++) {


                    this.setname("Interested in " + response.likes.data[i].name, i, loader);

                }
                setTimeout(() => {
                    this.syncudertaggedplaces();
                }, response.likes.data.length * 1000);
            }
            else {
                alert("Looks like the user is not so active in the facebook!!");
            }
      
            }
        );
    }

    public setname(name: any, iteration: number, loader: any) {   // here may goes your 
      
        setTimeout(() => {  
            loader.setContent(name);
        }, iteration * 1000);
    };
 

    public  syncudertaggedplaces() {
      
            let loader = this.loading.create({
                content: "Fetching user tagged locations...",
                duration: this.Places.length * 1000
            });
            loader.present();

            for (var z = 0; z < this.Places.length; z++) {
                 this.setname("Places you may in "+this.Places[z].place.name, z, loader);
            }
    };

};

import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ViewController, ToastController, NavController, Platform, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { Model } from '../page-gmap-autocomplete/model'
declare var google: any;
@Component({
    templateUrl: 'page-gmap-autocomplete.html'
 
    
})

export class PageGmapAutocompletePage {
    public selectedData;
    public autocompleteItems;
    public autocomplete;
    public location: any = null;
    public Location: string;
    public isbuttonshow = false;
    public service = new google.maps.places.AutocompleteService();
    @ViewChild('map') mapElement: ElementRef;
    public map: any;
    public result: Model.RootObject;

    constructor(public viewCtrl: ViewController,
        public navCtrl: NavController,
        private zone: NgZone,
        public http: Http,
        public platform: Platform,
        private _navParams: NavParams,
        public toastCtrl: ToastController) {
        this.autocompleteItems = [];
        this.selectedData = [];
        this.autocomplete = {
            query: ''
        };
        debugger;
      
        if (this._navParams.data.coords) {
            var lat = this._navParams.data.coords.latitude;
            var long = this._navParams.data.coords.longitude;
            this.platform.ready().then((readySource) => {

                this.loadMap(lat, long);
            });

        }
    }

    public dismiss() {
        this.viewCtrl.dismiss();

    }
    public load(placeid: any) {
      
        var a: Model.RootObject = {
            "html_attributions": [],
            "result": {
                "address_components": [
                    {
                        "long_name": "Kaloor",
                        "short_name": "Kaloor",
                        "types": ["sublocality_level_1", "sublocality", "political"]
                    },
                    {
                        "long_name": "Kochi",
                        "short_name": "Kochi",
                        "types": ["locality", "political"]
                    },
                    {
                        "long_name": "Ernakulam",
                        "short_name": "EKM",
                        "types": ["administrative_area_level_2", "political"]
                    },
                    {
                        "long_name": "Kerala",
                        "short_name": "KL",
                        "types": ["administrative_area_level_1", "political"]
                    },
                    {
                        "long_name": "India",
                        "short_name": "IN",
                        "types": ["country", "political"]
                    }
                ],
                "adr_address": "\u003cspan class=\"extended-address\"\u003eKaloor\u003c/span\u003e, \u003cspan class=\"locality\"\u003eKochi\u003c/span\u003e, \u003cspan class=\"region\"\u003eKerala\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eIndia\u003c/span\u003e",
                "formatted_address": "Kaloor, Kochi, Kerala, India",
                "geometry": {
                    "location": {
                        "lat": 9.9970903,
                        "lng": 76.302815
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 10.006612,
                            "lng": 76.31038749999999
                        },
                        "southwest": {
                            "lat": 9.976414999999999,
                            "lng": 76.282731
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                "id": "c82f0d8406754f6947db13e1065230b020dcea3f",
                "name": "Kaloor",
                "photos": [
                    {
                        "height": 2304,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/106597765881685948628/photos\"\u003enidhish nidish\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAq9huIq6lAj8qwShgVoC1wCyXzPJseN7smfP3GUhuShlID-YRsOf2iyKxTgoIeT2C5qQ5UFVgHCWpoESTUsTS6XsmFqNNvG1haTyzcdWURw8uPRfgdzgQ9wIJx7iCKaWkEhBFOea5un900MHF0KVRaMOiGhRllVdhBuJITIYRf-Xke2WcW7Ek6g",
                        "width": 4096
                    },
                    {
                        "height": 2592,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/115613119228657117508/photos\"\u003emanu mangalath\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAEpt-OUubxy5d9Jo6Z20imuzr5blzsmyeQR3z6escZNyH0zVSYpFrvLL80vEgMmZf-ne9bKBVV2dEADjhxtkXOLsQb_eZ01xqW8zfg0a5PmEw7rNPo7OOwKZyUZFDIIuEEhAVYxsRXcNUViK5xcwgcSahGhTOHm4NTkiMKRG_Nh_UiJlvKoCfXw",
                        "width": 4608
                    },
                    {
                        "height": 1200,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/118362885092451161380/photos\"\u003eRajkumar Adhikare Rajkumar Adhikare\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAAmyy46C6SstuJxp3sMfhJpKgv0G1K8K4UEz8--h0giStjhetcpXNKOF2C-xfS6CrzlTwSHPjgCkXbE_JAXpqpVBG8HZmB8jBIoN7OxoDixJ2IP6iAxbK6-8kuvzBlc9CEhBdZyLJN5kqT1M8Us85FBRkGhS-AT0Ce6tyd2XOOdtQbsBCKjkPLQ",
                        "width": 1920
                    },
                    {
                        "height": 506,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/108066380969244079409/photos\"\u003eArchana Rajan\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAP_f020M-CutSDnq2VjMoPhT5H4kXOqcPab9i2XxjVCkWEKvynEa0MMcohWt8NXwfdDIY7KhjidQEFoeGjz4v7y3X6eOF-apriFh0hIS3m4QQ80UJwRjT1WNEShQBG5KIEhDgcgW6vyZD3_Vd9G3uChlpGhSDuiKnirtZZzBj2DCqRyYU0mEyCQ",
                        "width": 506
                    },
                    {
                        "height": 546,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/114401359298925985677/photos\"\u003eRakesh Sasidharan\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAABp4P_MtvZrimF8bti4g_mH3ApMCzk8ybAqSlPExTO9k3bbbyTBIkAm354qqEgNc8S52iGvfSw5SYSBXH7oTqxCWjnquYawYJQQb7PiTiRizyZjdoch0NfIKjOnUqjOnNEhAIXD7Z12plak1HUQ7VDzVNGhRGJb8Nyrl6h9eRjNbGOUZ7--a3mg",
                        "width": 800
                    },
                    {
                        "height": 2028,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/102770354663862123230/photos\"\u003eSiril Thomas\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAoaVuFWRDH_vNw1-kTMwsY76n-6NwvKYtN_EDoNbIiZWFRBjt4rplGx9NbzvGAO06wYTtJyqY-QmeBLskSfcNxRWxq-Wzi-Y3cYi8TvcBfSzdLKkM60BpKWjvlvK6UH9TEhDdFy-P4rVoCOIpaccaOtPwGhSGoksZwdlrKQ9FP6NlZK-_mXiEaQ",
                        "width": 2248
                    },
                    {
                        "height": 1400,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/102714229261953037396/photos\"\u003eDeepak Panwar\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAfT2irgAh48q-4hCTp_Old3Q_YhZKo7tuxJts83o4g5zpTOqvzS_W_EWsdmMQSA8fff7zpOHdx22Wdr0VWH8HP9DRQUpJtKNUmVX5v8zSSeIl6lPFBV2MlUM9hnS_KcY7EhBlQJFvyGRHHs5BBP-4zAY2GhQwhDyaMLxiC84A10wpr2aXAc2mqw",
                        "width": 4471
                    },
                    {
                        "height": 2896,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/110392096123053974459/photos\"\u003eSabin Backer\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAxJIV1NGSyFLuGXhwNdZWv7RFXo_MD2o3ekoadwsdGBsQu9YOBNvTHN1IbdyXcfTu_vi3OykR9VQOkmjlswy0EmXV-uVJlTsSqXK_AbIF61IvijlnVzv1G8lVKTTVILyUEhBG5NvpcBukQdbpkbNIKtQDGhS4co3SKibDnumsKxtGwKnie3wBwA",
                        "width": 5152
                    },
                    {
                        "height": 1837,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/110392096123053974459/photos\"\u003eSabin Backer\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRYAAAAa4SD4l6-srT4GMq8ila86oyHsfsycuXjd_Pfp7lC7tZT7UAUNbPrzP8GNS-WbOGmfrRpDNMUl-Oa8iWqI7oRZmyZxYmmecN_UtwhE8ImfJIiEc7dgd15na7IHNl5oQN0EhApZhBBN_EG5cSp7R5RZ5fjGhRBrEOl_S5o5e54OU-m0KfTF3qqqA",
                        "width": 3264
                    },
                    {
                        "height": 2340,
                        "html_attributions": [
                            "\u003ca href=\"https://maps.google.com/maps/contrib/115614279853155280827/photos\"\u003eIjaz Madathiparambil\u003c/a\u003e"
                        ],
                        "photo_reference": "CmRXAAAAjz3UZ-6ZNGS9HQVmMG-2SeZvIhoWZpIzZ6BET2gEzbW2drcD7vPozexCj9TSIc0aMQGRVJPch7cs2vTZEdsQ8qdUHDjGxQPH8VzenTBb-DEd82grrvdWInI_Q5tkk3cvEhB_tjFf3TvalwrILDH68KHzGhTcK7HwELbss9HdBWoy_u4aNGlCpg",
                        "width": 4160
                    }
                ],
                "place_id": "ChIJsUcT7hMNCDsRxKruGn0myYk",
                "reference": "CmRbAAAAqqmOsVhbZ7mrBIDwr6DlGXqaI5fiFfD_RL34eEgzO4BNcsBpr5EISeI5X-PE01gfr4Oqe-ThQ5qHpIn72fLzc56XG4mELTID5uBvm1jW-FNceV0C2ULWGZH3gqZmwuSOEhAofTV3QNSE31G64OEnnqnhGhSEqgX-MHxv0FFKc_BP-xl8IOyZdA",
                "scope": "GOOGLE",
                "types": ["sublocality_level_1", "sublocality", "political"],
                "url": "https://maps.google.com/?q=Kaloor,+Kochi,+Kerala,+India&ftid=0x3b080d13ee1347b1:0x89c9267d1aeeaac4",
                "utc_offset": 330,
                "vicinity": "Kaloor"
            },
            "status": "OK"
        };

        // return new Promise(resolve => {

        //   this.http.get('https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=ChIJsUcT7hMNCDsRxKruGn0myYk&key=AIzaSyC2zGeYgplhjSXcaQmbiAcTodM4w1Pzs4M')
        //     .map(res => res.json())
        //     .subscribe(data => {


        //       resolve(data);
        //     });

        // });


        return a;

    }


    public chooseItem(item: any) {

        this.Location = item.description;
        this.result = this.load(item.place_id);
        this.loadMap(this.result.result.geometry.location.lat, this.result.result.geometry.location.lng)

    };

    public updateSearch() {

        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let me = this;
        this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: { country: '' } }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                predictions.forEach(function (prediction) {
                    me.autocompleteItems.push(prediction);

                });
            });
        });
    }
    public loadMap(latl: any, long: any) {

        let latLng = new google.maps.LatLng(latl, long);

        let mapOptions = {
            center: latLng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }
        this.selectedData = this.autocompleteItems;
        this.autocompleteItems = [];
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        let content = "<h4>Information!</h4>";

        this.addInfoWindow(marker, content);
        this.isbuttonshow = true;

    }
    public addInfoWindow(marker, content) {

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }
    public setlocation() {
        debugger;
        if (this._navParams.data.coords) {

            var geocoder = new google.maps.Geocoder;

            var lat = this._navParams.data.coords.latitude;
            var long = this._navParams.data.coords.longitude;
            var latlng = { lat: parseFloat(lat), lng: parseFloat(long) };

            geocoder.geocode({ 'location': latlng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        console.log(results[1].place_id);
                        this.result = this.load(results[1].place_id);
                        debugger;

                        let toast = this.toastCtrl.create({
                            message: 'Your location set to ' + this.result.result.name,
                            duration: 3000,
                            position: 'top'
                        });

                        toast.present();

                        this.viewCtrl.dismiss();

                        this.navCtrl.setRoot(WelcomePage, this.result, {
                            animate: true,
                            direction: 'forward'
                        });


                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }
        else {

            let toast = this.toastCtrl.create({
                message: 'Your location set to ' + this.result.result.name,
                duration: 3000,
                position: 'top'
            });

            toast.present();

            this.viewCtrl.dismiss();
            this.navCtrl.setRoot(WelcomePage, this.result, {
                animate: true,
                direction: 'forward'
            });
        }
    }
}
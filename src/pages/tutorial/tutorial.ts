import { Component } from '@angular/core';
import { Http, Headers, HttpModule } from '@angular/http';
import { MenuController, NavController, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { MapPage } from '../map/map'
import { WelcomePage } from '../welcome/welcome';
import { TranslateService } from '@ngx-translate/core';
import { PageGmapAutocompletePage } from '../page-gmap-autocomplete/page-gmap-autocomplete'
// https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=ChIJsUcT7hMNCDsRxKruGn0myYk&key=AIzaSyC2zGeYgplhjSXcaQmbiAcTodM4w1Pzs4M
export interface Slide {
    title: string;
    description: string;
    image: string;
}

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
    providers: [],
    
})
export class TutorialPage {
    slides: Slide[];
    showSkip = true;
    address: any = [];
    data: any;
    public test: string;

    constructor(public navCtrl: NavController,
        private ModalCtrl: ModalController,
        public http: Http,
        public menu: MenuController,
        public toastCtrl: ToastController,
        public translate: TranslateService,
        public alertCtrl: AlertController,
        public loadingController: LoadingController) {
        translate.get(["TUTORIAL_SLIDE1_TITLE",
            "TUTORIAL_SLIDE1_DESCRIPTION",
            "TUTORIAL_SLIDE2_TITLE",
            "TUTORIAL_SLIDE2_DESCRIPTION",
            "TUTORIAL_SLIDE3_TITLE",
            "TUTORIAL_SLIDE3_DESCRIPTION",
        ]).subscribe((values) => {
            this.slides = [
                {
                    title: values.TUTORIAL_SLIDE1_TITLE,
                    description: values.TUTORIAL_SLIDE1_DESCRIPTION,
                    image: 'assets/img/ica-slidebox-img-1.png',
                },
                {
                    title: values.TUTORIAL_SLIDE2_TITLE,
                    description: values.TUTORIAL_SLIDE2_DESCRIPTION,
                    image: 'assets/img/ica-slidebox-img-2.png',
                },
                {
                    title: values.TUTORIAL_SLIDE3_TITLE,
                    description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                    image: 'assets/img/ica-slidebox-img-3.png',
                }
            ];
            });
        this.test = "10px";
    }
    public testme(data) {
        console.log(data);
    }
    public startApp() {

        let prompt = this.alertCtrl.create({
            title: 'Choose Location',
            message: "",
            cssClass: 'alertDanger',

            buttons: [
                {
                    text: 'Manual',
                    handler: data => {

                        let modal = this.ModalCtrl.create(PageGmapAutocompletePage, { "location": null });

                        modal.present();


                    }
                },
                {
                    text: 'Current',
                    handler: data => {

                        let loading = this.loadingController.create({
                            spinner: 'circles',
                            content: 'Locating current location Please Wait...',
                        });

                        loading.present();
                        let options = {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0
                        };

                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(this.showPosition, this.errorcallback, options);
                            loading.dismiss();
                        } else {
                            var a = "Geolocation is not supported by this browser.";
                        }
                    }
                }
            ]
        });
        prompt.present();

    }
   

    public showPosition = (position) => {

        this.navCtrl.push(PageGmapAutocompletePage, position);
        //let modal = this.ModalCtrl.create(PageGmapAutocompletePage, { "location": position });

        //modal.present();
    }
    public errorcallback = (err) => {
        console.log(err);
    };

    public onSlideChangeStart(slider) {
        this.showSkip = !slider.isEnd;
    }

    public ionViewDidEnter() {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    public ionViewWillLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    }
}

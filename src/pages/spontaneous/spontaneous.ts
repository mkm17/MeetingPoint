import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingApi, PersonModel, Marker } from '../../shared/shared';
import { CustomMarker } from '../../shared/CustomMarker';
import {} from '@types/googlemaps';

@IonicPage()
@Component({
    selector: 'page-spontaneous',
    templateUrl: 'spontaneous.html',
})
export class SpontaneousPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    private showActive: boolean;
    private showInactive: boolean;
    private currentPosition: Marker;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private dataApi: MeetingApi, private loaderController: LoadingController) {
        this.showActive = true;
        this.showInactive = false;
    }

    public async ionViewDidLoad() {
        let loader = this.loaderController.create({
            content: "Getting Map..."
        });
        loader.present();
        let userPosition = await this.dataApi.getUserCurrentPosition();
        this.currentPosition = { lat: Number(userPosition.lat), lng: Number(userPosition.lng), draggable: false };
        this.loadMap();
        loader.dismiss();
    }

    private async loadMap() {

        let activePeople: Array<PersonModel> = new Array<PersonModel>();
        let inactivePeople: Array<PersonModel> = new Array<PersonModel>();
        activePeople =  await this.dataApi.myPeople;
        
        /*for (let personId in this.dataApi.myPeople) {
            let personToAdd = this.dataApi.myPeople[personId];
            if (personToAdd.Active && personToAdd.MapPoint) {
                activePeople.push(personToAdd);
            }
            else if (personToAdd.MapPoint) {
                inactivePeople.push(personToAdd);
            }
        }*/

        let lat = this.currentPosition.lat ? this.currentPosition.lat : 0;
        let lng = this.currentPosition.lng ? this.currentPosition.lng : 0;
        let latLng = new google.maps.LatLng(lat, lng);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        activePeople.forEach((active) => {
            let overlay = new CustomMarker(this.map, {}, active);
        });
    }

}
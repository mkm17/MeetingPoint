import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingApi, PersonModel, Marker } from '../../shared/shared';

declare let google;
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
    let userPosition =  await this.dataApi.getUserCurrentPosition();
    this.currentPosition={lat: Number(userPosition.lat), lng:  Number(userPosition.lng), draggable:false} ;
    this.loadMap();
    loader.dismiss();
  }

  private loadMap() {

    let activePeople: Array<PersonModel> = new Array<PersonModel>();
    let inactivePeople: Array<PersonModel> = new Array<PersonModel>();
    for (let personId in this.dataApi.myPeople) {
      let personToAdd = this.dataApi.myPeople[personId];
      if (personToAdd.Active && personToAdd.MapPoint) {
        activePeople.push(personToAdd);
      }
      else if (personToAdd.MapPoint) {
        inactivePeople.push(personToAdd);
      }
    }
 
    let lat = this.currentPosition.lat ? this.currentPosition.lat : 0;
    let lng = this.currentPosition.lng ? this.currentPosition.lng : 0;
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: { lat: this.currentPosition.lat, lng: this.currentPosition.lng },
      radius: 50
    });

    let that = this;
    activePeople.forEach(function (active) {
      var activeMarker = new google.maps.Marker({
        position: { lat: Number(active.MapPoint.lat), lng: Number(active.MapPoint.lng) },
        map: that.map,
        title: active.Name,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 5,
          strokeWeight: 2,
          strokeColor: "#B40404"
        },
      });
    });

  }
}
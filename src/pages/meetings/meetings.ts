import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { MeetingPage } from '../meeting/meeting';
import { MockData } from '../../model/mockData';
import { MeetingModel } from '../../model/MeetingModel';
import { MeetingApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html',
})
export class MeetingsPage {

meetings:Array<any> =  new Array<any>();//any;// Array<MeetingModel>;
meetingsIds:any;
enableEdit:boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataApi:MeetingApi,
              private loaderController:LoadingController
  ) {
}

  ionViewDidLoad() {
    //this.meetingsIds=String(this.dataApi.getCurrentUser().Meetings).split(";");
    let loader=this.loaderController.create({
      content:"Getting Meetings..."
    });
    loader.present().then(()=>{
     // this.meetingsIds.forEach(element => {
        //this.dataApi.getMeeting(element).then(data => {
         // this.meetings.push(data);
       // });
      //});
      loader.dismiss();
    });
 }

  goToTheMeeting(event, meeting)
  {
    this.enableEdit=false;
    this.navCtrl.push(MeetingPage,{meeting:meeting,enableEdit:this.enableEdit});
  }
  addNewMeeting()
  {
    this.meetings.push({Id:this.meetings.length, Name:"",GroupId:"",Date:"", lat:50, lng:1});
    let meeting=this.meetings[this.meetings.length-1];
    this.enableEdit=true;
    this.navCtrl.push(MeetingPage,{meeting:meeting,enableEdit:this.enableEdit});
  }
}

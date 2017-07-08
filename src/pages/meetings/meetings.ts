import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { MeetingPage } from '../meeting/meeting';
import { MeetingApi, MapPoint, MeetingModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html',
})
export class MeetingsPage {

meetings:Array<MeetingModel> =  new Array<MeetingModel>();
enableEdit:boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataApi:MeetingApi,
              private loaderController:LoadingController
  ) {
}

  ionViewDidLoad() {
    let loader=this.loaderController.create({
      content:"Getting Meetings..."
    });
    loader.present().then(()=>{
        this.meetings=this.dataApi.myMeetings;
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
    let newMeeting=  new MeetingModel();
    newMeeting.MapPoint=new MapPoint();
    this.enableEdit=true;
    this.navCtrl.push(MeetingPage,{meeting:newMeeting,enableEdit:this.enableEdit});
  }
}

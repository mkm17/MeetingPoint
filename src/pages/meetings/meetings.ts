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

meetings:any;// Array<MeetingModel>;

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
      this.dataApi.getMeetings().then(data => {
        this.meetings=data;
        loader.dismiss();
      });  
    });
 }

  goToTheMeeting(event, meeting)
  {
    this.navCtrl.push(MeetingPage,meeting);
  }
}

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

  private meetings: Array<MeetingModel> = new Array<MeetingModel>();
  private enableEdit: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataApi: MeetingApi,
    private loaderController: LoadingController
  ) {
  }

  public ionViewDidLoad() {
    this.showActualMeetings();
  }

  public goToTheMeeting(event, meeting) {
    this.enableEdit = false;
    this.navCtrl.push(MeetingPage, { meeting: meeting, enableEdit: this.enableEdit });
  }

  public addNewMeeting() {
    let newMeeting = new MeetingModel();
    newMeeting.MapPoint = new MapPoint();
    this.enableEdit = true;
    this.navCtrl.push(MeetingPage, { meeting: newMeeting, enableEdit: this.enableEdit });
  }
  public async showHistoricalMeetigs() {
    let loader = this.loaderController.create({
      content: "Getting Historical Meetings..."
    });
    loader.present();
    let historicalMeetings = await this.dataApi.myMeetings.filter((val: MeetingModel) => {
      let now = new Date();
      let date = new Date(val.Date)
      return date <= now;
    });
    this.meetings = historicalMeetings.sort((a, b) => {
      return (a.Date > b.Date) ? -1 : (a.Date === b.Date) ? 0 : 1;
    });
    loader.dismiss();
  }
  public async showActualMeetings() {
    let loader = this.loaderController.create({
      content: "Getting Actual Meetings..."
    });
    loader.present();
   let actualMeetings = await this.dataApi.myMeetings.filter((val: MeetingModel) => {
        let now = new Date();
        let date = new Date(val.Date);
        let oneDay = 24 * 60 * 60 * 1000;
        let diffDays = Math.round(Math.abs((now.getTime() - date.getTime()) / (oneDay)));
        val.daysDiff = diffDays;
        return date > now;
      });
      this.meetings = actualMeetings.sort((a, b) => {
        return (a.Date > b.Date) ? 1 : (a.Date === b.Date) ? 0 : -1;
      });
      loader.dismiss();
  }
}

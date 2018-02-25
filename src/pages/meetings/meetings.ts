import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingPage } from '../meeting/meeting';
import { MeetingApi, MapPoint, MeetingModel } from '../../shared/shared';
import * as moment from 'moment';
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
        alert('new');
        let newMeeting = new MeetingModel();
        newMeeting.MapPoint = new MapPoint();
        this.enableEdit = true;
        alert('po dupie');
        this.navCtrl.push(MeetingPage, { meeting: newMeeting, enableEdit: this.enableEdit });
    }
    public async showHistoricalMeetigs() {
        let loader = this.loaderController.create({
            content: "Getting Historical Meetings..."
        });
        loader.present();
        let historicalMeetings = await this.dataApi.myMeetings.filter((val: MeetingModel) => {
            val.daysDiff = moment(val.Date).diff(new Date(),'days');
            return val.daysDiff< 0;
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
            val.daysDiff = moment(val.Date).diff(new Date(),'days');
            return val.daysDiff>=0;
        });
        this.meetings = actualMeetings.sort((a, b) => {
            return (a.Date > b.Date) ? 1 : (a.Date === b.Date) ? 0 : -1;
        });
        loader.dismiss();
    }
}

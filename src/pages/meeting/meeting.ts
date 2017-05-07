import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-meeting',
  templateUrl: 'meeting.html',
})
export class MeetingPage {

meeting:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.meeting=this.navParams.data;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Meeting');
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
}

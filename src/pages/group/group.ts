import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MeetingsApi } from '../../shares/shared';
import { HomePage } from '../home/home';
import { MockData } from '../../model/mockData';
import { GroupModel } from '../../model/GroupModel';
import { MeetingApi } from '../../shared/shared'

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

group: any;//GroupModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group=navParams.data;
  }

  ionViewDidLoad() {
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
  editGroup(group)
  {

  }
}

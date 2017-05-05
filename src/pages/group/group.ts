import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MockData } from '../../model/mockData';

/**
 * Generated class for the Group page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

group: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group=navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Group');
  }

}

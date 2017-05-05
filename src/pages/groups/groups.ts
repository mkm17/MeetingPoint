import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { MockData } from '../../model/mockData';

/**
 * Generated class for the Groups page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

groups: Array<{id: number , title: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      let a = new MockData();
      this.groups = a.groups
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Groups');
  }

  goToTheGroup(event, group)
  {
    this.navCtrl.push(GroupPage,group);
  }
}

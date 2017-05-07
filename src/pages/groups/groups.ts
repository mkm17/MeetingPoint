import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { MockData } from '../../model/mockData';
import { GroupModel } from '../../model/GroupModel';
import { MeetingApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

groups: any;//Array<GroupModel>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataApi: MeetingApi,
              private loaderController:LoadingController) {
  }

  ionViewDidLoad() {
    let loader=this.loaderController.create({
      content:"Getting Groups..."
    });
    loader.present().then(()=>{
      this.dataApi.getGroups().then(data => {
        this.groups=data;
        loader.dismiss();
      });  
    });
    
  }

  goToTheGroup(event, group)
  {
    this.navCtrl.push(GroupPage,group);
  }
}

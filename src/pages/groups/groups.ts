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
enableEdit:boolean;
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
      /*this.dataApi.getGroups().then(data => {
        this.groups=data;
        loader.dismiss();
      });  */
      /*this.dataApi.database.ref("groups").once("value").then(function(snap)
      {
        console.log(snap.val());
          this.groups=snap.val();
      })*/
    });
    
  }

  goToTheGroup(event, group)
  {
    this.navCtrl.push(GroupPage,{group:group,enableEdit:this.enableEdit});
  }
  addNewGroup()
  {
    this.groups.push({Id:this.groups.length, Name:"",GroupId:"",Date:""});
    let group=this.groups[this.groups.length-1];
    this.enableEdit=true;
    this.navCtrl.push(GroupPage,{group:group,enableEdit:this.enableEdit});
  }
}

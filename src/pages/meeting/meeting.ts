import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MeetingApi, MeetingModel, GroupModel } from '../../shared/shared';
import { GroupPage } from '../group/group';

@IonicPage()
@Component({
  selector: 'page-meeting',
  templateUrl: 'meeting.html',
})
export class MeetingPage {

meeting:MeetingModel;
editEnableMeeting:boolean;
groupsIds:any;
groups:Array<GroupModel>=new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,private dataApi:MeetingApi) {
    this.meeting=this.navParams.data.meeting;
    this.editEnableMeeting=this.navParams.data.enableEdit;
    this.groupsIds=this.navParams.data.meeting.Groups;
}

  ionViewDidLoad() {
    this.dataApi.GetGroupsOfMeeting(this.groupsIds).then(data => {
      this.groups=data;
    });
      
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
  editMeeting()
  {
    this.editEnableMeeting=true;
  }
  goToTheGroup(event, group)
  {
    this.navCtrl.push(GroupPage,{group:group,enableEdit:false});
  }
  updateMeeting()
  {
    this.dataApi.UpdateMeeting(this.meeting);  
  }

}

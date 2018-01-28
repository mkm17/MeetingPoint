import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MeetingApi, MeetingModel, GroupModel } from '../../shared/shared';
import { GroupPage } from '../group/group';
import { GroupsList } from '../groups-list/groups-list';

@IonicPage()
@Component({
  selector: 'page-meeting',
  templateUrl: 'meeting.html',
})
export class MeetingPage {

meeting:MeetingModel;
editEnableMeeting:boolean;
marker: Marker=new Marker(); 
groupsListCallback:any;
groups:Array<GroupModel>=new Array<GroupModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams,private dataApi:MeetingApi) {
    this.meeting=this.navParams.data.meeting;
    if(this.meeting.Id)
    {
    this.marker.lat=Number(this.meeting.MapPoint.lat);
    this.marker.lng=Number(this.meeting.MapPoint.lng);
    this.marker.draggable=true;
  }
  else{
    this.marker.lat=Number(this.dataApi.GetCurrentUser().MapPoint.lat);
    this.marker.lng=Number(this.dataApi.GetCurrentUser().MapPoint.lng);
    this.marker.draggable=true;
  }
    this.editEnableMeeting=this.navParams.data.enableEdit;
}

  ionViewDidLoad() {

    let that=this;
         if(this.meeting.Groups)
         {
          this.meeting.Groups.forEach(function(meetingGroup)
          {
            let group= that.dataApi.myGroups.find(group => group.Id===meetingGroup)
            if(group)
            {
              that.groups.push(group);
            }
          
          });
         }    
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
  editMeeting()
  {
    this.editEnableMeeting=!this.editEnableMeeting;
  }
  goToTheGroup(event, group)
  {
    this.navCtrl.push(GroupPage,{group:group,enableEdit:false});
  }
  updateMeeting()
  {
    let groupIds:Array<any>=new Array<any>();
    this.groups.forEach(function(group){
      groupIds.push(group.Id);
    });
    this.meeting.Groups=groupIds;
    this.meeting.MapPoint.lat=String(this.marker.lat);
    this.meeting.MapPoint.lng=String(this.marker.lng);
    if(!this.meeting.Id)
    {
      this.dataApi.AddMeeting(this.meeting, this.groups);
    }else{
      this.dataApi.UpdateMeeting(this.meeting, this.groups);
    } 
    this.editEnableMeeting=false;
  }
  markerDragEnd(m: Marker, $event: any) {

    this.marker.lat= $event.coords.lat;
    this.marker.lng= $event.coords.lng

  }
 
  mapClicked($event: any) {
    if(this.editEnableMeeting)
    {
      this.marker.lat= $event.coords.lat;
      this.marker.lng= $event.coords.lng
    }
  }
  addGroupsView(meeting:MeetingModel)
  {
    let that=this;
    this.groupsListCallback = function(_params) {
     return new Promise((resolve, reject) => {
       that.groups=_params;
             resolve();
         });
    }
    this.navCtrl.push(GroupsList,{currentGroups:meeting.Groups,callback: this.groupsListCallback});
  }
}
class Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
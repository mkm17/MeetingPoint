import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MeetingApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-meeting',
  templateUrl: 'meeting.html',
})
export class MeetingPage {

meeting:any;
editEnableMeeting:boolean;
groupsIds:any;
peopleIds:any;
groups:Array<any>=new Array<any>();
people:Array<any>=new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,private dataApi:MeetingApi) {
    console.log(this.navParams.data);
    this.meeting=this.navParams.data.meeting;
    this.editEnableMeeting=this.navParams.data.enableEdit;
    this.groupsIds=this.getArrayFromSource(this.navParams.data.meeting.Groups);
    this.peopleIds=this.getArrayFromSource(this.navParams.data.meeting.People);
}

  ionViewDidLoad() {
    /*this.groupsIds.forEach(element => {
        this.dataApi.getGroup(element).then(data => {
          this.groups.push(data);
        });
      });
    this.peopleIds.forEach(element => {
        this.dataApi.getPerson(element).then(data => {
          this.people.push(data);
        });
    });*/
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
  editMeeting()
  {
    this.editEnableMeeting=true;
  }
  getArrayFromSource(inLineArraySource:string):any
  {
    return inLineArraySource.split(";");
  }
}

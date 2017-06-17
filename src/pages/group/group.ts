import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingsApi } from '../../shares/shared';
import { HomePage } from '../home/home';
import { PeopleList } from '../people-list/people-list';
import { MeetingApi, GroupModel,PersonModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

group:GroupModel;
people:Array<PersonModel>= new Array<PersonModel>();
peopleToDisplay:Array<PersonModel>= new Array<PersonModel>();
editEnableGroup:boolean;
personListCallback:any;
isGroupOwner:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private dataApi:MeetingApi,private loaderController:LoadingController) {
    this.group=navParams.data.group;
    this.editEnableGroup=navParams.data.enableEdit;
    this.isGroupOwner=(this.group.Owner==this.dataApi.GetCurrentUser().Id);
    if(!this.group.Owner)
    {
      this.group.Owner=this.dataApi.GetCurrentUser().Id;
    }
  }

  ionViewDidLoad() {
    let loader=this.loaderController.create({
      content:"Getting People..."
    });
    loader.present().then(()=>{
         let that=this;
         if(this.group.People)
         {
           console.log(that.group.People);
          this.group.People.forEach(function(groupPerson)
          {
            let person= that.dataApi.myPeople.find(person => person.Id=groupPerson)
            if(person)
            {
              that.people.push(person);
            }
          
          });
         }
      loader.dismiss();
    });
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
  editGroup()
  {
    this.editEnableGroup=true;
  }
  updateGroup()
  {
    let peopleIds:Array<any>=new Array<any>();
    console.log(this.people);
    this.people.forEach(function(person){
      peopleIds.push(person.Id);
    });
    this.group.People=peopleIds;
    if(!this.group.Id)
    {
      this.dataApi.AddGroup(this.group);
    }else{
      this.dataApi.UpdateGroup(this.group);
    }  
  }
  addPeopleView(group:GroupModel)
  {
    let that=this;
    this.personListCallback = function(_params) {
     return new Promise((resolve, reject) => {
       that.people=_params;
             resolve();
         });
    }
    this.navCtrl.push(PeopleList,{currentPeople:group.People,callback: this.personListCallback});
  }

 
}

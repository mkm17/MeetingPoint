import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingApi, GroupModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-groups-list',
  templateUrl: 'groups-list.html',
})
export class GroupsList {

currentGroups:string[];
groups:Array<GroupModel>=new Array<GroupModel>(); 
groupsView:Array<GroupModelView>= new Array<GroupModelView>();
callback:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataApi:MeetingApi, private loaderController:LoadingController) {
    this.currentGroups=navParams.data.currentGroups;
    this.callback = this.navParams.data.callback;
  }

  ionViewDidLoad() {
     let loader=this.loaderController.create({
      content:"Getting People..."
    });
    loader.present().then(()=>{      
          this.groups=this.dataApi.myGroups;
          let that=this;
          for(let groupModel in this.groups)
          {
          //this.groups.forEach(function(personModel){
            let isChoosen=false;
            if(that.currentGroups && (that.currentGroups.indexOf(this.groups[groupModel].Id) > -1))
            {
              isChoosen=true;
            }
            let model = new GroupModelView();
            model.isChoosen=isChoosen;
            model.model=this.groups[groupModel];
            that.groupsView.push(model);
          }//);
      loader.dismiss();
    });
  }
submitChanges()
{
  console.log(this.groupsView);
  let choosenGroups:Array<GroupModel>=new Array<GroupModel>();
  this.groupsView.forEach(function(group)
  {
    if(group.isChoosen)
    {
      choosenGroups.push(group.model);
    }
  });
  this.callback(choosenGroups).then(()=>{
    this.navCtrl.pop();
 });
}
}
class GroupModelView{
  model:GroupModel;
  isChoosen:boolean;
}
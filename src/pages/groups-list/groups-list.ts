import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingApi, GroupModel, GroupModelView } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-groups-list',
  templateUrl: 'groups-list.html',
})
export class GroupsList {

  private currentGroups: string[];
  private groups: Array<GroupModel> = new Array<GroupModel>();
  private groupsView: Array<GroupModelView> = new Array<GroupModelView>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataApi: MeetingApi, private loaderController: LoadingController) {

    this.currentGroups = navParams.data.currentGroups;
  }

  public async ionViewDidLoad() {
    let loader = this.loaderController.create({
      content: "Getting People..."
    });
    loader.present()
    this.groups = await this.dataApi.myGroups;
    for (let groupModel in this.groups) {
      let isChoosen = false;
      if (this.currentGroups && (this.currentGroups.indexOf(this.groups[groupModel].Id) > -1)) {
        isChoosen = true;
      }
      let model = new GroupModelView();
      model.isChoosen = isChoosen;
      model.model = this.groups[groupModel];
      this.groupsView.push(model);
    }
    loader.dismiss();
  }

  public async submitChanges() {
    let choosenGroups: Array<GroupModel> = new Array<GroupModel>();
    this.groupsView.forEach(function (group) {
      if (group.isChoosen) {
        choosenGroups.push(group.model);
      }
    });
    await this.navParams.data.callback(choosenGroups);
    this.navCtrl.pop();
  }
}
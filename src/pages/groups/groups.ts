import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { GroupModel } from '../../model/GroupModel';
import { MeetingApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})

export class GroupsPage {
  private groups: Array<GroupModel> = new Array<GroupModel>();
  private enableEdit: boolean;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataApi: MeetingApi,
    private loaderController: LoadingController) {

  }

  public async ionViewDidLoad() {
    this.enableEdit = false;
    let loader = this.loaderController.create({
      content: "Getting Groups..."
    });

    loader.present();
    this.groups = await this.dataApi.myGroups;
    loader.dismiss();
  }

  public goToTheGroup(event, group) {
    this.enableEdit = false;
    this.navCtrl.push(GroupPage, { group: group, enableEdit: this.enableEdit });
  }

  public addNewGroup() {
    let group = new GroupModel();
    group.Id = "-1";
    this.enableEdit = true;
    this.navCtrl.push(GroupPage, { group: new GroupModel, enableEdit: this.enableEdit });
  }
}

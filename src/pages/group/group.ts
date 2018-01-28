import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PersonPage } from '../person/person';
import { PeopleList } from '../people-list/people-list';
import { MeetingApi, GroupModel, PersonModel, MeetingModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  private group: GroupModel;
  private people: Array<PersonModel> = new Array<PersonModel>();
  //private peopleToDisplay: Array<PersonModel> = new Array<PersonModel>();
  private editEnableGroup: boolean;
  private isGroupOwner: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataApi: MeetingApi, /*private loaderController: LoadingController*/) {

    this.group = navParams.data.group;
    this.editEnableGroup = navParams.data.enableEdit;
    this.isGroupOwner = (this.group.Owner === this.dataApi.GetCurrentUser().Id);
    if (!this.group.Owner) {
      this.group.Owner = this.dataApi.GetCurrentUser().Id;
    }
  }

  protected ionViewDidLoad() {
   /* let loader = this.loaderController.create({
      content: 'Getting Groups...'
    });*/
    //await loader.present();
    //let that = this;
    if (!this.group || !this.group.People) { return; }
    /*this.group.People.forEach((groupPerson) => {
      let person = that.dataApi.myPeople.find(person => person.Id === groupPerson)
      if (person) {
        that.people.push(person);
      }

    });*/
    //loader.dismiss();
  }

  public goHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  public editGroup() {
    this.editEnableGroup = true;
  }
  updateGroup() {
    let peopleIds: Array<string> = new Array<string>();
    this.people.forEach((person) => {
      peopleIds.push(person.Id);
    });

    this.group.People = peopleIds;
    if (!this.group.Id) {
      this.dataApi.AddGroup(this.group);
    } else {
      this.dataApi.UpdateGroup(this.group);
    }
  }

  addPeopleView(group: GroupModel) {
    //let that = this;
    this.navCtrl.push(PeopleList, { currentPeople: group.People, callback: this.personListCallback });
  }

  goToThePerson(event: MeetingModel, person: PersonModel) {
    this.navCtrl.push(PersonPage, person);
  }

  personListCallback(_params: object) {
    return _params;
  }

}

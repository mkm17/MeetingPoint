import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingApi, PersonModel, PersonModelView } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-people-list',
  templateUrl: 'people-list.html',
})
export class PeopleList {

  private currentPeople: string[];
  private people: Array<PersonModel> = new Array<PersonModel>();
  private peopleView: Array<PersonModelView> = new Array<PersonModelView>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataApi: MeetingApi, private loaderController: LoadingController) {
    this.currentPeople = navParams.data.currentPeople;
  }

  public async ionViewDidLoad() {
    let loader = this.loaderController.create({
      content: "Getting People..."
    });
    loader.present();
    this.people = await this.dataApi.myPeople;
    let that = this;
    for (let personModel in this.people) {
      let isChoosen = false;
      if (that.currentPeople && (that.currentPeople.indexOf(this.people[personModel].Id) > -1)) {
        isChoosen = true;
      }
      let model = new PersonModelView();
      model.isChoosen = isChoosen;
      model.model = this.people[personModel];
      that.peopleView.push(model);
    }
    loader.dismiss();
  }
  public submitChanges() {
    let choosenPeople: Array<PersonModel> = new Array<PersonModel>();
    this.peopleView.forEach(function (person) {
      if (person.isChoosen) {
        choosenPeople.push(person.model);
      }
    });
    this.navParams.data.callback.then(() => {
      this.navCtrl.pop();
    });
  }
}
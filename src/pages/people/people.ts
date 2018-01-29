import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PersonPage } from '../person/person';
import { MeetingApi, PersonModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  people: Array<PersonModel>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataApi: MeetingApi,
    private loaderController: LoadingController) {

  }

  public async ionViewDidLoad() {
    let loader = this.loaderController.create({
      content: "Getting People..."
    });
    loader.present();
    this.people = await this.dataApi.myPeople;
    loader.dismiss();
  }

  public goToThePerson(event, person) {
    this.navCtrl.push(PersonPage, person);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PersonPage } from '../person/person';
import { MeetingApi, PersonModel } from '../../shared/shared';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  private people: Array<PersonModel>;
  private fbApi: Facebook;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataApi: MeetingApi,
    private loaderController: LoadingController,
    private facebook: Facebook) {
    this.fbApi = facebook;

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

  public async addFbPeople() {
    let userFriends = await this.fbApi.api("/me/friends", ["user_friends"]);
  }
}

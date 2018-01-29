import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PersonModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {

  private person: PersonModel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = this.navParams.data;
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Person');
  }

  public goHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}

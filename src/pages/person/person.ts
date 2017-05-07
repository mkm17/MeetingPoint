import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
person: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person=this.navParams.data;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Person');
  }
  goHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
}

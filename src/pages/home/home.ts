import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pictureLink: any;
  gender: any;
  name: any;
  user: any;

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public navParams: NavParams) {
    this.user = this.navParams.data.user;
  }

  protected async ionViewDidLoad() {

    let userData = await this.nativeStorage.getItem('user');
    this.pictureLink = userData.picture;
    this.name = userData.name;
    this.gender = userData.gender;
  }

}

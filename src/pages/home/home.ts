import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

pictureLink:any;
gender:any;
name:any;
user:any;

  constructor(public navCtrl: NavController, public nativeStorage:NativeStorage, public navParams: NavParams) {

      this.name = "Michał";
      this.gender= "Male";
      this.pictureLink= "https://graph.facebook.com/1739113556102774/picture?type=large";
      this.user=this.navParams.data.user;
  }

  ionViewDidLoad(){
    /*let that=this;
      this.nativeStorage.getItem('user').then( function (data) {
        that.pictureLink=data.picture;
        that.name=data.name;
        that.gender=data.gender;
      }, function (error) {
        alert(error);
      });*/

       
  }

}

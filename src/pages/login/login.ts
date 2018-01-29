import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
//import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import { MeetingApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

public user:any;
//FB_APP_ID: number = 151354172070423;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  /*private nativeStorage: NativeStorage,*/ private dataApi:MeetingApi,){//, private facebook: Facebook) {
}

public doFbLogin(){
  /*let permissions = ["email"];
  this.facebook.login(permissions).then(
  (response)=> 
  {
    alert("logged in");
    let userId=response.authResponse.userID;
    this.facebook.api("/me?fields=name,gender", new Array())
    .then((user)=>{
      user.picture="https://graph.facebook.com/"+userId+"/picture?type=large";
      alert(JSON.stringify(user));
      this.nativeStorage.setItem('user',
        {
          userId=userId,
          name: user.name,
          gender: user.gender,
          picture: user.picture
        }).then(()=> this.navCtrl.setRoot(HomePage));
    });
  },
  (error)=>
  {
    alert(error);
  });*/

      this.dataApi.GetCurrentUser();
       // this.user=data;
        //this.dataApi.setCurrentUser(this.user);
        this.navCtrl.setRoot(HomePage,{user:this.user});
      //}); 

  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}

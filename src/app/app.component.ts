import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { MeetingsPage } from '../pages/meetings/meetings';
import { GroupsPage } from '../pages/groups/groups';
import { PeoplePage } from '../pages/people/people';
import { LoginPage } from '../pages/login/login';
import { SpontaneousPage } from '../pages/spontaneous/spontaneous';
import { MeetingApi, PersonModel } from '../shared/shared';
//import { AgmCoreModule } from 'angular2-google-maps/core';
import { NativeStorage } from '@ionic-native/native-storage';
//import { Facebook } from '@ionic-native/facebook';
import * as firebase from "firebase";

@Component({
  templateUrl: 'app.html',
  providers:[
    MeetingApi,
    HttpModule,
    NativeStorage
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any =LoginPage;
  pictureLink:any;
  active:boolean=false;
  user: PersonModel;
  activeButtonDisabled:boolean=true;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
   public splashScreen: SplashScreen, private nativeStorage: NativeStorage,
  /* private facebook:Facebook,*/ private dataApi: MeetingApi) {
    this.initializeApp();

    this.pictureLink= "https://graph.facebook.com/1739113556102774/picture?type=large";
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Meetings', component :MeetingsPage},
      { title: 'Groups', component: GroupsPage},
      { title: 'People', component: PeoplePage},
      { title: 'Spontaneous', component :SpontaneousPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  updateActive()
  {
      this.dataApi.UpdateActiveValue(this.active);
  }

  menuOpened(){
    this.active=this.dataApi.GetActivePropertyOfUser();
    this.activeButtonDisabled=false;
  }
  menuClosed(){
  }
}

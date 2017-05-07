import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MeetingsPage } from '../pages/meetings/meetings';
import { MeetingPage } from '../pages/meeting/meeting';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group';
import { SettingsPage } from '../pages/settings/settings';
import { PeoplePage } from '../pages/people/people';
import { PersonPage } from '../pages/person/person';
import { SpontaneousPage } from '../pages/spontaneous/spontaneous';
import { MeetingApi } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers:[
    MeetingApi,
    HttpModule 
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Meetings', component :MeetingsPage},
      { title: 'Groups', component: GroupsPage},
      { title: 'People', component: PeoplePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MeetingsPage } from '../pages/meetings/meetings';
import { MeetingPage } from '../pages/meeting/meeting';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group';
import { PeoplePage } from '../pages/people/people';
import { PersonPage } from '../pages/person/person';
import { PeopleList } from '../pages/people-list/people-list';
import { GroupsList } from '../pages/groups-list/groups-list';
import { LoginPage } from '../pages/login/login';
import { SpontaneousPage } from '../pages/spontaneous/spontaneous'
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { AgmCoreModule } from 'angular2-google-maps/core';
import { Facebook } from '@ionic-native/facebook';
//import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MeetingPage,
    MeetingsPage,
    GroupPage,
    GroupsPage,
    GroupsList,
    PeoplePage,
    PersonPage,
    PeopleList,
    SpontaneousPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MeetingPage,
    MeetingsPage,
    GroupPage,
    GroupsPage,
    GroupsList,
    PeoplePage,
    PersonPage,
    PeopleList,
    SpontaneousPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    Geolocation
  ]
})
export class AppModule {}

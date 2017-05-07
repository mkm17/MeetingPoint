import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MeetingsPage } from '../pages/meetings/meetings';
import { MeetingPage } from '../pages/meeting/meeting';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group';
import { SettingsPage } from '../pages/settings/settings';
import { PeoplePage } from '../pages/people/people';
import { PersonPage } from '../pages/person/person';
import { SpontaneousPage } from '../pages/spontaneous/spontaneous'
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MeetingPage,
    MeetingsPage,
    GroupPage,
    GroupsPage,
    SettingsPage,
    PeoplePage,
    PersonPage,
    SpontaneousPage
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
    ListPage,
    MeetingPage,
    MeetingsPage,
    GroupPage,
    GroupsPage,
    SettingsPage,
    PeoplePage,
    PersonPage,
    SpontaneousPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

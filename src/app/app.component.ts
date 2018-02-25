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
import { NativeStorage } from '@ionic-native/native-storage';
//import { Facebook } from '@ionic-native/facebook';
import * as firebase from "firebase";
import { PersonStatus } from '../model/PersonStatus';

@Component({
    templateUrl: 'app.html',
    providers: [
        MeetingApi,
        HttpModule,
        NativeStorage
    ]
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    private rootPage: any = LoginPage;
    private pictureLink: any;
    private active: boolean = false;
    private user: PersonModel;
    private activeButtonDisabled: boolean = true;
    private statuses: any[];
    private userStuatus: PersonStatus;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar,
        public splashScreen: SplashScreen, private nativeStorage: NativeStorage,
  /* private facebook:Facebook,*/ private dataApi: MeetingApi) {
        this.initializeApp();

        this.pictureLink = "https://graph.facebook.com/1739113556102774/picture?type=large";
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Meetings', component: MeetingsPage },
            { title: 'Groups', component: GroupsPage },
            { title: 'People', component: PeoplePage },
            { title: 'Spontaneous', component: SpontaneousPage }
        ];
    }

    async initializeApp() {
        await this.platform.ready();
        let currentUser: PersonModel = await this.dataApi.GetCurrentUser();
        this.statuses = Object.keys(PersonStatus);
        this.userStuatus = currentUser.Status;
        this.active = currentUser.Active
        this.activeButtonDisabled = false;
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    updateActive() {
        this.dataApi.UpdateActiveValue(this.active, this.userStuatus);
    }

    menuOpened() {
    }

    menuClosed() {
    }
}

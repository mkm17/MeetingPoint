import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PersonPage } from '../person/person';
import { MeetingApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

people:any;// Array<PersonModel>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataApi:MeetingApi,
              private loaderController:LoadingController) {
    
}

  ionViewDidLoad() {
    let loader=this.loaderController.create({
      content:"Getting People..."
    });
    loader.present().then(()=>{
          this.people=this.dataApi.myPeople;
      loader.dismiss();
    });
}

  goToThePerson(event, person)
  {
    this.navCtrl.push(PersonPage,person);
  }

}

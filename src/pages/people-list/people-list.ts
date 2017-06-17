import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MeetingApi, PersonModel } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-people-list',
  templateUrl: 'people-list.html',
})
export class PeopleList {

currentPeople:string[];
people:Array<PersonModel>=new Array<PersonModel>(); 
peopleView:Array<PersonModelView>= new Array<PersonModelView>();
callback:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private dataApi:MeetingApi, private loaderController:LoadingController) {
    this.currentPeople=navParams.data.currentPeople;
    this.callback = this.navParams.data.callback;
  }

  ionViewDidLoad() {
    let loader=this.loaderController.create({
      content:"Getting People..."
    });
    loader.present().then(()=>{
        this.dataApi.GetUsersPeople().then(data => {
          this.people=data;
              let that=this;
          this.people.forEach(function(personModel){
            let isChoosen=false;
            if(that.currentPeople && (that.currentPeople.indexOf(personModel.Id) > -1))
            {
              isChoosen=true;
            }
            let model = new PersonModelView();
            model.isChoosen=isChoosen;
            model.model=personModel;
            that.peopleView.push(model);
          });

        });
      loader.dismiss();
    });
  }
submitChanges()
{
  console.log(this.peopleView);
  let choosenPeople:Array<PersonModel>=new Array<PersonModel>();
  this.peopleView.forEach(function(person)
  {
    if(person.isChoosen)
    {
      choosenPeople.push(person.model);
    }
  });
  this.callback(choosenPeople).then(()=>{
    this.navCtrl.pop();
 });
}
}
class PersonModelView{
  model:PersonModel;
  isChoosen:boolean;
}
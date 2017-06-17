import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleList } from './people-list';

@NgModule({
  declarations: [
    PeopleList,
  ],
  imports: [
    IonicPageModule.forChild(PeopleList),
  ],
  exports: [
    PeopleList
  ]
})
export class PeopleListModule {}

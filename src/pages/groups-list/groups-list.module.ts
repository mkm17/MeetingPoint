import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupsList } from './groups-list';

@NgModule({
  declarations: [
    GroupsList,
  ],
  imports: [
    IonicPageModule.forChild(GroupsList),
  ],
  exports: [
    GroupsList
  ]
})
export class GroupsListModule {}

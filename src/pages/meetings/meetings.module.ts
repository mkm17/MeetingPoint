import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingsPage } from './meetings';

@NgModule({
  declarations: [
    MeetingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingsPage),
  ],
  exports: [
    MeetingsPage
  ]
})
export class MeetingsModule {}

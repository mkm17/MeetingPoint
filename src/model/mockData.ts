import {GroupModel} from './GroupModel';
import {MeetingModel} from './MeetingModel';
import {PersonModel} from './PersonModel';

export class MockData {

groups:Array<GroupModel>= new Array<GroupModel>();
meetings:Array<MeetingModel>= new Array<MeetingModel>();
people:Array<PersonModel>= new Array<PersonModel>();
    constructor()
    {
        for(let i =0; i < 5;i++)
        {
            this.groups.push(new GroupModel());
            this.groups[i].Id=i;
            this.groups[i].Name="Group "+i;

            this.meetings.push(new MeetingModel());
            this.meetings[i].Id=i;
            this.meetings[i].Name="Meetings "+i;
            this.meetings[i].GroupId=i;
            this.meetings[i].Date=new Date("05/06/2017");

            this.people.push(new PersonModel());
            this.people[i].Id=i;
            this.people[i].Name="Person "+i;
            this.people[i].Nickname="Nickname "+i;
            
        }
    }
}
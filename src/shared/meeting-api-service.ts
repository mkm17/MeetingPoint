import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import {GroupModel,MapPoint,MeetingModel,PersonModel} from './shared';

@Injectable()
export class MeetingApi {
   public myGroups:Array<GroupModel>;
   public myPeople:Array<GroupModel>;
   public myMeetings:Array<GroupModel>;
   public currentUser:PersonModel;
   private groupRefDB:firebase.database.Reference;
   private meetingRefDB:firebase.database.Reference;
   private peopleRefDB:firebase.database.Reference;
   private groupRefName:string = "groups/";
   private peopleRefName:string = "people/";
   private meetingRefName:string = "meetings/";

    constructor()
    {
        this.groupRefDB=firebase.database().ref(this.groupRefName);
        this.meetingRefDB=firebase.database().ref(this.meetingRefName);
        this.peopleRefDB=firebase.database().ref(this.peopleRefName);
    }

    GetCurrentUser():PersonModel
    {
        if(!this.currentUser)
        {
            let that= this; 
            this.GetUserDB("0").then(function(userData)
            {    
                that.currentUser=userData;
                return that.currentUser;
            });
        }
        else{
            return this.currentUser;
        }
    }
    GetUserDB(fbId: string):Promise<PersonModel>{
        return new Promise<PersonModel>((resolve, reject) => {
        this.peopleRefDB.child(fbId+"/").on("value",function(data)
        {
            let person:PersonModel = new PersonModel();
            person.Active=data.val().Active;
            person.FbId=data.val().FBid;
            person.Id=data.val().Id;
            person.Name=data.val().Name;
            person.Groups=data.val().Groups;
            person.Meetings=data.val().Meetings;
            person.People=data.val().People;
            person.LastUpdate=data.val().LastUpdate;
            let point :MapPoint =new MapPoint();
            point.lat=data.val().lat;
            point.lng=data.val().lng;
            person.MapPoint=point;

            resolve(person);
        });

    });   
}
    UpdateActiveValue(isActive:boolean)
    {
        this.peopleRefDB.child(this.currentUser.Id+"/").update({
            "Active":isActive
        })
    }
}   
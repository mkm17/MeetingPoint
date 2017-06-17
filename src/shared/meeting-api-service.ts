import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import {GroupModel,MapPoint,MeetingModel,PersonModel,Guid} from './shared';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class MeetingApi {
   private myGroups:Array<GroupModel>;
   private myPeople:Array<GroupModel>;
   private myMeetings:Array<GroupModel>;
   private currentUser:PersonModel;
   private groupRefDB:firebase.database.Reference;
   private meetingRefDB:firebase.database.Reference;
   private peopleRefDB:firebase.database.Reference;
   private groupRefName:string = "groups/";
   private peopleRefName:string = "people/";
   private meetingRefName:string = "meetings/";

    constructor(private geolocation: Geolocation)
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
        let lngValue=this.currentUser.MapPoint.lng;
        let latValue=this.currentUser.MapPoint.lat;
        if(isActive)
        {
            this.geolocation.getCurrentPosition().then((resp) => {
                lngValue=String(resp.coords.longitude);
                latValue=String(resp.coords.latitude);

                this.peopleRefDB.child(this.currentUser.Id+"/").update({
                    "Active":isActive,
                    "lat":latValue,
                    "lng":lngValue,
                    "LastUpdate":new Date().toLocaleString()
               });    

            }).catch((error) => {
            console.log('Error getting location', error);
            });
        }
        this.peopleRefDB.child(this.currentUser.Id+"/").update({
            "Active":isActive,
        })
    }
    GetUsersMeetings():Promise<Array<MeetingModel>>
    {
        if(this.currentUser)
        {
            let that=this;
            let meetings:Array<MeetingModel>= new Array<MeetingModel>();
            return new Promise<Array<MeetingModel>>((resolve, reject) => {
                this.currentUser.Meetings.forEach(function(value,meetingId)
                {
                    that.meetingRefDB.child(meetingId+"/").on("value",function(data)
                    {
                        let meeting = new MeetingModel();
                        meeting.Name=data.val().Name;
                        meeting.Id=data.val().Id;
                        meeting.Date=new Date(Date.parse(data.val().Date)).toLocaleString();
                        meeting.Groups=data.val().Groups;
                        let point = new MapPoint();
                        point.lat=data.val().lat;
                        point.lng=data.val().lng;
                        meeting.MapPoint=point;
                        meetings.push(meeting);
                    });
                });
                resolve(meetings);                               
            });
        }
        return null;
    }
    GetUsersGroups():Promise<Array<GroupModel>>
    {
        if(this.currentUser && this.currentUser.Groups)
        {
            let that=this;
            let groups:Array<GroupModel>= new Array<GroupModel>();
            return new Promise<Array<GroupModel>>((resolve, reject) => {
                for (var key in this.currentUser.Groups) {
                    if (this.currentUser.Groups.hasOwnProperty(key)) {
                    that.groupRefDB.child(key+"/").on("value",function(data)
                    {
                        let group = new GroupModel();
                        console.log(data.val());
                        group.Name=data.val().Name;
                        group.Id=data.val().Id;
                        group.People=data.val().People;
                        groups.push(group);
                    });
                }}     
                resolve(groups);                       
            });
        }
        return null;
    }
    GetGroupsOfMeeting(groupIds:any):Promise<Array<GroupModel>>
    {
           let that=this;
           let groups:Array<GroupModel>= new Array<GroupModel>();
           return new Promise<Array<GroupModel>>((resolve, reject) => {
               groupIds.forEach(function(value,groupId)
               {
                   that.groupRefDB.child(groupId+"/").on("value",function(data)
                   {
                       console.log(data.val());
                       let group = new GroupModel();
                       group.Name=data.val().Name;
                       group.Id=data.val().Id;
                       group.People=data.val().People;
                       groups.push(group);
                   });
               });
               resolve(groups);                               
        });
    }

    GetUsersPeople():Promise<Array<PersonModel>>
    {
        if(this.currentUser)
        {
            let that=this;
            let people:Array<PersonModel>= new Array<PersonModel>();
            return new Promise<Array<PersonModel>>((resolve, reject) => {
                this.currentUser.People.forEach(function(value,personId)
                {
                    that.peopleRefDB.child(personId+"/").on("value",function(data)
                    {
                        let person = new PersonModel();
                        person.Active=data.val().Active;
                        //person.BirthDate=data.val().BirthDate;
                        person.FbId=data.val().FBId;
                        //person.Status=data.val().Status;
                        //person.Photo=data.val().Photo;
                        //person.Surname=data.val().Surname;
                        person.LastUpdate=data.val().LastUpdate;
                        person.Name=data.val().Name;
                        person.Id=data.val().Id;
                        //person.People=data.val().People;
                        let point = new MapPoint();
                        point.lat=data.val().lat;
                        point.lng=data.val().lng;
                        person.MapPoint=point;
                        people.push(person);
                    });
                });
                resolve(people);                               
            });
        }
        return null;
    }
    UpdateMeeting(meeting : MeetingModel)
    {
        console.log(meeting);
        this.meetingRefDB.child(meeting.Id+"/").update({
            
            "Date":meeting.Date,
            "Groups":meeting.Groups,
            "Name":meeting.Name,
            "lat":meeting.MapPoint.lat,
            "lng":meeting.MapPoint.lng
        });
        console.log(meeting);
    }
    UpdateGroup(group : GroupModel)
    {
        console.log("update");
        this.groupRefDB.child(group.Id+"/").update({
            
            "People":group.People,
            "Name":group.Name,
        });
    }
    AddGroup(group : GroupModel)
    {

        let key = this.groupRefDB.push({
            "People":group.People,
            "Name":group.Name,
        }).key;
        let that = this;
        group.People.forEach(function(personId)
        {
            that.peopleRefDB.child(personId+"/").child("Groups/").child(key).set(true);
        });
    }
}   

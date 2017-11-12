import { Injectable } from '@angular/core';
import 'rxjs';
import { GroupModel,MapPoint,MeetingModel,PersonModel } from './shared';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class MeetingApi {
   public myGroups:Array<GroupModel>;
   public myPeople:Array<PersonModel>;
   public myMeetings:Array<MeetingModel>;
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
        this.myGroups = new Array<GroupModel>();
        this.myPeople= new Array<PersonModel>();
        this.myMeetings= new Array<MeetingModel>();
    }

    GetActivePropertyOfUser():boolean
    {
        if(this.currentUser)
        {
            return this.currentUser.Active;
        }
        else{
            return false;
        }
    }

    GetCurrentUser():PersonModel
    {
        if(!this.currentUser)
        {
            let that= this; 
            this.GetUserDB("0").then(function(userData)
            {    
                
                return that.currentUser;
            });
        }
        else{
            return this.currentUser;
        }
    }
    GetUserDB(fbId: string):Promise<PersonModel>{
        let that=this;
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
            that.currentUser=person;
            that.GetUsersGroups();
            that.GetUsersMeetings();
            that.GetUsersPeople();
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
            return new Promise<Array<MeetingModel>>((resolve, reject) => {
                for (var key in this.currentUser.Meetings) {
                if (this.currentUser.Meetings.hasOwnProperty(key)) //{
                //this.currentUser.Meetings.forEach(function(value,meetingId)
                {
                    that.meetingRefDB.child(key+"/").on("value",function(data)
                    {
                        let newItem=false;
                        let meeting = that.myMeetings.find(meeting => meeting.Id==data.key);
                        if(!meeting)
                        {
                            meeting = new MeetingModel();
                            newItem=true;
                        }
                        meeting.Name=data.val().Name;
                        meeting.Id=data.key;
                        meeting.Date=new Date(Date.parse(data.val().Date)).toLocaleString();
                        meeting.Groups=data.val().Groups;
                        let point = new MapPoint();
                        point.lat=data.val().lat;
                        point.lng=data.val().lng;
                        meeting.MapPoint=point;
                        if(newItem)
                        {
                            that.myMeetings.push(meeting);
                        }
                    });
                }}//);
                resolve(that.myMeetings);                               
            });
        }
        return null;
    }
    GetUsersGroups():Promise<Array<GroupModel>>
    {
        if(this.currentUser && this.currentUser.Groups)
        {
            let that=this;
            return new Promise<Array<GroupModel>>((resolve, reject) => {
                for (var key in this.currentUser.Groups) {
                    if (this.currentUser.Groups.hasOwnProperty(key)) {
                    that.groupRefDB.child(key+"/").on("value",function(data)
                    {
                        let newItem=false;
                        let group = that.myGroups.find(group => group.Id==data.key);
                        if(!group)
                        {
                            group = new GroupModel();
                            newItem=true;
                        }
                        console.log(data.val());
                        group.Name=data.val().Name;
                        group.Id=data.key;
                        group.People=data.val().People;
                        group.Owner=data.val().Owner;
                        if(newItem)
                        {
                            that.myGroups.push(group);
                        }
                    });
                }}
                   
                resolve(that.myGroups);                       
            });
        }
        return null;
    }

    GetUsersPeople():Promise<Array<PersonModel>>
    {
        if(this.currentUser)
        {
            let that=this;
            return new Promise<Array<PersonModel>>((resolve, reject) => {
                for (var key in this.currentUser.People) {
                if (this.currentUser.People.hasOwnProperty(key)) //{
                //this.currentUser.People.forEach(function(value,personId)
                {
                    that.peopleRefDB.child(key+"/").on("value",function(data)
                    {
                        let newItem=false;
                        let person = that.myPeople.find(person => person.Id==data.key);
                        if(!person)
                        {
                            person =  new PersonModel();
                            newItem=true;
                        }
                        
                        person.Active=data.val().Active;
                        //person.BirthDate=data.val().BirthDate;
                        person.FbId=data.val().FBId;
                        //person.Status=data.val().Status;
                        //person.Photo=data.val().Photo;
                        //person.Surname=data.val().Surname;
                        person.LastUpdate=data.val().LastUpdate;
                        person.Name=data.val().Name;
                        person.Id=data.key;
                        //person.People=data.val().People;
                        let point = new MapPoint();
                        point.lat=data.val().lat;
                        point.lng=data.val().lng;
                        person.MapPoint=point;
                        if(newItem)
                        {
                            that.myPeople.push(person);
                        }
                    });
                }}//);
                resolve(that.myPeople);                               
            });
        }
        return null;
    }
    AddMeeting(meeting : MeetingModel,groups: Array<GroupModel>){
        let key = this.meetingRefDB.push({
            "Date":meeting.Date,
            "Groups":meeting.Groups,
            "Name":meeting.Name,
            "lat":meeting.MapPoint.lat,
            "lng":meeting.MapPoint.lng,
            "Owner":this.currentUser.Id
        }).key;
        let that = this;
        groups.forEach(function(group)
        {
            group.People.forEach(function(personId)
            {
              that.peopleRefDB.child(personId+"/").child("Meetings/").child(key).set(true);
            });
        });
    }
    UpdateMeeting(meeting : MeetingModel, groups: Array<GroupModel>)
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
            "Owner":this.currentUser.Id
        }).key;
        let that = this;
        group.People.forEach(function(personId)
        {
            that.peopleRefDB.child(personId+"/").child("Groups/").child(key).set(true);
        });
    }

    
}   

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
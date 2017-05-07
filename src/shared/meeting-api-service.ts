import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MeetingApi {

    private baseUrl='https://meetingpoint-83dfa.firebaseio.com/';
    currentGroup:any={};
    currentMeeting:any={};
    currentperson:any={};
    constructor(private http:Http){ }

    getGroups(){
        return new Promise(resolve => {
            this.http.get(this.baseUrl+'/groups.json')
            .subscribe(res=> resolve(res.json()));
        });
    }
    getGroupData(groupId):Observable<any>
    {
        return this.http.get(this.baseUrl+"/groups/"+groupId+".json")
        .map((response:Response)=> {
            console.log(response);
            this.currentGroup=response.json();
            return this.currentGroup;
        });
    }
    getMeetings(){
        return new Promise(resolve => {
            this.http.get(this.baseUrl+'/meetings.json')
            .subscribe(res=> resolve(res.json()));
        });
    }
    getMeetingData(groupId):Observable<any>
    {
        return this.http.get(this.baseUrl+"/meetings/"+groupId+".json")
        .map((response:Response)=> {
            console.log(response);
            this.currentMeeting=response.json();
            return this.currentMeeting;
        });
    }
    getPeople(){
        return new Promise(resolve => {
            this.http.get(this.baseUrl+'/people.json')
            .subscribe(res=> resolve(res.json()));
        });
    }
}
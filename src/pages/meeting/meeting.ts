import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MeetingApi, MeetingModel, GroupModel, Marker } from '../../shared/shared';
import { GroupPage } from '../group/group';
import { GroupsList } from '../groups-list/groups-list';
import * as moment from 'moment';

declare let google;
@IonicPage()
@Component({
    selector: 'page-meeting',
    templateUrl: 'meeting.html',
})
export class MeetingPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    private meeting: MeetingModel;
    private meetingDate: string;
    private editEnableMeeting: boolean;
    private marker: Marker = new Marker();
    private groups: Array<GroupModel> = new Array<GroupModel>();

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataApi: MeetingApi) {
        this.meeting = this.navParams.data.meeting;
        this.meetingDate = new Date(this.meeting.Date).toISOString();
        this.editEnableMeeting = this.navParams.data.enableEdit;
    }

    public async ionViewDidLoad() {
        if (this.meeting.Id) {
            this.marker.lat = Number(this.meeting.MapPoint.lat);
            this.marker.lng = Number(this.meeting.MapPoint.lng);
            this.marker.draggable = true;
        }
        else {
            let userLocation = await this.dataApi.getUserCurrentPosition();
            this.marker.lat = Number(userLocation.lat);
            this.marker.lng = Number(userLocation.lng);
            this.marker.draggable = true;
        }

        this.loadMap();
        if (this.meeting.Groups) {
            this.meeting.Groups.forEach(function (meetingGroup) {
                let group = this.dataApi.myGroups.find(group => group.Id === meetingGroup)
                if (!group) { return; }
                this.groups.push(group);
            });
        }
    }

    public goHomePage() {
        this.navCtrl.setRoot(HomePage);
    }

    public editMeeting() {
        this.editEnableMeeting = !this.editEnableMeeting;
    }

    public goToTheGroup(event, group) {
        this.navCtrl.push(GroupPage, { group: group, enableEdit: false });
    }
    public updateMeeting() {
        let groupIds: Array<any> = new Array<any>();
        this.groups.forEach(function (group) {
            groupIds.push(group.Id);
        });
        this.meeting.Groups = groupIds;
        this.meeting.MapPoint.lat = String(this.marker.lat);
        this.meeting.MapPoint.lng = String(this.marker.lng);
        this.meeting.Date = this.meetingDate;
        if (!this.meeting.Id) {
            this.dataApi.AddMeeting(this.meeting, this.groups);
        } else {
            this.dataApi.UpdateMeeting(this.meeting, this.groups);
        }
        this.editEnableMeeting = false;
    }

    public markerDragEnd(m: Marker, $event: any) {
        this.marker.lat = $event.coords.lat;
        this.marker.lng = $event.coords.lng
    }

    public mapClicked($event: any) {
        if (this.editEnableMeeting) {
            this.marker.lat = $event.coords.lat;
            this.marker.lng = $event.coords.lng
        }
    }
    public addGroupsView(meeting: MeetingModel) {
        this.navCtrl.push(GroupsList, { currentGroups: meeting.Groups, callback: this.groupsListCallback });
    }

    public groupsListCallback(params: any) {
        return params;
    }

    private loadMap() {
        let latLng = new google.maps.LatLng(this.marker.lat, this.marker.lng);
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }
}
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
    private meetingPosition: any;
    private meetingMarker: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataApi: MeetingApi) {
        this.meeting = this.navParams.data.meeting;
        this.meetingDate = (this.meeting.Date) ? new Date(this.meeting.Date).toISOString() : null;
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
        this.meetingPosition = new google.maps.LatLng(this.marker.lat, this.marker.lng);
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
        this.meeting.MapPoint.lat = String(this.meetingMarker.getPosition().lat());
        this.meeting.MapPoint.lng = String(this.meetingMarker.getPosition().lng());
        this.meeting.Date = this.meetingDate;
        if (!this.meeting.Id) {
            this.dataApi.AddMeeting(this.meeting, this.groups);
        } else {
            this.dataApi.UpdateMeeting(this.meeting, this.groups);
        }
        this.editEnableMeeting = false;
    }

    public addGroupsView(meeting: MeetingModel) {
        this.navCtrl.push(GroupsList, { currentGroups: meeting.Groups, callback: this.groupsListCallback });
    }

    public groupsListCallback(params: any) {
        return params;
    }

    private loadMap() {
        let mapOptions = {
            center: this.meetingPosition,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.meetingMarker = new google.maps.Marker({
            position: this.meetingPosition,
            map: this.map,
            animation: google.maps.Animation.DROP
        });
        this.map.addListener('click', (ev) => { this.onMapClick(ev, this.map) });
    }
    private onMapClick(mouseEvent: any, map: any) {
        if (!this.editEnableMeeting) { return; }
        if (this.meetingMarker) { this.meetingMarker.setMap(null); }
        this.meetingMarker = new google.maps.Marker({
            position: mouseEvent.latLng,
            map: map,
            animation: google.maps.Animation.DROP
        });
        map.panTo(mouseEvent.latLng);
    }
}
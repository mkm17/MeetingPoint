import { MapPoint } from './MapPoint';
import { GroupModel, MeetingModel } from '../shared/shared';

export class PersonModel {
    Id: string;
    Name: string;
    Surname: string;
    Nickname: string;
    BirthDate: Date;
    FbId: string;
    Photo: string;
    MapPoint: MapPoint;
    Active: boolean;
    Status: PersonStatus;
    Groups: Array<GroupModel>;
    People: Array<PersonModel>;
    Meetings: Array<MeetingModel>;
    LastUpdate: Date;
}
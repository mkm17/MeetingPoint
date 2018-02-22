import { GroupModel, MeetingModel, MapPoint } from '../shared/shared';
import { PersonStatus } from './PersonStatus';

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
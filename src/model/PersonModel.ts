import { MapPoint } from './MapPoint';

export class PersonModel{
    Id: string;
    Name: string;
    Surname: string;
    Nickname: string;
    BirthDate: Date;
    FbId:string;
    Photo:string;
    MapPoint: MapPoint;
    Active: boolean;
    Status:PersonStatus;
    Groups:Array<string>;
    People:Array<string>;
    Meetings:Array<string>;
    LastUpdate:Date;
}
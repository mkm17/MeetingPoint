import { MapPoint } from './MapPoint';

export class PersonModel{
    Id: number;
    Name: string;
    Surname: string;
    Nickname: string;
    BirthDate: Date;
    FbId:number;
    Photo:string;
    MapPoint: MapPoint;
    Active: boolean;
    Status:PersonStatus;
    Groups:Array<string>;
    People:Array<string>;
    Meetings:Array<string>;
    LastUpdate:Date;
}
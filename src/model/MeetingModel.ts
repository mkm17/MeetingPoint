import { MapPoint } from './MapPoint';

export class MeetingModel{
    Id: string;
    Name: string;
    Date: string;
    Groups: Array<any>;
    MapPoint:MapPoint;
    Owner:string;
}
import { MapPoint } from './MapPoint';

export class MeetingModel{
    Id: number;
    Name: string;
    Date: string;
    Groups: Array<any>;
    MapPoint:MapPoint;
}
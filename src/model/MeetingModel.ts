import { MapPoint } from '../shared/shared';

export class MeetingModel {
    Id: string;
    Name: string;
    Date: string;
    Groups: Array<string>;
    MapPoint: MapPoint;
    Owner: string;
    daysDiff?: number;
}
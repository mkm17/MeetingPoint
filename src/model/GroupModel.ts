import {PersonModel} from './PersonModel'

export class GroupModel{
    Id: number;
    Name: string;
    People: Array<PersonModel>;
}
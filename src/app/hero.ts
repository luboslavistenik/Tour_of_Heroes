import { Item } from './item';

export interface Hero {
    id: number;
    name: string;
    itemList: Item[];
    money: number;
  }


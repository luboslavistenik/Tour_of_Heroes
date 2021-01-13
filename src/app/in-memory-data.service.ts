import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice',itemList:[{id: 11, name: 'Warmog', price: 2850}], money: 100, life: 150, strength: 20,},
      { id: 12, name: 'Narco', itemList:[{id: 12, name: 'Triforce',price: 3300}], money: 4000, life: 120, strength: 35,},
      { id: 13, name: 'Bombasto', itemList:[{id: 13, name: 'Rabaddon', price: 3600}], money: 2700, life: 80, strength: 40,},
      { id: 14, name: 'Celeritas', itemList:[{id: 14, name: 'Hurricane', price: 2600}], money: 6500, life: 100, strength: 30,},
      { id: 15, name: 'Magneta', itemList:[{id: 15, name: 'Void Staff', price: 2650}], money: 1200, life: 90, strength: 35,},
      { id: 16, name: 'RubberMan', itemList:[{id: 16, name: 'IE', price: 3400, },{id: 17, name: 'Rageblade', price: 3100}], money: 7000, life: 100, strength: 70,},
      { id: 17, name: 'Dynama', itemList:[{id: 17, name: 'Rageblade', price: 3100}], money: 4250, life: 100, strength: 35,},
      { id: 18, name: 'Dr IQ', itemList:[{id: 18, name: 'PD', price: 2600}], money: 1790, life: 115, strength: 30,},
      { id: 19, name: 'Magma', itemList:[{id: 19, name: 'LDR', price: 2800}], money: 3100, life: 105, strength: 35,},
      { id: 20, name: 'Tornado', itemList:[{id: 20, name: 'BT', price: 3500}], money: 4120, life: 120, strength: 35,}
    ];

    const items: Item[] = [
      { id: 11, name: 'Warmog', price: 2850},
      { id: 12, name: 'Triforce',price: 3300},
      { id: 13, name: 'Rabaddon', price: 3600},
      { id: 14, name: 'Hurricane', price: 2600},
      { id: 15, name: 'Void Staff', price: 2650},
      { id: 16, name: 'IE', price: 3400},
      { id: 17, name: 'Rageblade', price: 3100},
      { id: 18, name: 'PD', price: 2600},
      { id: 19, name: 'LDR', price: 2800},
      { id: 20, name: 'BT', price: 3500},
      { id: 21, name: 'Liandrys', price: 3500},
      { id: 22, name: 'BOTRK', price: 3500},
      { id: 23, name: 'DoransBlade', price: 450},
      { id: 24, name: 'DoransShield', price: 450},
      { id: 25, name: 'Potion', price: 50},
    ];

    return {heroes, items};
  }

  

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
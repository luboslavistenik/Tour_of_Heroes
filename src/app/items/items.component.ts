import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item';
import { ITEMS } from '../mock-items';
import { ItemService } from '../item.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() hero: Hero;

  items: Item[];
  constructor(private itemService: ItemService) { }
  
  getItems(): void {
    this.itemService.getItems()
    .subscribe(items => this.items = items);
  }

  ngOnInit(): void {
    this.getItems();
  }

  @Input() show: boolean;

  selectedItem: Item;

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  buy(item:Item): void {
    if(this.hero.money >= item.price){
      this.hero.itemList.push(item);
      this.hero.money -= item.price;

    }
  }
}

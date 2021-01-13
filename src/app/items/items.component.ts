import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item';
import { ITEMS } from '../mock-items';
import { ItemService } from '../item.service';
import { Hero } from '../hero';
import { MatSelectChange } from '@angular/material/select';

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

  sortByInternal = {
    Id: { property: 'id', reversed: false },
    Name: { property: 'name', reversed: false },
    Price: { property: 'price', reversed: true }
  };

  sortByProperties: string[] = Object.keys(this.sortByInternal);

  onSortChanged(event: MatSelectChange): void {
    const sortInfo = this.sortByInternal[event.value];
    const property = sortInfo.property;

    this.items.sort((a,b) => {
      const compared: number = a[property] > b[property] ? 1 : -1;
      return sortInfo.reversed ? -compared : compared;
    });
  }

}

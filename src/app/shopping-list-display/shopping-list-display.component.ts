import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list-item';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-display',
  templateUrl: './shopping-list-display.component.html',
  styleUrls: ['./shopping-list-display.component.css'],
})
export class ShoppingListDisplayComponent {
  toBuyList: ListItem[] = [];
  previouslyBoughtList: ListItem[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.getToBuyItems();
    this.getPreviouslyBoughtItems();
  }

  getToBuyItems(): void {
    this.shoppingListService.getAllToBuyItems().subscribe((listItems) => {
      this.toBuyList = listItems;
      console.log(this.toBuyList);
    });
  }

  getPreviouslyBoughtItems(): void {
    this.shoppingListService
      .getAllPreviouslyBoughtItems()
      .subscribe((listItems) => (this.previouslyBoughtList = listItems));
  }
}

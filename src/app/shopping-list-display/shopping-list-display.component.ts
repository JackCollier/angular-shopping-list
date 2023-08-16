import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list-item';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-display',
  templateUrl: './shopping-list-display.component.html',
  styleUrls: ['./shopping-list-display.component.css'],
})
export class ShoppingListDisplayComponent implements OnInit {
  toBuyList: ListItem[] = [];
  previouslyBoughtList: ListItem[] = [];
  private newItemSubscription!: Subscription;
  private deleteToBuyItemSubscription!: Subscription;
  private deletePreviouslyBoughtItemSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.getToBuyItems();
    this.getPreviouslyBoughtItems();

    this.newItemSubscription = this.shoppingListService
      .getNewItemObservable()
      .subscribe(() => this.getToBuyItems());
    this.deleteToBuyItemSubscription = this.shoppingListService
      .getDeleteToBuyItemObservable()
      .subscribe(() => this.getToBuyItems());
    this.deletePreviouslyBoughtItemSubscription = this.shoppingListService
      .getDeletePreviouslyBoughtItemObservable()
      .subscribe(() => this.getPreviouslyBoughtItems());
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

  deleteToBuyItem(id: number): void {
    this.shoppingListService.deleteToBuyItem(id).subscribe(() => {});
  }

  deletePreviouslyBoughtItem(id: number): void {
    this.shoppingListService.deletePreviouslyBoughtItem(id).subscribe(() => {});
  }
}

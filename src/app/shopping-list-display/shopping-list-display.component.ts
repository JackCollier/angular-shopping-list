import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list-item';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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

  drop(event: CdkDragDrop<ListItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      if (event.container.id === 'cdk-drop-list-0') {
        this.shoppingListService
          .moveItemToBuyList(movedItem)
          .subscribe(() => {});
      } else if (event.container.id === 'cdk-drop-list-1') {
        this.shoppingListService
          .moveItemToBoughtList(movedItem)
          .subscribe(() => {});
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  makeItemImportant(item: ListItem): void {
    this.shoppingListService.toggleItemImportance(item).subscribe(() => {
      const currentIndex = this.toBuyList.indexOf(item);
      this.toBuyList[currentIndex].important =
        !this.toBuyList[currentIndex].important;
      moveItemInArray(this.toBuyList, currentIndex, 0);
    });
  }
}

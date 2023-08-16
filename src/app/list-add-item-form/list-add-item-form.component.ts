import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-list-add-item-form',
  templateUrl: './list-add-item-form.component.html',
  styleUrls: ['./list-add-item-form.component.css'],
})
export class ListAddItemFormComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  listItemForm = new FormGroup({
    itemName: new FormControl(''),
  });

  submitListItem() {
    const newItem = {
      id: 0,
      itemName: this.listItemForm.value.itemName ?? '',
      important: false,
    };

    this.shoppingListService.postToBuyItem(newItem).subscribe((res) => {
      console.log('new item added', res);
    });

    this.listItemForm.reset();
  }
}

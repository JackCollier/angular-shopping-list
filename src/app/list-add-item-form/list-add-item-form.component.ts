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

  listItemForm = new FormControl({
    itemName: new FormControl(''),
  });
}

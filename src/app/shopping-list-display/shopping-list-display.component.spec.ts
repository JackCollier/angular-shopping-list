import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListDisplayComponent } from './shopping-list-display.component';

describe('ShoppingListDisplayComponent', () => {
  let component: ShoppingListDisplayComponent;
  let fixture: ComponentFixture<ShoppingListDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListDisplayComponent]
    });
    fixture = TestBed.createComponent(ShoppingListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

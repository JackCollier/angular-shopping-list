import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddItemFormComponent } from './list-add-item-form.component';

describe('ListAddItemFormComponent', () => {
  let component: ListAddItemFormComponent;
  let fixture: ComponentFixture<ListAddItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAddItemFormComponent]
    });
    fixture = TestBed.createComponent(ListAddItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

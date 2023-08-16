import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingListDisplayComponent } from './shopping-list-display/shopping-list-display.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, ShoppingListDisplayComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

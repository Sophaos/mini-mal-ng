import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './shared/ui/toolbar/toolbar.component';
import { DropdownModule } from 'primeng/dropdown';
import { SearchBarComponent } from './shared/ui/search-bar/search-bar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    ToolbarComponent,
    SearchBarComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

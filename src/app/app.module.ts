import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { SearchBarComponent } from './shared/ui/search-bar/search-bar.component';
import { HeaderComponent } from './layout/ui/header/header.component';
import { FooterComponent } from './layout/ui/footer/footer.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

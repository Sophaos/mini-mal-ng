import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { animesReducer } from './state/animes.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AnimesEffects } from './state/animes.effects';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HomeComponent } from './components/home/home.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimeSeasonListComponent } from './components/anime-season-list/anime-season-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimeDetailsComponent,
    AnimeSeasonListComponent,
    AnimesListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DataViewModule,
    ButtonModule,
    CarouselModule,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    StoreModule.forRoot({ animes: animesReducer }),
    EffectsModule.forRoot([AnimesEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx demo app',
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

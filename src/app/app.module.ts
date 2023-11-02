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
import { AnimesHomeComponent } from './components/animes-home/animes-home.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimeSeasonListComponent } from './components/anime-season-list/anime-season-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { AnimeService } from './services/jikan-api/anime.service';
import { RecommandationsService } from './services/jikan-api/recommandations.service';
import { ReviewsService } from './services/jikan-api/reviews.service';
import { SeasonsService } from './services/jikan-api/seasons.service';
import { TopService } from './services/jikan-api/top.service';
import { WatchService } from './services/jikan-api/watch.service';
import { MangasHomeComponent } from './components/mangas-home/mangas-home.component';
@NgModule({
  declarations: [
    AppComponent,
    AnimesHomeComponent,
    AnimeDetailsComponent,
    AnimeSeasonListComponent,
    AnimesListComponent,
    MangasHomeComponent,
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
  providers: [
    AnimeService,
    RecommandationsService,
    ReviewsService,
    SeasonsService,
    TopService,
    WatchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

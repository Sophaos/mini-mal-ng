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
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AnimeService } from './anime/data-access/anime.service';
import { RecommandationsService } from './home/data-access/recommandations.service';
import { ReviewsService } from './review/data-access/reviews.service';
import { SeasonsService } from './season/data-access/seasons.service';
import { TopService } from './shared/data-access/top.service';
import { WatchService } from './shared/data-access/watch.service';
import { AnimeDetailsComponent } from './anime/feature/anime-details/anime-details.component';
import { AnimesListComponent } from './anime/feature/animes-list/animes-list.component';
import { AnimesHomeComponent } from './home/feature/animes-home/animes-home.component';
import { MangasHomeComponent } from './home/feature/mangas-home/mangas-home.component';
import { AnimeSeasonListComponent } from './season/feature/anime-season-list/anime-season-list.component';
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

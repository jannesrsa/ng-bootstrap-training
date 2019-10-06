import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EntryEditorComponent } from './entry-editor/entry-editor.component';
import { SharedModule } from './shared/shared.module';
import { NgxLoadingModule } from 'ngx-loading';
import { AppStoreModule } from './store/app-store.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkoutsComponent,
    NavMenuComponent,
    EntryEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppStoreModule,
    SharedModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

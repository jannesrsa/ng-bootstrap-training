import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EntryEditorComponent } from './entry-editor/entry-editor.component';
import { SharedModule } from './shared/shared.module';
import { NgxLoadingModule } from 'ngx-loading';
import { AppStoreModule } from './store/app-store.module';
import { DateStringAdapterService } from './services/date-string-adapter.service';
import { PerformanceTargetsModalComponent } from './performance-targets-modal/performance-targets-modal.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      WorkoutsComponent,
      NavMenuComponent,
      EntryEditorComponent,
      PerformanceTargetsModalComponent,
      AdminComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      AppStoreModule,
      SharedModule,
      NgxLoadingModule.forRoot({}),
      NgbModule
   ],
   providers: [{ provide: NgbDateAdapter, useClass: DateStringAdapterService }],
   entryComponents: [PerformanceTargetsModalComponent],
   bootstrap: [AppComponent]
})
export class AppModule { }

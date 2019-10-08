import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

const apiRoot = "http://10.0.0.136:4410/";
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: apiRoot,
  entityHttpResourceUrls: {
    Location: { entityResourceUrl: apiRoot + 'locations/', collectionResourceUrl: apiRoot + 'locations/' },
    Workout: { entityResourceUrl: apiRoot + 'workouts/', collectionResourceUrl: apiRoot + 'workouts/' },
    PerformanceTargets: { entityResourceUrl: apiRoot + 'performanceTargets/', collectionResourceUrl: apiRoot + 'performanceTargets/' },
  }
};

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }]
})
export class AppStoreModule { }


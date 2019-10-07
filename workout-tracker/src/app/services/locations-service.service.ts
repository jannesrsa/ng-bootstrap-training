import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, QueryParams } from '@ngrx/data';
import { Location } from '../core/model/location';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationsService extends EntityCollectionServiceBase<Location> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Location', serviceElementsFactory);
  }

  getWithQuery(params: string | QueryParams): Observable<Location[]> {
    return super.getWithQuery(`q=${params}`);
  }
}
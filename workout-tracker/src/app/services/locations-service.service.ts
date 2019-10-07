import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Location } from '../core/model/location';

@Injectable({ providedIn: 'root' })
export class LocationsService extends EntityCollectionServiceBase<Location> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Location', serviceElementsFactory);
  }

}
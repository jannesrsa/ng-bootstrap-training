import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Workout } from '../core/model/workout';

@Injectable({ providedIn: 'root' })
export class WorkoutsService extends EntityCollectionServiceBase<Workout> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Workout', serviceElementsFactory);
  }

}
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, QueryParams } from '@ngrx/data';
import { PerformanceTargets } from '../core/model/performancetargets';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PerformanceTargetsService extends EntityCollectionServiceBase<PerformanceTargets> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PerformanceTargets', serviceElementsFactory);
  }

  getWithQuery(params: string | QueryParams): Observable<PerformanceTargets[]> {
    return super.getWithQuery(`q=${params}`);
  }
}
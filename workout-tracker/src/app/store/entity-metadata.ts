import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Location: {},
    Workout: {},
    PerformanceTargets: {},
};

export const pluralNames = {
    // Case matters. Match the case of the entity name.
    PerformanceTargets: 'PerformanceTargets'
  };

export const entityConfig = {
    entityMetadata,
    pluralNames
};
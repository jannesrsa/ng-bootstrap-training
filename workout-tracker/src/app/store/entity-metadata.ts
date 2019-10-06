import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Location: {},
    Workout: {},
    PerformanceTarget: {},
};

const pluralNames = {};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
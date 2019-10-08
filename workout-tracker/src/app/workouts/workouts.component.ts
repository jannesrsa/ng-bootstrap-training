import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { WorkoutsService } from '../services/workouts-service.service';
import { Observable, combineLatest } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceTargetsService } from '../services/performancetargets-service.service';
import { PerformanceTargets } from '../core/model/performancetargets';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  performanceTargets$: Observable<PerformanceTargets[]>;

  loading$: Observable<boolean>;

  constructor(private workoutService: WorkoutsService,
    performanceTargetsService: PerformanceTargetsService,
    private modal: NgbModal) {

    this.workouts$ = workoutService.entities$;
    this.performanceTargets$ = performanceTargetsService.entities$;

    this.loading$ = combineLatest(
      workoutService.loading$,
      performanceTargetsService.loading$)
      .pipe(
        map(([workouts, performanceTargets]) => {
          return workouts || performanceTargets;
        }),
      );
  }

  ngOnInit() {
    this.getWorkouts();
  }

  private getWorkouts() {
    this.workoutService.getAll();
  }

  deleteWorkout(workout: Workout, deleteModal: any): void {
    const options: NgbModalOptions = { size: 'sm' }

    this.modal.open(deleteModal, options)
      .result
      .then(
        () => this.workoutService.delete(workout),
        reason => console.log(`Dismissed: ${reason}`));
  }

}

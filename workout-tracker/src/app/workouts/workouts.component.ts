import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { WorkoutsService } from '../services/workouts-service.service';
import { Observable, combineLatest } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceTargetsService } from '../services/performancetargets-service.service';
import { PerformanceTargets } from '../core/model/performancetargets';
import { map, first, take, tap } from 'rxjs/operators';
import { PerformanceTargetsModalComponent } from '../performance-targets-modal/performance-targets-modal.component';
import { filter } from 'minimatch';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  performanceTargets$: Observable<PerformanceTargets>;

  loading$: Observable<boolean>;

  constructor(private workoutService: WorkoutsService,
              private performanceTargetsService: PerformanceTargetsService,
              private modal: NgbModal) {

    this.workouts$ = workoutService.entities$;
    this.performanceTargets$ = performanceTargetsService.entities$
      .pipe(
        map((results) => results[0])
      );

    this.loading$ = combineLatest(
      workoutService.loading$,
      performanceTargetsService.loading$)
      .pipe(
        map(([workoutsLoading, performanceTargetsLoading]) => {
          console.log(`workoutsLoading: ${workoutsLoading}`);
          console.log(`performanceTargetsLoading: ${performanceTargetsLoading}`);
          return workoutsLoading || performanceTargetsLoading;
        }),
      );
  }

  ngOnInit() {
    this.getWorkouts();
    this.getPerformanceTargets();
  }

  private getWorkouts() {
    this.workoutService.getAll();
  }

  private getPerformanceTargets() {
    this.performanceTargetsService.getAll();
  }

  deleteWorkout(workout: Workout, deleteModal: any): void {
    const options: NgbModalOptions = { size: 'sm' };

    this.modal.open(deleteModal, options)
      .result
      .then(
        () => this.workoutService.delete(workout),
        reason => console.log(`Dismissed: ${reason}`));
  }

  showPerfTargets() {
    const modalRef = this.modal.open(PerformanceTargetsModalComponent);
    modalRef.componentInstance.perfTargets$ = this.performanceTargets$;

    modalRef.result
      .then(
        (result) => {
          this.performanceTargetsService.update(result);
        },
        reason => console.log(`Dismissed: ${reason}`));
  }

}

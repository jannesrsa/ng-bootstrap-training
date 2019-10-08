import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { WorkoutsService } from '../services/workouts-service.service';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  loading$: Observable<boolean>;

  constructor(private workoutService: WorkoutsService,
    private modal: NgbModal) {
    this.workouts$ = workoutService.entities$;
    this.loading$ = workoutService.loading$;
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

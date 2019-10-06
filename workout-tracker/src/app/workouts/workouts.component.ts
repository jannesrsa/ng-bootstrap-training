import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { WorkoutsService } from '../services/workouts-service.service';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  loading = false;

  constructor(private workoutService: WorkoutsService) { }

  ngOnInit() {
    this.loading = true;
    this.workouts$ = this.workoutService.getAll()
      .pipe(
        tap(() => this.loading = false)
      );
  }

  deleteWorkout(workout: Workout): void {
    this.workoutService.delete(workout);
  }

}

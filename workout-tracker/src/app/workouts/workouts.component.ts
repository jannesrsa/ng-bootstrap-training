import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { WorkoutsService } from '../services/workouts-service.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  loading = false;

  constructor(private workoutService: WorkoutsService,
    private modal: NgbModal) {
  }

  ngOnInit() {
    this.loading = true;
    this.workouts$ = this.workoutService.getAll()
      .pipe(
        tap(() => this.loading = false)
      );
  }

  deleteWorkout(workout: Workout, deleteModal: any): void {
    const options: NgbModalOptions = { size: 'sm' }

    this.modal.open(deleteModal,options).result.then(result => {
      this.workoutService.delete(workout);
    }, reason => console.log(`Dismissed: ${reason}`));
  }

}

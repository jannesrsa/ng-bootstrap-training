import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from '../services/workouts-service.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  workout: Workout = {} as Workout;
  loading = false;
  newEntry = false;
  startDate: any;
  maxDate: NgbDateStruct;

  constructor(private router: ActivatedRoute,
    private nav: Router,
    private api: WorkoutsService) { }

  ngOnInit() {

    const today = new Date();
    this.maxDate = NgbDate.from({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate() + 1
    });

    this.router.params.subscribe(params => {
      this.newEntry = params.id === 'new';
      if (!this.newEntry) {
        this.loading = true;
        this.api.getByKey(params.id).subscribe(data => {
          this.workout = data;
          let d = new Date(this.workout.date);
          this.startDate = { year: d.getFullYear(), month: d.getMonth() + 1 };
          this.loading = false;
        })
      }
    })
  }

  save(): void {
    this.loading = true;

    if (this.newEntry) {
      this.api.upsert(this.workout).subscribe(data => {
        this.loading = false;
        this.nav.navigate(['/workouts']);
      })
    }
    else {
      this.api.update(this.workout).subscribe(data => {
        this.loading = false;
        this.nav.navigate(['/workouts']);
      })
    }
  }

}

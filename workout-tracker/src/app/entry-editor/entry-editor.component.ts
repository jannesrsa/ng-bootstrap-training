import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from '../services/workouts-service.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { debounce, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  workout: Workout = { rating: 0 } as Workout;
  loading = false;
  newEntry = false;
  startDate: any;
  maxDate: NgbDateStruct;
  locations = ["Main Gym", "CrossFit"]

  locationsSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] :
        this.locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0.10))
    );
    
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

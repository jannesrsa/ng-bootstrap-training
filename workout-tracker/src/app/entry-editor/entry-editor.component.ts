import { Component, OnInit } from '@angular/core';
import { Workout } from '../core/model/workout';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from '../services/workouts-service.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { debounce, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocationsService } from '../services/locations-service.service';
import { Location } from '../core/model/location';

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
  locations: Location[] = [];

  locationsSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] :
        this.locations.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0.10))
    );

  locationsFormatter = (result) => result.name;

  constructor(private router: ActivatedRoute,
    private nav: Router,
    private workoutsservice: WorkoutsService,
    private locationservice: LocationsService) {

    const today = new Date();
    this.maxDate = NgbDate.from({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate() + 1
    });
  }

  ngOnInit() {

    this.locationservice.getAll().subscribe(data => this.locations = data);

    this.router.params.subscribe(params => {
      this.newEntry = params.id === 'new';
      if (!this.newEntry) {
        this.loading = true;
        this.workoutsservice.getByKey(params.id).subscribe(data => {
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
      this.workoutsservice.upsert(this.workout).subscribe(data => {
        this.loading = false;
        this.nav.navigate(['/workouts']);
      })
    }
    else {
      this.workoutsservice.update(this.workout).subscribe(data => {
        this.loading = false;
        this.nav.navigate(['/workouts']);
      })
    }
  }

}

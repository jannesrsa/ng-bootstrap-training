import { Component, OnInit } from '@angular/core';
import { PerformanceTargets } from '../core/model/performancetargets';
import { PerformanceTargetsService } from '../services/performancetargets-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-performance-targets-modal',
  templateUrl: './performance-targets-modal.component.html',
  styleUrls: ['./performance-targets-modal.component.css']
})
export class PerformanceTargetsModalComponent implements OnInit {

  public perfTargets$: Observable<PerformanceTargets>;

  constructor() {
  }

  ngOnInit() {
    console.log(`perfTargets`);
  }
}

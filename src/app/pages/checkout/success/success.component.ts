import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  constructor(private router: Router) { }

  ngOnInit(): void {
    timer(2000)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

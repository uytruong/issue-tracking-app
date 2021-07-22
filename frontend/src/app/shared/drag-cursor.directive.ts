import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDragCursor]'
})
export class DragCursorDirective implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private cdkDrag: CdkDrag) {}

  public ngOnInit(): void {
    this.cdkDrag.started.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      window.document.body.classList.add('inheritCursors');
      window.document.body.style.cursor = 'grabbing';
    });

    this.cdkDrag.ended.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      window.document.body.classList.remove('inheritCursors');
      window.document.body.style.cursor = 'auto';
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

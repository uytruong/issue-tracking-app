import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Issue } from '@app/data/model/issue.model';
import { ProjectStore } from '@app/modules/project/project.store';
import { Subject } from 'rxjs';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-issue-title',
  templateUrl: './issue-title.component.html',
  styleUrls: ['./issue-title.component.scss']
})
export class IssueTitleComponent implements OnInit, OnDestroy {
  @Input() issue: Issue;
  titleControl: FormControl;
  private destroy$ = new Subject();

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.titleControl = new FormControl(this.issue.title, { updateOn: 'blur' });
    this.titleControl.valueChanges
      .pipe(startWith(''), pairwise(), takeUntil(this.destroy$))
      .subscribe(([prev, next]: [string, string]) => {
        if (prev !== next) {
          this.projectStore.updateIssue({ ...this.issue, title: next });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

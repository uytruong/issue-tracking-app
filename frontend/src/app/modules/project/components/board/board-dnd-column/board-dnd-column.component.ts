import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { issueStageDisplay } from '@app/core/configs/issue';
import { Issue, IssueStage } from '@app/data/model/issue.model';
import { FilterState, FilterStore } from '@app/modules/project/store/filter.store';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-board-dnd-column',
  templateUrl: './board-dnd-column.component.html',
  styleUrls: ['./board-dnd-column.component.scss']
})
export class BoardDndColumnComponent implements OnInit, OnDestroy {
  @Input() stage: IssueStage;
  issues$: Observable<Issue[]>;
  stageDisplay = issueStageDisplay;
  filterConditions$: Observable<FilterState>;
  filteredIssues: Issue[];
  private destroy$ = new Subject<void>();

  constructor(private projectStore: ProjectStore, private filterStore: FilterStore) {}

  ngOnInit(): void {
    this.issues$ = this.projectStore.issuesSortedByStage$(this.stage);
    this.filterConditions$ = this.filterStore.allConditions$;
    combineLatest([this.issues$, this.filterConditions$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([issues, conditions]) => {
        this.filteredIssues = this.filterIssues(issues, conditions);
      });
  }

  drop(event: CdkDragDrop<Issue[]>) {
    const movedIssue: Issue = { ...event.item.data };
    let newIssues = [...event.container.data];
    const previousIssues = [...event.previousContainer.data];
    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
    } else {
      transferArrayItem(previousIssues, newIssues, event.previousIndex, event.currentIndex);
      // Set stage to moved issue
      newIssues = newIssues.map((issue) =>
        issue.id === movedIssue.id ? { ...issue, stage: event.container.id as IssueStage } : issue
      );
      this.updateListPosition(previousIssues);
      this.updateListPosition(newIssues);
    }
  }

  private updateListPosition(issues: Issue[]) {
    for (let idx in issues) {
      issues[idx].listPosition = parseInt(idx) + 1;
      this.projectStore.updateIssue(issues[idx]);
      this.projectStore.postIssue(issues[idx]);
    }
  }

  private filterIssues(issues: Issue[], conditions: FilterState): Issue[] {
    const { searchString, userIds, priorities, types } = conditions;
    return issues.filter((issue) => {
      const isMatchString = this.isMatchString(issue.title, searchString);

      let isFilteredUser = true;
      if (userIds.length !== 0) {
        isFilteredUser =
          userIds.includes(issue.reporterId) ||
          issue.assigneesId.some((assigneeId) => userIds.includes(assigneeId));
      }

      let isFilteredPriority = true;
      if (priorities.length !== 0) {
        isFilteredPriority = priorities.includes(issue.priority);
      }

      let isFilteredType = true;
      if (types.length !== 0) {
        isFilteredType = types.includes(issue.type);
      }

      return isMatchString && isFilteredUser && isFilteredPriority && isFilteredType;
    });
  }

  private isMatchString(string: string, searchString: string) {
    string = string ? string.trim().toLowerCase() : '';
    searchString = searchString ? searchString.trim().toLowerCase() : '';
    return string.includes(searchString);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

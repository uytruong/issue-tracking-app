import { Component, Input, OnInit } from '@angular/core';
import { issueStageDisplay, issueStageDisplayColor } from '@app/core/configs/issue';
import { Issue } from '@app/data/model/issue.model';
import { IssueStage } from '@app/data/model/issue.model';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { Observable } from 'rxjs';

class IssueStageVM {
  value: IssueStage;
  label: string;
  constructor(stage: IssueStage) {
    this.value = stage;
    this.label = issueStageDisplay[stage];
  }
}

@Component({
  selector: 'app-issue-stage',
  templateUrl: './issue-stage.component.html',
  styleUrls: ['./issue-stage.component.scss']
})
export class IssueStageComponent implements OnInit {
  @Input() issue: Issue;
  stages: IssueStageVM[];
  selectedStage: string;
  issueStageDisplayColor = issueStageDisplayColor;
  issuesSortedByStage$: Observable<Issue[]>;

  constructor(private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.selectedStage = this.issue.stage;
    this.stages = [
      new IssueStageVM(IssueStage.BACKLOG),
      new IssueStageVM(IssueStage.SELECTED),
      new IssueStageVM(IssueStage.IN_PROGRESS),
      new IssueStageVM(IssueStage.DONE)
    ];
  }

  onChangeSelection(stage: IssueStage) {
    let newPosition: number;
    this.issuesSortedByStage$ = this.projectStore.issuesSortedByStage$(stage);
    const subscription = this.issuesSortedByStage$.subscribe((issues) => {
      newPosition = issues.length + 1;
    });
    subscription.unsubscribe();
    this.projectStore.postIssue({ ...this.issue, stage: stage, listPosition: newPosition });
  }
}

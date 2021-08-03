import { Component, Input, OnInit } from '@angular/core';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { Issue } from '@app/data/model/issue.model';
import { User } from '@app/data/model/user.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
export class IssueCommentComponent implements OnInit {
  @Input() issue: Issue;
  currentUser$: Observable<User>;
  isDisplay: boolean = false;
  

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(userSelector));
  }

  onStartEdit() {
    this.isDisplay = true;
  }

  onSaveEdit() {
    this.isDisplay = false;
  }

  onCancelEdit() {
    this.isDisplay = false;
  }

}

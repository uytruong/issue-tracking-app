import { Component, Input, OnInit } from '@angular/core';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { IssueComment } from '@app/data/model/issue-comment.model';
import { Issue } from '@app/data/model/issue.model';
import { User } from '@app/data/model/user.model';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';

class IssueCommentVM {
  user: User;
  content: string;
  createdAt: string;
  constructor(comment: IssueComment, user: User) {
    this.user = user;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
  }
}

@Component({
  selector: 'app-issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
export class IssueCommentComponent implements OnInit {
  @Input() issue: Issue;
  @Input() users: User[];
  currentUser$: Observable<User>;
  isDisplay: boolean = false;
  content: string;
  commentsVM$: Observable<IssueCommentVM[]>;

  constructor(private store: Store, private projectStore: ProjectStore) {}

  ngOnInit(): void {
    this.projectStore.getComments(this.issue.id);
    this.currentUser$ = this.store.pipe(select(userSelector));
    this.commentsVM$ = this.projectStore.comments$.pipe(
      map((comments: IssueComment[]) => {
        return comments.map((comment) => {
          const commentUser = this.users.find((user) => user.id === comment.userId);
          return new IssueCommentVM(comment, commentUser);
        });
      })
    );
  }

  onStartEdit() {
    this.isDisplay = true;
  }

  onSaveEdit(userId: string) {
    const now = new Date();
    this.projectStore.addComment({
      id: now.getTime().toString(),
      issueId: this.issue.id,
      userId: userId,
      content: this.content,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    });
    this.onCancelEdit();
  }

  onCancelEdit() {
    this.isDisplay = false;
    this.content = '';
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { FilterStore } from '@app/modules/project/store/filter.store';
import { ProjectStore } from '@app/modules/project/store/project.store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IssueAddModalComponent } from '../../issue/issue-add-modal/issue-add-modal.component';

@Component({
  selector: 'app-board-dnd-actions',
  templateUrl: './board-dnd-actions.component.html',
  styleUrls: ['./board-dnd-actions.component.scss']
})
export class BoardDndActionsComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  @Input() currentUser: User;
  users$: Observable<User[]>;
  searchControl = new FormControl('');
  prioritiesControl = new FormControl([]);
  typesControl = new FormControl([]);
  userIds: string[];
  private destroy$ = new Subject<void>();

  constructor(
    private nzModalService: NzModalService,
    private filterStore: FilterStore,
    private projectStore: ProjectStore
  ) {}

  ngOnInit(): void {
    this.users$ = this.projectStore.users$;
    this.filterStore.allConditions$.pipe(takeUntil(this.destroy$)).subscribe((allConditions) => {
      this.searchControl.patchValue(allConditions.searchString);
      this.userIds = allConditions.userIds;
      this.prioritiesControl.patchValue(allConditions.priorities);
      this.typesControl.patchValue(allConditions.types);
    });
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => this.filterStore.updateSearchString(query));
    this.prioritiesControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((priorities) => this.filterStore.updatePriorities(priorities));
    this.typesControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((types) => this.filterStore.updateTypes(types));
  }

  onOpenAddIssueModal(currentProject: Project, currentUser: User) {
    this.nzModalService.create({
      nzContent: IssueAddModalComponent,
      nzComponentParams: {
        currentProject: currentProject,
        currentUser: currentUser
      },
      nzClosable: false,
      nzFooter: null,
      nzAutofocus: null,
      nzWidth: 720
    });
  }

  toggleUserId(id: string) {
    if (this.userIds.includes(id)) {
      this.userIds.splice(this.userIds.indexOf(id), 1);
    } else {
      this.userIds.push(id);
    }
    this.filterStore.updateUserIds([...this.userIds]);
  }

  isSelected(userId: string) {
    return this.userIds.includes(userId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

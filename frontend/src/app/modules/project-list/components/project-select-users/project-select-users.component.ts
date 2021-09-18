import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/data/model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ProjectListService } from '../../project-list.service';

@Component({
  selector: 'app-project-select-users',
  templateUrl: './project-select-users.component.html',
  styleUrls: ['./project-select-users.component.scss']
})
export class ProjectSelectUsersComponent implements OnInit {
  @Input() control: FormControl;
  searchChange$ = new BehaviorSubject('');
  userOptionList$: Observable<User[]>;
  isLoading: boolean;

  constructor(private projectListService: ProjectListService) {}

  ngOnInit(): void {
    this.userOptionList$ = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(
        tap(() => (this.isLoading = false)),
        switchMap((searchString) => this.projectListService.getUsersByUsername(searchString))
      );
  }

  onSearch(searchString: string) {
    this.isLoading = true;
    this.searchChange$.next(searchString);
  }
}

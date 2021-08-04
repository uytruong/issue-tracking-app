import { Component, Input, OnInit } from '@angular/core';
import { userSelector } from '@app/core/store/auth/auth.selectors';
import { User } from '@app/data/model/user.model';
import { IssueAddModalComponent } from '@app/modules/project/components/issue/issue-add-modal/issue-add-modal.component';
import { select, Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store, private nzModalService: NzModalService) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(userSelector));
  }

  onOpenAddIssueModal() {
    this.nzModalService.create({
      nzContent: IssueAddModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzAutofocus: null,
      nzWidth: 720 
    });
  }

}

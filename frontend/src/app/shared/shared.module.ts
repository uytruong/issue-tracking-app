import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [],
  imports: [CommonModule, NzAvatarModule, NzToolTipModule, NzPopoverModule],
  exports: [NzAvatarModule, NzToolTipModule, NzPopoverModule],
})
export class SharedModule {}

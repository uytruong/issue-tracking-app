import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { IconComponent } from './components/icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from '@app/core/configs/icons';

@NgModule({
  declarations: [IconComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzToolTipModule,
    NzPopoverModule,
    NzIconModule.forChild(NZ_ICONS),
  ],
  exports: [NzAvatarModule, NzToolTipModule, NzPopoverModule, NzIconModule, IconComponent],
})
export class SharedModule {}

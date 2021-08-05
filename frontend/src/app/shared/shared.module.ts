import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { IconComponent } from './components/icon/icon.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from '@app/core/configs/icons';
import { DragCursorDirective } from './drag-cursor.directive';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [IconComponent, DragCursorDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NzToolTipModule,
    NzPopoverModule,
    NzIconModule.forChild(NZ_ICONS),
    NzSpinModule,
    NzTableModule,
    NzModalModule,
    TextFieldModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    HttpClientModule,
    AngularEditorModule
  ],
  exports: [
    ReactiveFormsModule,
    NzAvatarModule,
    NzToolTipModule,
    NzPopoverModule,
    NzIconModule,
    IconComponent,
    DragCursorDirective,
    NzSpinModule,
    NzTableModule,
    NzModalModule,
    TextFieldModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    HttpClientModule,
    AngularEditorModule
  ]
})
export class SharedModule {}

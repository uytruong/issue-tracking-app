import { issuePriorityColor } from '@app/core/configs/issue';
import { IssuePriority } from '../model/issue.model';

export class IssuePriorityIcon {
  value: string;
  iconColor: string;

  constructor(priority: IssuePriority) {
    this.value = priority;
    this.iconColor = issuePriorityColor[priority];
  }
}

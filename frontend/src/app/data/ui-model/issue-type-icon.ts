import { issueTypeIconData } from '@app/core/configs/issue';
import { IssueType } from '../model/issue.model';
import { Icon } from './icon';

export class IssueTypeIcon {
  value: string;
  icon: Icon;

  constructor(type: IssueType) {
    this.value = type;
    this.icon = issueTypeIconData[type];
  }
}

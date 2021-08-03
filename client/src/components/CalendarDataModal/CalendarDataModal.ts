import { CashbookType } from '../../types';
import Component from '../../utils/Component';

export default class CalendarDataModal extends Component<CashbookType[]> {
  constructor($target: HTMLElement, state: CashbookType[]) {
    super($target, state);
  }
  template(): string {
    return '';
  }
}

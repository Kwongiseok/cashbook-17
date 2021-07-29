import Component from '../../utils/Component';
import ArrowIcon from '../../../public/images/arrow-down.svg';
import DeleteIcon from '../../../public/images/deleteIcon.svg';
import './inputBar.scss';
import { CashbookType, CATEGORY, CATEGORY_TYPE, HistoryState } from '../../types';
import alert from '../../views/MainView/utils/alert/Alert';
import confirm from '../../views/MainView/utils/confirm/Confirm';
import { listenByElement } from '../../utils/customEvent';
import Alert from '../../views/MainView/utils/alert/Alert';
import DatePicker from '../../components/DatePicker/DatePicker';

let dummyPayment = ['신한카드', '계좌이체', '현금'];

type InputType = {
  date?: string;
  category?: CATEGORY;
  categoryType?: CATEGORY_TYPE;
  memo?: string;
  payment?: string;
  price?: number;
  addCashBook: (cashbook: CashbookType) => void;
};

export default class InputBar extends Component<InputType> {
  constructor($target: HTMLElement, state: InputType) {
    super($target, state);
    listenByElement($target, 'selectCashbook', (e) => {
      console.log(e.detail);
    });
  }

  setup() {}

  mounted() {
    this.setPaymentList();

    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker') as HTMLElement;
    new DatePicker($datePickerBox, history.state);
    listenByElement($datePickerBox, 'date-change', (e) => {
      this.setState({
        date: e.detail.date,
      });
    });
  }

  template(): string {
    return `
      <div class="input-bar__date">
        <label>일자</label>
        <input type="text" value="${this.getCurrentDate()}">
        <div class="input-bar__date-picker"></div>
      </div>
      <div class="input-bar__category">
        <label>분류</label>
        <div class="category-value">
          ${this.getCurrentCategory()}
          <img src="${ArrowIcon}">
        </div>
        <ul class="input-dropdown">
          <ul class="category-income">
            <div class="subject">수입</div>
            <li>월급</li>
            <li>용돈</li>
            <li>기타수입</li>
          </ul>
          <ul class="category-expenditure">
            <div class="subject">지출</div>
            <li>식비</li>
            <li>생활</li>
            <li>쇼핑/뷰티</li>
            <li>교통</li>
            <li>의료/건강</li>
            <li>문화/여가</li>
            <li>미분류</li>
          </ul>
        </ul>
      </div>
      <div class="input-bar__memo">
        <label>내용</label>
        <input type="text" value="${this.getCurrentMemo()}">
      </div>
      <div class="input-bar__payment">
        <label>결제수단</label>
        <div class="payment-value">
          ${this.getCurrentPayment()}
          <img src="${ArrowIcon}">
        </div>
        <ul class="input-dropdown"></ul>
      </div>
      <div class="input-bar__price">
        <label>금액</label>
        <div>
          <span class="payment-type ${this.state.categoryType}">${
      this.state.categoryType === 'income' ? '+' : '-'
    }</span>
          <input type="text" value="${this.getCurrentPrice()}" class="${this.state.categoryType}">
          <label>원</label>
          <div class="submit"><div></div></div>
        </div>
      </div>
    `;
  }

  setEvent() {
    const $date = this.$target.querySelector('.input-bar__date input');
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker') as HTMLElement;
    const $categoryValue = this.$target.querySelector('.category-value');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    const $memoInput = this.$target.querySelector('.input-bar__memo input');
    const $paymentValue = this.$target.querySelector('.payment-value');
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $priceInput = this.$target.querySelector('.input-bar__price input');
    const $submitButton = this.$target.querySelector('.submit');

    $date?.addEventListener('click', this.datePickerOpenHandler.bind(this));
    $date?.addEventListener('change', this.inputChnageHandler.bind(this));
    $categoryValue?.addEventListener('click', (e) => this.categoryOpenHandler(e));
    $categoryDropdown?.addEventListener('click', this.categoryClickHandler.bind(this));
    $memoInput?.addEventListener('change', this.memoChangeHandler.bind(this));
    $paymentValue?.addEventListener('click', (e) => this.paymentOpenHandler(e));
    $paymentDropdown?.addEventListener('click', this.paymentClickHandler.bind(this));
    $priceInput?.addEventListener('keyup', this.priceInputHandler.bind(this));
    $priceInput?.addEventListener('change', this.priceChangeHandler.bind(this));
    $submitButton?.addEventListener('click', this.addCashbook.bind(this));
    document.addEventListener('click', () => {
      $datePickerBox.style.display = 'none';
      $categoryDropdown?.classList.remove('open');
      $paymentDropdown?.classList.remove('open');
    });
  }

  getCurrentDate() {
    if (this.state.date) {
      return this.state.date;
    }
    return '';
  }
  getCurrentCategory() {
    if (this.state.category) {
      return `<p>${this.state.category}</p>`;
    } else {
      return '<p class="disable">선택하세요</p>';
    }
  }
  getCurrentMemo() {
    if (this.state.memo) {
      return this.state.memo;
    } else {
      return '';
    }
  }
  getCurrentPayment() {
    if (this.state.payment) {
      return `<p>${this.state.payment}</p>`;
    } else {
      return '<p class="disable">선택하세요</p>';
    }
  }
  getCurrentPrice() {
    if (this.state.price) {
      return Number(this.state.price).toLocaleString();
    } else {
      return '';
    }
  }

  datePickerOpenHandler(e: Event) {
    e.stopPropagation();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker') as HTMLElement;
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    $categoryDropdown?.classList.remove('open');
    $paymentDropdown?.classList.remove('open');
    $datePickerBox.style.display = 'block';
  }
  inputChnageHandler(e: any) {
    this.setState({
      date: e.target.value,
    });
  }
  categoryOpenHandler(e: Event) {
    e.stopPropagation();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker') as HTMLElement;
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    $datePickerBox.style.display = 'none';
    $paymentDropdown?.classList.remove('open');
    $categoryDropdown?.classList.toggle('open');
  }
  categoryClickHandler(e: any) {
    const clickedElement = e.target;
    if (!(clickedElement instanceof HTMLLIElement)) return;
    let categoryType, category;
    if (clickedElement.parentElement?.classList.contains('category-income')) {
      categoryType = 'income';
    } else {
      categoryType = 'expenditure';
    }
    category = clickedElement.innerText;
    this.setState({
      categoryType: categoryType,
      category: category,
    });
  }
  memoChangeHandler(e: any) {
    this.setState({
      memo: e.target.value,
    });
  }
  paymentOpenHandler(e: Event) {
    e.stopPropagation();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker') as HTMLElement;
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    $datePickerBox.style.display = 'none';
    $categoryDropdown?.classList.remove('open');
    $paymentDropdown?.classList.toggle('open');
  }
  paymentClickHandler(e: any) {
    const clickedElement = e.target;
    if (!(clickedElement instanceof HTMLLIElement)) return;
  }
  priceInputHandler(e: any) {
    const input = e.target;
    const value = Number(input.value.replaceAll(',', ''));
    input.value = value.toLocaleString();
  }
  priceChangeHandler(e: any) {
    const input = e.target;
    this.setState({
      price: Number(input.value.replaceAll(',', '')),
    });
  }
  async addCashbook() {
    const { date, category, categoryType, memo, payment, price } = this.state as InputType;
    if (date === '' || !category || memo === '' || payment === '' || !price) {
      await Alert('내용을 모두 입력후 진행 해주세요.');
      return;
    }
    let finalPrice = price;
    if (categoryType === 'expenditure') finalPrice = -Number(price);
    this.state.addCashBook({
      date: date,
      category: category,
      categoryType: categoryType,
      memo: memo,
      payment: payment,
      price: finalPrice,
    });
  }

  setPaymentList() {
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    dummyPayment.forEach((item) => {
      const $item = document.createElement('li');
      const $deleteButton = document.createElement('img');
      $item.innerText = item;
      $item.setAttribute('data-value', item);
      $item.addEventListener('click', () => {
        this.setState({
          payment: item,
        });
      });
      $deleteButton.setAttribute('src', DeleteIcon);
      $deleteButton.addEventListener('click', (e: MouseEvent) => this.deletePayment(e, item));
      $item.appendChild($deleteButton);
      $paymentDropdown?.appendChild($item);
    });
    const $addButton = document.createElement('li');
    $addButton.innerText = '추가하기';
    $addButton.addEventListener('click', () => this.addPayment());
    $paymentDropdown?.appendChild($addButton);
  }

  async addPayment() {
    const result = await confirm('추가하실 결제수단을 적어주세요.');
    if (result) {
      dummyPayment.push(result); // 서버로 추가 요청 보내기
      this.setState({
        payment: result,
      });
    }
  }

  async deletePayment(e: MouseEvent, payment: string) {
    e.stopPropagation();
    const result = await alert(`결제수단 <span>${payment}</span>를 삭제 하시겠습니다?`);
    if (result) {
      const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown') as HTMLElement;
      const $item = $paymentDropdown.querySelector(`[data-value="${payment}"]`) as HTMLElement;
      $item.parentElement?.removeChild($item);
      dummyPayment = dummyPayment.filter((dummyPayment) => dummyPayment !== payment); // 서버로 삭제 요청 보내기
      if (this.state.payment === payment) {
        this.setState({
          payment: '',
        });
      }
    }
  }
}

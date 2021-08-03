/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/Component.ts
class Component {
  constructor($target, state) {
    this.$target = $target;
    this.state = state;
    this.setup();
    this.render();
  }

  setup() {} // state 초기화


  template() {
    // template 리터럴
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    this.mounted();
  }

  mounted() {} // 자식 컴포넌트 추가


  setEvent() {} // 이벤트 등록


  setState(newState) {
    this.state = { ...this.state,
      ...newState
    };
    this.render();
  }

}
;// CONCATENATED MODULE: ./src/constants/environment.ts
const API_BASE_URL = "http://localhost:8080";
const GITHUB_SIGN_URL = "https://github.com/login/oauth/authorize?client_id=c8ee211b6a1c476c55ac&redirect_uri=http://localhost:8080/auth/github/callback";
;// CONCATENATED MODULE: ./src/apis/cashbookAPI.ts

const getMainChartData = async (year, month) => {
  try {
    const res = await fetch(`${API_BASE_URL}/chart/cashbooks?year=${year}&month=${month}`, {
      method: 'GET'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getMonthData = async (year, month) => {
  try {
    const res = await fetch(`${API_BASE_URL}/cashbooks?year=${year}&month=${month}`, {
      method: 'GET'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
;// CONCATENATED MODULE: ./src/models/model.ts

const Model = {
  subscriptions: {},

  /**
   * @method publish
   *
   * @param event { string } - name of the event to publish
   * @param data  { any }    - optional data to pass on to subscription
   *
   * @example
   * - event.publish('event');
   * - event.publish('event', { data: 'customData' });
   * - event.publish('event event1 event2', { data: 'customData' });
   */
  publish(event, data) {
    const events = this.subscriptions[event];
    events.forEach(cb => cb(data));
  },

  /**
   * @method subscribe
   *
   * @param event    { string } 	- name of the event to subscribe to
   * @param callback { function } - function callback to execute once the event has been published
   *
   * @example
   * - event.subscribe('event', function () { ... });
   * - event.subscribe('event event1 event2', function (data) { ... });
   * - event.subscribe('event.namespaced', function (data) { ... });
   */
  subscribe(event, callback) {
    if (this.subscriptions[event]) {
      this.subscriptions[event].push(callback);
    } else {
      this.subscriptions[event] = [callback];
    }
  }

};
Model.subscribe('statechange', fetchCashbookData);

async function fetchCashbookData(historyState) {
  const [year, month] = [historyState.year, historyState.month];

  if (historyState.path === '/chart') {
    const {
      total,
      datas
    } = await getMainChartData(year, month);
    Model.publish('updateHistory', { ...historyState,
      total,
      data: datas
    });
  } else {
    const data = await getMonthData(year, month);
    Model.publish('updateHistory', { ...historyState,
      data
    });
  }
}

/* harmony default export */ const model = (Model);
;// CONCATENATED MODULE: ./public/images/arrow-down.svg
/* harmony default export */ const arrow_down = (__webpack_require__.p + "public/images/arrow-down.svg");
;// CONCATENATED MODULE: ./public/images/deleteIcon.svg
/* harmony default export */ const deleteIcon = (__webpack_require__.p + "public/images/deleteIcon.svg");
;// CONCATENATED MODULE: ./src/utils/confirm/Confirm.ts

/* harmony default export */ const Confirm = (async message => {
  return await new Promise((resolve, reject) => {
    const confirmBackground = document.createElement('div');
    confirmBackground.classList.add('confirm-background');
    const confirm = document.createElement('div');
    confirm.classList.add('confirm');
    confirm.innerHTML = `
      <div class="message">${message}</div>
      <input class="input" type="text">
      <div class="buttons">
        <button class="btn-cancel">취소</button>
        <button class="btn-ok" disabled>확인</button>
      </div>
    `;
    confirmBackground.appendChild(confirm);
    const buttonCancel = confirm.querySelector('.btn-cancel');
    buttonCancel === null || buttonCancel === void 0 ? void 0 : buttonCancel.addEventListener('click', () => {
      confirmBackground.remove();
      resolve(null);
    });
    const buttonOk = confirm.querySelector('.btn-ok');
    const input = confirm.querySelector('.input');
    buttonOk === null || buttonOk === void 0 ? void 0 : buttonOk.addEventListener('click', () => {
      if (input.value.length > 0) {
        const result = input.value;
        confirmBackground.remove();
        resolve(result);
      }
    });
    input === null || input === void 0 ? void 0 : input.addEventListener('change', () => {
      if (input.value.length > 0) {
        buttonOk.removeAttribute('disabled');
      } else {
        buttonOk.setAttribute('disabled', '');
      }
    });
    confirmBackground.addEventListener('click', e => e.stopPropagation());
    document.body.appendChild(confirmBackground);
  });
});
;// CONCATENATED MODULE: ./src/utils/customEvent.ts
// type : 발생 시킬 event, data = { year, month, path, isFirst }
function trigger(type, data) {
  document.dispatchEvent(new CustomEvent(type, {
    detail: data
  }));
}
function listen(type, listener) {
  document.addEventListener(type, listener);
}
function triggerByElement(target, type, data) {
  target.dispatchEvent(new CustomEvent(type, {
    detail: data
  }));
}
function listenByElement(target, type, listener) {
  target.addEventListener(type, listener);
}
;// CONCATENATED MODULE: ./src/utils/alert/Alert.ts

/* harmony default export */ const Alert = (async message => {
  return await new Promise((resolve, _reject) => {
    const alertBackground = document.createElement('div');
    alertBackground.classList.add('alert-background');
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = `
      <div class="message">${message}</div>
      <div class="buttons">
        <button class="btn-cancel">취소</button>
        <button class="btn-ok">확인</button>
      </div>
    `;
    alertBackground.appendChild(alert);
    const buttonCancel = alert.querySelector('.btn-cancel');
    buttonCancel === null || buttonCancel === void 0 ? void 0 : buttonCancel.addEventListener('click', () => {
      alertBackground.remove();
      resolve(false);
    });
    const buttonOk = alert.querySelector('.btn-ok');
    buttonOk === null || buttonOk === void 0 ? void 0 : buttonOk.addEventListener('click', () => {
      alertBackground.remove();
      resolve(true);
    });
    alertBackground.addEventListener('click', e => e.stopPropagation());
    document.body.appendChild(alertBackground);
  });
});
;// CONCATENATED MODULE: ./src/constants/days.ts
const DAY_OF_THE_WEEK = ['일', '월', '화', '수', '목', '금', '토'];
const NUMBER_OF_DAYS_IN_WEEK = 7;
;// CONCATENATED MODULE: ./src/components/DatePicker/DatePicker.ts




class DatePicker extends Component {
  constructor($target, state) {
    super($target, state);
  }

  mounted() {
    if (this.state) {
      const {
        year,
        month
      } = this.state;
      const $days = document.querySelector('.datePicker-days');
      const $body = document.querySelector('.datePicker-body');
      $days.innerHTML = this.convertDayOfTheWeekToHTML();
      $body.innerHTML = this.convertCalendarDaysToHTML(year, month - 1);
    }
  }

  setEvent() {
    if (this.state) {
      const $leftButton = document.querySelector('.datePicker-left');
      const $rightButton = document.querySelector('.datePicker-right');
      const $body = document.querySelector('.datePicker-body');
      $leftButton.addEventListener('click', this.onClickLeft.bind(this));
      $rightButton.addEventListener('click', this.onClickRight.bind(this));
      $body.addEventListener('click', e => {
        const target = e.target;
        const el = target.closest('.now-month');

        if (el && el.dataset.date) {
          let month = String(this.state.month),
              day = String(el.dataset.date);
          if (Number(month) < 10) month = '0' + month;
          if (Number(day) < 10) day = '0' + day;
          triggerByElement(this.$target, 'date-change', {
            date: `${this.state.year}-${month}-${day}`
          });
        }

        return;
      });
    }
  }

  template() {
    if (this.state) {
      return `
      <div class="datePicker">
        <div class="datePicker-header">
          <button class="datePicker-button datePicker-left">${'<'}</button>
          <span>${this.state.month}월 ${this.state.year}</span>
          <button class="datePicker-button datePicker-right">${'>'}</button>
        </div>
        <ul class="datePicker-days"></ul>
        <div class="datePicker-body">
        </div>
      </div>`;
    }

    return '';
  }

  convertDayOfTheWeekToHTML() {
    return DAY_OF_THE_WEEK.map(day => `<li class="datePicker-day">${day}</li>`).join('');
  }

  convertCalendarDaysToHTML(year, month) {
    const calendarHTMLs = [];
    const {
      prevMonthLastDate,
      thisMonthFirstDate,
      thisMonthLastDate,
      nextMonthFirstDate
    } = this.extractFromDate(year, month);
    this.pushPrevDate(prevMonthLastDate, thisMonthFirstDate, calendarHTMLs);
    this.pushNowDate(thisMonthFirstDate, thisMonthLastDate, calendarHTMLs);
    this.pushNextDate(nextMonthFirstDate, calendarHTMLs);
    return calendarHTMLs.join('');
  }

  extractFromDate(year, month) {
    return {
      prevMonthLastDate: new Date(year, month, 0),
      thisMonthFirstDate: new Date(year, month, 1),
      thisMonthLastDate: new Date(year, month + 1, 0),
      nextMonthFirstDate: new Date(year, month + 1, 1)
    };
  }

  pushPrevDate(prevMonthLastDate, thisMonthFirstDate, array) {
    for (let d = 0; d < thisMonthFirstDate.getDay(); d++) {
      array.push(`<div
          class="${d % 7 === 0 ? 'datePicker-sun' : ''} datePicker-day prev-month"
        >
        </div>`);
    }
  }

  pushNowDate(thisMonthFirstDate, thisMonthLastDate, array) {
    const today = new Date();
    const isToday = today.getFullYear() === this.state.year && today.getMonth() === this.state.month - 1;

    for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
      array.push(`<div
          class="
            ${isToday && today.getDate() === d + 1 ? 'datePicker-today' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'datePicker-sun' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'datePicker-sat' : ''}
            datePicker-day now-month
          "
          data-date=${d + 1}
        >
          <span>${d + 1}</span>
        </div>`);
    }
  }

  pushNextDate(nextMonthFirstDate, array) {
    let renderCount = 7 - array.length % 7;

    if (array.length + renderCount === 35) {
      renderCount += 7;
    }

    for (let d = 0; d < renderCount; d++) {
      array.push(`<div
          class="
            ${(nextMonthFirstDate.getDay() + d) % 7 === 0 ? 'datePicker-sun' : ''}
            ${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? 'datePicker-sat' : ''}
            datePicker-day next-month
          "
        >
        </div>`);
    }
  }

  onClickLeft(e) {
    e.stopPropagation();

    if (this.state.month === 1) {
      this.setState({ ...this.state,
        month: 12,
        year: this.state.year - 1
      });
      return;
    }

    this.setState({ ...this.state,
      month: this.state.month - 1
    });
  }

  onClickRight(e) {
    e.stopPropagation();

    if (this.state.month === 12) {
      this.setState({ ...this.state,
        month: 1,
        year: this.state.year + 1
      });
      return;
    }

    this.setState({ ...this.state,
      month: this.state.month + 1
    });
  }

}
;// CONCATENATED MODULE: ./src/components/InputBar/InputBar.ts








let dummyPayment = ['신한카드', '계좌이체', '현금'];
class InputBar extends Component {
  constructor($target, state) {
    super($target, state);
    listenByElement($target, 'selectCashbook', e => {
      this.setState(e.detail);
    });
  }

  setup() {}

  mounted() {
    this.setPaymentList();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker');
    new DatePicker($datePickerBox, history.state);
    listenByElement($datePickerBox, 'date-change', e => {
      this.setState({
        date: e.detail.date
      });
    });
  }

  template() {
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
          <img src="${arrow_down}">
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
          <img src="${arrow_down}">
        </div>
        <ul class="input-dropdown"></ul>
      </div>
      <div class="input-bar__price">
        <label>금액</label>
        <div>
          <span class="payment-type ${this.state.categoryType}">${this.state.categoryType === 'income' ? '+' : '-'}</span>
          <input type="text" value="${this.getCurrentPrice()}" class="${this.state.categoryType}">
          <label>원</label>
          <div class="submit"><div></div></div>
        </div>
      </div>
    `;
  }

  setEvent() {
    const $date = this.$target.querySelector('.input-bar__date input');
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker');
    const $categoryValue = this.$target.querySelector('.category-value');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    const $memoInput = this.$target.querySelector('.input-bar__memo input');
    const $paymentValue = this.$target.querySelector('.payment-value');
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $priceInput = this.$target.querySelector('.input-bar__price input');
    const $submitButton = this.$target.querySelector('.submit');
    $date === null || $date === void 0 ? void 0 : $date.addEventListener('click', this.datePickerOpenHandler.bind(this));
    $date === null || $date === void 0 ? void 0 : $date.addEventListener('change', this.inputChnageHandler.bind(this));
    $categoryValue === null || $categoryValue === void 0 ? void 0 : $categoryValue.addEventListener('click', e => this.categoryOpenHandler(e));
    $categoryDropdown === null || $categoryDropdown === void 0 ? void 0 : $categoryDropdown.addEventListener('click', this.categoryClickHandler.bind(this));
    $memoInput === null || $memoInput === void 0 ? void 0 : $memoInput.addEventListener('change', this.memoChangeHandler.bind(this));
    $paymentValue === null || $paymentValue === void 0 ? void 0 : $paymentValue.addEventListener('click', e => this.paymentOpenHandler(e));
    $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.addEventListener('click', this.paymentClickHandler.bind(this));
    $priceInput === null || $priceInput === void 0 ? void 0 : $priceInput.addEventListener('keyup', this.priceInputHandler.bind(this));
    $priceInput === null || $priceInput === void 0 ? void 0 : $priceInput.addEventListener('change', this.priceChangeHandler.bind(this));
    $submitButton === null || $submitButton === void 0 ? void 0 : $submitButton.addEventListener('click', this.addCashbook.bind(this));
    document.addEventListener('click', () => {
      $datePickerBox.style.display = 'none';
      $categoryDropdown === null || $categoryDropdown === void 0 ? void 0 : $categoryDropdown.classList.remove('open');
      $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.classList.remove('open');
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

  datePickerOpenHandler(e) {
    e.stopPropagation();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker');
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    $categoryDropdown === null || $categoryDropdown === void 0 ? void 0 : $categoryDropdown.classList.remove('open');
    $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.classList.remove('open');
    $datePickerBox.style.display = 'block';
  }

  inputChnageHandler(e) {
    this.setState({
      date: e.target.value
    });
  }

  categoryOpenHandler(e) {
    e.stopPropagation();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker');
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    $datePickerBox.style.display = 'none';
    $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.classList.remove('open');
    $categoryDropdown === null || $categoryDropdown === void 0 ? void 0 : $categoryDropdown.classList.toggle('open');
  }

  categoryClickHandler(e) {
    var _clickedElement$paren;

    const clickedElement = e.target;
    if (!(clickedElement instanceof HTMLLIElement)) return;
    let categoryType, category;

    if ((_clickedElement$paren = clickedElement.parentElement) !== null && _clickedElement$paren !== void 0 && _clickedElement$paren.classList.contains('category-income')) {
      categoryType = 'income';
    } else {
      categoryType = 'expenditure';
    }

    category = clickedElement.innerText;
    this.setState({
      categoryType: categoryType,
      category: category
    });
  }

  memoChangeHandler(e) {
    this.setState({
      memo: e.target.value
    });
  }

  paymentOpenHandler(e) {
    e.stopPropagation();
    const $datePickerBox = this.$target.querySelector('.input-bar__date-picker');
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    const $categoryDropdown = this.$target.querySelector('.input-bar__category .input-dropdown');
    $datePickerBox.style.display = 'none';
    $categoryDropdown === null || $categoryDropdown === void 0 ? void 0 : $categoryDropdown.classList.remove('open');
    $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.classList.toggle('open');
  }

  paymentClickHandler(e) {
    const clickedElement = e.target;
    if (!(clickedElement instanceof HTMLLIElement)) return;
  }

  priceInputHandler(e) {
    const input = e.target;
    const value = Number(input.value.replaceAll(',', ''));
    input.value = value.toLocaleString();
  }

  priceChangeHandler(e) {
    const input = e.target;
    this.setState({
      price: Number(input.value.replaceAll(',', ''))
    });
  }

  async addCashbook() {
    const {
      date,
      category,
      categoryType,
      memo,
      payment,
      price
    } = this.state;

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
      price: finalPrice
    });
  }

  setPaymentList() {
    const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
    dummyPayment.forEach(item => {
      const $item = document.createElement('li');
      const $deleteButton = document.createElement('img');
      $item.innerText = item;
      $item.setAttribute('data-value', item);
      $item.addEventListener('click', () => {
        this.setState({
          payment: item
        });
      });
      $deleteButton.setAttribute('src', deleteIcon);
      $deleteButton.addEventListener('click', e => this.deletePayment(e, item));
      $item.appendChild($deleteButton);
      $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.appendChild($item);
    });
    const $addButton = document.createElement('li');
    $addButton.innerText = '추가하기';
    $addButton.addEventListener('click', this.addPayment);
    $paymentDropdown === null || $paymentDropdown === void 0 ? void 0 : $paymentDropdown.appendChild($addButton);
  }

  async addPayment() {
    const result = await Confirm('추가하실 결제수단을 적어주세요.');

    if (result) {
      dummyPayment.push(result); // 서버로 추가 요청 보내기

      this.setState({
        payment: result
      });
    }
  }

  async deletePayment(e, payment) {
    e.stopPropagation();
    const result = await Alert(`결제수단 <span>${payment}</span>를 삭제 하시겠습니다?`);

    if (result) {
      var _$item$parentElement;

      const $paymentDropdown = this.$target.querySelector('.input-bar__payment .input-dropdown');
      const $item = $paymentDropdown.querySelector(`[data-value="${payment}"]`);
      (_$item$parentElement = $item.parentElement) === null || _$item$parentElement === void 0 ? void 0 : _$item$parentElement.removeChild($item);
      dummyPayment = dummyPayment.filter(dummyPayment => dummyPayment !== payment); // 서버로 삭제 요청 보내기

      if (this.state.payment === payment) {
        this.setState({
          payment: ''
        });
      }
    }
  }

}
;// CONCATENATED MODULE: ./src/constants/category.ts
const EXPENDITURE = 'expenditure';
const INCOME = 'income';
const INCOME_CATEGORY = (/* unused pure expression or super */ null && (['월급', '용돈', '기타수입']));
const EXPENDITURE_CATEGORY = {
  식비: '#4CA1DE',
  생활: '#4A6CC3',
  '쇼핑/뷰티': '#4CB8B8',
  교통: '#94D3CC',
  '의료/건강': '#6ED5EB',
  '문화/여가': '#D092E2',
  미분류: '#817DCE'
};
const CATEGORY_COLOR = {
  식비: '#4CA1DE',
  생활: '#4A6CC3',
  '쇼핑/뷰티': '#4CB8B8',
  교통: '#94D3CC',
  '의료/건강': '#6ED5EB',
  '문화/여가': '#D092E2',
  미분류: '#817DCE',
  월급: '#B9D58C',
  용돈: '#cc5527',
  기타수입: '#F5F5F5'
};
;// CONCATENATED MODULE: ./src/constants/rollingNumber.ts
const ROLLING_NUMBER = `0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9`;
;// CONCATENATED MODULE: ./src/views/MainView/MainView.ts








const dummy = {
  totalElements: 3,
  totalIncome: 60000,
  totalExpenditure: -55340,
  cashbooks: [{
    id: 1,
    category: '문화/여가',
    category_type: 'expenditure',
    memo: '스트리밍서비스 정기 결제',
    payment: '현대카드',
    price: -10900,
    date: '2021-07-15'
  }, {
    id: 2,
    category: '교통',
    category_type: 'expenditure',
    memo: '후불 교통비 결제',
    payment: '현대카드',
    price: -45340,
    date: '2021-07-15'
  }, {
    id: 3,
    category: '용돈',
    category_type: 'income',
    memo: '7월 용돈',
    payment: '현금',
    price: 60000,
    date: '2021-07-14'
  }]
};
class MainView extends Component {
  constructor($target, state) {
    super($target, { ...state,
      incomeChecked: true,
      expenditureChecked: true,
      totalElement: 0,
      totalIncome: 0,
      totalExpenditure: 0,
      cashbooks: []
    });
    model.subscribe('statechange', data => {
      if (data.path !== '/') return;
      this.setState(data);
      this.setCashbookData(this.state.year, this.state.month);
    });
  }

  setup() {}

  mounted() {
    const $inputBar = document.querySelector('.input-bar');
    const $cashbookList = document.querySelector('.cashbook-list');
    new InputBar($inputBar, {
      addCashBook: this.addCashbook.bind(this)
    });
    this.setCashbookList($cashbookList);
  }

  template() {
    return `
      <div class="main-view">
        <div class="input-bar"></div>
        <div class="content">
          <div class="header">
            <div class="total-elements">전체 내역 ${this.makeRollingNumber(String(this.getTotalElement()))}건</div>
            <div class="selector">
              <input id="checkbox-income" type="checkbox" hidden ${this.state.incomeChecked ? 'checked' : ''}>
              <label for="checkbox-income" class="checkmark"></label>
              <div class="income">
                <label>수입</label>
                ${this.makeRollingNumber(this.state.totalIncome.toLocaleString())}
              </div>

              <input id="checkbox-expenditure" type="checkbox" hidden ${this.state.expenditureChecked ? 'checked' : ''}>
              <label for="checkbox-expenditure" class="checkmark"></label>
              <div class="expenditure">
                <label>지출</label>
                ${this.makeRollingNumber(this.state.totalExpenditure.toLocaleString())}
              </div>
            </div>
          </div>
          <ul class="cashbook-list"></ul>
        </div>
      </div>
    `;
  }

  setEvent() {
    const $incomeCheckbox = this.$target.querySelector('#checkbox-income');
    const $expenditureCheckbox = this.$target.querySelector('#checkbox-expenditure');
    $incomeCheckbox === null || $incomeCheckbox === void 0 ? void 0 : $incomeCheckbox.addEventListener('change', () => {
      this.setState({
        incomeChecked: $incomeCheckbox.checked
      });
    });
    $expenditureCheckbox === null || $expenditureCheckbox === void 0 ? void 0 : $expenditureCheckbox.addEventListener('change', () => {
      this.setState({
        expenditureChecked: $expenditureCheckbox.checked
      });
    });
  }

  setCashbookData(year, month) {
    // 서버 요청
    const result = dummy;
    this.setState({
      totalElement: result.totalElements,
      totalIncome: result.totalIncome,
      totalExpenditure: result.totalExpenditure,
      cashbooks: result.cashbooks
    });
  }

  getMonth() {
    return this.state.month;
  }

  getTotalElement() {
    const {
      incomeChecked,
      expenditureChecked
    } = this.state;
    return this.state.cashbooks.filter(cashbook => cashbook.category_type === 'income' && incomeChecked || cashbook.category_type === 'expenditure' && expenditureChecked).length;
  }

  setCashbookList($cashbookList) {
    this.registerCashbookToList($cashbookList);
  }

  registerCashbookToList($list) {
    const year = this.state.year;
    let month = String(this.state.month);
    const {
      incomeChecked,
      expenditureChecked
    } = this.state;
    if (Number(month) < 10) month = '0' + month;
    let animationIndex = 1;

    for (let i = 31; i >= 1; i--) {
      const cashbooks = this.state.cashbooks.filter(cashbook => cashbook.date === `${year}-${month}-${i}`).filter(cashbook => cashbook.category_type === 'income' && incomeChecked || cashbook.category_type === 'expenditure' && expenditureChecked);
      if (cashbooks.length === 0) continue;
      const dayIndex = new Date(year, Number(month) - 1, i).getDay();
      const totalIncome = cashbooks.reduce((a, cashbook) => {
        if (cashbook.category_type === 'income') return Number(cashbook.price) + a;
        return a;
      }, 0);
      const totalExpenditure = cashbooks.reduce((a, cashbook) => {
        if (cashbook.category_type === 'expenditure') return Number(cashbook.price) + a;
        return a;
      }, 0);
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="header">
          <div class="date">
            <label>${month}월 ${i}일</label>
            <label>${DAY_OF_THE_WEEK[dayIndex]}</label>
          </div>
          <div class="total">${this.getTotalCash(totalIncome, totalExpenditure)}</div>
        </div>
        <ul class="cashbook-items"></ul>
      `;
      const $header = li.querySelector('.header');
      $header.style.animationDuration = String(animationIndex++ * 500) + 'ms';
      const $cashBookitems = li.querySelector('.cashbook-items');
      cashbooks.forEach(cashbook => {
        const $cashbookItem = document.createElement('li');
        $cashbookItem.style.animationDuration = String(animationIndex++ * 500) + 'ms';
        $cashbookItem.innerHTML = `
          <div class="category" style="background-color: ${CATEGORY_COLOR[cashbook.category]}">${cashbook.category}</div>
          <div class="memo">${cashbook.memo}</div>
          <div class="payment">${cashbook.payment}</div>
          <div class="price ${cashbook.category_type}">${cashbook.price.toLocaleString()}</div>
        `;
        $cashbookItem.addEventListener('click', e => {
          triggerByElement(document.querySelector('.input-bar'), 'selectCashbook', {
            date: cashbook.date,
            category: cashbook.category,
            category_type: cashbook.category_type,
            price: cashbook.price * (cashbook.category_type === 'expenditure' ? -1 : 1),
            memo: cashbook.memo,
            payment: cashbook.payment
          });
        });
        $cashBookitems.appendChild($cashbookItem);
      });
      $list.appendChild(li);
    }
  }

  addCashbook(cashbook) {
    this.setState({
      cashbooks: [...this.state.cashbooks, cashbook]
    });
  }

  getTotalCash(totalIncome, totalExpenditure) {
    let result = '';
    result += totalIncome === 0 ? '' : `<label>수입 ${totalIncome.toLocaleString()}</label>`;
    result += totalExpenditure === 0 ? '' : `<label>지출 ${totalExpenditure.toLocaleString()}</label>`;
    return result;
  }

  makeRollingNumber(total) {
    const convertedHTML = Array.from(total).map(txt => {
      if (this.isNumeric(txt)) {
        return `<div class="rolling-container">
            <span class="rolling-real-text">${txt}</span>
            <div class="rolling-text" style="top : ${-2000 - parseInt(txt) * 100}%;animation-duration: ${1000 + Math.random() * 10 * 60}ms;">${ROLLING_NUMBER}</div>
          </div>`;
      }

      return `<div class="not-rolling-text">${txt}</div>`;
    }).join('');
    return convertedHTML;
  }

  isNumeric(data) {
    return !isNaN(Number(data));
  }

}
;// CONCATENATED MODULE: ./src/components/Navigator/Navigator.ts




class Navigator extends Component {
  constructor($target, state) {
    super($target, state);
    this.$state = state;
    model.subscribe('statechange', data => {
      const {
        month,
        year
      } = data;
      this.setState({
        month,
        year
      });
    });
    this.render();
  }

  setState(nextState) {
    this.$state = { ...this.$state,
      ...nextState
    };
    this.render();
  }

  template() {
    var _this$$state, _this$$state2;

    return `
      <button class="header-navigator-left">${'<'}</button>
      <div class="header-navigator-date">
        <h2 class="header-navigator-month">${(_this$$state = this.$state) === null || _this$$state === void 0 ? void 0 : _this$$state.month}월</h2>
        <span class="header-navigator-year">${(_this$$state2 = this.$state) === null || _this$$state2 === void 0 ? void 0 : _this$$state2.year}</span>
      </div>
      <button class="header-navigator-right">${'>'}</button>
    `;
  }

  setEvent() {
    var _document$querySelect, _document$querySelect2;

    (_document$querySelect = document.querySelector('.header-navigator-left')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', this.onClickLeftButton.bind(this));
    (_document$querySelect2 = document.querySelector('.header-navigator-right')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.addEventListener('click', this.onClickRightButton.bind(this));
  }

  onClickLeftButton() {
    this.$state.month === 1 ? trigger('statechange', { ...history.state,
      month: 12,
      year: this.$state.year - 1
    }) : trigger('statechange', { ...history.state,
      month: this.$state.month - 1
    });
  }

  onClickRightButton() {
    this.$state.month === 12 ? trigger('statechange', { ...history.state,
      month: 1,
      year: this.$state.year + 1
    }) : trigger('statechange', { ...history.state,
      month: this.$state.month + 1
    });
  }

}
;// CONCATENATED MODULE: ./public/images/calendarIcon.svg
/* harmony default export */ const calendarIcon = (__webpack_require__.p + "public/images/calendarIcon.svg");
;// CONCATENATED MODULE: ./public/images/chartIcon.svg
/* harmony default export */ const chartIcon = (__webpack_require__.p + "public/images/chartIcon.svg");
;// CONCATENATED MODULE: ./public/images/docsIcon.svg
/* harmony default export */ const docsIcon = (__webpack_require__.p + "public/images/docsIcon.svg");
;// CONCATENATED MODULE: ./public/images/githubIcon.svg
/* harmony default export */ const githubIcon = (__webpack_require__.p + "public/images/githubIcon.svg");
;// CONCATENATED MODULE: ./public/images/doorIcon.svg
/* harmony default export */ const doorIcon = (__webpack_require__.p + "public/images/doorIcon.svg");
;// CONCATENATED MODULE: ./src/apis/authAPI.ts

const getAuth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth`, {
      method: 'GET',
      credentials: 'include'
    });
    return res.ok;
  } catch (error) {
    console.log(error);
  }
};
const logout = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST'
    });
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};
;// CONCATENATED MODULE: ./src/views/HeaderView/HeaderView.ts












class HeaderView extends Component {
  constructor($target, state) {
    super($target, state);
    model.subscribe('statechange', () => {
      this.handleIconWhenChangeState(history.state.path);
      this.handleAuthIcon();
    });
  }

  mounted() {
    const navigator = new Navigator(document.querySelector('.header-navigator-wrapper'), this.state);
  }

  template() {
    return `
    <div class="header-content-container">
      <button class="header-home">우아한 가계부</button>
      <div class="header-navigator-wrapper"></div>
      <div class="header-icon-container">
        <div class="header-button-container"> 
          <button class="header-button header-docs"><img class="header-icon docs-icon" src="${docsIcon}"/></button>
          <button class="header-button header-calendar"><img class="header-icon calendar-icon" src="${calendarIcon}"/></button>
          <button class="header-button header-chart"><img class="header-icon chart-icon" src="${chartIcon}"/></button>
        </div>
        <button class="header-button header-login"><img class="header-icon login-icon" src="${githubIcon}"></button>
        <button class="header-button header-logout"><img class="header-icon login-icon" src="${doorIcon}"></button>
      </div>
    </div>`;
  }

  setEvent() {
    const $homeButton = document.querySelector('.header-home');
    const $docsButton = document.querySelector('.header-docs');
    const $calendarButton = document.querySelector('.header-calendar');
    const $chartButton = document.querySelector('.header-chart');
    const $loginButton = document.querySelector('.header-login');
    const $logoutButton = document.querySelector('.header-logout');
    $homeButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state,
        path: '/'
      });
    });
    $docsButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state,
        path: '/'
      });
    });
    $calendarButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state,
        path: '/calendar'
      });
    });
    $chartButton.addEventListener('click', () => {
      trigger('statechange', { ...history.state,
        path: '/chart'
      });
    });
    $loginButton.addEventListener('click', async () => {
      location.href = GITHUB_SIGN_URL;
    });
    $logoutButton.addEventListener('click', async () => {
      await logout();
      this.handleAuthIcon();
    });
  }

  resetButtonClickedClass() {
    const elements = document.querySelectorAll('.header-button');
    elements.forEach(el => el.classList.remove('icon-clicked'));
  }

  handleIconWhenChangeState(path) {
    const $docsButton = document.querySelector('.header-docs');
    const $calendarButton = document.querySelector('.header-calendar');
    const $chartButton = document.querySelector('.header-chart');
    this.resetButtonClickedClass();

    if (path === '/') {
      $docsButton.classList.add('icon-clicked');
    } else if (path === '/calendar') {
      $calendarButton.classList.add('icon-clicked');
    } else if (path === '/chart') {
      $chartButton.classList.add('icon-clicked');
    }
  }

  async handleAuthIcon() {
    const isLoggedIn = await this.checkIsLogged();
    const $login = document.querySelector('.header-login');
    const $logout = document.querySelector('.header-logout');
    $login.style.display = 'none';
    $logout.style.display = 'none';

    if (isLoggedIn) {
      $logout.style.display = 'block';
    } else {
      $login.style.display = 'block';
    }
  }

  async checkIsLogged() {
    const result = await getAuth();
    return result;
  }

}
;// CONCATENATED MODULE: ./src/utils/formatPrice.ts
function formatPrice(price) {
  const number = String(price).replace(/[^0-9]/g, '');
  if (!number) return '';
  const converted = Number(number).toLocaleString();
  return converted;
}
;// CONCATENATED MODULE: ./src/components/Calendar/Calendar.ts



class Calendar extends Component {
  constructor($target, state) {
    super($target, state);
  }

  template() {
    if (this.state) {
      const {
        year,
        month
      } = this.state;
      return `
      ${this.convertCalendarDaysToHTML(year, month - 1)}
    `;
    }

    return '';
  }

  convertCalendarDaysToHTML(year, month) {
    const calendarHTMLs = [];
    const {
      prevMonthLastDate,
      thisMonthFirstDate,
      thisMonthLastDate,
      nextMonthFirstDate
    } = this.extractFromDate(year, month);
    this.pushPrevDate(prevMonthLastDate, thisMonthFirstDate, calendarHTMLs);
    this.pushNowDate(thisMonthFirstDate, thisMonthLastDate, calendarHTMLs);
    this.pushNextDate(nextMonthFirstDate, calendarHTMLs);
    return calendarHTMLs.join('');
  }

  extractFromDate(year, month) {
    return {
      prevMonthLastDate: new Date(year, month, 0),
      thisMonthFirstDate: new Date(year, month, 1),
      thisMonthLastDate: new Date(year, month + 1, 0),
      nextMonthFirstDate: new Date(year, month + 1, 1)
    };
  }

  pushPrevDate(prevMonthLastDate, thisMonthFirstDate, array) {
    for (let d = 0; d < thisMonthFirstDate.getDay(); d++) {
      array.push(`<div
          class="${d % 7 === 0 ? 'calendar-sun' : ''} calendar-day prev-month"
        >
          <span>${prevMonthLastDate.getDate() - thisMonthFirstDate.getDay() + d + 1}</span>
        </div>`);
    }
  }

  pushNowDate(thisMonthFirstDate, thisMonthLastDate, array) {
    const today = new Date();
    const isToday = today.getFullYear() === this.state.year && today.getMonth() === this.state.month - 1;

    for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
      array.push(`<div
          class="
            ${isToday && today.getDate() === d + 1 ? 'calendar-today' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'calendar-sun' : ''}
            ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'calendar-sat' : ''}
            calendar-day now-month
          "
        >
        ${this.pushHistory(d + 1)}
        <span>${d + 1}</span>
        </div>`);
    }
  }

  pushNextDate(nextMonthFirstDate, array) {
    let renderCount = 7 - array.length % 7;

    if (array.length + renderCount === 35) {
      renderCount += 7;
    }

    for (let d = 0; d < renderCount; d++) {
      array.push(`<div
          class="
            ${(nextMonthFirstDate.getDay() + d) % 7 === 0 ? 'calendar-sun' : ''}
            ${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? 'calendar-sat' : ''}
            calendar-day next-month
          "
        >
          <span>${d + 1}</span>
        </div>`);
    }
  }

  pushHistory(date) {
    if (!this.state.data[date]) return '';
    const {
      income,
      expenditure,
      total
    } = this.state.data[date];
    return `
    <p class="calendar-income">+${formatPrice(income)}</p>
    <p class="calendar-expenditure">-${formatPrice(expenditure)}</p>
    <p class="calendar-total">${total >= 0 ? formatPrice(total) : '-' + formatPrice(total)}</p>
    `;
  }

  mounted() {}

  setEvent() {}

}
;// CONCATENATED MODULE: ./src/views/CalendarView/CalendarView.ts







class CalendarView extends Component {
  constructor($target, state) {
    super($target, state);
    model.subscribe('updateHistory', data => {
      if (data.path !== '/calendar') return;
      const newState = this.processData(data);
      this.setState(newState);
    });
  }

  setup() {}

  mounted() {
    const $calendarBody = document.querySelector('.calendar-body');
    new Calendar($calendarBody, this.state);
  }

  template() {
    const {
      total,
      expenditureTotal,
      incomeTotal
    } = this.state;
    return `<div class="calendar-container">
    <ul class="calendar-header">
      ${this.convertDayOfTheWeekToHTML()}
    </ul>
    <div class="calendar-body"></div>
    <div class="calendar-footer">
      <div class="calendar-footer-left">
        <span class="calendar-total-income">총 수입: ${this.formatTotal(incomeTotal)}</span>
        <span class="calendar-total-expenditure">총 지출: ${this.formatTotal(expenditureTotal)}</span>
      </div>
      <div class="calendar-footer-right">
        <span>총계: ${this.formatTotal(total)}</span>
      </div>
    </div>
    </div>`;
  }

  setEvent() {}

  convertDayOfTheWeekToHTML() {
    return DAY_OF_THE_WEEK.map(day => `<li class="calendar-header-day">${day}</li>`).join('');
  }

  formatTotal(total) {
    if (total < 0) {
      return '-' + formatPrice(total);
    }

    return '+' + formatPrice(total);
  }

  processData(updateData) {
    const data = {};
    let [total, incomeTotal, expenditureTotal] = [0, 0, 0];
    updateData.data.forEach(item => {
      const price = item.price;
      const key = new Date(item.date).getDate();

      if (!data[key]) {
        data[key] = this.initialCalendarData();
      }

      if (item.category_type === INCOME) {
        data[key].income += price;
        incomeTotal += price;
      } else {
        data[key].expenditure += price;
        expenditureTotal += price;
      }

      data[key].total += price;
      total += price;
    });
    return { ...updateData,
      data,
      total,
      expenditureTotal,
      incomeTotal
    };
  }

  initialCalendarData() {
    return {
      income: 0,
      expenditure: 0,
      total: 0
    };
  }

}
;// CONCATENATED MODULE: ./src/components/BarChart/BarChart.ts





class BarChart extends Component {
  constructor($target, state) {
    super($target, state);
  }

  setEvent() {
    const $container = document.querySelector('.bar-container');
    $container.addEventListener('click', e => {
      const target = e.target;
      const el = target.closest('.bar-expenditure-container');

      if (el && el.dataset.category) {
        // TODO: 추후에 date 받아서 입력할 년월일 계산하여 6개월 데이터 받아와야 함.
        console.log(this.state.year, this.state.month, el.dataset.category);
      }
    });
  }

  mounted() {
    if (this.state.data) {
      const $total = document.querySelector('.bar-total-expenditure');
      const $container = document.querySelector('.bar-container');
      $total.innerHTML += this.makeRollingNumber(formatPrice(this.state.total));
      $container.innerHTML = this.makeBarGraph(this.state.data);
      const $barAll = [...Array.from(document.querySelectorAll('.bar-percent'))];
      $barAll.forEach(($bar, i) => {
        setTimeout(() => {
          $bar.style.width = `${$bar.dataset.percent}%`;
        }, i * 50);
      });
    }
  }

  template() {
    return `
    <div class="bar-total-expenditure"> 
      <span class="bar-total-expenditure-title">이번 달 지출 금액 :</span>
    </div>
    <div class="bar-container"></div>`;
  }

  makeBarGraph(data) {
    return data.map(item => this.convertToBarHTML(item)).join('');
  }

  convertToBarHTML(data) {
    return `
    <div class="bar-expenditure-container" data-category=${data.category}>
      <div class="bar-expenditure-left">
        <div class="bar-category" style="background-color:${EXPENDITURE_CATEGORY[data.category]}">${data.category}</div>
        <div class="bar-percent-text-container">
          ${this.makeRollingNumber(String(data.percent))}
          <span class="bar-percent-ex">%</span>
        </div>
        <div class="bar-percent-container">
          <div class="bar-percent" 
              style="background-color:${EXPENDITURE_CATEGORY[data.category]}" 
              data-percent=${data.percent}>
          </div>
        </div>
      </div>
      <div class="bar-expenditure-right">${this.makeRollingNumber(formatPrice(data.total))}</div>
    </div>`;
  }

  makeRollingNumber(total) {
    const convertedHTML = Array.from(total).map(txt => {
      if (this.isNumeric(txt)) {
        return `<div class="rolling-container">
            <span class="rolling-real-text">${txt}</span>
            <div class="rolling-text" style="top : ${-2000 - parseInt(txt) * 100}%;animation-duration: ${1000 + Math.random() * 10 * 60}ms;">${ROLLING_NUMBER}</div>
          </div>`;
      }

      return `<div class="not-rolling-text">${txt}</div>`;
    }).join('');
    return convertedHTML;
  }

  isNumeric(data) {
    return !isNaN(Number(data));
  }

}
;// CONCATENATED MODULE: ./src/components/DonutChart/DonutChart.ts



const DonutChart_dummy = [{
  category: '생활',
  percent: 64,
  total: 536460
}, {
  category: '의료/건강',
  percent: 15,
  total: 125300
}, {
  category: '쇼핑/뷰티',
  percent: 7,
  total: 56000
}, {
  category: '교통',
  percent: 6,
  total: 45340
}, {
  category: '식비',
  percent: 5,
  total: 40540
}, {
  category: '문화/여가',
  percent: 2,
  total: 20800
}, {
  category: '미분류',
  percent: 1,
  total: 10200
}];
class DonutChart extends Component {
  constructor($target, state) {
    super($target, state);
  }

  mounted() {
    if (this.state.data) {
      const $container = document.querySelector('.donut-container');
      const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      $svg.setAttribute('width', '100%');
      $svg.setAttribute('height', '100%');
      $svg.setAttribute('viewBox', '0 0 100 100');
      this.appendCircle($svg, this.state.data);
      $container === null || $container === void 0 ? void 0 : $container.appendChild($svg);
    }
  }

  template() {
    return '<div class="donut-container"></div>';
  }

  appendCircle($svg, data) {
    const [startAngle, radius, cx, cy, strokeWidth, animationDuration] = [-90, 30, '50', '50', '10', 700];
    const dashArray = 2 * Math.PI * radius;
    let filled = 0;
    data.forEach(item => {
      const dashOffset = dashArray - dashArray * item.percent / 100;
      const angle = filled * 360 / 100 + startAngle;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const currentDuration = animationDuration * item.percent / 100;
      const delay = animationDuration * filled / 100;
      circle.setAttribute('r', String(radius));
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('stroke', EXPENDITURE_CATEGORY[item.category]);
      circle.setAttribute('stroke-width', strokeWidth);
      circle.setAttribute('stroke-dasharray', String(dashArray));
      circle.setAttribute('stroke-dashoffset', String(dashArray));
      circle.setAttribute('transform', 'rotate(' + angle + ' ' + cx + ' ' + cy + ')');
      circle.style.transition = 'stroke-dashoffset ' + currentDuration + 'ms linear ' + delay + 'ms';
      filled += item.percent;
      $svg.appendChild(circle);
      setTimeout(() => {
        circle.setAttribute('stroke-dashoffset', String(dashOffset));
      }, 100);
    });
  }

}
;// CONCATENATED MODULE: ./src/views/ChartView/ChartView.ts





class ChartView extends Component {
  constructor($target, state) {
    super($target, state);
    model.subscribe('updateHistory', data => {
      if (data.path !== '/chart') return;
      this.setState(data);
    });
  }

  mounted() {
    if (this.state) {
      const $donutContainer = document.querySelector('.donut-chart-container');
      const $barContainer = document.querySelector('.bar-chart-container');
      new DonutChart($donutContainer, this.state);
      new BarChart($barContainer, this.state);
    }
  }

  template() {
    if (this.state) {
      return `
      <div class="chart-container">
        <div class="main-chart-container">
          <div class="donut-chart-container"></div>
          <div class="bar-chart-container"></div>
        </div>
      </div>`;
    }

    return '';
  }

}
;// CONCATENATED MODULE: ./src/router.ts






class Router {
  constructor($header, $wrapper) {
    this.$wrapper = $wrapper;
    new HeaderView($header, {
      isLoggedIn: false
    });
    new MainView($wrapper, {});
    new CalendarView($wrapper, {
      total: 0,
      incomeTotal: 0,
      expenditureTotal: 0,
      data: {}
    });
    new ChartView($wrapper, {
      data: [],
      total: 0
    });
    listen('statechange', this.stateChangeHandler.bind(this));
    window.addEventListener('popstate', this.popstateHandler.bind(this));
  }

  async stateChangeHandler(event) {
    history.pushState(event.detail, '', event.detail.path);
    model.publish('statechange', { ...history.state
    });
  }

  async popstateHandler() {
    if (history.state === null) return;
    model.publish('statechange', { ...history.state
    });
  }

}
;// CONCATENATED MODULE: ./src/index.ts



const $header = document.getElementById('header');
const $wrapper = document.getElementById('wrapper');
new Router($header, $wrapper);
trigger('statechange', history.state ?? {
  path: '/',
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  isFirst: true
});
/******/ })()
;
// type : 발생 시킬 event, data = { year, month, path, isFirst }
export function emit(type: string, data?: object): void {
  document.dispatchEvent(
    new CustomEvent(type, {
      detail: data,
    })
  );
}
export function subscribe(type: string, listener: EventListenerOrEventListenerObject): void {
  document.addEventListener(type, listener);
}

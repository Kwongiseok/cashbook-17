// type : 발생 시킬 event, data = { year, month, path, isFirst }
export function trigger(type: string, data?: object): void {
  document.dispatchEvent(
    new CustomEvent(type, {
      detail: data,
    })
  );
}
export function listen(type: string, listener: EventListenerOrEventListenerObject): void {
  document.addEventListener(type, listener);
}

export function triggerByElement(target: HTMLElement, type: string, data?: object): void {
  target.dispatchEvent(
    new CustomEvent(type, {
      detail: data,
    })
  );
}
export function listenByElement(target: HTMLElement, type: string, listener: EventListenerOrEventListenerObject): void {
  target.addEventListener(type, listener);
}

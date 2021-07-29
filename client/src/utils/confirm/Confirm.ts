import './Confirm.scss';

export default async (message: string): Promise<string | null> => {
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
    buttonCancel?.addEventListener('click', () => {
      confirmBackground.remove();
      resolve(null);
    });

    const buttonOk = confirm.querySelector('.btn-ok') as HTMLButtonElement;
    const input = confirm.querySelector('.input') as HTMLInputElement;

    buttonOk?.addEventListener('click', () => {
      if (input.value.length > 0) {
        const result = input.value;
        confirmBackground.remove();
        resolve(result);
      }
    });

    input?.addEventListener('change', () => {
      if (input.value.length > 0) {
        buttonOk.removeAttribute('disabled');
      } else {
        buttonOk.setAttribute('disabled', '');
      }
    });

    confirmBackground.addEventListener('click', (e: MouseEvent) => e.stopPropagation());
    document.body.appendChild(confirmBackground);
  });
};

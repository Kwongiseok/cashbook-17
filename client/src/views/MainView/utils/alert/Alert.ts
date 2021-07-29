import './Alert.scss';

export default async (message: string): Promise<boolean> => {
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
    buttonCancel?.addEventListener('click', () => {
      alertBackground.remove();
      resolve(false);
    });

    const buttonOk = alert.querySelector('.btn-ok');
    buttonOk?.addEventListener('click', () => {
      alertBackground.remove();
      resolve(true);
    });

    alertBackground.addEventListener('click', (e: MouseEvent) => e.stopPropagation());
    document.body.appendChild(alertBackground);
  });
};

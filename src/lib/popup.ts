const modifyFixedElements: boolean = false;

const setPaddingsToFixedElements = (scrollbar: number): void => {
  document.body.style.paddingRight = `${scrollbar}px`;

  if (!modifyFixedElements) return;

  const fixedElements = Array.from(document.all).filter(
    e => getComputedStyle(e as Element).position === 'fixed'
  ) as HTMLElement[];

  fixedElements.forEach(fix => {
    if (!fix.classList.contains('popup')) {
      fix.style.paddingRight = `${scrollbar}px`;
    }
  });
};

export const bodyLock = (): void => {
  const scrollbarWidth: number = window.innerWidth - document.body.offsetWidth;
  if (!document.body.classList.contains('locked')) {
    document.body.classList.add('locked');
    setPaddingsToFixedElements(scrollbarWidth);
  }
};

export const bodyUnlock = (): void => {
  if (document.body.classList.contains('locked')) {
    document.body.classList.remove('locked');
    setPaddingsToFixedElements(0);
  }
};

export const showPopup = (): void => {
  const popupEl = document.querySelector<HTMLElement>('.popup');
  if (popupEl) {
    popupEl.classList.add('is-open');
  }
};

export const hidePopup = (): void => {
  const popupEl = document.querySelector<HTMLElement>('.popup');
  if (popupEl && popupEl.classList.contains('is-open')) {
    popupEl.classList.remove('is-open');
  }
};

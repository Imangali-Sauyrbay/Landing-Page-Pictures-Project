import closeModals from './closeModals';
import { setMarginRight, removeMarginRight } from './setMargintoBody';

export default function() {
  let anyBtnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, shouldDestroy = false,  popupClasses = ['animated', 'fadeIn']) {
    
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    modal.classList.add(...popupClasses);

    trigger.forEach($el => $el.addEventListener('click', (e)=> {
      setModal('flex', 'modal-open')(e);
      if(shouldDestroy)
        $el.remove();
      
      anyBtnPressed = true;
    }));

    close.addEventListener('click', setModal('none', 'modal-open', 'remove'));
    
    modal.addEventListener('click', (e)=>{
      if(e.target === modal)
        setModal('none', 'modal-open', 'remove')(e);
    });

    function setModal(modalDisplayState, classForBody, method = 'add') {
      return (e) => {
        if(e.target && e.preventDefault){
          e.preventDefault();
        }
        closeModals();
        modal.style.display = modalDisplayState;
        document.body.classList[method](classForBody);
        method === 'add' ? setMarginRight() : removeMarginRight();
      };
    }
  }

  function showModalByTimeout(modalSelector, time){
    const modal = document.querySelector(modalSelector);

    let timeOutDebounce = null;
  
    function showModal(){
      clearTimeout(timeOutDebounce);

      timeOutDebounce = setTimeout(()=>{
        let canOpen = true;

        document.querySelectorAll('[data-modal]')
        .forEach($el => {
          if(getComputedStyle($el).display !== 'none')
            canOpen = false;
        });

        if(canOpen){
          modal.style.display = 'flex';
          document.body.classList.add('modal-open');
          setMarginRight();
        }
      }, time)

    }

    window.addEventListener('mousemove', showModal);
  }

  function clickByScrollTo(selector, yOffset = 0){
    window.addEventListener('scroll', () => {
      const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - yOffset;
      if(!anyBtnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){
        document.querySelector(selector).click();
      }
    });
  }



  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('[data-fixed-gift]', '.popup-gift', '.popup-gift .popup-close', true);
  clickByScrollTo('[data-fixed-gift]', 200)
  showModalByTimeout('.popup-consultation', 60000);

};

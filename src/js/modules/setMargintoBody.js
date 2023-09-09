import calcScrollBarWidth from "./calcScrollBarWidth";


const fixedGift = document.querySelector('[data-fixed-gift]');
const scrollWidth = calcScrollBarWidth();
const fixedGiftMargin = parseInt(getComputedStyle(fixedGift).right);

function setMarginRight(){
  document.body.style.marginRight = `${scrollWidth}px`;
  fixedGift.style.right = `${fixedGiftMargin + scrollWidth}px`
}

function removeMarginRight(){
  document.body.style.marginRight = `${0}px`;
  fixedGift.removeAttribute('style');
}

export {
  setMarginRight,
  removeMarginRight
}
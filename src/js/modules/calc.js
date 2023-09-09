export default function(size, material, options, promocode, result) {
  const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promoBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

  let summ = 0;

  const calcSumm = () => {
    summ = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

    if(!sizeBlock.value || !materialBlock.value){
      resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины!';
    } else if(promoBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(summ * .7);
    } else {
      resultBlock.textContent = summ;
    }
  }
  sizeBlock.addEventListener('change', calcSumm);
  materialBlock.addEventListener('change', calcSumm);
  optionsBlock.addEventListener('change', calcSumm);
  promoBlock.addEventListener('input', calcSumm);
}
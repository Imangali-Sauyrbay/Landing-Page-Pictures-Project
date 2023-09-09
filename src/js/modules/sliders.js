export default function(slides, dir, prev, next, interval = 3000){
  let slideIndex = 0,
      intervalId;
  const $elems = document.querySelectorAll(slides);
  
  function showSlide(n){
    if (n >= $elems.length){
      slideIndex = 0;
    }

    if(n < 0){
      slideIndex = $elems.length - 1;
    }

    $elems.forEach($el => {
      $el.classList.add('animated');
      $el.style.display = 'none';
    })

    $elems[slideIndex].style.display = 'block'
  }

  showSlide(slideIndex);

  function changeSlide(n){
    showSlide(slideIndex += n);
  }

  const clickHandler = (n) => (e) => {
    const r = 'slideInRight',
          l = 'slideInLeft';

    changeSlide(n);

    const $currElem = $elems[slideIndex];

    $currElem.classList.remove(n < 0 ? r : l);
    $currElem.classList.add(n < 0 ? l : r);
  }

  try{
    const nextBtn = document.querySelector(next),
    prevBtn = document.querySelector(prev);

    nextBtn.addEventListener('click', clickHandler(1));
    prevBtn.addEventListener('click', clickHandler(-1));

  } catch(e){}

  function activateInterval() {
    if(dir === 'vertical'){
      intervalId = setInterval(()=>{
        changeSlide(1);
        $elems[slideIndex].classList.add('fadeInDown');
      }, interval);
    }else{
      intervalId = setInterval(clickHandler(1), interval);
    } 
  }
  activateInterval();

  $elems[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  })
  $elems[0].parentNode.addEventListener('mouseleave', () => {
    activateInterval();
  })

}
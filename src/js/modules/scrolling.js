export default function(upSelector) {
  const toUpBtn = document.querySelector(upSelector);
  window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 1500){
      toUpBtn.classList.add('animated', 'fadeInUp');
      toUpBtn.classList.remove('fadeOutDown');
    } else {
      toUpBtn.classList.add('fadeOutDown');
      toUpBtn.classList.remove('fadeInUp');
    }
  })

  const links = [].slice.call(document.querySelectorAll('[href^="#"]')).filter(el => !!el.hash);
  let speed = 0.2;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      let widthTop = Math.round(document.body.scrollTop || document.documentElement.scrollTop),
          hash = link.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          start = null;

      requestAnimationFrame(step);

      function step(time) {
        if(start === null) start = time;

        let progress = time - start,
            y = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock)
            : Math.min(widthTop + progress / speed, widthTop + toBlock));
          
        document.documentElement.scrollTo(0, y);

        if(y != widthTop + toBlock){
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
}

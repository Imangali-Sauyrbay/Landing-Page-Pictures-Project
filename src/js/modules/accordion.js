export default function(triggersSelector) {
  const btns = document.querySelectorAll(triggersSelector);

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.classList.contains('accordion-heading') ?
      e.target
      : e.target.closest('.accordion-heading');

      target.classList.toggle('active-style');

      target.nextElementSibling.classList.toggle('active-content');

      if(target.classList.contains('active-style')){
        target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + 80 + 'px';
      } else {
        target.nextElementSibling.style.maxHeight = '0px'
      }
    })
  });
}
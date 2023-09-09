export default function(selector) {
  const inputs = document.querySelectorAll(selector);

  inputs.forEach($el => {
    $el.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^а-яё 0-9]/ig, '');
    })
  })
}
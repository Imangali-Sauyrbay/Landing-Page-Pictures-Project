export default function(selector = '[data-modal]'){
  const windows = document.querySelectorAll(selector);
  document.body.style.marginRight = 0;
  document.body.classList.remove('modal-open')
  windows.forEach($el => {
    $el.style.display = 'none';
  });
}
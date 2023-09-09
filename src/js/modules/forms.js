import { postData } from "../services/requests";

export default function() {
  const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        textareas = document.querySelectorAll('textarea'),
        uploads = document.querySelectorAll('input[name="upload"]');
  
  const messages = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро с вами свяжемся!',
    failure: 'Что-то пошло не так!',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  const paths = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  }

  const clearInputs = () => {
    [...inputs, ...textareas].forEach(input => input.value = '');
    uploads.forEach($el => $el.previousElementSibling.textContent = 'Файл не выбаран!')
  }

  uploads.forEach($el => {
    $el.addEventListener('input', e => {
      const target = e.target;
      const fileName = [''];

      if(!target.files[0])
        return;

      target.files[0].name.split('.').forEach((el, i, array) => {
        if(i == array.length - 1) {
          fileName.push(el);
        }else{
          fileName[0] += el;
        };
      })

      const dots = fileName[0].length > 6 ? '...' : '.';
      fileName[0] = fileName[0].substring(0, 6);
      const name = fileName.join(dots);
      $el.previousElementSibling.textContent = name;
    })
  })


  forms.forEach($el => {
    $el.addEventListener('submit', (e) => {
      e.preventDefault();
      const formDisplay = getComputedStyle($el).display;

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      $el.parentNode.appendChild(statusMessage);

      $el.classList.add('animated', 'fadeOutUp');
      setTimeout(()=>{
        $el.style.display = 'none';
      }, 400)
  
      const statusImg = document.createElement('img');
      statusImg.setAttribute('src', messages.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      const textMessage = document.createElement('p');
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData($el);
      const api = $el.closest('.popup-design') || $el.classList.contains('calc_form') ? paths.designer : paths.question;


      postData(api, formData)
          .then(res => {
            console.log(res)
            statusImg.setAttribute('src', messages.ok);
            textMessage.textContent = messages.success;
          })
          .catch((e) => {
            console.log(e)
            statusImg.setAttribute('src', messages.fail);
            textMessage.textContent = messages.failure
          })
          .finally(() => {
            clearInputs();
            setTimeout(() => {
              statusMessage.remove()
              $el.style.display = formDisplay;
              $el.classList.remove('fadeOutUp');
              $el.classList.add('fadeInUp');
            }, 5000)
          })
    });
  });
}

import { getData } from "../services/requests";

export default function(trigger, wrapper) {
  const btn = document.querySelector(trigger);

  const createCard = (data) => {
    const card = document.createElement('div');
    card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
       
    const { src, title, link} = data;

    card.insertAdjacentHTML('afterbegin', `
    <div class="styles-block">
      <img src="${src}" alt="style">
      <h4>${title}</h4>
      <a href="${link}">Подробнее</a>
    </div>
    `);

    return card;
  }

  const createElements = (res) => {
    const $els = res.map(createCard);
    const container = document.querySelector(wrapper);
    $els.forEach(card => container.appendChild(card));
  }

  btn.addEventListener('click', e => {
    getData('assets/db.json')
      .then(createElements)
      .then(() => btn.remove());
  });
}
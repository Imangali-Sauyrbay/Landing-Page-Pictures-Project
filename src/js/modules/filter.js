export default function(){
  const menu = document.querySelector('.portfolio-menu'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        no = document.querySelector('.portfolio-no');

  const typeFilter = (selector) => {
    [].slice.call(wrapper.children).forEach($el => {
      $el.style.display = 'none';
      $el.classList.remove('animated', 'fadeIn');
    });

    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    const markType = wrapper.querySelectorAll(selector);

    if(markType.length){
      markType.forEach($el => {
        $el.style.display = 'block';
        $el.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  };

  menu.addEventListener('click', e => {
    if(e.target && e.target.tagName == 'LI'){
      [].slice.call(menu.children).forEach($el => {
        $el.classList.remove('active');
        e.target.classList.add('active');
      });
      const selector = '.' + e.target.getAttribute('class').split(' ')[0];
      typeFilter(selector);
    }
  })
}
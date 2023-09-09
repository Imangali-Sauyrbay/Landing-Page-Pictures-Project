export default function(imgsSelector) {
  const blocks = document.querySelectorAll(imgsSelector);

  blocks.forEach(block => {
    block.addEventListener('mouseenter', showImg(block));
    block.addEventListener('mouseleave', hideImg(block))
  });

  function showImg(block) {
    return (e) => {
      const img = block.querySelector('img');
      let src = [''];
  
      img.getAttribute('src').split('.').forEach((el, i, array) => {
        if(i == array.length - 1) {
          src.push(el);
        }else{
          src[0] += i == 0 ? el : '.' + el;
        };
      });
  
      src = src[0] + '-1.' + src[1];
      img.setAttribute('src', src);
  
      block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
        p.style.display = 'none';
      });
    }
  }

  function hideImg(block) {
    return (e) => {
      const img = block.querySelector('img');
      let src = img.getAttribute('src').split('-1.')
      img.setAttribute('src', src.join('.'));
  
      block.querySelectorAll('p').forEach(p => {
        p.style.display = 'block';
      });
    }
  }
}
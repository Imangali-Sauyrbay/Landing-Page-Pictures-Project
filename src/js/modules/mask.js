export default function(selector) {
  const setCursorPosition = (pos, $el) => {
    $el.focus();

    if($el.setSelectionRange){
      $el.setSelectionRange(pos, pos);
    } else if($el.createTextRange){
      let range = $el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function createMask(e){
    let mask = '+7 (___) ___ __ __',
        i = 0,
        def = mask.replace(/\D/g, ''),
        val = e.target.value.replace(/\D/g, '');
        
    if(def.length >= val.length)
        val = def;

    e.target.value = mask.replace(/./g, function(a){
      let res;
      if(/[_\d]/.test(a) && i < val.length)
          res = val.charAt(i++);
      else if(i >= val.length)
          res = '';
      else res = a;

      return res;
    });

    if (e.type === 'blur'){
      if(e.target.value.length == 2)
        e.target.value = '';
    } else {
      setCursorPosition(e.target.value.length, e.target);
    }
  }

  const inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  })
}
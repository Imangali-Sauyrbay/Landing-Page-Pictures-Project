export default function() {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      const color = input.closest('.file_upload').style.backgroundColor;
      input.addEventListener(eventName, (e) => {
        preventDefaults(e);
        const parent = input.closest('.file_upload');

        if(eventName == 'dragenter' || eventName == 'dragover') {
          parent.style.border = '4px solid lightGreen';
          parent.style.backgroundColor = 'rgba(0,0,0,0.7)';
        } else if(eventName == 'dragleave' || eventName == 'drop') {
          parent.style.border = 'none';
          parent.style.backgroundColor = color;
        }

        if(eventName == 'drop'){
          input.files = e.dataTransfer.files;
          console.log(e)
          const target = input;
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
          target.previousElementSibling.textContent = name;
        }
      }, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }


}
const display = document.getElementById('display');

let buffer = '';

function append(k){
  buffer += k;
  display.value = buffer;
}

function clearAll(){
  buffer = '';
  display.value = '';
}

function evaluateExpr(){
  if(!buffer) return;
  try{
    // Safe eval: allow digits, operators, dot and spaces only
    if(!/^[-+*/().\d\s]+$/.test(buffer)) throw new Error('invalid');
    const result = Function(`"use strict";return (${buffer})`)();
    buffer = String(result);
    display.value = buffer;
  }catch{
    display.value = 'Error';
    buffer = '';
  }
}

document.querySelectorAll('[data-k]').forEach(btn=>{
  btn.addEventListener('click',()=>append(btn.dataset.k));
});
document.getElementById('clear').addEventListener('click',clearAll);
document.getElementById('equals').addEventListener('click',evaluateExpr);

// Keyboard support
window.addEventListener('keydown',(e)=>{
  const k = e.key;
  if(/[0-9.+\-*/()]/.test(k)) append(k);
  else if(k==='Enter') evaluateExpr();
  else if(k==='Escape') clearAll();
  else if(k==='Backspace'){ buffer = buffer.slice(0,-1); display.value = buffer; }
});



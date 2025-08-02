// 커서
const cursor = document.querySelector('.cursorpoint');
const cursorText = document.querySelector('.cursortext');
window.addEventListener('mousemove',(e)=>{
    const X = e.clientX;
    const Y = e.clientY;
    cursor.style.left = `${X}px`;
    cursor.style.top = `${Y}px`;
    cursor.classList.add('active');
        clearTimeout(cursor.timer);
        cursor.timer = setTimeout(() => {
            cursor.classList.remove('active');
        }, 290);
    cursorText.style.left = `${X}px`;
    cursorText.style.top = `${Y}px`;
    cursorText.classList.add('active');
        clearTimeout(cursorText.timer);
        cursorText.timer = setTimeout(() => {
            cursorText.classList.remove('active');
        }, 290);
});

// 진짜 타이핑 효과 JS 예시
// 타이핑 효과를 외부에서 재시작할 수 있도록 함수로 분리
function setCursorText(text, speed = 50, delay = 500) {
  const el = document.querySelector('.cursortext');
  if (!el) return;
  let i = 0;
  let cursorVisible = true;
  if (window.cursorTextTimer) clearTimeout(window.cursorTextTimer);
  if (window.cursorBlinkTimer) clearTimeout(window.cursorBlinkTimer);

  function type() {
    if (i <= text.length) {
      el.innerHTML = text.slice(0, i).replace(/\n/g, '<br>') + (cursorVisible ? '|' : '');
      i++;
      window.cursorTextTimer = setTimeout(type, speed);
    } else {
      blinkCursor();
    }
  }

  function blinkCursor() {
    cursorVisible = !cursorVisible;
    el.innerHTML = text.replace(/\n/g, '<br>') + (cursorVisible ? '|' : '');
    window.cursorBlinkTimer = setTimeout(blinkCursor, 500);
  }

  el.textContent = '';
  window.cursorTextTimer = setTimeout(type, delay);
}

window.addEventListener('DOMContentLoaded', function() {
  fetch('temps/mousefollow.json')
    .then(res => res.json())
    .then(cfg => {
      setCursorText(cfg.text || '', cfg.speed, cfg.delay);
    });
});
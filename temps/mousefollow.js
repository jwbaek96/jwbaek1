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
window.addEventListener('DOMContentLoaded', function() {
  // .cursortext 요소를 가져옴
  const el = document.querySelector('.cursortext');
  if (!el) return;
  // 타이핑될 텍스트
  const text = 'Welcome to the Records of Mine.😊\nMy name is Jongwhoun Baek.\nI\'m a web developer, ppt designer, media artist and musician.\nIf you want to contact me, send an email to jwbaek96@gmail.com\nor DM me on Instagram. My IG is @jw.baek.96';
  // 현재까지 출력된 글자 인덱스
  let i = 0;
  // 커서 깜빡임 상태
  let cursorVisible = true;

  // 한 글자씩 타이핑하는 함수
  function type() {
    if (i <= text.length) {
      // 현재까지의 글자와 커서(|)를 표시, \n을 <br>로 변환하여 줄바꿈
      el.innerHTML = text.slice(0, i).replace(/\n/g, '<br>') + (cursorVisible ? '|' : '');
      i++;
      // 다음 글자 출력 속도
      setTimeout(type, 50);
    } else {
      // 모든 글자가 출력되면 커서만 깜빡임
      blinkCursor();
    }
  }

  // 커서(|)만 깜빡이는 함수
  function blinkCursor() {
    cursorVisible = !cursorVisible;
    el.innerHTML = text.replace(/\n/g, '<br>') + (cursorVisible ? '|' : '');
    // 500ms마다 커서 상태 변경
    setTimeout(blinkCursor, 500);
  }

  // 초기화: 텍스트 비우고 타이핑 시작
  el.textContent = '';
  setTimeout(type, 500); //딜레이 후 타이핑 시작
});
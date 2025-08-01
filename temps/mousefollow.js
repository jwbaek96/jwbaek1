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
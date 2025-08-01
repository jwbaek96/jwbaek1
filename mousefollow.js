// 커서
const cursor = document.querySelector('#mousefollow');
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
});
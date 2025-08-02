window.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav');
    if (!navContainer) return;

    fetch('./nav.json')
    .then(response => response.json())
    .then(navData => {
        // nav1 생성
        const nav1 = document.createElement('ul');
        nav1.className = 'nav1';
        navData.forEach(item => {
            const p = document.createElement('p');
            p.className = 'nav-items';
            p.textContent = item.label;
            p.setAttribute('data-label', item.label);
            p.addEventListener('click', () => {
                // nav1 활성화 표시
                document.querySelectorAll('.nav1 .nav-items').forEach(el => {
                    el.classList.remove('nav-item-active');
                });
                p.classList.add('nav-item-active');
                // nav2 토글
                document.querySelectorAll('.nav2').forEach(nav2 => {
                    nav2.style.display = nav2.getAttribute('data-label') === item.label ? 'block' : 'none';
                });
                // nav2의 활성화도 초기화
                document.querySelectorAll('.nav2 .nav-items').forEach(el => {
                    el.classList.remove('nav-item-active');
                });
            });
            nav1.appendChild(p);
        });
        navContainer.appendChild(nav1);

        // nav2 생성
        navData.forEach(item => {
            const nav2 = document.createElement('ul');
            nav2.className = 'nav2';
            nav2.setAttribute('data-label', item.label);
            nav2.style.display = 'none';
            (item.children || []).forEach(child => {
                const p = document.createElement('p');
                p.className = 'nav-items';
                p.textContent = child.label;
                p.setAttribute('data-label', child.label);

                p.addEventListener('click', () => {
                    // nav2 활성화 표시
                    nav2.querySelectorAll('.nav-items').forEach(el => {
                        el.classList.remove('nav-item-active');
                    });
                    p.classList.add('nav-item-active');
                });
                nav2.appendChild(p);
            });
            navContainer.appendChild(nav2);
        });
        // nav1/nav2 생성이 모두 끝난 후에 이벤트 등록 함수 호출
        if (window.navStateInit) window.navStateInit();
    });
});


// nav.js에서 nav1 생성 후 아래처럼 호출
// if (window.navStateInit) window.navStateInit();
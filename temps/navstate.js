let navState = [];

// breadcrumb 텍스트 업데이트 함수
function updateBreadcrumb() {
  const breadcrumb = document.querySelector('.breadcrumb > p');
  if (!breadcrumb) return;
  if (navState[0] && navState[1]) {
    breadcrumb.textContent = navState[0] + ' > ' + navState[1];
  } else if (navState[0]) {
    breadcrumb.textContent = navState[0];
  } else {
    breadcrumb.textContent = '';
  }
}

window.navStateInit = function() {
  const nav1 = document.querySelector('.nav1');
  if (nav1) {
    nav1.addEventListener('click', function(e) {
      const p = e.target.closest('p.nav-items');
      if (p && nav1.contains(p)) {
        navState[0] = p.getAttribute('data-label');
        navState[1] = undefined;
        updateBreadcrumb();
        console.log('navState:', navState);
      }
    });
  }

  document.querySelectorAll('.nav2').forEach(nav2 => {
    nav2.addEventListener('click', function(e) {
      const p = e.target.closest('p.nav-items');
      if (p && nav2.contains(p)) {
        navState[1] = p.getAttribute('data-label');
        updateBreadcrumb();
        console.log('navState:', navState);
        // 최하위 nav item 클릭 시 .breadcrumb .arrowtoggle 클릭 이벤트 발생
        const breadcrumbToggle = document.querySelector('.breadcrumb .arrowtoggle');
        if (breadcrumbToggle) {
          breadcrumbToggle.click();
        }
      }
    });
  });
};


const breadcrumbToggle = document.querySelector('.breadcrumb .arrowtoggle');
if (breadcrumbToggle) {
  breadcrumbToggle.addEventListener('click', function() {
    // breadcrumb 영역과 텍스트 요소 선택
    const breadcrumb = document.querySelector('.breadcrumb');
    // const breadcrumbP = document.querySelector('.breadcrumb > p');
    const nav = document.querySelector('#nav');
    if (breadcrumb) {
      const isOpen = breadcrumb.getAttribute('data-state') === 'open';

      breadcrumb.setAttribute('data-state', isOpen ? 'closed' : 'open');

      breadcrumb.style.transform = isOpen ? 'translateY(0)' : 'translateY(100%)';
      nav.style.transform = isOpen ? 'translateY(100%)' : 'translateY(0%)';

      breadcrumbToggle.innerHTML = isOpen ? '<i class="fa-solid fa-arrow-down"></i>' : '<i class="fa-solid fa-arrow-up"></i>';

    }
  });
}
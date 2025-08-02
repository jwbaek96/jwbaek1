window.addEventListener('DOMContentLoaded', function() {
  var topNotice = document.getElementById('top-notice');
  var header = document.querySelector('header');
  // JSON 파일에서 notice 값 불러오기
  fetch('./temps/top-notice.json')
    .then(response => response.json())
    .then(data => {
      if (topNotice && data.notice) {
        // p > span 구조로 notice 값 추가 (span 20개)
        var p = document.createElement('p');
        for (var i = 0; i < 20; i++) {
          var span = document.createElement('span');
          span.textContent = data.notice;
          p.appendChild(span);
        }
        topNotice.appendChild(p);
        
        p.style.animation = `top-notice-scroll ${data.speed}s linear infinite`;
        // header margin 조정
        if (header) {
          var height = topNotice.offsetHeight;
          header.style.marginTop = height + 'px';
        }
      }
    })
    .catch(error => {
      console.error('Error loading notice:', error);
    });
});
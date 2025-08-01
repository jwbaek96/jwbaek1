window.addEventListener('DOMContentLoaded', function() {
  var topNotice = document.getElementById('top-notice');
  var header = document.querySelector('header');
  if (topNotice && header) {
    var height = topNotice.offsetHeight;
    header.style.marginTop = height + 'px';
  }
});
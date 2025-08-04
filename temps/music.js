window.addEventListener('DOMContentLoaded', function() {
    var musicContainer = document.getElementById('music-container');
    var isVisible = false;

    // 뮤직 플레이어 구조 생성
    createMusicPlayerStructure();
    setupToggleEvent();

    function createMusicPlayerStructure() {
        // 토글 버튼 생성
        var musicToggle = document.createElement('button');
        musicToggle.className = 'widget-toggle';
        musicToggle.innerHTML = '&#9834;';
        
        // music player 컨테이너 생성
        var musicPlayer = document.createElement('div');
        musicPlayer.id = 'music-player';
        musicPlayer.className = 'widget-content';
        
        // 빈 컨테이너 (사운드클라우드 임베드용)
        musicPlayer.innerHTML = '<p>SoundCloud 임베드가 여기에 들어갑니다.</p>';
        
        // DOM에 추가
        musicContainer.appendChild(musicToggle);
        musicContainer.appendChild(musicPlayer);
    }

    function setupToggleEvent() {
        var musicToggle = document.querySelector('#music-container .widget-toggle');
        
        // 위젯 매니저에 등록
        if (window.WidgetManager) {
            window.WidgetManager.registerWidget('music', function(shouldOpen) {
                isVisible = shouldOpen;
                updateWidgetDisplay();
            });
        }
        
        if (musicToggle) {
            musicToggle.addEventListener('click', function() {
                // 위젯 매니저를 통해 토글
                if (window.WidgetManager) {
                    window.WidgetManager.toggleWidget('music');
                } else {
                    // 위젯 매니저가 없으면 기존 방식
                    isVisible = !isVisible;
                    updateWidgetDisplay();
                }
            });
        }
        
        function updateWidgetDisplay() {
            var musicToggle = document.querySelector('#music-container .widget-toggle');
            
            if (isVisible) {
                musicContainer.setAttribute('aria-expanded', 'true');
                musicContainer.style.transform = 'translateY(0)';
                musicToggle.innerHTML = '<i class="fas fa-arrow-down"></i>';
            } else {
                musicContainer.setAttribute('aria-expanded', 'false');
                musicContainer.style.transform = 'translateY(calc(100% - 2rem))';
                musicToggle.innerHTML = '&#9834;';
            }
        }
    }
});
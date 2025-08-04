window.addEventListener('DOMContentLoaded', function() {
    var identifyContainer = document.getElementById('identify-container');
    var isVisible = false;

    // 간단한 마크다운 -> HTML 변환 함수
    function convertMarkdownToHtml(text) {
        if (!text) return '';
        
        return text
            // **bold** -> <strong>bold</strong>
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // \n -> <br>
            .replace(/\n/g, '<br>')
            // 연속된 공백 제거
            .replace(/\s+/g, ' ')
            .trim();
    }

    // JSON 데이터 로드 및 전체 구조 생성
    fetch('./temps/identify.json')
        .then(response => response.json())
        .then(data => {
            createIdentifyStructure(data);
            setupToggleEvent();
        })
        .catch(error => {
            console.error('Error loading identify data:', error);
        });

    function createIdentifyStructure(data) {
        // 토글 버튼 생성
        var identifyToggle = document.createElement('button');
        identifyToggle.className = 'identify-toggle';
        identifyToggle.innerHTML = '<i class="fa-solid fa-info"></i>';
        
        // identify 컨테이너 생성
        var identify = document.createElement('div');
        identify.id = 'identify';
        
        // 섹션들 생성
        var sections = [
            { title: 'Name', content: data.name, type: 'text' },
            { title: 'Bio', content: data.bio, type: 'markdown' },
            { title: 'Email', content: data.email, type: 'span' },
            { title: 'Links', content: data.links, type: 'links' },
            { title: 'more.', content: data.more, type: 'markdown' }
        ];

        sections.forEach(function(sectionData) {
            var section = document.createElement('section');
            section.className = 'identify-section';
            
            var title = document.createElement('div');
            title.className = 'identify-section-title';
            title.innerHTML = '<span>' + sectionData.title + '</span>';
            
            var content = document.createElement('div');
            content.className = 'identify-section-content';
            
            // 콘텐츠 타입에 따라 다르게 처리
            switch(sectionData.type) {
                case 'text':
                    content.textContent = sectionData.content || '';
                    break;
                case 'markdown':
                    content.innerHTML = '<p>' + convertMarkdownToHtml(sectionData.content) + '</p>';
                    break;
                case 'html':
                    content.innerHTML = '<p>' + (sectionData.content || '') + '</p>';
                    break;
                case 'span':
                    content.innerHTML = '<span>' + (sectionData.content || '') + '</span>';
                    break;
                case 'links':
                    if (sectionData.content && Array.isArray(sectionData.content)) {
                        var linksHtml = '';
                        sectionData.content.forEach(function(link) {
                            linksHtml += '<a href="' + link.url + '" target="_blank">' + link.title + '</a><br>';
                        });
                        content.innerHTML = linksHtml;
                    }
                    break;
            }
            
            section.appendChild(title);
            section.appendChild(content);
            identify.appendChild(section);
        });
        
        // DOM에 추가
        identifyContainer.appendChild(identifyToggle);
        identifyContainer.appendChild(identify);
    }

    function setupToggleEvent() {
        var identifyToggle = document.querySelector('.identify-toggle');
        var identifyToggleIcon = document.querySelector('.identify-toggle i');
        
        if (identifyToggle) {
            identifyToggle.addEventListener('click', function() {
                isVisible = !isVisible;
                
                if (isVisible) {
                    identifyContainer.setAttribute('aria-expanded', 'true');
                    identifyContainer.style.transform = 'translateY(0)';
                    identifyToggleIcon.classList.remove('fa-info');
                    identifyToggleIcon.classList.add('fa-arrow-up');
                } else {
                    identifyContainer.setAttribute('aria-expanded', 'false');
                    identifyContainer.style.transform = 'translateY(-100%)';
                    identifyToggleIcon.classList.remove('fa-arrow-up');
                    identifyToggleIcon.classList.add('fa-info');
                }
            });
        }
    }
});

class ContentManager {
    constructor() {
        this.currentCategory = null;
        this.currentProject = null;
        this.isDetailOpen = false;
        this.init();
    }

    init() {
        this.createDetailContainer();
        this.bindNavEvents();
    }

    createDetailContainer() {
        // 데스크탑용 상세 정보 컨테이너
        const detailContainer = document.createElement('div');
        detailContainer.id = 'project-detail';
        detailContainer.className = 'project-detail';
        detailContainer.style.display = 'none';
        
        // 모바일용 풀스크린 상세 정보 컨테이너
        const mobileDetailContainer = document.createElement('div');
        mobileDetailContainer.id = 'mobile-project-detail';
        mobileDetailContainer.className = 'mobile-project-detail';
        mobileDetailContainer.style.display = 'none';
        
        document.body.appendChild(detailContainer);
        document.body.appendChild(mobileDetailContainer);
    }

    bindNavEvents() {
        // nav2의 클릭 이벤트를 감지하여 카테고리 로드
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-items') && e.target.closest('.nav2')) {
                const categoryLabel = e.target.getAttribute('data-label');
                this.loadCategory(categoryLabel);
            }
        });
    }

    async loadCategory(categoryLabel) {
        // 카테고리별 JSON 파일 매핑
        const categoryMap = {
            'toy projects': 'web-development',
            '2025': 'web-development' // 임시로 같은 데이터 사용
        };

        const fileName = categoryMap[categoryLabel];
        if (!fileName) return;

        try {
            const response = await fetch(`data/${fileName}.json`);
            const data = await response.json();
            this.currentCategory = data;
            this.renderProjectGrid(data.projects);
        } catch (error) {
            console.error('카테고리 로드 실패:', error);
        }
    }

    renderProjectGrid(projects) {
        const contentsSection = document.querySelector('.contents');
        if (!contentsSection) return;

        // 기존 내용 제거
        contentsSection.innerHTML = '';
        contentsSection.className = 'contents project-grid';

        projects.forEach(project => {
            const projectCard = document.createElement('article');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-project-id', project.id);
            
            projectCard.innerHTML = `
                <div class="project-thumbnail">
                    <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-meta">
                        <span class="project-date">${project.date}</span>
                        <span class="project-status status-${project.status}">${this.getStatusText(project.status)}</span>
                    </div>
                </div>
            `;

            projectCard.addEventListener('click', () => {
                this.showProjectDetail(project);
            });

            contentsSection.appendChild(projectCard);
        });
    }

    showProjectDetail(project) {
        this.currentProject = project;
        
        if (window.innerWidth <= 768) {
            this.showMobileDetail(project);
        } else {
            this.showDesktopDetail(project);
        }
    }

    showDesktopDetail(project) {
        const detailContainer = document.getElementById('project-detail');
        const main = document.querySelector('main');
        
        if (!this.isDetailOpen) {
            main.classList.add('detail-open');
            this.isDetailOpen = true;
        }

        detailContainer.innerHTML = this.generateDetailHTML(project);
        detailContainer.style.display = 'block';
        
        // 이미지 슬라이더 초기화
        this.initImageSlider();
    }

    showMobileDetail(project) {
        const mobileDetailContainer = document.getElementById('mobile-project-detail');
        
        mobileDetailContainer.innerHTML = `
            <div class="mobile-detail-content">
                <div class="mobile-detail-header">
                    <button class="close-detail" onclick="contentManager.closeMobileDetail()">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                ${this.generateDetailHTML(project)}
            </div>
        `;
        
        mobileDetailContainer.style.display = 'block';
        
        // 애니메이션 효과
        requestAnimationFrame(() => {
            mobileDetailContainer.classList.add('active');
        });
        
        // 이미지 슬라이더 초기화
        this.initImageSlider();
    }

    generateDetailHTML(project) {
        return `
            <div class="project-detail-content">
                <div class="project-images">
                    <div class="image-slider">
                        <div class="slider-container">
                            ${project.images.map((img, index) => `
                                <div class="slide ${index === 0 ? 'active' : ''}">
                                    <img src="${img}" alt="${project.title} ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                        ${project.images.length > 1 ? `
                            <div class="slider-nav">
                                <button class="prev-btn"><i class="fa-solid fa-chevron-left"></i></button>
                                <button class="next-btn"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            <div class="slider-dots">
                                ${project.images.map((_, index) => `
                                    <button class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="project-info-detail">
                    <h2 class="project-title">${project.title}</h2>
                    <p class="project-date">${project.date}</p>
                    
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-links">
                        ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" class="link-btn demo-btn">
                            <i class="fa-solid fa-external-link"></i> 데모 보기
                        </a>` : ''}
                        ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="link-btn github-btn">
                            <i class="fa-brands fa-github"></i> GitHub
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    initImageSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');
        
        if (!sliderContainer || slides.length <= 1) return;
        
        let currentSlide = 0;
        
        const updateSlider = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        };
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
    }

    closeMobileDetail() {
        const mobileDetailContainer = document.getElementById('mobile-project-detail');
        mobileDetailContainer.classList.remove('active');
        
        setTimeout(() => {
            mobileDetailContainer.style.display = 'none';
        }, 300);
    }

    closeDesktopDetail() {
        const detailContainer = document.getElementById('project-detail');
        const main = document.querySelector('main');
        
        detailContainer.style.display = 'none';
        main.classList.remove('detail-open');
        this.isDetailOpen = false;
    }

    getStatusText(status) {
        const statusMap = {
            'completed': '완료',
            'in-progress': '진행중',
            'planned': '계획중'
        };
        return statusMap[status] || status;
    }
}

// 전역 인스턴스 생성
const contentManager = new ContentManager();

// 윈도우 리사이즈 시 상세 화면 처리
window.addEventListener('resize', () => {
    if (contentManager.currentProject && contentManager.isDetailOpen) {
        if (window.innerWidth <= 768) {
            contentManager.closeDesktopDetail();
            contentManager.showMobileDetail(contentManager.currentProject);
        } else {
            contentManager.closeMobileDetail();
            contentManager.showDesktopDetail(contentManager.currentProject);
        }
    }
});

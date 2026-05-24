document.addEventListener('DOMContentLoaded', function() {
    // 1. 创建火箭粒子效果
    function createRocketParticles(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                font-size: ${10 + Math.random() * 10}px;
                opacity: ${0.05 + Math.random() * 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${8 + Math.random() * 12}s linear infinite;
                animation-delay: ${-Math.random() * 10}s;
                pointer-events: none;
            `;
            particle.textContent = '🚀';
            container.appendChild(particle);
        }
    }

    // 添加粒子浮动动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.08; }
            90% { opacity: 0.08; }
            100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 为两个粒子容器创建粒子
    createRocketParticles('heroParticles');
    createRocketParticles('contactParticles');

    // 2. 数字滚动动画
    function animateNumber(element, target) {
        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // 3. 滚动视差动画和元素进入视口动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // 数字滚动动画
                if (entry.target.classList.contains('stat-value')) {
                    const target = parseInt(entry.target.dataset.target);
                    animateNumber(entry.target, target);
                }
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.pain-point-card, .mission-card, .future-card, .value-card, .horizontal-timeline-item, .ecosystem-node, .stat-value');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 4. 时间轴连接线动画
    const timelineItems = document.querySelectorAll('.horizontal-timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // 5. Hero区域引擎卡片视差效果
    const heroCards = document.querySelectorAll('.hero-engine-card');
    window.addEventListener('mousemove', function(e) {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        heroCards.forEach((card, index) => {
            const factor = (index + 1) * 0.3;
            card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // 6. 滚动指示器点击事件
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('positioning-section');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 7. 按钮涟漪效果（火箭图标的）
    document.querySelectorAll('.btn-primary-gradient, .btn-outline-light, .btn-white, .btn-outline-white').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 添加涟漪动画
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // 8. 卡片Hover时的火箭图标放大效果
    document.querySelectorAll('.pain-point-card, .mission-card, .future-card, .value-card, .contact-card').forEach(card => {
        const rocket = card.querySelector('.card-rocket, .mission-rocket, .future-rocket, .value-rocket');
        if (rocket) {
            card.addEventListener('mouseenter', function() {
                rocket.style.transform = 'scale(1.2) rotate(10deg)';
                rocket.style.transition = 'transform 0.3s ease';
            });
            card.addEventListener('mouseleave', function() {
                rocket.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });

    // 9. 页面加载完成动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});

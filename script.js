// ========== 导航栏统一初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    const mainHeader = document.querySelector('.main-header');
    const engineTrigger = document.getElementById('engineTrigger');
    const engineTabsBar = document.getElementById('engineTabsBar');
    const heroSection = document.querySelector('.hero-section');
    
    // 所有页面：添加导航栏加载动画
    if (mainHeader) {
        mainHeader.style.opacity = '0';
        mainHeader.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            mainHeader.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            mainHeader.style.opacity = '1';
            mainHeader.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // 所有页面：导航栏滚动效果
        const originalStyle = {
            background: window.getComputedStyle(mainHeader).background,
            backdropFilter: window.getComputedStyle(mainHeader).backdropFilter,
            boxShadow: window.getComputedStyle(mainHeader).boxShadow
        };
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                mainHeader.style.background = 'rgba(255, 255, 255, 0.95)';
                mainHeader.style.backdropFilter = 'blur(20px)';
                mainHeader.style.boxShadow = '0 8px 32px rgba(22, 93, 255, 0.1)';      
                mainHeader.classList.add('scrolled');
            } else {
                // 恢复原始透明样式
                mainHeader.style.background = originalStyle.background;
                mainHeader.style.backdropFilter = originalStyle.backdropFilter;
                mainHeader.style.boxShadow = originalStyle.boxShadow;
                mainHeader.classList.remove('scrolled');
            }
        });
    }
    
    // 仅首页：处理核心引擎Tab栏交互
    if (engineTrigger && engineTabsBar) {
        // 点击触发器切换Tab栏显示
        engineTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            const isActive = engineTabsBar.classList.toggle('active');
            engineTrigger.classList.toggle('active', isActive);
            if (heroSection) {
                heroSection.classList.toggle('with-tabs', isActive);
            }
        });
        
        // 点击页面其他地方关闭Tab栏
        document.addEventListener('click', function(e) {
            if (!engineTrigger.contains(e.target) && 
                !engineTabsBar.contains(e.target) && 
                engineTabsBar.classList.contains('active')) {
                engineTabsBar.classList.remove('active');
                engineTrigger.classList.remove('active');
                if (heroSection) {
                    heroSection.classList.remove('with-tabs');
                }
            }
        });
    }
});

// ========== 全局对象定义 ==========

// 用户管理对象
const User = {
    isLoggedIn: function() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },
    login: function() {
        localStorage.setItem('isLoggedIn', 'true');
    },
    logout: function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
};

// 消息提示对象
const Toast = {
    success: function(message, title = '成功') {
        alert(`${title}: ${message}`);
    },
    warning: function(message, title = '警告') {
        alert(`${title}: ${message}`);
    },
    info: function(message, title = '提示') {
        alert(`${title}: ${message}`);
    },
    error: function(message, title = '错误') {
        alert(`${title}: ${message}`);
    }
};

// 项目管理对象
const ProjectManager = {
    projects: [
        {
            id: 1,
            name: '大学生创新创业训练计划申报材料',
            type: 'innovation',
            typeName: '国创材料',
            status: 'completed',
            statusName: '已完成',
            description: '2024年国家级大学生创新创业训练计划申报材料',
            createdAt: '2024-03-15 10:30',
            completedAt: '2024-03-20 15:45',
            files: []
        },
        {
            id: 2,
            name: '智能简历优化系统',
            type: 'softcopy',
            typeName: '软著生成',
            status: 'processing',
            statusName: '处理中',
            description: '基于AI的简历智能优化系统软件著作权申请',
            createdAt: '2024-04-01 09:00',
            completedAt: null,
            files: []
        },
        {
            id: 3,
            name: '互联网+大赛项目选题评估',
            type: 'topic',
            typeName: '选题评分',
            status: 'pending',
            statusName: '待处理',
            description: '第七届互联网+大学生创新创业大赛项目选题评估',
            createdAt: '2024-04-10 14:20',
            completedAt: null,
            files: []
        },
        {
            id: 4,
            name: '创业计划书PPT优化',
            type: 'ppt',
            typeName: 'PPT优化',
            status: 'pending',
            statusName: '待处理',
            description: '创业计划书路演PPT设计与优化',
            createdAt: '2024-04-15 11:00',
            completedAt: null,
            files: []
        },
        {
            id: 5,
            name: '校园二手交易平台',
            type: 'softcopy',
            typeName: '软著生成',
            status: 'completed',
            statusName: '已完成',
            description: '校园二手物品交易平台软件著作权',
            createdAt: '2024-02-20 08:30',
            completedAt: '2024-03-05 16:00',
            files: []
        },
        {
            id: 6,
            name: '数学建模竞赛选题分析',
            type: 'topic',
            typeName: '选题评分',
            status: 'processing',
            statusName: '处理中',
            description: '全国大学生数学建模竞赛选题分析与评估',
            createdAt: '2024-04-08 16:45',
            completedAt: null,
            files: []
        }
    ],
    
    searchProjects: function(keyword, filters) {
        let result = [...this.projects];
        
        if (keyword) {
            result = result.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
        }
        
        if (filters.type) {
            result = result.filter(p => p.type === filters.type);
        }
        
        if (filters.status) {
            result = result.filter(p => p.status === filters.status);
        }
        
        return result;
    },
    
    addProject: function(project) {
        const newId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
        this.projects.push({
            id: newId,
            createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
            ...project
        });
    },
    
    updateProject: function(id, updates) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updates };
            return true;
        }
        return false;
    },
    
    deleteProject: function(id) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.projects.splice(index, 1);
            return true;
        }
        return false;
    },
    
    getProjectById: function(id) {
        return this.projects.find(p => p.id === id);
    }
};

// ========== 平滑滚动 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// 导航高亮
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 只对锚点链接（href="#xxx"）进行section-based的高亮
        // 对于页面链接（href="xxx.html"），保持原有的active状态不变
        if (href.startsWith('#')) {
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
        // 页面链接的active状态由HTML中的class="active"保持，不在这里修改
    });
});

// 核心产品Tab切换
document.addEventListener('DOMContentLoaded', function() {
    const productTabs = document.querySelectorAll('.tab-nav .tab-item');
    const engineCards = document.querySelectorAll('.engine-detail-card');
    
    productTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新Tab状态
            productTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 隐藏所有卡片
            engineCards.forEach(card => card.classList.remove('active'));
            
            // 显示对应卡片
            const targetCard = document.getElementById(`engine-${tabId}`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });
});



// FAQ 分类筛选
const categoryBtns = document.querySelectorAll('.category-btn');
const faqItems = document.querySelectorAll('.faq-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有按钮的active状态
        categoryBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮的active状态
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // 显示/隐藏FAQ项
        faqItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// FAQ 手风琴效果
faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // 关闭所有
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // 打开当前
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// 卡片悬停效果
const cards = document.querySelectorAll('.hot-service-card, .team-card, .step-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// 服务项悬停效果
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// 数字滚动动画
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            num.textContent = target >= 1000 ? target.toLocaleString() : target;
                            clearInterval(timer);
                        } else {
                            num.textContent = Math.floor(current) >= 1000 
                                ? Math.floor(current).toLocaleString() 
                                : Math.floor(current);
                        }
                    }, duration / steps);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        observer.observe(statsRow);
    }
});

// 移动端菜单切换
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// 登录页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 登录/注册标签切换
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active状态
            authTabs.forEach(t => t.classList.remove('active'));
            // 添加当前标签的active状态
            this.classList.add('active');
            
            const formId = this.getAttribute('data-tab');
            
            // 隐藏所有表单
            authForms.forEach(form => form.style.display = 'none');
            // 显示对应表单
            document.querySelector(`.${formId}`).style.display = 'block';
        });
    });

    // 验证码倒计时
    const captchaBtn = document.querySelector('.captcha-btn');
    if (captchaBtn) {
        captchaBtn.addEventListener('click', function() {
            const phoneInput = document.querySelector('#phone');
            if (!phoneInput.value || phoneInput.value.length !== 11) {
                alert('请输入有效的手机号码');
                return;
            }
            
            let count = 60;
            this.disabled = true;
            this.textContent = `${count}秒后重新获取`;
            
            const timer = setInterval(() => {
                count--;
                if (count <= 0) {
                    clearInterval(timer);
                    this.disabled = false;
                    this.textContent = '获取验证码';
                } else {
                    this.textContent = `${count}秒后重新获取`;
                }
            }, 1000);
        });
    }

    // 注册步骤导航
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-step');
            document.querySelectorAll('.register-step').forEach(step => step.style.display = 'none');
            document.querySelector(`.step-${nextStep}`).style.display = 'block';
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-step');
            document.querySelectorAll('.register-step').forEach(step => step.style.display = 'none');
            document.querySelector(`.step-${prevStep}`).style.display = 'block';
        });
    });

    // 身份选择
    const identityCards = document.querySelectorAll('.identity-card');
    identityCards.forEach(card => {
        card.addEventListener('click', function() {
            // 移除所有卡片的active状态
            identityCards.forEach(c => c.classList.remove('active'));
            // 添加当前卡片的active状态
            this.classList.add('active');
            
            const identity = this.getAttribute('data-identity');
            // 保存选择的身份到隐藏字段
            const identityInput = document.querySelector('#identity');
            if (identityInput) {
                identityInput.value = identity;
            }
            
            // 根据身份显示/隐藏资质上传区域
            const certGroup = document.getElementById('cert-upload-group');
            if (certGroup) {
                if (identity === 'personal') {
                    certGroup.style.display = 'none';
                } else {
                    certGroup.style.display = 'block';
                }
            }
        });
    });
});

// ========== 三大引擎详情页交互 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 数据配置
    const engineConfig = {
        shengxuechuang: {
            name: '升学创',
            title: 'AI赋能，升学无忧',
            desc: '覆盖专升本/考研/保研/留学全赛道，智能匹配，精准规划',
            stats: [
                { value: '90%+', label: '院校匹配精准度' },
                { value: '60%+', label: '备考效率提升' },
                { value: '38%+', label: '申请通过率提升' }
            ],
            subTabs: ['zexiao', 'beikao', 'beijing', 'mianshi'],
            prevEngine: 'yansaichuang',
            nextEngine: 'zhituchuang',
            prevEngineName: '研赛创',
            prevEngineDesc: '科研成果转化，助力升学背景提升',
            nextEngineName: '职途创',
            nextEngineDesc: '从升学背景到就业竞争力，无缝衔接',
            subTabStats: {
                zexiao: { value: '90%+', label: '院校匹配精准度' },
                beikao: { value: '60%+', label: '备考效率提升' },
                beijing: { value: '38%+', label: '申请通过率提升' },
                mianshi: { value: '0.85+', label: '复试模拟与实际评分相关性' }
            }
        },
        yansaichuang: {
            name: '研赛创',
            title: '科研竞赛，创新赋能',
            desc: '从论文写作到竞赛备赛，全方位助力科研创新',
            stats: [
                { value: '70%+', label: '论文写作效率提升' },
                { value: '45%+', label: '竞赛获奖率提升' },
                { value: '150%+', label: '产学研转化效率提升' }
            ],
            subTabs: ['keyan2', 'jingsai2', 'chuangye2'],
            prevEngine: 'shengxuechuang',
            nextEngine: 'zhituchuang',
            prevEngineName: '升学创',
            prevEngineDesc: '从升学背景到科研竞赛，夯实科创成果',
            nextEngineName: '职途创',
            nextEngineDesc: '从科创成果到就业竞争力，无缝衔接',
            subTabStats: {
                keyan2: { value: '60%+', label: '论文写作效率提升' },
                jingsai2: { value: '45%+', label: '竞赛获奖率提升' },
                chuangye2: { value: '150%+', label: '产学研转化效率提升' }
            }
        },
        zhituchuang: {
            name: '职途创',
            title: '职场护航，职通未来',
            desc: '市场化就业与体制内招录，全方位助力求职成功',
            stats: [
                { value: '85%+', label: '人岗匹配精准度' },
                { value: '42.8%+', label: 'ATS初筛通过率提升' },
                { value: '90%+', label: '岗位匹配精准度' }
            ],
            subTabs: ['shichang2', 'tizhi2'],
            prevEngine: 'shengxuechuang',
            nextEngine: '',
            prevEngineName: '升学创',
            prevEngineDesc: '从升学背景到就业竞争力，无缝衔接',
            nextEngineName: '',
            nextEngineDesc: '',
            subTabStats: {
                shichang2: { value: '85%+', label: '人岗匹配精准度' },
                tizhi2: { value: '90%+', label: '岗位匹配精准度' }
            }
        }
    };

    // 元素获取
    const engineMainTabs = document.querySelectorAll('.engine-tab-btn');
    const subTabsLists = document.querySelectorAll('.sub-tabs-list');
    const subTabs = document.querySelectorAll('.sub-tab-btn');
    const flowPanels = document.querySelectorAll('.flow-panel');
    
    // ID映射关系
    const idToEngineMap = {
        'shengxue': 'shengxuechuang',
        'yansai': 'yansaichuang',
        'zhitu': 'zhituchuang'
    };

    // 更新Hero区内容
    function updateHeroContent(engineId) {
        const config = engineConfig[engineId];
        if (!config) return;

        const badge = document.getElementById('hero-engine-badge');
        const title = document.getElementById('hero-title');
        const desc = document.getElementById('hero-desc');
        const stats = document.querySelectorAll('.hero-stat');

        const engineTypeMap = {
            'shengxuechuang': '进阶引擎',
            'yansaichuang': '循环引擎',
            'zhituchuang': '护航引擎'
        };
        const engineType = engineTypeMap[engineId] || '进阶引擎';

        if (badge) badge.textContent = `${config.name}·${engineType}`;
        if (title) title.textContent = config.title;
        if (desc) desc.textContent = config.desc;

        stats.forEach((stat, index) => {
            if (config.stats[index]) {
                const valueEl = stat.querySelector('.stat-value');
                const labelEl = stat.querySelector('.stat-label');
                if (valueEl) valueEl.textContent = config.stats[index].value;
                if (labelEl) labelEl.textContent = config.stats[index].label;
            }
        });

        // 更新侧边数据栏
        updateSidebarData(config.stats[0]);
    }

    // 更新侧边数据栏
    function updateSidebarData(stat) {
        const valueEl = document.querySelector('.sidebar-value');
        const labelEl = document.querySelector('.sidebar-label');
        if (valueEl && stat) valueEl.textContent = stat.value;
        if (labelEl && stat) labelEl.textContent = stat.label;
    }

    // 更新生态联动区
    function updateEcosystemLinkage(engineId) {
        const config = engineConfig[engineId];
        if (!config) return;

        const prevLink = document.getElementById('ecosystemPrevLink');
        const prevEngineName = document.getElementById('prevEngineName');
        const prevEngineDesc = document.getElementById('prevEngineDesc');
        const prevEngineBtn = document.getElementById('prevEngineBtn');
        const nextLink = document.getElementById('ecosystemNextLink');
        const nextEngineName = document.getElementById('nextEngineName');
        const nextEngineDesc = document.getElementById('nextEngineDesc');
        const nextEngineBtn = document.getElementById('nextEngineBtn');
        const chainItems = document.querySelectorAll('.chain-item');

        // 处理上一引擎
        if (prevLink) {
            if (config.prevEngine) {
                prevLink.style.display = 'block';
                if (prevEngineName) prevEngineName.textContent = config.prevEngineName;
                if (prevEngineDesc) prevEngineDesc.textContent = config.prevEngineDesc;
                if (prevEngineBtn) prevEngineBtn.href = `#${config.prevEngine.replace('chuang', '')}`;
            } else {
                prevLink.style.display = 'none';
            }
        }

        // 处理下一引擎
        if (nextLink) {
            if (config.nextEngine) {
                nextLink.style.display = 'block';
                if (nextEngineName) nextEngineName.textContent = config.nextEngineName;
                if (nextEngineDesc) nextEngineDesc.textContent = config.nextEngineDesc;
                if (nextEngineBtn) nextEngineBtn.href = `#${config.nextEngine.replace('chuang', '')}`;
            } else {
                nextLink.style.display = 'none';
            }
        }

        // 更新链条可视化
        if (chainItems.length === 3) {
            const engineOrder = ['yansaichuang', 'shengxuechuang', 'zhituchuang'];
            const currentIndex = engineOrder.indexOf(engineId);
            chainItems.forEach((item, index) => {
                if (index === currentIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    // 切换到指定引擎
    function switchEngine(engineId) {
        // 更新主标签状态
        engineMainTabs.forEach(t => t.classList.remove('active'));
        const targetTab = document.querySelector(`.engine-tab-btn[data-engine="${engineId}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // 显示对应的子标签列表（在左侧栏中）
        subTabsLists.forEach(list => {
            list.style.display = 'none';
        });
        const subList = document.querySelector(`.sub-tabs-list[data-engine="${engineId}"]`);
        if (subList) {
            subList.style.display = 'flex';
            
            // 自动点击第一个子标签
            const firstSubTab = subList.querySelector('.sub-tab-btn');
            if (firstSubTab) {
                firstSubTab.click();
            }
        }
        
        // 更新Hero区内容
        updateHeroContent(engineId);

        // 更新生态联动区
        updateEcosystemLinkage(engineId);
    }

    // 第一级：引擎主标签切换
    engineMainTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const engineId = this.getAttribute('data-engine');
            switchEngine(engineId);
        });
    });

    // 第二级：子标签切换（左侧栏中的子tab）
    subTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parentList = this.closest('.sub-tabs-list');

            // 更新当前子标签列表内的标签状态
            parentList.querySelectorAll('.sub-tab-btn').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 隐藏所有流程图面板
            flowPanels.forEach(panel => panel.classList.remove('active'));

            // 显示对应的流程图面板
            const targetPanel = document.getElementById(`flow-${tabId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // 更新侧边数据栏
            const currentEngine = document.querySelector('.engine-tab-btn.active');
            if (currentEngine) {
                const engineId = currentEngine.getAttribute('data-engine');
                const config = engineConfig[engineId];
                if (config && config.subTabStats && config.subTabStats[tabId]) {
                    updateSidebarData(config.subTabStats[tabId]);
                }
            }
        });
    });

    // 检查URL锚点并自动切换
    const hash = window.location.hash.substring(1);
    if (hash && idToEngineMap[hash]) {
        switchEngine(idToEngineMap[hash]);
    }

    // 滚动动画观察器
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有流程区块
    document.querySelectorAll('.flow-section').forEach(section => {
        observer.observe(section);
    });

});

// ========== 新增功能：沉浸式滚动与进度条 ==========

const ImmersiveScroll = {
    currentStep: 0,
    steps: [],
    isLocked: false,
    scrollTimeout: null,
    
    init: function() {
        this.collectSteps();
        this.setupProgressBar();
        this.setupSidebarDots();
        this.setupScrollLock();
        this.setupKeyboardNav();
        this.startScrollObserver();
    },
    
    collectSteps: function() {
        this.steps = Array.from(document.querySelectorAll('.flow-section'));
    },
    
    setupProgressBar: function() {
        const progressList = document.getElementById('stageProgressList');
        if (!progressList) return;
        
        progressList.innerHTML = '';
        this.steps.forEach((step, index) => {
            const stepItem = document.createElement('div');
            stepItem.className = 'stage-progress-item';
            stepItem.innerHTML = `
                <div class="stage-progress-dot"></div>
                <div class="stage-progress-label">步骤${index + 1}</div>
            `;
            stepItem.addEventListener('click', () => {
                this.scrollToStep(index);
            });
            progressList.appendChild(stepItem);
        });
    },
    
    setupSidebarDots: function() {
        const dotsContainer = document.getElementById('sidebarStageDots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        this.steps.forEach((step, index) => {
            const dot = document.createElement('div');
            dot.className = 'sidebar-stage-dot';
            dot.setAttribute('data-index', index + 1);
            dot.addEventListener('click', () => {
                this.scrollToStep(index);
            });
            dotsContainer.appendChild(dot);
        });
    },
    
    setupScrollLock: function() {
        let lastScrollY = window.scrollY;
        window.addEventListener('wheel', (e) => {
            if (this.isLocked) {
                e.preventDefault();
                return;
            }
            
            const isScrollingDown = e.deltaY > 0;
            if (isScrollingDown && this.currentStep < this.steps.length - 1) {
                this.lockAndScroll(this.currentStep + 1);
            } else if (!isScrollingDown && this.currentStep > 0) {
                this.lockAndScroll(this.currentStep - 1);
            }
        }, { passive: false });
    },
    
    setupKeyboardNav: function() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && this.currentStep < this.steps.length - 1) {
                e.preventDefault();
                this.scrollToStep(this.currentStep + 1);
            } else if (e.key === 'ArrowUp' && this.currentStep > 0) {
                e.preventDefault();
                this.scrollToStep(this.currentStep - 1);
            }
        });
    },
    
    lockAndScroll: function(targetIndex) {
        this.isLocked = true;
        this.scrollToStep(targetIndex);
        setTimeout(() => {
            this.isLocked = false;
        }, 800);
    },
    
    scrollToStep: function(index) {
        if (index < 0 || index >= this.steps.length) return;
        
        const step = this.steps[index];
        step.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        this.updateCurrentStep(index);
    },
    
    updateCurrentStep: function(index) {
        this.currentStep = index;
        this.updateProgressBar();
        this.updateSidebarDots();
        this.updateSidebarData();
    },
    
    updateProgressBar: function() {
        const progressItems = document.querySelectorAll('.stage-progress-item');
        progressItems.forEach((item, index) => {
            item.classList.remove('active', 'completed');
            if (index < this.currentStep) {
                item.classList.add('completed');
            } else if (index === this.currentStep) {
                item.classList.add('active');
            }
        });
    },
    
    updateSidebarDots: function() {
        const dots = document.querySelectorAll('.sidebar-stage-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed');
            if (index < this.currentStep) {
                dot.classList.add('completed');
            } else if (index === this.currentStep) {
                dot.classList.add('active');
            }
        });
    },
    
    updateSidebarData: function() {
        const progressFill = document.getElementById('miniProgressFill');
        if (progressFill) {
            const progress = ((this.currentStep + 1) / this.steps.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
    },
    
    startScrollObserver: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const index = this.steps.indexOf(entry.target);
                    if (index !== -1) {
                        this.updateCurrentStep(index);
                    }
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.steps.forEach(step => observer.observe(step));
    }
};

// ========== 新增功能：体验抽屉面板 ==========

const ExperienceDrawer = {
    currentExperience: null,
    userData: {},
    
    init: function() {
        this.setupDrawerEvents();
        this.setupExperienceButtons();
        this.loadUserData();
    },
    
    setupDrawerEvents: function() {
        const overlay = document.getElementById('experienceOverlay');
        const closeBtn = document.getElementById('drawerClose');
        const continueBtn = document.getElementById('drawerContinueBtn');
        
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.close();
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.close());
        }
        
        // 复制功能
        const copyBtn = document.getElementById('copyResultBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyResult());
        }
        
        // 导出PDF功能
        const exportBtn = document.getElementById('exportResultBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportResult());
        }
        
        // 扫码保存功能
        const qrcodeBtn = document.getElementById('qrcodeResultBtn');
        if (qrcodeBtn) {
            qrcodeBtn.addEventListener('click', () => this.showQRCode());
        }
    },
    
    setupExperienceButtons: function() {
        document.querySelectorAll('.step-btn, [data-experience]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const experienceType = btn.getAttribute('data-experience') || 'default';
                this.open(experienceType);
            });
        });
    },
    
    loadUserData: function() {
        const savedData = localStorage.getItem('userExperienceData');
        if (savedData) {
            try {
                this.userData = JSON.parse(savedData);
            } catch (e) {
                this.userData = {};
            }
        }
    },
    
    saveUserData: function() {
        localStorage.setItem('userExperienceData', JSON.stringify(this.userData));
    },
    
    open: function(type) {
        this.currentExperience = type;
        const overlay = document.getElementById('experienceOverlay');
        const titleEl = document.getElementById('drawerTitle');
        const contentEl = document.getElementById('drawerContent');
        const resultActions = document.getElementById('drawerResultActions');
        
        if (overlay) overlay.classList.add('active');
        if (titleEl) titleEl.textContent = this.getExperienceTitle(type);
        if (contentEl) contentEl.innerHTML = this.getExperienceContent(type);
        if (resultActions) resultActions.style.display = 'none';
        
        // 自动填充用户数据
        setTimeout(() => this.autoFillData(), 100);
    },
    
    close: function() {
        const overlay = document.getElementById('experienceOverlay');
        if (overlay) overlay.classList.remove('active');
        this.saveUserData();
    },
    
    getExperienceTitle: function(type) {
        const titles = {
            'school-choice': '智能择校匹配',
            'exam-prep': '备考方案生成',
            'background': '背景提升规划',
            'interview': '面试模拟训练',
            'default': '快速体验'
        };
        return titles[type] || titles.default;
    },
    
    getExperienceContent: function(type) {
        const contents = {
            'school-choice': this.getSchoolChoiceContent(),
            'exam-prep': this.getExamPrepContent(),
            'default': this.getDefaultContent()
        };
        return contents[type] || contents.default;
    },
    
    getSchoolChoiceContent: function() {
        return `
            <div class="drawer-form-group">
                <label class="drawer-form-label">当前学历</label>
                <select class="drawer-form-select" id="exp-education">
                    <option value="undergraduate">本科在读</option>
                    <option value="graduate">研究生在读</option>
                    <option value="college">专科在读</option>
                </select>
            </div>
            <div class="drawer-form-group">
                <label class="drawer-form-label">目标学历</label>
                <select class="drawer-form-select" id="exp-target">
                    <option value="master">硕士研究生</option>
                    <option value="doctor">博士研究生</option>
                    <option value="abroad">海外留学</option>
                </select>
            </div>
            <div class="drawer-form-group">
                <label class="drawer-form-label">GPA/成绩</label>
                <input type="text" class="drawer-form-input" id="exp-gpa" placeholder="例如：3.8/4.0">
            </div>
            <div class="drawer-form-group">
                <label class="drawer-form-label">目标专业方向</label>
                <input type="text" class="drawer-form-input" id="exp-major" placeholder="例如：计算机科学与技术">
            </div>
            <button class="drawer-btn primary" onclick="ExperienceDrawer.generateSchoolChoiceResult()">
                生成推荐方案
            </button>
        `;
    },
    
    getExamPrepContent: function() {
        return `
            <div class="drawer-form-group">
                <label class="drawer-form-label">考试类型</label>
                <select class="drawer-form-select" id="exp-exam-type">
                    <option value="postgraduate">全国硕士研究生招生考试</option>
                    <option value="toefl">TOEFL</option>
                    <option value="ielts">IELTS</option>
                </select>
            </div>
            <div class="drawer-form-group">
                <label class="drawer-form-label">目标分数</label>
                <input type="text" class="drawer-form-input" id="exp-target-score" placeholder="例如：400">
            </div>
            <div class="drawer-form-group">
                <label class="drawer-form-label">备考开始时间</label>
                <input type="text" class="drawer-form-input" id="exp-start-date" placeholder="例如：2024-06-01">
            </div>
            <div class="drawer-form-group">
                <label class="drawer-form-label">目标院校</label>
                <input type="text" class="drawer-form-input" id="exp-target-school" placeholder="例如：北京大学">
            </div>
            <button class="drawer-btn primary" onclick="ExperienceDrawer.generateExamPrepResult()">
                生成备考计划
            </button>
        `;
    },
    
    getDefaultContent: function() {
        return `
            <div class="drawer-form-group">
                <label class="drawer-form-label">请输入您的需求</label>
                <textarea class="drawer-form-textarea" id="exp-description" placeholder="请描述您的需求..."></textarea>
            </div>
            <button class="drawer-btn primary" onclick="ExperienceDrawer.generateDefaultResult()">
                生成方案
            </button>
        `;
    },
    
    autoFillData: function() {
        const fields = ['education', 'target', 'gpa', 'major'];
        fields.forEach(field => {
            const el = document.getElementById(`exp-${field}`);
            if (el && this.userData[field]) {
                el.value = this.userData[field];
            }
        });
    },
    
    collectFormData: function() {
        const fields = ['education', 'target', 'gpa', 'major', 'exam-type', 'target-score', 'start-date', 'target-school', 'description'];
        fields.forEach(field => {
            const el = document.getElementById(`exp-${field}`);
            if (el) {
                this.userData[field] = el.value;
            }
        });
        this.saveUserData();
    },
    
    generateSchoolChoiceResult: function() {
        const btn = event.target;
        this.setButtonLoading(btn, true);
        
        this.collectFormData();
        
        // 模拟生成过程
        setTimeout(() => {
            const resultContent = document.getElementById('drawerContent');
            const resultActions = document.getElementById('drawerResultActions');
            
            if (resultContent) {
                resultContent.innerHTML = `
                    <div class="drawer-result-preview">
                        <h3 class="drawer-result-title">智能择校推荐方案</h3>
                        <div class="drawer-result-content">
                            <strong>目标院校推荐：</strong><br>
                            1. 北京大学（冲刺院校）<br>
                            2. 清华大学（冲刺院校）<br>
                            3. 复旦大学（稳妥院校）<br>
                            4. 上海交通大学（稳妥院校）<br>
                            5. 浙江大学（保底院校）<br><br>
                            <strong>专业方向分析：</strong><br>
                            根据您的背景，推荐申请计算机科学与技术、人工智能、软件工程等相关专业。<br><br>
                            <strong>申请建议：</strong><br>
                            建议提前准备好成绩单、推荐信、个人陈述等材料，建议在9月前完成所有准备工作。
                        </div>
                    </div>
                `;
            }
            if (resultActions) resultActions.style.display = 'flex';
            
            this.setButtonLoading(btn, false);
        }, 800);
    },
    
    generateExamPrepResult: function() {
        const btn = event.target;
        this.setButtonLoading(btn, true);
        
        this.collectFormData();
        
        setTimeout(() => {
            const resultContent = document.getElementById('drawerContent');
            const resultActions = document.getElementById('drawerResultActions');
            
            if (resultContent) {
                resultContent.innerHTML = `
                    <div class="drawer-result-preview">
                        <h3 class="drawer-result-title">个性化备考计划</h3>
                        <div class="drawer-result-content">
                            <strong>第一阶段（基础夯实）：</strong><br>
                            数学：高等数学、线性代数、概率论与数理统计<br>
                            英语：词汇积累、阅读训练<br><br>
                            <strong>第二阶段（强化提升）：</strong><br>
                            专业课：系统复习、重点突破<br>
                            真题训练：近10年真题解析<br><br>
                            <strong>第三阶段（冲刺模考）：</strong><br>
                            模拟考试、查漏补缺、心态调整
                        </div>
                    </div>
                `;
            }
            if (resultActions) resultActions.style.display = 'flex';
            
            this.setButtonLoading(btn, false);
        }, 800);
    },
    
    generateDefaultResult: function() {
        const btn = event.target;
        this.setButtonLoading(btn, true);
        
        this.collectFormData();
        
        setTimeout(() => {
            const resultContent = document.getElementById('drawerContent');
            const resultActions = document.getElementById('drawerResultActions');
            
            if (resultContent) {
                resultContent.innerHTML = `
                    <div class="drawer-result-preview">
                        <h3 class="drawer-result-title">初步方案</h3>
                        <div class="drawer-result-content">
                            感谢您的咨询！我们已收到您的需求，这是一个初步方案。<br><br>
                            为了给您提供更精准的服务，请登录后使用完整功能。
                        </div>
                    </div>
                `;
            }
            if (resultActions) resultActions.style.display = 'flex';
            
            this.setButtonLoading(btn, false);
        }, 800);
    },
    
    setButtonLoading: function(btn, isLoading) {
        if (!btn) return;
        if (isLoading) {
            btn.classList.add('loading');
            btn.setAttribute('disabled', 'disabled');
        } else {
            btn.classList.remove('loading');
            btn.removeAttribute('disabled');
        }
    },
    
    copyResult: function() {
        const resultContent = document.querySelector('.drawer-result-content');
        if (resultContent) {
            const text = resultContent.innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('复制成功！');
            }).catch(() => {
                alert('复制失败，请手动复制');
            });
        }
    },
    
    exportResult: function() {
        alert('PDF导出功能即将上线，敬请期待！');
    },
    
    showQRCode: function() {
        alert('扫码保存功能即将上线，敬请期待！');
    }
};

// ========== 新增功能：多分支流程切换 ==========

const BranchFlow = {
    init: function() {
        document.querySelectorAll('.branch-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchBranch(tab));
        });
        
        document.querySelectorAll('.loop-path-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleLoopPath(toggle));
        });
    },
    
    switchBranch: function(tab) {
        const branchId = tab.getAttribute('data-branch');
        const parent = tab.closest('.branch-tabs').parentElement;
        
        // 更新标签状态
        parent.querySelectorAll('.branch-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 显示对应内容
        parent.querySelectorAll('.branch-content').forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(`branch-${branchId}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    },
    
    toggleLoopPath: function(toggle) {
        toggle.classList.toggle('expanded');
    }
};

// ========== 新增功能：Tab状态记忆 ==========

const TabMemory = {
    STORAGE_KEY: 'lastActiveTab',
    URL_HASH_PREFIX: 'tab=',
    
    init: function() {
        this.setupURLHashSync();
        this.restoreTabState();
        this.setupTabListener();
        this.setupContentPreloading();
    },
    
    setupURLHashSync: function() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash && hash.includes(this.URL_HASH_PREFIX)) {
                const tabId = hash.split(this.URL_HASH_PREFIX)[1];
                if (tabId) {
                    this.activateTabById(tabId);
                }
            }
        });
    },
    
    activateTabById: function(tabId) {
        const tab = document.querySelector(`.sub-tab[data-tab="${tabId}"]`);
        if (tab) {
            tab.click();
        }
    },
    
    setupTabListener: function() {
        document.querySelectorAll('.sub-tab, .tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                if (tabId) {
                    this.saveTabState(tabId);
                    this.updateURLHash(tabId);
                    this.syncDataToTab(tabId);
                }
            });
        });
    },
    
    updateURLHash: function(tabId) {
        const newHash = `${this.URL_HASH_PREFIX}${tabId}`;
        if (window.location.hash !== newHash) {
            history.replaceState(null, '', `#${newHash}`);
        }
    },
    
    saveTabState: function(tabId) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
                tabId: tabId,
                timestamp: Date.now(),
                engineId: this.getCurrentEngineId()
            }));
        } catch (e) {
            console.warn('无法保存标签状态');
        }
    },
    
    getCurrentEngineId: function() {
        const activeEngine = document.querySelector('.engine-tab-btn.active');
        return activeEngine ? activeEngine.getAttribute('data-engine') : null;
    },
    
    restoreTabState: function() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const state = JSON.parse(saved);
                if (state.tabId && state.engineId === this.getCurrentEngineId()) {
                    const currentHash = window.location.hash;
                    if (!currentHash || !currentHash.includes(this.URL_HASH_PREFIX)) {
                        setTimeout(() => {
                            this.activateTabById(state.tabId);
                        }, 100);
                    }
                }
            }
        } catch (e) {
            console.warn('无法恢复标签状态');
        }
    },
    
    syncDataToTab: function(targetTabId) {
        const syncedData = CrossTabDataSync.getSharedData();
        if (syncedData && Object.keys(syncedData).length > 0) {
            CrossTabDataSync.applyToTab(targetTabId, syncedData);
        }
    },
    
    setupContentPreloading: function() {
        document.querySelectorAll('.sub-tab').forEach(tab => {
            tab.addEventListener('mouseenter', () => {
                const tabId = tab.getAttribute('data-tab');
                if (tabId) {
                    this.preloadTabContent(tabId);
                }
            }, { once: true });
        });
    },
    
    preloadTabContent: function(tabId) {
        const targetPanel = document.getElementById(`flow-${tabId}`);
        if (targetPanel && !targetPanel.classList.contains('preloaded')) {
            targetPanel.classList.add('preloaded');
        }
    }
};

// ========== 新增功能：跨Tab数据同步 ==========

const CrossTabDataSync = {
    SYNC_STORAGE_KEY: 'crossTabSyncData',
    
    saveData: function(key, data) {
        try {
            const existing = this.getSharedData();
            existing[key] = data;
            localStorage.setItem(this.SYNC_STORAGE_KEY, JSON.stringify(existing));
        } catch (e) {
            console.warn('无法保存跨Tab数据');
        }
    },
    
    getSharedData: function() {
        try {
            const saved = localStorage.getItem(this.SYNC_STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    },
    
    applyToTab: function(tabId, data) {
        console.log(`同步数据到Tab: ${tabId}`, data);
    }
};

// ========== 新增功能：联动入口触发 ==========

const EcosystemLink = {
    sharedData: {},
    SYNC_DATA_KEY: 'ecosystemSyncData',
    
    init: function() {
        this.setupLinkEvents();
        this.loadSharedData();
        this.setupSceneTriggers();
    },
    
    setupLinkEvents: function() {
        document.querySelectorAll('.eco-link, .ecosystem-scene-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetEngine = link.getAttribute('data-target');
                const dataKey = link.getAttribute('data-key');
                this.navigateAndShare(targetEngine, dataKey);
            });
        });
    },
    
    setupSceneTriggers: function() {
        document.querySelectorAll('.step-experience-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const experienceType = btn.getAttribute('data-experience');
                if (experienceType) {
                    this.collectCurrentStageData(experienceType);
                }
            });
        });
    },
    
    collectCurrentStageData: function(experienceType) {
        const data = {
            timestamp: Date.now(),
            experience: experienceType,
            source: this.getCurrentEngineAndTab()
        };
        this.saveSceneData(experienceType, data);
    },
    
    getCurrentEngineAndTab: function() {
        const activeEngine = document.querySelector('.engine-tab-btn.active');
        const activeTab = document.querySelector('.sub-tab.active');
        return {
            engine: activeEngine ? activeEngine.getAttribute('data-engine') : null,
            tab: activeTab ? activeTab.getAttribute('data-tab') : null
        };
    },
    
    navigateAndShare: function(targetEngine, dataKey) {
        if (dataKey) {
            localStorage.setItem(this.SYNC_DATA_KEY, JSON.stringify({
                key: dataKey,
                data: this.sharedData[dataKey] || {},
                from: window.location.href,
                timestamp: Date.now()
            }));
        }
        
        if (targetEngine) {
            const targetEngineId = this.getEngineIdMapping(targetEngine);
            window.location.href = `engines.html#${targetEngineId}`;
        }
    },
    
    getEngineIdMapping: function(shortId) {
        const mapping = {
            'shengxue': 'shengxuechuang',
            'yansai': 'yansaichuang',
            'zhitu': 'zhituchuang'
        };
        return mapping[shortId] || shortId;
    },
    
    saveSceneData: function(key, data) {
        this.sharedData[key] = data;
        try {
            localStorage.setItem(`scene_${key}`, JSON.stringify(data));
        } catch (e) {
            console.warn('无法保存场景数据');
        }
    },
    
    saveSharedData: function(key, data) {
        this.sharedData[key] = data;
    },
    
    loadSharedData: function() {
        try {
            const saved = localStorage.getItem('sharedData');
            if (saved) {
                const data = JSON.parse(saved);
                console.log('收到共享数据:', data);
            }
        } catch (e) {
            console.warn('无法加载共享数据');
        }
    }
};

// ========== 微动效分级管控 ==========

const AnimationHierarchy = {
    LEVELS: {
        CORE: 'core',
        ENHANCED: 'enhanced',
        DECORATIVE: 'decorative'
    },
    STORAGE_KEY: 'animationLevel',
    currentLevel: null,
    
    init: function() {
        this.detectPerformance();
        this.setupToggleControl();
        this.applyAnimationLevel();
    },
    
    detectPerformance: function() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.currentLevel = saved;
            return;
        }
        
        const isLowPerformance = navigator.hardwareConcurrency <= 2 || 
                                  /Android|iPhone|iPad/.test(navigator.userAgent);
        
        if (isLowPerformance) {
            this.currentLevel = this.LEVELS.CORE;
        } else {
            this.currentLevel = this.LEVELS.ENHANCED;
        }
        this.savePreference();
    },
    
    setupToggleControl: function() {
        const toggleBtn = document.getElementById('animationToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.cycleLevel();
            });
        }
    },
    
    cycleLevel: function() {
        const levels = Object.values(this.LEVELS);
        const currentIndex = levels.indexOf(this.currentLevel);
        const nextIndex = (currentIndex + 1) % levels.length;
        this.currentLevel = levels[nextIndex];
        this.savePreference();
        this.applyAnimationLevel();
    },
    
    savePreference: function() {
        try {
            localStorage.setItem(this.STORAGE_KEY, this.currentLevel);
        } catch (e) {
            console.warn('无法保存动画偏好');
        }
    },
    
    applyAnimationLevel: function() {
        const body = document.body;
        body.classList.remove(this.LEVELS.CORE, this.LEVELS.ENHANCED, this.LEVELS.DECORATIVE);
        body.classList.add(this.currentLevel);
        
        this.updateToggleButton();
    },
    
    updateToggleButton: function() {
        const toggleBtn = document.getElementById('animationToggle');
        if (toggleBtn) {
            const levelNames = {
                [this.LEVELS.CORE]: '核心动效',
                [this.LEVELS.ENHANCED]: '增强动效',
                [this.LEVELS.DECORATIVE]: '全部动效'
            };
            toggleBtn.textContent = levelNames[this.currentLevel] || '动效设置';
        }
    },
    
    isCoreEnabled: function() {
        return true;
    },
    
    isEnhancedEnabled: function() {
        return this.currentLevel !== this.LEVELS.CORE;
    },
    
    isDecorativeEnabled: function() {
        return this.currentLevel === this.LEVELS.DECORATIVE;
    }
};

// ========== 页面初始化 ==========

// ========== 落地成果 Hero 页面动效 ==========
const AchievementHero = {
    init: function() {
        const heroScreen = document.querySelector('.achievement-hero-screen');
        if (!heroScreen) return;
        
        this.animateStats();
        this.addScrollParallax();
        this.addParticleRandomness();
        this.addSmoothScroll();
    },
    
    animateStats: function() {
        const statCards = document.querySelectorAll('.stat-card-achievement');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    if (numberEl && !numberEl.dataset.animated) {
                        numberEl.dataset.animated = 'true';
                        this.counterAnimation(numberEl);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        statCards.forEach(card => observer.observe(card));
    },
    
    counterAnimation: function(element) {
        const text = element.textContent;
        let targetNumber = 0;
        let suffix = '';
        
        if (text.includes('+')) {
            targetNumber = parseInt(text);
            suffix = '+';
        } else {
            targetNumber = parseInt(text);
        }
        
        let current = 0;
        const duration = 2000;
        const increment = targetNumber / (duration / 16);
        const start = performance.now();
        
        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            current = Math.floor(easeOutQuart * targetNumber);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = targetNumber + suffix;
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    addScrollParallax: function() {
        const visualPanel = document.querySelector('.visual-panel');
        if (!visualPanel) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const parallaxSpeed = 0.1;
            visualPanel.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        });
    },
    
    addParticleRandomness: function() {
        const particles = document.querySelectorAll('.particle-rocket');
        particles.forEach((particle, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 5 + Math.random() * 3;
            particle.style.animationDelay = `${randomDelay}s`;
            particle.style.animationDuration = `${randomDuration}s`;
        });
    },
    
    addSmoothScroll: function() {
        const scrollIndicator = document.getElementById('scrollToMore');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.achievement-stats');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
};

// ========== 新核心引擎页面交互功能 ==========
const NewEnginesPage = {
    currentEngine: 'shengxue',
    currentSubTab: 's1',
    
    init: function() {
        this.setupHeroParticles();
        this.setupEngineCardClicks();
        this.setupSidebarNavigation();
        this.setupSubmoduleTabs();
        this.setupScrollIndicator();
        this.setupSmoothScroll();
    },
    
    setupHeroParticles: function() {
        const container = document.getElementById('hero-particles');
        if (!container) return;
        
        const particleCount = 8;
        const colors = ['rgba(255, 255, 255, 0.4)', 'rgba(22, 93, 255, 0.3)', 'rgba(134, 86, 255, 0.3)', 'rgba(0, 196, 140, 0.3)'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-item';
            particle.style.left = `${10 + Math.random() * 80}%`;
            particle.style.top = `${10 + Math.random() * 80}%`;
            particle.style.background = colors[i % colors.length];
            particle.style.animationDelay = `${i * 0.3}s`;
            container.appendChild(particle);
        }
    },
    
    setupEngineCardClicks: function() {
        const cards = document.querySelectorAll('.engine-card');
        const buttons = document.querySelectorAll('.engine-card-btn');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const engine = card.getAttribute('data-engine');
                if (engine) {
                    this.switchEngine(engine);
                    const detailSection = document.getElementById('engines-detail');
                    if (detailSection) {
                        detailSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const engine = btn.getAttribute('data-engine');
                if (engine) {
                    this.switchEngine(engine);
                    const detailSection = document.getElementById('engines-detail');
                    if (detailSection) {
                        detailSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    },
    
    switchEngine: function(engineId) {
        this.currentEngine = engineId;
        
        // 更新卡片按钮状态
        document.querySelectorAll('.engine-card-btn').forEach(btn => {
            if (btn.getAttribute('data-engine') === engineId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 更新左侧导航引擎按钮
        document.querySelectorAll('.nav-engine-btn').forEach(btn => {
            if (btn.getAttribute('data-engine') === engineId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 切换子模块显示
        document.querySelectorAll('.sub-modules-group').forEach(group => {
            if (group.getAttribute('data-engine') === engineId) {
                group.style.display = 'flex';
                const firstTab = group.querySelector('.sub-module-tab');
                if (firstTab) firstTab.click();
            } else {
                group.style.display = 'none';
            }
        });
        
        // 切换右侧内容面板
        document.querySelectorAll('.engine-content-panel').forEach(panel => {
            if (panel.getAttribute('data-engine') === engineId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        
        // 更新进度条
        this.updateProgressBar(engineId);
    },
    
    setupSidebarNavigation: function() {
        const engineBtns = document.querySelectorAll('.nav-engine-btn');
        
        engineBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const engineId = btn.getAttribute('data-engine');
                if (engineId) {
                    this.switchEngine(engineId);
                }
            });
        });
    },
    
    setupSubmoduleTabs: function() {
        const subTabs = document.querySelectorAll('.sub-module-tab');
        
        subTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                const parentGroup = tab.closest('.sub-modules-group');
                
                // 更新子标签状态
                parentGroup.querySelectorAll('.sub-module-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 切换子模块面板
                const currentEnginePanel = document.querySelector('.engine-content-panel.active');
                if (currentEnginePanel) {
                    currentEnginePanel.querySelectorAll('.sub-module-panel').forEach(panel => {
                        if (panel.getAttribute('data-tab') === tabId) {
                            panel.classList.add('active');
                        } else {
                            panel.classList.remove('active');
                        }
                    });
                }
                
                this.currentSubTab = tabId;
                this.updateStageActive(tabId);
            });
        });
    },
    
    updateProgressBar: function(engineId) {
        const progressContainer = document.querySelector('.four-stages-progress');
        if (!progressContainer) return;
        
        const stageItems = progressContainer.querySelectorAll('.stage-item');
        const stageConnectors = progressContainer.querySelectorAll('.stage-connector');
        
        stageItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        stageConnectors.forEach(conn => {
            const fill = conn.querySelector('.stage-connector::after');
            if (fill) {
                fill.style.width = '0';
            }
        });
    },
    
    updateStageActive: function(tabId) {
        // 根据当前子标签更新进度条状态
        const progressContainer = document.querySelector('.four-stages-progress');
        if (!progressContainer) return;
        
        const stageItems = progressContainer.querySelectorAll('.stage-item');
        const stageConnectors = progressContainer.querySelectorAll('.stage-connector');
        
        const stageMap = {
            's1': 0, 's2': 1, 's3': 2, 's4': 3,
            'y1': 0, 'y2': 1, 'y3': 2,
            'z1': 0, 'z2': 1
        };
        
        const activeIndex = stageMap[tabId] || 0;
        
        stageItems.forEach((item, index) => {
            if (index <= activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },
    
    setupScrollIndicator: function() {
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(scrollIndicator.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    },
    
    setupSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
};

// ========== 生态联动区域交互 ==========
const EcoSystemInteraction = {
    init: function() {
        this.setupEcoNodeEffects();
        this.setupEcoButtons();
    },
    
    setupEcoNodeEffects: function() {
        const ecoNodes = document.querySelectorAll('.eco-node');
        
        ecoNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = '';
            });
        });
    },
    
    setupEcoButtons: function() {
        const ctaBtn = document.querySelector('.ecosystem-cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                alert('感谢您的关注！请先登录以体验完整功能。');
            });
        }
        
        const linkBtn = document.querySelector('.ecosystem-link-btn');
        if (linkBtn) {
            linkBtn.addEventListener('click', () => {
                window.location.href = 'solutions.html';
            });
        }
    }
};

// ========== 核心引擎主页交互 ==========
const EnginesMainPage = {
    init: function() {
        this.initParticles();
        this.initScrollEffects();
        this.initCardAnimations();
    },
    
    initParticles: function() {
        const particlesContainer = document.getElementById('hero-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-item';
            particlesContainer.appendChild(particle);
        }
    },
    
    initScrollEffects: function() {
        const sections = document.querySelectorAll('.engines-overview, .modules-overview, .ecosystem-showcase, .quick-entry');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sections.forEach(section => {
            section.classList.add('scroll-reveal');
            observer.observe(section);
        });
    },
    
    initCardAnimations: function() {
        const cards = document.querySelectorAll('.engine-card, .module-card, .entry-card');
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
};

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    const isEnginesPage = window.location.pathname.includes('engines.html');
    const isNewEnginesPage = document.querySelector('.engines-main-page') !== null;
    
    if (isEnginesPage && isNewEnginesPage) {
        EnginesMainPage.init();
        NewEnginesPage.init();
        EcoSystemInteraction.init();
    } else if (isEnginesPage) {
        ImmersiveScroll.init();
        ExperienceDrawer.init();
        BranchFlow.init();
        TabMemory.init();
        EcosystemLink.init();
        AnimationHierarchy.init();
    }

    // 落地成果页面初始化
    AchievementHero.init();
});
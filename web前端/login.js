// ========== 登录/注册页面 JavaScript ==========

document.addEventListener('DOMContentLoaded', function() {
    // 标签切换
    const tabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            if (tabId === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
                // 重置注册步骤
                document.querySelectorAll('.register-step').forEach(step => step.style.display = 'none');
                document.querySelector('.step-1').style.display = 'block';
            }
        });
    });

    // 注册步骤切换
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = document.querySelector('.register-step:not([style*="display: none"])');
            const stepNum = currentStep ? currentStep.classList.contains('step-1') ? 1 : 
                           currentStep.classList.contains('step-2') ? 2 : 3 : 1;
            
            // 步骤验证
            let valid = true;
            
            if (stepNum === 1) {
                // 验证第一步：手机号、验证码、密码
                const phone = document.getElementById('register-phone').value.trim();
                const captcha = document.getElementById('register-captcha').value.trim();
                const password = document.getElementById('register-password').value.trim();
                
                if (!phone) {
                    alert('请输入手机号码');
                    valid = false;
                } else if (!/^1[3-9]\d{9}$/.test(phone)) {
                    alert('请输入正确的手机号码');
                    valid = false;
                } else if (!captcha) {
                    alert('请输入验证码');
                    valid = false;
                } else if (!password) {
                    alert('请设置密码');
                    valid = false;
                } else if (password.length < 6) {
                    alert('密码至少需要6位');
                    valid = false;
                }
            } else if (stepNum === 2) {
                // 第二步已经选择了身份，直接通过
                valid = true;
            }
            
            if (!valid) return;
            
            const nextStep = this.getAttribute('data-step');
            document.querySelectorAll('.register-step').forEach(step => step.style.display = 'none');
            document.querySelector(`.step-${nextStep}`).style.display = 'block';
            
            // 如果进入第三步，根据选择的身份加载子身份选项
            if (nextStep === '3') {
                loadSubIdentityOptions();
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-step');
            document.querySelectorAll('.register-step').forEach(step => step.style.display = 'none');
            document.querySelector(`.step-${prevStep}`).style.display = 'block';
        });
    });

    // 身份选择
    const identityCards = document.querySelectorAll('.identity-card');
    let selectedIdentity = 'personal';

    // 初始化时隐藏个人用户的资质上传
    const certGroup = document.getElementById('cert-upload-group');
    if (certGroup) {
        certGroup.style.display = 'none';
    }

    identityCards.forEach(card => {
        card.addEventListener('click', function() {
            identityCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedIdentity = this.getAttribute('data-identity');
            
            // 根据身份显示/隐藏资质上传区域
            if (certGroup) {
                if (selectedIdentity === 'personal') {
                    certGroup.style.display = 'none';
                } else {
                    certGroup.style.display = 'block';
                }
            }
        });
    });

    // 加载子身份选项
    function loadSubIdentityOptions() {
        const select = document.getElementById('sub-identity');
        select.innerHTML = '';
        
        const identities = {
            personal: [
                { value: 'student', label: '在校大学生' },
                { value: 'fresh', label: '应届毕业生' },
                { value: 'graduate', label: '往届毕业生' },
                { value: '选调生', label: '选调生' },
                { value: 'professional', label: '职场人群' }
            ],
            school: [
                { value: 'admin', label: '高校管理员' },
                { value: 'teacher', label: '高校教师' }
            ],
            enterprise: [
                { value: 'enterprise-admin', label: '企业管理员' },
                { value: 'hr', label: '企业HR' }
            ]
        };

        identities[selectedIdentity].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            select.appendChild(option);
        });
    }

    // 验证码按钮
    const getCaptchaBtn = document.getElementById('get-captcha');
    getCaptchaBtn.addEventListener('click', function() {
        const phone = document.getElementById('login-phone').value;
        if (!phone) {
            alert('请先输入手机号码');
            return;
        }
        // 模拟获取验证码
        this.disabled = true;
        this.textContent = '60秒后重试';
        let count = 60;
        const timer = setInterval(() => {
            count--;
            this.textContent = count + '秒后重试';
            if (count === 0) {
                clearInterval(timer);
                this.disabled = false;
                this.textContent = '获取验证码';
            }
        }, 1000);
    });

    const getRegisterCaptchaBtn = document.getElementById('get-register-captcha');
    getRegisterCaptchaBtn.addEventListener('click', function() {
        const phone = document.getElementById('register-phone').value;
        if (!phone) {
            alert('请先输入手机号码');
            return;
        }
        this.disabled = true;
        this.textContent = '60秒后重试';
        let count = 60;
        const timer = setInterval(() => {
            count--;
            this.textContent = count + '秒后重试';
            if (count === 0) {
                clearInterval(timer);
                this.disabled = false;
                this.textContent = '获取验证码';
            }
        }, 1000);
    });

    // 登录表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('登录成功，正在跳转...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    // 注册表单提交
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const terms = document.getElementById('terms-checkbox');
        if (!terms.checked) {
            alert('请阅读并同意服务条款和隐私政策');
            return;
        }
        
        let message = '';
        if (selectedIdentity === 'personal') {
            message = '注册成功！现在可以直接登录使用平台功能了。';
        } else if (selectedIdentity === 'school') {
            message = '注册成功！您的高校资质已提交审核，请等待1-3个工作日，审核通过后即可使用管理功能。';
        } else if (selectedIdentity === 'enterprise') {
            message = '注册成功！您的企业资质已提交审核，请等待1-3个工作日，审核通过后即可使用招聘功能。';
        }
        
        alert(message);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});
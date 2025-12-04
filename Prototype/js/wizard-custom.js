document.addEventListener('DOMContentLoaded', function() {
    // --- Data: Digital Employee Training Ground Models ---
    const trainingModels = [
        {
            id: 'role-coldchain',
            name: '冷链卫士',
            version: 'v2.0',
            desc: '专注于百胜中国冷链物流全链路智能监。',
            dept: '供应链-物流运输',
            role: '冷链监控专员',
            icon: 'fa-temperature-low', // 温度计图标
            tags: ['温度实时监控', '路径智能规划', '到货准时预警'],
            tools: [
                { name: 'Temp-Guard', desc: '车厢温度实时回传' },
                { name: 'Route-Plan', desc: '最优配送路径规划' },
                { name: 'ETA-Alert', desc: '延误风险自动预警' },
                { name: 'IOT-Connect', desc: '车载设备状态自检' }
            ],
            stats: { accuracy: '99.9%', speed: '实时', trained: '≥ 1200小时' }
        },
        {
            id: 'role-purchase',
            name: '采购智能助手',
            version: 'v1.8',
            desc: '智能化的采购流程与供应商管理助手。',
            dept: '供应链-采购部',
            role: '采购执行专员',
            icon: 'fa-cart-shopping',
            tags: ['智能比价', '自动下单', '到货预测'],
            tools: [
                { name: 'Price-Comp', desc: '供应商招募审核助手' },
                { name: 'PO-Gen', desc: '采购需求分析' },
                { name: 'ETA-Predict', desc: '到货周期计算' },
                { name: 'Supplier-Eval', desc: '供应商培育与管理' }
            ],
            stats: { accuracy: '98.5%', speed: '2min/单', trained: '≥ 820小时' }
        },
        {
            id: 'role-finance',
            name: '财务审批助手',
            version: 'v3.1',
            desc: '精准高效的财务单据审核专家，确保合规性。',
            dept: '财务',
            role: '财务审核专员',
            icon: 'fa-file-invoice-dollar',
            tags: ['发票验真', '合规扫描', '预算管控'],
            tools: [
                { name: 'Invoice-OCR', desc: '财报分析' },
                { name: 'Policy-Check', desc: '报销合规性扫描' },
                { name: 'Budget-Ctrl', desc: '预算额度管控' },
                { name: 'Tax-Calc', desc: 'ROI计算' }
            ],
            stats: { accuracy: '100%', speed: '5s/单', trained: '≥ 300小时' }
        },
        {
            id: 'role-hr',
            name: 'HR资料审核助手',
            version: 'v1.5',
            desc: '严谨细致的人事档案管理员，处理入职材料。',
            dept: '人力资源',
            role: '人事专员',
            icon: 'fa-user-check',
            tags: ['简历提取', '材料核查', '档案归档'],
            tools: [
                { name: 'Resume-Parse', desc: '简历信息提取' },
                { name: 'Doc-Verify', desc: '入职材料核查' },
                { name: 'Archive-Auto', desc: '档案自动归档' },
                { name: 'Back-Check', desc: '初步筛选' }
            ],
            stats: { accuracy: '97.8%', speed: '50s/人', trained: '≥ 432小时' }
        },
        {
            id: 'role-cs',
            name: '智能客服助手',
            version: 'v4.0',
            desc: '7x24小时在线的客户服务专家，提升满意度。',
            dept: 'DSC',
            role: '客服专员',
            icon: 'fa-headset',
            tags: ['意图识别', '多轮对话', '情绪安抚'],
            tools: [
                { name: 'NLP-Core', desc: '意图精准识别' },
                { name: 'Dialog-Flow', desc: '多轮对话管理' },
                { name: 'Sentiment', desc: '客户情绪监控' },
                { name: 'KB-Search', desc: '知识库语义检索' }
            ],
            stats: { accuracy: '95%', speed: '0.2s', trained: '≥ 393小时' }
        }
    ];

    // --- Avatar Data ---
    const avatarList = [
        '../Materials/冷链卫视.png',
        '../Materials/头像2.png',
        '../Materials/头像3.png',
        '../Materials/头像4.png',
        '../Materials/头像5.png',
        '../Materials/头像6.png',
        '../Materials/头像7.png',
        '../Materials/头像8.png',
        '../Materials/头像9.png',
        '../Materials/头像10.png'
    ];

    let currentWizardStep = 1;
    let selectedModelId = 'role-coldchain'; // Default updated
    let selectedAvatarSrc = '../Materials/头像1.png'; // Default

    // --- DOM Elements ---
    const btnNext = document.getElementById('wizNextBtn');
    const btnPrev = document.getElementById('wizPrevBtn');
    const btnSubmit = document.getElementById('wizSubmitBtn');
    
    const steps = document.querySelectorAll('.w-step');
    const stepViews = document.querySelectorAll('.step-view');

    // --- Init ---
    function initWizard() {
        renderScenarioList();
        renderAvatarGrid();
        
        // Select default to trigger UI state
        selectModel(selectedModelId, false); 
        selectAvatar(selectedAvatarSrc);

        updateStepView();
    }

    // --- Render Step 1: Training Ground (Split Layout) ---
    
    // 1. Render Left List
    function renderScenarioList() {
        const listContainer = document.getElementById('modelListContainer');
        if (!listContainer) return;

        listContainer.innerHTML = '';
        trainingModels.forEach(model => {
            const card = document.createElement('div');
            card.className = `model-card ${model.id === selectedModelId ? 'active' : ''}`;
            card.dataset.id = model.id;
            card.innerHTML = `
                <div class="model-icon"><i class="fa-solid ${model.icon}"></i></div>
                <div class="model-info">
                    <h5>${model.name} <span class="version-badge">${model.version}</span></h5>
                    <p>${model.desc}</p>
                </div>
            `;
            card.addEventListener('click', () => selectModel(model.id, true));
            listContainer.appendChild(card);
        });
    }

    // 2. Select Model & Update Right Preview
    function selectModel(id, updateForm = true) {
        selectedModelId = id;
        const model = trainingModels.find(m => m.id === id);
        
        // Update Left List UI
        document.querySelectorAll('.model-card').forEach(c => {
            c.classList.toggle('active', c.dataset.id === id);
        });

        // Update Right Preview UI
        const previewContainer = document.getElementById('modelPreviewContainer');
        if (previewContainer && model) {
            const toolsHtml = model.tools.map(t => `
                <div class="tool-item">
                    <div class="tool-icon-wrapper">
                        <i class="fa-solid fa-bolt tool-icon-inner"></i>
                    </div>
                    <div class="tool-content">
                        <div class="tool-name">${t.desc}</div>
                        <div class="tool-tech-id">${t.name}</div>
                    </div>
                </div>
            `).join('');

            previewContainer.innerHTML = `
                <div class="preview-header">
                    <div class="preview-title">
                        <h2>${model.name}</h2>
                        <p style="color:#888;">${model.desc}</p>
                    </div>
                    <div class="model-icon" style="background:var(--primary-color);color:white;">
                        <i class="fa-solid ${model.icon}"></i>
                    </div>
                </div>
                
                <div class="mcp-container">
                    <div class="mcp-title"><i class="fa-solid fa-wand-magic-sparkles"></i> 核心能力集 (Capabilities)</div>
                    <div class="tool-grid">
                        ${toolsHtml}
                    </div>
                </div>

                <div class="model-stats">
                    <div class="stat-box"><span class="stat-val">${model.stats.accuracy}</span><span class="stat-label">准确率</span></div>
                    <div class="stat-box"><span class="stat-val">${model.stats.speed}</span><span class="stat-label">响应速度</span></div>
                    <div class="stat-box"><span class="stat-val">${model.stats.trained}</span><span class="stat-label">训练时长</span></div>
                </div>
            `;
        }

        // Prefill Form Data (for Step 2)
        if(model && updateForm) {
            const roleInput = document.getElementById('wizRole');
            const deptInput = document.getElementById('wizDept');
            const nameInput = document.getElementById('wizName');
            
            if(roleInput) roleInput.value = model.role;
            if(deptInput) deptInput.value = model.dept;
             if(nameInput) {
                nameInput.value = model.name.replace('助手', '小助手');
            }
        }
    }

    // --- Render Step 2: Avatar Grid ---
    function renderAvatarGrid() {
        const grid = document.getElementById('avatarGrid');
        if(!grid) return;
        grid.innerHTML = '';

        avatarList.forEach(src => {
            const item = document.createElement('div');
            item.className = `avatar-item ${src === selectedAvatarSrc ? 'selected' : ''}`;
            item.dataset.src = src;
            // Add onerror to fallback to a safe image if file missing
            item.innerHTML = `<img src="${src}" onerror="this.src='../gif/合同审核.gif'">`; 
            
            item.addEventListener('click', () => selectAvatar(src));
            grid.appendChild(item);
        });
    }

    function selectAvatar(src) {
        selectedAvatarSrc = src;
        document.querySelectorAll('.avatar-item').forEach(i => {
            i.classList.toggle('selected', i.dataset.src === src);
        });
    }

    // --- Navigation Logic ---
    function updateStepView() {
        // Update Steps UI
        steps.forEach(s => {
            const sNum = parseInt(s.dataset.step);
            s.classList.toggle('active', sNum === currentWizardStep);
        });

        // Update Views visibility
        stepViews.forEach(v => {
            const vId = v.id; 
            const vNum = parseInt(vId.replace('stepView', ''));
            v.classList.toggle('active', vNum === currentWizardStep);
        });

        // Button State
        if (btnPrev) btnPrev.style.display = currentWizardStep === 1 ? 'none' : 'block';
        
        if (currentWizardStep === 3) {
            if (btnNext) btnNext.style.display = 'none';
            if (btnSubmit) btnSubmit.style.display = 'block';
            renderReviewStep();
        } else {
            if (btnNext) btnNext.style.display = 'block';
            if (btnSubmit) btnSubmit.style.display = 'none';
        }
    }

    // Bind Buttons
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (currentWizardStep < 3) {
                currentWizardStep++;
                updateStepView();
            }
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentWizardStep > 1) {
                currentWizardStep--;
                updateStepView();
            }
        });
    }

    // --- Render Step 3 (Review) ---
    function renderReviewStep() {
        const reviewContainer = document.getElementById('reviewContainer');
        const model = trainingModels.find(m => m.id === selectedModelId);
        const name = document.getElementById('wizName').value || '未命名';
        const role = document.getElementById('wizRole').value || '通用岗位';
        const dept = document.getElementById('wizDept').value;

        if (reviewContainer && model) {
            reviewContainer.innerHTML = `
                <div class="final-review-layout">
                    <!-- Left: ID Card -->
                    <div class="id-card-section">
                        <div class="id-card-content">
                            <div class="id-avatar-container">
                                <div class="avatar-pulse-ring"></div>
                                <img src="${selectedAvatarSrc}" alt="Avatar" onerror="this.src='../gif/合同审核.gif'">
                            </div>
                            <div class="id-text-info">
                                <h2 class="id-name">${name}</h2>
                                <p class="id-role">${dept} · ${role}</p>
                            </div>
                            <div class="id-chip">
                                <i class="fa-solid fa-microchip"></i>
                                <span>DIGITAL EMPLOYEE</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Config Specs -->
                    <div class="config-specs-section">
                        <div class="specs-header">
                            <h3><i class="fa-solid fa-clipboard-check"></i> 配置清单 Specification</h3>
                            <span class="specs-date">${new Date().toLocaleDateString()}</span>
                        </div>

                        <div class="specs-body">
                            <div class="spec-row">
                                <div class="spec-group">
                                    <label>核心模型 Core Model</label>
                                    <div class="model-badge-lg">
                                        <div class="model-icon-box"><i class="fa-solid ${model.icon}"></i></div>
                                        <div class="model-text-box">
                                            <span class="m-name">${model.name}</span>
                                            <span class="m-ver">${model.version}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="spec-row">
                                <div class="spec-group full-width">
                                    <label>搭载能力 Capabilities</label>
                                    <div class="cap-pills">
                                        ${model.tools.map(t => `<div class="cap-pill"><i class="fa-solid fa-bolt"></i> ${t.desc}</div>`).join('')}
                                    </div>
                                </div>
                            </div>

                            <div class="spec-row grid-2">
                                <div class="spec-group">
                                    <label>响应效率 Speed</label>
                                    <div class="stat-display highlight">${model.stats.speed}</div>
                                </div>
                                <div class="spec-group">
                                    <label>知识集 Knowledge Base</label>
                                    <div class="stat-display">${model.stats.trained}</div>
                                </div>
                            </div>
                        </div>

                        <div class="ready-status-bar">
                            <div class="status-icon-box"><i class="fa-solid fa-check"></i></div>
                            <div class="status-text">
                                <h4>配置就绪 Ready to Deploy</h4>
                                <p>系统资源已预留，随时可以实例化。</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // --- Final Submit ---
    if (btnSubmit) {
        btnSubmit.addEventListener('click', () => {
            // Show Deployment Overlay
            const overlay = document.getElementById('deploymentOverlay');
            const deployAvatar = document.getElementById('deployAvatar');
            
            if (overlay && deployAvatar) {
                deployAvatar.src = selectedAvatarSrc; 
                overlay.classList.add('show');
                
                // Start Animation Sequence
                const progressBar = overlay.querySelector('.deploy-progress-bar');
                const steps = overlay.querySelectorAll('.d-step');
                
                // Reset State
                progressBar.style.width = '0%';
                steps.forEach(s => s.className = 'd-step pending');
                steps[0].className = 'd-step processing';
                
                setTimeout(() => {
                    progressBar.style.width = '30%';
                    steps[0].className = 'd-step active'; 
                    steps[1].className = 'd-step processing'; 
                }, 500);

                setTimeout(() => {
                    progressBar.style.width = '70%';
                    steps[1].className = 'd-step active'; 
                    steps[2].className = 'd-step processing'; 
                }, 2000);

                setTimeout(() => {
                    progressBar.style.width = '100%';
                    steps[2].className = 'd-step active'; 
                    steps[3].className = 'd-step active'; 
                    
                    const title = overlay.querySelector('.deploy-title');
                    const subtitle = overlay.querySelector('.deploy-subtitle');
                    if(title) title.innerText = '实例化完成';
                    if(subtitle) subtitle.innerText = '数字员工已就绪，即将跳转...';
                    
                }, 3500);

                setTimeout(() => {
                    overlay.classList.remove('show');
                    const modal = document.getElementById('newEmployeeModal');
                    if(modal) modal.classList.remove('show');
                    
                    // Simulate Badge Update
                    const navApproval = document.getElementById('navApproval');
                    if(navApproval) {
                        let badge = navApproval.querySelector('.sidebar-badge');
                        if(badge) badge.innerText = parseInt(badge.innerText) + 1;
                    }
                }, 5500);
            }
        });
    }

    initWizard();
});

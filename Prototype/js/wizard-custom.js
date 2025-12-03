document.addEventListener('DOMContentLoaded', function() {
    // --- Data: Digital Employee Training Ground Models ---
    const trainingModels = [
        {
            id: 'model-contract',
            name: '合同助手 Pro',
            version: 'v2.1.0',
            desc: '专精于法律合同审核与风险识别',
            icon: 'fa-file-contract',
            tools: [
                { name: 'contract_parser', desc: '结构化解析' },
                { name: 'risk_detector', desc: '法律风险条款识别' },
                { name: 'compliance_check', desc: '图像文本识别' },
                { name: 'esign_validator', desc: '租赁合同与附件对比' }
            ],
            stats: { accuracy: '99.8%', speed: '3s/页', trained: '50k+ 合同' }
        },
        {
            id: 'model-supply',
            name: '供应链物流专家',
            version: 'v1.5.2',
            desc: '物流路径优化与库存预测专家',
            icon: 'fa-truck-fast',
            tools: [
                { name: 'route_optimize', desc: '多点路径规划算法' },
                { name: 'inventory_forecast', desc: '销量时序预测' },
                { name: 'supplier_score', desc: '供应商绩效打分' }
            ],
            stats: { accuracy: '96.5%', speed: '实时', trained: '1M+ 订单' }
        },
        {
            id: 'model-hr',
            name: 'HR 政策通',
            version: 'v3.0.0',
            desc: '员工服务与政策解答助手',
            icon: 'fa-user-tie',
            tools: [
                { name: 'policy_rag', desc: '政策文档检索增强' },
                { name: 'payroll_calc', desc: '薪资个税计算器' },
                { name: 'onboarding_flow', desc: '入职流程自动化' }
            ],
            stats: { accuracy: '98.2%', speed: '0.5s', trained: '200+ 文档' }
        }
    ];

    let currentWizardStep = 1;
    let selectedModelId = 'model-contract'; // Default
    let selectedAvatarSrc = '../gif/合同审核.gif'; // Default

    // --- DOM Elements ---
    const wizardModal = document.getElementById('wizardModal'); // We will rename modal ID
    const btnNext = document.getElementById('wizNextBtn');
    const btnPrev = document.getElementById('wizPrevBtn');
    const btnSubmit = document.getElementById('wizSubmitBtn');
    
    const steps = document.querySelectorAll('.w-step');
    const stepViews = document.querySelectorAll('.step-view');

    // --- Init ---
    function initWizard() {
        renderModelList();
        selectModel('model-contract');
        updateStepView();
    }

    // --- Render Model List (Left Column) ---
    function renderModelList() {
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
            card.addEventListener('click', () => selectModel(model.id));
            listContainer.appendChild(card);
        });
    }

    // --- Select Model Logic ---
    function selectModel(id) {
        selectedModelId = id;
        const model = trainingModels.find(m => m.id === id);
        
        // Update List UI
        document.querySelectorAll('.model-card').forEach(c => {
            c.classList.toggle('active', c.dataset.id === id);
        });

        // Update Preview UI (Right Column)
        const previewContainer = document.getElementById('modelPreviewContainer');
        if (previewContainer && model) {
            // Render Tools
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
                    <div class="stat-box"><span class="stat-val">${model.stats.trained}</span><span class="stat-label">知识集</span></div>
                </div>
            `;
        }
    }

    // --- Avatar Selection ---
    const avatarItems = document.querySelectorAll('.avatar-item');
    avatarItems.forEach(item => {
        item.addEventListener('click', () => {
            avatarItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedAvatarSrc = item.dataset.src;
        });
    });

    // --- Navigation Logic ---
    function updateStepView() {
        // Header Steps
        steps.forEach(s => {
            const sNum = parseInt(s.dataset.step);
            s.classList.toggle('active', sNum === currentWizardStep);
        });

        // Content Views
        stepViews.forEach(v => {
            const vId = v.id; // stepView1, stepView2
            const vNum = parseInt(vId.replace('stepView', ''));
            v.classList.toggle('active', vNum === currentWizardStep);
        });

        // Buttons
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

        if (reviewContainer) {
            reviewContainer.innerHTML = `
                <div class="final-review-layout">
                    <!-- Left: ID Card -->
                    <div class="id-card-section">
                        <div class="id-card-content">
                            <div class="id-avatar-container">
                                <div class="avatar-pulse-ring"></div>
                                <img src="${selectedAvatarSrc}" alt="Avatar">
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
                deployAvatar.src = selectedAvatarSrc; // Set the selected avatar
                overlay.classList.add('show');
                
                // Start Animation Sequence
                const progressBar = overlay.querySelector('.deploy-progress-bar');
                const steps = overlay.querySelectorAll('.d-step');
                
                // Reset State
                progressBar.style.width = '0%';
                steps.forEach(s => s.className = 'd-step pending');
                steps[0].className = 'd-step processing';
                
                // Timeline Simulation
                setTimeout(() => {
                    progressBar.style.width = '30%';
                    steps[0].className = 'd-step active'; // Basic Info Done
                    steps[1].className = 'd-step processing'; // Model Loading
                }, 500);

                setTimeout(() => {
                    progressBar.style.width = '70%';
                    steps[1].className = 'd-step active'; // Model Loaded
                    steps[2].className = 'd-step processing'; // MCP Mounting
                }, 2000);

                setTimeout(() => {
                    progressBar.style.width = '100%';
                    steps[2].className = 'd-step active'; // MCP Done
                    steps[3].className = 'd-step active'; // Reg Done
                    
                    // Update Text to Success
                    const title = overlay.querySelector('.deploy-title');
                    const subtitle = overlay.querySelector('.deploy-subtitle');
                    if(title) title.innerText = '实例化完成';
                    if(subtitle) subtitle.innerText = '数字员工已就绪，即将跳转...';
                    
                }, 3500);

                // Finish & Close
                setTimeout(() => {
                    overlay.classList.remove('show');
                    
                    // Close Modal
                    const modal = document.getElementById('newEmployeeModal');
                    if(modal) modal.classList.remove('show');
                    
                    // Trigger Badge update (simulate)
                    const navApproval = document.getElementById('navApproval');
                    if(navApproval) {
                        let badge = navApproval.querySelector('.sidebar-badge');
                        if(badge) badge.innerText = parseInt(badge.innerText) + 1;
                    }
                    
                    // No Alert, just finish
                    
                }, 5500);
            }
        });
    }

    // Init
    initWizard();
});

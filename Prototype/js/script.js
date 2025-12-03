document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Mock Data ---
    const employees = [
        {
            id: 'AI-1001',
            name: '智胜',
            role: '供应链专家',
            dept: '供应链',
            status: 'active',
            avatar: '../gif/智胜.gif',
            joinDate: '2025-12-01',
            currentTask: '供应链车辆排程作业中.',
            dailyOutput: '327 Task',
            efficiency: [85, 90, 88, 95, 92],
            abilities: [95, 88, 92, 98, 90] // [逻辑, 速度, 准确, 创造, 稳定]
        },
        {
            id: 'AI-1002',
            name: '素问',
            role: '智能客服',
            dept: '一站式服务平台',
            status: 'active',
            avatar: '../gif/素问.gif',
            joinDate: '2024-03-10',
            currentTask: '处理徐家汇新美罗餐厅 KDS屏幕问题..',
            dailyOutput: '121 Task',
            efficiency: [88, 95, 96, 85, 94],
            abilities: [90, 95, 98, 85, 96]
        },
        {
            id: 'AI-1003',
            name: '酷派拉',
            role: '开店选址专家',
            dept: '开发部',
            status: 'active',
            avatar: '../gif/酷派拉.gif',
            joinDate: '2024-09-20',
            currentTask: '南京市百家湖商圈新址预估中..',
            dailyOutput: '198 Task',
            efficiency: [92, 98, 95, 90, 96],
            abilities: [98, 96, 99, 88, 95]
        },
        {
            id: 'AI-1004',
            name: '合同助手',
            role: '合同审核专员',
            dept: '法务部',
            status: 'idle',
            avatar: '../gif/合同审核.gif',
            joinDate: '2024-10-10',
            currentTask: '待命中',
            dailyOutput: '3 份合同',
            efficiency: [75, 70, 65, 60, 68],
            abilities: [92, 85, 96, 75, 90]
        }
    ];

    // --- 2. Initialize Global Charts ---
    initDashboardCharts();

    // --- 3. Render Table ---
    const tableBody = document.getElementById('employeeTableBody');
    const statusFilter = document.getElementById('statusFilter');

    function renderTable(filter = 'all') {
        tableBody.innerHTML = '';
        
        const filteredData = employees.filter(emp => 
            filter === 'all' || emp.status === filter
        );

        filteredData.forEach(emp => {
            const tr = document.createElement('tr');
            
            const statusClass = emp.status;
            const statusText = {
                'active': '运行中',
                'idle': '空闲',
                'error': '异常'
            }[emp.status];

            tr.innerHTML = `
                <td>#${emp.id}</td>
                <td>
                    <div class="user-cell">
                        <img src="${emp.avatar}" alt="${emp.name}">
                        <div class="user-text">
                            <h5>${emp.name}</h5>
                            <p>${emp.id}@YumChina.com</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="user-text">
                        <h5>${emp.role}</h5>
                        <p>${emp.dept}</p>
                    </div>
                </td>
                <td><span class="status-tag ${statusClass}">${statusText}</span></td>
                <td>${emp.currentTask}</td>
                <td>${emp.dailyOutput}</td>
                <td>
                    <button class="action-btn view-detail-btn" data-id="${emp.id}">
                        <i class="fa-solid fa-eye"></i> 查看详情
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Re-attach listeners
        document.querySelectorAll('.view-detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const empId = e.currentTarget.getAttribute('data-id');
                openDetailModal(empId);
            });
        });
    }

    renderTable();

    statusFilter.addEventListener('change', (e) => {
        renderTable(e.target.value);
    });

    // --- 4. Charts Implementation ---
    function initDashboardCharts() {
        // Chart 1: Efficiency Trend
        const effChart = echarts.init(document.getElementById('efficiencyChart'));
        effChart.setOption({
            backgroundColor: 'transparent',
            tooltip: { trigger: 'axis' },
            grid: { top: '10%', left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: { lineStyle: { color: '#555' } },
                axisLabel: { color: '#a0a0a0' }
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: '#333', type: 'dashed' } },
                axisLabel: { color: '#a0a0a0' }
            },
            series: [{
                name: '平均效益',
                type: 'line',
                smooth: true,
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                itemStyle: { color: '#6c5dd3' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(108, 93, 211, 0.5)' },
                        { offset: 1, color: 'rgba(108, 93, 211, 0)' }
                    ])
                }
            }]
        });

        // Chart 2: Performance Monitor
        const perfChart = echarts.init(document.getElementById('performanceChart'));
        perfChart.setOption({
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item' },
            series: [{
                name: '系统状态',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#1f1f1f',
                    borderWidth: 2
                },
                label: { show: false, position: 'center' },
                emphasis: {
                    label: { show: true, fontSize: 20, fontWeight: 'bold', color: '#fff' }
                },
                data: [
                    { value: 1048, name: '正常运行', itemStyle: { color: '#2ecc71' } },
                    { value: 735, name: '高负载', itemStyle: { color: '#f1c40f' } },
                    { value: 580, name: '休眠', itemStyle: { color: '#34495e' } },
                    { value: 484, name: '异常', itemStyle: { color: '#e74c3c' } }
                ]
            }]
        });

        window.addEventListener('resize', () => {
            effChart.resize();
            perfChart.resize();
        });
    }

    // --- 5. Modal Logic ---
    const modal = document.getElementById('detailModal');
    const closeModalBtn = document.getElementById('closeModal');
    let abilityChart = null;

    // Tab Switching
    const v2Tabs = document.querySelectorAll('.v2-tab');
    const v2Views = document.querySelectorAll('.view-content');

    v2Tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Toggle Tab Class
            v2Tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Toggle View
            const targetId = tab.getAttribute('data-target');
            v2Views.forEach(v => {
                if (v.id === targetId) {
                    v.classList.add('active');
                    // Resize chart if we switched to ability view
                    if (targetId === 'view-ability' && abilityChart) {
                         setTimeout(() => abilityChart.resize(), 50);
                    }
                } else {
                    v.classList.remove('active');
                }
            });
        });
    });

    function openDetailModal(empId) {
        const emp = employees.find(e => e.id === empId);
        if (!emp) return;

        // Reset Tabs to first one
        if(v2Tabs.length > 0) v2Tabs[0].click();

        // Populate Basic Info
        document.getElementById('modalAvatar').src = emp.avatar;
        document.getElementById('modalName').innerText = emp.name;
        document.getElementById('modalRole').innerText = emp.role;
        document.getElementById('modalId').innerText = '#' + emp.id;
        document.getElementById('modalDate').innerText = emp.joinDate;
        document.getElementById('modalDept').innerText = emp.dept;
        
        const statusBadge = document.getElementById('modalStatusBadge');
        statusBadge.innerText = emp.status === 'active' ? '运行中' : (emp.status === 'idle' ? '空闲' : '异常');
        
        // Populate Logs (Mock)
        const logList = document.getElementById('modalLogList');
        logList.innerHTML = `
            <li><span class="time">10:32</span> 成功完成任务：${emp.currentTask}</li>
            <li><span class="time">09:15</span> 系统自检通过</li>
            <li><span class="time">09:00</span> 启动运行</li>
        `;

        // Render Kanban Board
        renderKanban(emp);

        // Init Radar Chart
        if (abilityChart) {
            abilityChart.dispose();
        }
        // Use a slight delay to ensure modal is visible for correct chart sizing
        modal.classList.add('show');
        
        setTimeout(() => {
            const chartDom = document.getElementById('abilityRadarChart');
            if (chartDom) {
                abilityChart = echarts.init(chartDom);
                abilityChart.setOption({
                    backgroundColor: 'transparent',
                    radar: {
                        indicator: [
                            { name: '逻辑', max: 100 },
                            { name: '速度', max: 100 },
                            { name: '准确', max: 100 },
                            { name: '创造', max: 100 },
                            { name: '稳定', max: 100 }
                        ],
                        shape: 'circle',
                        splitNumber: 5,
                        axisName: { color: '#a0a0a0' },
                        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                        splitArea: { show: false },
                        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
                    },
                    series: [{
                        type: 'radar',
                        data: [{
                            value: emp.abilities,
                            name: '能力评估',
                            itemStyle: { color: '#6c5dd3' },
                            areaStyle: { color: 'rgba(108, 93, 211, 0.4)' }
                        }]
                    }]
                });
            }
        }, 100);
    }

    function generateTasksForRole(emp) {
        const tasks = [];
        
        // Common tasks for all
        tasks.push({ title: '系统自检与健康度扫描', status: 'done', tag: '中', tagClass: 'medium' });
        tasks.push({ title: '知识库增量更新', status: 'done', tag: '低', tagClass: '' });

        // Role specific tasks
        if (emp.role.includes('供应链')) {
            tasks.push({ title: '实时库存水位预警分析', status: 'progress', tag: '高', tagClass: 'high' });
            tasks.push({ title: '物流路径动态优化 (Route-66)', status: 'todo', tag: '高', tagClass: 'high' });
            tasks.push({ title: '供应商交付风险评估报告', status: 'todo', tag: '中', tagClass: 'medium' });
            tasks.push({ title: '季度需求预测模型训练', status: 'done', tag: '高', tagClass: 'high' });
            tasks.push({ title: '紧急补货计划生成', status: 'todo', tag: '高', tagClass: 'high' });
        } else if (emp.role.includes('客服')) {
            tasks.push({ title: '全渠道客户情绪实时监控', status: 'progress', tag: '高', tagClass: 'high' });
            // 新知识发现类任务
            tasks.push({ title: '新产品知识点自动提取', status: 'todo', tag: '高', tagClass: 'high' });
            tasks.push({ title: '未识别用户意图聚类分析', status: 'todo', tag: '中', tagClass: 'medium' });
            tasks.push({ title: '知识库缺口智能补全', status: 'todo', tag: '中', tagClass: 'medium' });
            tasks.push({ title: '竞品服务话术新动向捕获', status: 'todo', tag: '低', tagClass: '' });
            
            tasks.push({ title: '多语言服务模型校准', status: 'done', tag: '中', tagClass: 'medium' });
            tasks.push({ title: '客户满意度调查结果分析', status: 'done', tag: '中', tagClass: 'medium' });
        } else if (emp.role.includes('选址')) {
            tasks.push({ title: '目标商圈人流热力图分析', status: 'progress', tag: '高', tagClass: 'high' });
            tasks.push({ title: '竞品分布调研 (半径3km)', status: 'done', tag: '中', tagClass: 'medium' });
            tasks.push({ title: '新址租金收益率(ROI)测算', status: 'todo', tag: '高', tagClass: 'high' });
            tasks.push({ title: '消费群体画像深度分析', status: 'done', tag: '高', tagClass: 'high' });
            tasks.push({ title: '现场环境评估报告生成', status: 'todo', tag: '中', tagClass: 'medium' });
        } else if (emp.role.includes('合同')) {
            tasks.push({ title: '待审合同法律合规性扫描', status: 'progress', tag: '高', tagClass: 'high' });
            tasks.push({ title: '异常条款自动识别与标记', status: 'todo', tag: '高', tagClass: 'high' });
            tasks.push({ title: '历史合同电子归档', status: 'done', tag: '低', tagClass: '' });
            tasks.push({ title: '供应商资质自动核查', status: 'todo', tag: '中', tagClass: 'medium' });
            tasks.push({ title: '签署流程节点状态更新', status: 'done', tag: '中', tagClass: 'medium' });
        } else {
            // Fallback
            tasks.push({ title: '日常数据清洗', status: 'todo', tag: '低', tagClass: '' });
            tasks.push({ title: '算法模型性能调优', status: 'todo', tag: '中', tagClass: 'medium' });
        }

        // Add current task if active
        if (emp.currentTask && emp.currentTask !== '待命中') {
            tasks.push({ title: emp.currentTask, status: 'progress', tag: '高', tagClass: 'high' });
        }

        // Assign random IDs
        return tasks.map((t, i) => ({ ...t, id: i + 1 }));
    }

    function renderKanban(emp) {
        const todoList = document.getElementById('kanbanTodo');
        const progressList = document.getElementById('kanbanProgress');
        const doneList = document.getElementById('kanbanDone');

        if (!todoList) return;

        // Clear lists
        todoList.innerHTML = '';
        progressList.innerHTML = '';
        doneList.innerHTML = '';

        // Generate Mock Tasks based on Role
        const tasks = generateTasksForRole(emp);
        
        // Counters
        let todoCount = 0;
        let progressCount = 0;
        let doneCount = 0;

        tasks.forEach(t => {
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.innerHTML = `
                <div class="k-card-tags">
                    <span class="k-tag ${t.tagClass}">${t.tag} 优先级</span>
                </div>
                <div class="k-card-title">${t.title}</div>
                <div class="k-card-desc">由调度 AI-00${Math.floor(Math.random()*9)} 自动分配。</div>
                <div class="k-card-footer">
                    <span><i class="fa-regular fa-comment"></i> ${Math.floor(Math.random()*5)}</span>
                    <span><i class="fa-solid fa-paperclip"></i> ${Math.floor(Math.random()*3)}</span>
                </div>
            `;

            if (t.status === 'done') {
                doneList.appendChild(card);
                doneCount++;
            } else if (t.status === 'progress') {
                progressList.appendChild(card);
                progressCount++;
            } else {
                todoList.appendChild(card);
                todoCount++;
            }
        });

        // Update Counters in DOM
        // Assumes structure: .kanban-column > .k-header > .count
        // We find the .count element relative to the list element
        if (todoList.previousElementSibling) {
            const countSpan = todoList.previousElementSibling.querySelector('.count');
            if (countSpan) countSpan.innerText = todoCount;
        }
        if (progressList.previousElementSibling) {
            const countSpan = progressList.previousElementSibling.querySelector('.count');
            if (countSpan) countSpan.innerText = progressCount;
        }
        if (doneList.previousElementSibling) {
            const countSpan = doneList.previousElementSibling.querySelector('.count');
            if (countSpan) countSpan.innerText = doneCount;
        }
    }

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Add Employee Mock Button
    document.getElementById('addEmployeeBtn').addEventListener('click', () => {
        alert('新建数字员工流程：\n1. 选择“新建模式”或“申请入职模式”\n2. 配置基础信息\n3. 部署模型');
    });
});


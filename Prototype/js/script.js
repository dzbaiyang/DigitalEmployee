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
            joinDate: '2023-01-15',
            currentTask: '供应链车辆排程作业中.',
            dailyOutput: '327',
            efficiency: [85, 90, 88, 95, 92],
            abilities: [95, 88, 92, 98, 90] // [逻辑, 速度, 准确, 创造, 稳定]
        },
        {
            id: 'AI-1002',
            name: '素问',
            role: '智能客服',
            dept: '客户服务部',
            status: 'active',
            avatar: '../gif/素问.gif',
            joinDate: '2023-03-10',
            currentTask: '处理徐家汇新美罗餐厅 KDS屏幕问题..',
            dailyOutput: '320 次对话',
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
            joinDate: '2023-06-20',
            currentTask: '南京市',
            dailyOutput: '50万条数据处理',
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
            joinDate: '2023-08-05',
            currentTask: '待命中',
            dailyOutput: '0 份合同',
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

    function openDetailModal(empId) {
        const emp = employees.find(e => e.id === empId);
        if (!emp) return;

        // Populate Basic Info
        document.getElementById('modalAvatar').src = emp.avatar;
        document.getElementById('modalName').innerText = emp.name;
        document.getElementById('modalRole').innerText = emp.role;
        document.getElementById('modalId').innerText = '#' + emp.id;
        document.getElementById('modalDate').innerText = emp.joinDate;
        document.getElementById('modalDept').innerText = emp.dept;
        
        const statusBadge = document.getElementById('modalStatusBadge');
        statusBadge.innerText = emp.status === 'active' ? '运行中' : (emp.status === 'idle' ? '空闲' : '异常');
        statusBadge.style.background = emp.status === 'active' ? '#2ecc71' : (emp.status === 'idle' ? '#f1c40f' : '#e74c3c');

        // Populate Logs (Mock)
        const logList = document.getElementById('modalLogList');
        logList.innerHTML = `
            <li><span class="time">10:32</span> 成功完成任务：${emp.currentTask}</li>
            <li><span class="time">09:15</span> 系统自检通过</li>
            <li><span class="time">09:00</span> 启动运行</li>
        `;

        // Init Radar Chart
        if (abilityChart) {
            abilityChart.dispose();
        }
        // Use a slight delay to ensure modal is visible for correct chart sizing
        modal.classList.add('show');
        
        setTimeout(() => {
            const chartDom = document.getElementById('abilityRadarChart');
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
        }, 100);
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


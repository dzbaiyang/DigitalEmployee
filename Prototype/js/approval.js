document.addEventListener('DOMContentLoaded', function() {
    // --- Approval Modal Logic ---
    const approvalModal = document.getElementById('approvalModal');
    const closeApprovalBtn = document.getElementById('closeApprovalModal');
    const navApproval = document.getElementById('navApproval');
    const approveBtn = document.getElementById('approveBtn');

    if(navApproval) {
        navApproval.addEventListener('click', (e) => {
            e.preventDefault();
            approvalModal.classList.add('show');
        });
    }

    if(closeApprovalBtn) {
        closeApprovalBtn.addEventListener('click', () => {
            approvalModal.classList.remove('show');
        });
    }

    if(approveBtn) {
        approveBtn.addEventListener('click', () => {
            alert('已批准入职！\n\n正在触发自动部署流程...\n已通知流程监控平台记录节点数据。');
            approvalModal.classList.remove('show');
            
            // Check if 'employees' array is globally available or we need to access it differently.
            // For this prototype, we assume 'employees' and 'renderTable' are in the global scope 
            // or we dispatch an event to the main script.
            // Let's try dispatching a custom event to be cleaner.
            
            const newEmpData = {
                id: 'AI-1005',
                name: '合同助手-分身',
                role: '法务审核专员',
                dept: '法务部',
                status: 'active',
                avatar: '../gif/合同审核.gif', 
                joinDate: new Date().toISOString().split('T')[0],
                currentTask: '正在扫描待审合同 (03/12)...',
                dailyOutput: '审核合同 15 份',
                efficiency: [80, 82, 85, 84, 86],
                abilities: [90, 88, 95, 80, 90] // High accuracy for legal
            };

            // Dispatch Event
            const event = new CustomEvent('employeeApproved', { detail: newEmpData });
            document.dispatchEvent(event);
            
            // Remove badge
            const badge = navApproval.querySelector('.sidebar-badge');
            if(badge) badge.style.display = 'none';
        });
    }

    // Close approval modal on click outside
    if(approvalModal) {
        approvalModal.addEventListener('click', (e) => {
            if (e.target === approvalModal) {
                approvalModal.classList.remove('show');
            }
        });
    }
});

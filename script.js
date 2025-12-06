// 等待DOM完全加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 隐藏加载提示
    const loadingElement = document.querySelector('.loading');
    loadingElement.style.display = 'none';

    // 初始化Mermaid流程图配置
    mermaid.initialize({
        startOnLoad: true, // 页面加载完成后自动渲染
        theme: 'default', // 主题选择：default/neutral/dark/forest
        themeVariables: {
            primaryColor: '#f8f9fa', // 主背景色
            primaryBorderColor: '#e9ecef', // 主边框色
            lineColor: '#6c757d', // 线条颜色
            fontSize: '14px', // 节点文字大小
            fontFamily: '"思源黑体", "Microsoft YaHei", sans-serif', // 字体
            nodeBorder: '#dee2e6', // 节点边框色
            actorBorder: '#dee2e6', // 角色节点边框色
            arrowColor: '#6c757d' // 箭头颜色
        },
        flowchart: {
            curve: 'linear', // 线条样式：linear（直线）/ monotone（曲线）
            layout: 'TB', // 布局方向：TB（从上到下）/ LR（从左到右）
            padding: 10, // 节点内边距
            spacing: 20, // 节点之间的间距
            useMaxWidth: false // 不限制节点最大宽度
        },
        renderer: 'svg', // 渲染方式：svg（高清无失真）/ canvas
        width: '100%', // 流程图宽度
        height: 'auto' // 流程图高度自动适配
    });

    // 监听窗口大小变化，重新渲染流程图以适配
    window.addEventListener('resize', function() {
        const mermaidElements = document.querySelectorAll('.mermaid');
        mermaidElements.forEach(el => {
            // 重新渲染流程图
            mermaid.render('mermaid-' + el.id, el.innerHTML, function(svgCode) {
                el.innerHTML = svgCode;
            });
        });
    });
});

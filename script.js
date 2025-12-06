// Vercel 部署适配：确保 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.querySelector('.loading');
    const flowchartContainer = document.getElementById('flowchart-container');

    // 初始化 Mermaid 流程图 - 优化 Vercel 加载速度
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        themeVariables: {
            primaryColor: '#f8f9fa',
            primaryBorderColor: '#e9ecef',
            lineColor: '#6c757d',
            fontSize: '14px',
            fontFamily: '"思源黑体", "Microsoft YaHei", -apple-system, sans-serif',
            nodeBorder: '#dee2e6',
            arrowColor: '#6c757d',
            decisionBorderColor: '#2F54EB',
            decisionTextColor: '#212529'
        },
        flowchart: {
            curve: 'linear',
            layout: 'TB',
            padding: 12,
            spacing: 22,
            useMaxWidth: false
        },
        renderer: 'svg',
        width: '100%',
        height: 'auto',
        logLevel: 3 // 减少控制台日志，优化 Vercel 部署体验
    });

    // 监听流程图渲染完成事件，隐藏加载提示
    mermaid.events.on('renderEnd', function() {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
    });

    // 窗口大小变化时重新渲染，适配 Vercel 不同设备访问
    window.addEventListener('resize', function() {
        // 避免频繁渲染，添加防抖
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            mermaid.render(
                'flowchart-rerender',
                flowchartContainer.innerHTML,
                function(svgCode) {
                    flowchartContainer.innerHTML = svgCode;
                }
            );
        }, 300);
    });

    // 错误处理：适配 Vercel 网络波动
    mermaid.events.on('error', function(err) {
        console.error('流程图渲染错误：', err);
        loadingElement.textContent = '渲染失败，请刷新页面重试';
        loadingElement.style.color = '#FF4D4F';
    });
});

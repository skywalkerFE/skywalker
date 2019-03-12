module.exports = {
    title: 'skywalker', // 网站标题
    description: 'Framework Components for Vue js', //描述
    dest: './dist',   // 设置输出目录
    port: 8080, //端口
    themeConfig: { //主题配置
      // 添加导航栏
      nav: [
        { text: '主页', link: '/' }, // 导航条
        { text: 'github',
          items: [
            { text: 'repository', link: 'https://github.com/skywalkerFE/skywalker' },
            { text: 'issues', link: 'https://github.com/skywalkerFE/skywalker/issues' }
          ]
        }
      ],
      // 为以下路由添加侧边栏
      sidebar: [
        {
            title: '基础组件',
            collapsable: false,
            children: [
              'icon'
            ]
          }
      ]
    }
  }
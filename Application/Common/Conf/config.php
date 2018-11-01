<?php
return array(
    // WuGN
    'WUGN' => array(
        'AUTHOR_NAME'     => 'WuGN', // 作者
        'AUTHOR_VERSION'  => '3.0.3', // 版本
        'AUTHOR_EMAIL'    => 'admin@wuguangnuo.cn', // 邮箱
        'AUTHOR_QQ'       => '2391459282', // QQ
        'AUTHOR_PHONE'    => '13646019112', // 电话
        'WEB_SITE'        => 'wuguangnuo.cn', // 站点
        'WEB_SITE_DOMAIN' => 'http://www.wuguangnuo.cn', // 域名
        'WEB_SITE_TITLE'  => '諾wugn', // 标题
        'WEB_SITE_SLOGAN' => '造轮子ing', // 描述
        'WEB_DESCRIPTION' => 'My Blog Site Source Code. 这是我的个人网站 wuguangnuo.cn 第三代源代码。基于thinkPHP框架', // 网站描述
        'WEB_KEYWORDS'    => 'Information Technology, Science, Education, JAVA, Git, HTML, JavaScript, Maven, PHP, Python, SQL', // 网站关键词
        'COS'             => 'https://wuguangnuo-1257896087.cos.ap-guangzhou.myqcloud.com', // COS 对象存储
    ),

    // 数据库
    'DB_TYPE'    => 'mysql', // 数据库类型
    'DB_HOST'    => '127.0.0.1', // 服务器地址
    'DB_NAME'    => 'wuguangnuo', // 数据库名
    'DB_USER'    => 'root', // 用户名
    'DB_PWD'     => 'root', // 密码
    'DB_PORT'    => 3306, // 端口
    'DB_PREFIX'  => 'wu_', // 数据库表前缀
    'DB_CHARSET' => 'utf8', // 字符集
    'DB_DEBUG'   => true, // 数据库调试模式 开启后可以记录SQL日志
    'DB_FIELDS_CACHE' => true, // 开启字段缓存

    // Trace
    'SHOW_PAGE_TRACE' => true, // 显示页面Trace信息

    // 伪静态
    'URL_HTML_SUFFIX'=>'html|shtml|php|xml', // 伪静态，多个用 | 分割

    // URL配置
    'URL_CASE_INSENSITIVE' => true, // 不区分大小写
);
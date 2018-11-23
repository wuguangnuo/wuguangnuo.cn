<?php
return array(
    // 路由
    'URL_ROUTER_ON' => true, //开启路由
    'URL_ROUTE_RULES' => array( //定义路由规则
        '/^blog\/(\d+)$/' => 'Blog/read?id=:1',
    ),
    
    // 模板相关配置
    'TMPL_PARSE_STRING' => array(
        '__ROOT__'      => __ROOT__,
        '__PUBLIC__'    => __ROOT__ . '/Public',
        '__VIEW__'      => __ROOT__ . ltrim(APP_PATH, '.') . 'Home/View',
    ),
    
    // 模版开始/结束定界符，默认{}
    'TMPL_L_DELIM' => '{',
    'TMPL_R_DELIM' => '}',
);
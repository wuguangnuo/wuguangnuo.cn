<?php
return array(
    // 模板相关配置
    'TMPL_PARSE_STRING' => array(
        '__ROOT__'      => __ROOT__,
        '__PUBLIC__'    => __ROOT__ . '/Public',
        '__VIEW__'      => __ROOT__ . ltrim(APP_PATH, '.') . 'Admin/View',
    ),
);
-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-08-05 13:17:53
-- 服务器版本： 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Database: `wuguangnuo`
--

-- --------------------------------------------------------

--
-- 表的结构 `wu_blog`
--

CREATE TABLE `wu_blog` (
  `id` bigint(20) NOT NULL,
  `post_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `post_author` varchar(64) NOT NULL DEFAULT '佚名' COMMENT '文章作者',
  `post_type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章分类',
  `post_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章内容',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布日期',
  `post_from` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '文章来源',
  `post_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '原链接'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的博客';

--
-- 转存表中的数据 `wu_blog`
--

INSERT INTO `wu_blog` (`id`, `post_title`, `post_author`, `post_type`, `post_content`, `post_date`, `post_from`, `post_link`) VALUES
(1, 'Example Page', 'admin', NULL, '<img src=\"http://www.wuguangnuo.cn/Public/wugn/img/avatar.jpg\" style=\"float:right\" height=\"200\" width=\"200\" />This is an example.php\r\n\r\n    文章页示例页面，提供了丰富的接口与引用方法。\r\n\r\n    重点是满足网站开发的可移植性与可拓展性，尽量使用引用的方法。\r\n\r\n    网页引用header.php和footer.php。主体内容是mainContent，再此之中以day区分多篇文章。本部分内容为postCon，postCon右上方的dayTitle链接到上一级，左上方的postTitle连接到本页面。右边是sideBar，其中的sideBarMain内，引用news.php。\r\n<button class=\"flip\" type=\"button\">HelloWorld.java</button>\r\n<pre><code>//HelloWorld.java\r\npublic class HelloWorld {\r\n    public static void main(String[] args) {\r\n        System.out.println(\"Hello World!\");\r\n    }\r\n}</code></pre><pre><code>//HelloWorld.cpp\r\n#include &lt;iostream&gt;\r\nusing namespace std;\r\nint main(){\r\n    cout &lt;&lt; \"Hello World!\";\r\n}</code></pre>\r\n<div class=\"table-responsive\"><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th>值</th><th>描述</th></tr></thead><tbody><tr><td>normal</td><td>默认，空白会被浏览器忽略</td></tr><tr><td>pre</td><td>空白会被浏览器保留，类似<code>&lt;pre&gt;</code>标签</td></tr><tr><td>nowrap</td><td>文本不会换行，直到遇到<code>&lt;br/&gt;</code></td></tr><tr><td>pre-wrap</td><td>保留空白符，正常进行换行</td></tr><tr><td>pre-line</td><td>合并空白符，保留换行符</td></tr><tr><td>inherit</td><td>从父元素继承<code>white-space</code>属性的值</td></tr></tbody></table></div>', '2016-12-31 23:59:59', 'WuGN', ''),
(2, '没有银弹－软件工程中的根本和次要问题', 'Frederick Brooks', 'baike', '关于这个问题，这个人已经回答的很好了：\n<img src=\"https://pic3.zhimg.com/v2-802d17b02a415ede10494ee00edaeb52_b.png\">\n他在1986年的一次茶话会上发了一篇受邀论文（论文的开头就是“谢邀”），题目就是《没有银弹－软件工程中的根本和次要问题》。这个人就是IBM大型机之父，Frederick Brooks.整个论文不太长，有兴趣的同学可以找来读读。在他的经典书《人月神话》中也有收录。在30多年后的今天，我们在知乎上讨论这个问题，他却早就回答了。他的答案，至今看来，都没有一丝一毫需要修改的地方，毫无瑕疵。\n\n布鲁克斯把软件开发中的困难分为两类：\nessence，可以译为本质困难或者主要问题，指的是软件开发中不可规避的问题，就是软件本身在概念建构上存先天的困难，也就是如何从问题领域，发展出具体的解决方案。\nAccident，可以译为次要因素或次要问题，指的是把解决方案实施到电脑上，所遇到的困难。\n他认为软件开发中无法规避的四个特性是：复杂度；一致性；可变性；不可见性。\n\n他还归纳了在次要问题上我们取得的进步：高级语言；分时系统；统一开发环境。次要问题我们就不展开了，相信大家都可以理解。\n下面所有就都是摘录了，分别描述了4个主要问题。\n\n复杂度。\n规模上，软件实体可能比任何由人类创造的其他实体要复杂，因为没有任何两个软件部分是相同的（至少是在语句的级别）。如果有相同的情况，我们会把它们合并成供调用的子函数。在这个方面，软件系统与计算机、建筑或者汽车大不相同，后者往往存在着大量重复的部分。\n数字计算机本身就比人类建造的大多数东西复杂。计算机拥有大量的状态，这使得构思、描述和测试都非常困难。软件系统的状态又比计算机系统状态多若干个数量级。\n同样，软件实体的扩展也不仅仅是相同元素重复添加，而必须是不同元素实体的添加。大多数情况下，这些元素以非线性递增的方式交互，因此整个软件的复杂度以更大的非线性级数增长。\n软件的复杂度是必要属性，不是次要因素。因此，抽掉复杂度的软件实体描述常常也去掉了一些本质属性。数学和物理学在过去三个世纪取得了巨大的进步，数学家和物理学家们建立模型以简化复杂的现象，从模型中抽取出各种特性，并通过试验来验证这些特性。这些方法之所以可行——是因为模型中忽略的复杂度不是被研究现象的必要属性。当复杂度是本质特性时，这些方法就行不通了。\n上述软件特有的复杂度问题造成了很多经典的软件产品开发问题。由于复杂度，团队成员之间的沟通非常困难，导致了产品瑕疵、成本超支和进度延迟；由于复杂度，列举和理解所有可能的状态十分困难，影响了产品的可靠性；由于函数的复杂度，函数调用变得困难，导致程序难以使用；由于结构性复杂度，程序难以在不产生副作用的情况下用新函数扩充；由于结构性复杂度，造成很多安全机制状态上的不可见性。\n复杂度不仅仅导致技术上的困难，还引发了很多管理上的问题。它使全面理解问题变得困难，从而妨碍了概念上的完整性；它使所有离散出口难以寻找和控制；它引起了大量学习和理解上的负担，使开发慢慢演变成了一场灾难。\n\n一致性。\n并不是只有软件工程师才面对复杂问题。物理学家甚至在非常“基础”的级别上，面对异常复杂的事物。不过，物理学家坚信必定存在着某种通用原理，或者在夸克中，或者在统一场论中。爱因斯坦曾不断地重申自然界一定存在着简化的解释，因为上帝不是专横武断或反复无常的。\n软件工程师却无法从类似的信念中获得安慰，他必须控制的很多复杂度是随心所欲、毫无规则可言的，来自若干必须遵循的人为惯例和系统。它们随接口的不同而改变，随时间的推移而变化，而且，这些变化不是必需的，仅仅由于它们是不同的人——而非上帝——设计的结果。\n某些情况下，因为是开发最新的软件，所以它必须遵循各种接口。另一些情况下，软件的开发目标就是兼容性。在上述的所有情况中，很多复杂性来自保持与其他接口的一致，对软件的任何再设计，都无法简化这些复杂特性。\n\n可变性。\n软件实体经常会遭受到持续的变更压力。当然，建筑、汽车、计算机也是如此。不过，工业制造的产品在出厂之后不会经常地发生修改，它们会被后续模型所取代，或者必要更改会被整合到具有相同基本设计的后续产品系列。汽车的更改十分罕见，计算机的现场调整时有发生。然而，它们和软件的现场修改比起来，都要少很多。\n其中部分的原因是因为系统中的软件包含了很多功能，而功能是最容易感受变更压力的部分。另外的原因是因为软件可以很容易地进行修改——它是纯粹思维活动的产物，可以无限扩展。日常生活中，建筑有可能发生变化，但众所周知，建筑修改的成本很高，从而打消了那些想提出修改的人的念头。\n所有成功的软件都会发生变更。现实工作中，经常发生两种情况。当人们发现软件很有用时，会在原有应用范围的边界，或者在超越边界的情况下使用软件。功能扩展的压力主要来自那些喜欢基本功能，又对软件提出了很多新用法的用户们。\n其次，软件一定是在某种计算机硬件平台上开发，成功软件的生命期通常比当初的计算机硬件平台要长。即使不是更换计算机，则有可能是换新型号的磁盘、显示器或者打印机。软件必须与各种新生事物保持一致。\n简言之，软件产品扎根于文化的母体中，如各种应用、用户、自然及社会规律、计算机硬件等等。后者持续不断地变化着，这些变化无情地强迫着软件随之变化。\n\n不可见性。\n软件是不可见的和无法可视化的。例如，几何抽象是强大的工具。建筑平面图能帮助建筑师和客户一起评估空间布局、进出的运输流量和各个角度的视觉效果。这样，矛盾变得突出，忽略的地方变得明显。同样，机械制图、化学分子模型尽管是抽象模型，但都起了相同的作用。总之，都可以通过几何抽象来捕获物理存在的几何特性。\n软件的客观存在不具有空间的形体特征。因此，没有已有的表达方式，就像陆地海洋有地图、硅片有膜片图、计算机有电路图一样。当我们试图用图形来描述软件结构时，我们发现它不仅仅包含一个，而是很多相互关联、重叠在一起的图形。这些图形可能描绘控制流程、数据流、依赖关系、时间序列、名字空间的相互关系等等。它们通常不是有较少层次的扁平结构。实际上，在上述结构上建立概念控制的一种方法是强制将关联分割，直到可以层次化一个或多个图形2。\n除去软件结构上的限制和简化方面的进展，软件仍然保持着无法可视化的固有特性，从而剥夺了一些具有强大功能的概念工具的构造思路。这种缺憾不仅限制了个人的设计过程，也严重地阻碍了相互之间的交流', '2017-01-01 00:00:00', '知乎', ''),

-- --------------------------------------------------------

--
-- 表的结构 `wu_demo`
--

CREATE TABLE `wu_demo` (
  `id` bigint(20) NOT NULL,
  `demo_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'demo名称',
  `demo_author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'demo作者',
  `demo_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'demo链接',
  `demo_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'demo图片'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的DEMO';

--
-- 转存表中的数据 `wu_demo`
--

INSERT INTO `wu_demo` (`id`, `demo_title`, `demo_author`, `demo_link`, `demo_img`) VALUES
(1, '党建教育系统', '吴广诺', 'dangjian', 'dangjian.jpg'),
(2, '标签云', '', 'cloudTag', 'cloudtag.png'),
(3, '标签云', 'chestnut647', 'cloudTag_2', 'cloudtag_2.png'),
(4, '一个简单的 Canvas 游戏', 'chestnut647', 'canvasGame', 'canvasgame.png'),
(5, '无限滚动加载数据', 'chestnut647', 'infiniteScroll', 'infinitescroll.png'),
(6, '执行指令的盒子', 'chestnut647', 'instuctedBox', 'instuctedbox.png'),
(7, '各种排序算法动画', 'aTool在线工具', 'http://www.atool.org/sort.php', 'sort.png'),
(8, 'PHP 验证码实例', '', 'validate', 'validate.png'),
(9, '百度地图 API 演示', 'admin', 'baiduMapApi', 'baiduMapApi.jpg'),
(10, '粒子动态背景', 'Vincent Garreau', 'particles', 'particles.png'),
(11, '爱心树', 'hackerzhou', 'tearsback', 'tearsback.jpg'),
(12, '北京奥星广益有限公司', 'admin', 'axgy', 'axgy.jpg'),
(13, '心形背景', '', 'love', 'love.png'),
(14, 'Fixed 文字悬浮', 'admin', 'bg-fixed', 'bg-fixed.png'),
(15, 'PHP 表单验证', 'admin', 'form', 'form.png'),
(16, 'canvas 玫瑰', '', 'canvasRose', 'canvasRose.jpg'),
(17, ' 分片上传', 'lovefc', 'fcup', 'fcup.png'),
(18, 'Bootstrap 日期插件', 'AuspeXeu', 'bootstrap-datetimepicker', 'bootstrap-datetimepicker.png'),
(19, 'jQuery 日历插件', '', 'calendar', 'calendar.png'),
(20, '自制时钟', '', 'clock', 'clock.png');

-- --------------------------------------------------------

--
-- 表的结构 `wu_diary`
--

CREATE TABLE `wu_diary` (
  `id` bigint(20) NOT NULL,
  `diary_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '日记标题',
  `diary_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '日记关键词',
  `diary_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '日记内容',
  `diary_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的日记';

--
-- 转存表中的数据 `wu_diary`
--

INSERT INTO `wu_diary` (`id`, `diary_title`, `diary_key`, `diary_content`, `diary_date`) VALUES
(1, 'UTF-8无BOM', '编码,UTF', '    我总要上下四方寻求，得到一种最黑，最黑，最黑的咒文，先来诅咒一切使用 BOM 的 UTF-8 文件。Windows 总是自做聪明的做一些别人无法理解的事情！UTF-8 是不需要 BOM 头的！\n    HTML空白行，DIV 之间的间隔，莫名其妙的乱码！明明相同的两段代码，显示效果却有偏差，我排查了一上午才发现是文件编码的问题，U+FEFF！可恶！', '2017-10-03 18:53:42'),

-- --------------------------------------------------------

--
-- 表的结构 `wu_doc`
--

CREATE TABLE `wu_doc` (
  `id` bigint(20) NOT NULL,
  `doc_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文档标题',
  `doc_price` decimal(18,2) DEFAULT NULL COMMENT '文档价格',
  `doc_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文档链接',
  `doc_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文档图片'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='开发文档';

--
-- 转存表中的数据 `wu_doc`
--

INSERT INTO `wu_doc` (`id`, `doc_title`, `doc_price`, `doc_link`, `doc_img`) VALUES
(1, 'ThinkPHP5.0完全开发手册', NULL, 'https://www.kancloud.cn/manual/thinkphp5', 'thinkphp5.jpg'),
(2, 'ThinkPHP5.1完全开发手册', NULL, 'https://www.kancloud.cn/manual/thinkphp5_1', 'thinkphp5_1.png'),
(3, 'ThinkPHP3.2.3完全开发手册', NULL, 'https://www.kancloud.cn/manual/thinkphp', 'thinkphp.png'),
(4, 'Composer中文文档', NULL, 'https://www.kancloud.cn/thinkphp/composer', 'composer.png'),
(5, 'Laravel 5中文文档', NULL, 'https://www.kancloud.cn/baidu/laravel5', 'laravel5.png'),
(6, 'Yii 2.0 权威指南', NULL, 'https://www.kancloud.cn/manual/yii2-guide', 'yii2.0.jpg'),
(7, '菜鸟教程', NULL, 'http://www.runoob.com/', 'runoob.png'),
(8, 'W3school在线教程', NULL, 'http://www.w3school.com.cn/', 'w3school.png'),
(9, '开源中国在线文档', NULL, 'http://tool.oschina.net/apidocs', 'oschina.png'),
(10, '程序员手册大全', NULL, 'http://manual.51yip.com/', '51yip.png'),
(11, 'MyBatis', NULL, 'http://www.mybatis.org/mybatis-3/zh/index.html', 'mybatis.png'),
(12, '我爱读者网', NULL, 'http://www.52duzhe.com/', '52duzhe.png'),
(13, 'Bootstrap 4 中文文档', NULL, 'https://v4.bootcss.com/docs/4.0/getting-started/introduction/', 'bootstrap4.0.png'),
(14, 'jQuery API 中文文档', NULL, 'https://www.jquery123.com/', 'jquery.png'),
(15, 'Vue.js中文文档', NULL, 'https://vuejs.bootcss.com/v2/guide/', 'vue.png'),
(16, 'angularjs教程', NULL, 'http://www.angularjs.net.cn/tutorial/', 'angularjs.jpg'),
(17, 'React中文文档', NULL, 'http://www.css88.com/react/docs/hello-world.html', 'react.png'),
(18, 'JavaScript全栈教程', NULL, 'https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000', 'JavaScript.png'),
(19, 'Python 3 教程', NULL, 'http://www.runoob.com/python3/python3-tutorial.html', 'python3.png'),
(20, 'PHP手册', NULL, 'http://php.net/manual/zh/', 'php.png'),
(21, 'JDK7 API', NULL, 'https://docs.oracle.com/javase/7/docs/api/', 'jdk7api.jpg'),
(22, 'J2EE6 API', NULL, 'http://tool.oschina.net/apidocs/apidoc?api=javaEE6', 'j2ee6api.jpg'),
(23, 'FontAwesome 图标', NULL, 'http://www.fontawesome.com.cn/examples/', 'fontawesome.png'),
(24, 'Node.js API 文档', NULL, 'http://nodejs.cn/api/', 'nodejs.png'),
(25, 'wangEditor3 使用手册', NULL, 'https://www.kancloud.cn/wangfupeng/wangeditor3/332599', 'wangeditor3.png'),
(26, 'MDN Web 文档', NULL, 'https://developer.mozilla.org/zh-CN/', 'MDN.png'),
(27, 'Yaf 用户手册', NULL, 'http://www.laruence.com/manual/', 'yaf.png'),
(28, 'JFinal 开发手册', NULL, 'http://www.jfinal.com/doc', 'JFinal.png'),
(29, 'layui 开发使用手册', NULL, 'http://www.layui.com/doc/', 'layui.png');

-- --------------------------------------------------------

--
-- 表的结构 `wu_game`
--

CREATE TABLE `wu_game` (
  `id` bigint(20) NOT NULL,
  `game_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏名称',
  `game_author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '游戏作者',
  `game_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏链接',
  `game_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏图片'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的H5游戏';

--
-- 转存表中的数据 `wu_game`
--

INSERT INTO `wu_game` (`id`, `game_title`, `game_author`, `game_link`, `game_img`) VALUES
(1, '贪吃蛇', '', 'PizzaSnake', 'PizzaSnake.jpg'),
(2, '2048', '', '2048', '2048.png'),
(3, '中国象棋', '', 'ChineseChess', 'ChineseChess.jpg'),
(4, '打砖块', '', 'dazhuankuai', 'dazhuankuai.png'),
(5, '像素鸟', '', 'flappy-bird', 'flappy-bird.png'),
(6, '飞扬的文字', '', 'flappy-text', 'flappy-text.png'),
(7, '水果忍者', '', 'fruit-ninja', 'fruit-ninja.jpg'),
(8, '三国连连看', '', 'lianliankan', 'lianliankan.jpg'),
(9, '无限马里奥', '', 'mario', 'mario.jpg'),
(10, '魔塔', '', 'mota', 'mota.jpg'),
(11, '贪吃蛇', '', 'snake', 'snake.png'),
(12, '俄罗斯方块', '', 'tetris', 'tetris.png'),
(13, '2048', 'liusaint1992', '2048_2', '2048_2.png'),
(14, '扫雷', 'liusaint1992', 'mine', 'mine.png'),
(15, '数独', 'liusaint1992', 'soduku', 'soduku.png'),
(16, '拼图游戏', '', 'jigsawPuzzle', 'jigsawPuzzle.jpg'),
(17, 'H5 生命游戏', ' lifegame', 'game_of_life', 'game_of_life.png');

-- --------------------------------------------------------

--
-- 表的结构 `wu_tool`
--

CREATE TABLE `wu_tool` (
  `id` bigint(20) NOT NULL,
  `tool_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工具名称',
  `tool_author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '工具作者',
  `tool_from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '原链接',
  `tool_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工具链接',
  `tool_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工具图片'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的工具箱';

--
-- 转存表中的数据 `wu_tool`
--

INSERT INTO `wu_tool` (`id`, `tool_title`, `tool_author`, `tool_from`, `tool_link`, `tool_img`) VALUES
(1, '颜色表及html代码', '', '', 'color', 'color.jpg'),
(2, '字体样式', '', '', 'font-family', 'font-family.png'),
(3, '浏览器的工作原理', 'Tali Garsiel and Paul Irish', 'html5rocks', 'https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/', 'browser.jpg'),
(4, 'PHP 信息查询', 'admin', '', 'phpinfo', 'phpinfo.png'),
(5, '图片转码 base64', '', '', 'img2base64', 'img2base64.jpg'),
(6, '图片裁剪', '', '', 'crop-image', 'crop-image.jpg'),
(7, '图片转字符画', '', '', 'img2txt', 'img2txt.png'),
(8, '菜鸟工具\n(编译/前端)', 'runoob.com', 'https://c.runoob.com/', 'https://c.runoob.com/', 'c.runoob.com.png'),
(9, 'Cmd Markdown 编辑阅读器', '', '', 'https://www.zybuluo.com/mdeditor', 'CmdMarkdown.png'),
(10, 'HTML 在线转义', 'SO JSON', 'SO JSON', 'https://www.sojson.com/rehtml', 'rehtml.png'),
(11, '浏览器内核版本检测', '', '', 'https://ie.icoa.cn/', 'ie-icoa.png'),
(12, 'V8 基准套件测试', '', '', 'http://chrome.360.cn/test/v8/run.html', 'test-v8.png'),
(13, 'JS混淆加密压缩', '', '', 'http://tool.chinaz.com/js.aspx', 'chinaz-js.png'),
(14, 'SVG 在线编辑器', 'runoob', 'runoob', 'https://c.runoob.com/more/svgeditor/', 'svgeditor.png');

-- --------------------------------------------------------

--
-- 表的结构 `wu_user`
--

CREATE TABLE `wu_user` (
  `id` int(12) UNSIGNED NOT NULL,
  `username` varchar(32) NOT NULL COMMENT '登陆名',
  `password` char(32) NOT NULL COMMENT '密码MD5',
  `roleid` int(1) NOT NULL DEFAULT '0' COMMENT '权限默认0',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后一次修改时间',
  `login_at` datetime DEFAULT NULL COMMENT '最后一次登陆时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `wu_user`
--

INSERT INTO `wu_user` (`id`, `username`, `password`, `roleid`, `created_at`, `updated_at`, `login_at`) VALUES
(1, 'admin', '0cc175b9c0f1b6a831c399e269772661', 1, NULL, NULL, '2018-08-05 08:36:29'),
(2, 'guest', '0cc175b9c0f1b6a831c399e269772661', 0, NULL, NULL, '2018-08-04 07:12:52');

--
-- 表的结构 `wu_vistor`
--

CREATE TABLE IF NOT EXISTS `wu_vistor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `lk` varchar(255) DEFAULT NULL COMMENT 'link',
  `ip` int(4) DEFAULT NULL COMMENT 'ip',
  `os` varchar(64) DEFAULT NULL COMMENT 'os',
  `br` varchar(64) DEFAULT NULL COMMENT 'broswer',
  `ag` varchar(256) DEFAULT NULL COMMENT 'agent',
  `tm` datetime DEFAULT NULL COMMENT 'datetime',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='访客统计' AUTO_INCREMENT=1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wu_blog`
--
ALTER TABLE `wu_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wu_demo`
--
ALTER TABLE `wu_demo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wu_diary`
--
ALTER TABLE `wu_diary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wu_doc`
--
ALTER TABLE `wu_doc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wu_game`
--
ALTER TABLE `wu_game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wu_tool`
--
ALTER TABLE `wu_tool`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wu_user`
--
ALTER TABLE `wu_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `wu_blog`
--
ALTER TABLE `wu_blog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `wu_demo`
--
ALTER TABLE `wu_demo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `wu_diary`
--
ALTER TABLE `wu_diary`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `wu_doc`
--
ALTER TABLE `wu_doc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用表AUTO_INCREMENT `wu_game`
--
ALTER TABLE `wu_game`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `wu_tool`
--
ALTER TABLE `wu_tool`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `wu_user`
--
ALTER TABLE `wu_user`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

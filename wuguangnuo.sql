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

--
-- 表的结构 `wu_blog`
--

CREATE TABLE IF NOT EXISTS `wu_blog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `post_author` varchar(64) DEFAULT NULL COMMENT '文章作者',
  `post_type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章分类',
  `post_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章内容',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布日期',
  `post_from` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '文章来源',
  `post_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '原链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的博客' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_demo`
--

CREATE TABLE IF NOT EXISTS `wu_demo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `demo_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'demo名称',
  `demo_author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'demo作者',
  `demo_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'demo链接',
  `demo_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'demo图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的DEMO' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_diary`
--

CREATE TABLE IF NOT EXISTS `wu_diary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `diary_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '日记标题',
  `diary_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '日记关键词',
  `diary_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '日记内容',
  `diary_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的日记' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_doc`
--

CREATE TABLE IF NOT EXISTS `wu_doc` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `doc_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文档标题',
  `doc_price` decimal(18,2) DEFAULT NULL COMMENT '文档价格',
  `doc_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文档链接',
  `doc_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文档图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='开发文档' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_game`
--

CREATE TABLE IF NOT EXISTS `wu_game` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `game_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏名称',
  `game_author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '游戏作者',
  `game_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏链接',
  `game_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '游戏图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的H5游戏' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_tool`
--

CREATE TABLE IF NOT EXISTS `wu_tool` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tool_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工具名称',
  `tool_author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '工具作者',
  `tool_from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '原链接',
  `tool_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工具链接',
  `tool_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工具图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='諾的工具箱' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_user`
--

CREATE TABLE IF NOT EXISTS `wu_user` (
  `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL COMMENT '登陆名',
  `password` char(32) NOT NULL COMMENT '密码MD5',
  `roleid` int(1) NOT NULL DEFAULT '0' COMMENT '权限默认0',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后一次修改时间',
  `login_at` datetime DEFAULT NULL COMMENT '最后一次登陆时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_vistor`
--

CREATE TABLE IF NOT EXISTS `wu_vistor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `lk` varchar(255) DEFAULT NULL COMMENT 'link',
  `ip` int(4) DEFAULT NULL COMMENT 'ip',
  `ag` varchar(255) DEFAULT NULL COMMENT 'agent',
  `tm` datetime DEFAULT NULL COMMENT 'datetime',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='访客统计' AUTO_INCREMENT=1;

--
-- 表的结构 `wu_dictionary`
--

CREATE TABLE IF NOT EXISTS `wu_dictionary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_key` varchar(32) NOT NULL COMMENT '字典类型',
  `code_index` varchar(64) NOT NULL COMMENT '字典索引',
  `code_value` varchar(255) NOT NULL COMMENT '字典值',
  `code_note` varchar(64) NOT NULL COMMENT '字典注释',
  PRIMARY KEY (`id`),
  KEY `group_key` (`group_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典表' AUTO_INCREMENT=1;
COMMIT;

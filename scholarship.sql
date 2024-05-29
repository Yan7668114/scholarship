-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-05-29 13:08:04
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `scholarship`
--

-- --------------------------------------------------------

--
-- 資料表結構 `advisor`
--

CREATE TABLE `advisor` (
  `advisor_id` int(4) NOT NULL,
  `advisor_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `advisor`
--

INSERT INTO `advisor` (`advisor_id`, `advisor_name`) VALUES
(1, '姜美玲'),
(2, '戴榮賦'),
(3, '陳彥錚'),
(4, '黃俊哲'),
(5, '白炳豐'),
(6, '簡宏宇'),
(7, '游子宜'),
(8, '余菁蓉'),
(9, '王育民'),
(10, '洪嘉良'),
(11, '陳小芬'),
(12, '陳建宏'),
(13, '鄭育評');

-- --------------------------------------------------------

--
-- 資料表結構 `assistant`
--

CREATE TABLE `assistant` (
  `assistant_id` int(4) NOT NULL,
  `assistant_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `assistant`
--

INSERT INTO `assistant` (`assistant_id`, `assistant_name`) VALUES
(1, '王慈君'),
(2, '賴玫旋');

-- --------------------------------------------------------

--
-- 資料表結構 `audit_form`
--

CREATE TABLE `audit_form` (
  `audit_id` int(4) NOT NULL,
  `assistant_id` int(4) NOT NULL,
  `application_id` int(4) NOT NULL,
  `documents_ready` tinyint(1) NOT NULL,
  `committee_review` tinyint(1) NOT NULL,
  `meeting_name` varchar(20) NOT NULL,
  `passed_date` date NOT NULL,
  `scholarship_amount` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `item_form`
--

CREATE TABLE `item_form` (
  `item_id` int(4) NOT NULL,
  `application_id` int(4) NOT NULL,
  `item_info_id` int(4) NOT NULL,
  `application_unit` varchar(50) NOT NULL,
  `subsidy` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `item_info`
--

CREATE TABLE `item_info` (
  `item_info_id` int(4) NOT NULL,
  `item_content` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `item_info`
--

INSERT INTO `item_info` (`item_info_id`, `item_content`) VALUES
(1, '參加校內、外（含國內、國際性）資管領域相關專業或學術性重要比賽得獎者。'),
(2, '參加國際性學術研討會或國際性會議並以外文發表論文者（不含摘要及海報論文）：'),
(3, ' 已向校內申請補助，申請單位：,獲得補助金額'),
(4, '已向校外申請補助，申請單位：，獲得補助金額'),
(5, '已向校內申請補助，申請單位：，未獲得補助(需付未獲得補助證明)'),
(6, '已向校外申請補助，申請單位：未獲得補助(需付未獲得補助證明)'),
(7, '未向校內外單位申請補助'),
(8, '促進本系招生、聲譽提升、協助教學或行政工作等有具體事蹟者'),
(9, '碩士畢業生學位口試以英文發表者 參加資管領域相關學術研討會並榮獲最佳論文獎'),
(10, '獲得「國科會大專學生研究計畫獎勵」者口 學生申請國際交換生'),
(11, ' 已向校內申請補助，申請單位：,獲得補助金額'),
(12, '已向校外申請補助，申請單位：，獲得補助金額'),
(13, '已向校內申請補助，申請單位：，未獲得補助(需付未獲得補助證明)'),
(14, '已向校外申請補助，申請單位：未獲得補助(需付未獲得補助證明)'),
(15, '未向校內外單位申請補助'),
(16, '參加國內學術研討會發表論文並獲獎者'),
(17, '學生參加校外學術性比賽之交通費補助'),
(18, '在學學生考取TOEFL iBT 100分（含）以上、IELTS7分（含）以上或日文NI、GRE 320分（含）以上（或同等證照證明）'),
(19, '其他');

-- --------------------------------------------------------

--
-- 資料表結構 `scholarship_application`
--

CREATE TABLE `scholarship_application` (
  `application_id` int(4) NOT NULL,
  `application_date` date NOT NULL,
  `student_id` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `student`
--

CREATE TABLE `student` (
  `student_id` varchar(9) NOT NULL COMMENT '學號',
  `departmant_and_grade` varchar(10) NOT NULL COMMENT '系級',
  `student_name` varchar(20) NOT NULL COMMENT '學生姓名',
  `advisor_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `student`
--

INSERT INTO `student` (`student_id`, `departmant_and_grade`, `student_name`, `advisor_id`) VALUES
('110213077', '大三', '陳慧珍', 3),
('110213079', '大三', '吳彥寬', 5);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `advisor`
--
ALTER TABLE `advisor`
  ADD PRIMARY KEY (`advisor_id`);

--
-- 資料表索引 `assistant`
--
ALTER TABLE `assistant`
  ADD PRIMARY KEY (`assistant_id`);

--
-- 資料表索引 `audit_form`
--
ALTER TABLE `audit_form`
  ADD PRIMARY KEY (`audit_id`),
  ADD KEY `assistant_id` (`assistant_id`),
  ADD KEY `application_id` (`application_id`);

--
-- 資料表索引 `item_form`
--
ALTER TABLE `item_form`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `application_id` (`application_id`),
  ADD KEY `item_info_id` (`item_info_id`);

--
-- 資料表索引 `item_info`
--
ALTER TABLE `item_info`
  ADD PRIMARY KEY (`item_info_id`);

--
-- 資料表索引 `scholarship_application`
--
ALTER TABLE `scholarship_application`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `student_id` (`student_id`);

--
-- 資料表索引 `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `advisor_id` (`advisor_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `advisor`
--
ALTER TABLE `advisor`
  MODIFY `advisor_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `assistant`
--
ALTER TABLE `assistant`
  MODIFY `assistant_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `audit_form`
--
ALTER TABLE `audit_form`
  MODIFY `audit_id` int(4) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `item_form`
--
ALTER TABLE `item_form`
  MODIFY `item_id` int(4) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `item_info`
--
ALTER TABLE `item_info`
  MODIFY `item_info_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `scholarship_application`
--
ALTER TABLE `scholarship_application`
  MODIFY `application_id` int(4) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `audit_form`
--
ALTER TABLE `audit_form`
  ADD CONSTRAINT `appication_id` FOREIGN KEY (`application_id`) REFERENCES `scholarship_application` (`application_id`),
  ADD CONSTRAINT `assistant_id` FOREIGN KEY (`assistant_id`) REFERENCES `assistant` (`assistant_id`);

--
-- 資料表的限制式 `item_form`
--
ALTER TABLE `item_form`
  ADD CONSTRAINT `application_id` FOREIGN KEY (`application_id`) REFERENCES `scholarship_application` (`application_id`),
  ADD CONSTRAINT `item_info_id` FOREIGN KEY (`item_info_id`) REFERENCES `item_info` (`item_info_id`);

--
-- 資料表的限制式 `scholarship_application`
--
ALTER TABLE `scholarship_application`
  ADD CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`);

--
-- 資料表的限制式 `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `advisor_id` FOREIGN KEY (`advisor_id`) REFERENCES `advisor` (`advisor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE IF NOT EXISTS `department` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `company_name` varchar(255) DEFAULT NULL,
 `department_name` varchar(255) NOT NULL,
 `department_no` varchar(255) NOT NULL,
 `staff_count` int(20) DEFAULT NULL,
 `create_time` varchar(25) DEFAULT NULL,
 `modified_time` varchar(25) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部门表';

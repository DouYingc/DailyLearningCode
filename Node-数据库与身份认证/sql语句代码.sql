-- * 表示选取所有列 
-- select * from users

-- 多个列之间，用英文逗号，分割
-- select username, password from users

-- 向 user 表中，插入新数据，username 的值为 tony stark，password 的值为 098123
-- insert into users (username, password) values('tony stark', '098123')
-- select * from users

-- 将 id 为 4 的用户密码，更新为 888888
-- update users set password = '888888' where id = 4
-- select * from users

-- 更新 id 为 2 的用户，把密码更新为admin123，同时，把用户的状态更新为 1
-- update users set password = 'admin123', status = 1 where id = 2
-- select * from users

-- 删除 users 表中， id为 4 的用户
-- delete from users where id = 4
-- select * from users

-- 演示 where 子句的使用
-- select * from users where status = 1
-- select * from users where id >= 2
-- select * from users where username != 'ls'

-- 使用 AND 来显示所有状态为 0 且 id < 3 的用户
-- select * from users where status = 0 and id < 3

-- 使用 OR 来显示所有状态为 1，或者 username 为 zs 的用户
-- select * from users where status = 1 or username = 'zs'

-- 对 users 表中的数据，按照 status 字段进行升序排序
-- select * from users order by status

-- 对 users 表中的数据，按照 id 字段进行降序排序
-- desc 表示降序排序，asc 表示升序排序，默认情况下是升序排序
-- select * from users order by id desc

-- 对 users 表中的数据，先按照 status 字段进行降序排序，再按照 username 的字母顺序，进行升序排序
-- select * from users order by status desc, username asc

-- 使用 count(*) 来统计 users 表中，状态为 0 用户的总数量
-- select count(*) from users where status = 0

-- 使用 AS 关键字给列起别名
-- select count(*) as total from users where status = 0
select username as uname, password as upwd from users
















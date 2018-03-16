use master

--创建数据库:EmailDB
if db_id('EmailDB')is not null
drop DataBase EmailDB
go
create DataBase EmailDB
on
(
	name='EmailDB',
	filename='F:\DB\EmailDB\EmailDB.mdf'
)

--打开数据库
use EmailDB

--创建表:用户表--Users
if OBJECT_ID('Users')is not null
drop Table Users
go
create Table Users
(
	U_Id int identity(1,1) primary key,			--编号
	U_LoginId nvarchar(50) not null,			--用户名
	U_LoginPwd nvarchar(50) not null,			--密码
	U_Phone nvarchar(11) not null				--电话
)
--添加测试数据
insert into Users values('wq@wq.com','wq','15679217340')
insert into Users values('user@user.com','user','13112304102')
select*from Users

--创建表:邮件表--Email
if OBJECT_ID('Email')is not null
drop Table Email
go
create Table Email
(
	E_Id int identity(1,1) primary key,			--编号
	E_Title Nvarchar(50) not null,				--标题
	E_Time DateTime not null,					--时间
	E_SendMan Nvarchar(50) not null,			--发送人
	E_ReceiveMan Nvarchar(50) not null,			--接收人
	E_Content Nvarchar(max) not null,			--内容
	E_Litter Nvarchar(1)not null,				--垃圾邮件标记
	constraint ck_E_litter check(E_Litter='是' or E_Litter='否'),
	E_Read Nvarchar(2) not null,				--已读标记
	constraint ck_E_Read check(E_Read='已读' or E_Read='未读'),
	E_Delete Nvarchar(1) not null,				--删除邮件
	constraint ck_E_Delete check(E_Delete='是' or E_Delete='否'),
	E_Report Nvarchar(1) not null,
	constraint E_Report check(E_Report='是' or E_Report='否'),
)
--添加测试数据
insert into Email values('打招呼','2017/11/15 10:02','wq@wq.com','user@user.com','你好啊，我是wq','否','已读','否','否')
insert into Email values('问好','2017/11/15 10:04','user@user.com','wq@wq.com','你好，我是user','否','已读','否','否')
insert into Email values('问好','2017/11/15 10:05','user@user.com','wq@wq.com','哈哈哈哈，我又来了，烦死你','否','已读','否','否')
insert into Email values('test001','2017/11/15 11:05','user@user.com','wq@wq.com','666，等会带我吃鸡','否','已读','是','否')
insert into Email values('test002','2017/11/16 15:23','user@user.com','wq@wq.com','测试','否','已读','否','否')
insert into Email values('test003','2017/11/17 23:55','user@user.com','wq@wq.com','吃饭了','否','已读','否','否')
insert into Email values('test004','2017/11/18 19:33','user@user.com','wq@wq.com','晚上不打代码','否','未读','是','否')
insert into Email values('test005','2017/11/19 13:11','user@user.com','wq@wq.com','待会吃什么','否','未读','是','否')
insert into Email values('test006','2017/11/20 06:33','user@user.com','wq@wq.com','森','否','未读','否','否')
insert into Email values('test006','2017/01/26 13:49','user@user.com','wq@wq.com','9420','否','未读','否','否')
insert into Email values('test006','2017/09/08 09:25','user@user.com','wq@wq.com','我快到了','否','未读','否','否')

insert into Email values('打招呼','2017/11/15 10:02','wq@wq.com','user@user.com','你好啊，我是wq','是','已读','否','否')
insert into Email values('问好','2017/11/15 10:04','user@user.com','wq@wq.com','你好，我是user','是','已读','否','否')
insert into Email values('问好','2017/11/15 10:05','user@user.com','wq@wq.com','哈哈哈哈，我又来了，烦死你','是','已读','否','否')
insert into Email values('test001','2017/11/15 11:05','user@user.com','wq@wq.com','666，等会带我吃鸡','是','已读','是','否')
insert into Email values('test002','2017/11/16 15:23','user@user.com','wq@wq.com','测试','是','已读','否','否')
insert into Email values('test003','2017/11/17 23:55','user@user.com','wq@wq.com','吃饭了','是','已读','否','否')
insert into Email values('test004','2017/11/18 19:33','user@user.com','wq@wq.com','晚上不打代码','是','未读','是','否')
insert into Email values('test005','2017/11/19 13:11','user@user.com','wq@wq.com','待会吃什么','是','未读','是','否')
insert into Email values('test006','2017/11/20 06:33','user@user.com','wq@wq.com','森','是','未读','否','否')
insert into Email values('test006','2017/01/26 13:49','user@user.com','wq@wq.com','9420','是','未读','否','否')
insert into Email values('test006','2017/09/08 09:25','user@user.com','wq@wq.com','我快到了','是','未读','否','否')

insert into Email values('test1','2017/09/08 09:25','wq@wq.com','user@user.com','测试111','是','未读','是','否')
insert into Email values('test2','2017/09/08 09:25','wq@wq.com','user@user.com','测试112','是','未读','是','否')
insert into Email values('test3','2017/09/08 09:25','wq@wq.com','user@user.com','测试113','是','未读','是','否')
insert into Email values('test4','2017/09/08 09:25','wq@wq.com','user@user.com','测试114','是','未读','是','否')
insert into Email values('test5','2017/09/08 09:25','wq@wq.com','user@user.com','测试115','是','未读','是','否')
insert into Email values('test6','2017/09/08 09:25','wq@wq.com','user@user.com','测试116','是','未读','是','否')
insert into Email values('test7','2017/09/08 09:25','wq@wq.com','user@user.com','测试117','是','未读','是','否')
insert into Email values('test8','2017/09/08 09:25','wq@wq.com','user@user.com','测试118','是','未读','是','否')

select *from Email where E_ReceiveMan='wq@wq.com' and E_Read='未读'
select *from Email where E_ReceiveMan='wq@wq.com' and E_Read='已读'

select *from Email where E_ReceiveMan='wq@wq.com' and E_Read='已读' and E_Delete='否'

Select * from Email where E_ReceiveMan='wq@wq.com' and E_Delete='是'

Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='未读' and E_Delete='否' 
Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='未读' and E_Delete='否' 
Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='已读' and E_Delete='否' 


go

--创建表：邮件草稿表--Draft
if OBJECT_ID('Draft')is not null
drop Table Draft
go
create Table Draft
(
	D_Id int identity(1,1) primary key,				--编号
	D_LoginId Nvarchar(50) not null,				--用户名
	D_Title Nvarchar(50) null,						--主题
	D_Receive Nvarchar(50) null,					--收件人
 	D_Content Nvarchar(max) null,				--内容
 	D_Time datetime not null						--时间
)
--添加测试数据
insert into Draft values('wq@wq.com',null,'user@user.com','sd','2017-12-14 12:26')
insert into Draft values('wq@wq.com','问候','user@user.com','早','2017-12-15 05:35')
insert into Draft values('wq@wq.com','提醒','user@user.com','记得周六一起去爬山','2017-12-16 19:16')
insert into Draft values('wq@wq.com','骚扰','user@user.com','来打我啊','2017-11-11 20:11')
insert into Draft values('wq@wq.com','开黑','user@user.com','一起吃鸡啊','2017-12-06 19:05')
insert into Draft values('wq@wq.com',null,'user@user.com','。。。。。','2017-12-14 05:46')
insert into Draft values('wq@wq.com',null,'user@user.com','！！！！！','2017-12-13 15:51')
insert into Draft values('wq@wq.com',null,'user@user.com','= = = = = ','2017-12-12 12:42')

select * from Draft where D_LoginId='wq@wq.com'

select*from Draft


--创建表：好友表--Friend（此表代表用户A和用户B是好友关系）
if OBJECT_ID('Friend')is not null
drop Table Friend
go
create Table Friend
(
	F_Id int identity(1,1) primary key,			--编号
	F_UserA Nvarchar(50) not null,				--用户A
	F_UserB Nvarchar(50) not null				--用户B
)
--添加测试数据
insert into Friend values('wq@wq.com','user@user.com')
insert into Friend values('32','wq@wq.com')

--创建表：投诉表--Complaints
if OBJECT_ID('Complaints')is not null
drop Table Complaints
go
create Table Complaints
(
	C_Id int identity(1,1) primary key,			--编号
	C_Complainant Nvarchar(50) not null,		--投诉人
	C_ComplainantO Nvarchar(50) not null,		--投诉对象
	C_Email int not null						--相关邮件
	constraint fk_Email foreign key(C_Email) references Email(E_Id),
	C_Reason Nvarchar(200) not null				--投诉原因
)
--添加测试记录
insert into Complaints values('wq@wq.com','user@user.com','3','被骚扰了')

--创建表：管理员权限表--Power
if OBJECT_ID('Power')is not null
drop Table Power
go
create Table Power
(
	P_Id int identity(1,1) primary key,		--编号
	P_Name Nvarchar(50) not null			--权限名称
)
--添加测试数据
insert into Power values('最高权限')
insert into Power values('审核邮件')
insert into Power values('回复邮件')
insert into Power values('对用户进行管理')

--创建表：管理员--Admin
if OBJECT_ID('Admin')is not null
drop Table Admin
go
create Table Admin
(
	A_Id int identity(1,1) primary key,		--编号
	A_LoginId Nvarchar(50) not null,		--帐号
	A_Pwd Nvarchar(50) not null,			--密码
	A_Power int not null					--权限
	constraint fk_Power foreign key(A_Power) references Power(P_Id)
)
--添加测试数据
insert into Admin values('admin','admin',1)
insert into Admin values('admin01','admin',2)
insert into Admin values('admin02','admin',3)
insert into Admin values('admin03','admin',4)


--创建表：审核表--Audit
if OBJECT_ID('Audit')is not null
drop Table Audit
go
create Table Audit
(
	A_Id int identity(1,1) primary key,			--编号
	A_Admin Nvarchar(50) not null,				--管理员
	A_Complaint int not null					--相关投诉信息
	constraint fk_Complaint foreign key(A_Complaint) references Complaints(C_Id),
	A_Content Nvarchar(200) not null			--处理结果
)
--添加测试数据
insert into Audit values('admin@admin.com',1,'审核通过，举报成功')


select*from Admin
select*from Audit
select*from Complaints
select*from Draft
select*from Email
select*from Friend
select*from Power
select*from Users

select*from Friend

select  F_usera,F_UserB from Friend where F_Id in(	select F_Id from Friend where F_UserA='wq@wq.com' or F_UserB='wq@wq.com')


select F_UserA from Friend where F_UserB='wq@wq.com'
select F_UserB from Friend where F_UserA='wq@wq.com'

if OBJECT_ID('Friend')is not null
drop table Friend
go
create table Friend
(
	Id int identity(1,1) primary key ,
	Friend nvarchar(50) not null,
	
)


if exists(select * from sys.procedures
 where name='createTable')
 drop proc createTable
 go
 create proc createTable
 (
	@tableName nvarchar(50)
 )
 as
	create table @tableName
	(
		Id int identity(1,1) primary key,
		Name nvarchar(50) not null
	)
	
	
	go

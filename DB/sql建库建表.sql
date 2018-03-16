use master

--�������ݿ�:EmailDB
if db_id('EmailDB')is not null
drop DataBase EmailDB
go
create DataBase EmailDB
on
(
	name='EmailDB',
	filename='F:\DB\EmailDB\EmailDB.mdf'
)

--�����ݿ�
use EmailDB

--������:�û���--Users
if OBJECT_ID('Users')is not null
drop Table Users
go
create Table Users
(
	U_Id int identity(1,1) primary key,			--���
	U_LoginId nvarchar(50) not null,			--�û���
	U_LoginPwd nvarchar(50) not null,			--����
	U_Phone nvarchar(11) not null				--�绰
)
--��Ӳ�������
insert into Users values('wq@wq.com','wq','15679217340')
insert into Users values('user@user.com','user','13112304102')
select*from Users

--������:�ʼ���--Email
if OBJECT_ID('Email')is not null
drop Table Email
go
create Table Email
(
	E_Id int identity(1,1) primary key,			--���
	E_Title Nvarchar(50) not null,				--����
	E_Time DateTime not null,					--ʱ��
	E_SendMan Nvarchar(50) not null,			--������
	E_ReceiveMan Nvarchar(50) not null,			--������
	E_Content Nvarchar(max) not null,			--����
	E_Litter Nvarchar(1)not null,				--�����ʼ����
	constraint ck_E_litter check(E_Litter='��' or E_Litter='��'),
	E_Read Nvarchar(2) not null,				--�Ѷ����
	constraint ck_E_Read check(E_Read='�Ѷ�' or E_Read='δ��'),
	E_Delete Nvarchar(1) not null,				--ɾ���ʼ�
	constraint ck_E_Delete check(E_Delete='��' or E_Delete='��'),
	E_Report Nvarchar(1) not null,
	constraint E_Report check(E_Report='��' or E_Report='��'),
)
--��Ӳ�������
insert into Email values('���к�','2017/11/15 10:02','wq@wq.com','user@user.com','��ð�������wq','��','�Ѷ�','��','��')
insert into Email values('�ʺ�','2017/11/15 10:04','user@user.com','wq@wq.com','��ã�����user','��','�Ѷ�','��','��')
insert into Email values('�ʺ�','2017/11/15 10:05','user@user.com','wq@wq.com','�����������������ˣ�������','��','�Ѷ�','��','��')
insert into Email values('test001','2017/11/15 11:05','user@user.com','wq@wq.com','666���Ȼ���ҳԼ�','��','�Ѷ�','��','��')
insert into Email values('test002','2017/11/16 15:23','user@user.com','wq@wq.com','����','��','�Ѷ�','��','��')
insert into Email values('test003','2017/11/17 23:55','user@user.com','wq@wq.com','�Է���','��','�Ѷ�','��','��')
insert into Email values('test004','2017/11/18 19:33','user@user.com','wq@wq.com','���ϲ������','��','δ��','��','��')
insert into Email values('test005','2017/11/19 13:11','user@user.com','wq@wq.com','�����ʲô','��','δ��','��','��')
insert into Email values('test006','2017/11/20 06:33','user@user.com','wq@wq.com','ɭ','��','δ��','��','��')
insert into Email values('test006','2017/01/26 13:49','user@user.com','wq@wq.com','9420','��','δ��','��','��')
insert into Email values('test006','2017/09/08 09:25','user@user.com','wq@wq.com','�ҿ쵽��','��','δ��','��','��')

insert into Email values('���к�','2017/11/15 10:02','wq@wq.com','user@user.com','��ð�������wq','��','�Ѷ�','��','��')
insert into Email values('�ʺ�','2017/11/15 10:04','user@user.com','wq@wq.com','��ã�����user','��','�Ѷ�','��','��')
insert into Email values('�ʺ�','2017/11/15 10:05','user@user.com','wq@wq.com','�����������������ˣ�������','��','�Ѷ�','��','��')
insert into Email values('test001','2017/11/15 11:05','user@user.com','wq@wq.com','666���Ȼ���ҳԼ�','��','�Ѷ�','��','��')
insert into Email values('test002','2017/11/16 15:23','user@user.com','wq@wq.com','����','��','�Ѷ�','��','��')
insert into Email values('test003','2017/11/17 23:55','user@user.com','wq@wq.com','�Է���','��','�Ѷ�','��','��')
insert into Email values('test004','2017/11/18 19:33','user@user.com','wq@wq.com','���ϲ������','��','δ��','��','��')
insert into Email values('test005','2017/11/19 13:11','user@user.com','wq@wq.com','�����ʲô','��','δ��','��','��')
insert into Email values('test006','2017/11/20 06:33','user@user.com','wq@wq.com','ɭ','��','δ��','��','��')
insert into Email values('test006','2017/01/26 13:49','user@user.com','wq@wq.com','9420','��','δ��','��','��')
insert into Email values('test006','2017/09/08 09:25','user@user.com','wq@wq.com','�ҿ쵽��','��','δ��','��','��')

insert into Email values('test1','2017/09/08 09:25','wq@wq.com','user@user.com','����111','��','δ��','��','��')
insert into Email values('test2','2017/09/08 09:25','wq@wq.com','user@user.com','����112','��','δ��','��','��')
insert into Email values('test3','2017/09/08 09:25','wq@wq.com','user@user.com','����113','��','δ��','��','��')
insert into Email values('test4','2017/09/08 09:25','wq@wq.com','user@user.com','����114','��','δ��','��','��')
insert into Email values('test5','2017/09/08 09:25','wq@wq.com','user@user.com','����115','��','δ��','��','��')
insert into Email values('test6','2017/09/08 09:25','wq@wq.com','user@user.com','����116','��','δ��','��','��')
insert into Email values('test7','2017/09/08 09:25','wq@wq.com','user@user.com','����117','��','δ��','��','��')
insert into Email values('test8','2017/09/08 09:25','wq@wq.com','user@user.com','����118','��','δ��','��','��')

select *from Email where E_ReceiveMan='wq@wq.com' and E_Read='δ��'
select *from Email where E_ReceiveMan='wq@wq.com' and E_Read='�Ѷ�'

select *from Email where E_ReceiveMan='wq@wq.com' and E_Read='�Ѷ�' and E_Delete='��'

Select * from Email where E_ReceiveMan='wq@wq.com' and E_Delete='��'

Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='δ��' and E_Delete='��' 
Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='δ��' and E_Delete='��' 
Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='�Ѷ�' and E_Delete='��' 


go

--�������ʼ��ݸ��--Draft
if OBJECT_ID('Draft')is not null
drop Table Draft
go
create Table Draft
(
	D_Id int identity(1,1) primary key,				--���
	D_LoginId Nvarchar(50) not null,				--�û���
	D_Title Nvarchar(50) null,						--����
	D_Receive Nvarchar(50) null,					--�ռ���
 	D_Content Nvarchar(max) null,				--����
 	D_Time datetime not null						--ʱ��
)
--��Ӳ�������
insert into Draft values('wq@wq.com',null,'user@user.com','sd','2017-12-14 12:26')
insert into Draft values('wq@wq.com','�ʺ�','user@user.com','��','2017-12-15 05:35')
insert into Draft values('wq@wq.com','����','user@user.com','�ǵ�����һ��ȥ��ɽ','2017-12-16 19:16')
insert into Draft values('wq@wq.com','ɧ��','user@user.com','�����Ұ�','2017-11-11 20:11')
insert into Draft values('wq@wq.com','����','user@user.com','һ��Լ���','2017-12-06 19:05')
insert into Draft values('wq@wq.com',null,'user@user.com','����������','2017-12-14 05:46')
insert into Draft values('wq@wq.com',null,'user@user.com','����������','2017-12-13 15:51')
insert into Draft values('wq@wq.com',null,'user@user.com','= = = = = ','2017-12-12 12:42')

select * from Draft where D_LoginId='wq@wq.com'

select*from Draft


--���������ѱ�--Friend���˱�����û�A���û�B�Ǻ��ѹ�ϵ��
if OBJECT_ID('Friend')is not null
drop Table Friend
go
create Table Friend
(
	F_Id int identity(1,1) primary key,			--���
	F_UserA Nvarchar(50) not null,				--�û�A
	F_UserB Nvarchar(50) not null				--�û�B
)
--��Ӳ�������
insert into Friend values('wq@wq.com','user@user.com')
insert into Friend values('32','wq@wq.com')

--������Ͷ�߱�--Complaints
if OBJECT_ID('Complaints')is not null
drop Table Complaints
go
create Table Complaints
(
	C_Id int identity(1,1) primary key,			--���
	C_Complainant Nvarchar(50) not null,		--Ͷ����
	C_ComplainantO Nvarchar(50) not null,		--Ͷ�߶���
	C_Email int not null						--����ʼ�
	constraint fk_Email foreign key(C_Email) references Email(E_Id),
	C_Reason Nvarchar(200) not null				--Ͷ��ԭ��
)
--��Ӳ��Լ�¼
insert into Complaints values('wq@wq.com','user@user.com','3','��ɧ����')

--����������ԱȨ�ޱ�--Power
if OBJECT_ID('Power')is not null
drop Table Power
go
create Table Power
(
	P_Id int identity(1,1) primary key,		--���
	P_Name Nvarchar(50) not null			--Ȩ������
)
--��Ӳ�������
insert into Power values('���Ȩ��')
insert into Power values('����ʼ�')
insert into Power values('�ظ��ʼ�')
insert into Power values('���û����й���')

--����������Ա--Admin
if OBJECT_ID('Admin')is not null
drop Table Admin
go
create Table Admin
(
	A_Id int identity(1,1) primary key,		--���
	A_LoginId Nvarchar(50) not null,		--�ʺ�
	A_Pwd Nvarchar(50) not null,			--����
	A_Power int not null					--Ȩ��
	constraint fk_Power foreign key(A_Power) references Power(P_Id)
)
--��Ӳ�������
insert into Admin values('admin','admin',1)
insert into Admin values('admin01','admin',2)
insert into Admin values('admin02','admin',3)
insert into Admin values('admin03','admin',4)


--��������˱�--Audit
if OBJECT_ID('Audit')is not null
drop Table Audit
go
create Table Audit
(
	A_Id int identity(1,1) primary key,			--���
	A_Admin Nvarchar(50) not null,				--����Ա
	A_Complaint int not null					--���Ͷ����Ϣ
	constraint fk_Complaint foreign key(A_Complaint) references Complaints(C_Id),
	A_Content Nvarchar(200) not null			--������
)
--��Ӳ�������
insert into Audit values('admin@admin.com',1,'���ͨ�����ٱ��ɹ�')


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

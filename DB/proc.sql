
use EmailDB


Select * from Email where E_ReceiveMan='wq@wq.com' and E_Read='�Ѷ�' and E_Delete='��' 

select *from(select row_number() over(order by E_Id)as n,*from Email where E_ReceiveMan='wq@wq.com'and E_Delete='��')N_Email where n between 10 and 15


------------------------------------------���Ƿֽ���1----------------------------------------------------------


--������ѯ�û������ʼ��洢����
If Exists(Select * From sys.procedures 
 where name='P_Email_SelectEmailByUser')
 Drop Proc P_Email_SelectEmailByUser
 go
 Create Proc P_Email_SelectEmailByUser
 (
	@start int,
	@end int,
	@user nvarchar(50)
)
as 
	select *from
	(select row_number() over(order by E_Id)as n,*from Email where E_ReceiveMan=@user and E_Delete='��' and E_Litter='��')N_Email
	where n between @start and @end
	
exec P_Email_SelectEmailByUser 1,15,'wq@wq.com'

select COUNT(*) from Email where E_ReceiveMan='wq@wq.com' and E_Delete='��' and E_Litter='��'
select CEILING(CONVERT(float,count(*))/16) from Email where E_ReceiveMan='wq@wq.com' and E_Delete='��' and E_Litter='��'



------------------------------------------���Ƿֽ���2----------------------------------------------------------


--������ѯ�����ʼ��ܼ�¼����ҳ���洢����
if exists(select * from sys.procedures 
	where name='P_Email_SelectEmailCountAndPageCount')
drop proc P_Email_SelectEmailCountAndPageCount
go
create proc P_Email_SelectEmailCountAndPageCount
(
	@user nvarchar(50),
	@count int output,
	@pageCount int output
)
as 
	select @count=COUNT(*), @pageCount=CEILING(CONVERT(float,count(*))/16) from Email where E_ReceiveMan=@user and E_Delete='��' and E_Litter='��'


declare @c int,@p int
exec P_Email_SelectEmailCountAndPageCount 'wq@wq.com',@c output,@p output
print @c
print @p

select * from Email where E_ReceiveMan='wq@wq.com' and E_Delete='��'	
Select * from Email where E_ReceiveMan='wq@wq.com' and  E_Delete='��' 


------------------------------------------���Ƿֽ���3----------------------------------------------------------

--������ѯ�û�������ɾ���ʼ��洢����
If Exists(Select * From sys.procedures 
 where name='P_Email_SelectDeleteEmailByUser')
 Drop Proc P_Email_SelectDeleteEmailByUser
 go
 Create Proc P_Email_SelectDeleteEmailByUser
 (
	@start int,
	@end int,
	@user nvarchar(50)
)
as 
	select *from
	(select row_number() over(order by E_Id)as n,*from Email where (E_ReceiveMan=@user or E_SendMan=@user) and E_Delete='��')N_Email
	where n between @start and @end
	
exec P_Email_SelectDeleteEmailByUser 1,90,'wq@wq.com'


------------------------------------------���Ƿֽ���4----------------------------------------------------------

--������ѯ�û�������ɾ���ʼ���������ҳ���洢����
if exists(select * from sys.procedures 
	where name='P_Email_SelectDeleteEmailCountAndPageCount')
drop proc P_Email_SelectDeleteEmailCountAndPageCount
go
create proc P_Email_SelectDeleteEmailCountAndPageCount
(
	@user nvarchar(50),
	@count int output,
	@pageCount int output
)
as 
	select @count=COUNT(*), @pageCount=CEILING(CONVERT(float,count(*))/16) from Email where (E_ReceiveMan=@user or E_SendMan=@user) and E_Delete='��'

declare @c int ,@p int
exec P_Email_SelectDeleteEmailCountAndPageCount 'wq@wq.com',@c output ,@p output
print @c 
print @p


------------------------------------------���Ƿֽ���5----------------------------------------------------------



--������ѯ�û��Ѷ��ʼ���δ���ʼ��洢����
If Exists(Select * From sys.procedures 
 where name='P_Email_SelectReadorNread')
 Drop Proc P_Email_SelectReadorNread
 go
 Create Proc P_Email_SelectReadorNread
 (
	@start int,
	@end int,
	@user nvarchar(50),
	@read nvarchar(2)
)
as 
	select *from
	(select row_number() over(order by E_Id)as n,*from Email where E_ReceiveMan=@user and E_Read=@read and E_Delete='��' and E_Litter='��')N_Email
	where n between @start and @end
	
exec P_Email_SelectReadorNread '1','10','wq@wq.com','�Ѷ�'
exec P_Email_SelectReadorNread '1','10','wq@wq.com','δ��'	


------------------------------------------���Ƿֽ���6----------------------------------------------------------


--������ѯ�Ѷ��ʼ���δ���ʼ����ܼ�¼����ҳ���洢�ع���
if exists(select * from sys.procedures 
	where name='P_Email_SelectReadorNreadCountAndPageCount')
drop proc P_Email_SelectReadorNreadCountAndPageCount
go
create proc P_Email_SelectReadorNreadCountAndPageCount
(
	@user nvarchar(50),
	@read nvarchar(2),
	@count int output,
	@pageCount int output
)
as 
	select @count=COUNT(*), @pageCount=CEILING(CONVERT(float,count(*))/16) from Email where E_ReceiveMan=@user and E_Read=@read and E_Delete='��' and E_Litter='��'


declare @c int ,@p int 
exec P_Email_SelectReadorNreadCountAndPageCount 'wq@wq.com','�Ѷ�',@c output,@p output
print @c
print @p

select* from Email where E_ReceiveMan='wq@wq.com' and E_Read='�Ѷ�' and E_Delete='��'


------------------------------------------���Ƿֽ���7----------------------------------------------------------


--������ѯ���������ʼ��ӷ�ҳ�洢����
if exists(select * from sys.procedures
  where name='SelectLitterByUser')
drop proc SelectLitterByUser
go
create proc SelectLitterByUser
(
	@start int ,
	@end int ,
	@user nvarchar(50)
)
as
	select * from
	(select ROW_NUMBER() over(order by E_Id)as n,*from Email where E_ReceiveMan=@user and E_Litter='��')L_Email  
	where n between @start  and @end
	
SelectLitterByUser 1,16,'wq@wq.com'

Update Email set E_Delete='��' where E_Id in(6)

------------------------------------------���Ƿֽ���8----------------------------------------------------------


--��ѯ�����ʼ�������ҳ���洢����
if exists(select * from sys.procedures 
	where name='P_Email_SelectLitterCountAndPageCount')
drop proc P_Email_SelectLitterCountAndPageCount
go
create proc P_Email_SelectLitterCountAndPageCount
(
	@user nvarchar(50),
	@count int output,
	@pageCount int output
)
as 
	select @count=COUNT(*), @pageCount=CEILING(CONVERT(float,count(*))/16) from Email where E_ReceiveMan=@user and E_Litter='��'

declare @c int ,@p int 
exec P_Email_SelectLitterCountAndPageCount 'wq@wq.com',@c output ,@p output
print @c 
print @p


------------------------------------------���Ƿֽ���9----------------------------------------------------------


--������ѯ���вݸ�ӷ�ҳ�洢����
if exists(select * from sys.procedures
  where name='SelectDraftByUser')
drop proc SelectDraftByUser
go
create proc SelectDraftByUser
(
	@start int,
	@end int,
	@user nvarchar(50)
)
as
	select *from
	(select row_number() over(order by D_Id)as n,*from Draft where D_LoginId=@user)N_Draft
	where n between @start and @end
	
	
	select* from draft
exec SelectDraftByUser 2,4,'wq@wq.com'


------------------------------------------���Ƿֽ���10----------------------------------------------------------


--������ѯ���вݸ�������ҳ���洢����
if exists(select * from sys.procedures
  where name='SelectDraftCountAndPageCountByUser')
drop proc SelectDraftCountAndPageCountByUser
go
create proc SelectDraftCountAndPageCountByUser
(
	@user nvarchar(50),
	@count int output,
	@pageCount int output
)
as
  select @count=COUNT(*),@pageCount=CEILING(CONVERT(float,count(*))/16) from Draft where D_LoginId=@user

declare @c int ,@p int
exec SelectDraftCountAndPageCountByUser 'wq@wq.com',@c output,@p output
print @c
print @p


------------------------------------------���Ƿֽ���11----------------------------------------------------------

--������ѯ�û������ѷ����ʼ��ӷ�ҳ�洢����
if exists(select * from sys.procedures
 where name='SelectSendEmailByUser')
drop proc SelectSendEmailByUser
 go
create proc SelectSendEmailByUser
(
	@start int ,
	@end int ,
	@user nvarchar(50)
)
as
	select *from
	(select row_number() over(order by E_Id)as n,*from Email where E_SendMan=@user and E_Delete='��')N_Email
	where n between @start and @end
	
	
	exec SelectSendEmailByUser 1,100, 'wq@wq.com'
	
------------------------------------------���Ƿֽ���12----------------------------------------------------------

--������ѯ�û������ѷ����ʼ�������ҳ���洢����
if exists(select * from sys.procedures
	where name='SelectSendEmailCountAndPageCount')
drop proc SelectSendEmailCountAndPageCount
  go
create proc SelectSendEmailCountAndPageCount
(
	@user nvarchar(50),
	@count int output,
	@pageCount int output
)
as
  select @count=COUNT(*),@pageCount=CEILING(CONVERT(float,count(*))/16) from Email where E_SendMan=@user and E_Delete='��'
  
  
declare @c int ,@p int   
exec SelectSendEmailCountAndPageCount 'wq@wq.com',@c output,@p output
print @c 
print @p

  
  select * from Email where E_SendMan='wq@wq.com' and E_Delete='��'

  
------------------------------------------���Ƿֽ���13----------------------------------------------------------

  --������ѯ�Ѿٱ��ʼ��ӷ�ҳ�洢����
if exists(select * from sys.procedures
 where name='SelectReportEmailByUser')
drop proc SelectReportEmailByUser
 go
create proc SelectReportEmailByUser
(
	@start int ,
	@end int
)
as
	select *from
	(select row_number() over(order by E_Id)as n,*from Email where E_Report='��')N_Email
	where n between @start and @end


exec SelectReportEmailByUser 1,20


------------------------------------------���Ƿֽ���14----------------------------------------------------------

--������ѯ�û������ѷ����ʼ�������ҳ���洢����
if exists(select * from sys.procedures
	where name='SelectReportEmailCountAndPageCount')
drop proc SelectReportEmailCountAndPageCount
  go
create proc SelectReportEmailCountAndPageCount
(
	@count int output,
	@pageCount int output
)
as
  select @count=COUNT(*),@pageCount=CEILING(CONVERT(float,count(*))/16) from Email where E_Report='��'
  

declare @c int ,@p int 
exec SelectReportEmailCountAndPageCount @c output ,@p output
print @c 
print @p


update Email set E_Report='��',E_Litter='��' where E_Id='1'

select*from Email


------------------------------------------���Ƿֽ���15----------------------------------------------------------

use EmailDB
--������̬�������ݱ�洢����
if exists(select * from sys.procedures
	where name='CreateTable')
drop proc CreateTable
  go
CREATE PROC CreateTable
(
@fname NVARCHAR(50),
@gname NVARCHAR(50)
)
AS 
--�����û������		
DECLARE @a NVARCHAR(max)
SET @a='if object_id('''+@gname+''')is not null
		 drop table '+@gname+'
	     create table '+@gname +'
	    (
			G_Id int identity(1,1) primary key ,
			G_Name nvarchar(50) null
		)'
EXEC (@a)
--��ʼ�����������
DECLARE @b NVARCHAR(max)
SET @b='insert into '+@gname+' values('''')'
EXEC (@b)		
--�����û����ѱ�
DECLARE @c NVARCHAR(max)
SET @c='if object_id('''+@fname+''')is not null
		 drop table '+@fname+'
	     create table '+@fname +'
	    (
			F_Id int identity(1,1) primary key ,
			F_User nvarchar(50) not null,
			F_Mail nvarchar(50) not null,
			F_Fname nvarchar(50) null,
			F_Phone nvarchar(50) null,
			F_Group int not null
			foreign key(F_Group) references '+@gname+'(G_Id)
		)'
EXEC (@c)
		
exec createtable 'friend_2','group_2'		
		
EXEC createtable 'friend_1','group_1'

insert into group_1 values('����')
insert into group_1 values('����')
insert into group_1 values('ͬѧ')

insert into friend_1 values('wq@wq.com','ss','ss','',1)
insert into friend_1 values('wq@wq.com','you@you.com','С��','',2)
insert into friend_1 values('wq@wq.com','jh257y@163.com','Сl','',3)
insert into friend_1 values('wq@wq.com','dns@sd.com','����','',4)
insert into friend_1 values('wq@wq.com','dns@sd.com','������','',7)
select*from Users



select F_User,F_Mail,F_Fname,F_Phone,G_Name from friend_1 f,group_1 g
where f.F_Group=g.G_Id 
select*from friend_1

update friend_1 set F_Group='2' where F_Id='3'

delete from friend_1 where F_Id=4

select * from friend_1


--������ѯ��


select * from group_1 

select COUNT(*) from friend_1 where F_Group=1
select * from friend_1 where F_Group=2



select * from friend_1




select COUNT(distinct F_Group) as numberof from friend_1

--select distinct ���� from ���� (����)
--SELECT COUNT(DISTINCT ����) AS NumberOf���� FROM ����


go


select distinct F_Group from friend_1
select COUNT(*) from( select distinct F_Group from friend_1) temp



select * from friend_1 where F_Group=1
select * from friend_1 where F_Group=2
select * from friend_1 where F_Group=3
select * from friend_1 where F_Group=7
select * from friend_1 where F_Group=5

select F_Group,count(F_Group) as gCount from friend_1 group by F_Group
select F_Group,COUNT(F_Group) as gCount from friend_1 f,group_1 g
where f.F_Group=g.G_Id group by F_Group

select G_Id,COUNT(G_Id) as gCount from friend_1 f,group_1 g
where f.F_Group=g.G_Id group by G_Id


select* from friend_1 where F_Group=6


select *from group_1 where G_Id=1




select *from group_1
select G_Id,COUNT(G_Id) as gCount from Friend_1 f,Group_1 g where f.F_Group = g.G_Id group by G_Id


select G_Name,F_User from group_1 g,friend_1 f
where g.G_Id=f.F_Group


select F_Id,F_User,F_Mail,F_Fname,G_Name  from friend_1 f,group_1 g
where f.F_Group=g.G_Id


delete from friend_1 where F_Id in (2)

select*from friend_1

select*from group_1



use EmailDB

select G_Id,COUNT(G_Id) as gCount from Friend_1 f,Group_1 g where f.F_Group = g.G_Id group by G_Id
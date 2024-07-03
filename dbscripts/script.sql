USE [master]
GO
/****** Object:  Database [customermanagement]    Script Date: 03-07-2024 18:38:33 ******/
CREATE DATABASE [customermanagement]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'customermanagement', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\customermanagement.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'customermanagement_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\customermanagement_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [customermanagement] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [customermanagement].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [customermanagement] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [customermanagement] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [customermanagement] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [customermanagement] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [customermanagement] SET ARITHABORT OFF 
GO
ALTER DATABASE [customermanagement] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [customermanagement] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [customermanagement] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [customermanagement] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [customermanagement] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [customermanagement] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [customermanagement] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [customermanagement] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [customermanagement] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [customermanagement] SET  ENABLE_BROKER 
GO
ALTER DATABASE [customermanagement] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [customermanagement] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [customermanagement] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [customermanagement] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [customermanagement] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [customermanagement] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [customermanagement] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [customermanagement] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [customermanagement] SET  MULTI_USER 
GO
ALTER DATABASE [customermanagement] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [customermanagement] SET DB_CHAINING OFF 
GO
ALTER DATABASE [customermanagement] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [customermanagement] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [customermanagement] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [customermanagement] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [customermanagement] SET QUERY_STORE = OFF
GO
USE [customermanagement]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 03-07-2024 18:38:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Name] [varchar](50) NULL,
	[ManagerId] [int] NOT NULL,
	[CoordinatorId] [int] NOT NULL,
	[ExecutiveId] [int] NOT NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedOn] [datetime] NULL,
	[PhoneNo] [varchar](20) NULL,
	[Domain] [varchar](50) NULL,
	[Description] [varchar](50) NULL,
	[createdby] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FollowUp]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FollowUp](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [int] NOT NULL,
	[ReviewerId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[UpdatedBy] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FollowUpDetail]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FollowUpDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FollowUpId] [int] NOT NULL,
	[Status] [varchar](50) NULL,
	[Type] [varchar](50) NULL,
	[Note] [varchar](255) NULL,
	[FollowUpDate] [date] NULL,
	[FollowUpTime] [time](7) NULL,
	[CreatedBy] [int] NOT NULL,
	[UpdatedBy] [int] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Privileges]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Privileges](
	[PrivilegeId] [int] IDENTITY(1,1) NOT NULL,
	[PrivilegeCode] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[PrivilegeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolePrivileges]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolePrivileges](
	[RoleId] [int] NOT NULL,
	[PrivilegeId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC,
	[PrivilegeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[ManagerId] [int] NULL,
	[CoordinatorId] [int] NULL,
	[ExecutiveId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Customers] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[FollowUp] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[FollowUp] ADD  DEFAULT (getdate()) FOR [UpdatedOn]
GO
ALTER TABLE [dbo].[FollowUpDetail] ADD  DEFAULT (getdate()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[FollowUpDetail] ADD  DEFAULT (getdate()) FOR [UpdatedOn]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [FK_Customer_Coordinator] FOREIGN KEY([CoordinatorId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [FK_Customer_Coordinator]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [FK_Customer_Executive] FOREIGN KEY([ExecutiveId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [FK_Customer_Executive]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [FK_Customer_Manager] FOREIGN KEY([ManagerId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [FK_Customer_Manager]
GO
ALTER TABLE [dbo].[FollowUp]  WITH CHECK ADD  CONSTRAINT [FK_FollowUp_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUp] CHECK CONSTRAINT [FK_FollowUp_CreatedBy]
GO
ALTER TABLE [dbo].[FollowUp]  WITH CHECK ADD  CONSTRAINT [FK_FollowUp_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[FollowUp] CHECK CONSTRAINT [FK_FollowUp_Customers]
GO
ALTER TABLE [dbo].[FollowUp]  WITH CHECK ADD  CONSTRAINT [FK_FollowUp_UpdatedBy] FOREIGN KEY([UpdatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUp] CHECK CONSTRAINT [FK_FollowUp_UpdatedBy]
GO
ALTER TABLE [dbo].[FollowUp]  WITH CHECK ADD  CONSTRAINT [FK_FollowUp_Users] FOREIGN KEY([ReviewerId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUp] CHECK CONSTRAINT [FK_FollowUp_Users]
GO
ALTER TABLE [dbo].[FollowUpDetail]  WITH CHECK ADD  CONSTRAINT [FK_FollowUpDetail_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUpDetail] CHECK CONSTRAINT [FK_FollowUpDetail_CreatedBy]
GO
ALTER TABLE [dbo].[FollowUpDetail]  WITH CHECK ADD  CONSTRAINT [FK_FollowUpDetail_FollowUp] FOREIGN KEY([FollowUpId])
REFERENCES [dbo].[FollowUp] ([Id])
GO
ALTER TABLE [dbo].[FollowUpDetail] CHECK CONSTRAINT [FK_FollowUpDetail_FollowUp]
GO
ALTER TABLE [dbo].[FollowUpDetail]  WITH CHECK ADD  CONSTRAINT [FK_FollowUpDetail_UpdatedBy] FOREIGN KEY([UpdatedBy])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[FollowUpDetail] CHECK CONSTRAINT [FK_FollowUpDetail_UpdatedBy]
GO
ALTER TABLE [dbo].[RolePrivileges]  WITH CHECK ADD FOREIGN KEY([PrivilegeId])
REFERENCES [dbo].[Privileges] ([PrivilegeId])
GO
ALTER TABLE [dbo].[RolePrivileges]  WITH CHECK ADD FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Coordinator] FOREIGN KEY([CoordinatorId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Coordinator]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Executive] FOREIGN KEY([ExecutiveId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Executive]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Manager] FOREIGN KEY([ManagerId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Manager]
GO
/****** Object:  StoredProcedure [dbo].[usp_Add_Privelage]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[usp_Add_Privelage]
    @pcode varchar(50),
    @desc  varchar(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the UserId and RoleId pair already exists
  
        INSERT INTO Privileges( PrivilegeCode,Description) VALUES (@pcode, @desc);
    
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_Add_Role_Privelage]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[usp_Add_Role_Privelage]
    @pId int,
    @rId int
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the UserId and RoleId pair already exists
    IF NOT EXISTS (SELECT 1 FROM RolePrivileges WHERE PrivilegeId = @pId AND RoleId = @rId)
    BEGIN
        -- Insert statement
        INSERT INTO RolePrivileges(PrivilegeId, RoleId) VALUES (@pId, @rId);
    END
    ELSE
    BEGIN
        PRINT 'User role already exists'; -- Optionally handle the case where it already exists
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_Add_User_Role]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Add_User_Role]
    @Id int,
    @rId int,
	 @mId int,
    @cId int
AS
BEGIN
    SET NOCOUNT ON;
	if @mid=0 
	begin
	set @mid=null;
	end
	if @cid=0 
	begin
	set @cid=null;
	end

    -- Check if the UserId and RoleId pair already exists
    IF NOT EXISTS (SELECT 1 FROM UserRoles WHERE UserId = @Id AND RoleId = @rId)
    BEGIN
        -- Insert statement
        INSERT INTO UserRoles (UserId, RoleId) VALUES (@Id, @rId);
		if @rId=3 or @rid=4
		begin
		
		  update users set managerid=@mid,coordinatorid=@cid where UserId=@id;
		end
    END
    ELSE
    BEGIN
        PRINT 'User role already exists'; -- Optionally handle the case where it already exists
    END
END;


GO
/****** Object:  StoredProcedure [dbo].[usp_Edit_Followups]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Edit_Followups]
    @fid INT,
    @note VARCHAR(255),
    @createdbyid INT,
    @FollowUpDate DATE,
    @FollowUpTime TIME,
    @status INT
AS
BEGIN
    -- Start a transaction
    BEGIN TRANSACTION

    -- Update FollowUpDetail table with the new details
	update FollowUp 
	 SET
         
        UpdatedBy = @createdbyid,
        UpdatedOn = GETDATE()
        
    WHERE Id = @fid;

    UPDATE FollowUpDetail
    SET
        Note = @note,
        FollowUpDate = @FollowUpDate,
        FollowUpTime = @FollowUpTime,
        UpdatedBy = @createdbyid,
        UpdatedOn = GETDATE(),
        Status = CASE 
                    WHEN @status = 1 THEN 'done'
                    ELSE Status
                 END
    WHERE FollowUpId = @fid;

    -- Commit the transaction
    COMMIT TRANSACTION
END
GO
/****** Object:  StoredProcedure [dbo].[usp_Edit_role_privelage]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Edit_role_privelage]
    @pId int,
    @ar int,
    @mr int,
    @cr int,
    @er int
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @RoleId int
    DECLARE @AssignRole bit

    DECLARE RoleCursor CURSOR FOR
    SELECT RoleId, AssignRole
    FROM (VALUES (1, @ar), (2, @mr), (3, @cr), (4, @er)) AS RoleAssignments(RoleId, AssignRole)

    OPEN RoleCursor
    FETCH NEXT FROM RoleCursor INTO @RoleId, @AssignRole

    WHILE @@FETCH_STATUS = 0
    BEGIN
        IF @AssignRole = 1
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM RolePrivileges WHERE RoleId = @RoleId AND PrivilegeId = @pId)
            BEGIN
                INSERT INTO RolePrivileges (RoleId, PrivilegeId) VALUES (@RoleId, @pId)
            END
        END
        ELSE
        BEGIN
            DELETE FROM RolePrivileges WHERE RoleId = @RoleId AND PrivilegeId = @pId
        END

        FETCH NEXT FROM RoleCursor INTO @RoleId, @AssignRole
    END

    CLOSE RoleCursor
    DEALLOCATE RoleCursor
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_Edit_user_role]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[usp_Edit_user_role]
    @Id int,
    @rId int
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM UserRoles WHERE UserId = @Id AND RoleId = @rId)
    BEGIN
    
        DELETE FROM UserRoles WHERE UserId = @Id AND RoleId = @rId;
    END
    ELSE
    BEGIN
        PRINT 'User role does not exist'; 
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_get_Privelage]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_get_Privelage]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        p.PrivilegeId,
        p.PrivilegeCode,
        rp.Roles,p.Description
    FROM 
        privileges p
    JOIN (
        SELECT 
            rp.PrivilegeId,
            STRING_AGG(r.RoleName, ', ') WITHIN GROUP (ORDER BY r.RoleName) AS Roles
        FROM 
            roleprivileges rp
        JOIN 
            roles r ON rp.RoleId = r.RoleId
        GROUP BY 
            rp.PrivilegeId
    ) rp ON p.PrivilegeId = rp.PrivilegeId
    GROUP BY 
        p.PrivilegeId, p.PrivilegeCode, rp.Roles,p.Description;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetAll_User]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetAll_User]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.Username, 
        u.UserId, 
        STRING_AGG(r.RoleName, ', ') AS RoleNames
    FROM 
        Users u
    LEFT JOIN 
        UserRoles ur ON u.UserId = ur.UserId
    LEFT JOIN 
        Roles r ON ur.RoleId = r.RoleId
    GROUP BY 
        u.Username, 
        u.UserId;

END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetPrivilegesByRoleId]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create stored procedure for inserting records into Customers table
CREATE PROCEDURE [dbo].[usp_GetPrivilegesByRoleId]
   @id int
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert statement
SELECT p.PrivilegeCode, p.Description 
FROM Privileges p
JOIN RolePrivileges rp ON p.PrivilegeId = rp.PrivilegeId
JOIN Roles r ON rp.RoleId = r.RoleId
JOIN UserRoles ur ON r.RoleId = ur.RoleId
JOIN Users u ON ur.UserId = u.UserId
WHERE u.UserId = @Id;

    
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetRelatedCustomersDetails]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetRelatedCustomersDetails]
    @UserId INT
AS
BEGIN
    DECLARE @Username VARCHAR(100);
    DECLARE @RoleName VARCHAR(100);

    -- Get the role and username of the specified user
  SELECT 
    @Username = u.Username,
    @RoleName = r.RoleName
FROM Users u
JOIN UserRoles ur ON u.UserId = ur.UserId
JOIN Roles r ON ur.RoleId = r.RoleId
WHERE u.UserId = @UserId;


    -- Check if the user is an admin
    IF @RoleName = 'Admin'
    BEGIN
        -- Fetch all Customer details with their associations
        SELECT 
    c.CustomerId AS cid,
    c.createdOn AS createdDate,
    c.Phoneno AS phoneNo,
    c.Description AS description,
    c.domain AS domain,
    u.Username AS Username,
    c.Name AS CustomerName,
    e.Username AS ExecutiveName,
    cco.Username AS CoordinatorName,
    m.Username AS ManagerName,
    SUM(CASE WHEN fd.status = 'done' THEN 1 ELSE 0 END) AS DoneCount,
    SUM(CASE WHEN fd.status = 'scheduled' THEN 1 ELSE 0 END) AS ScheduledCount,
    SUM(CASE WHEN fd.status = 'due' THEN 1 ELSE 0 END) AS dueCount,
    COUNT(fd.status) AS TotalFollowUps
FROM Customers c
LEFT JOIN Users e ON c.ExecutiveId = e.UserId
LEFT JOIN Users cco ON c.CoordinatorId = cco.UserId
LEFT JOIN Users m ON c.ManagerId = m.UserId
LEFT JOIN Users u ON u.UserId = @UserId
LEFT JOIN FollowUp f ON f.CustomerId = c.CustomerId
LEFT JOIN FollowUpDetail fd ON fd.followupid = f.id
GROUP BY 
    c.CustomerId, 
    c.createdOn, 
    c.Phoneno, 
    c.Description, 
    c.domain, 
    u.Username, 
    c.Name, 
    e.Username, 
    cco.Username, 
    m.Username;
    END
    ELSE
    BEGIN
        -- Fetch Customer details with their associations for the specified UserId
       SELECT 
    c.CustomerId AS cid,
    c.createdOn AS createdDate,
    c.Phoneno AS phoneNo,
    c.Description AS description,
    c.domain AS domain,
    u.Username AS Username,
    c.Name AS CustomerName,
    e.Username AS ExecutiveName,
    cco.Username AS CoordinatorName,
    m.Username AS ManagerName,
    SUM(CASE WHEN fd.status = 'done' THEN 1 ELSE 0 END) AS DoneCount,
    SUM(CASE WHEN fd.status = 'scheduled' THEN 1 ELSE 0 END) AS ScheduledCount,
    SUM(CASE WHEN fd.status = 'due' THEN 1 ELSE 0 END) AS dueCount,
    COUNT(fd.status) AS TotalFollowUps
FROM Customers c
LEFT JOIN Users e ON c.ExecutiveId = e.UserId
LEFT JOIN Users cco ON c.CoordinatorId = cco.UserId
LEFT JOIN Users m ON c.ManagerId = m.UserId
LEFT JOIN Users u ON u.UserId = @UserId
LEFT JOIN FollowUp f ON f.CustomerId = c.CustomerId
LEFT JOIN FollowUpDetail fd ON fd.followupid = f.id
WHERE c.ManagerId = @UserId OR c.CoordinatorId = @UserId OR c.ExecutiveId = @UserId
GROUP BY 
    c.CustomerId, 
    c.createdOn, 
    c.Phoneno, 
    c.Description, 
    c.domain, 
    u.Username, 
    c.Name, 
    e.Username, 
    cco.Username, 
    m.Username;

    END
END;


GO
/****** Object:  StoredProcedure [dbo].[usp_GetRelatedFollowupDetails]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetRelatedFollowupDetails]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Update follow-up statuses
    UPDATE FollowUpDetail
    SET Status = CASE 
                    WHEN  (Status != 'done' AND (FollowUpDate < CAST(GETDATE() AS DATE) OR (FollowUpDate = CAST(GETDATE() AS DATE) AND FollowUpTime < CAST(GETDATE() AS TIME))))
                        THEN 'due'
                    WHEN Status IS NULL OR ( Status != 'done' AND (FollowUpDate > CAST(GETDATE() AS DATE) OR (FollowUpDate = CAST(GETDATE() AS DATE) AND FollowUpTime >= CAST(GETDATE() AS TIME))))
                        THEN 'scheduled'
                    ELSE Status
                 END
    WHERE Status IS NULL OR Status != 'done';

    -- Get the role name of the specified user
    DECLARE @RoleName VARCHAR(100);
    SELECT @RoleName = r.RoleName
    FROM Users u
    JOIN UserRoles ur ON u.UserId = ur.UserId
    JOIN Roles r ON ur.RoleId = r.RoleId
    WHERE u.UserId = @UserId;

    -- Check if the user is an admin
    IF @RoleName = 'Admin'
    BEGIN
        -- Retrieve all follow-up details
        SELECT
            fu.Id AS fid,
            fu.CustomerId, -- Fetching CustomerId from FollowUp table
            u.Username AS ReviewerName,
            f.Status,
            u2.Username AS CreatedByName,
            f.CreatedOn,
            f.Note,
            f.FollowUpDate,
            f.FollowUpTime
        FROM
            FollowUpDetail f
        JOIN
            FollowUp fu ON f.FollowUpId = fu.Id
        JOIN
            Users u ON fu.ReviewerId = u.UserId
        JOIN
            Users u2 ON f.CreatedBy = u2.UserId;
    END
    ELSE
    BEGIN
        -- Retrieve follow-up details for related customers
        SELECT
            fu.Id AS fid,
            fu.CustomerId, -- Fetching CustomerId from FollowUp table
            u.Username AS ReviewerName,
            f.Status,
            u2.Username AS CreatedByName,
            f.CreatedOn,
            f.Note,
            f.FollowUpDate,
            f.FollowUpTime
        FROM
            FollowUpDetail f
        JOIN
            FollowUp fu ON f.FollowUpId = fu.Id
        JOIN
            Customers c ON fu.CustomerId = c.CustomerId
        JOIN
            Users u ON fu.ReviewerId = u.UserId
        JOIN
            Users u2 ON f.CreatedBy = u2.UserId
        WHERE
            c.ManagerId = @UserId
            OR c.CoordinatorId = @UserId
            OR c.ExecutiveId = @UserId;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetRelatedUsers]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetRelatedUsers]
    @UserId INT
AS
BEGIN
    DECLARE @UserRoleId INT;

    -- Get the role of the specified user
    SELECT @UserRoleId = RoleId
    FROM Users
    WHERE UserId = @UserId;

    -- Fetch the user itself
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN Roles r ON u.RoleId = r.RoleId
    WHERE u.UserId = @UserId

    UNION ALL

    -- Manager: fetch coordinators and executives directly under the manager
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN Roles r ON u.RoleId = r.RoleId
    WHERE @UserRoleId = 2 AND (
        u.ManagerId = @UserId OR
        u.CoordinatorId IN (SELECT UserId FROM Users WHERE ManagerId = @UserId)
    )

    UNION ALL

    -- Coordinator: fetch executives under the coordinator and the manager of the coordinator
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN Roles r ON u.RoleId = r.RoleId
    WHERE @UserRoleId = 3 AND (
        u.CoordinatorId = @UserId OR
        u.UserId = (SELECT ManagerId FROM Users WHERE UserId = @UserId)
    )

    UNION ALL

    -- Executive: fetch manager and coordinator of the executive
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN Roles r ON u.RoleId = r.RoleId
    WHERE @UserRoleId = 4 AND (
        u.UserId = (SELECT ManagerId FROM Users WHERE UserId = @UserId) OR
        u.UserId = (SELECT CoordinatorId FROM Users WHERE UserId = @UserId)
    );
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetRelatedUsersa]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetRelatedUsersa]
    @UserId INT
AS
BEGIN
    DECLARE @UserRoleId INT;

    -- Get the role of the specified user
    SELECT @UserRoleId = RoleId
    FROM UserRoles
    WHERE UserId = @UserId;

    -- Fetch the user itself
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN UserRoles ur ON u.UserId = ur.UserId
    JOIN Roles r ON ur.RoleId = r.RoleId
    WHERE u.UserId = @UserId

    UNION ALL

    -- Admin: fetch all users
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN UserRoles ur ON u.UserId = ur.UserId
    JOIN Roles r ON ur.RoleId = r.RoleId
    WHERE @UserRoleId = 1

    UNION ALL

    -- Manager: fetch coordinators and executives directly under the manager
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN UserRoles ur ON u.UserId = ur.UserId
    JOIN Roles r ON ur.RoleId = r.RoleId
    WHERE @UserRoleId = 2 AND (
        u.ManagerId = @UserId OR
        u.CoordinatorId IN (SELECT UserId FROM Users WHERE ManagerId = @UserId)
    )

    UNION ALL

    -- Coordinator: fetch executives under the coordinator and the manager of the coordinator
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN UserRoles ur ON u.UserId = ur.UserId
    JOIN Roles r ON ur.RoleId = r.RoleId
    WHERE @UserRoleId = 3 AND (
        u.CoordinatorId = @UserId OR
        u.UserId = (SELECT ManagerId FROM Users WHERE UserId = @UserId)
    )

    UNION ALL

    -- Executive: fetch manager and coordinator of the executive
    SELECT DISTINCT
        u.UserId,
        u.Username,
        r.RoleName
    FROM Users u
    JOIN UserRoles ur ON u.UserId = ur.UserId
    JOIN Roles r ON ur.RoleId = r.RoleId
    WHERE @UserRoleId = 4 AND (
        u.UserId = (SELECT ManagerId FROM Users WHERE UserId = @UserId) OR
        u.UserId = (SELECT CoordinatorId FROM Users WHERE UserId = @UserId)
    );
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_getUsers]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create stored procedure for inserting records into Customers table
CREATE PROCEDURE [dbo].[usp_getUsers]
   @id int
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert statement
select u.username,u.userid ,r.rolename from users u inner join Roles r on r.RoleId=u.RoleId

    
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_Insert_Customer]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Insert_Customer]
    @Email VARCHAR(100),
    @Name VARCHAR(50),
    @ManagerId INT,
    @CoordinatorId INT,
    @ExecutiveId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert statement
    INSERT INTO Customers (Email, Name, ManagerId, CoordinatorId, ExecutiveId)
    VALUES (@Email, @Name, @ManagerId, @CoordinatorId, @ExecutiveId);

    
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_Insert_Followups]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Insert_Followups]
    @cusid INT,
    @note VARCHAR(255),
    @createdbyid INT,
    @FollowUpDate DATE,
    @FollowUpTime TIME
AS
BEGIN
    -- Start a transaction
    BEGIN TRANSACTION

    -- Declare variables for new IDs and executive ID
    DECLARE @FollowUpId INT
    DECLARE @ReviewerId INT

    -- Fetch the executive ID of the customer
    SELECT @ReviewerId = ExecutiveId
    FROM Customers
    WHERE CustomerId = @cusid

    -- Insert into FollowUp table
    INSERT INTO FollowUp (CustomerId, ReviewerId, CreatedBy, CreatedOn, UpdatedBy)
    VALUES (@cusid, @ReviewerId, @createdbyid, GETDATE(),@createdbyid)

    -- Get the last inserted ID for FollowUp
    SET @FollowUpId = SCOPE_IDENTITY()

    -- Insert into FollowUpDetail table
    INSERT INTO FollowUpDetail (FollowUpId, Note, FollowUpDate,CreatedBy, FollowUpTime,UpdatedBy)
    VALUES (@FollowUpId, @note, @FollowUpDate,@createdbyid, @FollowUpTime,@createdbyid)

    -- Commit the transaction
    COMMIT TRANSACTION
END
GO
/****** Object:  StoredProcedure [dbo].[usp_Insert_User]    Script Date: 03-07-2024 18:38:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[usp_Insert_User]
    @Email VARCHAR(100),
    @Name VARCHAR(50),
     @password varchar(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert statement
    INSERT INTO users (Email, UserName, password)
    VALUES (@Email, @Name, @password);

    
END;
GO
USE [master]
GO
ALTER DATABASE [customermanagement] SET  READ_WRITE 
GO
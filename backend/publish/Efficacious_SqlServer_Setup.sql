-- ============================================================================
-- EFFICACIOUS MS SQL SERVER MIGRATION & DATA SETUP SCRIPT
-- Generated for Microsoft SQL Server 2016 / 2019 / 2022 / Azure SQL Database
-- ============================================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'EfficaciousDb')
BEGIN
    CREATE DATABASE [EfficaciousDb];
END
GO

USE [EfficaciousDb];
GO

-- ------------------------------------------------------------
-- Table: [Contacts]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Contacts]', N'U') IS NULL
BEGIN
    CREATE TABLE [Contacts] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Address] NVARCHAR(MAX) NOT NULL,
    [Phone] NVARCHAR(MAX) NOT NULL,
    [Email] NVARCHAR(MAX) NOT NULL,
    [SocialLinks] NVARCHAR(MAX) NOT NULL,
    [Website] NVARCHAR(MAX) NOT NULL
    );
END
GO

-- ------------------------------------------------------------
-- Table: [Products]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Products]', N'U') IS NULL
BEGIN
    CREATE TABLE [Products] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Image] NVARCHAR(MAX) NOT NULL,
    [Link] NVARCHAR(MAX) NOT NULL
    );
END
GO

-- ------------------------------------------------------------
-- Table: [ContactInquiries]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[ContactInquiries]', N'U') IS NULL
BEGIN
    CREATE TABLE [ContactInquiries] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Email] NVARCHAR(MAX) NOT NULL,
    [Mobile] NVARCHAR(MAX) NULL,
    [Address] NVARCHAR(MAX) NULL,
    [Subject] NVARCHAR(MAX) NULL,
    [Message] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [ContactInquiries] ON;
GO
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (1, N'Siddheshwar Patil', N'info@efficacious.co.in', N'9820011223', N'Navi Mumbai, Maharashtra', N'ERP Solution Inquiry', N'Interested in deploying eSmart School ERP.', N'2026-10-30 10:34:07.794739');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (2, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Hello, send message', N'2026-10-29T08:45:26.310Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (3, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T12:21:58.352Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (4, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T05:28:19.686Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (5, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T11:30:50.132Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (6, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello, Test message', N'2026-10-29T08:18:24.600Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (7, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T08:59:21.923Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (8, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Test message', N'2026-10-29T05:45:01.810Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (9, N'kiran kshirsagar', N'kirankshirsaagr448@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello, Message', N'2026-10-29T06:47:54.503Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (10, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Mobile App development', N'2026-10-29T08:46:45.556Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (11, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello,Test Message', N'2026-10-30T06:35:19.800Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (12, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Hello, Test Message', N'2026-10-29T09:34:21.209Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (13, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T08:21:18.224Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (14, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T09:56:32.929Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (15, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test message', N'2026-10-30T07:11:31.413Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (16, N'Kamal Agrawal', N'info@efficacious.co.in', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello, Test message', N'2026-10-29T05:26:45.618Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (17, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Hello, Test Message', N'2026-10-29T11:44:50.877Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (18, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'v bvc cv. cv', N'2026-10-28T05:58:16.000Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (19, N'Kamal Agrawal', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello,

This is a automated test email to confirm that the website contact form is functioning correctly and delivering messages to the inbox.

Best regards,

System Administrator', N'2026-10-28T04:58:12.000Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (20, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T10:45:46.440Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (21, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T09:10:50.706Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (22, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T07:30:36.299Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (23, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T10:31:08.112Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (24, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Hello, Test Message', N'2026-10-29T10:11:53.712Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (25, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T10:08:12.037Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (26, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T05:02:52.285Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (27, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test MEssage', N'2026-10-30T04:16:28.121Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (28, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, test message', N'2026-10-29T09:31:28.557Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (29, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello,

This is a automated test email to confirm that the website contact form is functioning correctly and delivering messages to the inbox.

Best regards,

System Administrator', N'2026-10-28T06:30:33.000Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (30, N'Kamal Agrawal', N'info@efficacious.co.in', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello, Test message', N'2026-10-29T05:41:14.297Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (31, N'Rahul Chauhan', N'Rahul.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello new mail', N'2026-10-28T06:10:51.000Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (32, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, test message', N'2026-10-29T09:27:31.760Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (33, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'hello test email', N'2026-10-28T06:00:52.000Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (34, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'c;bmckmcbkcmbdfklbmkl', N'2026-10-30T09:01:00.332Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (35, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'dxlcvkndxvkvnklnvxlkn', N'2026-10-30T09:04:09.085Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (36, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Test mobile message', N'2026-10-30T07:19:59.649Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (37, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T07:04:10.329Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (38, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T12:39:10.569Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (39, N'Kamal Agrawal', N'info@efficacious.co.in', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello, Test message', N'2026-10-29T05:22:11.855Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (40, N'Celeste Lancaster', N'gydugopy@mailinator.com', N'+1 (734) 877-9658', N'Eos natus dolore ess', N'A nostrum perspiciat', N'Optio est eum cum i', N'2026-10-30T09:31:48.751Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (41, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello,

This is a automated test email to confirm that the website contact form is functioning correctly and delivering messages to the inbox.

Best regards,

System Administrator', N'2026-10-28T05:04:35.000Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (42, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Contact Form Verification', N'Test message', N'2026-10-29T09:07:32.696Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (43, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Test Email – Contact Form Verification', N'Hello, Test message', N'2026-10-29T06:45:23.861Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (44, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30T06:49:50.084Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (45, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-29T10:03:43.418Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (46, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test message', N'2026-10-29T11:55:47.443Z');
INSERT INTO [ContactInquiries] ([Id], [Name], [Email], [Mobile], [Address], [Subject], [Message], [CreatedAt]) VALUES (47, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Mobile App development', N'Hello, Test Message', N'2026-10-30 12:05:12.554454');
GO
SET IDENTITY_INSERT [ContactInquiries] OFF;
GO

-- ------------------------------------------------------------
-- Table: [CareerApplications]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[CareerApplications]', N'U') IS NULL
BEGIN
    CREATE TABLE [CareerApplications] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Email] NVARCHAR(MAX) NOT NULL,
    [Mobile] NVARCHAR(MAX) NULL,
    [Address] NVARCHAR(MAX) NULL,
    [Position] NVARCHAR(MAX) NULL,
    [Message] NVARCHAR(MAX) NULL,
    [ResumeName] NVARCHAR(MAX) NULL,
    [ResumeSize] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [CareerApplications] ON;
GO
INSERT INTO [CareerApplications] ([Id], [Name], [Email], [Mobile], [Address], [Position], [Message], [ResumeName], [ResumeSize], [CreatedAt]) VALUES (1, N'Amit Sharma', N'amit.sharma@example.com', N'9819001122', N'Mumbai (On-site)', N'Sales & Business Development', N'5 years of experience in ERP solution sales.', N'Amit_Sharma_CV.pdf', N'120.5 KB', N'2026-10-30 10:49:37.628036');
INSERT INTO [CareerApplications] ([Id], [Name], [Email], [Mobile], [Address], [Position], [Message], [ResumeName], [ResumeSize], [CreatedAt]) VALUES (2, N'Kamal Agrawal', N'info@efficacious.co.in', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Administration / Back Office', N'fdgdfgdfgdfgdf', N'Fake-Resume.pdf', N'243.2 KB', N'2026-10-29T05:29:33.607Z');
INSERT INTO [CareerApplications] ([Id], [Name], [Email], [Mobile], [Address], [Position], [Message], [ResumeName], [ResumeSize], [CreatedAt]) VALUES (3, N'kiran', N'kiran.efficacious@gmail.com', N'+919820943806', N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6', N'Sales & Business Development', N'Hello, Test Mail Message', N'Fake-Resume.pdf', N'243.2 KB', N'2026-10-30 12:33:27.184669');
GO
SET IDENTITY_INSERT [CareerApplications] OFF;
GO

-- ------------------------------------------------------------
-- Table: [WebsiteContents]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[WebsiteContents]', N'U') IS NULL
BEGIN
    CREATE TABLE [WebsiteContents] (
    [Key] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [DataJson] NVARCHAR(MAX) NOT NULL,
    [UpdatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'about', N'{"data":{"hero":{"title":"About Us","image":"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000","subtitle":"Efficacious is synonymous with Efficiency. Providing innovative & efficient solutions to make life Safe, Secure & Easy."},"vision":{"points":["Global Reach","Technological Innovation","User-Centric Design"],"title":"Our Vision","content":"To be the global leader in providing innovative and efficient ERP solutions that set new standards in user experience and operational excellence."},"mission":{"points":["Child Security First","Operational Efficiency","Scalable Solutions"],"content":"Our mission is to make life Safe, Secure & Easy through technology. We strive to empower educational institutions and businesses with tools that simplify complexity.","title":"Our Mission"},"whoWeAre":{"image":"https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800","yearsExperience":"10+","title":"Who We Are","content":["Incorporated in 2012 by Mr. Kamal Agrawal, a core finance professional, we started with a vision to create innovative IT solutions for selective target segments.","While we began with IT outsourcing, today Efficacious focuses on creating complete ERP solutions for schools and education institutes. Our mission is to revolutionize school operations with Child Security as the prime focus.","We are a team of dedicated professionals committed to delivering high-quality, scalable, and secure software solutions that empower businesses and institutions to thrive in the digital age."]},"values":[{"id":1,"title":"Innovation","description":"Constantly pushing boundaries to create better solutions."},{"title":"Integrity","id":2,"description":"Building trust through transparency and ethical practices."},{"title":"Excellence","id":3,"description":"Striving for the highest quality in everything we do."},{"id":4,"description":"Ensuring the safety and privacy of data for all users.","title":"Security"}]}}', N'2026-10-30T11:02:20.919Z');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'blogs', N'{"data":[]}', N'2026-11-02 05:38:30.06875');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'careers', N'{"data":[{"criteria":["3 to 4 years of ERP Sales Experience","MBA (Marketing)"],"title":"Sales & Business Development","department":"Software / IT Solutions","id":1,"type":"Full Time","description":"<div><b>About the Role:</b></div><div>We are looking for a dynamic, result-oriented, and self-motivated Business Development Executive to drive sales and acquire new clients for our software products and IT solutions.</div><div>Our product portfolio includes E-Smart School Management Software, E-Smart Health Management Software, E-Smart Queue Management System, and E-Smart Restaurant Management Software, along with their respective mobile applications.</div><div>The candidate will be responsible for identifying potential customers, generating business leads, conducting product demonstrations, building client relationships, and converting prospects into long-term customers.</div><div><br></div><div><b>Key Responsibilities:</b></div><ul><li><i>Identify and generate new business opportunities across relevant industries.</i></li><li><i>Research and approach potential clients, including schools, colleges, hospitals, clinics, restaurants, and other businesses.</i></li><li><i>Generate leads through cold calling, email marketing, LinkedIn, networking, referrals, and other channels.</i></li><li><i>Understand client requirements and recommend suitable software solutions.</i></li><li><i>Schedule and conduct product demonstrations and presentations for prospective clients.</i></li><li><i>Develop and maintain strong relationships with prospective and existing customers.</i></li><li><i>Prepare sales proposals, quotations, and presentations in coordination with the concerned team.</i></li><li><i>Follow up with potential clients, negotiate commercial terms, and close sales deals.</i></li><li><i>Maintain an updated database of leads, prospects, meetings, and sales activities in the CRM or reporting system.</i></li><li><i>Achieve monthly and quarterly lead generation, client acquisition, and revenue targets.</i></li><li><i>Coordinate with the technical and implementation teams to ensure a smooth customer onboarding process.</i></li><li><i>Monitor market trends, competitor offerings, and customer feedback to identify new business opportunities.</i><br><br></li></ul><div><b>Required Skills and Qualifications:</b></div><ul><li><i>Bachelor''s degree in Business Administration, Marketing, Sales, IT, or a related field.</i></li><li><i>1–3 years of experience in business development, B2B sales, or IT/software sales is preferred.</i></li><li><i>Excellent verbal and written communication skills.</i></li><li><i>Strong negotiation, presentation, and convincing skills.</i></li><li><i>Experience in lead generation, prospecting, and client acquisition.</i></li><li><i>Basic understanding of software products, web applications, and mobile applications.</i></li><li><i>Ability to understand customer requirements and present suitable solutions.</i></li><li><i>Good relationship-building and follow-up skills.</i></li><li><i>Ability to work independently and achieve sales targets.</i></li><li><i>Proficiency in MS Office, email communication, and online business tools.</i><br><br></li></ul><div><b>Preferred Qualifications:</b></div><ul><li><i>Experience selling software products, SaaS solutions, or IT services.</i></li><li><i>Experience in selling software to educational institutions, healthcare organizations, restaurants, or other businesses.</i></li><li><i>Familiarity with CRM tools, LinkedIn prospecting, and digital lead-generation techniques.</i></li><li><i>A proven track record of acquiring new clients and closing B2B sales</i>.<br><br></li></ul><div>Key Performance Indicators (KPIs)<br><br></div><div><b>Performance will be evaluated based on:</b></div><ul><li><i>Number of qualified leads generated.</i></li><li><i>Number of client meetings and product demonstrations conducted.</i></li><li><i>Number of new clients acquired.</i></li><li><i>Conversion rate from leads to paying customers.</i></li><li><i>Monthly and quarterly sales revenue achieved.</i></li><li><i>Quality of client relationships and follow-up activities.</i><br><br></li></ul><div><b>Ideal Candidate:</b></div><div>The ideal candidate should be proactive, confident, persuasive, and passionate about sales. They should have a strong business mindset, the ability to communicate with decision-makers, and the motivation to generate new business opportunities for our software products.<br><br></div><b>Work Location: </b>In person","experience":"1–3 Years (Preferred)","location":"Mumbai (On-site)"},{"description":"<div><b>Job Description:</b></div><div>We are looking for a detail-oriented and organized Back Office Executive to handle day-to-day administrative work, data entry, documentation, and basic accounting-related activities. Candidates with knowledge of Tally and basic accounting will be preferred.<br><br></div><div><b>Key Responsibilities:</b></div><ul><li><i>Perform daily data entry and maintain accurate records.</i></li><li><i>Handle invoices, bills, vouchers, and other business documents.</i></li><li><i>Maintain and update Excel sheets, reports, and databases.</i></li><li><i>Assist with basic accounting and financial record-keeping.</i></li><li><i>Manage filing, documentation, and office administration.</i></li><li><i>Coordinate with internal departments for routine office tasks.</i></li><li><i>Maintain records of sales, purchases, payments, and receipts</i>.<br><br></li></ul><div><b>Required Skills:</b></div><ul><li><i>Basic computer knowledge, including MS Excel and MS Word.</i></li><li><i>Good typing speed and attention to detail.</i></li><li><i>Good communication and organizational skills.</i></li><li><i>Ability to maintain records accurately and meet deadlines.</i></li><li><i>Knowledge of Tally is an added advantage.</i></li><li><i>Basic accounting knowledge will be preferred.<br><br></i></li></ul><div><b>Eligibility</b></div><ul><li><i>Freshers and experienced candidates can apply.</i></li><li><i>Candidates with Tally knowledge and accounting experience will be given preference.<br><br></i></li></ul><div><b>Education:</b></div><ul><li><i>Bachelor''s (Preferred)<br></i></li></ul>","department":" Fresher / Experienced","location":"Navi Mumbai (On-site)","id":1793186718674,"experience":"1–3 Years (Preferred)","criteria":["Work Location: In person"],"title":"Administration / Back Office","type":"Full Time"}]}', N'2026-10-30T11:02:20.919Z');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'contact', N'{"data":{"socials":{"instagram":"https://www.instagram.com/esmart_efficacious","twitter":"","linkedin":"https://www.linkedin.com/in/efficacious-india-limited-9aaa87287/","facebook":"https://www.facebook.com/efficacioustech"},"email":"info@efficacious.co.in","office":"Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6, Sector-1, New Panvel, Raigad, Maharashtra - 410206.","website":"https://efficacious.co.in","phone":"+91 8454943806"}}', N'2026-10-30T11:02:20.919Z');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'gallery', N'{"data":[{"id":1,"caption":"Main Office","category":"Workspace","isActive":true,"url":"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format\u0026fit=crop\u0026q=80\u0026w=1200"},{"url":"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format\u0026fit=crop\u0026q=80\u0026w=1200","caption":"Conference Room","category":"Meetings","isActive":true,"id":2},{"caption":"Collaborative Space","url":"/images/gallery/collaboration.png","id":3,"category":"Innovation","isActive":true},{"url":"/images/gallery/workspace.png","category":"Technology","isActive":true,"caption":"Developer HQ","id":4},{"caption":"Creative Breakout","id":5,"isActive":true,"category":"Culture","url":"/images/gallery/breakarea.png"}]}', N'2026-10-30 12:32:52.97553');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'gallerySettings', N'{"data":{"enabled":false}}', N'2026-10-30 12:24:26.131566');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'news', N'{"data":[]}', N'2026-11-02 05:39:00.632463');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'partners', N'{"data":{"heroSlides":[{"id":1,"overlayColor":"from-blue-900/80 to-slate-900/80","image":"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1920","title":"Our Channel Partners","subtitle":"Expanding our reach through trusted partnerships across India."},{"subtitle":"Building a robust network to deliver excellence in every region.","image":"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920","title":"Stronger Together","overlayColor":"from-purple-900/80 to-slate-900/80","id":2},{"title":"Local Expertise","subtitle":"Connect with our regional representatives for personalized support.","id":3,"overlayColor":"from-emerald-900/80 to-slate-900/80","image":"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920"}],"items":[{"color":"blue","phone":"+91 9030578051 / 8592280673","address":"G2, Balaji Sai Villa, Hare Ram Bazar, Lawyer Pet, Ongole – 523002. Andhra Pradesh","region":"South India","email":"anil.kumar@efficacious.co.in","name":"Anil Kumar Yeluri"},{"name":"Sandip Agarwal","email":"sandip_agarwal@efficacious.co.in","color":"purple","phone":"+91 9831919333","address":"183, Bangar Avenue, Block A, 3rd Floor, Kolkata 700055. West Bengal","region":"North East India"},{"color":"emerald","phone":"+91 9836589523","region":"North East India","name":"Info Vision (Pradip Bhattacharjee)","email":"pradipl@efficacious.co.in","address":"GE 51, Raj Danga main road kolkata, 700107"}]}}', N'2026-10-30T11:02:20.919Z');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'portfolio', N'{"data":[]}', N'2026-11-02 05:38:40.819299');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'products', N'{"data":[{"id":1,"title":"eSmart School","enabled":true,"comingSoon":false,"href":"/products/esmart-school","newTab":true,"iconName":"GraduationCap","appStoreLink":"https://apps.apple.com/in/app/e-smart-school/id6448924052","playStoreLink":"https://play.google.com/store/apps/details?id=net.esmarts.app.esmart\u0026hl=en_IN","gradient":"from-blue-400 via-indigo-500 to-purple-600","bgAccent":"bg-blue-500/10","textAccent":"text-blue-600 dark:text-blue-400","description":"A complete ERP solution for schools \u0026 educational institutes.","heroTitle":"Smart Management for Modern Schools","heroSubtitle":"A complete ecosystem that connects parents, teachers, and students. Streamline operations while keeping child security as the prime focus.","features":[{"description":"A comprehensive view for parents, teachers, and admins. Get real-time updates on attendance, circulars, and academic progress at a glance.","details":["Real-time Notifications","Daily Event Summary","Quick Action Shortcuts"],"color":"bg-blue-500","iconName":"Monitor","id":10,"textAccent":"text-blue-600","title":"Centralized Dashboard"},{"id":11,"color":"bg-green-500","description":"Say goodbye to manual registers. Teachers can mark attendance via the app, triggering instant notifications to parents for absentees.","iconName":"Calendar","details":["Instant Parent Alerts","Monthly Reports","Leave Management"],"title":"Smart Attendance","textAccent":"text-green-600"},{"details":["Secure Gateway","Auto-Receipt Generation","Due Date Reminders"],"textAccent":"text-orange-600","title":"Fee Management","iconName":"CreditCard","id":12,"description":"Automated fee reminders and secure online payment gateway. Parents can view invoices, pay fees, and download receipts instantly.","color":"bg-orange-500"},{"description":"Easy creation and submission of assignments. Teachers can post homework, study materials, and assignments directly, and students can submit their work online.","details":["Digital Homework Submissions","Attachment Uploads (PDFs/Images)","Teacher Grading \u0026 Feedback"],"textAccent":"text-purple-600","iconName":"BookOpen","color":"bg-purple-500","id":13,"title":"Homework \u0026 Assignments"},{"description":"Detailed performance reports and analytics. Visualize student progress over time with graphical representations of grades.","details":["Performance Graphs","Term-wise Comparison","Downloadable Report Cards"],"textAccent":"text-red-600","iconName":"BarChart3","title":"Result \u0026 Analysis","id":14,"color":"bg-red-500"}],"modules":[{"iconName":"Users","title":"Admission Management"},{"title":"Library Management","iconName":"Library"},{"iconName":"Users","title":"HR \u0026 Payroll"},{"title":"Inventory","iconName":"FileText"},{"iconName":"BookOpen","title":"Homework \u0026 Assignments"},{"iconName":"Bell","title":"Communication Center"}],"stats":[{"label":"Schools Onboarded","value":"500\u002B"},{"value":"1M\u002B","label":"Parents Connected"},{"label":"Uptime Guaranteed","value":"99.9%"}]},{"id":2,"title":"eSmart Health","enabled":true,"comingSoon":false,"href":"https://www.e-smarthealth.co.in/","newTab":true,"iconName":"Activity","appStoreLink":"https://apps.apple.com/in/app/e-smart-health/id6756566627","playStoreLink":"https://play.google.com/store/apps/details?id=com.efficacious.esmarthealth\u0026hl=en","gradient":"from-emerald-400 via-teal-500 to-cyan-600","bgAccent":"bg-emerald-500/10","textAccent":"text-emerald-600 dark:text-emerald-400","description":"Your secure personal health manager. Store medical records, track prescriptions, and find trusted healthcare providers nearby.","features":[{"color":"bg-emerald-500","iconName":"FolderHeart","id":3,"description":"Securely store, organize, and manage medical records\u2014including lab reports, vaccination certificates, prescriptions, and hospital visits\u2014in one safe, unified digital vault.","title":"Your Health Manager","textAccent":"text-emerald-600","details":["Secure PDF/Image Uploads","Categorized Diagnostic Reports","Digital Prescriptions Log"]},{"textAccent":"text-teal-600","color":"bg-teal-500","description":"Track doctor visits, follow complex prescription schedules, set timely medication pill reminders, and manage overall wellness for your family.","id":40,"iconName":"Clock","title":"Manage Health \u0026 Prescriptions","details":["Smart Pill Reminders","Doctor Visit Schedules","Adherence Tracking"]}],"modules":[{"title":"Health Records","iconName":"FolderHeart"},{"iconName":"Bell","title":"Pill Reminders"},{"iconName":"Search","title":"Care Search"}],"stats":[{"value":"100%","label":"Secure Storage"},{"label":"Specialties Covered","value":"10\u002B"},{"label":"Health Records Access","value":"24/7"}]},{"id":3,"title":"eSmart Restaurant","enabled":true,"comingSoon":false,"href":"/products/esmart-restaurant","newTab":true,"iconName":"Utensils","appStoreLink":"https://apps.apple.com/co/app/e-smart-restaurant/id6762969059?l=en-GB","playStoreLink":"https://play.google.com/store/apps/details?id=com.efficacious.new_esmartrestaurant","gradient":"from-rose-400 via-pink-500 to-orange-600","bgAccent":"bg-rose-500/10","textAccent":"text-rose-600 dark:text-rose-400","description":"Digitize your restaurant operations from kitchen to customer. Enhance service speed, reduce wastage, and increase profitability.","features":[{"textAccent":"text-rose-600","title":"Digital Menu \u0026 Ordering","iconName":"QrCode","description":"Provide a seamless contactless experience. Customers can scan QR codes to view vivid menus and place orders directly.","details":["Contactless Ordering","Dynamic Menu Updates","Upselling Prompts"],"id":40,"color":"bg-rose-500"},{"color":"bg-orange-500","iconName":"Monitor","textAccent":"text-orange-600","title":"Kitchen Display System","description":"Streamline your kitchen operations. Replace noisy printers with smart screens that route orders to specific stations.","details":["Station-wise Routing","Color-coded Status","Prep Time Tracking"],"id":41}],"modules":[{"iconName":"Layers","title":"Table Reservation"},{"title":"Waitlist Management","iconName":"Coffee"},{"title":"Billing \u0026 POS","iconName":"CreditCard"}],"stats":[{"label":"Table Turnover","value":"\u002B30%"},{"value":"15%","label":"Food Cost Reduction"},{"label":"Order Errors","value":"0%"}]},{"id":4,"title":"eSmart Queue","enabled":true,"comingSoon":false,"href":"/products/esmart-queue","newTab":true,"iconName":"Timer","appStoreLink":"https://apps.apple.com/ph/app/e-smart-queue/id6784201811","playStoreLink":"https://play.google.com/store/apps/details?id=com.efficacious.esmartqueue","gradient":"from-violet-400 via-fuchsia-500 to-pink-600","bgAccent":"bg-violet-500/10","textAccent":"text-violet-600 dark:text-violet-400","description":"Eliminate physical queues with smart slot booking and QR-based entry for banks, hospitals, post offices, temples, and more.","heroTitle":"End Queues. Start Living.","heroSubtitle":"A next-generation slot-booking platform that connects citizens to any service provider, replacing waiting lines with mobile bookings and contactless QR-code entry.","features":[{"iconName":"Calendar","id":50,"color":"bg-violet-600","textAccent":"text-violet-600","description":"End users select date, time, and service provider from the mobile app. Instant availability check and confirmation in under 60 seconds.","title":"Smart Slot Booking","details":["Date \u0026 Time Selection","Real-time Availability","Instant Confirmation"]},{"iconName":"QrCode","title":"QR Code Entry Pass","textAccent":"text-indigo-600","details":["Encrypted QR Generation","Tap-to-Show on Mobile","Contactless Entry"],"description":"A unique encrypted QR code is generated on slot confirmation. Users present it at the entry scanner for contactless, queue-free access.","id":51,"color":"bg-indigo-600"}],"modules":[{"iconName":"Smartphone","title":"User Mobile App"},{"iconName":"BarChart3","title":"Admin Dashboard"},{"title":"QR Scanner Portal","iconName":"QrCode"},{"iconName":"Bell","title":"Push Notifications"},{"iconName":"TrendingUp","title":"Analytics"},{"iconName":"Building2","title":"Multi-branch"}],"stats":[{"value":"70%","label":"Wait Time Reduction"},{"value":"50\u002B","label":"Service Categories"},{"value":"Zero","label":"Physical Queues"}]}]}', N'2026-10-30 12:20:53.260448');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'services', N'{"data":[{"color":"blue","href":"/services/web-development","description":"We don''t just build websites; we create digital experiences.","deliverables":["Custom UI/UX Architecture","SEO & Performance Optimization","React/Next.js Development","CMS Integration"],"iconName":"Layout","title":"Web Design & Development","id":1},{"id":2,"description":"Reach your customers wherever they are.","color":"indigo","href":"/services/mobile-development","iconName":"Smartphone","deliverables":["iOS & Android Native Apps","Flutter/React Native Solutions","App Store Optimization","Maintenance & Support"],"title":"Mobile App Development"}]}', N'2026-10-30T11:02:20.919Z');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'team', N'{"data":[{"description":"Visionary leader and core finance professional with a passion for innovative IT solutions.","image":"https://res.cloudinary.com/davnxvrps/image/upload/v1790856572/Gemini_Generated_Image_hfyepthfyepthfye_tk2m7v.png","role":"Founder & CEO","name":"Kamal Agrawal","id":1},{"id":2,"name":"Kiran Kshirsagar","image":"https://res.cloudinary.com/davnxvrps/image/upload/v1776078685/1000266858_bldqrs.jpg","description":"Expert in building robust, high-performance cross-platform mobile experiences with smooth animations.","role":"Senior Flutter Android + iOS App Developer"},{"name":"Pranav Patil","role":"Sr. Software Developer","id":3,"linkedin":"","image":"https://res.cloudinary.com/davnxvrps/image/upload/v1793161324/1000363676_l7khxr.jpg","description":"Specializes in highly scalable backend architectures, database optimization, and secure integrations."},{"name":"Rahul Chauhan","role":"Sr. .Net Developer","description":"Passionate about clean code, high-performance web services, and robust cloud infrastructure.","id":4,"linkedin":"","image":"https://res.cloudinary.com/davnxvrps/image/upload/v1793161324/1000363672_c3gpyh.jpg"},{"description":"A dedicated technology professional with experience in software testing, quality assurance, and application development. ","image":"https://res.cloudinary.com/davnxvrps/image/upload/v1793161711/Professional_Indian_Portrait_Headshot_whhzul.png","id":1790856305336,"linkedin":"","name":"Ayush Garg","role":"Software Tester"}]}', N'2026-10-30T11:02:20.919Z');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'testimonials', N'{"data": [{"id": 1, "name": "Rajesh Gupta", "role": "Principal", "company": "St. Xavier''s International School", "text": "Efficacious transformed how we manage our school. The parent communication module and real-time attendance alone have saved us countless administrative hours.", "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", "rating": 5}, {"id": 2, "name": "Dr. Anjali Desai", "role": "Medical Director", "company": "City Care Super-Specialty Hospital", "text": "The eSmart Health system is intuitive and robust. It seamlessly scaled as our patient flow doubled. Billing, appointments, and medical records are all unified.", "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400", "rating": 5}, {"id": 3, "name": "Vikram Malhotra", "role": "Managing Director", "company": "Urban Spice Hospitality Group", "text": "eSmart Restaurant streamlined our kitchen operations and table billing. Order turnaround time reduced by 35% and customer satisfaction is at an all-time high.", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", "rating": 5}, {"id": 4, "name": "Pooja Sharma", "role": "Chief Operating Officer", "company": "Apex Citizen Services & Banking", "text": "eSmart Queue replaced chaotic physical waiting lines with smart mobile slot bookings and contactless QR entry. Our branches are calmer and far more productive.", "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", "rating": 5}]}', N'2026-10-30T13:02:05.458592+00:00');
INSERT INTO [WebsiteContents] ([Key], [DataJson], [UpdatedAt]) VALUES (N'clients', N'{"data": [{"id": 1, "name": "St. Xavier''s School", "category": "Education", "logo": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=300"}, {"id": 2, "name": "City Care Hospital", "category": "Healthcare", "logo": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300"}, {"id": 3, "name": "EuroSchool International", "category": "Education", "logo": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=300"}, {"id": 4, "name": "Urban Spice Group", "category": "Hospitality", "logo": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=300"}, {"id": 5, "name": "Apex Financial", "category": "Banking & Public Sector", "logo": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"}, {"id": 6, "name": "Apollo Healthcare Network", "category": "Healthcare", "logo": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300"}]}', N'2026-10-30T13:02:05.458610+00:00');

-- ------------------------------------------------------------
-- Table: [ChatSessions]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[ChatSessions]', N'U') IS NULL
BEGIN
    CREATE TABLE [ChatSessions] (
    [Id] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [CustomerName] NVARCHAR(MAX) NULL,
    [Email] NVARCHAR(MAX) NULL,
    [Mobile] NVARCHAR(MAX) NULL,
    [Status] NVARCHAR(MAX) NULL,
    [LastMessage] NVARCHAR(MAX) NULL,
    [LastMessageTime] NVARCHAR(MAX) NULL,
    [MessagesJson] NVARCHAR(MAX) NULL,
    [AdminJoined] INT NULL,
    [UnreadAdmin] INT NULL,
    [UnreadUser] INT NULL
    );
END
GO

INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1776159957795', N'binod', N'', N'', N'active', N'We''re very proud of the E smart health project! It was a healthcare implementation where dclksncvlk lfdkflksdf ndslkf dlfk dsfnklsn fslkdfnlksdfnsd lkfndkl Key results: 5000+ students participant | 30+ colleges involve. Are you looking for a similar solution?', N'2026-04-14T09:58:46.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1776256965342', N'Anonymous Visitor', N'', N'', N'active', N'Our human agent has been notified and will jump into this chat with you shortly! Thank you for your patience.', N'2026-04-15T12:43:54.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1776257377897', N'Anonymous Visitor', N'', N'', N'active', N'We''re very proud of the E smart health project! It was a healthcare implementation where dclksncvlk lfdkflksdf ndslkf dlfk dsfnklsn fslkdfnlksdfnsd lkfndkl Key results: 5000+ students participant | 30+ colleges involve. Are you looking for a similar solution?', N'2026-04-15T12:49:39.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1776315557494', N'Anonymous Visitor', N'', N'', N'active', N'lvkbn ck', N'2026-04-16T05:07:07.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1776675406198', N'Anonymous Visitor', N'', N'', N'active', N'Our human agent has been notified and will jump into this chat with you shortly! Thank you for your patience.', N'2026-04-20T08:57:13.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1778148716443', N'Anonymous Visitor', N'', N'', N'active', N'Our human agent has been notified and will jump into this chat with you shortly! Thank you for your patience.', N'2026-05-07T10:12:29.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1782454817480', N'Anonymous Visitor', N'', N'', N'active', N'Our fantastic team is made up of expert Developers (handling Flutter, .NET, iOS/Android), creative UI/UX specialists, and dedicated project managers. We work together to ensure smooth digital transformations for our clients! What kind of technical expertise are you looking for?', N'2026-06-26T06:21:39.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1783918765802', N'Anonymous Visitor', N'', N'', N'active', N'Hi there! 👋 It''s great to meet you. How is your day going? How can I help you today?', N'2026-07-13T04:59:27.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1784186702661', N'Anonymous Visitor', N'', N'', N'active', N'Hi there! 👋 It''s great to meet you. How is your day going? How can I help you today?', N'2026-07-16T07:25:04.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1790659535347', N'Anonymous Visitor', N'', N'', N'active', N'Our fantastic team is made up of expert Developers (handling Flutter, .NET, iOS/Android), creative UI/UX specialists, and dedicated project managers. We work together to ensure smooth digital transformations for our clients! What kind of technical expertise are you looking for?', N'2026-09-29T05:26:03.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1793268126224', N'Anonymous Visitor', N'', N'', N'active', N'Our human agent has been notified and will jump into this chat with you shortly! Thank you for your patience.', N'2026-10-29T10:02:46.000Z', N'[]', 0, 0, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1793365339105', N'waht services provided you ?', N'info@efficacious.co.in', N'', N'active', N'give me a contact info', N'2026-10-30T13:03:11.7040510Z', N'[{"id":"f2469e6ad2b14a539a856792bdd1b815","text":"hii","sender":"user","timestamp":"2026-10-30T13:02:19.1238510Z"},{"id":"e8d5bdf7a34743efa29dff638394e84b","text":"Thank you for reaching out! A specialist will assist you. Would you like to connect with our live team?","sender":"bot","timestamp":"2026-10-30T13:02:20.3136690Z"},{"id":"8d3c3d9e5884448b9592ec4d12ff543e","text":"waht services provided you ?","sender":"user","timestamp":"2026-10-30T13:02:37.6952810Z"},{"id":"13356bf2216e4383aef1c2febbe7aeb5","text":"Nice to meet you, waht services provided you ?! Please share your Email or Mobile Number so our team can reach you.","sender":"bot","timestamp":"2026-10-30T13:02:38.4924740Z"},{"id":"8bf944c8b6824f9c83ef9c6b72bc2295","text":"info@efficacious.co.in","sender":"user","timestamp":"2026-10-30T13:02:53.1246180Z"},{"id":"1e8a3faf39644df6817840cd9a7ba6a2","text":"Thank you waht services provided you ?. Your chat has been routed to our team. An agent will respond shortly!","sender":"bot","timestamp":"2026-10-30T13:02:54.3249660Z"},{"id":"bbc8a98d448147fc9885a81332136bc1","text":"give me a contact info","sender":"user","timestamp":"2026-10-30T13:03:11.7040510Z"}]', 0, 4, 0);
INSERT INTO [ChatSessions] ([Id], [CustomerName], [Email], [Mobile], [Status], [LastMessage], [LastMessageTime], [MessagesJson], [AdminJoined], [UnreadAdmin], [UnreadUser]) VALUES (N'1793597579056', N'what are you doing?', N'please help me', N'', N'active', N'hii', N'2026-11-02T05:33:45.3780250Z', N'[{"id":"88b66354e380462f8ed1741964a18a58","text":"hii","sender":"user","timestamp":"2026-11-02T05:32:59.0829210Z"},{"id":"a8603fb2752345c988de15a15f2599eb","text":"Thank you for reaching out! A specialist will assist you. Would you like to connect with our live team?","sender":"bot","timestamp":"2026-11-02T05:33:00.2752280Z"},{"id":"55d52abf3b8940c89ad8a08a63b7055c","text":"what are you doing?","sender":"user","timestamp":"2026-11-02T05:33:08.3177460Z"},{"id":"2c6eecb1ef444401b6c58fc6cf41e106","text":"Nice to meet you, what are you doing?! Please share your Email or Mobile Number so our team can reach you.","sender":"bot","timestamp":"2026-11-02T05:33:09.1133750Z"},{"id":"d15021079beb4808b4570a6244ff5d05","text":"please help me","sender":"user","timestamp":"2026-11-02T05:33:16.1972130Z"},{"id":"ad84cd7c811645959c190089cc013b18","text":"Thank you what are you doing?. Your chat has been routed to our team. An agent will respond shortly!","sender":"bot","timestamp":"2026-11-02T05:33:17.3932410Z"},{"id":"bcd2e4928a7f4760af0d536b6f245cf2","text":"give me a our service ?","sender":"user","timestamp":"2026-11-02T05:33:36.2869760Z"},{"id":"14c4e26fadb0429688ccff11204abee4","text":"hii","sender":"user","timestamp":"2026-11-02T05:33:45.3780250Z"}]', 0, 5, 0);

-- ------------------------------------------------------------
-- Table: [ChatbotQas]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[ChatbotQas]', N'U') IS NULL
BEGIN
    CREATE TABLE [ChatbotQas] (
    [Id] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [QuestionKeywords] NVARCHAR(MAX) NOT NULL,
    [AnswerText] NVARCHAR(MAX) NOT NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

INSERT INTO [ChatbotQas] ([Id], [QuestionKeywords], [AnswerText], [CreatedAt]) VALUES (N'qa_001', N'pricing, cost, fee, charges, quote', N'Our pricing depends on the selected ERP modules and scale of your institution. Please submit an inquiry or call +91-22-2580-2222 for a customized proposal.', N'2026-10-30 11:42:19');
INSERT INTO [ChatbotQas] ([Id], [QuestionKeywords], [AnswerText], [CreatedAt]) VALUES (N'qa_002', N'demo, presentation, showcase, schedule', N'We would love to provide you with a live interactive product demo! Please submit a demo request or let us know your preferred date and time.', N'2026-10-30 11:42:19');
INSERT INTO [ChatbotQas] ([Id], [QuestionKeywords], [AnswerText], [CreatedAt]) VALUES (N'qa_003', N'support, help, contact, phone, email, office', N'You can reach our support team at info@efficacious.co.in or call our Mumbai headquarters directly at +91-22-2580-2222.', N'2026-10-30 11:42:19');

-- ------------------------------------------------------------
-- Table: [Blogs]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Blogs]', N'U') IS NULL
BEGIN
    CREATE TABLE [Blogs] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Excerpt] NVARCHAR(MAX) NULL,
    [Category] NVARCHAR(MAX) NULL,
    [Author] NVARCHAR(MAX) NULL,
    [AuthorRole] NVARCHAR(MAX) NULL,
    [Date] NVARCHAR(MAX) NULL,
    [ReadTime] NVARCHAR(MAX) NULL,
    [Image] NVARCHAR(MAX) NULL,
    [Color] NVARCHAR(MAX) NULL,
    [TagsJson] NVARCHAR(MAX) NULL,
    [ContentJson] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Blogs] ON;
GO
INSERT INTO [Blogs] ([Id], [Title], [Excerpt], [Category], [Author], [AuthorRole], [Date], [ReadTime], [Image], [Color], [TagsJson], [ContentJson], [CreatedAt]) VALUES (1, N'5 Ways to Secure Your School Data', N'In the digital age, securing student data is paramount. Learn how to protect your institution''s most sensitive information from threats.', N'Security', N'Kamal Agrawal', N'Founder & CEO', N'Mar 15, 2024', N'5 min read', N'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200', N'blue', N'["Cybersecurity","ERP","Data Privacy"]', N'[{"heading":"Why School Data Security Matters","body":"Educational institutions handle a goldmine of sensitive data..."}]', N'2026-10-30T11:51:52.149Z');
INSERT INTO [Blogs] ([Id], [Title], [Excerpt], [Category], [Author], [AuthorRole], [Date], [ReadTime], [Image], [Color], [TagsJson], [ContentJson], [CreatedAt]) VALUES (2, N'The Future of AI in Education', N'Discover how AI-driven analytics are transforming the way schools operate, predict student outcomes, and personalize learning at scale.', N'EdTech', N'Kiran Kshirsagar', N'Sr. Flutter Developer', N'Apr 02, 2024', N'7 min read', N'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200', N'violet', N'["AI","Machine Learning","EdTech"]', N'[{"heading":"Redefining the Classroom","body":"The global EdTech market is projected to surpass $400 billion by 2028..."}]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Blogs] ([Id], [Title], [Excerpt], [Category], [Author], [AuthorRole], [Date], [ReadTime], [Image], [Color], [TagsJson], [ContentJson], [CreatedAt]) VALUES (3, N'How eSmart Health Cuts Hospital Wait Times', N'A deep dive into how OPD queue management, automated billing, and EMR integration cut patient wait times by 40% at top multi-specialty hospitals.', N'Healthcare', N'Dr. Anjali Desai', N'Medical Director & Advisor', N'Apr 18, 2024', N'6 min read', N'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200', N'emerald', N'["Healthcare IT","Hospital ERP","Patient Flow"]', N'[{"heading":"The OPD Bottleneck","body":"Long queues at reception and registration desks..."}]', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [Blogs] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Careers]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Careers]', N'U') IS NULL
BEGIN
    CREATE TABLE [Careers] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Department] NVARCHAR(MAX) NULL,
    [Type] NVARCHAR(MAX) NULL,
    [Experience] NVARCHAR(MAX) NULL,
    [Location] NVARCHAR(MAX) NULL,
    [Description] NVARCHAR(MAX) NULL,
    [CriteriaJson] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Careers] ON;
GO
INSERT INTO [Careers] ([Id], [Title], [Department], [Type], [Experience], [Location], [Description], [CriteriaJson], [CreatedAt]) VALUES (1, N'Sales & Business Development', N'Software / IT Solutions', N'Full Time', N'1–3 Years (Preferred)', N'Mumbai (On-site)', N'<div><b>About the Role:</b></div><div>We are looking for a dynamic, result-oriented, and self-motivated Business Development Executive to drive sales and acquire new clients for our software products and IT solutions.</div><div>Our product portfolio includes E-Smart School Management Software, E-Smart Health Management Software, E-Smart Queue Management System, and E-Smart Restaurant Management Software, along with their respective mobile applications.</div><div>The candidate will be responsible for identifying potential customers, generating business leads, conducting product demonstrations, building client relationships, and converting prospects into long-term customers.</div><div><br></div><div><b>Key Responsibilities:</b></div><ul><li><i>Identify and generate new business opportunities across relevant industries.</i></li><li><i>Research and approach potential clients, including schools, colleges, hospitals, clinics, restaurants, and other businesses.</i></li><li><i>Generate leads through cold calling, email marketing, LinkedIn, networking, referrals, and other channels.</i></li><li><i>Understand client requirements and recommend suitable software solutions.</i></li><li><i>Schedule and conduct product demonstrations and presentations for prospective clients.</i></li><li><i>Develop and maintain strong relationships with prospective and existing customers.</i></li><li><i>Prepare sales proposals, quotations, and presentations in coordination with the concerned team.</i></li><li><i>Follow up with potential clients, negotiate commercial terms, and close sales deals.</i></li><li><i>Maintain an updated database of leads, prospects, meetings, and sales activities in the CRM or reporting system.</i></li><li><i>Achieve monthly and quarterly lead generation, client acquisition, and revenue targets.</i></li><li><i>Coordinate with the technical and implementation teams to ensure a smooth customer onboarding process.</i></li><li><i>Monitor market trends, competitor offerings, and customer feedback to identify new business opportunities.</i><br><br></li></ul><div><b>Required Skills and Qualifications:</b></div><ul><li><i>Bachelor''s degree in Business Administration, Marketing, Sales, IT, or a related field.</i></li><li><i>1–3 years of experience in business development, B2B sales, or IT/software sales is preferred.</i></li><li><i>Excellent verbal and written communication skills.</i></li><li><i>Strong negotiation, presentation, and convincing skills.</i></li><li><i>Experience in lead generation, prospecting, and client acquisition.</i></li><li><i>Basic understanding of software products, web applications, and mobile applications.</i></li><li><i>Ability to understand customer requirements and present suitable solutions.</i></li><li><i>Good relationship-building and follow-up skills.</i></li><li><i>Ability to work independently and achieve sales targets.</i></li><li><i>Proficiency in MS Office, email communication, and online business tools.</i><br><br></li></ul><div><b>Preferred Qualifications:</b></div><ul><li><i>Experience selling software products, SaaS solutions, or IT services.</i></li><li><i>Experience in selling software to educational institutions, healthcare organizations, restaurants, or other businesses.</i></li><li><i>Familiarity with CRM tools, LinkedIn prospecting, and digital lead-generation techniques.</i></li><li><i>A proven track record of acquiring new clients and closing B2B sales</i>.<br><br></li></ul><div>Key Performance Indicators (KPIs)<br><br></div><div><b>Performance will be evaluated based on:</b></div><ul><li><i>Number of qualified leads generated.</i></li><li><i>Number of client meetings and product demonstrations conducted.</i></li><li><i>Number of new clients acquired.</i></li><li><i>Conversion rate from leads to paying customers.</i></li><li><i>Monthly and quarterly sales revenue achieved.</i></li><li><i>Quality of client relationships and follow-up activities.</i><br><br></li></ul><div><b>Ideal Candidate:</b></div><div>The ideal candidate should be proactive, confident, persuasive, and passionate about sales. They should have a strong business mindset, the ability to communicate with decision-makers, and the motivation to generate new business opportunities for our software products.<br><br></div><b>Work Location: </b>In person', N'["3 to 4 years of ERP Sales Experience","MBA (Marketing)"]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Careers] ([Id], [Title], [Department], [Type], [Experience], [Location], [Description], [CriteriaJson], [CreatedAt]) VALUES (2, N'Administration / Back Office', N' Fresher / Experienced', N'Full Time', N'1–3 Years (Preferred)', N'Navi Mumbai (On-site)', N'<div><b>Job Description:</b></div><div>We are looking for a detail-oriented and organized Back Office Executive to handle day-to-day administrative work, data entry, documentation, and basic accounting-related activities. Candidates with knowledge of Tally and basic accounting will be preferred.<br><br></div><div><b>Key Responsibilities:</b></div><ul><li><i>Perform daily data entry and maintain accurate records.</i></li><li><i>Handle invoices, bills, vouchers, and other business documents.</i></li><li><i>Maintain and update Excel sheets, reports, and databases.</i></li><li><i>Assist with basic accounting and financial record-keeping.</i></li><li><i>Manage filing, documentation, and office administration.</i></li><li><i>Coordinate with internal departments for routine office tasks.</i></li><li><i>Maintain records of sales, purchases, payments, and receipts</i>.<br><br></li></ul><div><b>Required Skills:</b></div><ul><li><i>Basic computer knowledge, including MS Excel and MS Word.</i></li><li><i>Good typing speed and attention to detail.</i></li><li><i>Good communication and organizational skills.</i></li><li><i>Ability to maintain records accurately and meet deadlines.</i></li><li><i>Knowledge of Tally is an added advantage.</i></li><li><i>Basic accounting knowledge will be preferred.<br><br></i></li></ul><div><b>Eligibility</b></div><ul><li><i>Freshers and experienced candidates can apply.</i></li><li><i>Candidates with Tally knowledge and accounting experience will be given preference.<br><br></i></li></ul><div><b>Education:</b></div><ul><li><i>Bachelor''s (Preferred)<br></i></li></ul>', N'["Work Location: In person"]', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [Careers] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Galleries]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Galleries]', N'U') IS NULL
BEGIN
    CREATE TABLE [Galleries] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Caption] NVARCHAR(MAX) NULL,
    [Category] NVARCHAR(MAX) NULL,
    [Url] NVARCHAR(MAX) NOT NULL,
    [IsActive] INT NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Galleries] ON;
GO
INSERT INTO [Galleries] ([Id], [Caption], [Category], [Url], [IsActive], [CreatedAt]) VALUES (1, N'Main Office', N'Workspace', N'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', 1, N'2026-10-30T11:51:52.151Z');
INSERT INTO [Galleries] ([Id], [Caption], [Category], [Url], [IsActive], [CreatedAt]) VALUES (2, N'Conference Room', N'Meetings', N'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200', 1, N'2026-10-30T11:51:52.151Z');
INSERT INTO [Galleries] ([Id], [Caption], [Category], [Url], [IsActive], [CreatedAt]) VALUES (3, N'Collaborative Space', N'Innovation', N'/images/gallery/collaboration.png', 1, N'2026-10-30T11:51:52.151Z');
INSERT INTO [Galleries] ([Id], [Caption], [Category], [Url], [IsActive], [CreatedAt]) VALUES (4, N'Developer HQ', N'Technology', N'/images/gallery/workspace.png', 1, N'2026-10-30T11:51:52.151Z');
INSERT INTO [Galleries] ([Id], [Caption], [Category], [Url], [IsActive], [CreatedAt]) VALUES (5, N'Creative Breakout', N'Culture', N'/images/gallery/breakarea.png', 1, N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [Galleries] OFF;
GO

-- ------------------------------------------------------------
-- Table: [CompanyContacts]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[CompanyContacts]', N'U') IS NULL
BEGIN
    CREATE TABLE [CompanyContacts] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Office] NVARCHAR(MAX) NULL,
    [Email] NVARCHAR(MAX) NULL,
    [Phone] NVARCHAR(MAX) NULL,
    [Website] NVARCHAR(MAX) NULL,
    [SocialsJson] NVARCHAR(MAX) NULL,
    [UpdatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [CompanyContacts] ON;
GO
INSERT INTO [CompanyContacts] ([Id], [Office], [Email], [Phone], [Website], [SocialsJson], [UpdatedAt]) VALUES (1, N'Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6, Sector-1, New Panvel, Raigad, Maharashtra - 410206.', N'info@efficacious.co.in', N'+91 8454943806', N'https://efficacious.co.in', N'{"instagram":"https://www.instagram.com/esmart_efficacious","twitter":"","linkedin":"https://www.linkedin.com/in/efficacious-india-limited-9aaa87287/","facebook":"https://www.facebook.com/efficacioustech"}', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [CompanyContacts] OFF;
GO

-- ------------------------------------------------------------
-- Table: [NewsArticles]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[NewsArticles]', N'U') IS NULL
BEGIN
    CREATE TABLE [NewsArticles] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Category] NVARCHAR(MAX) NULL,
    [Date] NVARCHAR(MAX) NULL,
    [Excerpt] NVARCHAR(MAX) NULL,
    [Image] NVARCHAR(MAX) NULL,
    [Color] NVARCHAR(MAX) NULL,
    [ContentJson] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [NewsArticles] ON;
GO
INSERT INTO [NewsArticles] ([Id], [Title], [Category], [Date], [Excerpt], [Image], [Color], [ContentJson], [CreatedAt]) VALUES (1, N'Introducing AI Analytics for eSmart School', N'Product Launch', N'March 15, 2024', N'Revolutionizing education management with predictive insights and student performance tracking powered by advanced AI algorithms.', N'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', N'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400', N'[]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [NewsArticles] ([Id], [Title], [Category], [Date], [Excerpt], [Image], [Color], [ContentJson], [CreatedAt]) VALUES (2, N'Global Education Summit 2024', N'Events', N'April 10, 2024', N'Join us at the annual summit where we showcase our latest innovations in educational technology and campus security systems.', N'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800', N'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400', N'[]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [NewsArticles] ([Id], [Title], [Category], [Date], [Excerpt], [Image], [Color], [ContentJson], [CreatedAt]) VALUES (3, N'Best Education ERP Provider 2023', N'Awards', N'February 28, 2024', N'Efficacious has been recognized as the leading ERP provider for educational institutions in the Maharashtra region.', N'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800', N'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400', N'[]', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [NewsArticles] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Partners]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Partners]', N'U') IS NULL
BEGIN
    CREATE TABLE [Partners] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Region] NVARCHAR(MAX) NULL,
    [Name] NVARCHAR(MAX) NULL,
    [Address] NVARCHAR(MAX) NULL,
    [Email] NVARCHAR(MAX) NULL,
    [Phone] NVARCHAR(MAX) NULL,
    [Color] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Partners] ON;
GO
INSERT INTO [Partners] ([Id], [Region], [Name], [Address], [Email], [Phone], [Color], [CreatedAt]) VALUES (1, N'South India', N'Anil Kumar Yeluri', N'G2, Balaji Sai Villa, Hare Ram Bazar, Lawyer Pet, Ongole – 523002. Andhra Pradesh', N'anil.kumar@efficacious.co.in', N'+91 9030578051 / 8592280673', N'blue', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Partners] ([Id], [Region], [Name], [Address], [Email], [Phone], [Color], [CreatedAt]) VALUES (2, N'North East India', N'Sandip Agarwal', N'183, Bangar Avenue, Block A, 3rd Floor, Kolkata 700055. West Bengal', N'sandip_agarwal@efficacious.co.in', N'+91 9831919333', N'purple', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Partners] ([Id], [Region], [Name], [Address], [Email], [Phone], [Color], [CreatedAt]) VALUES (3, N'North East India', N'Info Vision (Pradip Bhattacharjee)', N'GE 51, Raj Danga main road kolkata, 700107', N'pradipl@efficacious.co.in', N'+91 9836589523', N'emerald', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [Partners] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Portfolios]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Portfolios]', N'U') IS NULL
BEGIN
    CREATE TABLE [Portfolios] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Category] NVARCHAR(MAX) NULL,
    [Image] NVARCHAR(MAX) NULL,
    [Description] NVARCHAR(MAX) NULL,
    [StatsJson] NVARCHAR(MAX) NULL,
    [TagsJson] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Portfolios] ON;
GO
INSERT INTO [Portfolios] ([Id], [Title], [Category], [Image], [Description], [StatsJson], [TagsJson], [CreatedAt]) VALUES (1, N'EuroSchool ERP Implementation', N'Education', N'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000', N'A comprehensive ERP solution managing 5000+ students.', N'["5000+ Students","98% Efficiency","Paperless"]', N'["ERP","Mobile App","GPS"]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Portfolios] ([Id], [Title], [Category], [Image], [Description], [StatsJson], [TagsJson], [CreatedAt]) VALUES (2, N'Apollo City Hospital', N'Healthcare', N'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000', N'Digital transformation of a multi-specialty hospital with 200+ beds using eSmart Health.', N'["40% Wait Reduction","100% Paperless","200+ Beds"]', N'["Hospital ERP","EMR","Inventory"]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Portfolios] ([Id], [Title], [Category], [Image], [Description], [StatsJson], [TagsJson], [CreatedAt]) VALUES (3, N'Orchid Residency', N'Real Estate', N'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000', N'Smart society management for a premium gated community of 500+ apartments.', N'["500+ Apartments","Zero Unauth. Entry","100% Digital"]', N'["Society ERP","Visitor Mgmt","Billing"]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Portfolios] ([Id], [Title], [Category], [Image], [Description], [StatsJson], [TagsJson], [CreatedAt]) VALUES (4, N'SwiftLogistics Fleet', N'Logistics', N'https://images.unsplash.com/photo-1519003722824-192d99a24bb1?auto=format&fit=crop&q=80&w=1000', N'Real-time fleet tracking and fuel monitoring for a logistics fleet of 100+ heavy vehicles.', N'["100+ Trucks","20% Fuel Saved","30% Efficiency"]', N'["GPS Tracking","Fleet Mgmt","Logistics"]', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [Portfolios] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Services]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Services]', N'U') IS NULL
BEGIN
    CREATE TABLE [Services] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(MAX) NOT NULL,
    [Href] NVARCHAR(MAX) NULL,
    [Description] NVARCHAR(MAX) NULL,
    [IconName] NVARCHAR(MAX) NULL,
    [Color] NVARCHAR(MAX) NULL,
    [DeliverablesJson] NVARCHAR(MAX) NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Services] ON;
GO
INSERT INTO [Services] ([Id], [Title], [Href], [Description], [IconName], [Color], [DeliverablesJson], [CreatedAt]) VALUES (1, N'Web Design & Development', N'/services/web-development', N'We don''t just build websites; we create digital experiences.', N'Layout', N'blue', N'["Custom UI/UX Architecture","SEO & Performance Optimization","React/Next.js Development","CMS Integration"]', N'2026-10-30T11:51:52.151Z');
INSERT INTO [Services] ([Id], [Title], [Href], [Description], [IconName], [Color], [DeliverablesJson], [CreatedAt]) VALUES (2, N'Mobile App Development', N'/services/mobile-development', N'Reach your customers wherever they are.', N'Smartphone', N'indigo', N'["iOS & Android Native Apps","Flutter/React Native Solutions","App Store Optimization","Maintenance & Support"]', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [Services] OFF;
GO

-- ------------------------------------------------------------
-- Table: [TeamMembers]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[TeamMembers]', N'U') IS NULL
BEGIN
    CREATE TABLE [TeamMembers] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Role] NVARCHAR(MAX) NOT NULL,
    [Image] NVARCHAR(MAX) NULL,
    [Description] NVARCHAR(MAX) NULL,
    [OrderIndex] INT NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [TeamMembers] ON;
GO
INSERT INTO [TeamMembers] ([Id], [Name], [Role], [Image], [Description], [OrderIndex], [CreatedAt]) VALUES (1, N'Kamal Agrawal', N'Founder & CEO', N'https://res.cloudinary.com/davnxvrps/image/upload/v1790856572/Gemini_Generated_Image_hfyepthfyepthfye_tk2m7v.png', N'Visionary leader and core finance professional with a passion for innovative IT solutions.', 1, N'2026-10-30T11:51:52.151Z');
INSERT INTO [TeamMembers] ([Id], [Name], [Role], [Image], [Description], [OrderIndex], [CreatedAt]) VALUES (2, N'Kiran Kshirsagar', N'Senior Flutter Android + iOS App Developer', N'https://res.cloudinary.com/davnxvrps/image/upload/v1776078685/1000266858_bldqrs.jpg', N'Expert in building robust, high-performance cross-platform mobile experiences with smooth animations.', 2, N'2026-10-30T11:51:52.151Z');
INSERT INTO [TeamMembers] ([Id], [Name], [Role], [Image], [Description], [OrderIndex], [CreatedAt]) VALUES (3, N'Pranav Patil', N'Sr. Software Developer', N'https://res.cloudinary.com/davnxvrps/image/upload/v1793161324/1000363676_l7khxr.jpg', N'Specializes in highly scalable backend architectures, database optimization, and secure integrations.', 3, N'2026-10-30T11:51:52.151Z');
INSERT INTO [TeamMembers] ([Id], [Name], [Role], [Image], [Description], [OrderIndex], [CreatedAt]) VALUES (4, N'Rahul Chauhan', N'Sr. .Net Developer', N'https://res.cloudinary.com/davnxvrps/image/upload/v1793161324/1000363672_c3gpyh.jpg', N'Passionate about clean code, high-performance web services, and robust cloud infrastructure.', 4, N'2026-10-30T11:51:52.151Z');
INSERT INTO [TeamMembers] ([Id], [Name], [Role], [Image], [Description], [OrderIndex], [CreatedAt]) VALUES (5, N'Ayush Garg', N'Software Tester', N'https://res.cloudinary.com/davnxvrps/image/upload/v1793161711/Professional_Indian_Portrait_Headshot_whhzul.png', N'A dedicated technology professional with experience in software testing, quality assurance, and application development. ', 5, N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [TeamMembers] OFF;
GO

-- ------------------------------------------------------------
-- Table: [AboutContents]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[AboutContents]', N'U') IS NULL
BEGIN
    CREATE TABLE [AboutContents] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [HeroTitle] NVARCHAR(MAX) NULL,
    [HeroSubtitle] NVARCHAR(MAX) NULL,
    [HeroImage] NVARCHAR(MAX) NULL,
    [VisionPointsJson] NVARCHAR(MAX) NULL,
    [MissionPointsJson] NVARCHAR(MAX) NULL,
    [ValuesJson] NVARCHAR(MAX) NULL,
    [StoryHtml] NVARCHAR(MAX) NULL,
    [UpdatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [AboutContents] ON;
GO
INSERT INTO [AboutContents] ([Id], [HeroTitle], [HeroSubtitle], [HeroImage], [VisionPointsJson], [MissionPointsJson], [ValuesJson], [StoryHtml], [UpdatedAt]) VALUES (1, N'About Us', N'Efficacious is synonymous with Efficiency. Providing innovative & efficient solutions to make life Safe, Secure & Easy.', N'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000', N'["Global Reach","Technological Innovation","User-Centric Design"]', N'["Child Security First","Operational Efficiency","Scalable Solutions"]', N'[{"id":1,"title":"Innovation","description":"Constantly pushing boundaries to create better solutions."},{"title":"Integrity","id":2,"description":"Building trust through transparency and ethical practices."},{"title":"Excellence","id":3,"description":"Striving for the highest quality in everything we do."},{"id":4,"description":"Ensuring the safety and privacy of data for all users.","title":"Security"}]', N'', N'2026-10-30T11:51:52.151Z');
GO
SET IDENTITY_INSERT [AboutContents] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Testimonials]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Testimonials]', N'U') IS NULL
BEGIN
    CREATE TABLE [Testimonials] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Role] NVARCHAR(MAX) NULL,
    [Company] NVARCHAR(MAX) NULL,
    [Text] NVARCHAR(MAX) NOT NULL,
    [Image] NVARCHAR(MAX) NULL,
    [Rating] INT NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Testimonials] ON;
GO
INSERT INTO [Testimonials] ([Id], [Name], [Role], [Company], [Text], [Image], [Rating], [CreatedAt]) VALUES (1, N'Rajesh Gupta', N'Principal', N'St. Xavier''s International School', N'Efficacious transformed how we manage our school. The parent communication module and real-time attendance alone have saved us countless administrative hours.', N'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', 5, N'2026-10-30 11:57:28');
INSERT INTO [Testimonials] ([Id], [Name], [Role], [Company], [Text], [Image], [Rating], [CreatedAt]) VALUES (2, N'Dr. Anjali Desai', N'Medical Director', N'City Care Super-Specialty Hospital', N'The eSmart Health system is intuitive and robust. It seamlessly scaled as our patient flow doubled. Billing, appointments, and medical records are all unified.', N'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', 5, N'2026-10-30 11:57:28');
INSERT INTO [Testimonials] ([Id], [Name], [Role], [Company], [Text], [Image], [Rating], [CreatedAt]) VALUES (3, N'Vikram Malhotra', N'Managing Director', N'Urban Spice Hospitality Group', N'eSmart Restaurant streamlined our kitchen operations and table billing. Order turnaround time reduced by 35% and customer satisfaction is at an all-time high.', N'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 5, N'2026-10-30 11:57:28');
INSERT INTO [Testimonials] ([Id], [Name], [Role], [Company], [Text], [Image], [Rating], [CreatedAt]) VALUES (4, N'Pooja Sharma', N'Chief Operating Officer', N'Apex Citizen Services & Banking', N'eSmart Queue replaced chaotic physical waiting lines with smart mobile slot bookings and contactless QR entry. Our branches are calmer and far more productive.', N'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 5, N'2026-10-30 11:57:28');
GO
SET IDENTITY_INSERT [Testimonials] OFF;
GO

-- ------------------------------------------------------------
-- Table: [Clients]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[Clients]', N'U') IS NULL
BEGIN
    CREATE TABLE [Clients] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(MAX) NOT NULL,
    [Category] NVARCHAR(MAX) NULL,
    [Logo] NVARCHAR(MAX) NOT NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

SET IDENTITY_INSERT [Clients] ON;
GO
INSERT INTO [Clients] ([Id], [Name], [Category], [Logo], [CreatedAt]) VALUES (1, N'St. Xavier''s School', N'Education', N'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=300', N'2026-10-30 11:57:28');
INSERT INTO [Clients] ([Id], [Name], [Category], [Logo], [CreatedAt]) VALUES (2, N'City Care Hospital', N'Healthcare', N'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300', N'2026-10-30 11:57:28');
INSERT INTO [Clients] ([Id], [Name], [Category], [Logo], [CreatedAt]) VALUES (3, N'EuroSchool International', N'Education', N'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=300', N'2026-10-30 11:57:28');
INSERT INTO [Clients] ([Id], [Name], [Category], [Logo], [CreatedAt]) VALUES (4, N'Urban Spice Group', N'Hospitality', N'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=300', N'2026-10-30 11:57:28');
INSERT INTO [Clients] ([Id], [Name], [Category], [Logo], [CreatedAt]) VALUES (5, N'Apex Financial', N'Banking & Public Sector', N'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300', N'2026-10-30 11:57:28');
INSERT INTO [Clients] ([Id], [Name], [Category], [Logo], [CreatedAt]) VALUES (6, N'Apollo Healthcare Network', N'Healthcare', N'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300', N'2026-10-30 11:57:28');
GO
SET IDENTITY_INSERT [Clients] OFF;
GO

-- ------------------------------------------------------------
-- Table: [AdminUsers]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[AdminUsers]', N'U') IS NULL
BEGIN
    CREATE TABLE [AdminUsers] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Email] NVARCHAR(MAX) NOT NULL,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [DisplayName] NVARCHAR(MAX) NOT NULL,
    [Role] NVARCHAR(MAX) NULL,
    [IsActive] INT NULL,
    [CreatedAt] NVARCHAR(MAX) NOT NULL,
    [LastLoginAt] NVARCHAR(MAX) NULL
    );
END
GO

SET IDENTITY_INSERT [AdminUsers] ON;
GO
INSERT INTO [AdminUsers] ([Id], [Email], [PasswordHash], [DisplayName], [Role], [IsActive], [CreatedAt], [LastLoginAt]) VALUES (1, N'admin@efficacious.co.in', N'Admin@123', N'Efficacious Administrator', N'SuperAdmin', 1, N'2026-10-30 11:57:28', N'2026-11-02T05:27:07.0035380Z');
INSERT INTO [AdminUsers] ([Id], [Email], [PasswordHash], [DisplayName], [Role], [IsActive], [CreatedAt], [LastLoginAt]) VALUES (2, N'info@efficacious.co.in', N'AdminPassword123!', N'Info Desk Admin', N'Admin', 1, N'2026-10-30 11:57:28', N'2026-10-30T12:18:50.0492910Z');
GO
SET IDENTITY_INSERT [AdminUsers] OFF;
GO

-- ------------------------------------------------------------
-- Table: [SystemSettings]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[SystemSettings]', N'U') IS NULL
BEGIN
    CREATE TABLE [SystemSettings] (
    [Key] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [Value] NVARCHAR(MAX) NOT NULL,
    [Description] NVARCHAR(MAX) NULL,
    [UpdatedAt] NVARCHAR(MAX) NOT NULL
    );
END
GO

INSERT INTO [SystemSettings] ([Key], [Value], [Description], [UpdatedAt]) VALUES (N'SiteName', N'Efficacious India Limited', N'Main Brand Title', N'2026-10-30 11:57:28');
INSERT INTO [SystemSettings] ([Key], [Value], [Description], [UpdatedAt]) VALUES (N'ContactEmail', N'info@efficacious.co.in', N'Primary Recipient for Inquiries', N'2026-10-30 11:57:28');
INSERT INTO [SystemSettings] ([Key], [Value], [Description], [UpdatedAt]) VALUES (N'LiveSupportActive', N'true', N'Global Chat Support Online State', N'2026-10-30 11:57:28');
INSERT INTO [SystemSettings] ([Key], [Value], [Description], [UpdatedAt]) VALUES (N'MaintenanceMode', N'false', N'Site Maintenance Status', N'2026-10-30 11:57:28');

-- ------------------------------------------------------------
-- Table: [NewsletterSubscribers]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[NewsletterSubscribers]', N'U') IS NULL
BEGIN
    CREATE TABLE [NewsletterSubscribers] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Email] NVARCHAR(MAX) NOT NULL,
    [SubscribedAt] NVARCHAR(MAX) NOT NULL,
    [IsActive] INT NULL
    );
END
GO

SET IDENTITY_INSERT [NewsletterSubscribers] ON;
GO
INSERT INTO [NewsletterSubscribers] ([Id], [Email], [SubscribedAt], [IsActive]) VALUES (1, N'visitor@example.com', N'2026-10-30T11:59:09.9090350Z', 1);
GO
SET IDENTITY_INSERT [NewsletterSubscribers] OFF;
GO

-- ------------------------------------------------------------
-- Table: [AuditLogs]
-- ------------------------------------------------------------
IF OBJECT_ID(N'dbo.[AuditLogs]', N'U') IS NULL
BEGIN
    CREATE TABLE [AuditLogs] (
    [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Action] NVARCHAR(MAX) NOT NULL,
    [PerformedBy] NVARCHAR(MAX) NULL,
    [Details] NVARCHAR(MAX) NULL,
    [IpAddress] NVARCHAR(MAX) NULL,
    [Timestamp] NVARCHAR(MAX) NOT NULL
    );
END
GO

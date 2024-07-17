INSERT INTO Users ( Username, Password, Email, FirstName, LastName, FirstLogin)
VALUES
    ( 'pranav', '123', 'pranav@example.com', 'Pranav', 'Gupta', 0),
    ( 'harsh', '123', 'harsh@example.com', 'Harsh', 'Gupta', 0),
    ( 'harhit', '123', 'harshit@example.com', 'Harshit', 'Gupta', 0),
    ( 'aman', '123', 'aman@example.com', 'aman', 'Gupta', 0),
    ( 'akash', '123', 'akash@example.com', 'akash', 'Gupta', 0),
    ( 'ankit', '123', 'ankit@example.com', 'ankit', 'Gupta', 0),
    ( 'naman', '123', 'naman@example.com', 'naman', 'Gupta', 0),
    ( 'natik', '123', 'natik@example.com', 'natik', 'Gupta', 0),
    ( 'piyush', '123', 'piyush@example.com', 'piyush', 'Gupta', 0),
    ( 'ashu', '123', 'ashu@example.com', 'ashu', 'Gupta', 0),
    ( 'john', '123', 'john@example.com', 'john', 'Gupta', 0),
    ( 'jim', '123', 'jim@example.com', 'jim', 'Gupta', 0),
    ( 'joy', '123', 'joy@example.com', 'joy', 'Gupta', 0),
    ( 'jai', '123', 'jai@example.com', 'jai', 'Gupta', 0);

-- if not using identity in userid
INSERT INTO Users (UserId, Username, Password, Email, FirstName, LastName, FirstLogin)
VALUES
    (1, 'pranav', '123', 'pranav@example.com', 'Pranav', 'Gupta', 1),
    (2, 'harsh', '123', 'harsh@example.com', 'Harsh', 'Gupta', 0),
    (3, 'harhit', '123', 'harshit@example.com', 'Harshit', 'Gupta', 0),
    (4, 'aman', '123', 'aman@example.com', 'aman', 'Gupta', 0),
    (5, 'akash', '123', 'akash@example.com', 'akash', 'Gupta', 0),
    (6, 'ankit', '123', 'ankit@example.com', 'ankit', 'Gupta', 0),
    (7, 'naman', '123', 'naman@example.com', 'naman', 'Gupta', 0),
    (8, 'natik', '123', 'natik@example.com', 'natik', 'Gupta', 0),
    (9, 'piyush', '123', 'piyush@example.com', 'piyush', 'Gupta', 0),
    (10, 'ashu', '123', 'ashu@example.com', 'ashu', 'Gupta', 0),
    (11, 'john', '123', 'john@example.com', 'john', 'Gupta', 0),
    (12, 'jim', '123', 'jim@example.com', 'jim', 'Gupta', 0),
    (13, 'joy', '123', 'joy@example.com', 'joy', 'Gupta', 0),
    (14, 'jai', '123', 'jai@example.com', 'jai', 'Gupta', 0);


    INSERT INTO Roles (RoleId, RoleName)
VALUES
    (1, 'Admin'),
    (2, 'Manager'),
    (3, 'Coordinator'),
    (4, 'Executive');


INSERT INTO UserRelation (UserId, ParentId)
VALUES
    (1, NULL),
    (2, NULL),
    (3, 2),
    (4, 3),
    (5, 2),
    (6, 5),
    (7, NULL),
    (8, 7),
    (9, 7),
    (10, 8),
    (11, 8),
    (12, 9),
    (13, 8),
    (14, 7);

INSERT INTO UserRoles (UserId, RoleId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 3),
    (6, 4),
    (7, 2),
    (8, 3),
    (9, 3),
    (10, 4),
    (11, 4),
    (12, 4),
    (13, 4),
    (14, 4);
-- if not using identity in privilegeid
    INSERT INTO Privileges (PrivilegeId, PrivilegeCode, Description)
VALUES
    (2, 'Settings', 'Can edit users'),
    (3, 'AddFollowup', 'can add followup'),
    (6, 'EditCustomers', 'Can edit customers and details.'),
    (7, 'EditFollowups', 'Can edit followup and details.');

INSERT INTO Privileges ( PrivilegeCode, Description)
VALUES
    ( 'Settings', 'Can edit users'),
    ( 'AddFollowup', 'can add followup'),
    ( 'EditCustomers', 'Can edit customers and details.'),
    ( 'EditFollowups', 'Can edit followup and details.');

INSERT INTO Customers (Email, Name, ManagerId, CoordinatorId, ExecutiveId, CreatedOn, UpdatedOn, PhoneNo, Domain, Description, CreatedBy)
VALUES
    ('ankush@example.com', 'ankush', 2, 5, 6, '2024-06-27 15:54:56.057', NULL, 1686199461, NULL, 'good credit card score', NULL),
    ('kanu@example.com', 'kanu', 2, 3, 4, '2024-06-27 15:56:11.173', NULL, 2031648766, NULL, 'bad credit card score', NULL),
    ('sahil@example.com', 'sahil', 2, 3, 4, '2024-06-27 15:57:01.773', NULL, 1613404848, NULL, 'not important', NULL),
    ('prateek@example.com', 'prateek', 7, 8, 10, '2024-06-27 15:55:46.510', NULL, 0428697783, NULL, 'bad credit card score', NULL),
    ('manas@example.com', 'Manas', 7, 8, 11, '2024-06-27 15:56:38.820', NULL, 1943451736, NULL, ' important', NULL),
    ('ojas@example.com', 'ojas', 7, 9, 12, '2024-06-27 15:57:08.380', NULL, 0677043769, NULL, 'bad credit card score', NULL);

-- if not using identity in CustomerId

INSERT INTO Customers (CustomerId, Email, Name, ManagerId, CoordinatorId, ExecutiveId, CreatedOn, UpdatedOn, PhoneNo, Domain, Description, CreatedBy)
VALUES
    (9, 'ankush@example.com', 'ankush', 2, 5, 6, '2024-06-27 15:54:56.057', NULL, 1686199461, NULL, 'good credit card score', NULL),
    (10, 'kanu@example.com', 'kanu', 2, 3, 4, '2024-06-27 15:56:11.173', NULL, 2031648766, NULL, 'bad credit card score', NULL),
    (11, 'sahil@example.com', 'sahil', 2, 3, 4, '2024-06-27 15:57:01.773', NULL, 1613404848, NULL, 'not important', NULL),
    (12, 'prateek@example.com', 'prateek', 7, 8, 10, '2024-06-27 15:55:46.510', NULL, 0428697783, NULL, 'bad credit card score', NULL),
    (13, 'manas@example.com', 'Manas', 7, 8, 11, '2024-06-27 15:56:38.820', NULL, 1943451736, NULL, ' important', NULL),
    (14, 'ojas@example.com', 'ojas', 7, 9, 12, '2024-06-27 15:57:08.380', NULL, 0677043769, NULL, 'bad credit card score', NULL);

DECLARE @Dell UNIQUEIDENTIFIER SET @Dell = NEWID()
DECLARE @Acer UNIQUEIDENTIFIER SET @Acer = NEWID()
DECLARE @5570 UNIQUEIDENTIFIER SET @5570 = NEWID()
DECLARE @5580 UNIQUEIDENTIFIER SET @5580 = NEWID()
DECLARE @5770 UNIQUEIDENTIFIER SET @5770 = NEWID()
DECLARE @XPS13 UNIQUEIDENTIFIER SET @XPS13 = NEWID()
DECLARE @XPS15 UNIQUEIDENTIFIER SET @XPS15 = NEWID()
DECLARE @XPS17 UNIQUEIDENTIFIER SET @XPS17 = NEWID()
DECLARE @WindowsXP UNIQUEIDENTIFIER SET @WindowsXP = NEWID()
DECLARE @WindowsVista UNIQUEIDENTIFIER SET @WindowsVista = NEWID()
DECLARE @Windows8 UNIQUEIDENTIFIER SET @Windows8 = NEWID()

INSERT INTO Make (Id, Name) VALUES (@Acer, 'Acer');
INSERT INTO Make (Id, Name) VALUES (@Dell, 'Dell');

INSERT INTO Model (Id, Name, MakeId) VALUES (@5570, '5570', @Acer);
INSERT INTO Model (Id, Name, MakeId) VALUES (@5580, '5580', @Acer);
INSERT INTO Model (Id, Name, MakeId) VALUES (@5770, '5770', @Acer);

INSERT INTO Model (Id, Name, MakeId) VALUES (@XPS13, 'XPS 13', @Dell);
INSERT INTO Model (Id, Name, MakeId) VALUES (@XPS15, 'XPS 15', @Dell);
INSERT INTO Model (Id, Name, MakeId) VALUES (@XPS17, 'XPS 17', @Dell);

INSERT INTO OperatingSystem (Id, Name) VALUES (@WindowsXP, 'Windows XP');
INSERT INTO OperatingSystem (Id, Name) VALUES (@WindowsVista, 'Windows Vista');
INSERT INTO OperatingSystem (Id, Name) VALUES (@Windows8, 'Windows 8');

INSERT INTO DeliveryOption (Id, Name, IsShipped, Price) VALUES (NEWID(), 'DVD ROM', 1, 9.99);
INSERT INTO DeliveryOption (Id, Name, IsShipped, Price) VALUES (NEWID(), 'USB Flash Drive', 1, 19.99);

INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5570, @WindowsXP);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5580, @WindowsXP); 
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5770, @WindowsXP); 

INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5570, @WindowsVista);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5580, @WindowsVista); 
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5770, @WindowsVista); 

INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5570, @Windows8);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5580, @Windows8); 
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Acer, @5770, @Windows8); 

INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS13, @WindowsXP);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS15, @WindowsXP);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS17, @WindowsXP);

INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS13, @WindowsVista);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS15, @WindowsVista);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS17, @WindowsVista);

INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS13, @Windows8);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS15, @Windows8);
INSERT INTO Product (Id, LongDescription, MakeId, ModelId, OperatingSystemId)
VALUES (NEWID(), 'Lorem Ipsum etc.', @Dell, @XPS17, @Windows8);
CREATE TABLE `secretNotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text,
	`passwordHash` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `secretNotes_id` PRIMARY KEY(`id`),
	CONSTRAINT `secretNotes_userId_unique` UNIQUE(`userId`)
);

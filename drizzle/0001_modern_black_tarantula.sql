CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp,
	`location` varchar(255),
	`notificationBefore` int,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`source` enum('manual','whatsapp','calendar') NOT NULL DEFAULT 'manual',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `excelImports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileUrl` varchar(500),
	`rowsImported` int NOT NULL,
	`importedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `excelImports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsArticles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`content` text,
	`imageUrl` varchar(500),
	`sourceUrl` varchar(500) NOT NULL,
	`source` varchar(100) NOT NULL,
	`category` enum('jobs','technology','politics','economy') NOT NULL,
	`publishedAt` timestamp NOT NULL,
	`savedAt` timestamp NOT NULL DEFAULT (now()),
	`isSaved` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsArticles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`scheduledTime` timestamp NOT NULL,
	`duration` int,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`priority` enum('low','medium','high') NOT NULL DEFAULT 'medium',
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`amount` decimal(12,2) NOT NULL,
	`type` enum('income','expense') NOT NULL,
	`category` varchar(100),
	`transactionDate` timestamp NOT NULL,
	`source` enum('manual','bank_notification','excel') NOT NULL DEFAULT 'manual',
	`bankName` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`theme` enum('light','dark','auto') NOT NULL DEFAULT 'auto',
	`notificationsEnabled` boolean NOT NULL DEFAULT true,
	`soundEnabled` boolean NOT NULL DEFAULT true,
	`vibrationEnabled` boolean NOT NULL DEFAULT true,
	`defaultNotificationMinutes` int NOT NULL DEFAULT 15,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSettings_userId_unique` UNIQUE(`userId`)
);

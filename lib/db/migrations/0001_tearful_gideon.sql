CREATE TABLE `ranks` (
	`id` varchar(191) NOT NULL,
	`name` varchar(256) NOT NULL,
	`service_id` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	CONSTRAINT `ranks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` varchar(191) NOT NULL,
	`name` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE TABLE `employees` (
	`id` varchar(191) NOT NULL,
	`service_id` varchar(256) NOT NULL,
	`rank_id` varchar(256) NOT NULL,
	`unit_id` varchar(256) NOT NULL,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_rank_id_ranks_id_fk` FOREIGN KEY (`rank_id`) REFERENCES `ranks`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_unit_id_units_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE cascade ON UPDATE no action;
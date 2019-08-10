CREATE TABLE `test_kafka`.`transaction` (
  `id` VARCHAR(100) NOT NULL,
  `creation_date` DATETIME NULL DEFAULT now(),
  `value` DOUBLE NULL DEFAULT 0,
  `person_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

  INSERT INTO test_kafka.transaction VALUES('123', NOW(), 14.5, 1);
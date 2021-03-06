import { Observable, zip } from "rxjs";
import { IServerConfigsModel } from "../server-configs.service";
import { Database } from "./database";

export class MigrateDb {
  constructor(private configs: IServerConfigsModel, private db: Database) {}

  public init(): Observable<any> {
    console.log(`migration: starting`);
    return zip(
      this.createDb(),
      this.createTables(),
      this.createUser(),
      this.grantPermissions()
    );
  }

  private createDb(): Observable<void> {
    return this.db.execute(
      `CREATE DATABASE IF NOT EXISTS ${this.configs.appDatabase}
          CHARACTER SET utf8
          COLLATE utf8_unicode_ci`
    );
  }

  private createTables(): Observable<any> {
    return zip(
      this.db.execute(
        `CREATE TABLE IF NOT EXISTS \`${this.configs.appDatabase}\`.\`order-notification\` (
            \`buyingOrderId\` INT NOT NULL PRIMARY KEY,
            \`providerId\` INT NOT NULL,
            \`timestamp\` DATETIME NOT NULL,
            \`sent\` BOOL,
            \`orderDate\` DATE,
            \`estimatedOrderDate\` DATE,
            \`providerEmail\` VARCHAR(128),
            \`employeeEmail\` VARCHAR(128)
          )
          ROW_FORMAT=DYNAMIC ENGINE=InnoDB;`
      ),
      this.db.execute(
        `CREATE TABLE IF NOT EXISTS \`${this.configs.appDatabase}\`.\`configuration\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`appEmailName\` VARCHAR(128),
            \`appEmailUser\` VARCHAR(128),
            \`appEmailPassword\` VARCHAR(128),
            \`appBlacklist\` text(7000),
            \`appSMTPAddress\` VARCHAR(128),
            \`appSMTPPort\` INT,
            \`appSMTPSecure\` BOOL,
            \`appEmailFrom\` VARCHAR(128),
            \`appEmailSubject\` VARCHAR(128),
            \`appEmailText\` text(8192),
            \`appEmailHtml\` text(8192),
            \`appServerHost\` VARCHAR(128),
            \`appServerPort\` INT,
            \`appCronPattern\` VARCHAR(128),
            \`appCronTimezone\` VARCHAR(128),
            \`appNotificationTriggerDelta\` INT
          )
          ROW_FORMAT=DYNAMIC ENGINE=InnoDB;`
      )
    );
  }

  private createUser(): Observable<void> {
    return this.db.execute(
      `CREATE USER IF NOT EXISTS '${this.configs.dbAppUser}' IDENTIFIED WITH mysql_native_password BY '${this.configs.dbAppPassword}'`
    );
  }

  private grantPermissions(): Observable<void> {
    return this.db.execute(
      `GRANT ALL ON ${this.configs.appDatabase}.* TO '${this.configs.dbAppUser}'`
    );
  }
}

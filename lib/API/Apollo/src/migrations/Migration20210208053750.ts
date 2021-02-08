import { Migration } from '@mikro-orm/migrations';

export class Migration20210208053750 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "city" varchar(255) not null, "province" varchar(255) not null, "country" varchar(255) not null, "stripe_customer" varchar(255) not null, "stripe_account" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}

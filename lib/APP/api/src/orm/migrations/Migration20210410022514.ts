import { Migration } from '@mikro-orm/migrations';

export class Migration20210410022514 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "conversation" add column "seller_id" varchar(255) not null;');

    this.addSql('alter table "conversation" add constraint "conversation_seller_id_foreign" foreign key ("seller_id") references "user" ("id") on update cascade;');
  }

}

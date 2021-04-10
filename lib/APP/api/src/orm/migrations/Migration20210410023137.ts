import { Migration } from '@mikro-orm/migrations';

export class Migration20210410023137 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "conversation" rename column "author_id" to "buyer_id";');
  }

}

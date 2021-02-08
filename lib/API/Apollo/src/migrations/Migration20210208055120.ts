import { Migration } from '@mikro-orm/migrations';

export class Migration20210208055120 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listing" rename column "province" to "jake";');
  }

}

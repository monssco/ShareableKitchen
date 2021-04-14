import { Migration } from '@mikro-orm/migrations';

export class Migration20210414191513 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index "message_conversation_buyer_id_conversation_seller_id_conversati";');

    this.addSql('create index "message_conversation_buyer_id_conversation_seller_id_conversation_listing_id_index" on "message" ("conversation_buyer_id", "conversation_seller_id", "conversation_listing_id");');
  }

}

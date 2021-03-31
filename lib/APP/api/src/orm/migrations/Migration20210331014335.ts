import { Migration } from '@mikro-orm/migrations';

export class Migration20210331014335 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "profile_image" ("original_key" varchar(255) not null, "resized_medium" varchar(255) not null, "resized_small" varchar(255) not null, "resized_large" varchar(255) not null);');
    this.addSql('alter table "profile_image" add constraint "profile_image_pkey" primary key ("original_key");');

    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "profile_image_original_key" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, "date_of_birth" date null, "city" varchar(255) null, "province" varchar(255) null, "country" varchar(255) null, "stripe_customer_id" varchar(255) null, "stripe_account_id" varchar(255) null, "created" timestamptz not null, "modified" timestamptz not null, "status" boolean not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
    this.addSql('alter table "user" add constraint "user_profile_image_original_key_unique" unique ("profile_image_original_key");');

    this.addSql('create table "listing" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "location" varchar(255) not null, "price" int4 not null, "features" text[] null, "property_type" varchar(255) not null, "area" int4 not null, "photos" varchar(255) not null, "stripe_customer" varchar(255) not null, "stripe_account" varchar(255) not null);');
    this.addSql('alter table "listing" add constraint "listing_pkey" primary key ("id");');

    this.addSql('alter table "user" add constraint "user_profile_image_original_key_foreign" foreign key ("profile_image_original_key") references "profile_image" ("original_key") on update cascade;');
  }

}

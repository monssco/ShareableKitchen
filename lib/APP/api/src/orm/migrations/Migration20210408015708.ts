import { Migration } from '@mikro-orm/migrations';

export class Migration20210408015708 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "country" ("id" serial primary key, "name" varchar(255) not null, "currency" varchar(255) not null, "currency_symbol" varchar(255) not null);');

    this.addSql('create table "state" ("country_id" int4 not null, "id" int4 not null, "name" varchar(255) not null);');
    this.addSql('alter table "state" add constraint "state_pkey" primary key ("country_id", "id");');

    this.addSql('create table "city" ("state_country_id" int4 not null, "state_id" int4 not null, "id" int4 not null, "name" varchar(255) not null);');
    this.addSql('alter table "city" add constraint "city_pkey" primary key ("state_country_id", "state_id", "id");');

    this.addSql('create table "user_location" ("original_key" varchar(255) not null, "address" varchar(255) not null, "country" jsonb not null, "state" jsonb not null, "city" jsonb not null, "postal" varchar(255) not null);');
    this.addSql('alter table "user_location" add constraint "user_location_pkey" primary key ("original_key");');

    this.addSql('create table "profile_image" ("id" varchar(255) not null, "original_key" varchar(255) not null, "resized_medium" varchar(255) null, "resized_small" varchar(255) null, "resized_large" varchar(255) null);');
    this.addSql('alter table "profile_image" add constraint "profile_image_pkey" primary key ("id");');

    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "profile_image_id" varchar(255) null, "location_original_key" varchar(255) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "date_of_birth" date null, "stripe_customer_id" varchar(255) null, "stripe_account_id" varchar(255) null, "created" timestamptz not null, "modified" timestamptz not null, "status" boolean not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
    this.addSql('alter table "user" add constraint "user_profile_image_id_unique" unique ("profile_image_id");');
    this.addSql('alter table "user" add constraint "user_location_original_key_unique" unique ("location_original_key");');

    this.addSql('create table "listing_location" ("original_key" varchar(255) not null, "address" varchar(255) not null, "country" jsonb not null, "state" jsonb not null, "city" jsonb not null, "postal" varchar(255) not null);');
    this.addSql('alter table "listing_location" add constraint "listing_location_pkey" primary key ("original_key");');

    this.addSql('create table "listing" ("id" varchar(255) not null, "author_id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "location_original_key" varchar(255) not null, "price" int4 not null, "sq_ft_area" int4 not null, "features" text[] null, "property_type" text check ("property_type" in (\'Cafe\', \'Church\', \'Commercial Kitchen\', \'Community Center\', \'Restaurant\')) not null, "published" timestamptz not null, "created" timestamptz not null, "modified" timestamptz not null, "status" boolean not null);');
    this.addSql('alter table "listing" add constraint "listing_pkey" primary key ("id");');
    this.addSql('alter table "listing" add constraint "listing_location_original_key_unique" unique ("location_original_key");');

    this.addSql('create table "listing_image" ("id" varchar(255) not null, "original_key" varchar(255) not null, "resized_medium" varchar(255) null, "resized_small" varchar(255) null, "resized_large" varchar(255) null, "listing_id" varchar(255) not null);');
    this.addSql('alter table "listing_image" add constraint "listing_image_pkey" primary key ("id");');

    this.addSql('create table "booking" ("id" varchar(255) not null);');
    this.addSql('alter table "booking" add constraint "booking_pkey" primary key ("id");');

    this.addSql('alter table "state" add constraint "state_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade;');

    this.addSql('alter table "city" add constraint "city_state_country_id_state_id_foreign" foreign key ("state_country_id", "state_id") references "state" ("country_id", "id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_profile_image_id_foreign" foreign key ("profile_image_id") references "profile_image" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" add constraint "user_location_original_key_foreign" foreign key ("location_original_key") references "user_location" ("original_key") on update cascade on delete set null;');

    this.addSql('alter table "listing" add constraint "listing_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "listing" add constraint "listing_location_original_key_foreign" foreign key ("location_original_key") references "listing_location" ("original_key") on update cascade;');

    this.addSql('alter table "listing_image" add constraint "listing_image_listing_id_foreign" foreign key ("listing_id") references "listing" ("id") on update cascade;');

    this.addSql('create index "city_state_country_id_state_id_index" on "city" ("state_country_id", "state_id");');
  }

}

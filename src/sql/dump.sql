create table users (
  id serial primary key,
  name text not null,
  email text UNIQUE not null,
  password text not null
 );

create table categories (
  id serial primary key,
  description text not null
 );

create table products (
  id serial primary key,
  description text,
  quantity_stock integer,
  value integer,
  category_id integer references categories(id),
  image text
);

create table customers (
  id serial primary key,
  name text, 
  email text unique,
  cpf text unique,
  zipcode integer, 
  street text,
  number integer,
  district text,
  city text, 
  state text
);

create table orders (
  id serial primary key,
  customer_id integer not null,
  observation text,
  total_value integer not null
);

create table order_products (
  id serial primary key,
  order_id integer not null references orders(id),
  product_id integer not null references products(id),
  quantity integer not null,
  value integer not null 
);
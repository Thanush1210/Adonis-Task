/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
}).middleware("key");

Route.group(() => {
  Route.get("", "CustomersController.showAllCustomer");
  Route.post("", "CustomersController.storeCustomer");
  Route.patch("/:id", "CustomersController.updateCustomerName");
  Route.delete("/:id", "CustomersController.deleteCustomer");
}).prefix("/customers").middleware("key");

Route.group(() => {
  Route.get("", "OrdersController.showAllOrders");
  Route.post("", "OrdersController.storeOrder");
  Route.patch("/:id", "OrdersController.updateOrderQuantity");
  Route.delete("/:id", "OrdersController.deleteOrder");
}).prefix("orders").middleware("key");

Route.get("/join", "JoinsController.joinUser").middleware("key");

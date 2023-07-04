// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from "App/Models/Customer";

export default class JoinsController {
    public async joinUser() {
        const join = await Customer.query()
          .join("orders", "orders.customer_id", "=", "customers.id")
          .select("*")
          .orderBy('customers.id','asc');
      
        const joinedList = join.map( list => {
            return{
                id: list.$original.id,
                name: list.$original.name,
                city: list.$original.city,
                bill: list.$original.bill,
                customer_id: list.$extras.customer_id,
                quantity: list.$extras.quantity
            }
        })
        return joinedList;
      }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Order from "App/Models/Order";

export default class OrdersController {
  public async storeOrder({ request, response }: HttpContextContract) {
    try {
      const newOrderSchema = schema.create({
        customerId: schema.number(),
        quantity: schema.number(),
      });
      const payload = await request.validate({ schema: newOrderSchema });
      const order = await Order.create(payload);
      return order;
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async showAllOrders() {
    return Order.all();
  }

  public async updateOrderQuantity({
    request,
    response,
    params,
  }: HttpContextContract) {
    try {
      const { quantity } = await request.validate({
        schema: schema.create({
          quantity: schema.number(),
        }),
      });

      const order = await Order.find(params.id);
      if (!order) {
        return response.status(404).json({ message: "Customer not found" });
      }
      order.quantity = quantity;
      await order.save();

      return response.json({ message: "Order quantity updated successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async deleteOrder({ params, response }: HttpContextContract) {
    try {
      const order = await Order.find(params.id);

      if (!order) {
        return response.status(404).json({ message: "Order not found" });
      }

      await order.delete();

      return response.json({ message: "Deleted order successfully!" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

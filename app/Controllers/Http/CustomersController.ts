import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Customer from "App/Models/Customer";

export default class CustomersController {
  public async storeCustomer({ request, response }: HttpContextContract) {
    try {
      const newCustomerSchema = schema.create({
        name: schema.string(),
        city: schema.string(),
        bill: schema.number(),
      });
      const payload = await request.validate({ schema: newCustomerSchema });
      const customer = await Customer.create(payload);
      return customer;
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async showAllCustomer() {
    return Customer.all();
  }

  public async updateCustomerName({
    request,
    response,
    params,
  }: HttpContextContract) {
    try {
      const { name } = request.body();

      const customer = await Customer.find(params.id);
      if (!customer) {
        return response.status(404).json({ message: "Customer not found" });
      }
      customer.name = name;
      await customer.save();

      return response.json({ message: "Customer name updated successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async deleteCustomer({ params, response }: HttpContextContract) {
    try {
      const customer = await Customer.find(params.id);

      if (!customer) {
        return response.status(404).json({ message: "Customer not found" });
      }

      await customer.delete();

      return response.json({ message: "Deleted customer successfully!" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

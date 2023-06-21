import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const xata = getXataClient();

export async function POST(request: Request) {
  const state = await request.json();
  const orderState: { orderId: string; orderHamburgerIds: string[]; orderHamburgerExtraIngredientIds: string[] } = {
    orderId: "",
    orderHamburgerIds: [],
    orderHamburgerExtraIngredientIds: [],
  };

  try {
    const createdOrder = await xata.db.orders.create({ totalPrice: state.totalPrice, rawData: JSON.stringify(state) });
    orderState.orderId = createdOrder.id;
    for (const orderHamburger of state.orderHamburgers) {
      const createdOrderHamburger = await xata.db.orderHamburgers.create({ order: createdOrder.id, hamburger: orderHamburger.id });
      orderState.orderHamburgerIds.push(createdOrderHamburger.id);
      for (const extraIngredient of orderHamburger.extraIngredients) {
        const createdOrderHamburgerExtraIngredient = await xata.db.orderHamburgerExtraIngredients.create({
          orderHamburger: createdOrderHamburger.id,
          extraIngredient: extraIngredient.id,
          count: extraIngredient.count,
        });
        orderState.orderHamburgerExtraIngredientIds.push(createdOrderHamburgerExtraIngredient.id);
      }
    }
    return NextResponse.json({ orderId: createdOrder.id }, { status: 201 });
  } catch (error) {
    try {
      await xata.db.orderHamburgerExtraIngredients.delete(orderState.orderHamburgerExtraIngredientIds);
      await xata.db.orderHamburgers.delete(orderState.orderHamburgerIds);
      await xata.db.orders.delete(orderState.orderId);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(request: Request) {
  console.log("TRYING TO GET HISTORY");
  try {
    const orders = await xata.db.orders.getMany();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

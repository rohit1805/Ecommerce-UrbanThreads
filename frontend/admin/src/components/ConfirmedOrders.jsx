import { OrderCard } from "./OrderCards";

export function ConfirmedOrders({ orders, updateOrders }) {
  if (orders.length == 0) {
    return (
      <div className=" text-2xl text-center mt-40">No confirmed orders!</div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5 my-5">
      {orders.map((order) => {
        return (
          <OrderCard
            key={order.id}
            orderId={order.id}
            userId={order.userId}
            totalAmount={order.totalAmount}
            status={order.status}
            date={order.createdAt}
            email={order.user.email}
            usersFirstName={order.user.firstName}
            usersLastName={order.user.lastName}
            phoneno={order.user.phoneno}
            address={order.address}
            orderItems={order.orderItems}
            updateOrders={updateOrders}
          />
        );
      })}
    </div>
  );
}

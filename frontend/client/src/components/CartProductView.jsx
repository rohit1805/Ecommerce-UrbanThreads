import { CartItem } from "./CartItem";

export function CartProductView({
  cartItem,
  updateCartItems,
  // setItemQuantity,
  // itemQuantity,
}) {
  return (
    <div className="flex flex-col gap-5 bg-white px-4 py-6 rounded-md w-full mr-2">
      {cartItem.map((item) => (
        <CartItem
          key={item.id}
          image={item.product.images[0].imageUrl}
          productId={item.productId}
          name={item.product.name}
          desc={item.product.description}
          quantity={item.quantity}
          price={item.price}
          size={item.size}
          updateCartItems={updateCartItems}
          // setItemQuantity={setItemQuantity}
          // itemQuantity={itemQuantity}
        />
      ))}
    </div>
  );
}

import useCartStore from "../store/useCartStore";

const MENU = [
  { id: 1, name: "Espresso", price: 1200 },
  { id: 2, name: "Latte", price: 2000 },
  { id: 3, name: "Cold Brew", price: 2200 },
];

const CoffeeShop = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-green-900 font-bold text-lg mb-1">
        Section 6 Mini Project — the coffee shop
      </h2>

      <ul className="text-gray-700 mb-4 space-y-1">
        {MENU.map((item) => (
          <li key={item.id}>
            {item.name} — ₦{item.price.toLocaleString()}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mb-6">
        {MENU.map((item) => (
          <button
            key={item.id}
            onClick={() => addToCart(item)}
            className="bg-green-900 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Add {item.name}
          </button>
        ))}
      </div>

      <h3 className="text-green-900 font-bold mb-2">Cart ({itemCount})</h3>

      {cartItems.length > 0 && (
        <ul className="mb-3 space-y-1">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center text-sm text-gray-600"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <div className="flex items-center gap-2">
                <span>₦{(item.price * item.qty).toLocaleString()}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold"
                >
                  remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="text-gray-800 font-medium mb-4">
        Total: ₦{getTotal().toLocaleString()}
      </p>

      <button
        onClick={clearCart}
        className="bg-green-700 hover:bg-amber-800 text-white font-semibold px-5 py-2 rounded-lg transition"
      >
        Clear
      </button>
    </div>
  );
};

export default CoffeeShop;
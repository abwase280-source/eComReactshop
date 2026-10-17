
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const CartContext = createContext();

function getSavedCart() {
  try {
    const savedCart = localStorage.getItem('plant-shop-cart');

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart);

  // Save cart whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(
        'plant-shop-cart',
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error('Unable to save cart:', error);
    }
  }, [cartItems]);

  // Add product or increase its quantity
  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // Decrease quantity; remove item if quantity reaches zero
  function decreaseQuantity(productId) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove a product completely
  function removeFromCart(productId) {
    setCartItems((items) =>
      items.filter((item) => item.id !== productId)
    );
  }

  // Empty the entire cart
  function clearCart() {
    setCartItems([]);
  }

  // Calculate total number of items
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

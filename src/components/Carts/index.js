import React, { useState, useEffect } from "react";
import "./index.css";

function Cart({ selectProduct }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    console.log("Cart - selectProduct:", selectProduct);
  }, [selectProduct]);


  function handleIncrement() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  function handleDecrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function calculateTotal() {
    return quantity * (selectProduct?.price?.amount || 0);
  }

  return (
    <div>
      <div className="cart-container">
     
             <img
             src={selectProduct?.images?.nodes[0]?.originalSrc}
             alt="product-image"
             width="300px"
             height="300px"
           />
      <div className="cart-text">
        <b>{selectProduct?.title}</b>
        <br />
        <br />
        <p>{selectProduct?.handle}</p>
        <span>
          <button
            className="quantity-button"
            onClick={() => handleDecrement()}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="quantity-button"
            onClick={() => handleIncrement()}
          >
            +
          </button>
        </span>
      </div>
      <span className="total">₹ {calculateTotal()}</span>
      </div>
      <hr />
      <div className="container">
        <span className="cart-total">Subtotal</span>
        <span className="sum">₹ {calculateTotal()}</span>
      </div>
    </div>
  );
}

export default Cart;

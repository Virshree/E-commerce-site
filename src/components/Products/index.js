/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./index.css";
import { getAllProducts } from "../../api/ProductApi";
import Cart from "../Carts";
function Products() {


  const [productList, setProductList] = useState([]);
  const [selectProduct, setSelectProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const [show, setShow] = useState(false);


  const fetchProducts = async () => {
    const { data } = await getAllProducts();
    console.log(data);
    setProductList(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = (item) => {
    setSelectProduct(item);
    setQuantity(item.quantity || 0);
    setShow(true);
    handleCartShow();
  };
  
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
    if (selectProduct && Object.keys(selectProduct).length > 0) {
      return quantity * (selectProduct?.price?.amount || 0);
    }
    return 0;
  }
  
  function handleCartShow() {
    setShow(!show);
  }
  function      handleOpenModal(){
    setOpen(!open);
  }
  return (
    <div>
      <div>
        {show && (
          <div>
            <Cart selectProduct={selectProduct}  />
      
          </div>
        )}
      </div>
      <h2 className="product-container">
        <p className="product-text">All Products</p>

        <br />
        {productList?.map((item, index) => (
          <div className="product-box" key={index}>
            <img
              src={item?.images?.nodes[0]?.originalSrc}
              alt="product-image"
              width="300px"
              height="300px"
            />
            <h2>{item?.title}</h2>
            <h3>{item?.price?.amount}</h3>
            <button
              className="cart-button"
              disabled={item?.quantity === 10}
              onClick={() => handleClick(item)}
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Add to Cart
            </button>

          </div>
        ))}
        <div>
          {open && (
            <div>
              {/* <!-- Button trigger modal --> */}

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-container">
                      {selectProduct && (
                        <div>
                          <img
                            src={selectProduct?.images?.nodes[0]?.originalSrc}
                            alt="product-image"
                            width="300px"
                            height="300px"
                          />{" "}
                          <br />
                          <br />
                          <b>{selectProduct?.title}</b>
                          <br />
                          <br />
                          <span>{selectProduct?.handle}</span>
                          <br />
                          <span>
                            <br />

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
                          <br />
                          <br />
                          <span>
                            {selectProduct?.price?.amount} {"per Item"}
                          </span>
                        </div>
                      )}
                    </div>

                    <hr />
                    <span className="total-container">
                      <p>Subtotal</p>
                      <b>₹{calculateTotal()}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </h2>
    </div>
  );
}

export default Products;

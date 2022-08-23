import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, ButtonGroup } from "react-bootstrap";
import "./Cart.css";
import Alert from "react-bootstrap/Alert";
import image from "../Cart/emptycart.png";
import { BsFillTrashFill } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router";

function CartComponent({ setCartCount }: any) {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState<any[]>(
    JSON.parse(localStorage.getItem("cartProducts")!) || []
  );
  const [qty, setQty] = useState(Array(cartItem.length).fill(1));
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);

  const incrementCnt = (i: any) => {
    const tempQty = [...qty];
    tempQty[i] = tempQty[i] + 1;
    if (tempQty[i] <= cartItem[i].quantity) {
      setQty(tempQty);
    } else {
      setError(true);
    }
  };

  const decrementCnt = (i: any) => {
    const tempQty = [...qty];
    tempQty[i] = tempQty[i] - 1;
    if (tempQty[i] > 0) setQty(tempQty);
  };

  const deleteProduct = (i: any) => {
    setCartItem((prod) =>
      prod.filter((p) => {
        return p.id !== i;
      })
    );
    setFlag(!flag);
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItem));
    setCartCount(cartItem.length);
  }, [cartItem]);

  useEffect(() => {
    let sum = 0;
    cartItem.map((prod, index) => {
      sum = sum + prod.price * qty[index];
    });
    setTotalAmt(sum);
  }, [qty, flag]);
  return (
    <div>
      {error ? (
        <Alert variant="danger" className="w-75 m-5 mb-0 mt-0 ml-0">
          No more quantity is available of this product
        </Alert>
      ) : (
        ""
      )}
      <h3>Shopping Cart</h3>
      {cartItem?.length === 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={image} style={{ height: "500px", width: "500px" }}></img>
            <h3 className="text-muted">Your Cart is empty!</h3>
            <h6 className="text-muted">
              <small>Start shopping for awesome products</small>
            </h6>
          </div>
        </>
      ) : (
        ""
      )}
      {cartItem?.map((product: any, index: any) => {
        return (
          <>
            <div className="cart-item">
              <Card style={{ padding: "30px" }}>
                <Row>
                  <Col className="add-space">
                    <div className="cart-elements">
                      <img src={product.imageURL} className="cart-image"></img>
                      <span>
                        {product.name} <br />
                        Rs. {product.price}
                      </span>

                      <ButtonGroup
                        className="me-0 btn-grp"
                        aria-label="First group"
                      >
                        <Button
                          variant="secondary"
                          onClick={() => decrementCnt(index)}
                        >
                          -
                        </Button>
                        <Button variant="secondary" disabled>
                          {`Qty ${qty[index]}`}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => incrementCnt(index)}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <BsFillTrashFill
                        className="text-danger"
                        style={{ height: "30px", width: "30px" }}
                        onClick={() => deleteProduct(product.id)}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </>
        );
      })}
      {cartItem?.length > 0 ? (
        <div className="total-amount">
          <h4>
            Total Amount: <i className="text-muted">{"Rs." + totalAmt}</i>
          </h4>
          <Button
            variant="warning"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate("/place-order")}
          >
            Place Order
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CartComponent;

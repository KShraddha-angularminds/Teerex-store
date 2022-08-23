import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import "./ShowProducts.css";
import ProductApi from "../../services/ProductApi";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import FilterComponent from "../Filters/FilterComponent";

function ShowProducts({ setCartCount }: any) {
  const data = ProductApi(
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
  );
  const [prodData, setProdData] = useState(data);
  const [cartProduct, setCartProduct] = useState(
    JSON.parse(localStorage.getItem("cartProducts")!) || []
  );

  useEffect(() => {
    setProdData(data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
    setCartCount(cartProduct.length);
  }, [cartProduct]);

  const addProdToCart = (product: any) => {
    setCartProduct([...cartProduct, product]);
  };

  const handlesearch = (e: any) => {
    const filterProduct = data.filter((product) => {
      return (
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.color.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.type.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setProdData(filterProduct);
  };

  return (
    <div className="main-container">
      <div className="filter-section">
        <FilterComponent data={data} setProdData={setProdData} />
      </div>
      <Container className="mt-5 prod-section">
        <div className="sub-div" style={{ width: "400px" }}>
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <AiOutlineSearch style={{ height: "20px" }} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="filter by name"
                  onChange={(e) => handlesearch(e)}
                  style={{ height: "34px" }}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </div>
        <br></br>
        <Row>
          {prodData &&
            prodData.map((product: any) => {
              return (
                <>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                      <Card.Header>{product.name}</Card.Header>

                      <Card.Body>
                        <Card.Img variant="top" src={product.imageURL} />
                      </Card.Body>
                      <Card.Footer className="d-flex">
                        <Card.Text className="m-2">
                          <b> Rs. {product.price}</b>{" "}
                        </Card.Text>
                        <Button
                          style={{ marginLeft: "70px" }}
                          onClick={() => addProdToCart(product)}
                          variant="secondary"
                          disabled={cartProduct.find(
                            (prod: any) => prod.id == product.id
                          )}
                        >
                          Add to cart
                        </Button>
                      </Card.Footer>
                    </Card>
                    <br />
                  </Col>
                </>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default ShowProducts;

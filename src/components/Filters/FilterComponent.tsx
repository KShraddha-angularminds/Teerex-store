import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./FilterComponent.css";
function FilterComponent({ data, setProdData }: any) {
  const [checkedValues, setCheckedValues] = useState<any>({
    color: [],
    gender: [],
    price: [],
    type: [],
  });
  function range(start: any, end: any) {
    return Array(end - start + 1)
      .fill(undefined)
      .map((_, idx) => start + idx);
  }
  // var result = range(9, 18);
  const handleFilter = (e: any, filterType: string) => {
    console.log(e.target.checked + " " + e.target.value);
    let priceToFrom = e.target.value.split("-");
    //checkes for checboxes
    if (e.target.checked) {
      if (filterType == "price") {
        console.log(priceToFrom);
        setCheckedValues({
          ...checkedValues,
          [filterType]: [
            ...checkedValues[filterType],
            ...range(parseInt(priceToFrom[0]), parseInt(priceToFrom[1])),
          ],
        });
      } else {
        setCheckedValues({
          ...checkedValues,
          [filterType]: [...checkedValues[filterType], e.target.value],
        });
      }
    } //if
    else {
      if (filterType == "price") {
        let arr = checkedValues[filterType].filter(
          (each: any) => each <= priceToFrom[0] || each >= priceToFrom[1]
        );
        console.log(arr);
        setCheckedValues({ ...checkedValues, [filterType]: arr });
      } else {
        let arr = checkedValues[filterType].filter(
          (each: any) => each !== e.target.value
        );
        setCheckedValues({ ...checkedValues, [filterType]: arr });
      }
    } //else
  };

  useEffect(() => {
    let filterProd: any = data;
    let xyz: any = [];

    if (checkedValues.color.length > 0) {
      filterProd = filterProd.filter((product: any) => {
        return checkedValues.color.includes(product.color);
      });
    }

    if (checkedValues.gender.length > 0) {
      filterProd = filterProd.filter((product: any) => {
        return checkedValues.gender.includes(product.gender);
      });
    }

    if (checkedValues.type.length > 0) {
      filterProd = filterProd.filter((product: any) => {
        return checkedValues.type.includes(product.type);
      });
    }

    if (checkedValues.price.length > 0) {
      filterProd = filterProd.filter((product: any) => {
        return checkedValues.price.includes(product.price);
      });
    }

    console.log(checkedValues);
    setProdData(filterProd);
  }, [checkedValues]);

  // console.log(checkedValues);
  console.log(data);
  return (
    <div className="filter-item">
      <div className="color">
        <label className="heading">Color</label>
        <Form.Check
          type="switch"
          id="custom-switch"
          value="Red"
          label="Red"
          name="filter"
          onClick={(e) => handleFilter(e, "color")}
        />
        <Form.Check
          type="switch"
          label="Blue"
          value="Blue"
          id="custom-switch"
          name="filter"
          onClick={(e) => handleFilter(e, "color")}
        />
        <Form.Check
          type="switch"
          label="Green"
          value="Green"
          name="filter"
          id="custom-switch"
          onClick={(e) => handleFilter(e, "color")}
        />
      </div>
      <div className="color">
        <label className="heading">Gender</label>
        <Form.Check
          type="switch"
          id="custom-switch"
          value="Men"
          label="Men"
          onClick={(e) => handleFilter(e, "gender")}
        />
        <Form.Check
          type="switch"
          label="Women"
          value="Women"
          id="custom-switch"
          onClick={(e) => handleFilter(e, "gender")}
        />
      </div>
      <div className="color">
        <label className="heading">Price</label>
        <Form.Check
          type="switch"
          id="custom-switch"
          value="0-500"
          label="0-500 Rs."
          onClick={(e) => handleFilter(e, "price")}
        />
        <Form.Check
          type="switch"
          label="500-1000"
          value="500-1000"
          id="custom-switch"
          onClick={(e) => handleFilter(e, "price")}
        />
        <Form.Check
          type="switch"
          label="1000-1500"
          value="1000-1500"
          id="custom-switch"
          onClick={(e) => handleFilter(e, "price")}
        />
      </div>
      <div className="color">
        <label className="heading">Type</label>
        <Form.Check
          type="switch"
          id="custom-switch"
          value="Polo"
          label="Polo"
          onClick={(e) => handleFilter(e, "type")}
        />
        <Form.Check
          type="switch"
          label="Hoodie"
          value="Hoodie"
          id="custom-switch"
          onClick={(e) => handleFilter(e, "type")}
        />
        <Form.Check
          type="switch"
          label="Basic"
          value="Basic"
          id="custom-switch"
          onClick={(e) => handleFilter(e, "type")}
        />
      </div>
    </div>
  );
}

export default FilterComponent;

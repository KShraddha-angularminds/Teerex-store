import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
function ProductApi(url: string) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res: any) => setData(res.data))
      .catch((err) => {
        alert(err.message);
      });
  }, [url]);
  // console.log(data);
  return data;
}

export default ProductApi;

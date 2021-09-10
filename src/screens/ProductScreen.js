import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productId));

    return () => {};
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-results">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product?.image} alt="product"></img>
          </div>
          <div className="details-info">
            <ul className="detailss">
              <li>
                <h4>{product?.name}</h4>
              </li>
              <li>
                {product?.rating} Stars ({product?.numReviews})
              </li>
              <li> </li>
              <li>
                <div>Description: {product?.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul className="detailss">
              <li>Price: {product?.price}</li>
              <li>
                Status: {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </li>

              <li>
                Qty:
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 ? (
                  <button onClick={handleAddToCart} className="cart-button">
                    Add to cart
                  </button>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;

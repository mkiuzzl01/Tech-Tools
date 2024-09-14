import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UpVote_Button from "../../Shared/UpVote_Button/UpVote_Button";
const Trending_Product_Card = ({product,refetch,ownerEmail}) => {
  return (
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-auto h-52"
          />
        </figure>
        <div className="card-body">
          <Link to={`/Products_Details/${product._id}`}><h2 className="card-title hover:text-blue-500">{product.productName}</h2></Link>
          <div className="flex flex-row ">
            {product?.productTags.map((tag, idx) => (
              <p className="" key={idx}>
                <span className="bg-yellow-200 p-1 text-sm rounded-lg">{tag}</span>
              </p>
            ))}
          </div>
          <div>
            <p>{product.description.substring(0,100)} .........</p>
          </div>
          <div className="card-actions justify-end">
          <UpVote_Button vote={product.vote} id={product._id} refetch={refetch} ownerEmail={ownerEmail}></UpVote_Button>
          </div>
        </div>
      </div>
  );
};

Trending_Product_Card.propTypes = {
    product:PropTypes.object,
    refetch:PropTypes.func,
    ownerEmail:PropTypes.string,
};

export default Trending_Product_Card;

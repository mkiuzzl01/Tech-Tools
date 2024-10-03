import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UpVote_Button from "../UpVote_Button/UpVote_Button";

const Product_Card = ({ product,refetch,ownerEmail,productCard}) => {
  return (
    <div className="px-2 md:mx-0">
      <div className="flex card-compact rounded-lg justify-between items-center bg-base-100 border-2 hover:shadow-lg duration-300 hover:shadow-[#FFD7C4]">
        <figure>
          <img
            src={product.productImage}
            alt={product.productName}
            className={`${productCard ? 'w-36 h-36' : 'w-full h-40'}`}
          />
        </figure>
        <div className="card-body">
          <Link to={`/Products_Details/${product._id}`}>
            <h2 className="card-title hover:text-blue-500">
              {product.productName}
            </h2>
          </Link>
        <div className="flex flex-row">
            {product?.productTags.map((tag, idx) => (
              <p className="" key={idx}>
                <span className="text-violet-500 text-sm rounded-lg p-1">
                  {tag}
                </span>
              </p>
            ))}
          </div>
          
          <div className="card-actions justify-end">
            <UpVote_Button  vote={product.vote} id={product._id} refetch={refetch} ownerEmail={ownerEmail}></UpVote_Button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

Product_Card.propTypes = {
  product: PropTypes.object,
  refetch:PropTypes.func,
  ownerEmail:PropTypes.string,
  productCard:PropTypes.bool,
};

export default Product_Card;

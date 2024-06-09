import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";
import UpVote_Button from "../../Shared/UpVote_Button/UpVote_Button";

const Featured_Products_Card = ({ product }) => {
  return (
    <div>
      <div className="flex card-compact rounded-lg justify-between items-center bg-base-100 shadow-xl">
        <figure>
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-40"
          />
        </figure>
        <div className="card-body">
        <Link to={`/Products_Details/${product._id}`}><h2 className="card-title hover:text-blue-500">{product.productName}</h2></Link>
          <div className="flex flex-row ">
            {product?.productTags.map((tag, idx) => (
              <p className="" key={idx}>
                <span className="bg-yellow-400 text-sm rounded-lg">{tag}</span>
              </p>
            ))}
          </div>
          <div className="card-actions justify-end">
            <UpVote_Button vote={product.vote}></UpVote_Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Featured_Products_Card.propTypes = {
  product: PropTypes.object,
};

export default Featured_Products_Card;

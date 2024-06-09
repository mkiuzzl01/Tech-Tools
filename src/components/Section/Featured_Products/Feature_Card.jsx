import PropTypes from "prop-types";
import { MdHowToVote } from "react-icons/md";

const Feature_Card = ({ product }) => {
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
          <h2 className="card-title">{product.productName}</h2>
          <div className="flex flex-row ">
            {product?.productTags.map((tag, idx) => (
              <p className="" key={idx}>
                <span className="bg-yellow-400 text-sm rounded-lg">{tag}</span>
              </p>
            ))}
          </div>
          <div className="card-actions justify-end">
            <button title="Please Give a Vote" className="btn">
              <span>{product.vote}</span>
              <MdHowToVote />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Feature_Card.propTypes = {
  product: PropTypes.object,
};

export default Feature_Card;

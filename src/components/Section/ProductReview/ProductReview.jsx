import PropTypes from "prop-types";

const ProductReview = ({ userReviews }) => {
  const userRev = [];
  const review = userReviews.map((rev) => rev.reviewer);

  review.forEach((element) => {
    userRev.push(...element);
  });

  return (
    <div>
      {userRev.map((rev, idx) => (
        <div
          key={idx}
          className="flex w-full mt-2 border-2 card-compact rounded-lg justify-between items-center bg-base-100"
        >
          <figure>
            <img
              src={rev?.reviewerImage}
              alt={rev?.reviewerName}
              className="w-24 h-24"
            />
          </figure>
          <div className="card-body">
            <h1>Name:{rev?.reviewerName}</h1>
            <span className="text-sm">
              {rev?.email}
              <p>
                <span>Rating:</span>{" "}
                <span className="text-orange-400">{rev?.productRating}</span>
              </p>
            </span>
            <p>{rev?.reviewDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductReview.propTypes = {
  userReviews: PropTypes.array,
};

export default ProductReview;

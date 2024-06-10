import PropTypes from "prop-types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const animation = { duration: 20000, easing: (t) => t };

const ReviewSlider = ({ userReviews }) => {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 10,
    },
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div>
      <div ref={sliderRef} className="keen-slider fixed">
        {userReviews.map((review, idx) => (
          <div key={idx}>
            <div className="keen-slider__slide number-slide1">
              <div className="w-full p-8 rounded-md shadow-lg bg-[#10B981]">
                <p className="">“{review?.reviewDescription}”</p>

                <div className="flex flex-col lg:flex-row items-center mt-6 -mx-2">
                  <img
                    className="object-cover mx-2 rounded-full w-14 h-14"
                    src={review?.reviewerImage}
                    alt={review.reviewerName}
                  />

                  <div className="mx-2">
                    <h1 className="font-semibold text-white">
                      {review.reviewerName}
                    </h1>
                    <span className="text-sm">
                      {review?.reviewerEmail}
                      <p>
                        <span>Rating:</span>{" "}
                        <span className="text-orange-400">
                          {review?.productRating}
                        </span>
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReviewSlider.propTypes = {
  userReviews: PropTypes.object,
};
export default ReviewSlider;

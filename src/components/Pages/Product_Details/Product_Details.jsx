import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import UpVote_Button from "../../Shared/UpVote_Button/UpVote_Button";
import Report_Button from "../../Shared/Report_Button/Report_Button";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";
import ReviewSlider from "../../Slider/ReviewSlider/ReviewSlider";

const Product_Details = () => {
  const { user, warningToast } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Product_Details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/Product-Details/${id}`);
      return data;
    },
  });

  const { data: userReviews = [], isFetching } = useQuery({
    enabled: !!id,
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/review-products/${id}`);
      return data;
    },
  });

  if (isLoading || isFetching) return <Loading></Loading>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const reviewerName = form?.ReviewerName.value;
    const reviewerEmail = user?.email;
    const reviewerImage = form?.ReviewerImage.value;
    const reviewDescription = form?.ReviewDescription.value;
    const productRating = rating;
    const review = {
      reviewerName,
      reviewerImage,
      reviewerEmail,
      reviewDescription,
      productRating,
      ...{ product },
    };
    
    try {
      const { data } = await axiosSecure.post("/product-review", review);
      console.log(data);
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Review Accepted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      warningToast(error?.response?.data);
      // console.log(error?.response?.data);
    }
  };

  return (
    <div>
      <div>
        <ReviewSlider userReviews={userReviews}></ReviewSlider>
      </div>
      <div className="py-10">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-lg  border-2 max-w-xl">
              <div className="flex justify-center">
                <img src={product.productImage} alt="" />
              </div>
              <div className="p-6">
                <div>
                  <div className="flex flex-row mb-3 space-x-2">
                    {product?.productTags.map((tag, idx) => (
                      <p key={idx}>
                        <span className="bg-yellow-400 text-sm p-1 rounded-lg">
                          {tag}
                        </span>
                      </p>
                    ))}
                  </div>
                  <h1 className="text-3xl font-semibold">
                    {" "}
                    <span>Name:</span> <span>{product.productName}</span>
                  </h1>
                  <p>
                    <span className="font-semibold">Link: </span>{" "}
                    <span className="link-hover hover:text-blue-600">
                      {product.productLink}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>

                <div className="flex space-x-4 mt-4">
                  <UpVote_Button
                    ownerEmail={product?.ownerEmail}
                    vote={product.vote}
                    id={product._id}
                    refetch={refetch}
                  ></UpVote_Button>
                  <Report_Button
                    ownerEmail={product?.ownerEmail}
                    product={product}
                    user={user}
                    warningToast={warningToast}
                  ></Report_Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex lg:w-1/2 mt-14 lg:mt-0 justify-center">
            <div className="w-full rounded-lg">
              <div className="text-center">
                <div className="w-full p-8 rounded-lg border-2">
                  <div className="flex justify-center -mt-16 md:justify-end">
                    <img
                      className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                      alt={user?.displayName}
                      src={user?.photoURL}
                    />
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid  gap-6 mt-4 grid-cols-2">
                      <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="ReviewerName" className="label">
                          <span className="label-text">Reviewer Name</span>
                        </label>
                        <input
                          disabled
                          defaultValue={user?.displayName}
                          name="ReviewerName"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="ReviewerImage" className="label">
                          <span className="label-text">Reviewer Image</span>
                        </label>
                        <input
                          disabled
                          defaultValue={user?.photoURL}
                          name="ReviewerImage"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-2">
                        <label htmlFor="ReviewerImage" className="label">
                          <span className="label-text">Product Rating</span>
                        </label>
                        <div className="rating rating-lg">
                          {[...Array(5)].map((_, idx) => {
                            const currentIdx = idx + 1;
                            return (
                              <span
                                key={idx}
                                onMouseEnter={() => setHover(currentIdx)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(currentIdx)}
                                className={`mask mask-star-2 ${
                                  currentIdx <= (hover || rating)
                                    ? "bg-orange-400"
                                    : undefined
                                }`}
                              >
                                <CiStar className="text-4xl" />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <textarea
                          name="ReviewDescription"
                          cols="10"
                          rows="4"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Details;

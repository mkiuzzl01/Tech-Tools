import PropTypes from "prop-types";
import { WithContext as ReactTags } from "react-tag-input";
import "../AddProducts/Tags.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { GiOilySpiral } from "react-icons/gi";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateProduct = ({ setIsOpen, product, refetch }) => {
  const { user,errorToast} = useAuth();
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [updating,setUpdating] = useState(false);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  useEffect(() => {
    if (product?.productTags) {
      setTags(
        product.productTags.map((tag, index) => ({
          id: String(index),
          text: tag,
        }))
      );
    }
  }, [product]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const id = product._id;
    const productName = form.productName.value;
    const productLink = form.Link.value;
    const description = form.description.value;
    const productTags = tags.map((tag) => tag.text);
    const productImage = form.image.files[0];
    const formData = new FormData();
    formData.append("image", productImage);

    let imageURL = product?.productImage || null;
    if (productImage) {
      setUpdating(true);
      try {
        const { data } = await axiosPublic.post(imageHostingApi, formData, {
          headers: {
            "content-Type": "multipart/form-data",
          },
        });
        imageURL = data?.data?.display_url;
        setUpdating(false);
      } catch (error) {
        errorToast("Something Wrong")
        // console.log(error.message);
      }
    }

    try {
      setUpdating(true);
      const productImage = imageURL;
      const updateInfo = {
        productName,
        productLink,
        description,
        productTags,
        productImage,
      };
      const { data } = await axiosSecure.patch(
        `update-product/${id}`,
        updateInfo
      );
      if (data.modifiedCount > 0) {
        setUpdating(false);
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Update successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsOpen(false);
      }
    } catch (error) {
      errorToast("Something Wrong")
      // console.log(error.message);
    }
  };

  return (
    <div className="relative flex justify-center">
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full max-w-4xl sm:p-6 sm:align-middle">
            <h3
              className="text-2xl text-center font-medium leading-6 text-gray-800 capitalize dark:text-white"
              id="modal-title"
            >
              Update Your Product Information
            </h3>
            <p className="mt-2  text-center text-sm text-gray-500 dark:text-gray-400">
              Mention your Proper Information
            </p>

            <form onSubmit={handleUpdate} className="form-control p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="btn text-white btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="form-control">
                  <label htmlFor="productName">
                    <span className="text-white">Product Name:</span>
                  </label>
                  <input
                    required
                    defaultValue={product?.productName}
                    name="productName"
                    type="text"
                    placeholder="Product Name"
                    id="productName"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="Link">
                    <span className="text-white">Link:</span>
                  </label>
                  <input
                    defaultValue={product?.productLink}
                    required
                    name="Link"
                    type="text"
                    placeholder="Website link or landing page link of the product"
                    id="Link"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="ownerName">
                    <span className="text-white">Product Owner Name:</span>
                  </label>
                  <input
                    required
                    name="ownerName"
                    type="text"
                    defaultValue={user?.displayName}
                    disabled
                    placeholder="Product Owner Name"
                    id="ownerName"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="ownerEmail">
                    <span className="text-white">Product Owner Email:</span>
                  </label>
                  <input
                    required
                    name="ownerEmail"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    placeholder="Product Owner Email"
                    id="ownerEmail"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="ownerImage">
                    <span className="text-white">Product Owner Image:</span>
                  </label>
                  <input
                    required
                    name="ownerImage"
                    type="text"
                    defaultValue={user?.photoURL}
                    disabled
                    placeholder="Product Owner Image"
                    id="ownerImage"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="image">
                    <span className="text-white">Product Image:</span>
                  </label>
                  <input
                    id="image"
                    name="image"
                    accept="image/*"
                    type="file"
                    className="file-input file-input-bordered file-input-accent w-full"
                  />
                </div>

                <div className="from-control lg:col-span-2">
                  <label htmlFor="Tags">
                    <span className="text-white">Product Tags:</span>
                  </label>
                  <ReactTags
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="bottom"
                    autocomplete
                  />
                </div>

                <div className="form-control lg:col-span-2">
                  <label htmlFor="description">
                    <span className="text-white">Description:</span>
                  </label>
                  <textarea
                    defaultValue={product.description}
                    className="textarea input-bordered"
                    name="description"
                    id="description"
                    cols="12"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="my-8">
                <div className="lg:col-span-2">
                  <button className="btn hover:bg-[#004d99] w-full border-none bg-[#7fb800] dark:hover:text-white">
                    {updating ? (
                      <GiOilySpiral className="animate-spin text-2xl text-red-400" />
                    ) : (
                      <>update</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProduct.propTypes = {
  setIsOpen: PropTypes.func,
  product: PropTypes.object,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
};

export default UpdateProduct;

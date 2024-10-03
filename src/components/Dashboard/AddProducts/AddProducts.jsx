import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./Tags.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GiOilySpiral } from "react-icons/gi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProducts = () => {
  const { user, errorToast } = useAuth();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic();
  const [adding, setAdding] = useState(false);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    const form = e.target;
    const productName = form.productName.value;
    const productLink = form.Link.value;
    const ownerName = form.ownerName.value;
    const ownerEmail = form.ownerEmail.value;
    const ownerImage = form.ownerImage.value;
    const Time = new Date();
    const dateTime = Time.toLocaleString();
    const status = "pending";
    const vote = 0;
    const voter = [];
    const description = form.description.value;
    const productTags = tags.map((tag) => tag.text);

    const productImage = form.image.files[0];
    const formData = new FormData();
    formData.append("image", productImage);

    try {
      const { data } = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        const productImage = data?.data?.display_url;
        const productInfo = {
          productName,
          description,
          productLink,
          productImage,
          ownerImage,
          ownerName,
          ownerEmail,
          dateTime,
          status,
          vote,
          voter,
          productTags,
        };

        try {
          const { data } = await axiosSecure.post("/products", productInfo);
          if (data.insertedId) {
            setAdding(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Product added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/Dashboard/MyProducts");
          }
        } catch (error) {
          errorToast("Something Wrong");
        }
      }
    } catch (error) {
      errorToast("Something Wrong");
    }
  };

  return (
    <div>
      <div className=" rounded-lg bg-[#20282b]">
        <Helmet>
          <title>Tech-Tools | Add Product </title>
        </Helmet>
        <div className="md:px-5">
          <div className="space-y-4 py-5">
            <h1 className="text-4xl flex space-x-2 justify-center items-center">
              <span className="text-white">Add Product</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="form-control p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="form-control">
                <label htmlFor="productName">
                  <span className="text-white">Product Name:</span>
                </label>
                <input
                  required
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
                  required
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
                <button className="btn hover:bg-[#004d99] w-full border-none bg-[#3CB371] dark:hover:text-white">
                  {adding ? (
                    <GiOilySpiral className="animate-spin text-2xl text-red-400" />
                  ) : (
                    <>Add Product</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;

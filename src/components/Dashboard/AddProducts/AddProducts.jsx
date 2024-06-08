import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import "./Tags.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProducts = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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
    const description = form.description.value;
    const {...productTags} = tags.map((tag) => tag.text);

    // return console.log(productTags);

    const productImage = form.image.files[0];
    const formData = new FormData();
    formData.append("image", productImage);
    console.log(productImage);

    try {
      const { data } = await axios.post(imageHostingApi, formData, {
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
          productTags,
        };

        try {
          const { data } = await axiosPublic.post('/products',productInfo);
          if(data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Product added successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/Dashboard/MyProducts')
          }
        } catch (error) {
          console.log(error.message);
        }
        console.log(productInfo);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="max-w-4xl m-auto border-2 rounded-lg p-4 bg-sky-600">
        <Helmet>
          <title>Tech-Tools | Add Product </title>
        </Helmet>
        <div>
          <div className="space-y-4 mb-4">
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
                <input
                  required
                  type="submit"
                  className="btn hover:bg-[#004d99] w-full border-none bg-[#7fb800] dark:hover:text-white"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;

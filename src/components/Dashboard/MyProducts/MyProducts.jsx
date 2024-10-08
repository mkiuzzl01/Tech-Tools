import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiDelete, FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import { useState } from "react";
import Loading from "../../Shared/Loading/Loading";

const MyProducts = () => {
  const { user, errorToast } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [initialProduct,setInitialProduct] = useState({});

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["userProducts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${user.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>

  const handleDelete = (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/product-delete/${_id}`);
          // console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Product added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        }
      });
    } catch (error) {
      errorToast("Something wrong");
      //   console.log(error);
    }
  };
  return (
    <div className="rounded-lg">
      <Helmet>
        <title>Tech-Tools | My Product</title>
      </Helmet>
      {products.length > 0 ? (
        <div className="overflow-x-auto bg-[#001f3f] text-[rgba(240,240,240,0.82)] ">
          <h1 className="text-2xl font-bold text-center my-4">
            All Product Information
          </h1>
          <p className="text-center font-mono">
            {" "}
            Total Product : ({products.length})
          </p>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-orange-400">SL</th>
                <th className="text-orange-400">Product Info</th>
                <th className="text-orange-400">Number of votes</th>
                <th className="text-orange-400">Status</th>
                <th className="text-orange-400">Description</th>
                <th className="text-orange-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product._id}>
                  <th>
                    <label>{idx + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.productImage}
                            alt={product.productName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.productName}</div>
                        <div className="text-sm opacity-50">
                          {product.dateTime}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{product.vote}</p>
                  </td>
                  <td>
                    <p>{product.status}</p>
                  </td>
                  <td>
                    <p className="">
                      {product.doctorName}{" "}
                      {product?.description.substring(0, 30)} .....
                    </p>
                  </td>
                  <th>
                    <div className="flex flex-col items-center space-y-4">
                        <button
                          onClick={() => {setIsOpen(true);setInitialProduct(product)}}
                          title="Edit"
                          className="text-xl text-green-600"
                          >
                          <FiEdit></FiEdit>
                        </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(product._id)}
                        className="text-3xl text-red-500"
                      >
                        <FiDelete></FiDelete>
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {isOpen && <UpdateProduct refetch={refetch} isLoading={isLoading} product={initialProduct} setIsOpen={setIsOpen}></UpdateProduct>}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-6xl pt-32">Empty</h1>
        </div>
      )}
    </div>
  );
};

export default MyProducts;

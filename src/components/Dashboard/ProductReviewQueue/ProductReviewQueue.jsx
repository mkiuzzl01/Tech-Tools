import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";

const ProductReviewQueue = () => {
    const {errorToast} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = [] , refetch, isLoading } = useQuery({
    queryKey: ["ProductReviewQueue"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/Review-Queue");
      return data;
    },
  });
//   console.log(data);

if (isLoading) return <Loading></Loading>;

  const handleMakeFeature = async (id) => {
    const time = new Date();
    const dateTime = time.toLocaleString();
    // console.log(newTime,id);

    try {
      const { data } = await axiosSecure.patch(`/update-product/${id}`, {
        dateTime,
      });
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Product add to features",
            showConfirmButton: false,
            timer: 1500,
          });

      }
    } catch (error) {
        errorToast("Something Wrong");
    //   console.log(error.message);
    }
  };

  const handleAccept = async (id) => {
    const status = "Accepted";
    try {
      const { data } = await axiosSecure.patch(`/update-product/${id}`, {
        status,
      });
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Accepted product successfully",
            showConfirmButton: false,
            timer: 1500,
          });
     
      }
    } catch (error) {
        errorToast("Something Wrong");
    //   console.log(error.message);
    }
  };
  const handleReject = async (id) => {
    const status = "Rejected";
    try {
      const { data } = await axiosSecure.patch(`/update-product/${id}`, {
        status,
      });
      if (data.modifiedCount > 0) {
        refetch();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Rejected Product successfully",
            showConfirmButton: false,
            timer: 1500,
          });
      }
    } catch (error) {
        errorToast("Something Wrong");
    //   console.log(error.message);
    }
  };
  return (
    <div className="bg-[#001f3f] text-[rgba(240,240,240,0.82)] rounded-lg">
      <Helmet>
        <title>Tech-Tools | Product Review Queue</title>
      </Helmet>
      {data.length > 0 ? (
        <div className="overflow-x-auto p-10">
          <h1 className="text-2xl font-bold text-center my-4">
            All Product Information
          </h1>
          <p className="text-center font-mono">
            {" "}
            Total Product : ({data.length})
          </p>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-orange-400">SL</th>
                <th className="text-orange-400">Product Info</th>
                <th className="text-orange-400">Product Status</th>
                <th className="text-orange-400">View Details Page</th>
                <th className="text-orange-400">Make Featured</th>
                <th className="text-orange-400">Accept</th>
                <th className="text-orange-400">Reject</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, idx) => (
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
                          <span>Posted Time: </span>
                          <span>{product.dateTime}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.status}</td>
                  <td>
                    <Link to={`/Products_Details/${product?._id}`}>
                      <button className="btn btn-sm">View Details</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeFeature(product?._id)}
                      className="btn btn-sm"
                    >
                      Make Featured
                    </button>
                  </td>
                  <td>
                    <button
                    disabled={product.status === 'Accepted'}
                      onClick={() => handleAccept(product._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Accept
                    </button>
                  </td>
                  <th>
                    <button 
                    disabled={product.status === 'Reject'}
                    onClick={()=>handleReject(product._id)} className="btn btn-sm">Reject</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-6xl pt-32">Empty</h1>
        </div>
      )}
    </div>
  );
};

export default ProductReviewQueue;

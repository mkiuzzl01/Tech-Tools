import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ReportedContents = () => {
    const axiosSecure = useAxiosSecure();
    const {data = [], isLoading,refetch} = useQuery({
        queryKey:['reportedContent'],
        queryFn: async ()=>{
            const {data} = await axiosSecure.get('/reported-products');
            return data;
        }
    })
    // console.log(data);
    const handleDelete = async(id)=>{
        console.log(id);
        try {
          const {data} = await axiosSecure.delete(`/reported-product-delete/${id}`)
          console.log(data);
        } catch (error) {
          console.log(error);
        }
    }
    return (
        <div className="bg-[#001f3f] text-[rgba(240,240,240,0.82)] rounded-lg">
      <Helmet>
        <title>Tech-Tools | Reported Content</title>
      </Helmet>
      {data.length > 0 ? (
        <div className="overflow-x-auto p-10">
          <h1 className="text-2xl font-bold text-center my-4">
            Reported Products Information
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
                <th className="text-orange-400">Action</th>
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
                            src={product?.product.productImage}
                            alt={product?.product.productName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product?.product.productName}</div>
                        <div className="text-sm opacity-50">
                          <span>Posted Time: </span>
                          <span>{product?.product.dateTime}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.status}</td>
                  <td>
                    <Link to={`/Products_Details/${product?.product._id}`}>
                      <button className="btn btn-sm">View Details</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(product?.product._id)}
                      className="btn btn-sm"
                    >
                      Delete
                    </button>
                  </td>
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

export default ReportedContents;
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import UpVote_Button from "../../Shared/UpVote_Button/UpVote_Button";
import Report_Button from "../../Shared/Report_Button/Report_Button";

const Product_Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  console.log(id);
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["Product_Details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/Product-Details/${id}`);
      return data;
    },
  });
  console.log(product);
  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <section className="bg-gray-400">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            {product?.productName}
          </h1>

          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src={product.productImage}
                alt="client photo"
              />

              <div className="flex flex-col items-center">
                <div>
                  <p className="text-white">
                    <span className="font-bold">Link:</span> <span className="link">{product.productLink}</span>
                  </p>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-6 space-x-4 md:justify-start">
                  <UpVote_Button vote={product.vote}></UpVote_Button>
                  <Report_Button></Report_Button>
                </div>
                <div className="flex my-2">
                  {product.productTags.map((tag, idx) => (
                    <p className="mx-3" key={idx}>
                      <span className="bg-yellow-400 p-1 text-sm rounded-lg">
                        {tag}
                      </span>
                    </p>
                  ))}
                </div>
               
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Product_Details;

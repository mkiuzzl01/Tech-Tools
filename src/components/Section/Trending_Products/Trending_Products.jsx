import { useQuery } from "@tanstack/react-query";
import Section_Title from "../Section_Title/Section_Title";
import Trending_Product_Card from "./Trending_Product_Card";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const Trending_Products = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trendingProducts = [], isLoading,refetch} = useQuery({
    queryKey: ["Trending-Products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/Trending-Products");
      return data;
    },
  });

  if(isLoading) return <Loading></Loading>

  return (
    <div>
      <div className="my-10 flex justify-center">
        <Section_Title
          title="Trending Products"
          sub_title="Those Product are Trending Now in this site"
        ></Section_Title>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
       {
        trendingProducts.map(product=> <Trending_Product_Card key={product._id} product={product} refetch={refetch}></Trending_Product_Card>)
       }
      </div>
      <div className="flex justify-center my-10">
        <Link to='/Products'>
        <button className="btn btn-sm">Show All Product</button>
        </Link>
      </div>
    </div>
  );
};

export default Trending_Products;

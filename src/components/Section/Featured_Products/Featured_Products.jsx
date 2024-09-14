import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Section_Title from "../Section_Title/Section_Title";
import Loading from "../../Shared/Loading/Loading";
import Product_Card from "../../Shared/Product_Card/Product_Card";

const Featured_Products = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredProducts = [], isLoading,refetch } = useQuery({
    queryKey: ["Featured-Products"],
    queryFn: async () => {
      const {data} = await axiosPublic.get("/Featured-Products");
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <div className="flex justify-center">
        <Section_Title
          title="Featured-Products"
          sub_title="Discover Our Top Tech Tools"
          paragraph="Our featured products section highlights the most sought-after tech tools that are making waves in the industry. From powerful software solutions to innovative hardware, these products are chosen for their ability to deliver exceptional results and streamline your daily tasks. Upgrade your toolkit with our top picks."
        ></Section_Title>
      </div>
      <div className="my-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {featuredProducts.map((product) => (
          <Product_Card
            key={product._id}
            product={product}
            ownerEmail={product.ownerEmail}
            refetch={refetch}
          ></Product_Card>
        ))}
      </div>
    </div>
  );
};

export default Featured_Products;

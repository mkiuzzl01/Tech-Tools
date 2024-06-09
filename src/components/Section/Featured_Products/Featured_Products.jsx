import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Section_Title from "../Section_Title/Section_Title";
import Feature_Card from "./Feature_Card";

const Featured_Products = () => {
  const axiosPublic = useAxiosPublic();
  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["Featured-Products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/Featured-Products");
      return data;
    },
  });

  return (
    <div>
      <div className="flex justify-center">
        <Section_Title
          title="Featured-Products"
          sub_title="Those products recently posted"
        ></Section_Title>
      </div>
      <div className="my-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {featuredProducts.map((product) => (
          <Feature_Card key={product._id} product={product}></Feature_Card>
        ))}
      </div>
    </div>
  );
};

export default Featured_Products;

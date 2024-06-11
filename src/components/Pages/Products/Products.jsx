import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Product_Card from "../../Shared/Product_Card/Product_Card";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProduct] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosPublic.get(`/products?search=${search}&page=${currentPage}&size=${itemsPerPage}`);
      setProduct(data);
    };
    getData();
  }, [itemsPerPage,currentPage,search,axiosPublic]);


  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic.get(`/products-count?search=${search}`);
      setCount(data.numbers);
    };
    getCount();
  }, [search,axiosPublic]);


  //   console.log(product_count);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  const numberOfPages = Math.ceil(count/itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Helmet>
        <title>Tech-Tools | Products </title>
      </Helmet>

      <div className="my-4">
        <label className="input lg:w-1/2 input-bordered flex items-center gap-2">
          <input
            onChange={handleSearch}
            type="text"
            className="grow"
            name="key"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <h1>This is Product Page</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {products.map((product) => (
          <Product_Card
            key={product._id}
            ownerEmail={product.ownerEmail}
            product={product}
          ></Product_Card>
        ))}
      </div>
      {/* pagination */}
      <div className="text-center my-20 space-x-4">
        <button
            disabled={currentPage === 1}
            onClick={() => handlePagination(currentPage - 1)}
          className="btn items-center"
        >
          <span>{/* <FaArrowLeftLong className="text-blue-400 " /> */}</span>
          <span>Prev</span>
        </button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? " btn bg-green-500" : "btn"}
            onClick={() => handlePagination(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePagination(currentPage + 1)}
          className="btn items-center"
        >
          <span>Next</span>
          <span>{/* <FaArrowRightLong className="text-blue-400 " /> */}</span>
        </button>
      </div>
    </div>
  );
};

export default Products;

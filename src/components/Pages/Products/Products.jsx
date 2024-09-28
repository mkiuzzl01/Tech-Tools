import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Product_Card from "../../Shared/Product_Card/Product_Card";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import { CiSearch } from "react-icons/ci";

const Products = () => {
  const { loading, setLoading } = useAuth();
  const productCard = true;
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axiosPublic.get(
        `/products-search?search=${search}&page=${currentPage}&size=${itemsPerPage}`
      );
      setLoading(false);
      setProducts(data.data);
      setTotalDocuments(data.totalDocuments);
    };
    getData();
  }, [itemsPerPage, currentPage, search, axiosPublic]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const key = form.search.value;
    form.reset();
    setSearch(key);
    setCurrentPage(1);
  };

  const numberOfPages = Math.ceil(totalDocuments / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  if (loading) return <Loading></Loading>;



  return (
    <div>
      <Helmet>
        <title>Tech-Tools | Products </title>
      </Helmet>
      <form onSubmit={handleSearch}>
        <div className="my-4">
          <div className="flex">
            <input
              className="input input-bordered rounded-e rounded-3xl w-full"
              placeholder="Search here..."
              name="search"
            />
            <button className="btn join-item rounded-r-full">
              <span>
                <CiSearch className="text-xl" />
              </span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>
      {products.length > 0 ? (
        <div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {products.map((product) => (
              <Product_Card
                key={product._id}
                productCard={productCard}
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
              <span>
                <FaArrowLeftLong className="text-blue-400 " />
              </span>
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
              <span>
                <FaArrowRightLong className="text-blue-400 " />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-6xl pt-32">Empty</h1>
        </div>
      )}
    </div>
  );
};

export default Products;

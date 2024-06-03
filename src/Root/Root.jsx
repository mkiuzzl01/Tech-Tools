import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar/Navbar";
import Footer from "../components/Layouts/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <div>
      <div className="max-w-screen-xl m-auto">
        <header>
          <Navbar></Navbar>
        </header>
        <main className="min-h-[calc(100vh-288px)]">
          <Outlet></Outlet>
          <ToastContainer limit={3} autoClose={1000}/>
        </main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;

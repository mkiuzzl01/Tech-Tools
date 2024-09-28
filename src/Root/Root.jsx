import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar/Navbar";
import Footer from "../components/Layouts/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

const Root = () => {

  const bannerRef = useRef(null); 

  return (
    <div>
      <div className="max-w-screen-2xl m-auto px-2">
        <header className="sticky top-0 z-10">
          <Navbar bannerRef={bannerRef}></Navbar>
        </header>
        <main className="min-h-[calc(100vh-288px)]">
          <Outlet context={{ bannerRef }}></Outlet>
        </main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;

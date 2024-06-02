import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Route.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckOut = ({setIsOpen,data,refetch}) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransaction] = useState("");
  // const navigate = useNavigate();

    const cost = 45;
  const postData = async () => {

    const res = await axios.post(
      "http://localhost:5000/payment-intent",{cost}
    );
    setClientSecret(res.data.clientSecret);
  };
  useEffect(() => {
    postData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    }
    if (paymentMethod) {
      setError("");
      //   console.log("Show", paymentMethod);
    }

    //confirm payment
    const { err, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );
    if (err) {
      setError(error.message);
    } else {
      setTransaction(paymentIntent.id);
      if (paymentIntent.status === "succeeded") {

        const subscription = "Verified";

    try {
     await axiosSecure.patch(
        `/user-subscription/${data._id}`,
        { subscription }
      );
      if (userSubscription.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Subscription Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
        setIsOpen(false);
        // console.log(paymentIntent);
      }
    }
  };

  return (
    <div className="lg:p-5 shadow-md rounded-lg border-2">
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border border-dashed p-5 rounded-lg"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex justify-center">
          <button
            className="btn w-full mt-5 bg-white"
            type="submit"
          >
            Pay
          </button>
        </div>

        <p className="text-red-500">{error}</p>
        <div>
          {transactionID && (
            <span className="text-green-500">
              {" "}
              Your Transaction ID: {transactionID}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

CheckOut.propTypes = {
  bookInfo: PropTypes.object,
};

export default CheckOut;

import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckOut = ({ setIsOpen, data, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user, errorToast } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransaction] = useState("");

  const cost = 45;
  const postData = async () => {
    const res = await axios.post("https://tech-tools-server-site.vercel.app/payment-intent", {
      cost
    });
    setClientSecret(res.data.clientSecret);
  };
  useEffect(() => {
    postData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hello", data);
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
      console.log(err);
      setError(error.message);
    } else {
      setTransaction(paymentIntent.id);
      if (paymentIntent.status === "succeeded") {
        const id = data?._id;
        const subscription = "Verified";

        try {
          const response = await axiosSecure.patch(`/user-subscription/${id}`, {
            subscription,
          });
          // console.log(response.data);
          if (response?.data.modifiedCount > 0) {
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
          errorToast("Something wrong");
          console.log(error);
        }
        setIsOpen(false);
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
                color: "#ffff",
                "::placeholder": {
                  color: "#ffff",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex justify-center">
          <button className="btn w-full mt-5" type="submit">
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
  data: PropTypes.object,
  setIsOpen: PropTypes.bool,
  refetch: PropTypes.func,
};

export default CheckOut;

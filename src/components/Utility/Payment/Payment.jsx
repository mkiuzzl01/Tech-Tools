import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "../CheckOut/CheckOut";
import { loadStripe } from "@stripe/stripe-js";

//todo add stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);
const Payment = ({ setIsOpen,data,refetch }) => {
  return (
    <div className="relative z-50 flex justify-center">
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-slate-600 sm:my-8 sm:w-full max-w-4xl sm:p-6 sm:align-middle">
            <h3
              className="text-2xl text-center font-medium leading-6  capitalize text-white"
              id="modal-title"
            >
              Subscription by Payment
            </h3>

            <div className="my-12">
              <h1 className="text-2xl font-semibold py-2">
                Insert your Bank Card Number:
              </h1>
              <button
                onClick={() => setIsOpen(false)}
                className="btn text-white btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <Elements stripe={stripePromise}>
                <CheckOut data={data} refetch={refetch} setIsOpen={setIsOpen}></CheckOut>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

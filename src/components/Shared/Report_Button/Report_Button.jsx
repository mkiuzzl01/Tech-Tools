import PropTypes from "prop-types";
import { useState } from "react";
import { MdReportGmailerrorred } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Report_Button = ({ product, user,warningToast,refetch}) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const report = e?.target?.report?.value || "";
    const reporterEmail = user?.email;
    const info = { product, reporterEmail, report };

    try {
      const { data } = await axiosSecure.post("/reports", info);
      // console.log(data);
      if (data.insertedId ||data.modifiedCount>0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Report Submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsOpen(false);
      }
    } catch (error) {
      // console.log(error);
      setIsOpen(false);
      warningToast(error?.response?.data || 'Something Wrong');
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        title="Report Post"
        className="btn flex justify-center items-center text-red-500"
      >
        <MdReportGmailerrorred></MdReportGmailerrorred>
        <span>Report</span>
      </button>
      <div>
        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl rtl:text-right bg-[#F59E0B] sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn text-white btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-2 text-center">
                      <h3
                        className="text-lg font-medium leading-6 capitalize "
                        id="modal-title"
                      >
                        <MdReportGmailerrorred className="text-2xl text-yellow-100" />{" "}
                        <span>Report</span>
                      </h3>

                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">Spam</span>
                          <input
                            type="radio"
                            name="report"
                            className="radio checked:bg-red-500"
                            value="Spam"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">
                            Duplicate
                          </span>
                          <input
                            type="radio"
                            name="report"
                            className="radio checked:bg-blue-500"
                            value="Duplicate"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">Harmful</span>
                          <input
                            type="radio"
                            name="report"
                            className="radio checked:bg-red-500"
                            value="Harmful"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">
                            Not Working / Needs Editing
                          </span>
                          <input
                            type="radio"
                            name="report"
                            className="radio checked:bg-blue-500"
                            value="Not Working / Needs Editing"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">
                            Self-promotion
                          </span>
                          <input
                            type="radio"
                            name="report"
                            className="radio checked:bg-red-500"
                            value="Self-promotion"
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">
                            Artificially generated (e.g. ChatGPT)
                          </span>
                          <input
                            type="radio"
                            name="report"
                            className="radio checked:bg-blue-500"
                            value="Artificially generated (e.g. ChatGPT)"
                          />
                        </label>
                      </div>
                      <div className="from-control">
                        <input
                          className="btn w-full btn-sm"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Report_Button.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
  warningToast:PropTypes.func,
  ownerEmail:PropTypes.string,
  refetch:PropTypes.func,
};

export default Report_Button;

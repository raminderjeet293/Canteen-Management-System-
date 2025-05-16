import React, { useState, useEffect } from "react";
import classes from "./paymentSuccessPage.module.css";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(true); // Set payment as successful after 2 seconds for demo
    }, 2000);
  }, []);

  const navigate = useNavigate(); // 👈 Initialize

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // Redirect to home page after clicking "Done"
  };

  return (
    <div className={classes.successContainer}>
      <div className={classes.successCard}>
        <div className={classes.successHeader}>
          <h2>Payment Successful</h2>
          <p className={classes.successMessage}>
            Your payment of ₹500.00 has been successfully processed.
          </p>
        </div>

        {/* Animated Checkmark */}
        <div className={classes.checkmark}>
          {isSuccess ? (
            <svg
              className={classes.animatedTick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className={classes.tickCircle}
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className={classes.tickCheck}
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          ) : (
            <div className={classes.loadingSpinner}></div>
          )}
        </div>

        {/* Success Details */}
        <div className={classes.paymentDetails}>
          <p>Transaction ID: XYZ123456789</p>
          <p>Date: 19th April 2025</p>
        </div>

        <div className={classes.buttonsContainer}>
          <button
            className={classes.doneButton}
            type="submit"
            onClick={handleSubmit}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

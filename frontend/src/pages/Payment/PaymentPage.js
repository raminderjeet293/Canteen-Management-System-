// import React, { useState, useEffect } from "react";
// import classes from "./paymentPage.module.css";
// import { getNewOrderForCurrentUser } from "../../services/orderService";
// import Title from "../../components/Title/Title";
// import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
// import PaypalButtons from "../../components/PaypalButtons/PaypalButtons";

// export default function PaymentPage() {
//   const [order, setOrder] = useState();
//   //getting order from server and passing it to the payment page
//   useEffect(() => {
//     getNewOrderForCurrentUser().then((data) => setOrder(data));
//   }, []);

//   if (!order) return;

//   return (
//     <>
//       <div className={classes.container}>
//         <div className={classes.content}>
//           <Title title="Order Form" fontSize="1.6rem" />
//           <div className={classes.summary}>
//             <div>
//               <h3>Name:</h3>
//               <span>{order.name}</span>
//             </div>
//           </div>
//           <OrderItemsList order={order} />

//           <div className={classes.buttons_container}>
//             <div className={classes.buttons}>
//               <PaypalButtons order={order} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import classes from "./paymentPage.module.css";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "500.00",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate(); // 👈 Initialize

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `₹${formData.amount} payment initiated for ${formData.name} (Demo Only)`
    );
    navigate("/payment-success");
  };

  return (
    <div className={classes.paymentContainer}>
      <div className={classes.paymentCard}>
        <div className={classes.paymentHeader}>
          <h2>Complete Your Payment</h2>
          <p className={classes.orderDetails}>
            Pay ₹{formData.amount} to Canteen CMS
          </p>
        </div>

        <div className={classes.progressContainer}>
          <div className={classes.progress}></div>
        </div>

        <form className={classes.paymentContent} onSubmit={handleSubmit}>
          <div className={classes.summary}>
            <div className={classes.summaryItem}>
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.summaryItem}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.summaryItem}>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.summaryItem}>
              <span>Amount</span>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                readOnly
              />
            </div>
          </div>

          {/* <div className={classes.paymentMethod}>
            <span>Pay using UPI / Wallet / Card</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/UPI-Logo-vector.svg/512px-UPI-Logo-vector.svg.png"
              alt="UPI"
            />
          </div> */}

          <div className={classes.paymentMethod}>
            <span className={classes.methodTitle}>Choose Payment Method</span>

            {/* UPI */}
            <div className={classes.methodOption}>
              <input type="radio" id="upi" name="paymentMethod" value="UPI" />
              <label htmlFor="upi">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCn8RYUIcHHl9w_iUkguiIDaEz71UpUpT_JFeOiyD4TJdUqKqi4tqPsktkbHPrHZ6AO38&usqp=CAU"
                  alt="UPI"
                />
                UPI
              </label>
            </div>
            <div className={classes.addMethod}>
              <input
                type="text"
                name="newUpi"
                placeholder="Enter your UPI ID (e.g. username@upi)"
                className={classes.inputField}
              />
            </div>

            {/* Card */}
            <div className={classes.methodOption}>
              <input type="radio" id="card" name="paymentMethod" value="Card" />
              <label htmlFor="card">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Card"
                />
                Credit/Debit Card
              </label>
            </div>
            <div className={classes.addMethod}>
              <input
                type="text"
                placeholder="Card Number"
                className={classes.inputField}
              />
              <input
                type="text"
                placeholder="MM/YY"
                className={classes.inputField}
              />
              <input
                type="password"
                placeholder="CVV"
                className={classes.inputField}
              />
            </div>

            {/* Net Banking */}
            <div className={classes.methodOption}>
              <input
                type="radio"
                id="netbanking"
                name="paymentMethod"
                value="NetBanking"
              />
              <label htmlFor="netbanking">
                <img
                  src="https://e7.pngegg.com/pngimages/1003/913/png-clipart-computer-icons-bank-bank-online-banking-retail-banking.png"
                  alt="NetBanking"
                />
                Net Banking
              </label>
            </div>
            <div className={classes.addMethod}>
              <select className={classes.inputField}>
                <option value="">Select Your Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
          </div>

          <div className={classes.buttonsContainer}>
            <button className={classes.payButton} type="submit">
              Pay ₹{formData.amount}
            </button>
          </div>

          <p className={classes["payment-note"]}>
            This is a demo payment UI. No actual transaction will occur.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

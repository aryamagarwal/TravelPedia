import React, { useState } from 'react';
import './CheckOut.css'; // Import the CSS file

function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // ... rest of your component code

  return (
    <div className="checkout-page">
      <div className="contact-details">
        <h2>Contact Details</h2>
        <p>We'll use this information to send you confirmation and updates about your booking.</p>
        <div className="contact-details-wrapper">
        
          <form>
            <div className="name-inputs">
              <label htmlFor="firstName">First Name</label>
              
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
                &nbsp;     &nbsp;     &nbsp;     &nbsp;
              <label htmlFor="lastName">Last Name</label>
                  &nbsp;     &nbsp;
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength="15"
              style={{ width: '100%' }} // Set phone number input width
            />
            <div className="checkbox-container">
              <input type="checkbox" id="receiveSmsUpdates" />
              <label htmlFor="receiveSmsUpdates">Receive SMS updates about your booking. Message rates may apply.</label>
            </div>
          </form>
        </div>
      </div>
      <div className="activity-payment-details">
        <div className="activity-details">
          <h2>Activity Details</h2>
          {/* This section would display information about the activity being booked */}
          <p>All Inclusive Day Trip to Taj Mahal, Agra Fort and Baby Taj from Delhi by Car</p>
          <p>(233 reviews)</p>
          <div className="activity-details-items">
            <p>Car Guide Entrance + Lunch-2:30 am</p>
            <p>Wednesday, April 17, 2024</p>
            <p>2 Adults</p>
            <p>Non-refundable</p>
          </div>
        </div>
        <div className="payment-details">
          <h2>Payment Details</h2>
          <div className="booking-fee">
            <p>Booking Fee</p>
            <p>₹0.00</p>
          </div>
          <div className="sub-total">
            <p>Subtotal</p>
            <p>₹16,605.42</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>₹16,605.42</p>
          </div>
          <div className="promo-code">
            <label htmlFor="promoCode">Promo Code</label>
            <input type="text" name="promoCode" id="promoCode" />
            <p>Book with confidence</p>
            <p>Lowest price guarantee</p>
            <p>Find it cheaper? We'll refund the difference</p>
          </div>
          <button type="submit">Next</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

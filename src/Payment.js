import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');

  //   adding two bits of state to handle error and disable state
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  //   creating client secret state
  //   we need to request a client secret from stripe before we can process the payment
  const [clientSecret, setClientSecret] = useState(true);

  const handleSubmit = async (event) => {
    //   stripe stuff goes in here
    event.preventDefault();
    // we disable the button when processing to stop the button being pressed more than once
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //   paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        // using history.replace will mean the user will not come back to the payment page if they press the back button
        history.replace('/orders');
      });
  };

  //   !! whenever the basket changes, it will update the client secret which allows us to take payment
  //   use effect is a piece of code which can have some dependancies
  // this will run any time the payment component loads or the variables inside change
  useEffect(() => {
    // generate the stripe client secret
    // whenever the basket changes we would need to get a new secret
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // stripe expects total in sub units so pence vs pounds
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleChange = (event) => {
    //   Listen for changes inside the card element
    // and display any errors as the customer types their card details
    // is the event is empty disable the button
    setDisabled(event.empty);
    // if there is an error message show the error message, if not show nothing
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length}</Link>)
        </h1>

        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Kent, TN28</p>
          </div>
        </div>

        {/* payment section - review item */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__item">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>

        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe bits go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'£'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

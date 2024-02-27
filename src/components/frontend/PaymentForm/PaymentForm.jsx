/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAxios from "@/services/useAxios";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { ErrorInfo, LoadSpinner } from "@/components/Icons";

function PaymentForm({ doctor, slot, patient, setIsSuccess }) {
  const api = useAxios();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardholder_name: "",
    email: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleNumberChange = (e) => {
    if (e.error) {
      setFormErrors({ ...formErrors, cardNumber: e.error.message });
    } else {
      setFormErrors({ ...formErrors, cardNumber: null });
    }
  };
  const handleCVCChange = (e) => {
    if (e.error) {
      setFormErrors({ ...formErrors, cvc: e.error.message });
    } else {
      setFormErrors({ ...formErrors, cvc: null });
    }
  };
  const handleExpiryChange = (e) => {
    if (e.error) {
      setFormErrors({ ...formErrors, expiry: e.error.message });
    } else {
      setFormErrors({ ...formErrors, expiry: null });
    }
  };
  const validateForm = () => {
    let errors = {};
    if (!isEmailValid) {
      errors.email = "Please enter a valid email address.";
    }
    if (formData.cardholder_name.length < 1) {
      errors.cardholder_name = "Cardholder name is Required";
    }
    const cardNumber = elements.getElement(CardNumberElement);
    const cardCVC = elements.getElement(CardCvcElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    if (!cardNumber._complete) {
      errors.cardNumber = "Please enter a valid card number.";
    }
    if (!cardCVC._complete) {
      errors.cvc = "Please enter a valid CVC.";
    }
    if (!cardExpiry._complete) {
      errors.expiry = "Please enter a valid expiry date.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const valid = validateForm();
    if (valid) {
      setIsSubmitting(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: formData.cardholder_name,
          email: formData.email,
        },
      });
      if (error) {
        setPaymentError(error.message);
      } else {
        let data = {
          email: formData?.email,
          doctor: doctor?.id,
          patient: patient?.id,
          appointment_slot: slot?.id,
          amount: doctor?.consultation_fee + 100,
          payment_method_id: paymentMethod?.id,
        };
        api
          .post("bookings/payment", data)
          .then((res) => {
            setIsSuccess(true);
            setIsSubmitting(false);
          })
          .catch((error) => {
            setPaymentError(error.response?.data?.error);
            if (
              error.response.status === 404 ||
              error.response.status === 409
            ) {
              setTimeout(() => {
                navigate(-1);
              }, 3000);
            }
            setIsSubmitting(false);
          });
      }
    }
  };
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(formData.email));
  }, [formData.email]);
  return (
    <form onSubmit={handleFormSubmit} className="p-4 md:p-8">
      {paymentError && (
        <p className="text-red-500 bg-red-100 text-center py-1 -mt-4 mb-4">
          {paymentError}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative mb-4">
          <Label className="block mb-2">Cardholder Name</Label>
          <Input
            type="text"
            name="cardholder_name"
            value={formData.cardholder_name}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {formErrors?.cardholder_name && (
            <small className="block text-red-600 my-1">
              <ErrorInfo /> {formErrors.cardholder_name}
            </small>
          )}
        </div>
        <div className="relative mb-4">
          <Label className="block mb-2">Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {formErrors?.email && (
            <small className="block text-red-600 my-1">
              <ErrorInfo /> {formErrors.email}
            </small>
          )}
        </div>
      </div>
      <div className="relative">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="w-full md:w-[60%]">
            <Label className="block mb-2">Credit or Debit Card</Label>
            <CardNumberElement
              className="stripe-elements"
              onChange={handleNumberChange}
            />
            {formErrors?.cardNumber && (
              <small className="block text-red-600 my-1">
                <ErrorInfo /> {formErrors.cardNumber}
              </small>
            )}
          </div>
          <div className="w-[45%] md:w-[15%]">
            <Label className="block mb-2">CVC</Label>
            <CardCvcElement
              className="stripe-elements"
              onChange={handleCVCChange}
            />
            {formErrors?.cvc && (
              <small className="block text-red-600 my-1">
                <ErrorInfo /> {formErrors.cvc}
              </small>
            )}
          </div>
          <div className="w-[52%] md:w-[22%]">
            <Label className="block mb-2">Expiry</Label>
            <CardExpiryElement
              className="stripe-elements"
              onChange={handleExpiryChange}
            />
            {formErrors?.expiry && (
              <small className="block text-red-600 my-1">
                <ErrorInfo /> {formErrors.expiry}
              </small>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary disabled:bg-gray-600 disabled:cursor-not-allowed text-white w-[200px] py-2 rounded-[8px]"
        >
          {isSubmitting ? <LoadSpinner /> : "Pay"}
        </button>
      </div>
    </form>
  );
}

PaymentForm.propTypes = {
  doctor: PropTypes.object.isRequired,
  slot: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  setIsSuccess: PropTypes.func.isRequired,
};

export default PaymentForm;

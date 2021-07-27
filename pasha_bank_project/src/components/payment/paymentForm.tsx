import React, { useEffect, useState } from 'react'
import './paymentStyle.scss'
import { useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
const PaymentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is Required'),
  number: Yup.number()
    .required('Card Number is Required'),
  expiryData: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Expiration Date is Required'),
  security: Yup.number()
    .required('Security Code is Required'),
  postal: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Postal/ZIP code is Required'),
});
export const PaymentForm = () => {
  let subscriptionPrice: string[] = ['1.99', '18.99', '0.99']
  const [errorView, setErrorView] = useState<string>("error-view")
  const history = useHistory()
  const [price, setPrice] = useState(subscriptionPrice);
  const [zIndex,setZIndex] = useState<string>("")
  const [paymentAmount, setPaymentAmount] = useState<any>("paypal-button-container-P-0RU154546Y327144XMDSZ7WI")
  useEffect(() => {
    setPaymentAmount(localStorage.getItem("payment") == 'yearly' || localStorage.getItem("payment") == null ? "paypal-button-container-P-0RU154546Y327144XMDSZ7WI" : localStorage.getItem("payment") == 'monthly' ? "paypal-button-container-P-07H15729G3048283WMDS2FVQ" : "paypal-button-container-P-4MX13799SV939400HMDS2RWQ"
    )
  }, [localStorage.getItem("payment")])
  const [errorMessage, setErrorMessage] = useState('')
  return(
    <Formik
    initialValues={{
      name: '',
      number: '',
      expiryData: '',
      security: '',
      postal: ''
    }}
    style={{zIndex:-2}}
    validationSchema={PaymentSchema}
    onSubmit={() => {
      localStorage.setItem("subscribed", 'true');
      history.push(`/main/${sessionStorage.getItem("id")}`)
    }}
  >
    {({ errors, touched, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="PaymentAmount" className={`label-payment-area ${zIndex}`} >Payment amount</label>
          <div className="amount-placeholder">
            <span>$</span>
            <span>{sessionStorage.getItem("amount") == null ? price[1] : sessionStorage.getItem("amount")}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="NameOnCard" className={`label-payment-area ${zIndex}`}>Name on card</label>
          {errors.name ? <Field name="name" id="NameOnCard" placeholder="Card Owner Name" className="form-control" type="text" style={{ border: "1px solid red" }} /> : <Field name="name" placeholder="Card Owner Name" id="NameOnCard" className="form-control" type="text" />}
          {errors.name && touched.name ? (
            <div className="error-view">{errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="CreditCardNumber" className={`label-payment-area ${zIndex}`}>Card number</label>
          {errors.number ? <Field name="number" placeholder="Card Number" id="NumberonCard" className="form-control number-validation" maxLength="17" type="number" style={{ border: "1px solid red" }} /> : <Field name="number" placeholder="Card Number" id="NumberonCard" className="form-control number-validation" type="number" />}
          <span className={`${errorView}`} style={{ textAlign: "left" }}>{errorMessage}</span>
        </div>
        <div className="expiry-date-group form-group">
          <label htmlFor="ExpiryDate" className={`label-payment-area ${zIndex}`}>Expiry date</label>
          {errors.expiryData ? <Field placeholder="MM / YY" style={{ lineHeight: 1.5, padding: '0.2rem 0.75rem', border: "1px solid red" }} id="expirydata" className="form-control number-validation" name="expiryData" /> : <Field placeholder="MM / YY" style={{ lineHeight: 1.5, padding: '0.2rem 0.75rem' }} id="expiryData" className="form-control number-validation" name="expiryData" />}
          {errors.expiryData && touched.expiryData ? <div className="error-view">{errors.expiryData}</div> : null}
        </div>
        <div className="security-code-group form-group">
          <label htmlFor="SecurityCode" className={`label-payment-area ${zIndex}`}>CVC/CVV</label>
          <div className="input-container" >
            {errors.security ? <Field name="security" placeholder="CVV" type="number" id="SecurityCode" style={{ border: "1px solid red" }} className={`form-control number-validation ${zIndex}`} /> : <Field name="security" type="number" placeholder="CVV" id="SecurityCode" className={`form-control number-validation ${zIndex}`}/>}
            {errors.security && touched.security ? (
              <div className="error-view">{errors.security}</div>
            ) : null}
          </div>
        </div>
        <div className="zip-code-group form-group">
          <label htmlFor="ZIPCode" className="label-payment-area">ZIP/Postal code</label>
          <div className="input-container">
            {errors.postal ? <Field placeholder="Zip/Postal Code" name="postal" id="ZIPCode" type="text" style={{ border: "1px solid red" }} className={`form-control number-validation ${zIndex}`} /> : <Field placeholder="Zip/Postal Code" name="postal" id="ZIPCode" className={`form-control number-validation ${zIndex}`} />}
            {errors.postal && touched.postal ? (
              <div className="error-view">{errors.postal}</div>
            ) : null}
          </div>
        </div>
        <Button type="submit" className={`mt-4 ${zIndex}`} style={{ backgroundColor: "#EA5A41" }}>Make Payment </Button>
        <div id={paymentAmount} className="align-middle mt-3" ></div>
      </form>
    )}
  </Formik>
  )}


  export default PaymentForm
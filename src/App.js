import React, { Fragment, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Input,
  Container,
  FormFeedback,
  Form,
  Button,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import EXYBackEnd from './XYZBackEnd.js';
import XYZFrontEnd from './XYZFrontEnd.js';

function App() {
  const [ termsAndConditionModal, setTermsAndConditionModal] = useState(false);
  const [ exam , setExam ] = useState(1);
  const { control, handleSubmit, register, errors, reset, getValues, setValue } = useForm();
  const [ products, setProducts ] = useState([]);
  const [ shipping, setShipping ] = useState([]);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [formData, setFormData] = useState({
    card_no: "",
    cvv_cvc: "",
    validity_mm: "",
    validity_yy: "",
    card_holders_no: "",
    terms_and_aggreement: ""
  })
  const [paymentMethod, setPaymentMethod ] = useState(1) // 1 for credit card, 2 for Gift Card and 3 for Paypal Card
  const onSubmit = (data)=>{console.log()}

  const onFormChange = (e) => {
    console.log(e)
    setFormData({...formData, [e.target.name]:e.target.value})
    return e;};

  function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (let i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  useEffect(()=>{
    setProducts([
      {name:"Apple - Ipad with Retina display Wi-Fi - 32gb - White", price:499.00},
      {name:"16GB A Series Walkman Video MP3", price:130.00},
    ])
    setShipping([
      {name:"Fedex", price:13.99},
    ])
  },[])

  useEffect(()=>{
    let total_price =0;
    if(products.length){
      total_price = products.reduce(getTotal).price;
    }
    if(shipping.length){
      total_price += shipping.reduce(getTotal).price;
    }
    setTotalPrice(total_price);
  },[products, shipping])

  const getTotal = (accumulator, currentValue) => ({price: JSON.parse(accumulator.price) + JSON.parse(currentValue.price)});

  const toggleTermAndConditionModal = () =>{
    setTermsAndConditionModal(!termsAndConditionModal)
    sample();
  }

  const sample2 = async ()=>{
   let x = ()=>{
      for (let j = 1; j <= 20; j++){
        setTimeout(console.log("j"+j),1000000)
      }
    }
    x();
  }

  const time = 1000;
  const sample = () => {
    for (let i = 1; i <= 20; i++ ){
      console.log("i"+ i)
      sample2();
    }

  }
  return (
    <Fragment>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="exam-inner">
                <Container>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-primary" onClick={()=>setExam(1)}>Machine Problem</button>
                    <button type="button" className="btn btn-primary" onClick={()=>setExam(2)}>XYZ Front End</button>
                    <button type="button" className="btn btn-primary" onClick={()=>setExam(3)}>XYZ Back End</button>
                  </div>
                    {exam==1?
                    <Container>
                    <div className="row">
                      <div className="col-lg-10 mx-auto">
                          <div className="card ">
                          <div className="card-header">
                              <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                                  <div className="mb-3">
                                        Demo Store
                                  </div>
                              </div>
                          </div>
                          <div className="card-body">
                            <h4 className="text-left mb-4">
                                Checkout
                            </h4>
                            <h5 className="text-left">
                                Products
                            </h5>
                            <div className="mb-3">
                              {
                                products.map((per_product)=>{
                                  return(
                                    <div className="text-left d-flex justify-content-between pl-3">
                                        <a href="/">{per_product.name}</a>
                                        <span> $ {per_product.price.toFixed(2)}</span>
                                    </div>
                                  )
                                })
                              }
                            </div>

                            <div className="mb-3">
                              <h5 className="text-left">
                                  Shipping Method
                              </h5>
                              {
                                shipping.map((shipping_details)=>{
                                  return(
                                    <div className="text-left d-flex justify-content-between pl-3">
                                       <span> {shipping_details.name} </span>
                                      <span> $ {shipping_details.price.toFixed(2)}</span>
                                    </div>
                                  )
                                })
                              }
                            </div>

                            <h5 className="text-left mb-3">
                              Payment Method
                            </h5>
                            <div>
                                <button 
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    style={{borderRadius:0,background:paymentMethod==1?"blue":"",color:paymentMethod==1?"white":"" }}
                                    onClick={()=>setPaymentMethod(1)}
                                  >  
                                    Credit Card 
                                </button>
                                <button  
                                    type="button" 
                                    className="btn btn-outline-primary " 
                                    style={{borderRadius:0,background:paymentMethod==2?"blue":"",color:paymentMethod==2?"white":"" }}
                                    onClick={()=>setPaymentMethod(2)}
                                >  
                                    Gift Card 
                                </button>
                                <button  
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    style={{borderRadius:0,background:paymentMethod==3?"blue":"",color:paymentMethod==3?"white":"" }}
                                    onClick={()=>setPaymentMethod(3)}
                                >  
                                    Paypal Card 
                                </button>
                            </div>
                            {paymentMethod==1?
                            <div className="card mt-4 p-5">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group text-left">
                                                {errors.card_no?
                                                  <span style={{color:"red"}}>Card No. is required!</span>:
                                                  <label htmlFor="card_no">Card No. <span className="text-danger">*</span> </label>
                                                }
                                            <InputGroup className="input-group">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  id="card_no"
                                                  name="card_no"
                                                  ref={register({
                                                    required: "Required"})}
                                                  value={formData.card_no?cc_format(formData.card_no):""}
                                                  onChange={(e)=>{
                                                    if(e.target.value && e.target.value.length <= 14 ){
                                                        let value = e.target.value.replace(" ","")
                                                        setFormData({...formData, card_no: value})
                                                        return e;
                                                    }else if(!e.target.value|| e.target.value < 0){
                                                        setFormData({...formData, card_no: ""})
                                                        return formData.card_no;
                                                    }
                                                  }}
                                                />
                                                <span className="input-group-append bg-white  border-0">
                                                  <span className="input-group-text p-0 border-left-0 bg-transparent">
                                                    <i className="icon fa fa-credit-card"></i>
                                                  </span>
                                                </span>
                                            </InputGroup>
                                        </div>  
                                    </div>
                                        <div className="col-4">
                                          <div className="form-group text-left">
                                                {errors.cvv_cvc?
                                                  <span style={{color:"red"}}>CVV/CVC is required!</span>:
                                                  <label htmlFor="cvv_cvc">CVV/CVC <span className="text-danger">*</span></label>
                                                }
                                                 <InputGroup className="input-group">
                                                  <input
                                                    type="number"
                                                    id="cvv_cvc"
                                                    name="cvv_cvc"
                                                    className="form-control"
                                                    value={formData.cvv_cvc}
                                                    ref={register({
                                                      required: "Required"})}
                                                    onChange={e=>{
                                                      if(e.target.value && e.target.value.length<=3){
                                                        setFormData({...formData,cvv_cvc: e.target.value})  
                                                        return e;
                                                      }else if(!e.target.value|| e.target.value < 0){
                                                        setFormData({...formData,cvv_cvc: ""})  
                                                        return formData.cvv_cvc;
                                                      }
                                                    }}
                                                  />
                                                <span className="input-group-append bg-white border-0">
                                                    <span className="input-group-text p-0 border-left-0 bg-transparent">
                                                        <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                        <i className="icon p-0 fa fa-question-circle"></i>
                                                        </label>
                                                    </span>
                                                </span>
                                            </InputGroup>
                                          </div>  
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6">
                                          <div className="form-group text-left">
                                                { errors.validity_mm||errors.validity_yy?
                                                  <span className="d-block" style={{color:"red"}}>Valid thru (mm/yy) is required!</span>:
                                                  <label className="d-block" htmlFor="card_holders_no">Valid thru (mm/yy) <span className="text-danger">*</span></label>
                                                }
                                                <input
                                                    type="number"
                                                    id="validity_mm"
                                                    name="validity_mm"  
                                                    className="col-3 d-inline form-control"
                                                    value={formData.validity_mm}
                                                    ref={register({
                                                      required: "Required"})}
                                                    onChange={e=>{
                                                      if(e.target.value && e.target.value <= 12 && e.target.value > 0){
                                                        setFormData({...formData,validity_mm: e.target.value})  
                                                        return e;
                                                      }else if(!e.target.value|| e.target.value < 0){
                                                        setFormData({...formData,validity_mm: ""})  
                                                        return formData.validity_mm;
                                                      }
                                                    }}
                                                  />
                                              {" / "}
                                                <input
                                                    type="number"
                                                    id="validity_yy"
                                                    name="validity_yy"  
                                                    className="col-3 d-inline form-control"
                                                    value={formData.validity_yy}
                                                    ref={register({
                                                      required: "Required"})}
                                                    onChange={e=>{
                                                      if(e.target.value && e.target.value <= 99 && e.target.value > 0){
                                                        setFormData({...formData,validity_yy: e.target.value})  
                                                        return e;
                                                      }else if(!e.target.value|| e.target.value < 0){
                                                        setFormData({...formData,validity_yy: ""})  
                                                        return formData.validity_yy;
                                                      }
                                                    }}
                                                  />
                                          </div>  
                                        </div>
                                      </div>
                                      <div className="form-group text-left">
                                                { errors.card_holders_no?
                                                  <span style={{color:"red"}}>Cardholders No. is required!</span>:
                                                  <label htmlFor="card_holders_no">Cardholders No. <span className="text-danger">*</span></label>
                                                }
                                         <InputGroup>
                                              <input
                                                    className="form-control"
                                                    type="text"
                                                    id="card_holders_no"
                                                    name="card_holders_no"
                                                    ref={register({
                                                      required: "Required"})}
                                                    value={formData.card_holders_no}
                                                    onChange={onFormChange}
                                                  />
                                            </InputGroup>
                                    </div>  
                          </div>
                           :paymentMethod==2?
                             <div className="card mt-4 p-5">
                               <div className="row">
                                 <div className="col-12">
                                       Gift Card
                                 </div>
                               </div>
                             </div>:
                                <div className="card mt-4 p-5">
                                 <div className="row">
                                   <div className="col-12">
                                       Paypal Card
                                   </div>
                                 </div>
                              </div>
                           }
                          </div>
                          <div className="card-footer">
                                    <div className="text-left">
                                    <InputGroup>
                                            <input
                                              className="col-1 my-4"
                                              type="checkbox"
                                              id="terms_and_aggreement"
                                              name="terms_and_aggreement"
                                              ref={register({
                                                required: "Required"})}
                                              checked={formData.terms_and_aggreement?true:false}
                                              onClick={e=>{
                                                  if(formData.terms_and_aggreement){
                                                    setFormData({...formData, terms_and_aggreement: 0})
                                                  }else{
                                                    toggleTermAndConditionModal()
                                                    setFormData({...formData, terms_and_aggreement: 1})
                                                  }
                                              }}
                                            />
                                          <h5 
                                            className=" pt-3"
                                          >I accept the terms and condition 
                                          </h5>
                                          {errors.terms_and_aggreement && (<span style={{color:"red"}}>Terms and Condition is needed to be checked before placing the order!</span>)}
                                          </InputGroup>
                                    </div>
                          </div>
                          <Button type="submit" className="col-12 btn text-white" style={{background:"orange"}}>Place Order {totalPrice?"$ "+ totalPrice.toFixed(2):"$ 0.00"}  </Button>
                        </div>
                      </div>
                    </div>
                    </Container>
                    :exam==2?
                    <XYZFrontEnd/>: <EXYBackEnd/>
                  }
                </Container>
              </div>
              </Form>
              <Modal
                  isOpen={termsAndConditionModal}
                  toggle={toggleTermAndConditionModal}
                  className={"modal-lg"}
                  backdrop={"static"}
              >
                <ModalHeader toggle={termsAndConditionModal}>
                  TERM AND CONDITION
                </ModalHeader>
                <ModalBody> 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </ModalBody>
                <ModalFooter>
                      <button
                        color="secondary"
                        className="btn btn-primary"
                        onClick={toggleTermAndConditionModal}
                        id="cancel"
                      >
                        Okay
                      </button>
                    </ModalFooter>
              </Modal>
             
    </Fragment>
  );
}

export default App;

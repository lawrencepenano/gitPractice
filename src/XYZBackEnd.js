import React, { Fragment, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Input,
  Container,
  FormFeedback,
  Form,
  Button,
  InputGroup
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import parse from 'html-react-parser';
import { Markup } from 'interweave';

const XYZFrontEnd = () => {
  
    return (
        <Container>
        <div className="row">
            <div className="col-lg-10 mx-auto">
                <div className="card ">
                    <div className="card-header">
                        <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                            <div className="mb-3">
                                    XYZ Back End
                            </div>
                        </div>
                    </div>
                    <div className="card-body" >
                        <div style={{height:"50vh",overflow:"auto"}}>
                              Still in progress...
                        </div>
                    </div>
                    <div className="card-footer" >
                              
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

export default XYZFrontEnd

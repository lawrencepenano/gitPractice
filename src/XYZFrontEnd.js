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
    const [output, setOutput] = useState("");
    const { control, handleSubmit, register, errors, reset, getValues, setValue } = useForm();
    const [formData, setFormData] = useState({
        letters: "",
        direction: {value:"horizantal",label:"horizantal"},
        size: ""
      })

    const onFormChange = (e) => {
        console.log(e)
        setFormData({...formData, [e.target.name]:e.target.value})
        return e;
    };

    const handleSubmitedPattern = () => {
        let submitted_letters = getValues('letters');
        let submitted_size = getValues('size');
        let submitted_direction = formData.direction.value;
     
        let response = print_pattern(submitted_letters,submitted_size,submitted_direction)
        console.log(response)
        setOutput(response);
    }
    
    const print_pattern = (letters,size, direction) => {
        const letter_validation = /[a-v]|[0-9]|[!@#\$%\^\&*\)\(+=._-]/;
        console.log(direction)
        if(letter_validation.test(letters)){
          return "Please enter letter between X,Y and Z only"
        }
        if(!(direction.toUpperCase() == "VERTICAL" || direction.toUpperCase() == "HORIZONTAL")){
          return "Please only choose between Vertical and Horizantal"
        }
        if( size%2 == 0 ){
          return "Please enter odd numbers only"
        }
    
        const index = 1;
        let column_index = index;
        let row_index = index;
        let column = [];
        let result_for_x = [];
        let result_for_y = [];
        let result_for_z = [];
    
        while(column_index <= size){
          column.push(0);
          column_index = column_index + 1;
        }
    
        while(row_index <= size){
          result_for_x.push(column.map(e=>e));
          result_for_y.push(column.map(e=>e));
          result_for_z.push(column.map(e=>e));
          row_index = row_index + 1;
        }
    
        let result = [];
    
      for(let i = 0; i < letters.length ; i++) {
          let selected_letter = letters.charAt(i);
          let x = []
          let y = []
          let z = []
    
          if(selected_letter.toUpperCase() == "X"){
              let i = index;
            x = result_for_x.map((value)=>{
              let start = i - 1;
              let end =  size - i;
        
              value[start] = 1;
              value[end] = 1;
        
              i = i + 1;
              return value;
            })
            result.push(x.map(e=>e))
          }
    
          if(selected_letter.toUpperCase() == "Y"){
              let i = index;
              y = result_for_y.map((value)=>{
              let start = i - 1;
              let end =  size - i;
        
              let middle = Math.round(size/2);
            
              if(i < middle){
                value[start] = 1;
                value[end] = 1;
              }else{
                value[middle-1] = 1;
              }
        
              i = i + 1;
              return value;
            })
    
            result.push(y.map(e=>e))
          }
    
          if(selected_letter.toUpperCase() == "Z"){
              let i = index;
              z = result_for_z.map((value)=>{
              let end =  size - i;
              let start_and_end = value.map(e=>1)
        
              if(i == 1 || i == size ){
                value = start_and_end;
              }
              else {
                value[end] = 1;
              }
        
              i = i + 1;
              return value;
            })
            result.push(z.map(e=>e))
          } 
        }
    
      let text = ""
    
      if(direction == "vertical"){
        result.map((value)=>{  
            value.map(data=>{
             data.map(value=>{
                if(value == 0){
                  text =  text +  `<span class='text-white'>${' O '}</span>`;
                }else {
                  text =  text + `<span class='text-black'>${' O '}</span>`;
                }
                })
                text = text + "<br/>" + "<br/>"
             })
        })
      }
    
      if(direction == "horizantal"){
        let current_index = index;
          while(current_index <= size){
            result.map(value=>{
              value[current_index-1].map(
                data=>{
                    if(data == 0){
                      text = `<span class='text-white'>${' O '}</span>`;
                    }else {
                      text = `<span class='text-black'>${' O '}</span>`;
                    }
                })
             })
             current_index = current_index + 1;
             text = text + "<br/>";
            }
        }
        // let newText = text.split('\n').map(i => {
        //     return <p>{i}</p>
        // });
        // console.log(newText);
        return text;
      }


    return (
        <Container>
        <div className="row">
            <div className="col-lg-10 mx-auto">
                <div className="card ">
                    <div className="card-header">
                        <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                            <div className="mb-3">
                                    XYZ Fron End
                            </div>
                        </div>
                    </div>
                    <div className="card-body" >
                        <div style={{height:"50vh",overflow:"auto"}}>
                                {output?parse(output):"Please input details below"} 
                                {/* <Markup content={output}/> */}
                        </div>
                    </div>
                    <div className="card-footer" >
                                <input
                                type="text"
                                id="letters"
                                name="letters"
                                className="form-control col-3 d-inline m-1"
                                placeholder="Letters (XYZ)"
                                value={formData.letters}
                                ref={register({
                                    required: "Required"})}
                                onChange={onFormChange}
                                />
                                <input
                                type="number"
                                id="size"
                                name="size"
                                className="form-control col-3 d-inline m-1"
                                placeholder="Odd Numers only"
                                value={formData.size}
                                ref={register({
                                    required: "Required"})}
                                onChange={onFormChange}
                                />
                                <select
                                id="direction"
                                name="direction"
                                className="form-control col-3 d-inline  m-1"
                                // value={formData.direction}
                                ref={register({
                                    required: "Required"})}
                                onChange={e=>{
                                    setFormData({...formData,direction:{value:e.target.value,label:e.target.value}})
                                    return e;
                                }}
                                >
                                    <option value="horizantal">Horizantal</option>
                                    <option value="vertical">Vertical</option>
                                </select>

                                <button 
                                    type="button" 
                                    className="btn btn-primary col-3 d-inline"
                                    onClick={()=>handleSubmitedPattern()}
                                >
                                    Submit
                                </button>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

export default XYZFrontEnd

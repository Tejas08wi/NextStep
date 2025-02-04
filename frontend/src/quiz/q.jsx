import React,{ useState } from "react";
import data from "../database/data";     

export default function Questions() {

    const [checked, setChecked] = useState(undefined);

    const question = data[0];

    function onSelect(){
        console.log('Option selected');
    }

    return (
      <div className="questions">
        <h2 className="text-light">{question.question}</h2>
        <ul key={question.id}>
          {
            question.options.map((option,index)=>(
              <li key={index}>
                <input type="radio" value={option} name="options" id={`q${index}-option`} onChange={onSelect}/>
                <label htmlFor={`q${index}-option`} className="text-light">{option}</label>
                <div className="check"></div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
  
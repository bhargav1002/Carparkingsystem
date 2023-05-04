import React from 'react';
import Tdata from './Tdata';

export default function Trow(props) {

    const formHandler = (id) =>
    {
        props.setShowform(true);
        props.setId(id);
    }

  return (
    <>
        {props.data.map((obj,i)=>
        {
            return (<tr key={i}><Tdata data={obj} formHandler={formHandler}></Tdata></tr>)
        })}
    </>
  )
}

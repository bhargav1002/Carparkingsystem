import React, {useState} from 'react'

export default function Tdata(props) {

    const clickHandler = (id) =>
    {
        props.formHandler(id);
    }

  return (
    <>
        {props.data.map((obj) =>
        {
            return (
                <td id={obj.number} key={obj.number} onClick={(e) => clickHandler(obj.number)} style={{ backgroundColor: obj.isfilled && 'green', width:"150px"}} className='border border-2'>{obj.number}</td>
            )
        })}
    </>
  )
}

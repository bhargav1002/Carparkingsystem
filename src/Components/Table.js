import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Trow from './Trow';
import Tform from './Tform';

export default function Table() {

  const [data, setData] = useState([]);
  const [showform, setShowform] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const f = async () => {
      const response = await axios.get('data.json');
      setData([response.data.data]);
    }
    f()
  }, [])

  return (
    <div>
      <h1 className='text-center font-bold text-2xl mt-5'>Car Parking System</h1>
      <div className='flex justify-center mt-10'>
        <table>
          <tbody>
            {data.map((obj, i) => {
              return (<Trow data={obj} key={i} setShowform={setShowform} setId={setId}></Trow>);
            })}
          </tbody>
        </table>
      </div>
      {showform && <Tform setShowform={setShowform} id={id} data={data} showform={showform}></Tform>}
    </div>
  )
}

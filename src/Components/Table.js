import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Trow from './Trow';
import Tform from './Tform';

export default function Table() {

    const [data, setData] = useState([]);
    const [showform, setShowform] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() =>
    {
        const f = async () =>
        {
            const response = await axios.get('data.json');
            setData([response.data.data]);
        }
        f()
    },[])

  return (
    <div>
        <table border="2" style={{borderCollapse:"collapse"}}>
        <tbody>
        {data.map((obj,i) =>
        {
            return (<Trow data={obj} key={i} setShowform={setShowform} setId={setId}></Trow>);
        })}
        </tbody>
        </table>
          {showform && <Tform setShowform={setShowform} id={id} data={data}></Tform>}
    </div>
  )
}

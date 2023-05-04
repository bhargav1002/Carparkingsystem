import React, { useEffect, useState } from 'react';
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

export default function Tform(props) {
    initTE({ Modal, Ripple });

    const [formcarno, setFormcarno] = useState('');
    const [formtime, setFormtime] = useState('');
    const [price, setPrice] = useState(20);
    const [showPrice,setShowPrice] = useState(false);

    const data = props.data;
    const InHandler = () => {
        if (formcarno.trim() !== '' && formtime.trim() !== '') {
            for (const d in data) {
                const d1 = data[d];
                for (const d in d1) {
                    const d2 = d1[d]
                    for (const d in d2) {
                        if (props.id === d2[d].number) {
                            if (d2[d].isfilled === false) {
                                d2[d].isfilled = true
                                d2[d].number = d2[d].number + ` (${formcarno}) ${formtime}`
                            }
                        }
                    }
                }
            }
        }
        props.setShowform(false);
    }

    const payHandler = () => {
        props.setShowform(false);
        setShowPrice(false);
    }

    const OutHandler = () => {
        if (formtime.trim() !== '') {
            for (const d in data) {
                const d1 = data[d];
                for (const d in d1) {
                    const d2 = d1[d]
                    for (const d in d2) {
                        if (props.id === d2[d].number) {
                            if (d2[d].isfilled === true) {
                                d2[d].isfilled = false
                                let intime = d2[d].number.slice(-5, -3);
                                let outime = formtime.slice(0, 2);
                                let diff = Number(outime) - Number(intime)
                                if (diff <= 1) {
                                    setPrice(20)
                                    setShowPrice(true)
                                }
                                else if (diff > 1 && diff <= 2) {
                                    setPrice(40)
                                    setShowPrice(true)
                                }
                                else if (diff > 2 && diff <= 4) {
                                    setPrice(100)
                                    setShowPrice(true)
                                }
                                else if (diff > 4 && diff <= 6) {
                                    setPrice(200)
                                    setShowPrice(true)
                                }
                                d2[d].number = d2[d].value
                            }
                        }
                    }
                }
            }
        }
    }


    useEffect(() => {
        if (props.showform) {
            for (const d in data) {
                const d1 = data[d];
                for (const d in d1) {
                    const d2 = d1[d]
                    for (const d in d2) {
                        if (props.id === d2[d].number) {
                            if (d2[d].isfilled === true) {
                                let start = d2[d].number.indexOf("(");
                                let end = d2[d].number.indexOf(")");
                                setFormcarno(d2[d].number.slice(start + 1, end));
                                const a = new Date();
                                setFormtime(a.getHours() + ':' + a.getMinutes());
                            }
                        }
                    }
                }
            }
        }
    }, [props.showform,data,props.id])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <form>
                <h1>Form</h1>
                <label>Car Number</label><br></br><br></br>
                <input type="text" value={formcarno} onChange={(e) => setFormcarno(e.target.value)}></input>
                <br></br>
                <br></br>
                <label>Time</label><br></br><br></br>
                <input type="time" value={formtime} onChange={(e) => setFormtime(e.target.value)}></input>
                <br></br>
                <br></br>
                <input type="button" value="In" onClick={InHandler}></input>
                <input type="button" value="Out" onClick={OutHandler}></input>
            </form> */}

            <div className='w-screen h-screen flex justify-center items-center fixed -mt-52' style={{ backgroundColor: '#00000070' }}>
                <div className='bg-white p-32 border rounded-3xl'>
                    <form>
                        <label className='font-bold'>Car Number</label><br></br><br></br>
                        <input type="text" value={formcarno} onChange={(e) => setFormcarno(e.target.value)}></input>
                        <br></br>
                        <br></br>
                        <label className='font-bold'>Time</label><br></br><br></br>
                        <input type="time" value={formtime} onChange={(e) => setFormtime(e.target.value)}></input>
                        <br></br>
                        <br></br>
                        <input type="button" value="In" onClick={InHandler} className='bg-slate-400 rounded me-3 px-3'></input>
                        <input type="button" value="Out" onClick={OutHandler} className='bg-slate-400 rounded px-3'></input>
                    </form>
                    {showPrice && <div className='mt-5'>
                        Price is {price}
                        <input type="button" value="Pay" onClick={payHandler} className='bg-slate-400 rounded px-3 ms-3'></input>
                    </div>}
                </div>
            </div>
        </div>
    )
}

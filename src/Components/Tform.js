import React, {useState } from 'react'

export default function Tform(props) {

    const [formcarno, setFormcarno] = useState('');
    const [formtime, setFormtime] = useState('');
    const data = props.data;
    const InHandler = () => {
        if (formcarno.trim() !== '' && formtime.trim() !== '' )
        {
            for (const d in data) {
                const d1 = data[d];
                for (const d in d1) {
                    const d2 = d1[d]
                    for (const d in d2) {
                        if (props.id === d2[d].number) {
                            if (d2[d].isfilled === false)
                            {
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

    const OutHandler = () => {
        if (formtime.trim() !== '')
        {
            for (const d in data) {
                const d1 = data[d];
                for (const d in d1) {
                    const d2 = d1[d]
                    for (const d in d2) {
                        if (props.id === d2[d].number) {
                            if (d2[d].isfilled === true)
                            {
                                d2[d].isfilled = false
                                let intime = d2[d].number.slice(-5, -3);
                                let outime = formtime.slice(0, 2);
                                let diff = Number(outime) - Number(intime)
                                if (diff <= 1) {
                                    alert('price 20')
                                }
                                else if (diff > 1 && diff <= 2) {
                                    alert('price 40')
                                }
                                else if (diff > 2 && diff <= 4) {
                                    alert('price 100')
                                }
                                else if (diff > 4 && diff <= 6) {
                                    alert('price 200')
                                }
                                d2[d].number = d2[d].value
                            }
                        }
                    }
                }
            }
        }
        props.setShowform(false);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form>
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
            </form>
        </div>
    )
}

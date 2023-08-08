import React, { useState, useEffect } from 'react';


export default function ScoreBoard(){
    const [tableData, setTableData] = useState("")

    const colNames = ["Čas", "Počet hodov"]

    useEffect(() => {
        const dataFromLocalStorage = localStorage.getItem("tableData");
        if (dataFromLocalStorage) {
            setTableData(JSON.parse(dataFromLocalStorage)); // Uloženie do stavu
        }
    }, []);

    return(
        <main className="tableMain">
            <table className="table">
                <thead className='thead'>
                    <tr>
                        {colNames.map((name, index)=>(
                            <th className="colName" key={index}>
                                {name.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.length >= 1 && tableData.map((item,index)=>{
                        console.log(item)
                        return(
                            <tr className="tableRow" key={index}>
                                <th>{item.playTime.m > 0 ? (item.playTime.m + ":" + item.playTime.s + ":" + (item.playTime.ms === 100 ? "00" : item.playTime.ms)) : (item.playTime.s + ":" + (item.playTime.ms === 100 ? "00" : item.playTime.ms))}</th>
                                <th>{item.attempts}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}
import React, { useState, useEffect } from 'react';


export default function ScoreBoard(){
    const [tableData, setTableData] = useState([{}])

    const colNames = ["Čas", "Počet hodov"]

    // localStorage.setItem("resutlsTable", JSON.stringify(resutlsTable))

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
                    {/* {resutlsTable.map((item,index)=>{
                        console.log(item)
                        return(
                            <tr className="tableRow" key={index}>
                                <th>{item.time.s + ":" + item.time.ms}</th>
                                <th>{item.attempts}</th>
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
        </main>
    )
}
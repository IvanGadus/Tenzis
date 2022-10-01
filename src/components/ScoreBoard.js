import React from "react";

export default function scoreBoard(){
    const colNames = ["Čas", "Počet hodov"]

    const resutlsTable = [{
        time:{ms:20, s:15,m:0},
        attempts:22
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    },{
        time:{ms:80, s:55,m:0},
        attempts:11
    }
]
    localStorage.setItem("resutlsTable", JSON.stringify(resutlsTable))
    

    // localStorage.setItem("hodnota", "ahoj")
    // localStorage.clear()
    return(
        <main className="tableMain">
            <table className="table">
                <thead>
                    <tr>
                        {colNames.map((name, index)=>(
                            <th className="colName" key={index}>
                                {name.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resutlsTable.map((item,index)=>{
                        console.log(item)
                        return(
                            <tr className="tableRow" key={index}>
                                <th>{item.time.s + ":" + item.time.ms}</th>
                                <th>{item.attempts}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}
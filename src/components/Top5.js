import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Axios from 'axios';
// import './App.css'



function Top5({top5, setTop5, apiRequest, setLeaderboard}) {
    
    let y = "blank"

    const [z, setZ] = useState(0);


    var x = 0;

    const back = () => {
        setLeaderboard("false")
    }
    const on7Days = () => {
        apiRequest(Axios.get, {type: "7Days"}).then((response) => {
          // console.log(response.data.data)
        //   console.log("hihi")
        //   console.log(response.data.data)
        //   setData(response.data.data)
        //   console.log({data})

          y = response.data.data;
          console.log(y)
        //if you look at console then it console.log top5 as empty
          setTop5(y)

          console.log(top5)
          
          setZ(1)

        })
        
    }

    const getData = () => {
    //    console.log(y)
    //    on7Days()
    //    on7Days()
    //    setTop5(y)

    //    console.log("HIIIIIIIIIIIIIIIIIIIIIII" + top5 )
    }

    useEffect(() => {
        // Update the document title using the browser API

        // console.log("Prev X = " + x)

        on7Days()
        // x = 1
        // console.log(data)

        // console.log("After X = " + x)

        // on7Days()

        
      }, []);

    if(z === 1){

        return (

        
            <div className='gradient'>

                
                <div className="admin gradient-inner">
                    <div className = "form-inner cpw-form">
                        

                        <div className='top5'> 

                        <button className="secondary-button" type="reset" onClick={back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left-short" viewBox="3 2 10 10">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                        </button>

                        <h2 style={{marginBottom:'0.5em'}}/>

                        
                        <h2 className = "red-text" style={{marginBottom:'0.5em'}}>Weekly Leaderboard!</h2>

                        <div className='smallText'>
                        <h3 style={{marginBottom:'0.5em'}}>Resets Every Monday</h3>


                        </div>

                        </div>

                        <Table striped bordered style={{marginBottom:'-0.2em'}}>
                    <thead>
                        <tr style={{display:'flex',flexDirection:'row'}}>
                            <th style={{flex:1}}>
                                <a id="sortName" className="sort-button" >Name</a>
                            </th>
                            <th style={{flex:1}}>
                                <a id="sortHours" className="sort-button" >Hours</a>
                            </th>
                            {/* <th style={{flex:1}}>
                                <a id="sortDays" className="sort-button">Days</a>
                            </th> */}
                        </tr>
                        </thead>
                        </Table>

                        

                        <div style={{height:'15em'}}>
                            <Table striped bordered style={{marginBottom:'0'}}>
                                <tbody>
                                    {Object.keys(top5).map((key) => {
                                        return (
                                        <tr style={{display:'flex',flexDirection:'row'}}>
                                            <td style={{flex:1}}>{top5[key].name}</td>
                                            {/* <td style={{flex:1}}>{top5[key].dates}</td> */}
                                            <td style={{flex:1}}>{top5[key].hours}</td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )

    } else {
        return (

        
            <div className='gradient'>
                <div className="admin gradient-inner">
                    <div className = "form-inner cpw-form">
                        {/* <button className="secondary-button" style={{padding:'0.6em 1em'}} type="reset" onClick = {getData}> */}
                        {/* </button> */}
                         <h3 class = "red" style={{marginBottom:'0.5em'}}>Fetching Data ... </h3>
                        
                        
                       
                    </div>
                </div>
            </div>
        )
    }

    
}

export default Top5
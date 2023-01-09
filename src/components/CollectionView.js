import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'

function CollectionView( {collection, back}) {
    const [data, setData] = useState([...collection.data])

    const sortByName = () => {
        let d = [...data]
        d.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        setData(d)
    }
    const sortByHours = () => {
        let d = [...data]
        d.sort((a, b) => {
            if (a.hours < b.hours) return 1;
            if (a.hours > b.hours) return -1;
            return 0;
        });
        setData(d)
    }
    const sortByDays = () => {
        let d = [...data]
        d.sort((a, b) => {
            if (a.dates < b.dates) return 1;
            if (a.dates > b.dates) return -1;
            return 0;
        });
        setData(d)
    }

    return (
        <div className='gradient'>
            <div className="admin gradient-inner">
                <div className = "form-inner cpw-form">
                    <button className="secondary-button" style={{padding:'0.6em 1em'}} type="reset" onClick={back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="3 2 10 10">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                    </button>
                    <h2 style={{marginBottom:'0.5em'}}/>
                    <h2 style={{marginBottom:'0.5em'}}>Data from {collection.start} to {collection.end}</h2>
                    <Table striped bordered style={{marginBottom:'-0.2em'}}>
                    <thead>
                        <tr style={{display:'flex',flexDirection:'row'}}>
                            <th style={{flex:2}}>
                                <a id="sortName" className="sort-button" onClick={sortByName}>Name</a>
                            </th>
                            <th style={{flex:1.5}}>
                                <a id="sortHours" className="sort-button" onClick={sortByHours}>Hours</a>
                            </th>
                            <th style={{flex:1}}>
                                <a id="sortDays" className="sort-button" onClick={sortByDays}>Days</a>
                            </th>
                        </tr>
                        </thead>
                        </Table>
                    <div style={{height:'20em',overflow:'scroll'}}>
                        <Table striped bordered style={{marginBottom:'0'}}>
                            <tbody>
                                {Object.keys(data).map((key) => {
                                    return (
                                    <tr style={{display:'flex',flexDirection:'row'}}>
                                        <td style={{flex:2}}>{data[key].name}</td>
                                        <td style={{flex:1.5}}>{data[key].hours}</td>
                                        <td style={{flex:1}}>{data[key].dates}</td>
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
}

export default CollectionView
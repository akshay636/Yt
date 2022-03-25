import React from 'react';
import { AiOutlineEye, AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
const ytDuration = require('youtube-duration')
const Youapi = (props) => {
    const Del = (id) => {
        props.setList((val) => {
            return val.filter((el, index) => {
                return index !== id;
            })
        })
        
    }
    console.log('you re in url');
    return (
        <div>
            {
    (props.list?.length === 0) ? <div></div> :
                    <div className='container-fluid mt-5'>
                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                            {props.list?.map((val, index) => {
                                return (
                                    <div key={index} className='col'>
                                        <div className="card mt-5 mx-" style={{ position: "relative", }}>
                                            <img className="card-img-top" src={val[0]?.snippet?.thumbnails?.high.url} alt="Card image cap" />
                                            <div style={{ position: "absolute", top: "-5%", right: "-3%" }}>
                                                <button style={{ width: "35px", height: "35px", borderRadius: "50%" }} className='btn btn-danger' onClick={() => Del(index)}><div style={{ border: '0.5px solid white' }}></div></button>
                                            </div>
                                            <div className="card-body" style={{ height: "93px" }}>
                                                <p className="card-title text-truncate" style={{ fontSize: '11px' }}><b>{val[0]?.snippet?.title}</b></p>
                                                <p style={{ textAlign: 'left', fontSize: '10px' }} >By{val[0]?.snippet?.channelTitle}</p>
                                                <div style={{ display: "flex", bottom: "5%" }}>
                                                    <p style={{ fontSize: '10px' }} ><MdOutlineWatchLater /> {ytDuration.format(val[0]?.contentDetails?.duration)}</p>
                                                    <p className="card-text" style={{ marginLeft: "auto", fontSize: '10px' }}><AiOutlineEye />  {props.checkViews(val[0]?.statistics?.viewCount)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
            }
        </div>
    );
}

export default Youapi;

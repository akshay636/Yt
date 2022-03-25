import React from 'react';

const Channel = (props) => {
  return (
    <div>
     {
        (props.channeList?.length === 0) ? <div></div> :
                            <div className='container-fluid mt-5'>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                                    {props.channeList[0]?.map((val,index)=>{
                                        console.log('index values',index)
                                        return(
                                            <>
                                            <div key={index} className='col'>
                                                <div className="card mt-5 mx-" style={{ position: "relative", }}>
                                                    <img className="card-img-top" src={val?.snippet?.thumbnails?.high.url} alt="Card image cap" />
                                                    <div style={{ position: "absolute", top: "-5%", right: "-3%" }}>
                                                        {/* <button style={{ width: "35px", height: "35px", borderRadius: "50%" }} className='btn btn-danger' onClick={() => Del(index)}><div style={{ border: '0.5px solid white' }}></div></button> */}
                                                    </div>
                                                    <div className="card-body" style={{ height: "93px" }}>
                                                        <p className="card-title text-truncate" style={{ fontSize: '11px' }}><b>{val?.snippet?.title}</b></p>
                                                        <p style={{ textAlign: 'left', fontSize: '10px' }} >By{val?.snippet?.channelTitle}</p>
                                                        <div style={{ display: "flex", bottom: "5%" }}>
                                                            <p style={{ fontSize: '10px' }} ></p>
                                                            <p className="card-text" style={{ marginLeft: "auto", fontSize: '10px' }}></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                               
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
     }
    </div>
  );
}

export default Channel;

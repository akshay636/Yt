import React, { useEffect, useState } from 'react';
import getVideoId from 'get-video-id';
import image7 from '../image 7.png'
import { AiOutlineEye, AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
import {IoIosArrowDown} from 'react-icons/io'

const ytDuration = require('youtube-duration')
const Youtube = () => {
    const [list, setList] = useState([]);  //youtube component 
    const [channeList, setChannelList] = useState([]);
    const [input, setinput] = useState('');  //home componet
    const [text, settext] = useState('Youtube url link');  // home component
    const[color,setcolor]=useState('black');  //home component
    const[colorr,setcolorr]=useState('green'); // home component

    const getInput = (e) => {
        setinput(e.target.value)
    }
    const apiUrl = async () => {
        let mounted = true;
        await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${getVideoId(input).id}&key=AIzaSyD9d5mLmQEw1G9GaPfEYR0YS33zrTiC1Hc&part=snippet,contentDetails,statistics`).then((res) => res.json()).then(
            (items) => {
                if (mounted) {
                    console.log('lenght',list.length);
                    if(list.length<10){
                        setList((val) => {
                            return ([...val, items.items])
                        });
                    }
                    else{
                        alert('You only add upto 10 videos ...')
                    }
                }
        
                setinput('')
            }
        )
        return () => mounted = false;
    }
    const apiChannel = async () => {
        let mounted = true;
        const id='UCqrILQNl5Ed9Dz6CGMyvMTQ';
        let equal = input.split("channel/").pop();
        console.log("channel id ", equal);
        await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyD9d5mLmQEw1G9GaPfEYR0YS33zrTiC1Hc&channelId=${equal}&part=snippet,id&order=date&maxResults=5`).then((res) => res.json()).then(
            (items) => {
                if (mounted) {
                    console.log('lenght',channeList.length);
                   
                        setChannelList((val) => {
                            return ([...val, items.items])
                        });
                }
        
                setinput('')
            }
        )
        return () => mounted = false;
    }
    const Search = (e) => {
        if(text==='Youtube url link')
        {
            e.preventDefault();
            apiUrl();
           setinput('');
        }
        else{
            e.preventDefault();
            apiChannel();
           setinput('');
       
        }

        
    }
   
    const checkViews = (num) => {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num < 900) {
            return num;
        }
    }
    const Del = (id) => {
        setList((val) => {
            return val.filter((el, index) => {
                return index !== id;
            })
        })
        console.log('list after vlick on de;ete btn', list);
    }
    const url = () => {
        console.log('url working');
        settext('Youtube url link')
        setcolor('green');
        setcolorr('black')
       
        
        
    }
    const channel = () => {
        console.log('chall')
        setList([]);
        setcolor('green');
        console.log('colorr1',color);
        setcolor('black');
        setcolorr('green');
        
        settext('Youtube channel')
    }
    return (
        <div>
            <div className=' mt-2'>
                <div className='row text-center'>
                    <div className='col-lg-12 col-md-12 col-sm-12 '>
                        <img src={image7} />
                        <h5 className='mt-3'>Tool To Search Within Video in 2 Simple Steps:-</h5>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>  <button className=' step-1' >1</button><div style={{ border: '0.5px dashed green', width: '70px', height: '0px' }}></div><button className='btn btn-light step-2' style={{ width: "45px", height: "45px", borderRadius: "50%", border: "2px solid black" }}>2</button></div>
                        <p className='mt-3 text-muted'><b>Slect The Video Link or Video Channel From Youtube</b>(You Can Select Upto 10 Videos or 1 Channel in this demo version)</p>
                    </div>
                </div>
                <div className="input-group justify-content-center">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "167px", height: "40px", marginRight: "30px",textAlign:'left' }}>
                        {text} &nbsp;&nbsp; &nbsp;&nbsp;<IoIosArrowDown style={{textAlign:'right', position:'absolute', marginRight:'78px'}}/>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" onClick={url} href="#"><div style={{ position: "absolute" }}>
                               <div id='on'>
                                <div id="outer-circle" style={{ border:`1.5px solid ${color}`}}>
                                    <div id="inner-circle" style={{background:`${color}`}}>

                                    </div>
                                </div>
                                </div>
                            </div>&nbsp; &nbsp;Youtube Url</a></li>
                            <li><a className="dropdown-item" onClick={channel}>
                            <div id='on1'>
                                <div id="outer-circle1" style={{ border:`1.5px solid ${colorr}`}}>
                                    <div id="inner-circle1" style={{background:`${colorr}`}}>

                                    </div>
                                </div>
                                </div> &nbsp; &nbsp; <p style={{marginTop:'-40px', marginLeft:'10px'}}>Youtube Channel</p>
                               </a></li>
                        </ul>
                    </div>
                  
                    <div className="form-group w-50 ">
                        <div style={{ position: "relative" }}>
                            <input type="text" className="form-control" onChange={getInput} style={{ height: "40px", paddingRight: "50px" }} placeholder={text} value={input} />
                            <div style={{ position: "absolute", top: "10%", right: "8px", }}>
                                <button style={{ height: '33px', backgroundColor: '#34C36D', color: 'white' }} type="button" className="btn  input_button" onClick={Search}><span>+</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    <>
                        {
                            (text==='Youtube url link')?
                            (list.length === 0) ? <div></div> :
                            <div className='container-fluid mt-5'>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                                    {list.map((val, index) => {
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
                                                            <p className="card-text" style={{ marginLeft: "auto", fontSize: '10px' }}><AiOutlineEye />  {checkViews(val[0]?.statistics?.viewCount)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>:
                            (channeList.length === 0) ? <div></div> :
                            <div className='container-fluid mt-5'>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                                    {channeList[0].map((val,index)=>{
                                        console.log('index values',index)
                                        return(
                                            <>
                                            <div key={index} className='col'>
                                                <div className="card mt-5 mx-" style={{ position: "relative", }}>
                                                    <img className="card-img-top" src={val?.snippet?.thumbnails?.high.url} alt="Card image cap" />
                                                    <div style={{ position: "absolute", top: "-5%", right: "-3%" }}>
                                                        <button style={{ width: "35px", height: "35px", borderRadius: "50%" }} className='btn btn-danger' onClick={() => Del(index)}><div style={{ border: '0.5px solid white' }}></div></button>
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
                        {
                        }
                    </>
                }
            </div>
        </div>
    );
}
export default Youtube;
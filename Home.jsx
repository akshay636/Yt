import React, { useEffect, useState } from 'react';
import getVideoId from 'get-video-id';
import image7 from '../image 7.png'
import {IoIosArrowDown} from 'react-icons/io'
import Channel from './Channel';
import './Home.css'
import Youapi from './Youapi';
import Modals from './Modals';
const Home = (props) => {
    const [list, setList] = useState([]);  //youtube component 
    const [channeList, setChannelList] = useState([]);
    const [input, setinput] = useState('');  //home componet
    const [text, settext] = useState('Youtube url link');  // home component
    const[color,setcolor]=useState('green');  //home component
    const[colorr,setcolorr]=useState('black'); // home component
    const getInput = (e) => {
        setinput(e.target.value)
    }
    const apiUrl = async () => {
        let mounted = true;
        await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${getVideoId(input).id}&key=AIzaSyD9d5mLmQEw1G9GaPfEYR0YS33zrTiC1Hc&part=snippet,contentDetails,statistics`).then((res) => res.json()).then(
            (items) => {
                if (mounted) {
                    console.log('lenght',list.length);
                    if(list.length<2){
                        setList((val) => {
                            return ([...val, items.items])
                        });
                    }
                    else{

                        // alert('You only add upto 10 videos ...');
                       { <Modals/>}
                        console.log('limit reached');
                    }
                }
                setinput('')
            }
        )
        return () => mounted = false;
    }
    const apiChannel = async () => {
        let mounted = true;
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
        if (e.key === 'Enter') {
            console.log('do validate');
          }
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
    const url = () => {
        console.log('url working');
        settext('Youtube url link');
        setcolor('green');
        setcolorr('black');
    }
    const channel = () => {
        console.log('chall')
        setList([]);
        setcolor('green');
        console.log('colorr1',color);
        setcolor('black');
        setcolorr('green');
        settext('Youtube channel');
    }
    return(
        <>
        <div>
            <div className=' mt-2'>
                <div className='row text-center'>
                    <div className='col-lg-12 col-md-12 col-sm-12 '>
                        <img src={image7} />
                        <h5 className='mt-3'>Tool To Search Within Video in 2 Simple Steps:-</h5>
                        <div className='step-btn-div' >  <button className=' step-1' >1</button><div className='dashed'></div><button className='btn btn-light step-2'>2</button></div>
                        <p className='mt-3 text-muted'><b>Slect The Video Link or Video Channel From Youtube</b>(You Can Select Upto 10 Videos or 1 Channel in this demo version)</p>
                    </div>
                </div>
                <div className="input-group justify-content-center">
                    <div className="dropdown">
                        <button className="btn dropdown-icon dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                            {text} &nbsp;&nbsp; &nbsp;&nbsp;<IoIosArrowDown style={{ textAlign: 'right', position: 'absolute', marginRight: '78px' }} />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" onClick={ url} href="#"><div style={{ position: "absolute" }}>
                                <div id='on'>
                                    <div id="outer-circle" style={{ border: `1.5px solid ${ color}` }}>
                                        <div id="inner-circle" style={{ background: `${ color}` }}>
                                        </div>
                                    </div>
                                </div>
                            </div>&nbsp; &nbsp;Youtube Url</a></li>
                            <li><a className="dropdown-item" onClick={channel}>
                                <div id='on1'>
                                    <div id="outer-circle1" style={{ border: `1.5px solid ${ colorr}` }}>
                                        <div id="inner-circle1" style={{ background: `${ colorr}` }}>
                                        </div>
                                    </div>
                                </div> &nbsp; &nbsp; <p className='yc'>Youtube Channel</p>
                            </a></li>
                        </ul>
                    </div>
                   
                       <div className="form-group w-50 ">
                        <div className='from-g' style={{ position: "relative" }}>
                            <input type="text" className="form-control input" onChange={getInput} placeholder={text} value={input} />
                            <div className='div-btn'>
                                <button type="button" className="btn  input_button" onClick={Search}><span>+</span></button>
                            </div>
                        </div>
                    </div>
               
                   
                </div>
            </div>
        </div>
        {
            (text==='Youtube url link')? <Youapi
            list={list}
            checkViews={checkViews}
            setList={setList}   
        />:
        <Channel
                    channeList={channeList}
        />
        }
        </>
    );
}
export default Home;

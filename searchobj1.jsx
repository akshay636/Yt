import React, { useState } from 'react';
import { getSubtitles } from 'youtube-captions-scraper';
import YouTube from "react-youtube";
import { FiSearch } from 'react-icons/fi'
import './Home.css'

import { AiOutlineEye } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
const ytDuration = require('youtube-duration')
const SearchInObj = (props) => {
    const [data, setData] = useState([])
    const [input, setinput] = useState('');
    const [resultss, setResults] = useState([]);
    const [player, setPlayer] = useState(null);
    const[showvideo,setvideoshow]=useState(false);
    const onReady = (event) => {
        setPlayer(event.target)
        event.target.playVideo();
    }
    const changeTime = (seconds) => {
        console.log('seeking to: ' + seconds)
        player.seekTo(seconds)
        player.playVideo();
    }
    const opts = {
        autoplay: 0,
        width: '420',
        height: '320',

    }    
    // getSubtitles({
    //     videoID: 'aDG1T0kJnd4',
    //     lang: 'en'
    // }).then((captions) => {
    //     return setData(captions)
    // });
    const searchh = (e) => {
        e.preventDefault();
        console.log('search data', searchFor(input));   
    }
    function trimString(s) {
        var l = 0, r = s.length - 1;
        while (l < s.length && s[l] === ' ') l++;
        while (r > l && s[r] === ' ') r -= 1;
        return s.substring(l, r + 1);
    }
    function compareObjects(o1, o2) {
        var k = '';
        for (k in o1) if (o1[k] !== o2[k]) return false;
        for (k in o2) if (o1[k] !== o2[k]) return false;
        return true;
    }
    function itemExists(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
        return false;
    }
        function searchFor(toSearch) {
            toSearch = trimString(toSearch); // trim it
            if (data.length === 0) {
            }
            else {
                data.map((val) => {
                    let results = []
                    for (var i = 0; i < val.length; i++) {
                        for (var key in val[i]) {
                            if (val[i][key].indexOf(toSearch) != -1) {
                                if (!itemExists(results, val[i])) results.push(val[i]);
                            }
                        }
                    }
                    return setResults((val) => {
                        return [...val, results]
                    });  
                })
            }setinput('')  
        }
        console.log('kamehaa',resultss)
    const sear=()=>{
        setvideoshow(true)
        const ids=[ '6FqYwhzhI_c', 'aDG1T0kJnd4']
        props.list?.map((val)=>{
            getSubtitles({
                videoID: val?.[0]?.id,
                lang: 'en'
            }).then((captions) => {
                setData((val)=>{
                    return([...val,captions])
                })
            })
            
        })
        // getSubtitles({
        //     videoID: 'aDG1T0kJnd4',
        //     lang: 'en'
        // }).then((captions) => {
        //     return setData(captions)
        // });
       
    }
    return (
        <div>
            <input value={input} onChange={(e) => {
                setinput(e.target.value); setResults([]);
            }} />
            <button onClick={searchh} className='btn-success'><FiSearch /></button>
            {props.list.map((val) => {
                return (
                    <div className="container-1 container mt-2">
                        <div className='row'>
                            <div className='col col-md-2'><img src={val?.[0]?.snippet?.thumbnails?.medium.url} style={{ width: '100%', }}></img></div>
                            <div className='col col-md-8' style={{ textAlign: 'left' }}><h6>{val?.[0]?.snippet?.title}</h6>
                                <p style={{ fontSize: '10px' }}>owner {val?.[0]?.snippet?.channelTitle}<br /><MdOutlineWatchLater /> {ytDuration.format(val[0]?.contentDetails?.duration)}</p>
                            </div>
                            <div className='col col-md-2'>
                                <p style={{ marginTop: '70px' }}><AiOutlineEye />{props.checkViews(val?.[0]?.statistics?.viewCount)}</p></div>
                        </div>
                    </div>
                )
            })}
            {(resultss.length === 0) ? <div></div> :
                <div id="wrapper" className='text-center container'>
                    <div id="parent " className='mt-4'>
                        <p style={{ textAlign: 'left', fontSize: '10px' }}>in this video</p>
                        <div className='line' >
                            {
                               resultss?.map((val,index) => {
                                    return (
                            
                                            <div key={index} onClick={() => changeTime(val.start)} className='dot1' style={{ left: `${(val.start)/10}%` }}>
                                                <div className='outer'></div>
                                                <div className='inner'></div>                                           
                                                 </div>
                                        
                                    )
                                })
                            }
                        </div>
                        <div className="a b c">
                        {resultss.map((val,index)=>{
                            return(
                                
                                <a className='box' key={index}>
                            <div className="from" style={{fontSize:'10px'}}> form {val.start}
                            </div>
                            <div className="txt t" style={{fontSize:'12px',width:'fit-content'}}>
                                        {val.text}
                            </div></a>
                               
                            )
                        })}
                        
                        </div>

                    </div>
                </div>
            }
            <p></p>
            <button type="submit" onClick={sear}>Search</button>
              {
                showvideo && <YouTube
                videoId='ZL4qVB2Jy84'
                opts={opts}
                onReady={onReady}
            />
              }    
    </div>

    );
}

export default SearchInObj;

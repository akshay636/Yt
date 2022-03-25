import React, { useState } from 'react';
import { getSubtitles } from 'youtube-captions-scraper';
import YouTube from "react-youtube";
import './Home.css'
import maxresdefault from './maxresdefault.jpg'
import { AiOutlineEye } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
const ytDuration = require('youtube-duration')
const SearchInObj = () => {
    const [data, setData] = useState(null)
    const [input, setinput] = useState('');
    const [resultss, setResults] = useState([]);
    const [player, setPlayer] = useState(null);

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
    getSubtitles({
        videoID: '50JnZw8Jj0s',
        lang: 'en'
    }).then((captions) => {
        return setData(captions)
    });
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
    var objects = [];
    function searchFor(toSearch) {
        var results = [];
        toSearch = trimString(toSearch); // trim it
        for (var i = 0; i < data?.length; i++) {
            for (var key in data?.[i]) {
                if (data[i]?.[key]?.indexOf(toSearch) !== -1) {
                    if (!itemExists(results, data?.[i])) results.push(data?.[i]);
                }
            }
        }
        setResults(results);
        return resultss;
    }
    return (
        <div>
            <h1>search keyword</h1>
            <input  onChange={(e) => {
                setinput(e.target.value)
            }} />
            <button onClick={searchh}>Search</button>
            <div className="container-1 container mt-4">
                <div className='row '>
                    <div className='col col-md-2'><img  src={maxresdefault} style={{width:'100%',}}></img></div>
                    <div className='col col-md-8' style={{ textAlign: 'left' }}><h6>Google Developers</h6>
                        <p style={{fontSize:'10px'}}>owner Google Developers<br/><MdOutlineWatchLater /> 1m15s</p>  
                    </div>
                    <div className='col col-md-2'>
                        <p style={{ marginTop: '70px' }}><AiOutlineEye />  4.3k</p></div>
                </div>
            </div>
            {(resultss.length === 0) ? <div></div> :
                <div id="wrapper" className='text-center container'>
                    <div id="parent " className='mt-4'>
                        <p style={{ textAlign: 'left', fontSize: '10px' }}>in this video</p>
                        <div className='line' >
                            {
                               resultss?.map((val,index) => {
                                    return (
                                       
                                            <div key={index} onClick={() => changeTime(val.start)} className='dot1' style={{ left: `${index*8}%` }}>
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
                            <div className="txt t">
                                        {val.text}
                            </div></a>
                               
                            )
                        })}
                        
                        </div>

                    </div>
                </div>
            }

            <p></p>
            <YouTube
                videoId='50JnZw8Jj0s'
                opts={opts}
                onReady={onReady}
            />
            {

            }


        </div>

    );
}

export default SearchInObj;

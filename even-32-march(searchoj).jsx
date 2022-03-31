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
    const [showvideo, setvideoshow] = useState(false);
    const [index1, setIndex] = useState(null);

    const onReady = (event) => {
        setPlayer(event.target)
        event.target.playVideo();
    }
    const changeTime = (seconds) => {
        player.seekTo(seconds)
        player.playVideo();
    }
    const opts = {
        autoplay: 0,
        width: '420',
        height: '320',

    }
    const searchh = (e) => {
        e.preventDefault();
        console.log('search data', searchFor(input));
    }


    const playid = (index) => {
        setIndex(index)

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
        if (props.data?.length === 0) {
        }
        else {
            props.data?.map((val) => {
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
        } setinput('')
    }
    console.log('hhhh', resultss);
   
    return (
        <div>
            <input style={{ marginTop: '10px' }} value={input} onChange={(e) => {
                setinput(e.target.value); setResults([]);
            }} />
            <button style={{ marginTop: '10px' }} onClick={searchh} className='btn-success'><FiSearch /></button>
            <h3 style={{ textAlign: 'left', marginLeft: '67px' }}>About {resultss.length} results</h3>
            {props.list.map((val, index) => {
                return (
                    <>  {(resultss.length === 0) ? <div></div> : <div>
                        <>   <div className='container'>
                            <div class="row mt-5 ">
                                <div class="col-lg-12">

                                    <div style={{ display: "flex" }} className="keycard" >
                                        <img src={val?.[0]?.snippet?.thumbnails?.medium.url} alt="..." width="300px" height="160px" />
                                        <div style={{ marginLeft: "10px" }}>

                                            <h4 style={{ margin: "0px", textAlign:'left' }} className="card-title"> {val?.[0]?.snippet?.title}</h4>


                                            <p style={{ marginTop: "1px" }} class="card-text text-start">owner {val?.[0]?.snippet?.channelTitle}</p>

                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
                                                <a href="#" className="btn btn-danger">Go doewn</a>

                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        </>
                        <div
                            className="container-k container cyt overflow-scroll mt-4"
                            style={{ backgroundColor: "#FFF1F3" }}
                        >
                            {resultss[index]?.map((val, index) => {
                                return (
                                    <>

                                        <div className="row">
                                            <div>
                                                <hr style={{ color: "red", height: "3px" }} />

                                                <div className="mx-2 mt-0">

                                                    <div
                                                        onClick={() => { playid(props.data[index]); changeTime(val.start) }}
                                                        className="dot-k"
                                                        style={{ top: "-33px" }}
                                                    >
                                                        <div className='outer'></div>
                                                        <div className='inner'></div>
                                                    </div>
                                                    <div style={{ height: '106px', maxHeight: "150px", borderRight: '1px solid #C4C4C4', textAlign: 'left', marginTop: '-14px' }}>
                                                        <p style={{ fontSize: "10px", marginLeft: '-3px', color: 'blue' }}> from {val.start}</p>
                                                        <p
                                                            style={{ fontSize: "13px", wordWrap: "break-word", textOverflow: 'ellipsis' }}
                                                            className="card-text text-truncate"
                                                        >
                                                            {val.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>

                    </div>

                    }
                    </>
                )
            })}
            <p></p>
            {
                props.showvideo && <YouTube
                    videoId={props.id[0]}
                    opts={opts}
                    onReady={onReady}
                />
            }
        </div>

    );
}

export default SearchInObj;

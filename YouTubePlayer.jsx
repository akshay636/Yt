import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { GoPrimitiveDot } from 'react-icons/go'
const YouTubePlayer = () => {
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
    width: '420',
    height: '320',

  }
  return (
    <div><h1>Working...</h1>
      <YouTube
        videoId='6FqYwhzhI_c'
        opts={opts}
        onReady={onReady}
      />
      {/* <button onClick={ () => this.changeTime(600) }>Change Time</button>
        <button onClick={ () => this.changeTime(800) }>Change Time</button>
        <button onClick={ () => this.changeTime(400) }>Change Time</button> */}
      <h2 style={{ fontFamily: 'tempus sans itc' }}><a onClick={() => changeTime(60)}><GoPrimitiveDot /></a><a onClick={() => changeTime(20)}><GoPrimitiveDot /></a><a onClick={() => changeTime(3)}><GoPrimitiveDot /></a><a onClick={() =>changeTime(400)}><GoPrimitiveDot /></a></h2>

    </div>
  );
}


export default YouTubePlayer;
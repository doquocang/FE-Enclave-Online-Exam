import React from "react";
import ReactPlayer from "react-player";

const StudyPage = (props) => {
  return (
    <>
      <div>Study Page</div>
      {/* <div className="App">
        <h1>Audio Streaming Example</h1>
        <ReactPlayer
          url="https://file-examples.com/storage/fe4996602366316ffa06467/2017/11/file_example_MP3_5MG.mp3"
          controls={true}
          width="100%"
          height="auto"
          playing={true}
        />
      </div> */}
      <div className="App">
        <h1>Audio Streaming Example</h1>
        <audio controls>
          <source src="https://vgmsite.com/soundtracks/duck-tales/skpzluagjv/07%20Moon%20Surface%20%28The%20Moon%29.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
};

export default StudyPage;

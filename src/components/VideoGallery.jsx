

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import video1 from "../Images3/h3.mp4";
import video2 from "../Images3/m1.mp4";

const VideoSection = styled.section`
  padding: 60px 20px;
//   background: #f0f4f8;
background:#119458;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const VideoBox = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  min-width: 200px;
//   height:250px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  background: #000;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit:cover;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  z-index: 2;
  font-style:italic;
  pointer-events: none;
  text-align:center;
`;


const VideoGallery = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <VideoSection>
      <VideoBox>
        {/* <OverlayText>Making Impacts</OverlayText> */}
        <StyledVideo src={video1} controls autoPlay muted loop />
      </VideoBox>

      <VideoBox>
        {/* <OverlayText>Making Impacts</OverlayText> */}
        <StyledVideo src={video2} controls autoPlay muted loop />
      </VideoBox>
    </VideoSection>
  );
};

export default VideoGallery;

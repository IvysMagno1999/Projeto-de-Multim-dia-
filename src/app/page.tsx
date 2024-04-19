'use client'

import { useContext, useState, useEffect } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay } from "react-icons/fa";
import videos, { Video } from './data/video';
import { convertTimeToString } from "./utils/Utils";

export default function Home() {
  const [showFilter, setShowFilter] = useState(true);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const {
    videoURL,
    playing,
    totalTime,
    currentTime,
    videoRef,
    canvasRef,
    playPause,
    configCurrentTime,
    configVideo,
    configFilter
  } = useContext(HomeContext);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);
  return (
    <main className="mx-auto w-[80%] mt-2 flex">
      <div className="w-[65%] mr-1">
        <video className="w-full" ref={videoRef} src={videoURL} hidden={showFilter}></video>
        <canvas className="w-full h-[380px]" ref={canvasRef} hidden={!showFilter}></canvas>

        <div className="bg-black">
          <input className="appearance-none
                            [&::-webkit-slider-runnable-track]:appearance-none
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-runnable-track]:bg-[tomato]
                            [&::-webkit-slider-runnable-track]:h-[10px]
                            [&::-webkit-slidershowFilter-thumb]:h-[10px]
                            [&::-webkit-slider-thumb]:w-[10px]
                            [&::-webkit-slider-thumb]:bg-[green]"
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
          >
          </input>
          <button className="text-white" onClick={playPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          {/* Controle de volume */}
          <span className="ml-[20px] text-white ">Volume:</span>
            <input
              className="w-[15%] mr-[20px] ml-[10px] [&::-webkit-slider-runnable-track]:bg-[gray]"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
            <span className="text-white ">{(volume * 100).toFixed(0)}%</span>
            {/* Barra deslizante para controlar a velocidade de reprodução */}
            <span className="ml-[390px] text-white ">Velocidade de reprodução: </span>
            <input className=" ml-[10px] [&::-webkit-slider-runnable-track]:bg-[gray]"
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
            />
            <span className="ml-[10px] text-white ">{playbackRate.toFixed(1)}x</span>
          <select onChange={(e) => configFilter(Number(e.target.value))} hidden={!showFilter}>
          <option selected value={0}>Sem filtro</option>
            <option value={1}>Verde</option>
            <option value={2}>Azul</option>
            <option value={3}>Vermelho</option>
            <option value={4}>Preto e branco</option>
          </select>
        <input type="checkbox" name="Filtro" onChange={()=>setShowFilter(!showFilter)}/>
          <span className="text-white">
          {convertTimeToString(currentTime)}:{convertTimeToString(totalTime)}
          </span>
        </div>
      </div>
      <div className="w-[35%] h-[100vh]">
        {
          videos.map((video:Video, index) => {
            return (
              <button className="w-full" onClick={(e) => configVideo(index)}>
                <img key={index} className="w-full h-[200px] mb-1" src={video.imageURL}></img>
              </button>
            )
          })
        }
      </div>
    </main>
  );
}

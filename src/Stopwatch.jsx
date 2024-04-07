import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const intervalIdRef = useRef(null);
	const startTimeRef = useRef(0);

	useEffect(() => {
		if (isRunning) {
			intervalIdRef.current = setInterval(() => {
				setElapsedTime(Date.now() - startTimeRef.current);
			}, 10);
		}
		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, [isRunning]);

	function start() {
		setIsRunning(true);
		startTimeRef.current = Date.now() - elapsedTime;
	}

	function stop() {
		setIsRunning(false);
	}

	function reset() {
		setElapsedTime(0);
		setIsRunning(false);
	}

	function formatTime() {
		let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
		let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
		let seconds = Math.floor((elapsedTime / 1000) % 60);
		let milliseconds = Math.floor((elapsedTime % 1000) / 10);

		hours = String(hours).padStart(2, "0");
		minutes = String(minutes).padStart(2, "0");
		seconds = String(seconds).padStart(2, "0");
		milliseconds = String(milliseconds).padStart(2, "0");

		return `${hours}:${minutes}:${seconds}:${milliseconds}`;
	}

	return (
		<div className="flex flex-col items-center border-4 border-gray-950 rounded-3xl bg-slate-300 p-8 mt-24">
			<div className="text-5xl font-mono font-bold text-gray-700 custom-text-shadow mb-6">
				{formatTime()}
			</div>
			<div>
				<button
					onClick={start}
					className="custom-button bg-green-900 hover:bg-green-950"
				>
					Start
				</button>
				<button
					onClick={stop}
					className="custom-button bg-red-900 hover:bg-red-950"
				>
					Stop
				</button>
				<button
					onClick={reset}
					className="custom-button bg-blue-900 hover:bg-blue-950"
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default Stopwatch;

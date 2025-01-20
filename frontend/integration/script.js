let themeButton = document.getElementsByClassName("theme-btn")[0];
let bodyContainer = document.getElementsByClassName("body-container");
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const recordedVideo = document.getElementById('recordedVideo');
console.log(bodyContainer);

let mediaRecorder;
let audioChunks = [];
let videoChunks = [];



async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        recordedVideo.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                if (event.data.type.includes('audio')) {
                    audioChunks.push(event.data);
                } else if (event.data.type.includes('video')) {
                    videoChunks.push(event.data);
                }
            }
        };

        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: 'video/webm' });

            const formData = new FormData();
            formData.append('video', videoBlob, 'recording.mp4');

            fetch('http://127.0.0.1:5000/upload-audio-video', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                recordedVideo.srcObject = null;
                recordedVideo.src = URL.createObjectURL(videoBlob);
            })
            .catch(error => console.error('Error:', error));

            audioChunks = [];
            videoChunks = [];
            window.location.reload();
        };

        mediaRecorder.start();
        startButton.disabled = true;
        stopButton.disabled = false;

    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
        window.alert('Video was successfully recorded and saved in backend with path:backend/audio_video_recordings.');
    }
}

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);


//Toggle theme functionality:

//Setting default text of toggle-theme outside addEventListener 
themeButton.textContent = "Dark Mode";

//setting the default bg color as white:
for (let i = 0; i < bodyContainer.length; i++){
    bodyContainer[i].style.backgroundColor = "white";
}


themeButton.addEventListener("click", () => {
    for (let i = 0; i < bodyContainer.length; i++){ 

        if (bodyContainer[i].style.backgroundColor == "white") {
           bodyContainer[i].style.backgroundColor = "rgb(49, 48, 48)";
        }

        else {
           bodyContainer[i].style.backgroundColor = "white";
        }
    }
     // Change theme button style
    
    if (themeButton.style.backgroundColor === "black" || themeButton.style.backgroundColor === "") {
        themeButton.style.backgroundColor = "white";
        themeButton.style.color = "black";
        themeButton.textContent = "Light Mode";
    }
    else {
        themeButton.style.backgroundColor = "black";
        themeButton.style.color = "white";
        themeButton.textContent = "Dark Mode";
    }

})
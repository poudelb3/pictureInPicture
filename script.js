const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, the 
// 'async' inFrontOf a function allows us to use 'await'
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        // Catch Error Here
        console.log('whoops, error here:', error);
    }
}

button.addEventListener('click', async () => {
    // Disable Button when clicked
    button.disabled = true;
    // Start Picture in Picture; waiting for videoElement to request
    // nothing happens until the request is made
    await videoElement.requestPictureInPicture();
    // Reset Button; happens only when pictureInPicture is successfully requested,
    // if not button will remain disabled.
    button.disabled = false;
});

// On Load
selectMediaStream();

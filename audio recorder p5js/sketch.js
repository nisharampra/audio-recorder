let micInput, recorder, soundBlob, recordButton;
let isRecording = false;

function setup() {
    noCanvas();

    // Create a microphone input
    micInput = new p5.AudioIn();
    micInput.start();

    // Create a sound recorder
    recorder = new p5.SoundRecorder();
    recorder.setInput(micInput); // Set the input to the microphone

    // Create a sound file to save the recording
    soundBlob = new p5.SoundFile();

    // Create a button to toggle recording
    recordButton = createButton('Start Recording');
    recordButton.mousePressed(toggleRecording);
    recordButton.style('margin', '10px');
}

function toggleRecording() {
    if (!isRecording) {
        // Start recording
        console.log('Recording started...');
        recorder.record(soundBlob);
        isRecording = true;
        recordButton.html('Stop Recording');
    } else {
        // Stop recording
        console.log('Recording stopped. Saving file...');
        recorder.stop(); // Stops recording
        isRecording = false;
        recordButton.html('Start Recording');

        // Ensure there is data in the soundBlob before saving
        if (soundBlob.buffer && soundBlob.buffer.length > 0) {
            soundBlob.save('recording.wav');
        } else {
            console.error('Recording failed. No audio data found.');
        }
    }
}

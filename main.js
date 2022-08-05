leftWristX = 0;
leftWristY = 0;
score_leftWrist = 0;

song1_status = "";
song2_status = "";

song1 = "";
song2 = "";

scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_leftWrist = results[0].pose.keypoints[9].score;

        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}

function modelLoaded() {
    console.log("Posenet is initialize");
}

function draw() {
    image(video, 0, 0, 600, 420);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("red");
    stroke("red");

    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 25);

        song2.stop();

        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Song is Playing"
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        song2.stop();

        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Song is Playing"
        }
    }

}

console.log("complete");
    function play() {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }

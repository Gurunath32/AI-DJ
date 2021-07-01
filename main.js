song="";
left_wristX=0;
right_wristX=0;
left_wristY=0;
right_wristY=0;
scorerightwrist=0;
scoreleftwrist=0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized");
}

function draw() {
    image(video,0,0,600,500);

    fill('#ff0000');
    stroke('#ff0000');

    if(scoreleftwrist > 0.2) {
    circle(left_wristX,left_wristY,20);
    innumberleftwristY=Number(left_wristY);
    removedecimels=floor(innumberleftwristY);
    volume=removedecimels/500;
    document.getElementById("volume").innerHTML="Volume is = "+volume;
    song.setVolume(volume);
    console.log(volume);
    }

    if(scorerightwrist > 0.2) {
        console.log("test")
        circle(right_wristX,right_wristY,20);

        if(right_wristY > 0 && right_wristY <= 100) {
            document.getElementById("speed").innerHTML="Speed Is 0.5x"
        }
        else if(right_wristY > 100 && right_wristY <= 200) {
            document.getElementById("speed").innerHTML="Speed Is 1x"
        }
        else if(right_wristY > 200 && right_wristY <= 300) {
            document.getElementById("speed").innerHTML="Speed Is 1.5x"
        }
        else if(right_wristY > 300 && right_wristY <= 400) {
            document.getElementById("speed").innerHTML="Speed Is 2x"
        }
        else if(right_wristY > 400 && right_wristY <= 500) {
            document.getElementById("speed").innerHTML="Speed Is 2.5x"
        }
    }
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(2.5);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        left_wristX=results[0].pose.leftWrist.x;
        left_wristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist x is "+left_wristX+" Left Wrist y is "+left_wristY);
        scoreleftwrist=results[0].pose.keypoints[9].score;

        right_wristX=results[0].pose.rightWrist.x;
        right_wristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist x is "+right_wristX+" Right Wrist y is "+right_wristY);
        scorerightwrist=results[0].pose.keypoints[10].score;
    }
}
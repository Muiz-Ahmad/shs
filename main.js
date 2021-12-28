song = "";
leftWristX=0;
leftWristY=0;
var scoreLeftWrist=0;
var scoreRightWrist=0;
rightWristX=0;
rightWristY=0;

function setup(){
canvas = createCanvas(600, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded);
posenet.on('pose',gotposes)
}

function draw(){
image(video, 0, 0, 600, 500)
fill("#FF0000");
stroke("FF0000");

if(scoreRightWrist > 0.2){
circle(rightWristX,rightWristY,20)

if(rightWrist >0 && rightWristY <= 100){
    document.getElementById("speed").innerHTML = "Speed = 0.5x"
    song.rate(1);
}

else if(rightWrist >100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1x"
    song.rate(1);
}

else if(rightWrist >200 && rightWristY <= 300){
    document.getElementById("speed").innerHTML = "Speed = 1.5x"
    song.rate(1.5);
}

else if(rightWrist >300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML = "Speed = 2x"
    song.rate(2);
}

else if(rightWrist >400 && rightWristY <= 500){
    document.getElementById("speed").innerHTML = "Speed = 2.5x"
    song.rate(2.5);
}
}


if(scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
leftWristY_divide_1000 = remove_decimals/1000;
volume = leftWristY_divide_1000 *2;
document.getElementById("volume").innerHTML = "volume = " + volume;
song.setVolume(volume);
}
}
 
function preload(){
song = loadSound("music.mp3")
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);

}
function modelloaded(){
console.log("posenet is initialised")
}
function gotposes(results){
if(results.length>0){
console.log(results);
scoreRightWrist = results[0].pose.keypoints[10].score;
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("leftWristx="+leftWristX+"leftWristY="+leftWristY);


rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("rightWristx="+rightWristX+"rightWristY="+rightWristY);
}
}
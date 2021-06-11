prediction_1 = "";
prediction_2="";
Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "Take Selfie" src = "' + data_uri + '"/>';
    });
}

console.log('ml5 version is' , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eaZHVyg80/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = " The first Prediction Is " + prediction_1;
    speak_data_2 = "And second Prediction Is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("Take Selfie");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("gesture_name").innerHTML=results[0].label;
        document.getElementById("gesture_name2").innerHTML=results[1].label;
prediction_1=results[0].label;
prediction_2=results[1].label;
speak();
if(results[0].label=="best"){
document.getElementById("update_gesture").innerHTML= "&#128077;";
}
if(results[0].label=="Victory"){
    document.getElementById("update_gesture").innerHTML="&#9996;" ;
    }
    if(results[0].label=="Nice"){
        document.getElementById("update_gesture").innerHTML="&#128076;";
        }
        if(results[1].label=="best"){
            document.getElementById("update_gesture2").innerHTML="&#128077;" ;
            }
            if(results[1].label=="Victory"){
                document.getElementById("update_gesture2").innerHTML= "&#9996;";
                }
                if(results[1].label=="Nice"){
                    document.getElementById("update_gesture2").innerHTML="&#128076;";
                    }
    }
}


    
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
  console.log('Model Loaded!')
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}
var prevResult="";
function gotResult(error, results){
  if(error){
    console.error(error);
  }
  if((results[0].confidence>0.5)&&(prevResult!= results[0].label)){
  console.log(results);
  document.getElementById("result_object_name").innerHTML=results[0].label;
  document.getElementById("result_accuracy_name").innerHTML=results[0].confidence.toFixed(3);
  var synth= window.speechSynthesis;
  utterthis= new SpeechSynthesisUtterance(results[0].label);
  prevResult=results[0].label;  
  }
}




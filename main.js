var SpeechRecognition=window.webkitSpeechRecognition;
var recognition= new SpeechRecognition();
var Content;

function start(){
document.getElementById("textbox").innerHTML="";
recognition.start();
}

recognition.onresult=function(event){
console.log(event);
var Content=event.results[0][0].transcript;
console.log(Content);
document.getElementById("textbox").innerHTML=Content;
if(Content=="take my selfie"){
console.log("Taking Selfie In 5 Seconds");
speak();

}


}

function speak(){
var synth=window.speechSynthesis;
speak_data="Taking selfie in 5 seconds";
Webcam.attach(camera);

setTimeout(function(){
    img_id="selfie_1";

take_snapshot();
speak_data="taking your selfie in 5 secords";
var utterThis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
},5000);
setTimeout(function(){
    img_id="selfie_2";

take_snapshot();
speak_data="taking your selfie in 10 secords";
var utterThis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
},10000);
setTimeout(function(){
    img_id="selfie_3";

take_snapshot();
speak_data="taking your selfie in 15 secords";
var utterThis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
},15000);


} 
camera=document.getElementById("camera");
Webcam.set({
width:360,
height: 250,
image_format: 'png',
png_quality:90
}
);


function take_snapshot(){
Webcam.snap(function(data_uri){
if (img_id=="selfie_1") {
    document.getElementById("result1").innerHTML='<img id="selfie_1" src="'+ data_uri+'">';    
}
if (img_id=="selfie_2") {
    document.getElementById("result2").innerHTML='<img id="selfie_2" src="'+ data_uri+'">';    
}
if (img_id=="selfie_3") {
    document.getElementById("result3").innerHTML='<img id="selfie_3" src="'+ data_uri+'">';    
}

});
}
function save(){
link=document.getElementById("link");
image=document.getElementById("selfie_img").src;
link.href=image;
link.click();
}

if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                var parent = elem.parentElement || head;
                parent.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
            console.log('Live reload enabled.');
            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
        }
    })();
}
else {
    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
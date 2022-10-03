const textarea= document.querySelector("textarea");
const vocallist=document.querySelector("select");
const btn=document.querySelector("button");

let snyth=speechSynthesis,
isSpeaking=true;
voices();
function voices(){
    for(let voice of snyth.getVoices()){
        let selected= voice.name === "Google US English" ? "selected":"";

        let option =`<option value="${voice.name}"${selected}>${voice.name}</option>`;
        vocallist.insertAdjacentHTML("beforeend",option);
    }
}
snyth.addEventListener("voiceschanged",voices);


function texttospeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of snyth.getVoices()){
        if(voice.name === vocallist.value){
            utterance.voice=voice;
        }
    }
    speechSynthesis.speak(utterance);
}

btn.addEventListener("click",e=>{
    e.preventDefault();
    if(textarea.value !="")
        if(!snyth.speaking){
            texttospeech(textarea.value);

        }
        if(textarea.value.length>80){
            if(isSpeaking){
                snyth.resume();
                btn.innerHTML="Pause speech";
                isSpeaking=false;
            }
            else{
                snyth.pause();
                btn.innerHTML="resume speech";
                isSpeaking=true;
            }

            setInterval(()=>{
                if(!snyth.speaking && !isSpeaking){
                    isSpeaking=true;
                    btn.innerHTML="Convert to Speech";
                }
            });

        }else{
            btn.innerHTML="Convert to Speech";

        }
});

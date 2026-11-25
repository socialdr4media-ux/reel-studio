import{$,video,cv,st}from"./state.js";
import{renderList,loadFont}from"./editor.js";
import{audio}from"./player.js";

let dl=null;window.claude&&claude.use&&claude.use("downloads").then(d=>dl=d).catch(()=>{});

export const isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Mac/.test(navigator.userAgent));
export async function saveBlob(blob,name,shareOnlyMobile=false){
 if(dl){try{await dl.save({filename:name,data:blob});return}catch(err){}}
 const f=new File([blob],name,{type:blob.type});
 if((!shareOnlyMobile||isMobile)&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f]});return}catch(err){}}
 const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}

function mime(){for(const m of["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm"])if(window.MediaRecorder&&MediaRecorder.isTypeSupported(m))return m;return""}

export function initExport(){
 $("#exp").onclick=async()=>{audio();await st.actx?.resume();await Promise.all(st.els.map(e=>loadFont(e.font)));
  const m=mime();if(!m){$("#out").textContent="Dieser Browser kann leider keine Videos aufnehmen. Bitte Safari oder Chrome in aktueller Version nutzen.";return}
  const vs=cv.captureStream(30);const ms=new MediaStream([...vs.getVideoTracks(),...(st.dest?st.dest.stream.getAudioTracks():[])]);
  const rec=new MediaRecorder(ms,{mimeType:m,videoBitsPerSecond:10e6,audioBitsPerSecond:160e3});const chunks=[];rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  st.exporting=true;st.sel=-1;renderList();$("#exp").disabled=true;$("#prog").style.display="block";$("#out").innerHTML="";if(st.spk)st.spk.gain.value=0;
  video.pause();video.currentTime=0;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
  rec.start(500);await video.play();
  video.addEventListener("ended",()=>setTimeout(()=>rec.stop(),250),{once:true});
  rec.onstop=()=>{st.exporting=false;if(st.spk)st.spk.gain.value=1;$("#exp").disabled=false;$("#prog").style.display="none";$("#play").textContent="▶︎ Abspielen";
   const ext=m.includes("mp4")?"mp4":"webm";const blob=new Blob(chunks,{type:m.split(";")[0]});const url=URL.createObjectURL(blob);const name=`reel_${new Date().toISOString().slice(0,16).replace(/[-:T]/g,"")}.${ext}`;
   $("#out").innerHTML=`<p><b>Fertig!</b> ${(blob.size/1e6).toFixed(1)} MB</p><div class="row"><button class="main" id="save">Speichern</button></div><video src="${url}" controls playsinline></video>`;
   $("#save").onclick=()=>saveBlob(blob,name)}};
}

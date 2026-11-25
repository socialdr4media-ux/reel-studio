import{$,video,cv,st,brand,store,TYPES}from"./state.js";
import{saveBlob}from"./export.js";

const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let notes=store("notes")||[],draft=null,rec=null,listening=false;

const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const clean=o=>JSON.parse(JSON.stringify(o,(k,v)=>k==="_box"?undefined:v));
const sec=t=>(+t).toFixed(1).replace(".",",")+" s";
const stamp=()=>new Date().toISOString().slice(0,16).replace(/[-:]/g,"").replace("T","_");

function thumb(){try{if(cv.style.display==="none"||!cv.width)return null;const w=320,h=Math.round(320*cv.height/cv.width);
 const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(cv,0,0,w,h);return c.toDataURL("image/jpeg",.7)}catch(e){return null}}

function persist(){try{localStorage.setItem("rs_notes",JSON.stringify(notes));return true}catch(e){return false}}

function status(t){$("#fbStatus").textContent=t||""}

function stopRec(){if(rec&&listening){try{rec.stop()}catch(e){}}}

function startRec(){if(!SR){status("Spracherkennung gibt es in diesem Browser nicht. Tippe die Notiz oder nutze das Mikrofon der Tastatur zum Diktieren.");$("#fbText").focus();return}
 const base=$("#fbText").value?$("#fbText").value.trim()+" ":"";
 try{rec=new SR();rec.lang="de-DE";rec.interimResults=true;rec.continuous=true;
  rec.onresult=ev=>{let t="";for(let i=0;i<ev.results.length;i++)t+=ev.results[i][0].transcript;$("#fbText").value=base+t.trim()};
  rec.onerror=ev=>{status(ev.error==="not-allowed"?"Mikrofon nicht erlaubt. Tippe die Notiz oder nutze das Mikrofon der Tastatur.":"Spracherkennung hat nicht geklappt. Du kannst die Notiz auch tippen.")};
  rec.onend=()=>{listening=false;$("#fbTalk").classList.remove("rec");$("#fbTalkLabel").textContent="Weiter sprechen";if(!$("#fbStatus").textContent.startsWith("Mikrofon")&&!$("#fbStatus").textContent.startsWith("Sprach"))status("Prüfe den Text, ändere ihn bei Bedarf und tippe auf Notiz speichern.")};
  rec.start();listening=true;$("#fbTalk").classList.add("rec");$("#fbTalkLabel").textContent="Aufnahme beenden";status("Ich höre zu. Sprich jetzt.")}
 catch(e){listening=false;status("Spracherkennung hat nicht geklappt. Du kannst die Notiz auch tippen.");$("#fbText").focus()}}

function begin(){const e=st.els[st.sel];
 draft={id:Date.now().toString(36),ts:new Date().toISOString(),videoTime:+(video.currentTime||0).toFixed(2),
  element:e?clean(e):null,template:st.tpl,scheme:st.scheme,thumb:thumb()};
 $("#fbEdit").style.display="grid";$("#fbText").value="";
 $("#fbCtx").textContent=`Bei ${sec(draft.videoTime)}`+(e?`, Element: ${TYPES[e.type]} „${(e.text||"").split("\n")[0]}“`:", kein Element ausgewählt");}

function renderNotes(){const L=$("#fbList");
 L.innerHTML=notes.length?notes.slice().reverse().map(n=>`<div class="note">${n.thumb?`<img src="${n.thumb}" alt="">`:"<div></div>"}<div><div class="hint">${new Date(n.ts).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})} · bei ${sec(n.videoTime)}${n.element?` · ${esc(TYPES[n.element.type]||n.element.type)}`:""}</div><p>${esc(n.text)}</p><button class="sm" data-del="${n.id}" style="color:#c00">Löschen</button></div></div>`).join("")
  :`<p class="hint">Noch keine Notizen.</p>`;
 $("#fbCount").textContent=notes.length?`(${notes.length})`:"";
 L.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{if(!confirm("Diese Notiz löschen?"))return;notes=notes.filter(n=>n.id!==b.dataset.del);persist();renderNotes()})}

export function initFeedback(){
 $("#fbTalk").onclick=()=>{if(listening){stopRec();return}
  if(!draft)begin();
  if(SR)startRec();else{status("Tippe deine Notiz. Auf dem iPhone kannst du das Mikrofon der Tastatur zum Diktieren nutzen.");$("#fbText").focus()}};
 $("#fbSave").onclick=()=>{const t=$("#fbText").value.trim();if(!t){status("Die Notiz ist noch leer.");return}stopRec();
  notes.push({...draft,text:t});
  if(!persist()){notes[notes.length-1].thumb=null;if(!persist()){notes.pop();status("Speicher ist voll. Bitte exportiere das Feedback und lösche alte Notizen.");return}}
  draft=null;$("#fbEdit").style.display="none";$("#fbTalkLabel").textContent="Feedback sprechen";status("");renderNotes()};
 $("#fbCancel").onclick=()=>{stopRec();draft=null;$("#fbEdit").style.display="none";$("#fbTalkLabel").textContent="Feedback sprechen";status("")};
 $("#fbExport").onclick=async()=>{
  const data={app:"Reel Studio",version:1,exportedAt:new Date().toISOString(),brand,template:st.tpl,scheme:st.scheme,
   video:video.duration?{duration:+video.duration.toFixed(2),width:video.videoWidth,height:video.videoHeight}:null,
   elements:clean(st.els),notes};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  await saveBlob(blob,`feedback_${stamp()}.json`,true)};
 renderNotes();
}

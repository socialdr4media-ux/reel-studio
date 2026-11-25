import{$,video,cv,st}from"./state.js";
import{renderList}from"./editor.js";

export function audio(){if(st.actx)return;try{st.actx=new(window.AudioContext||window.webkitAudioContext)();const src=st.actx.createMediaElementSource(video);st.spk=st.actx.createGain();st.dest=st.actx.createMediaStreamDestination();src.connect(st.spk);st.spk.connect(st.actx.destination);src.connect(st.dest)}catch(err){console.log(err)}}

export function initPlayer(onFirstLoad){
 $("#empty").onclick=()=>$("#file").click();
 $("#file").onchange=e=>{const f=e.target.files[0];if(!f)return;video.src=URL.createObjectURL(f);video.load()};
 video.onloadedmetadata=()=>{const vw=video.videoWidth,vh=video.videoHeight,k=Math.min(1,1920/Math.max(vw,vh));st.W=cv.width=Math.round(vw*k/2)*2;st.H=cv.height=Math.round(vh*k/2)*2;st.S=st.W/720;
  $("#empty").style.display="none";cv.style.display="block";["#play","#seek","#exp"].forEach(s=>$(s).disabled=false);$("#seek").max=video.duration;
  if(!st.els.length)onFirstLoad();else renderList();video.currentTime=.01};
 $("#play").onclick=()=>{audio();st.actx&&st.actx.resume();if(video.paused){video.play();$("#play").textContent="❚❚ Pause"}else{video.pause();$("#play").textContent="▶︎ Abspielen"}};
 video.onended=()=>{$("#play").textContent="▶︎ Abspielen"};
 $("#seek").oninput=e=>{video.currentTime=+e.target.value};

 let drag=null;
 function pt(ev){const r=cv.getBoundingClientRect();return{x:(ev.clientX-r.left)/r.width*st.W,y:(ev.clientY-r.top)/r.height*st.H}}
 cv.addEventListener("pointerdown",ev=>{const p=pt(ev),t=video.currentTime;let hit=-1;
  st.els.forEach((e,i)=>{const b=e._box;if(b&&t>=e.start&&t<=e.end&&p.x>=b.x-20&&p.x<=b.x+b.w+20&&p.y>=b.y-20&&p.y<=b.y+b.h+20)hit=i});
  if(hit<0)hit=st.sel;if(hit<0)return;if(hit!==st.sel){st.sel=hit;renderList()}const e=st.els[st.sel];drag={ox:p.x-e.x*st.W,oy:p.y-e.y*st.H};cv.setPointerCapture(ev.pointerId)});
 cv.addEventListener("pointermove",ev=>{if(!drag||st.sel<0)return;const p=pt(ev),e=st.els[st.sel];e.x=Math.max(0,Math.min(1,(p.x-drag.ox)/st.W));e.y=Math.max(0,Math.min(1,(p.y-drag.oy)/st.H))});
 cv.addEventListener("pointerup",()=>drag=null);
}

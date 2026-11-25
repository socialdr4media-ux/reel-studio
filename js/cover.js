import{$,video,st,FONTS,FONTSETS}from"./state.js";
import{mk}from"./elements.js";
import{drawEl}from"./draw.js";
import{loadFont}from"./editor.js";
import{saveBlob}from"./export.js";

const FORMATS={"916":[1080,1920],"45":[1080,1350]};
let cel=null,open=false;

function coverEl(){const src=st.els.find(e=>e.type==="ctitle");
 const e=src?JSON.parse(JSON.stringify(src)):mk("ctitle");
 return Object.assign(e,{anim:"none",start:0,end:1e9,sparkle:false})}

function render(canvas,w,h){const c=canvas.getContext("2d");canvas.width=w;canvas.height=h;
 const vw=video.videoWidth||9,vh=video.videoHeight||16,k=Math.max(w/vw,h/vh);
 c.fillStyle="#222";c.fillRect(0,0,w,h);
 if(video.readyState>=2)c.drawImage(video,(w-vw*k)/2,(h-vh*k)/2,vw*k,vh*k);
 const keep={W:st.W,H:st.H,S:st.S,exporting:st.exporting};
 Object.assign(st,{W:w,H:h,S:w/720,exporting:true});
 try{drawEl(cel,1,-1,c)}finally{Object.assign(st,keep)}}

function preview(){if(!open)return;render($("#cov916"),270,480);render($("#cov45"),270,338)}

async function save(fmt){const[w,h]=FORMATS[fmt];await loadFont(cel.font);const cv=document.createElement("canvas");render(cv,w,h);
 const blob=await new Promise(r=>cv.toBlob(r,"image/jpeg",.92));
 const name=`cover_${fmt==="916"?"9x16":"4x5"}_${new Date().toISOString().slice(0,16).replace(/[-:T]/g,"")}.jpg`;
 await saveBlob(blob,name,true)}

export function initCover(){
 const f=$("#coverFont");f.innerHTML=FONTS.filter(x=>FONTSETS.ctitle.includes(x[0])).map(x=>`<option value="${x[0]}">${x[1]}</option>`).join("");
 $("#coverBtn").onclick=async()=>{open=!open;$("#coverBox").style.display=open?"grid":"none";if(!open)return;
  video.pause();$("#play").textContent="▶︎ Abspielen";cel=coverEl();
  $("#coverText").value=cel.text;f.value=cel.font;$("#coverT").max=video.duration||1;$("#coverT").value=video.currentTime;
  await Promise.all(FONTSETS.ctitle.map(loadFont));preview()};
 $("#coverT").oninput=e=>{video.currentTime=+e.target.value};
 video.addEventListener("seeked",preview);
 $("#coverText").oninput=e=>{cel.text=e.target.value;preview()};
 f.onchange=async()=>{cel.font=f.value;cel.slant=f.value==="Alfa Slab One"?10:0;await loadFont(f.value);preview()};
 $("#saveCov916").onclick=()=>save("916");
 $("#saveCov45").onclick=()=>save("45");
}

import{$,video,st,brand,store,dur}from"./state.js";
import{mk,buildTemplate}from"./elements.js";
import{renderList}from"./editor.js";
import{frame}from"./draw.js";
import{initPlayer}from"./player.js";
import{initExport}from"./export.js";

["Name","Slogan","Hook","Word"].forEach(k=>{const i=$("#b"+k);i.value=brand[k.toLowerCase()]||"";i.oninput=()=>{brand[k.toLowerCase()]=i.value;store("brand",brand)}});

function template(name){st.els=buildTemplate(name);st.sel=-1;renderList()}
document.querySelectorAll("[data-tpl]").forEach(b=>b.onclick=()=>template(b.dataset.tpl));
document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{const t=video.currentTime||0;const e=mk(b.dataset.add);
 if(!["badge","hook","cta"].includes(e.type)){e.start=+t.toFixed(1);e.end=+Math.min(dur(),t+3).toFixed(1)}
 st.els.push(e);st.sel=st.els.length-1;renderList();});

initPlayer(()=>template("finds"));
initExport();
requestAnimationFrame(frame);

import{$,video,st,brand,store,dur}from"./state.js";
import{mk,buildTemplate}from"./elements.js";
import{renderList,loadFont}from"./editor.js";
import{frame}from"./draw.js";
import{initPlayer}from"./player.js";
import{initExport}from"./export.js";

["Name","Slogan","Hook","Word"].forEach(k=>{const i=$("#b"+k);i.value=brand[k.toLowerCase()]||"";i.oninput=()=>{brand[k.toLowerCase()]=i.value;store("brand",brand)}});

function template(name){st.els=buildTemplate(name);st.tpl=name;st.sel=-1;st.els.forEach(e=>loadFont(e.font));
 document.querySelectorAll("[data-tpl]").forEach(b=>b.classList.toggle("on",b.dataset.tpl===name));renderList()}
document.querySelectorAll("[data-tpl]").forEach(b=>b.onclick=()=>template(b.dataset.tpl));
document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{const t=video.currentTime||0;const e=mk(b.dataset.add);loadFont(e.font);
 if(!["badge","hook","cta","ctitle"].includes(e.type)){e.start=+t.toFixed(1);e.end=+Math.min(dur(),t+3).toFixed(1)}
 st.els.push(e);st.sel=st.els.length-1;renderList();});

initPlayer(()=>template("celine"));
document.querySelector('[data-tpl="celine"]').classList.add("on");
initExport();
requestAnimationFrame(frame);

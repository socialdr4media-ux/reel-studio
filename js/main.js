import{$,video,st,brand,store,dur}from"./state.js";
import{mk,buildTemplate}from"./elements.js";
import{renderList,loadFont}from"./editor.js";
import{frame}from"./draw.js";
import{initPlayer}from"./player.js";
import{initExport}from"./export.js";
import{initCover}from"./cover.js";
import{SCHEMES,scheme,applyScheme}from"./schemes.js";

["Name","Slogan","Hook","Word"].forEach(k=>{const i=$("#b"+k);i.value=brand[k.toLowerCase()]||"";i.oninput=()=>{brand[k.toLowerCase()]=i.value;store("brand",brand)}});

function template(name){st.els=buildTemplate(name);st.tpl=name;st.sel=-1;st.els.forEach(e=>loadFont(e.font));
 document.querySelectorAll("[data-tpl]").forEach(b=>b.classList.toggle("on",b.dataset.tpl===name));markScheme(name==="celine"?"celine":null);renderList()}

$("#schemes").innerHTML=SCHEMES.map(s=>`<button data-scheme="${s.id}"><span class="dots"><i style="background:${s.a}"></i><i style="background:${s.b}"></i><i style="background:${s.bg}"></i></span>${s.name}</button>`).join("");
function markScheme(id){st.scheme=id;document.querySelectorAll("[data-scheme]").forEach(b=>b.classList.toggle("on",b.dataset.scheme===id))}
document.querySelectorAll("[data-scheme]").forEach(b=>b.onclick=()=>{const s=scheme(b.dataset.scheme);st.els.forEach(e=>applyScheme(e,s));markScheme(s.id);renderList()});
document.querySelectorAll("[data-tpl]").forEach(b=>b.onclick=()=>template(b.dataset.tpl));
document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{const t=video.currentTime||0;const e=mk(b.dataset.add);loadFont(e.font);if(st.scheme)applyScheme(e,scheme(st.scheme));
 if(!["badge","hook","cta","ctitle"].includes(e.type)){e.start=+t.toFixed(1);e.end=+Math.min(dur(),t+3).toFixed(1)}
 st.els.push(e);st.sel=st.els.length-1;renderList();});

initPlayer(()=>template("celine"));
document.querySelector('[data-tpl="celine"]').classList.add("on");markScheme("celine");
initExport();
initCover();
requestAnimationFrame(frame);

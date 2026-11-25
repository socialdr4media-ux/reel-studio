import{FONTS,FONTSETS,WEIGHT,COLORS,ANIMS,TYPES,$,video,st,dur}from"./state.js";

export function loadFont(f){return document.fonts.load(`${WEIGHT[f]||400} 40px "${f}"`).catch(()=>{})}

function sw(val,key,i){return `<div class="sw">${COLORS.map(c=>`<span style="background:${c}" class="${c===val?"on":""}" data-i="${i}" data-k="${key}" data-c="${c}"></span>`).join("")}</div>`}

export function renderList(){const L=$("#list");const D=dur();const els=st.els;
 L.innerHTML=els.map((e,i)=>{const open=i===st.sel;return `<div class="el ${open?"sel":""}"><div class="hd" data-sel="${i}"><b>${TYPES[e.type]}: ${(e.text||"").split("\n")[0]}</b><i>${e.start.toFixed(1)} bis ${e.end.toFixed(1)} s</i></div>${open?`<div class="bd">
 ${e.type!=="arrow"?`<div><label class="hint">${e.type==="price"?"Neuer Preis":"Text"}</label><textarea data-f="text">${e.text}</textarea></div>`:""}
 ${["badge","price"].includes(e.type)?`<div><label class="hint">${e.type==="price"?"Alter Preis":"Slogan"}</label><input type="text" data-f="sub" value="${e.sub}"></div>`:""}
 ${!["emoji","arrow"].includes(e.type)?`<div><label class="hint">Schrift</label><select data-f="font">${(FONTSETS[e.type]?FONTS.filter(f=>FONTSETS[e.type].includes(f[0])):FONTS).map(f=>`<option value="${f[0]}" ${f[0]===e.font?"selected":""} style="font-family:'${f[0]}'">${f[1]} (${f[0]})</option>`).join("")}</select></div>`:""}
 ${e.type!=="emoji"?`<div><label class="hint">${{ctitle:"Textfarbe",cbox:"Textfarbe"}[e.type]||"Farbe"}</label>${sw(e.color,"color",i)}</div><div><label class="hint">${{hook:"Balkenfarbe",price:"Schildfarbe",badge:"Slogan-Banner",rating:"Sternfarbe",ctitle:"Bandfarbe",cbox:"Zahl und Schlüsselwort"}[e.type]||"Kontur"}</label>${sw(e.color2,"color2",i)}</div>`:""}
 ${e.bg!==undefined?`<div><label class="hint">Boxfarbe</label>${sw(e.bg,"bg",i)}</div>`:""}
 ${e.type==="ctitle"?`<div><label class="hint">Schrägstellung</label><input type="range" min="0" max="20" data-f="slant" value="${e.slant||0}"></div>`:""}
 <div><label class="hint">Animation</label><select data-f="anim">${ANIMS.map(a=>`<option value="${a[0]}" ${a[0]===e.anim?"selected":""}>${a[1]}</option>`).join("")}</select></div>
 <div class="grid2"><div><label class="hint">Größe</label><input type="range" min="20" max="200" data-f="size" value="${e.size}"></div><div><label class="hint">Drehung</label><input type="range" min="-180" max="180" data-f="rot" value="${e.rot}"></div></div>
 <div class="grid2"><div><label class="hint">von (s)</label><input type="number" step="0.1" min="0" max="${D}" data-f="start" value="${e.start.toFixed(1)}"></div><div><label class="hint">bis (s)</label><input type="number" step="0.1" min="0" max="${D}" data-f="end" value="${e.end.toFixed(1)}"></div></div>
 <div class="row"><button class="sm" data-act="now">Start = jetzt</button><button class="sm" data-act="endnow">Ende = jetzt</button>
 <label class="row" style="gap:4px"><input type="checkbox" data-f="sparkle" ${e.sparkle?"checked":""}> Glitzer</label></div>
 <div class="row"><button class="sm" data-act="dup">Duplizieren</button><button class="sm" data-act="up">Nach vorne</button><button class="sm" data-act="del" style="color:#c00">Löschen</button></div>
 </div>`:""}</div>`}).join("")||`<p class="hint">Noch keine Elemente. Wähle oben eine Vorlage oder füge Elemente hinzu.</p>`;
 L.querySelectorAll("[data-sel]").forEach(h=>h.onclick=()=>{st.sel=st.sel==+h.dataset.sel?-1:+h.dataset.sel;renderList();const e=els[st.sel];if(e&&video.duration&&(video.currentTime<e.start||video.currentTime>e.end)){video.currentTime=Math.min(e.end,e.start+0.8)}});
 const e=els[st.sel];if(!e)return;
 L.querySelectorAll("[data-f]").forEach(inp=>{const f=inp.dataset.f;const ev=inp.tagName==="SELECT"||inp.type==="checkbox"||inp.type==="number"?"change":"input";
  inp.addEventListener(ev,()=>{let v=inp.type==="checkbox"?inp.checked:inp.value;if(["size","rot","start","end","slant"].includes(f))v=+v;e[f]=v;if(f==="font"){loadFont(v);if(e.type==="ctitle"){e.slant=v==="Alfa Slab One"?10:0;renderList()}}if(["start","end","anim"].includes(f))renderList()})});
 L.querySelectorAll(".sw span").forEach(s=>s.onclick=()=>{els[+s.dataset.i][s.dataset.k]=s.dataset.c;renderList()});
 L.querySelectorAll("[data-act]").forEach(b=>b.onclick=()=>{const a=b.dataset.act,t=+video.currentTime.toFixed(1);
  if(a==="now")e.start=t;if(a==="endnow")e.end=t;if(a==="dup"){els.splice(st.sel+1,0,JSON.parse(JSON.stringify(e)));st.sel++}
  if(a==="up"){els.splice(st.sel,1);els.push(e);st.sel=els.length-1}if(a==="del"){els.splice(st.sel,1);st.sel=-1}renderList()});
}

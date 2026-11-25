import{st,brand,dur}from"./state.js";

export function mk(type,o={}){const D=dur();const base={type,text:"Text",sub:"",font:"Gochi Hand",color:"#ff70aa",color2:"#ffffff",anim:"pop",size:70,rot:0,x:.5,y:.4,start:0,end:Math.min(D,3),sparkle:false};
 const def={
  badge:{text:brand.name||"Celines Finds",sub:brand.slogan||"",font:"Sniglet",color:"#ff70aa",color2:"#ffee58",anim:"drag",size:62,y:.11,end:Math.min(D,4),sparkle:true},
  hook:{text:(brand.hook||"Dein Thema hier")+"\n*das musst du sehen*",font:"Inter",color:"#141414",color2:"#ffee58",anim:"drag",size:44,y:.6,start:.5,end:Math.min(D,4.2),sparkle:true},
  sticker:{text:"so gut!",font:"Gochi Hand",color:"#ff70aa",color2:"#ffffff",anim:"wobble",size:86,y:.3,sparkle:true},
  cta:{text:`Kommentiere „${brand.word||"Link"}“\nfür den Link`,font:"Gochi Hand",color:"#ff8cbe",color2:"#ffffff",anim:"drag",size:66,y:.44,start:Math.max(0,D*.62),end:D,sparkle:true},
  price:{text:"jetzt 24,99 €",sub:"statt 39,99 €",font:"Anton",color:"#141414",color2:"#ffee58",anim:"pop",size:64,y:.7,rot:-6},
  rating:{text:"Meine Bewertung",font:"Gochi Hand",color:"#ffffff",color2:"#ffc400",anim:"pop",size:48,y:.75},
  arrow:{text:"",font:"Gochi Hand",color:"#ff70aa",color2:"#ffffff",anim:"bounce",size:120,y:.55,x:.7,rot:120},
  emoji:{text:"🍩",anim:"pop",size:120,y:.35,x:.78,rot:0}
 }[type];return Object.assign(base,def,o)}

export function buildTemplate(name){const D=dur();
 if(name==="finds")return[mk("badge"),mk("hook"),mk("cta")];
 if(name==="clean")return[mk("sticker",{text:(brand.hook||"Dein Thema hier"),font:"Anton",color:"#ffffff",color2:"#141414",anim:"slide",size:66,y:.2,end:Math.min(D,3.5),sparkle:false}),
   mk("cta",{text:`Kommentiere „${brand.word||"Link"}“`,font:"Anton",color:"#ffee58",color2:"#141414",anim:"pop",size:60,y:.2,sparkle:false})];
 if(name==="pastell")return[mk("badge",{font:"Fredoka",color:"#c4b5fd",color2:"#fde2ec",anim:"slide"}),
   mk("hook",{font:"Fredoka",color:"#2a1b24",color2:"#fde2ec",anim:"fade",sparkle:false}),
   mk("cta",{font:"Fredoka",color:"#ffffff",color2:"#c4b5fd",anim:"slide",size:56})];
 return st.els}

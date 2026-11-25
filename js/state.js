export const FONTS=[["Sniglet","Bubble"],["Gochi Hand","Handschrift"],["Caveat","Handschrift 2"],["Permanent Marker","Marker"],["Pacifico","Schreibschrift"],["Fredoka","Rund"],["Baloo 2","Rund fett"],["Inter","Clean"],["Poppins","Modern"],["Anton","Hoch & fett"],["Bangers","Comic"],["Archivo Black","Block"],["Alfa Slab One","Slab kursiv"],["Caveat Brush","Pinsel"],["Kaushan Script","Pinsel 2"],["Montserrat","Montserrat fett"]];
export const FONTSETS={ctitle:["Alfa Slab One","Caveat Brush","Kaushan Script"],cbox:["Montserrat","Poppins"]};
export const WEIGHT={"Sniglet":800,"Inter":800,"Fredoka":600,"Baloo 2":800,"Poppins":700,"Caveat":700,"Montserrat":800};
export const COLORS=["#ff70aa","#ec4899","#ffee58","#ffffff","#141414","#40a0ff","#5eead4","#c4b5fd","#fb923c","#ef4444","#22c55e","#fde2ec","#ff4fa3","#f03c9a","#6b2fbf","#1f2a6b","#fde2ef"];
export const ANIMS=[["drag","Reinziehen mit Mauszeiger"],["pop","Pop"],["wobble","Pop + Wackeln"],["bounce","Hüpfen"],["type","Schreibmaschine"],["slide","Von unten"],["fade","Einblenden"]];
export const TYPES={badge:"Badge",hook:"Balken-Text",sticker:"Pop-up Text",cta:"Kommentar-CTA",price:"Preisschild",rating:"Sterne",arrow:"Pfeil",emoji:"Emoji",ctitle:"Celine-Titel",cbox:"Celine-Box"};

export const $=s=>document.querySelector(s);
export const video=$("#src"),cv=$("#cv"),ctx=cv.getContext("2d");
export const st={els:[],sel:-1,tpl:null,scheme:null,W:720,H:1280,S:1,exporting:false,actx:null,spk:null,dest:null};

export function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem("rs_"+k));localStorage.setItem("rs_"+k,JSON.stringify(v))}catch(e){return null}}
export const brand=store("brand")||{name:"Celines Finds",slogan:"Gekauft. Getestet. Geliebt.",hook:"",word:"Link"};
export function dur(){return video.duration||15}

export const FONTS=[["Sniglet","Bubble"],["Gochi Hand","Handschrift"],["Caveat","Handschrift 2"],["Permanent Marker","Marker"],["Pacifico","Schreibschrift"],["Fredoka","Rund"],["Baloo 2","Rund fett"],["Inter","Clean"],["Poppins","Modern"],["Anton","Hoch & fett"],["Bangers","Comic"],["Archivo Black","Block"]];
export const WEIGHT={"Sniglet":800,"Inter":800,"Fredoka":600,"Baloo 2":800,"Poppins":700,"Caveat":700};
export const COLORS=["#ff70aa","#ec4899","#ffee58","#ffffff","#141414","#40a0ff","#5eead4","#c4b5fd","#fb923c","#ef4444","#22c55e","#fde2ec"];
export const ANIMS=[["drag","Reinziehen mit Mauszeiger"],["pop","Pop"],["wobble","Pop + Wackeln"],["bounce","Hüpfen"],["type","Schreibmaschine"],["slide","Von unten"],["fade","Einblenden"]];
export const TYPES={badge:"Badge",hook:"Balken-Text",sticker:"Pop-up Text",cta:"Kommentar-CTA",price:"Preisschild",rating:"Sterne",arrow:"Pfeil",emoji:"Emoji"};

export const $=s=>document.querySelector(s);
export const video=$("#src"),cv=$("#cv"),ctx=cv.getContext("2d");
export const st={els:[],sel:-1,W:720,H:1280,S:1,exporting:false,actx:null,spk:null,dest:null};

export function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem("rs_"+k));localStorage.setItem("rs_"+k,JSON.stringify(v))}catch(e){return null}}
export const brand=store("brand")||{name:"Celines Finds",slogan:"Gekauft. Getestet. Geliebt.",hook:"",word:"Link"};
export function dur(){return video.duration||15}

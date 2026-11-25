import{isLight}from"./draw.js";

// a = Akzent, on = Text auf Akzent, b = Zweitfarbe, onB = Text auf Zweitfarbe, bg/bt/ba = Box, Text, Box-Akzent
export const SCHEMES=[
 {id:"celine",soft:"#fde2ef",name:"Celine",a:"#f03c9a",on:"#ffffff",b:"#6b2fbf",onB:"#ffffff",bg:"#ffffff",bt:"#1f2a6b",ba:"#6b2fbf",spark:["#ffffff","#ff4fa3","#fde2ef"]},
 {id:"pastell",soft:"#fde2ec",name:"Pastell",a:"#c4b5fd",on:"#3b2350",b:"#fde2ec",onB:"#2a1b24",bg:"#fff7fb",bt:"#2a1b24",ba:"#8b5cf6",spark:["#fde2ec","#ffffff","#c4b5fd"]},
 {id:"clean",soft:"#f4f4f4",name:"Clean Weiß",a:"#ffffff",on:"#141414",b:"#141414",onB:"#ffffff",bg:"#ffffff",bt:"#141414",ba:"#141414",spark:["#ffffff","#ffffff","#d4d4d4"]},
 {id:"bf",soft:"#ffee58",name:"Black Friday",a:"#141414",on:"#ffee58",b:"#ffee58",onB:"#141414",bg:"#141414",bt:"#ffffff",ba:"#ffee58",spark:["#ffee58","#ffffff","#ffee58"]},
 {id:"xmas",soft:"#fff1d6",name:"Weihnachten",a:"#c8102e",on:"#ffffff",b:"#1f7a3a",onB:"#ffd86b",bg:"#fffaf0",bt:"#1f7a3a",ba:"#c8102e",spark:["#ffd86b","#ffffff","#d4af37"]},
 {id:"winter",soft:"#e6f5ff",name:"Winter",a:"#4fa8de",on:"#ffffff",b:"#dff3ff",onB:"#0f3d5e",bg:"#f2faff",bt:"#0f3d5e",ba:"#2b8ccf",spark:["#ffffff","#bfe6ff","#ffffff"]},
 {id:"natur",soft:"#efe6d2",name:"Natur",a:"#6f8f4e",on:"#ffffff",b:"#e9dcc4",onB:"#3b4a2a",bg:"#f7f1e6",bt:"#3b4a2a",ba:"#6f8f4e",spark:["#e9dcc4","#ffffff","#a3b86c"]},
 {id:"neon",soft:"#39ff14",name:"Neon",a:"#ff2bd6",on:"#ffffff",b:"#39ff14",onB:"#141414",bg:"#141414",bt:"#ffffff",ba:"#39ff14",spark:["#39ff14","#00e5ff","#ff2bd6"]}
];
export const scheme=id=>SCHEMES.find(s=>s.id===id);

export function applyScheme(e,s){const A=s.a==="#ffffff"?s.b:s.a;const set=o=>Object.assign(e,o);
 switch(e.type){
  case"ctitle":set({color:s.on,color2:s.a});break;
  case"cbox":set({color:s.bt,color2:s.ba,bg:s.bg});break;
  case"cta":set({color:s.on,color2:s.a});break;
  case"sticker":set({color:s.a,color2:s.on});break;
  case"badge":set({color:A,color2:s.b});break;
  case"hook":case"price":set({color:s.onB,color2:s.b});break;
  case"rating":set({color:"#ffffff",color2:A});break;
  case"bubble":set({color:s.bt,color2:s.a,bg:s.bg});break;
  case"note":set({bg:s.soft,color:isLight(s.soft)?"#2a1b24":"#ffffff",color2:s.a});break;
  case"ribbon":case"numcircle":set({color:s.on,color2:s.a});break;
  case"stamp":set({color:A,color2:isLight(A)?"#141414":"#ffffff"});break;
  case"checklist":set({color:s.bt,color2:s.ba,bg:s.bg});break;
  case"newsticker":set({color:s.onB,color2:s.b});break;
  case"arrow":set({color:A,color2:isLight(A)?"#141414":"#ffffff"});break;
 }
 e.sparkCols=s.spark.slice();return e}

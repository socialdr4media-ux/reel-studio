import{WEIGHT,$,video,ctx,st,dur}from"./state.js";

const eo=x=>{x=Math.max(0,Math.min(1,x));return 1-(1-x)**3};
const eb=x=>{x=Math.max(0,Math.min(1,x));const c=1.9;return 1+(c+1)*(x-1)**3+c*(x-1)**2};
export function fnt(e,px){return `${WEIGHT[e.font]||400} ${px}px "${e.font}", sans-serif`}
export function rr(c,x,y,w,h,r){c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h)}
function star(c,cx,cy,r,col){c.beginPath();for(let i=0;i<8;i++){const a=Math.PI/4*i-Math.PI/2,q=i%2?r*.25:r;c.lineTo(cx+q*Math.cos(a),cy+q*Math.sin(a))}c.closePath();c.fillStyle=col;c.fill()}
function star5(c,cx,cy,r,col){c.beginPath();for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,q=i%2?r*.45:r;c.lineTo(cx+q*Math.cos(a),cy+q*Math.sin(a))}c.closePath();c.fillStyle=col;c.fill();c.lineWidth=3*st.S;c.strokeStyle="#fff";c.stroke()}

// liefert {w,h,draw(c, chars)} ; Ursprung = Mitte
export function layout(e){const S=st.S;const px=e.size*S;const c=ctx;
 const lines=(e.text||"").split("\n");
 if(e.type==="hook"){c.font=fnt(e,px);try{c.letterSpacing=(-.04*px)+"px"}catch(_){}
  const ws=lines.map(l=>c.measureText(l).width),padx=.36*px,rowh=px*1.3,gap=.12*px;
  const w=Math.max(...ws)+2*padx,h=lines.length*rowh+(lines.length-1)*gap;try{c.letterSpacing="0px"}catch(_){}
  return{w,h,draw(c,n){c.font=fnt(e,px);try{c.letterSpacing=(-.04*px)+"px"}catch(_){}c.textBaseline="middle";c.textAlign="center";let y=-h/2,k=n;
   lines.forEach((l,i)=>{const t=n==null?l:l.slice(0,Math.max(0,k));k-=l.length;const tw=c.measureText(t).width;if(t.length){c.fillStyle=e.color2;c.fillRect(-tw/2-padx,y,tw+2*padx,rowh);c.fillStyle=e.color;c.fillText(t,0,y+rowh*.53)}y+=rowh+gap});try{c.letterSpacing="0px"}catch(_){}}}}
 if(e.type==="ctitle")return ctitle(e,px,c);
 if(e.type==="cbox")return cbox(e,px,c);
 if(e.type==="emoji"){c.font=`${px}px "Apple Color Emoji","Noto Color Emoji",sans-serif`;const w=c.measureText(e.text).width;
  return{w,h:px*1.1,draw(c){c.font=`${px}px "Apple Color Emoji","Noto Color Emoji",sans-serif`;c.textAlign="center";c.textBaseline="middle";c.fillText(e.text,0,0)}}}
 if(e.type==="arrow"){const L=px*1.6;return{w:L,h:px*.7,draw(c){c.lineCap="round";c.lineJoin="round";
  const path=()=>{c.beginPath();c.moveTo(-L/2,0);c.quadraticCurveTo(0,-px*.35,L/2-px*.1,0);c.moveTo(L/2-px*.1,0);c.lineTo(L/2-px*.45,-px*.25);c.moveTo(L/2-px*.1,0);c.lineTo(L/2-px*.38,px*.28)};
  path();c.strokeStyle=e.color2;c.lineWidth=px*.22;c.stroke();path();c.strokeStyle=e.color;c.lineWidth=px*.12;c.stroke()}}}
 if(e.type==="price"){c.font=fnt(e,px);const w1=c.measureText(e.text).width;c.font=fnt(e,px*.5);const w2=c.measureText(e.sub).width;
  const w=Math.max(w1,w2)+px*.9,h=px*1.95;return{w,h,draw(c){rr(c,-w/2,-h/2,w,h,px*.18);c.fillStyle=e.color2;c.shadowColor="#0004";c.shadowBlur=12*S;c.shadowOffsetY=5*S;c.fill();c.shadowColor="transparent";
   c.beginPath();c.arc(-w/2+px*.3,-h/2+px*.3,px*.09,0,7);c.fillStyle="#fff";c.fill();
   c.textAlign="center";c.textBaseline="middle";c.fillStyle=e.color;c.font=fnt(e,px*.5);c.globalAlpha*=.75;c.fillText(e.sub,0,-h*.22);
   c.fillRect(-w2/2,-h*.22,w2,Math.max(3,px*.06));c.globalAlpha/= .75;c.font=fnt(e,px);c.fillText(e.text,0,h*.18)}}}
 // Sticker-Texte (sticker, cta, badge, rating)
 c.font=fnt(e,px);const ws=lines.map(l=>c.measureText(l).width);const lh=px*1.08,sw=Math.max(4,px*.11);
 let w=Math.max(...ws)+sw*2,h=lines.length*lh+sw;let extra=0,sub=null;
 if(e.type==="badge"&&e.sub){const sp=px*.42;c.font=fnt({font:"Fredoka"},sp);const sw2=c.measureText(e.sub).width;sub={sp,sw2,bh:sp*1.45,bw:sw2+sp*1.1};extra=sub.bh-px*.05;w=Math.max(w,sub.bw)}
 if(e.type==="rating"){extra=px*1.25}
 if(e.pill){const pw=Math.max(...ws)+px*.9,ph=lines.length*lh+px*.45;
  return{w:pw,h:ph,draw(c,n){rr(c,-pw/2,-ph/2,pw,ph,Math.min(ph/2,px*.6));c.fillStyle=e.color2;c.shadowColor="rgba(0,0,0,.22)";c.shadowBlur=12*S;c.shadowOffsetY=4*S;c.fill();c.shadowColor="transparent";
   c.font=fnt(e,px);c.textAlign="center";c.textBaseline="middle";c.fillStyle=e.color;cut(lines,n).forEach((t,i)=>c.fillText(t,0,-ph/2+px*.225+lh*(i+.5)+px*.03))}}}
 const H2=h+extra;
 return{w,h:H2,draw(c,n){c.textAlign="center";c.textBaseline="middle";c.lineJoin="round";let y=-H2/2+lh/2+sw/2,k=n;
  if(e.type==="rating"){for(let i=0;i<5;i++)star5(c,(i-2)*px*1.05,y,px*.5,e.color2);y+=px*1.25}
  c.font=fnt(e,px);
  lines.forEach(l=>{const t=n==null?l:l.slice(0,Math.max(0,k));k-=l.length;
   c.lineWidth=sw*2;c.strokeStyle="rgba(0,0,0,.22)";c.strokeText(t,3*S,y+4*S);
   c.strokeStyle=e.type==="rating"?"#141414":(e.type==="badge"?"#ffffff":e.color2);c.strokeText(t,0,y);c.fillStyle=e.color;c.fillText(t,0,y);y+=lh});
  if(sub){const by=y-lh/2+sub.bh/2-px*.12;rr(c,-sub.bw/2,by-sub.bh/2,sub.bw,sub.bh,sub.sp*.25);c.fillStyle=e.color2;c.fill();
   c.font=fnt({font:"Fredoka"},sub.sp);c.fillStyle=(e.color2==="#ec4899"||!isLight(e.color2))?"#fff":"#1d1d1d";c.fillText(e.sub,0,by+sub.sp*.05)}}}
}
export function hexA(h,a){const n=parseInt(h.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`}
export function mix(h,h2,k){const a=parseInt(h.slice(1),16),b=parseInt(h2.slice(1),16);const m=s=>Math.round((a>>s&255)*(1-k)+(b>>s&255)*k);return "#"+((m(16)<<16)|(m(8)<<8)|m(0)).toString(16).padStart(6,"0")}
export function isLight(h){const n=parseInt(h.slice(1),16);return((n>>16&255)*299+(n>>8&255)*587+(n&255)*114)/1000>=160}
function wrapWords(c,text,maxW){const out=[];text.split("\n").forEach(par=>{let cur="";par.split(/\s+/).filter(Boolean).forEach(w=>{const t=cur?cur+" "+w:w;if(cur&&c.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});out.push(cur)});return out}
function cut(lines,n){if(n==null)return lines;let k=n;return lines.map(l=>{const t=l.slice(0,Math.max(0,k));k-=l.length;return t})}

function ctitle(e,px,c){const{W,H,S}=st;const nar=e.font==="Alfa Slab One"?1:.86;const maxW=W*.9/nar;let p=px,ls;
 const fit=()=>{c.font=fnt(e,p);ls=wrapWords(c,e.text||"",maxW);return ls.length>2||Math.max(0,...ls.map(l=>c.measureText(l).width))>maxW};
 while(fit()&&p>px*.45)p*=.93;
 const lh=p*(e.font==="Caveat Brush"?1.0:1.12),th=ls.length*lh,pad=p*.35,fade=Math.max(p*1.3,90*S),h=th+2*pad;
 const sl=Math.tan((e.slant||0)*Math.PI/180);
 return{w:W,h,full:true,draw(c,n){const top=-th/2-pad-fade,bot=Math.max(th/2+pad,H-e.y*H+2);
  const g=c.createLinearGradient(0,top,0,bot);g.addColorStop(0,hexA(e.color2,0));g.addColorStop(Math.min(.9,fade/(bot-top)),hexA(mix(e.color2,"#ffffff",.12),.92));g.addColorStop(1,e.color2);
  c.fillStyle=g;c.fillRect(-W/2-2,top,W+4,bot-top);
  c.font=fnt(e,p);c.textAlign="center";c.textBaseline="middle";c.fillStyle=e.color;
  c.shadowColor="rgba(0,0,0,.3)";c.shadowBlur=8*S;c.shadowOffsetY=3*S;
  cut(ls,n).forEach((t,i)=>{const y=-th/2+lh*(i+.5);c.save();c.translate(0,y);c.transform(nar,0,-sl,1,0,0);c.fillText(t,0,p*.04);c.restore()});
  c.shadowColor="transparent"}}}

function cbox(e,px,c){const{W,S}=st;const maxW=W*.78;
 const words=(e.text||"").replace(/\n/g," \n ").split(/ +/).filter(Boolean);
 c.font=fnt(e,px);const widest=Math.max(1,...words.map(w=>c.measureText(w).width));if(widest>maxW)px*=maxW/widest;
 const lh=px*1.2,pad=px*.6;c.font=fnt(e,px);
 const nAcc=/^\d/.test(words[0]||"")?2:1;let wi=0;const toks=words.map(w=>w==="\n"?{br:1}:{t:w,acc:wi++<nAcc});
 const lines=[[]];let lw=0;const sp=c.measureText(" ").width;
 toks.forEach(k=>{if(k.br){lines.push([]);lw=0;return}const w=c.measureText(k.t).width;const L=lines[lines.length-1];
  if(L.length&&lw+sp+w>maxW){lines.push([k]);lw=w}else{L.push(k);lw+=(L.length>1?sp:0)+w}k.w=w});
 const lws=lines.map(L=>L.reduce((s,k)=>s+k.w,0)+sp*Math.max(0,L.length-1));
 const w=Math.max(...lws)+2*pad,h=lines.length*lh+2*pad*.8;
 return{w,h,draw(c,n){rr(c,-w/2,-h/2,w,h,px*.45);c.fillStyle=hexA(e.bg||"#ffffff",.9);c.shadowColor="rgba(0,0,0,.18)";c.shadowBlur=14*S;c.shadowOffsetY=4*S;c.fill();c.shadowColor="transparent";
  c.font=fnt(e,px);c.textBaseline="middle";c.textAlign="left";let k=n==null?1e9:n;
  lines.forEach((L,i)=>{let x=-lws[i]/2;const y=-h/2+pad*.8+lh*(i+.5);
   L.forEach(tk=>{const t=tk.t.slice(0,Math.max(0,k));k-=tk.t.length+1;c.fillStyle=tk.acc?e.color2:e.color;c.fillText(t,x,y);x+=tk.w+sp})})}}}

function cursor(c,x,y){const k=2.1*st.S;const p=[[0,0],[0,17],[4,13],[7,20],[10,19],[7,12],[12.5,12]];c.beginPath();p.forEach(([a,b],i)=>c[i?"lineTo":"moveTo"](x+a*k,y+b*k));c.closePath();c.fillStyle="#000";c.fill();c.lineWidth=1.6*k;c.strokeStyle="#fff";c.stroke()}
function selbox(c,w,h){const S=st.S;const m=10*S;c.save();c.setLineDash([9*S,6*S]);c.lineWidth=2.2*S;c.strokeStyle="#40a0ff";c.strokeRect(-w/2-m,-h/2-m,w+2*m,h+2*m);c.setLineDash([]);
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{const s=9*S;c.fillStyle="#40a0ff";c.fillRect(a*(w/2+m)-s,b*(h/2+m)-s,2*s,2*s);c.lineWidth=2*S;c.strokeStyle="#fff";c.strokeRect(a*(w/2+m)-s,b*(h/2+m)-s,2*s,2*s)});c.restore()}

export function drawEl(e,t,idx,c=ctx){if(t<e.start||t>e.end)return;const{W,H,S}=st;const lt=t-e.start,L=layout(e);
 let dx=0,dy=0,sc=1,rot=e.rot*Math.PI/180,al=1,n=null;const a=e.anim;
 if(a==="drag")dx=(1-eo(lt/.55))*W*.85;
 if(a==="pop"||a==="wobble")sc=lt<.35?Math.max(.02,eb(lt/.35)):1;
 if(a==="wobble"&&lt>=.35)rot+=0.05*Math.sin(lt*4);
 if(a==="bounce"){sc=lt<.3?Math.max(.02,eb(lt/.3)):1;dy=-Math.abs(Math.sin(lt*4))*18*S}
 if(a==="slide"){dy=(1-eo(lt/.45))*160*S;al=Math.min(1,lt/.3)}
 if(a==="fade")al=Math.min(1,lt/.5);
 if(a==="type")n=Math.floor(lt*16);
 const out=e.end-t;if(out<.2&&e.end<dur()-.05)al*=out/.2;
 const cx=L.full?W/2:e.x*W;
 c.save();c.globalAlpha=al;c.translate(cx+dx,e.y*H+dy);c.rotate(rot);c.scale(sc,sc);
 L.draw(c,n);
 if(e.sparkle){const tw=k=>(.55+.45*Math.sin(lt*6+k))*Math.min(1,lt/.5);const sc3=e.sparkCols||["#ffee58","#ffffff","#40a0ff"];star(c,-L.w/2-8*S,-L.h/2+6*S,16*S*tw(0),sc3[0]);star(c,L.w/2+6*S,L.h/2-4*S,13*S*tw(2),sc3[1]);star(c,L.w/2-10*S,-L.h/2-6*S,10*S*tw(4),sc3[2])}
 if(a==="drag"&&lt<1.4)selbox(c,L.w,L.h);
 if(a==="drag"&&lt<1.0)cursor(c,L.w/2+12*S,L.h/2+12*S);
 if(!st.exporting&&idx===st.sel){c.setLineDash([6*S,5*S]);c.lineWidth=2*S;c.strokeStyle="#ec4899";c.strokeRect(-L.w/2-6*S,-L.h/2-6*S,L.w+12*S,L.h+12*S)}
 c.restore();e._box={x:cx-L.w/2,y:e.y*H-L.h/2,w:L.w,h:L.h};}

export function frame(){const t=video.currentTime||0;
 if(video.readyState>=2)ctx.drawImage(video,0,0,st.W,st.H);
 st.els.forEach((e,i)=>drawEl(e,t,i));
 if(!st.exporting){$("#seek").value=t;$("#tlabel").textContent=t.toFixed(1).replace(".",",")+" s"}
 else{$("#prog div").style.width=(100*t/dur())+"%"}
 requestAnimationFrame(frame)}

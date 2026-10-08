const CONSTELLATIONS_V5={
 biduk:{name:"Buruj Biduk",shape:"Seperti gayung atau senduk.",fact:"Buruj Biduk terbentuk daripada gugusan tujuh bintang dan merupakan sebahagian daripada buruj Ursa Major atau beruang besar.",use:"Boleh dirujuk untuk membantu mencari arah Utara.",pts:[[8,25],[25,18],[43,28],[57,43],[78,43],[78,65],[60,68]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
 pari:{name:"Buruj Pari",shape:"Seperti layang-layang atau salib kecil.",fact:"Buruj Pari ialah buruj kecil yang terdiri daripada gugusan empat bintang utama yang membentuk corak seperti layang-layang.",use:"Boleh dirujuk untuk membantu menentukan arah Selatan.",pts:[[25,45],[52,35],[45,75],[55,52]],edges:[[0,1],[0,2],[2,3],[3,1]]},
 belantik:{name:"Buruj Belantik",shape:"Seperti seorang pemburu.",fact:"Buruj Belantik membentuk corak seperti pemburu. Tiga bintang yang tersusun pada bahagian tengah menjadi ciri yang mudah diperhatikan.",use:"Membantu manusia mengenal pasti corak dan kedudukan di langit malam.",pts:[[47,12],[38,32],[50,45],[63,58],[55,78],[42,67],[30,54],[50,45],[72,25]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,2],[2,7],[7,8]]},
 scorpio:{name:"Buruj Skorpio",shape:"Seperti kala jengking.",fact:"Buruj Skorpio terdiri daripada gugusan bintang yang membentuk badan dan ekor melengkung seperti kala jengking.",use:"Membantu manusia mengenal pasti corak dan kedudukan tertentu di langit malam.",pts:[[18,60],[28,52],[38,44],[45,35],[52,42],[55,55],[64,64],[75,61],[84,49],[90,35]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]]}
};

let mission=loadMission(),selected=null;
function refreshScore(){document.getElementById("obsScoreTop").textContent=Number(mission.total||0)}
function svgFor(key){
 const d=CONSTELLATIONS_V5[key], W=420,H=260;
 const lines=d.edges.map(([a,b])=>`<line x1="${d.pts[a][0]*4.0}" y1="${d.pts[a][1]*2.8}" x2="${d.pts[b][0]*4.0}" y2="${d.pts[b][1]*2.8}" />`).join("");
 const stars=d.pts.map(([x,y])=>`<circle cx="${x*4}" cy="${y*2.8}" r="7"/><circle class="glow" cx="${x*4}" cy="${y*2.8}" r="15"/>`).join("");
 return `<svg viewBox="0 0 ${W} ${H}" aria-label="${d.name}"><g class="const-lines">${lines}</g><g class="const-stars">${stars}</g></svg>`;
}
function showPopup(key){
 selected=key; const d=CONSTELLATIONS_V5[key];
 document.getElementById("selectedTarget").textContent=d.name;
 document.getElementById("popupTitle").textContent=d.name;
 document.getElementById("popupShape").textContent=d.shape;
 document.getElementById("popupFact").textContent=d.fact;
 document.getElementById("popupUse").textContent=d.use;
 document.getElementById("popupConstellation").innerHTML=svgFor(key);
 document.getElementById("constellationPopup").classList.remove("hidden");
 document.querySelectorAll(".sky-hotspot-v5,.viewer-hotspot-v5").forEach(x=>x.classList.toggle("active",x.dataset.const===key));
}
function closePopup(){document.getElementById("constellationPopup").classList.add("hidden")}
function closeViewer(){document.getElementById("skyViewer").classList.add("hidden")}
document.querySelectorAll(".sky-hotspot-v5,.viewer-hotspot-v5").forEach(b=>b.addEventListener("click",()=>{showPopup(b.dataset.const);closeViewer()}));
document.getElementById("openInfo").addEventListener("click",()=>selected?showPopup(selected):document.getElementById("obsFeedback").textContent="☝️ Sentuh salah satu buruj dahulu.");
document.getElementById("closePopup").addEventListener("click",closePopup);
document.getElementById("donePopup").addEventListener("click",closePopup);
document.getElementById("fullscreenSky").addEventListener("click",()=>document.getElementById("skyViewer").classList.remove("hidden"));
document.getElementById("closeViewer").addEventListener("click",closeViewer);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closePopup();closeViewer()}});
document.querySelectorAll(".observation-answer button").forEach(btn=>btn.addEventListener("click",()=>{
 if(!selected){document.getElementById("obsFeedback").textContent="☝️ Sentuh buruj dahulu.";return}
 document.querySelectorAll(".observation-answer button").forEach(b=>b.classList.remove("correct","wrong"));
 if(btn.dataset.answer===selected){
  btn.classList.add("correct"); mission.observation=mission.observation||{};
  if(!mission.observation[selected]){mission.observation[selected]=true;mission.total=(mission.total||0)+1;saveMission(mission)}
  document.getElementById("obsFeedback").textContent=`🌟 Betul! ${CONSTELLATIONS_V5[selected].name} dikenal pasti. +1 markah.`;
  refreshScore();
 }else{btn.classList.add("wrong");document.getElementById("obsFeedback").textContent="🔭 Belum tepat. Perhatikan semula corak bintang."}
}));
refreshScore();
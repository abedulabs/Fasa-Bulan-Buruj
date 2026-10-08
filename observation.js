const constellationNames={pari:"Buruj Pari",scorpio:"Buruj Skorpio",belantik:"Buruj Belantik",biduk:"Buruj Biduk"};
const layouts={
 pari:[[50,7,1],[50,30,0],[50,53,1],[28,42,1],[72,42,1],[50,82,0]],
 scorpio:[[8,22,1],[19,29,0],[31,37,1],[43,46,1],[55,57,1],[65,70,1],[76,82,1],[86,72,1],[94,58,0],[84,49,0],[71,43,0],[58,34,0],[45,27,0]],
 belantik:[[20,12,1],[50,8,1],[80,14,1],[30,31,0],[50,36,1],[70,31,0],[50,51,1],[36,69,1],[64,69,1],[50,91,1]],
 biduk:[[12,42,1],[29,28,1],[47,33,1],[63,49,1],[48,67,1],[28,61,1],[70,61,0],[88,50,1]]
};
let state=loadMission(),current="pari";
function starsHTML(key){return layouts[key].map(([x,y,b])=>`<i class="star-dot ${b?"bright":""}" style="left:${x}%;top:${y}%"></i>`).join("")}
function renderZone(key,root){root.innerHTML=starsHTML(key)}
document.querySelectorAll(".const-zone").forEach(el=>renderZone(el.dataset.const,el));
function refresh(){document.getElementById("obsScoreTop").textContent=state.total}
function choose(key){
 current=key;
 const letters={pari:"A",scorpio:"B",belantik:"C",biduk:"D"};
 document.getElementById("selectedTarget").textContent=letters[key];
 document.querySelectorAll(".const-zone,.target-buttons button").forEach(el=>el.classList.toggle("selected",el.dataset.const===key||el.dataset.target===key));
 document.querySelectorAll(".observation-answer button").forEach(b=>b.classList.remove("correct","wrong"));
 document.getElementById("obsFeedback").textContent=state.observation[key]?"✅ Sasaran ini telah dikenal pasti.":"Perhatikan susunan bintang sebelum memilih jawapan.";
}
document.querySelectorAll(".const-zone,.target-buttons button").forEach(el=>el.addEventListener("click",()=>choose(el.dataset.const||el.dataset.target)));
document.querySelectorAll(".observation-answer button").forEach(el=>el.addEventListener("click",()=>{
 document.querySelectorAll(".observation-answer button").forEach(b=>b.classList.remove("correct","wrong"));
 if(el.dataset.answer===current){
  el.classList.add("correct");
  if(!state.observation[current]){state.observation[current]=true;state.total++;saveMission(state)}
  document.getElementById("obsFeedback").textContent=`🌟 Betul! ${constellationNames[current]} dikenal pasti. +1 markah.`;
  refresh();
 }else{el.classList.add("wrong");document.getElementById("obsFeedback").textContent="🔭 Belum tepat. Perhatikan semula susunan bintang."}
}));
const modal=document.getElementById("focusModal"),focusSky=document.getElementById("focusSky");
document.getElementById("focusBtn").onclick=()=>{focusSky.innerHTML=starsHTML(current);document.getElementById("focusName").textContent=`Sasaran ${current==="pari"?"A":current==="scorpio"?"B":current==="belantik"?"C":"D"}`;modal.classList.remove("hidden")};
document.getElementById("closeFocus").onclick=()=>modal.classList.add("hidden");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
choose("pari");refresh();
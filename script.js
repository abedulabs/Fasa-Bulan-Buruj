const data={
 pari:{name:"Buruj Pari",shape:"layang-layang"},
 scorpio:{name:"Buruj Skorpio",shape:"kala jengking"},
 belantik:{name:"Buruj Belantik",shape:"pemburu"},
 biduk:{name:"Buruj Biduk",shape:"gayung / senduk"}
};
let missionScore=0, currentTarget="pari", solvedTargets=new Set(), noteDone=false, directionDone=new Set();

const scoreEl=document.getElementById("missionScore");
function updateScore(){scoreEl.textContent=missionScore;document.getElementById("noteScore").textContent=noteDone?1:0;document.getElementById("directionScore").textContent=directionDone.size}

document.querySelectorAll(".tab").forEach(tab=>{
 tab.addEventListener("click",()=>{
   document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
   document.querySelectorAll(".tab-panel").forEach(x=>x.classList.remove("active"));
   tab.classList.add("active");document.getElementById(tab.dataset.tab).classList.add("active");
 });
});

const targetButtons=document.querySelectorAll(".const-pick");
function selectTarget(key){
 currentTarget=key;
 const idx=["pari","scorpio","belantik","biduk"].indexOf(key);
 document.getElementById("selectedTarget").textContent=String.fromCharCode(65+idx);
 document.querySelectorAll(".target").forEach(t=>t.classList.toggle("selected",t.dataset.const===key));
 targetButtons.forEach(b=>b.classList.toggle("selected",b.dataset.target===key));
 document.querySelectorAll("#constAnswers button").forEach(b=>b.classList.remove("correct","wrong"));
 document.getElementById("obsFeedback").textContent=solvedTargets.has(key)?"✅ Sasaran ini sudah betul. Pilih sasaran lain.":"";
}
targetButtons.forEach(b=>b.addEventListener("click",()=>selectTarget(b.dataset.target)));
document.querySelectorAll(".target").forEach(t=>t.addEventListener("click",()=>selectTarget(t.dataset.const)));

document.querySelectorAll("#constAnswers button").forEach(btn=>{
 btn.addEventListener("click",()=>{
   const correct=btn.dataset.answer===currentTarget;
   document.querySelectorAll("#constAnswers button").forEach(b=>b.classList.remove("correct","wrong"));
   btn.classList.add(correct?"correct":"wrong");
   const feedback=document.getElementById("obsFeedback");
   if(correct){
     if(!solvedTargets.has(currentTarget)){solvedTargets.add(currentTarget);missionScore++;updateScore();}
     feedback.textContent=`🌟 Betul! ${data[currentTarget].name} membentuk corak seperti ${data[currentTarget].shape}.`;
   }else feedback.textContent="🔭 Belum tepat. Perhatikan semula kedudukan dan corak bintang.";
 });
});

document.getElementById("saveNote").addEventListener("click",()=>{
 const n=document.getElementById("noteName").value.trim(),s=document.getElementById("noteShape").value.trim(),f=document.getElementById("noteFinding").value.trim();
 const fb=document.getElementById("noteFeedback");
 if(n&&s&&f){
   if(!noteDone){noteDone=true;missionScore++;updateScore();}
   fb.textContent="🛰️ Catatan berjaya disimpan. +1 markah misi!";
 }else fb.textContent="⚠️ Lengkapkan ketiga-tiga ruangan dahulu.";
});

function directionAnswer(q,correct){
 const box=document.querySelector(`[data-q="${q}"]`);
 box.querySelectorAll("button").forEach(b=>b.classList.remove("correct","wrong"));
 const chosen=[...box.querySelectorAll("button")].find(b=>b.dataset.answer===correct);
 if(!directionDone.has(q)){directionDone.add(q);missionScore++;updateScore();}
 chosen.classList.add("correct");
 document.getElementById(q+"feedback").textContent="🌟 Betul! +1 markah misi.";
}
document.querySelector('[data-q="d1"]').querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
 const box=document.querySelector('[data-q="d1"]');
 box.querySelectorAll("button").forEach(x=>x.classList.remove("correct","wrong"));
 if(b.dataset.answer==="biduk"){directionAnswer("d1","biduk")}else{b.classList.add("wrong");document.getElementById("d1feedback").textContent="🔭 Cuba lagi. Ingat: Buruj Biduk ialah petunjuk arah utara."}
}));
document.querySelector('[data-q="d2"]').querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
 const box=document.querySelector('[data-q="d2"]');
 box.querySelectorAll("button").forEach(x=>x.classList.remove("correct","wrong"));
 if(b.dataset.answer==="pari"){directionAnswer("d2","pari")}else{b.classList.add("wrong");document.getElementById("d2feedback").textContent="🔭 Cuba lagi. Ingat: Buruj Pari ialah petunjuk arah selatan."}
}));

document.getElementById("finishMission").addEventListener("click",()=>{
 const a=document.getElementById("achievement");a.classList.remove("hidden");
 let title,icon,text;
 if(missionScore===7){title="Saintis Angkasa Cemerlang";icon="🏆🚀";text="Hebat! Semua misi berjaya diselesaikan. Kamu memerhati, mencatat dan menggunakan pengetahuan buruj dengan sangat baik."}
 else if(missionScore>=5){title="Angkasawan Muda";icon="🥇👨‍🚀";text="Syabas! Misi hampir lengkap. Teruskan penerokaan langit untuk menjadi saintis angkasa yang lebih hebat."}
 else if(missionScore>=3){title="Penjelajah Angkasa";icon="🥈🔭";text="Bagus! Kamu sudah mula menguasai kemahiran pemerhatian dan penerokaan angkasa."}
 else{title="Kadet Angkasa";icon="🌟🧑‍🚀";text="Misi baru bermula! Baca semula nota dan cuba lengkapkan semua stesen."}
 a.innerHTML=`<div class="big-icon">${icon}</div><h3>${title}</h3><div class="medal">⭐ ${missionScore}/7 markah misi</div><p>${text}</p>`;
 a.scrollIntoView({behavior:"smooth",block:"center"});
});
selectTarget("pari");updateScore();

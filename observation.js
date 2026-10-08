const CONSTELLATIONS_V5={
  biduk:{
    name:"Buruj Biduk",
    shape:"Gugusan tujuh bintang yang membentuk corak seperti gayung atau senduk.",
    fact:"Buruj Biduk merupakan sebahagian daripada buruj Ursa Major atau beruang besar.",
    use:"Boleh dijadikan panduan untuk mencari arah Utara.",
    crop:"crop-biduk"
  },
  pari:{
    name:"Buruj Pari",
    shape:"Gugusan empat bintang yang membentuk corak seperti layang-layang atau salib kecil.",
    fact:"Buruj Pari ialah buruj kecil yang mudah dikenal pasti melalui empat bintang utamanya.",
    use:"Boleh dirujuk sebagai panduan untuk membantu menentukan arah Selatan.",
    crop:"crop-pari"
  },
  belantik:{
    name:"Buruj Belantik",
    shape:"Gugusan bintang yang membentuk corak seperti seorang pemburu.",
    fact:"Tiga bintang yang tersusun pada bahagian tengah menjadi ciri yang mudah diperhatikan pada Buruj Belantik.",
    use:"Membantu manusia mengenal pasti corak dan kedudukan tertentu di langit malam.",
    crop:"crop-belantik"
  },
  scorpio:{
    name:"Buruj Skorpio",
    shape:"Gugusan bintang yang membentuk corak seperti kala jengking dengan ekor yang melengkung.",
    fact:"Coraknya mudah dikenali melalui susunan bintang yang membentuk badan dan ekor melengkung.",
    use:"Membantu manusia mengenal pasti corak dan kedudukan tertentu di langit malam.",
    crop:"crop-scorpio"
  }
};

let selected=null;
let mission=loadMission();

function refreshScore(){
  const el=document.getElementById("obsScoreTop");
  if(el) el.textContent=Number(mission.total||0);
}
function closeViewer(){
  const v=document.getElementById("skyViewer");
  if(v) v.classList.add("hidden");
  document.body.classList.remove("viewer-open-v5");
}
function openViewer(){
  const v=document.getElementById("skyViewer");
  if(v) v.classList.remove("hidden");
  document.body.classList.add("viewer-open-v5");
}
function showConstellation(key){
  const d=CONSTELLATIONS_V5[key];
  if(!d) return;
  selected=key;
  document.getElementById("selectedTarget").textContent=d.name;
  document.getElementById("popupTitle").textContent=d.name;
  document.getElementById("popupShape").textContent=d.shape;
  document.getElementById("popupFact").textContent=d.fact;
  document.getElementById("popupUse").textContent=d.use;

  const visual=document.getElementById("popupConstellation");
  visual.className="constellation-diagram-v5 "+d.crop;

  document.getElementById("constellationPopup").classList.remove("hidden");
}
function closePopup(){
  document.getElementById("constellationPopup").classList.add("hidden");
}

document.getElementById("fullscreenSky").addEventListener("click",openViewer);
document.getElementById("closeViewer").addEventListener("click",closeViewer);

document.querySelectorAll(".viewer-hotspot-v5").forEach(btn=>{
  btn.addEventListener("click",()=>showConstellation(btn.dataset.const));
});
document.querySelectorAll(".sky-hotspot-v5").forEach(btn=>{
  btn.addEventListener("click",()=>{
    openViewer();
    showConstellation(btn.dataset.const);
  });
});

document.getElementById("closePopup").addEventListener("click",closePopup);
document.getElementById("donePopup").addEventListener("click",closePopup);

document.getElementById("openInfo").addEventListener("click",()=>{
  if(selected) showConstellation(selected);
  else document.getElementById("obsFeedback").textContent="☝️ Tekan “Lihat Langit Malam” dan sentuh salah satu buruj dahulu.";
});

document.getElementById("constellationPopup").addEventListener("click",e=>{
  if(e.target.id==="constellationPopup") closePopup();
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closePopup();closeViewer();}
});

document.querySelectorAll(".observation-answer button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(!selected){
      document.getElementById("obsFeedback").textContent="☝️ Perhatikan buruj dahulu.";
      return;
    }
    document.querySelectorAll(".observation-answer button").forEach(b=>b.classList.remove("correct","wrong"));
    if(btn.dataset.answer===selected){
      btn.classList.add("correct");
      mission.observation=mission.observation||{};
      if(!mission.observation[selected]){
        mission.observation[selected]=true;
        mission.total=(mission.total||0)+1;
        saveMission(mission);
      }
      document.getElementById("obsFeedback").textContent="🌟 Betul! "+CONSTELLATIONS_V5[selected].name+" dikenal pasti. +1 markah.";
      refreshScore();
    }else{
      btn.classList.add("wrong");
      document.getElementById("obsFeedback").textContent="🔭 Belum tepat. Buka semula langit malam dan perhatikan corak bintang.";
    }
  });
});

refreshScore();

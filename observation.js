const CONSTELLATIONS_V4={
 biduk:{name:"Buruj Biduk",shape:"Seperti gayung atau senduk.",fact:"Buruj Biduk terbentuk daripada gugusan tujuh bintang dan kelihatan seperti gayung atau senduk. Buruj ini merupakan sebahagian daripada Ursa Major.",use:"Boleh dirujuk untuk membantu mencari arah Utara."},
 pari:{name:"Buruj Pari",shape:"Seperti layang-layang atau salib kecil.",fact:"Buruj Pari merupakan buruj kecil yang terdiri daripada gugusan empat bintang utama yang membentuk corak seperti layang-layang.",use:"Boleh dirujuk untuk membantu menentukan arah Selatan."},
 belantik:{name:"Buruj Belantik",shape:"Seperti seorang pemburu.",fact:"Buruj Belantik membentuk corak seperti pemburu. Tiga bintang yang tersusun pada bahagian tengah menjadi ciri yang mudah diperhatikan.",use:"Membantu manusia mengenal pasti corak dan kedudukan di langit malam."},
 scorpio:{name:"Buruj Skorpio",shape:"Seperti kala jengking.",fact:"Buruj Skorpio terdiri daripada gugusan bintang yang membentuk badan dan ekor melengkung seperti kala jengking.",use:"Membantu manusia mengenal pasti corak dan kedudukan tertentu di langit malam."}
};

let mission=loadMission();
let selected=null;

function scoreNow(){return Number(mission.total||0)}
function refreshScore(){document.getElementById("obsScoreTop").textContent=scoreNow()}

function showPopup(key){
 const d=CONSTELLATIONS_V4[key];
 selected=key;
 document.getElementById("selectedTarget").textContent=d.name;
 document.getElementById("popupTitle").textContent=d.name;
 document.getElementById("popupShape").textContent=d.shape;
 document.getElementById("popupFact").textContent=d.fact;
 document.getElementById("popupUse").textContent=d.use;
 document.querySelectorAll(".sky-hotspot-v4").forEach(b=>b.classList.toggle("active",b.dataset.const===key));
 document.getElementById("constellationPopup").classList.remove("hidden");
 document.body.classList.add("popup-open-v4");
}

function closePopup(){
 document.getElementById("constellationPopup").classList.add("hidden");
 document.body.classList.remove("popup-open-v4");
}

document.querySelectorAll(".sky-hotspot-v4").forEach(btn=>{
 btn.addEventListener("click",()=>showPopup(btn.dataset.const));
});

document.getElementById("openInfo").addEventListener("click",()=>{
 if(selected) showPopup(selected);
 else document.getElementById("obsFeedback").textContent="☝️ Sentuh salah satu buruj dahulu.";
});

document.getElementById("closePopup").addEventListener("click",closePopup);
document.getElementById("donePopup").addEventListener("click",closePopup);

document.getElementById("constellationPopup").addEventListener("click",e=>{
 if(e.target.id==="constellationPopup") closePopup();
});

document.addEventListener("keydown",e=>{
 if(e.key==="Escape") closePopup();
});

document.querySelectorAll(".observation-answer button").forEach(btn=>{
 btn.addEventListener("click",()=>{
   if(!selected){
     document.getElementById("obsFeedback").textContent="☝️ Sentuh buruj dahulu supaya kamu boleh membuat pemerhatian.";
     return;
   }
   document.querySelectorAll(".observation-answer button").forEach(b=>b.classList.remove("correct","wrong"));
   if(btn.dataset.answer===selected){
     btn.classList.add("correct");
     mission.observation=mission.observation||{pari:false,scorpio:false,belantik:false,biduk:false};
     if(!mission.observation[selected]){
       mission.observation[selected]=true;
       mission.total=(mission.total||0)+1;
       saveMission(mission);
     }
     document.getElementById("obsFeedback").textContent=`🌟 Betul! ${CONSTELLATIONS_V4[selected].name} dikenal pasti. +1 markah.`;
     refreshScore();
   }else{
     btn.classList.add("wrong");
     document.getElementById("obsFeedback").textContent="🔭 Belum tepat. Buka maklumat buruj dan perhatikan bentuknya semula.";
   }
 });
});

refreshScore();
const data={
 belantik:{name:"Buruj Belantik",shape:"Corak seperti seorang pemburu.",fact:"Gugusan bintang ini kelihatan seperti seorang pemburu. Tiga bintang yang tersusun di bahagian tengah menjadi ciri yang mudah dikenal pasti.",use:"Buruj membantu kita mengenal pasti corak dan kedudukan di langit malam."},
 biduk:{name:"Buruj Biduk",shape:"Corak seperti gayung atau senduk.",fact:"Buruj Biduk terbentuk daripada gugusan tujuh bintang dan kelihatan seperti gayung atau senduk.",use:"Buruj Biduk boleh dirujuk untuk membantu mencari arah Utara."},
 pari:{name:"Buruj Pari",shape:"Corak seperti layang-layang atau salib kecil.",fact:"Buruj Pari merupakan buruj kecil yang terdiri daripada gugusan empat bintang utama yang membentuk corak seperti layang-layang.",use:"Buruj Pari boleh dirujuk untuk membantu menentukan arah Selatan."},
 scorpio:{name:"Buruj Skorpio",shape:"Corak seperti kala jengking.",fact:"Gugusan bintang Skorpio kelihatan membentuk badan dan ekor melengkung seperti kala jengking.",use:"Buruj membantu kita mengenal pasti corak dan kedudukan tertentu di langit."}
};
let selected=null;
const score=()=>{try{return JSON.parse(localStorage.getItem("misiAngkasa")||"{}")}catch(e){return {}}};
const save=s=>localStorage.setItem("misiAngkasa",JSON.stringify(s));
function choose(key){
 selected=key;
 document.querySelectorAll(".sky-hotspot").forEach(x=>x.classList.toggle("selected",x.dataset.const===key));
 const d=data[key];
 document.getElementById("selectedTarget").textContent=d.name;
 document.getElementById("infoTitle").textContent=d.name;
 document.getElementById("infoShape").textContent=d.shape;
 document.getElementById("infoFact").textContent=d.fact;
 document.getElementById("infoUse").textContent=d.use;
 document.getElementById("infoPanel").classList.remove("hidden");
 document.getElementById("infoPanel").scrollIntoView({behavior:"smooth",block:"center"});
}
document.querySelectorAll(".sky-hotspot").forEach(x=>x.addEventListener("click",()=>choose(x.dataset.const)));
document.getElementById("closeInfo").addEventListener("click",()=>document.getElementById("infoPanel").classList.add("hidden"));
document.getElementById("understood").addEventListener("click",()=>document.getElementById("infoPanel").classList.add("hidden"));
document.getElementById("openInfo").addEventListener("click",()=>selected?choose(selected):document.getElementById("obsFeedback").textContent="☝️ Sentuh salah satu buruj dahulu.");
document.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>{
 if(!selected){document.getElementById("obsFeedback").textContent="☝️ Sentuh buruj dahulu.";return}
 document.querySelectorAll("[data-answer]").forEach(x=>x.classList.remove("correct","wrong"));
 if(b.dataset.answer===selected){
   b.classList.add("correct");
   const s=score(); s.observation=s.observation||{}; s.total=s.total||0;
   if(!s.observation[selected]){s.observation[selected]=true;s.total++;save(s)}
   document.getElementById("obsFeedback").textContent=`🌟 Betul! ${data[selected].name} dikenal pasti. +1 markah.`;
   document.getElementById("obsScoreTop").textContent=s.total;
 }else{
   b.classList.add("wrong");
   document.getElementById("obsFeedback").textContent="🔭 Belum tepat. Perhatikan semula bentuk buruj.";
 }
}));
const s=score();document.getElementById("obsScoreTop").textContent=s.total||0;
const phases=[
 {name:"Bulan Baharu",icon:"🌑",desc:"Bulan berada hampir antara Matahari dan Bumi. Bahagian bercahaya menghadap jauh dari Bumi."},
 {name:"Sabit Muda",icon:"🌒",desc:"Sedikit bahagian permukaan Bulan yang bercahaya dapat dilihat dari Bumi."},
 {name:"Suku Pertama",icon:"🌓",desc:"Kira-kira separuh bahagian Bulan yang kelihatan dari Bumi bercahaya."},
 {name:"Hampir Purnama",icon:"🌔",desc:"Lebih separuh bahagian Bulan kelihatan bercahaya."},
 {name:"Bulan Purnama",icon:"🌕",desc:"Hampir seluruh bahagian Bulan yang menghadap Bumi kelihatan bercahaya."},
 {name:"Selepas Purnama",icon:"🌖",desc:"Bahagian Bulan yang bercahaya mula berkurang selepas purnama."},
 {name:"Suku Akhir",icon:"🌗",desc:"Kira-kira separuh bahagian Bulan kelihatan bercahaya."},
 {name:"Sabit Tua",icon:"🌘",desc:"Hanya sedikit bahagian bercahaya kelihatan sebelum kembali kepada Bulan Baharu."}
];
const slider=document.getElementById("phaseSlider");
function updateMoon(){
 if(!slider)return;
 const i=+slider.value,p=phases[i];
 document.getElementById("phaseIcon").textContent=p.icon;
 document.getElementById("phaseName").textContent=p.name;
 document.getElementById("phaseDesc").textContent=p.desc;
 document.getElementById("moon").textContent=p.icon;
 const angle=i*45;
 document.getElementById("moon").style.transform=`rotate(${angle}deg) translateX(165px) rotate(${-angle}deg)`;
}
if(slider){slider.addEventListener("input",updateMoon);updateMoon();}

const questions=[
["Apakah yang dimaksudkan dengan fasa Bulan?",["Perubahan warna Matahari","Perubahan rupa Bulan yang dilihat dari Bumi","Perubahan bentuk Bumi","Pergerakan bintang"],1],
["Mengapakah Bulan kelihatan bercahaya?",["Bulan menghasilkan cahaya sendiri","Bulan memantulkan cahaya Matahari","Bulan menyerap cahaya Bumi","Bintang menerangi Bulan"],1],
["Apakah fasa apabila hampir seluruh Bulan yang menghadap Bumi kelihatan bercahaya?",["Bulan Baharu","Suku Pertama","Bulan Purnama","Sabit Tua"],2],
["Apakah yang berlaku semasa Bulan Baharu?",["Bulan sangat terang","Bulan hampir tidak kelihatan dari Bumi","Bulan bertukar menjadi bintang","Bulan berhenti bergerak"],1],
["Apakah maksud buruj?",["Satu planet","Kumpulan bintang yang kelihatan membentuk corak tertentu","Kumpulan awan","Batu di angkasa"],1],
["Yang manakah contoh buruj?",["Orion","Marikh","Bulan","Bumi"],0],
["Apakah kegunaan buruj kepada manusia?",["Sebagai panduan arah dan kedudukan","Menghasilkan cahaya Matahari","Mengubah fasa Bulan","Mengawal cuaca"],0],
["Selepas Bulan Purnama, bahagian Bulan yang bercahaya secara umum akan...",["Semakin bertambah","Semakin berkurang","Hilang selama setahun","Tidak berubah"],1],
["Fasa manakah menunjukkan kira-kira separuh Bulan kelihatan bercahaya?",["Suku Pertama","Bulan Purnama","Bulan Baharu","Sabit Muda"],0],
["Apakah faktor utama yang menyebabkan perubahan fasa Bulan?",["Kedudukan relatif Matahari, Bumi dan Bulan","Bulan berubah bentuk fizikal","Bumi menghasilkan cahaya","Bintang menolak Bulan"],0]
];
const form=document.getElementById("quizForm");
if(form){
 questions.forEach((q,i)=>{
  const div=document.createElement("div");div.className="question";
  div.innerHTML=`<h3>${i+1}. ${q[0]}</h3>`+q[1].map((a,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${String.fromCharCode(65+j)}. ${a}</label>`).join("");
  form.appendChild(div);
 });
 document.getElementById("submitQuiz").onclick=()=>{
  let score=0,answered=0;
  questions.forEach((q,i)=>{
   const chosen=document.querySelector(`input[name="q${i}"]:checked`);
   if(chosen){answered++;if(+chosen.value===q[2])score++;}
  });
  const result=document.getElementById("result");result.classList.remove("hidden");
  setQuizScore(score);
  const msg=score>=9?"🏆 Hebat! Anda Pakar Angkasa!":score>=7?"🌟 Bagus! Teruskan misi!":score>=5?"🚀 Baik! Ulang kaji nota dan cuba lagi.":"🔭 Jangan berputus asa! Baca nota dan cuba semula.";
  result.innerHTML=`<strong>${score}/10</strong><br>${msg}<br><small>${answered}/10 soalan dijawab.</small>${answered===10?`<br><b class="completion-remark">✅ Kuiz Selesai</b>`:`<br><b class="completion-remark">⏳ Kuiz Belum Selesai</b>`}`;
  result.scrollIntoView({behavior:"smooth",block:"center"});
 };
 document.getElementById("resetQuiz").onclick=()=>{form.reset();document.getElementById("result").classList.add("hidden");};
}

const defaultMission={total:0,observation:{pari:false,scorpio:false,belantik:false,biduk:false},notes:false,direction:0};
function getQuizScore(){try{return Number(localStorage.getItem("misiAngkasaQuizScore")||0)}catch(e){return 0}}
function setQuizScore(v){localStorage.setItem("misiAngkasaQuizScore",String(v))}
function missionComplete(s){return Object.values(s.observation||{}).filter(Boolean).length===4 && !!s.notes && Number(s.direction||0)>=2}
function loadMission(){try{return {...defaultMission,...JSON.parse(localStorage.getItem("misiAngkasa"))}}catch(e){return {...defaultMission}}}
function saveMission(s){localStorage.setItem("misiAngkasa",JSON.stringify(s))}
const ms=loadMission();
const hs=document.getElementById("homeScore"); if(hs)hs.textContent=`${ms.total}/7`;
const quizHome=document.getElementById("quizHomeScore"); if(quizHome)quizHome.textContent=`${getQuizScore()}/10`;
const completeBadge=document.getElementById("missionComplete");
if(completeBadge) completeBadge.textContent=missionComplete(ms)?"✅ Misi Tambahan Selesai":"⏳ Misi Belum Selesai";
const resultBtn=document.getElementById("viewResultBtn");
if(resultBtn){
 const ready=missionComplete(ms)&&getQuizScore()>=0;
 resultBtn.classList.toggle("ready-result",ready);
 resultBtn.href="result.html?v=7";
}

const rs=loadMission();
const obs=Object.values(rs.observation||{}).filter(Boolean).length;
const quiz=Math.max(0,Math.min(10,Number(localStorage.getItem("misiAngkasaQuizScore")||0)));
const missionTotal=Math.max(0,Math.min(7,Number(rs.total||0)));
const total=quiz+missionTotal;
const max=17;
const completed=obs===4 && !!rs.notes && Number(rs.direction||0)>=2;

document.getElementById("finalScore").textContent=total;
document.querySelector(".achievement-score small").textContent=`/ ${max} MARKAH`;
document.getElementById("quizResult").textContent=`${quiz}/10`;
document.getElementById("obsResult").textContent=`${obs}/4`;
document.getElementById("noteResult").textContent=`${rs.notes?1:0}/1`;
document.getElementById("dirResult").textContent=`${Math.min(2,Number(rs.direction||0))}/2`;
const missionStatus=document.createElement("div"); missionStatus.className="final-status"; missionStatus.textContent=completed?"✅ SEMUA MISI SELESAI":"⏳ MISI BELUM LENGKAP"; document.querySelector(".result-panel").prepend(missionStatus);

let title="Kadet Angkasa",icon="🧑‍🚀",text="Teruskan latihan untuk menguasai langit malam.";
if(total>=14){title="Saintis Angkasa Cemerlang";icon="🏆🚀";text="Tahniah! Pencapaian kamu sangat baik. Kamu menunjukkan kemahiran pemerhatian, pengetahuan dan pemahaman yang cemerlang."}
else if(total>=10){title="Angkasawan Muda";icon="🥇🧑‍🚀";text="Hebat! Kamu sudah menguasai sebahagian besar misi. Teruskan latihan untuk mencapai markah lebih tinggi."}
else {title="Penjelajah Angkasa";icon="🔭🚀";text="Cuba lagi! Baca nota, ulang pemerhatian buruj dan semak semula fasa Bulan."}
if(completed && total>=14){text="Tahniah! Semua misi telah selesai dan markah kamu sangat tinggi. Teruskan menjadi saintis angkasa yang hebat!"}

document.getElementById("achievementTitle").textContent=title;
document.getElementById("achievementIcon").textContent=icon;
document.getElementById("achievementText").textContent=text;

document.getElementById("celebrationTitle").textContent=total>=14?"TAHNIAH, SAINTIS ANGKASA!":"CUBA LAGI, ANGKASAWAN MUDA!";
document.getElementById("celebrationText").textContent=total>=14?`Kamu memperoleh ${total}/${max} markah dan berjaya menamatkan misi dengan cemerlang.`:`Kamu memperoleh ${total}/${max} markah. Jangan berputus asa — baca nota dan cuba semula!`;
document.getElementById("celebrationFlame").style.display=total>=14?"block":"none";
document.getElementById("celebrationSmoke").style.display=total<14?"block":"none";
document.getElementById("showCelebration").addEventListener("click",()=>document.getElementById("celebrationPopup").classList.remove("hidden"));
document.getElementById("closeCelebration").addEventListener("click",()=>document.getElementById("celebrationPopup").classList.add("hidden"));
document.getElementById("celebrationPopup").addEventListener("click",e=>{if(e.target.id==="celebrationPopup")e.currentTarget.classList.add("hidden")});
setTimeout(()=>document.getElementById("celebrationPopup").classList.remove("hidden"),500);
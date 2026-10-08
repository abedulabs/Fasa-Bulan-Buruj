const rs=loadMission();const obs=Object.values(rs.observation||{}).filter(Boolean).length;const total=rs.total||0;
document.getElementById("finalScore").textContent=total;document.getElementById("obsResult").textContent=`${obs}/4`;document.getElementById("noteResult").textContent=`${rs.notes?1:0}/1`;document.getElementById("dirResult").textContent=`${rs.direction||0}/2`;
let title="Kadet Angkasa",icon="🧑‍🚀",text="Teruskan latihan untuk menguasai langit malam.";
if(total>=7){title="Saintis Angkasa Cemerlang";icon="🏆🚀";text="Tahniah! Kamu berjaya melengkapkan semua stesen misi dan menunjukkan kemahiran pemerhatian angkasa."}
else if(total>=5){title="Angkasawan Muda";icon="🥇🧑‍🚀";text="Hebat! Kamu sudah hampir menjadi saintis angkasa. Lengkapkan baki misi untuk markah penuh."}
else if(total>=3){title="Penjelajah Angkasa";icon="🔭🚀";text="Bagus! Teruskan meneroka dan perhatikan semula corak bintang."}
document.getElementById("achievementTitle").textContent=title;document.getElementById("achievementIcon").textContent=icon;document.getElementById("achievementText").textContent=text;
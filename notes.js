let ns=loadMission();document.getElementById("noteScore").textContent=ns.total;
document.getElementById("saveNote").onclick=()=>{
 const ok=document.getElementById("studentName").value.trim()&&document.getElementById("favConst").value.trim()&&document.getElementById("noteText").value.trim();
 if(!ok){document.getElementById("noteFeedback").textContent="✏️ Lengkapkan semua ruang catatan dahulu.";return}
 if(!ns.notes){ns.notes=true;ns.total++;saveMission(ns)}
 document.getElementById("noteScore").textContent=ns.total;
 document.getElementById("noteFeedback").textContent="🌟 Catatan disimpan! +1 markah.";
};
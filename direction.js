let ds=loadMission();document.getElementById("dirScore").textContent=ds.total;
document.getElementById("checkDirection").onclick=()=>{
 const a=document.querySelector('input[name="d1"]:checked'),b=document.querySelector('input[name="d2"]:checked');
 if(!a||!b){document.getElementById("dirFeedback").textContent="🧭 Jawab kedua-dua soalan dahulu.";return}
 const score=(a.value==="utara"?1:0)+(b.value==="selatan"?1:0);
 const previous=ds.direction||0; ds.total += score-previous; ds.direction=score; saveMission(ds);
 document.getElementById("dirScore").textContent=ds.total;
 document.getElementById("dirFeedback").textContent=`🌟 ${score}/2 jawapan betul. Markah arah dikemas kini.`;
};
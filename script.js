function loadMission(){try{const x=JSON.parse(localStorage.getItem('misiAngkasaState'));if(x)return x;}catch(e){}return{total:0,observation:{pari:false,scorpio:false,belantik:false,biduk:false},noteDone:false,note:{name:'',shape:'',finding:''},direction:{d1:false,d2:false}}}
function saveMission(state){localStorage.setItem('misiAngkasaState',JSON.stringify(state));}
if(document.getElementById('homeScore'))document.getElementById('homeScore').textContent=loadMission().total+'/7';

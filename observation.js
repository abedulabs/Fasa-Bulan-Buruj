const O={
  pari:{name:'Buruj Pari',shape:'seperti salib / layang-layang'},
  scorpio:{name:'Buruj Skorpio',shape:'seperti kala jengking'},
  belantik:{name:'Buruj Belantik',shape:'seperti pemburu'},
  biduk:{name:'Buruj Biduk',shape:'seperti gayung / senduk'}
};

const STAR_MAP={
  // Kedudukan relatif berdasarkan corak bintang contoh rujukan:
  // Pari (Crux): bentuk salib tanpa garisan penghubung.
  pari:[
    [50,10,'bright'],[50,35,'dim'],[50,58,'bright'],
    [25,43,'bright'],[75,43,'bright'],[51,86,'dim']
  ],
  // Skorpio: lengkung badan dan ekor yang berliku.
  scorpio:[
    [9,20,'bright'],[20,27,'dim'],[31,34,'bright'],[43,43,'bright'],
    [54,52,'bright'],[63,64,'bright'],[70,77,'bright'],
    [78,86,'bright'],[88,79,'bright'],[94,68,'dim'],
    [83,56,'dim'],[72,48,'dim'],[60,39,'dim'],[48,31,'dim']
  ],
  // Belantik (Orion): empat bintang utama dengan tiga bintang di bahagian tengah.
  belantik:[
    [20,12,'bright'],[50,7,'bright'],[80,13,'bright'],
    [29,31,'dim'],[50,35,'bright'],[71,31,'dim'],
    [50,49,'bright'],[35,70,'bright'],[65,70,'bright'],
    [50,91,'bright']
  ],
  // Biduk (Big Dipper): tujuh bintang membentuk mangkuk dan pemegang.
  biduk:[
    [14,35,'bright'],[31,27,'bright'],[48,31,'bright'],[62,48,'bright'],
    [48,67,'bright'],[28,61,'bright'],[70,58,'dim'],
    [86,47,'bright']
  ]
};

function buildConstellations(){
  document.querySelectorAll('.constellation').forEach(el=>{
    const key=el.dataset.const;
    el.innerHTML='';
    (STAR_MAP[key]||[]).forEach(([x,y,kind])=>{
      const s=document.createElement('span');
      s.className=`constellation-star ${kind||''}`;
      s.style.left=`${x}%`;
      s.style.top=`${y}%`;
      el.appendChild(s);
    });
  });
}

let state=loadMission(), current='pari';
function refreshTop(){
  document.getElementById('obsScoreTop').textContent=state.total;
}
function choose(key){
  current=key;
  const keys=['pari','scorpio','belantik','biduk'];
  document.getElementById('selectedTarget').textContent=String.fromCharCode(65+keys.indexOf(key));
  document.querySelectorAll('.constellation,.target-buttons button').forEach(x=>{
    x.classList.toggle('selected',x.dataset.const===key||x.dataset.target===key);
  });
  document.querySelectorAll('#constAnswers button').forEach(x=>x.classList.remove('correct','wrong'));
  document.getElementById('obsFeedback').textContent=
    state.observation[key]?'✅ Sasaran ini telah dikenal pasti.':'Pilih jawapan berdasarkan kedudukan dan corak bintang.';
}

document.querySelectorAll('.target-buttons button').forEach(x=>{
  x.addEventListener('click',()=>choose(x.dataset.target));
});

document.querySelectorAll('#constAnswers button').forEach(x=>{
  x.addEventListener('click',()=>{
    document.querySelectorAll('#constAnswers button').forEach(b=>b.classList.remove('correct','wrong'));
    if(x.dataset.answer===current){
      x.classList.add('correct');
      if(!state.observation[current]){
        state.observation[current]=true;
        state.total++;
        saveMission(state);
      }
      document.getElementById('obsFeedback').textContent=
        `🌟 Betul! ${O[current].name} membentuk corak ${O[current].shape}. +1 markah.`;
      refreshTop();
    }else{
      x.classList.add('wrong');
      document.getElementById('obsFeedback').textContent=
        '🔭 Belum tepat. Perhatikan semula kedudukan bintang pada kawasan ini.';
    }
  });
});

buildConstellations();
document.querySelectorAll('.constellation').forEach(x=>{
  x.addEventListener('click',()=>choose(x.dataset.const));
});
choose('pari');
refreshTop();

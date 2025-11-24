// Simple favors app
(function(){
  const KEY = 'wifeFavors_v1'

  const sample = [
    {id: 'f1',title:'10-min foot massage',desc:'Relaxing foot rub for 10 minutes',minutes:10,fav:true,done:false},
    {id: 'f2',title:'Make favorite tea',desc:'Prepare her favorite tea or coffee',minutes:5,fav:false,done:false},
    {id: 'f3',title:'Movie pick',desc:'Let her pick a movie and snacks',minutes:120,fav:false,done:false},
    {id: 'f4',title:'Phone-free meal',desc:'Have a full meal together with phones away',minutes:30,fav:true,done:false}
  ]

  let favors = load()

  const grid = document.getElementById('grid')
  const randomBtn = document.getElementById('randomBtn')
  const shuffleBtn = document.getElementById('shuffleBtn')
  const addBtn = document.getElementById('addBtn')
  const modal = document.getElementById('modal')
  const form = document.getElementById('favorForm')
  const cancelBtn = document.getElementById('cancelBtn')
  const statusEl = document.getElementById('status')

  document.querySelectorAll('input[name="filter"]').forEach(el=>el.addEventListener('change',render))
  randomBtn.addEventListener('click',pickRandom)
  shuffleBtn.addEventListener('click',()=>{favors=shuffleArray(favors); save(); render()})
  addBtn.addEventListener('click',()=>openModal())
  cancelBtn.addEventListener('click',closeModal)
  form.addEventListener('submit',e=>{e.preventDefault(); addFromForm();})

  // close modal when clicking on the backdrop (outside the panel)
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); })
  // close modal on Escape key
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); })

  render()

  function load(){
    try{
      const raw = localStorage.getItem(KEY)
      if(!raw) { localStorage.setItem(KEY, JSON.stringify(sample)); return sample.slice() }
      return JSON.parse(raw)
    }catch(e){return sample.slice()}
  }

  function save(){ localStorage.setItem(KEY, JSON.stringify(favors)) }

  function render(){
    const filter = document.querySelector('input[name="filter"]:checked').value
    grid.innerHTML = ''
    let list = favors.slice()
    if(filter==='available') list = list.filter(f=>!f.done)
    if(filter==='done') list = list.filter(f=>f.done)
    if(filter==='fav') list = list.filter(f=>f.fav)

    statusEl.textContent = `${list.length} items`

    if(list.length===0){ grid.innerHTML = '<p class="small">No favors yet — add one!</p>'; return }

    for(const f of list){
      const card = document.createElement('article')
      card.className = 'card'
      if(f.done) card.classList.add('done')

      const title = document.createElement('h3'); title.textContent = f.title
      const meta = document.createElement('div'); meta.className='meta';
      meta.textContent = f.desc || (f.minutes?`${f.minutes} min`:'')

      const actions = document.createElement('div'); actions.className='actions'

      const favBtn = document.createElement('button'); favBtn.className='btn'; favBtn.innerHTML = f.fav? '★ Favorite':'☆ Favorite'
      favBtn.addEventListener('click',()=>{ toggleFav(f.id) })

      const doneBtn = document.createElement('button'); doneBtn.className='btn'; doneBtn.textContent = f.done? 'Mark undone':'Mark done'
      doneBtn.addEventListener('click',()=>{ toggleDone(f.id) })

      const delBtn = document.createElement('button'); delBtn.className='btn'; delBtn.textContent = 'Delete'
      delBtn.addEventListener('click',()=>{ deleteFavor(f.id) })

      actions.appendChild(favBtn); actions.appendChild(doneBtn); actions.appendChild(delBtn)

      card.appendChild(title); card.appendChild(meta); card.appendChild(actions)
      grid.appendChild(card)
    }
  }

  function toggleFav(id){
    const it = favors.find(f=>f.id===id); if(!it) return
    it.fav = !it.fav; save(); render()
  }

  function toggleDone(id){
    const it = favors.find(f=>f.id===id); if(!it) return
    it.done = !it.done; save(); render()
  }

  function deleteFavor(id){
    if(!confirm('Delete this favor?')) return
    favors = favors.filter(f=>f.id!==id); save(); render()
  }

  function addFromForm(){
    const fd = new FormData(form)
    const title = fd.get('title').trim(); if(!title) return
    const desc = fd.get('desc').trim(); const minutes = Number(fd.get('minutes')) || 0
    const item = { id: 'f' + Date.now(), title, desc, minutes, fav:false, done:false }
    favors.unshift(item); save(); closeModal(); render(); form.reset()
  }

  function openModal(){
    modal.classList.remove('hidden')
    // focus the title input for quick entry
    try{ const t = form.elements['title']; if(t && typeof t.focus === 'function') t.focus(); }catch(e){}
  }
  function closeModal(){
    modal.classList.add('hidden')
    // return focus to the Add button for accessibility
    try{ if(typeof addBtn.focus === 'function') addBtn.focus(); }catch(e){}
  }

  function pickRandom(){
    const list = favors.filter(f=>!f.done)
    if(list.length===0){ alert('No available favors to pick — try adding one.'); return }
    const pick = list[Math.floor(Math.random()*list.length)]
    alert(`Try this: ${pick.title}${pick.minutes? ' — '+pick.minutes+' min':''}`)
  }

  function shuffleArray(a){
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
    return a
  }

})();

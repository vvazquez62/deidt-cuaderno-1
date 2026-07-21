(() => {
  'use strict';
  const STORAGE_KEY = 'deidt-devsecops-course-v01';
  const REGISTRY_KEY = 'deidt-devsecops-imported-records-v01';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

  let state = loadState();
  let activeView = 'welcome';
  let activeModuleId = state.currentModule || 'm0';

  document.addEventListener('DOMContentLoaded', init);

  function initialState(){
    const modules={};
    COURSE_MODULES.forEach(m=>modules[m.id]={sourcesReviewed:[],evidenceText:'',evidenceFile:null,attempts:0,bestScore:null,lastScore:null,lastAnswers:null,passed:false,passedAt:null});
    return {version:COURSE_VERSION,profile:null,modules,currentModule:'m0',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),certificateId:null};
  }
  function loadState(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(!parsed || !parsed.modules) return initialState();
      const fresh=initialState();
      return {...fresh,...parsed,modules:{...fresh.modules,...parsed.modules}};
    }catch{return initialState();}
  }
  function saveState(){state.updatedAt=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));updateProgressUI();}

  function init(){
    bindGlobalActions();
    renderNavigation();
    renderProfileSummary();
    populateEnrollment();
    updateProgressUI();
    showView(state.profile ? 'module':'welcome', state.profile ? activeModuleId:null);
  }

  function bindGlobalActions(){
    $('#enrollmentForm').addEventListener('submit', saveEnrollment);
    $('#fontToggle').addEventListener('click',()=>{
      document.body.classList.toggle('large-text');
      const on=document.body.classList.contains('large-text');
      $('#fontToggle').setAttribute('aria-pressed',String(on));
      $('#fontToggle').textContent=on?'Texto normal':'Texto grande';
    });
    $('#contrastToggle').addEventListener('click',()=>{
      document.body.classList.toggle('high-contrast');
      const on=document.body.classList.contains('high-contrast');
      $('#contrastToggle').setAttribute('aria-pressed',String(on));
      $('#contrastToggle').textContent=on?'Contraste normal':'Alto contraste';
    });
    $$('.nav-button').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));
  }

  function saveEnrollment(e){
    e.preventDefault();
    state.profile={
      fullName:$('#fullName').value.trim(),employeeId:$('#employeeId').value.trim(),email:$('#email').value.trim(),
      area:$('#area').value.trim(),mesa:$('#mesa').value,role:$('#role').value.trim(),registeredAt:state.profile?.registeredAt||new Date().toISOString()
    };
    saveState();renderProfileSummary();renderNavigation();showView('module','m0');
  }
  function populateEnrollment(){
    if(!state.profile)return;
    ['fullName','employeeId','email','area','mesa','role'].forEach(id=>{const el=$('#'+id);if(el)el.value=state.profile[id]||'';});
    $('#consent').checked=true;
    $('#enrollmentForm button[type=submit]').textContent='Actualizar registro';
  }
  function renderProfileSummary(){
    const box=$('#profileSummary');
    if(!state.profile){box.innerHTML='<strong>Sin participante registrado</strong><span>Registre sus datos para iniciar.</span>';return;}
    box.innerHTML=`<strong>${esc(state.profile.fullName)}</strong><span>${esc(state.profile.employeeId)} · ${esc(state.profile.mesa)}</span>`;
  }

  function renderNavigation(){
    const nav=$('#moduleNav');nav.innerHTML='';
    COURSE_MODULES.forEach((m,i)=>{
      const unlocked=isUnlocked(i);const p=state.modules[m.id];
      const b=document.createElement('button');b.type='button';b.className='module-link'+(!unlocked?' locked':'')+(activeModuleId===m.id&&activeView==='module'?' active':'');
      b.disabled=!unlocked;b.dataset.module=m.id;
      const status=p.passed?'✓':unlocked?'○':'🔒';
      b.innerHTML=`<span>${m.number}. ${esc(m.title)}</span><span class="status" aria-label="${p.passed?'Aprobado':unlocked?'Disponible':'Bloqueado'}">${status}</span>`;
      b.addEventListener('click',()=>showView('module',m.id));nav.appendChild(b);
    });
  }
  function isUnlocked(index){if(!state.profile)return false;if(index===0)return true;return !!state.modules[COURSE_MODULES[index-1].id].passed;}
  function updateProgressUI(){
    const passed=COURSE_MODULES.filter(m=>state.modules[m.id].passed).length;const pct=Math.round(passed/COURSE_MODULES.length*100);
    $('#overallPercent').textContent=pct+'%';$('#overallBar').style.width=pct+'%';$('#overallText').textContent=`${passed} de ${COURSE_MODULES.length} módulos aprobados`;
    if(passed===COURSE_MODULES.length&&!state.certificateId){state.certificateId=createCertificateId();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  }

  function showView(view,moduleId=null){
    activeView=view;if(moduleId){activeModuleId=moduleId;state.currentModule=moduleId;saveState();}
    $$('.view').forEach(v=>v.classList.remove('active'));$$('.nav-button,.module-link').forEach(v=>v.classList.remove('active'));
    if(view==='welcome')$('#welcomeView').classList.add('active');
    if(view==='module'){renderModule(activeModuleId);$('#moduleView').classList.add('active');}
    if(view==='glossary'){renderGlossary();$('#glossaryView').classList.add('active');}
    if(view==='route'){renderRoute();$('#routeView').classList.add('active');}
    if(view==='records'){renderRecords();$('#recordsView').classList.add('active');}
    renderNavigation();window.scrollTo({top:0,behavior:'smooth'});$('#main').focus({preventScroll:true});
  }

  function renderModule(id){
    const m=COURSE_MODULES.find(x=>x.id===id);const p=state.modules[id];const view=$('#moduleView');
    const terms=m.terms.map(t=>GLOSSARY.find(g=>g.acronym.toLowerCase()===t.toLowerCase())||{acronym:t,name:'Concepto del módulo',definition:'Consulte el glosario general y las fuentes del módulo.'});
    const sourcesDone=m.sources.every(s=>p.sourcesReviewed.includes(s.id));
    const evidenceDone=!m.evidenceRequired || p.evidenceText.trim().length>=80;
    const canSubmit=sourcesDone&&evidenceDone;
    view.innerHTML=`
      <div class="module-header card">
        <div><p class="eyebrow">Nivel ${m.number} · ${m.duration}</p><h2>${esc(m.title)}</h2><p>${esc(m.summary)}</p></div>
        <span class="pill ${p.passed?'pass':''}">${p.passed?'Aprobado':'En proceso'}</span>
      </div>
      ${p.passed?`<div class="notice success"><strong>Módulo aprobado.</strong> Mejor resultado: ${p.bestScore}% · ${formatDate(p.passedAt)}</div>`:''}
      <section class="card"><h3>Objetivos</h3><div class="objectives">${m.objectives.map(o=>`<div class="objective">${esc(o)}</div>`).join('')}</div></section>
      <section class="card"><h3>Acrónimos y conceptos esenciales</h3><div class="terms-grid">${terms.map(t=>`<div class="term-card"><strong>${esc(t.acronym)} · ${esc(t.name)}</strong><span>${esc(t.definition)}</span></div>`).join('')}</div></section>
      <section class="card"><h3>Engarce con las cuatro mesas</h3><div class="mesa-grid">${mesaCards(m.mesa)}</div></section>
      <section class="card"><h3>Fuentes oficiales obligatorias</h3>${m.sources.length?`<div class="source-grid">${m.sources.map(s=>sourceCard(s,p)).join('')}</div>`:'<p>Este nivel utiliza las fuentes revisadas en módulos anteriores.</p>'}</section>
      <section class="card"><h3>Rutina de autoaprendizaje</h3>${m.routine.map((r,i)=>`<div class="learning-step"><strong>Paso ${i+1}.</strong> ${esc(r)}</div>`).join('')}</section>
      <section class="card evidence-box"><h3>Evidencia de aplicación</h3><p>${esc(m.evidencePrompt)}</p>
        <label for="evidenceText"><strong>Respuesta del participante</strong></label>
        <textarea id="evidenceText" maxlength="4000" placeholder="Escriba una evidencia concreta, ligada a su trabajo…">${esc(p.evidenceText)}</textarea>
        <p id="evidenceCount" class="muted">${p.evidenceText.length} caracteres. ${m.evidenceRequired?'Mínimo 80 para habilitar la evaluación.':'Esta evidencia es recomendada.'}</p>
        <label for="evidenceFile"><strong>Archivo complementario opcional</strong></label><input id="evidenceFile" type="file">
        <div id="fileMeta" class="file-meta">${p.evidenceFile?fileDescription(p.evidenceFile):'El archivo no se conserva; sólo se registra nombre, tamaño y huella SHA-256.'}</div>
        <div class="actions"><button id="saveEvidence" class="secondary" type="button">Guardar evidencia</button></div>
      </section>
      <section class="card"><h3>Evaluación del nivel</h3>
        <p>Intentos: ${p.attempts} · Mejor resultado: ${p.bestScore===null?'—':p.bestScore+'%'} · Aprobación: ${m.passScore}%</p>
        ${!sourcesDone?'<div class="notice warning">Abra todas las fuentes obligatorias antes de evaluar.</div>':''}
        ${!evidenceDone?'<div class="notice warning">Registre al menos 80 caracteres de evidencia antes de evaluar.</div>':''}
        <form id="quizForm">${quizHtml(m,p)}</form>
        <div class="actions no-print"><button id="submitQuiz" class="primary" type="button" ${canSubmit?'':'disabled'}>${p.lastAnswers?'Evaluar nuevamente':'Evaluar módulo'}</button>${p.lastAnswers?'<button id="clearAttempt" class="secondary" type="button">Limpiar respuestas</button>':''}</div>
      </section>
      ${nextAction(m)}
    `;
    bindModuleEvents(m,p);
  }

  function mesaCards(mesa){
    const data=[['Mesa de Competencia',mesa.competencia],['Arquitectura y Estándares',mesa.arquitectura],['Producción de Software',mesa.produccion],['Calidad y Productivo',mesa.calidad]];
    return data.map(([t,d])=>`<div class="mesa-card"><strong>${t}</strong><p>${esc(d)}</p></div>`).join('');
  }
  function sourceCard(s,p){const done=p.sourcesReviewed.includes(s.id);return `<article class="source-card"><strong>${esc(s.title)}</strong><span>${esc(s.note)}</span><a href="${s.url}" target="_blank" rel="noopener noreferrer" data-source-id="${s.id}">Abrir fuente oficial ↗</a><span class="source-status ${done?'done':''}">${done?'✓ Fuente registrada como revisada':'Pendiente de revisión'}</span></article>`;}
  function quizHtml(m,p){
    return m.quiz.map((question,qi)=>{
      const answered=p.lastAnswers?.[qi];
      const options=question.options.map((opt,oi)=>`<label class="option"><input type="radio" name="q${qi}" value="${oi}" ${answered===oi?'checked':''}> <span>${esc(opt)}</span></label>`).join('');
      let feedback='';
      if(p.lastAnswers){const correct=answered===question.correct;feedback=`<div class="feedback ${correct?'correct':'incorrect'}"><strong>${correct?'Correcto':'Incorrecto'}.</strong> ${esc(question.explanation)}</div>`;}
      return `<fieldset class="quiz-question"><legend>${qi+1}. ${esc(question.text)}</legend>${options}${feedback}</fieldset>`;
    }).join('');
  }
  function bindModuleEvents(m,p){
    $$('[data-source-id]',$('#moduleView')).forEach(a=>a.addEventListener('click',()=>{const id=a.dataset.sourceId;if(!p.sourcesReviewed.includes(id)){p.sourcesReviewed.push(id);saveState();setTimeout(()=>renderModule(m.id),250);}}));
    $('#evidenceText').addEventListener('input',e=>{$('#evidenceCount').textContent=`${e.target.value.length} caracteres. ${m.evidenceRequired?'Mínimo 80 para habilitar la evaluación.':'Esta evidencia es recomendada.'}`;});
    $('#saveEvidence').addEventListener('click',()=>{p.evidenceText=$('#evidenceText').value.trim();saveState();renderModule(m.id);});
    $('#evidenceFile').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;const hash=await sha256(file);p.evidenceFile={name:file.name,size:file.size,type:file.type||'desconocido',sha256:hash,recordedAt:new Date().toISOString()};saveState();$('#fileMeta').textContent=fileDescription(p.evidenceFile);});
    $('#submitQuiz').addEventListener('click',()=>submitQuiz(m));
    $('#nextModuleBtn')?.addEventListener('click',e=>showView('module',e.currentTarget.dataset.nextModule));
    $('#clearAttempt')?.addEventListener('click',()=>{p.lastAnswers=null;p.lastScore=null;saveState();renderModule(m.id);});
  }
  function submitQuiz(m){
    const p=state.modules[m.id];p.evidenceText=$('#evidenceText').value.trim();
    const answers=m.quiz.map((_,i)=>{const checked=$(`input[name=q${i}]:checked`);return checked?Number(checked.value):null;});
    if(answers.some(a=>a===null)){alert('Responda todas las preguntas antes de evaluar.');return;}
    const correct=answers.reduce((n,a,i)=>n+(a===m.quiz[i].correct?1:0),0);const score=Math.round(correct/m.quiz.length*100);
    p.attempts+=1;p.lastAnswers=answers;p.lastScore=score;p.bestScore=p.bestScore===null?score:Math.max(p.bestScore,score);
    if(score>=m.passScore){p.passed=true;p.passedAt=p.passedAt||new Date().toISOString();}
    saveState();renderNavigation();renderModule(m.id);
  }
  function nextAction(m){
    const i=COURSE_MODULES.findIndex(x=>x.id===m.id);const p=state.modules[m.id];
    if(!p.passed)return '';
    if(i<COURSE_MODULES.length-1){const n=COURSE_MODULES[i+1];return `<section class="card no-print"><h3>Siguiente nivel habilitado</h3><button id="nextModuleBtn" class="success" type="button" data-next-module="${n.id}">Continuar a ${n.number}. ${esc(n.title)}</button></section>`;}
    return `<section class="card"><h3>Trayecto concluido</h3><p>Abra “Registro y exportación” para generar el expediente y constancia demostrativa.</p></section>`;
  }

  function renderGlossary(){
    const view=$('#glossaryView');
    view.innerHTML=`<section class="card"><p class="eyebrow">Referencia rápida</p><h2>Glosario técnico</h2><p>Busque por acrónimo, nombre o definición. Ningún término debe utilizarse sin significado compartido.</p><div class="glossary-controls"><input id="glossarySearch" placeholder="Ej. SBOM, arquitectura, pruebas…"><button id="glossaryClear" class="secondary" type="button">Limpiar</button></div><dl id="glossaryList" class="glossary-list"></dl></section>`;
    const draw=(query='')=>{const q=query.toLowerCase().trim();const items=GLOSSARY.filter(g=>!q||`${g.acronym} ${g.name} ${g.definition}`.toLowerCase().includes(q));$('#glossaryList').innerHTML=items.map(g=>`<div class="glossary-item"><dt>${esc(g.acronym)} · ${esc(g.name)}</dt><dd>${esc(g.definition)}</dd></div>`).join('')||'<p>No se encontraron términos.</p>';};
    draw();$('#glossarySearch').addEventListener('input',e=>draw(e.target.value));$('#glossaryClear').addEventListener('click',()=>{$('#glossarySearch').value='';draw();});
  }

  function renderRoute(){
    const rows=[
      ['Ingreso, diagnóstico y glosario',[1,0,0,0,0,0]],['DevOps',[0,1,0,0,0,0]],['DevSecOps y seguridad',[0,0,1,0,0,0]],['ITIL y TOGAF',[0,0,0,1,0,0]],['OpenShift y CI/CD',[0,0,0,0,1,0]],['Integración y evaluación final',[0,0,0,0,0,1]]
    ];
    const cells=rows.map(([label,weeks])=>`<div class="gantt-label">${label}</div>${weeks.map((v,i)=>`<div class="gantt-cell ${v?'active':''}">${v?'Trabajo':''}</div>`).join('')}`).join('');
    $('#routeView').innerHTML=`<section class="card"><p class="eyebrow">Ruta sugerida</p><h2>Trayecto de seis semanas</h2><p>La secuencia es obligatoria, pero el ritmo puede ajustarse. Se recomienda 30% de lectura y 70% de aplicación.</p><div class="gantt" role="img" aria-label="Diagrama de Gantt de seis semanas"><div class="gantt-grid"><div class="gantt-head">Frente</div>${[1,2,3,4,5,6].map(n=>`<div class="gantt-head">Semana ${n}</div>`).join('')}${cells}</div></div><h3>Equivalente textual accesible</h3><ol><li>Semana 1: ingreso, diagnóstico, propósito y glosario.</li><li>Semana 2: origen, propósito, cultura y medición DevOps.</li><li>Semana 3: DevSecOps, NIST SSDF y OWASP.</li><li>Semana 4: integración con ITIL y TOGAF.</li><li>Semana 5: OpenShift, CI/CD, artefactos y evidencia.</li><li>Semana 6: cuatro mesas, barras transversales y caso integrador.</li></ol></section>
      <section class="card"><h2>Resultados esperados por nivel</h2><div class="table-wrap"><table><thead><tr><th>Nivel</th><th>Producto de aprendizaje</th><th>Condición de avance</th></tr></thead><tbody>${COURSE_MODULES.map(m=>`<tr><td>${m.number}. ${esc(m.title)}</td><td>${esc(m.evidencePrompt)}</td><td>${m.passScore?`Fuentes + evidencia + ${m.passScore}%`:'Diagnóstico concluido'}</td></tr>`).join('')}</tbody></table></div></section>`;
  }

  function renderRecords(){
    const passed=COURSE_MODULES.filter(m=>state.modules[m.id].passed).length;const all=passed===COURSE_MODULES.length;
    const moduleRows=COURSE_MODULES.map(m=>{const p=state.modules[m.id];return `<tr><td>${m.number}. ${esc(m.title)}</td><td>${p.passed?'Aprobado':'Pendiente'}</td><td>${p.bestScore===null?'—':p.bestScore+'%'}</td><td>${p.attempts}</td><td>${p.evidenceText?esc(p.evidenceText.slice(0,120))+(p.evidenceText.length>120?'…':''):'—'}</td></tr>`;}).join('');
    $('#recordsView').innerHTML=`<section class="card"><p class="eyebrow">Expediente local</p><h2>Registro, evidencias y exportación</h2><div class="notice warning"><strong>Alcance del prototipo:</strong> los datos están en este navegador. La importación permite concentrar manualmente archivos JSON; no sustituye un LMS ni un registro institucional.</div><div class="dashboard-grid"><div class="metric"><strong>${passed}/${COURSE_MODULES.length}</strong>Módulos aprobados</div><div class="metric"><strong>${Math.round(passed/COURSE_MODULES.length*100)}%</strong>Avance</div><div class="metric"><strong>${state.profile?esc(state.profile.mesa):'—'}</strong>Mesa principal</div><div class="metric"><strong>${state.certificateId||'Pendiente'}</strong>Folio</div></div><div class="actions no-print"><button id="exportJson" class="primary" type="button">Exportar expediente JSON</button><button id="exportCsv" class="secondary" type="button">Exportar resumen CSV</button><button id="printRecord" class="secondary" type="button">Imprimir expediente</button><button id="resetCourse" class="danger" type="button">Reiniciar datos locales</button></div></section>
      <section class="card"><h2>Detalle por módulo</h2><div class="table-wrap"><table><thead><tr><th>Módulo</th><th>Estado</th><th>Mejor resultado</th><th>Intentos</th><th>Evidencia</th></tr></thead><tbody>${moduleRows}</tbody></table></div></section>
      ${all?certificateHtml():`<section class="card"><h2>Constancia</h2><p>Se habilitará al aprobar los ${COURSE_MODULES.length} módulos.</p></section>`}
      <section class="card no-print"><h2>Concentración manual de expedientes</h2><p>Importe archivos JSON exportados por participantes para revisar un padrón local. Esta función es demostrativa y no tiene autenticación.</p><input id="importRecord" type="file" accept="application/json,.json"><div class="actions"><button id="exportRegistry" class="secondary" type="button">Exportar padrón CSV</button><button id="clearRegistry" class="secondary" type="button">Vaciar padrón importado</button></div><div id="registryTable"></div></section>`;
    $('#exportJson').addEventListener('click',exportJson);$('#exportCsv').addEventListener('click',exportCsv);$('#printRecord').addEventListener('click',printRecord);$('#resetCourse').addEventListener('click',resetCourse);
    $('#importRecord').addEventListener('change',importRecord);$('#exportRegistry').addEventListener('click',exportRegistry);$('#clearRegistry').addEventListener('click',()=>{localStorage.removeItem(REGISTRY_KEY);renderRegistryTable();});renderRegistryTable();
  }
  function certificateHtml(){return `<section class="card certificate" id="certificate"><p class="eyebrow">Constancia demostrativa</p><h2>Trayecto de formación DevSecOps concluido</h2><p>Se hace constar que</p><h3>${esc(state.profile.fullName)}</h3><p>identificador ${esc(state.profile.employeeId)}, adscrito a ${esc(state.profile.area)}, concluyó el cuaderno interactivo de lenguaje común, DevOps, DevSecOps, ITIL, TOGAF, OpenShift y cuatro mesas.</p><p><strong>Folio:</strong> ${state.certificateId}<br><strong>Fecha:</strong> ${formatDate(state.updatedAt)}<br><strong>Versión:</strong> ${COURSE_VERSION}</p><small>Esta constancia pertenece al prototipo y no sustituye una certificación oficial.</small></section>`;}

  function exportJson(){download(`expediente_devsecops_${safeName(state.profile?.employeeId||'participante')}.json`,JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),'application/json');}
  function exportCsv(){
    const rows=[['Empleado','Nombre','Mesa','Módulo','Estado','Mejor resultado','Intentos','Fecha aprobación','Evidencia','Archivo evidencia','SHA-256']];
    COURSE_MODULES.forEach(m=>{const p=state.modules[m.id];rows.push([state.profile?.employeeId||'',state.profile?.fullName||'',state.profile?.mesa||'',`${m.number}. ${m.title}`,p.passed?'Aprobado':'Pendiente',p.bestScore??'',p.attempts,p.passedAt||'',p.evidenceText,p.evidenceFile?.name||'',p.evidenceFile?.sha256||'']);});
    download(`resumen_devsecops_${safeName(state.profile?.employeeId||'participante')}.csv`,toCsv(rows),'text/csv;charset=utf-8');
  }
  function printRecord(){const v=$('#recordsView');v.classList.add('print-target');window.print();setTimeout(()=>v.classList.remove('print-target'),300);}
  function resetCourse(){if(!confirm('¿Eliminar todo el avance local de este participante? Esta acción no se puede deshacer.'))return;localStorage.removeItem(STORAGE_KEY);state=initialState();location.reload();}

  async function importRecord(e){
    const file=e.target.files[0];if(!file)return;
    try{const record=JSON.parse(await file.text());if(!record.profile||!record.modules)throw new Error('Estructura no reconocida');const registry=loadRegistry();const key=record.profile.employeeId||record.profile.email;const idx=registry.findIndex(r=>(r.profile.employeeId||r.profile.email)===key);if(idx>=0)registry[idx]=record;else registry.push(record);localStorage.setItem(REGISTRY_KEY,JSON.stringify(registry));renderRegistryTable();}catch(err){alert('No fue posible importar el expediente: '+err.message);}finally{e.target.value='';}
  }
  function loadRegistry(){try{return JSON.parse(localStorage.getItem(REGISTRY_KEY))||[];}catch{return[];}}
  function renderRegistryTable(){const root=$('#registryTable');if(!root)return;const registry=loadRegistry();if(!registry.length){root.innerHTML='<p class="muted">No hay expedientes importados.</p>';return;}root.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Empleado</th><th>Nombre</th><th>Mesa</th><th>Avance</th><th>Actualización</th></tr></thead><tbody>${registry.map(r=>{const passed=COURSE_MODULES.filter(m=>r.modules?.[m.id]?.passed).length;return `<tr><td>${esc(r.profile.employeeId||'')}</td><td>${esc(r.profile.fullName||'')}</td><td>${esc(r.profile.mesa||'')}</td><td>${passed}/${COURSE_MODULES.length}</td><td>${formatDate(r.updatedAt)}</td></tr>`;}).join('')}</tbody></table></div>`;}
  function exportRegistry(){const registry=loadRegistry();if(!registry.length){alert('No hay expedientes importados.');return;}const rows=[['Empleado','Nombre','Correo','Área','Mesa','Rol','Módulos aprobados','Porcentaje','Folio','Actualización']];registry.forEach(r=>{const passed=COURSE_MODULES.filter(m=>r.modules?.[m.id]?.passed).length;rows.push([r.profile.employeeId,r.profile.fullName,r.profile.email,r.profile.area,r.profile.mesa,r.profile.role,passed,Math.round(passed/COURSE_MODULES.length*100),r.certificateId||'',r.updatedAt]);});download('padron_devsecops.csv',toCsv(rows),'text/csv;charset=utf-8');}

  async function sha256(file){const buf=await file.arrayBuffer();const hash=await crypto.subtle.digest('SHA-256',buf);return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');}
  function fileDescription(f){return `${esc(f.name)} · ${Math.round(f.size/1024)} KB · SHA-256 ${f.sha256.slice(0,16)}…`;}
  function createCertificateId(){const seed=`${state.profile?.employeeId||'NA'}-${Date.now()}`;let h=2166136261;for(let i=0;i<seed.length;i++){h^=seed.charCodeAt(i);h=Math.imul(h,16777619);}return `DEIDT-DSO-${new Date().getFullYear()}-${(h>>>0).toString(16).toUpperCase().padStart(8,'0')}`;}
  function toCsv(rows){return '\ufeff'+rows.map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\r\n');}
  function download(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function formatDate(v){if(!v)return'—';try{return new Intl.DateTimeFormat('es-MX',{dateStyle:'medium',timeStyle:'short'}).format(new Date(v));}catch{return v;}}
  function safeName(v){return String(v).replace(/[^a-z0-9_-]+/gi,'_');}
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
})();

/* Copyright 2026 Daisosha. */
'use strict';
(() => {
  const $ = id => document.getElementById(id), C = window.PilotCore, key = 'daisosha-public-pilot-v1';
  const ja = {title:'AI試行計画ノート',lead:'「導入した」から、「仕事に役立つ」を確かめる4週間へ。',intro:'誰が何を試し、何を確認するか。計画と実測を並べて、次の判断に使えるノートをつくります。',badge1:'登録不要',badge2:'日英切替',badge3:'端末内で編集',privacyHead:'このノートの使い方',privacy:'AIに入力を送信する機能はありません。保存を有効にすると、このブラウザーに記録します。共有端末では保存せず、氏名・相談内容・業務の秘密は入力しないでください。実データではなく、案件名を置き換えた記録がおすすめです。',sample:'架空の記入例を見る',download:'ノートを書き出す（JSON）',import:'JSONを読み込む',print:'印刷 / PDF',persist:'このブラウザーに自動保存する',clear:'ノートを空にする',scope:'試す範囲を決める',project:'試行名',owner:'担当・役割（仮名で可）',goal:'解決したい困りごと・確かめたいこと',boundary:'使えるデータ・使わないデータ・人が確認すること',plan:'4週間の試行計画',planHelp:'各週に小さな作業と確認方法を設定します。週の見出しは例で、必要に応じて内容を変えられます。',trials:'実測を記録する',measureHelp:'同程度の作業で比較してください。AI利用時は準備・作業・確認をすべて分で記録します。空欄は未計測として集計から除外し、0分とは区別します。',add:'記録を追加',csv:'記録をCSVで書き出す',summary:'次の判断に使う',caution:'これは入力値の単純集計です。削減時間だけで成果を判断せず、仕上がりの品質、やり直し、確認する人の負担も振り返ってください。AIの性能・導入効果を保証する値ではありません。',next:'続ける / 範囲を変える / いったん止める。判断の理由と次に試すことを、4週目の確認欄に残しましょう。',closing:'小さな試行から、使える仕組みへ。',closingCopy:'業務の整理、試作品、Web実装まで。大創社は目的と確認方法を一緒に設計します。',guide:'1か月の進め方を読む',contact:'制作・導入を相談する',footer:'公開デモ。顧客データ・機密コード・特許出願資料を含みません。',week:['対象を選ぶ','小さく試す','方法を調整する','続け方を決める'],action:'試すこと',evidence:'確認する成果・判断の理由',date:'実施日',task:'作業名',baseline:'従来の作業（分）',prepare:'AIの準備（分）',work:'AIを使う作業（分）',review:'確認・修正（分）',quality:'品質の確認',note:'気づき・比較条件',unchecked:'未確認',accepted:'確認済み・許容範囲',rework:'再作業が必要',remove:'この記録を削除',trial:'記録',complete:'集計対象 / 全記録',baseTotal:'従来の合計（分）',actualTotal:'準備＋作業＋確認（分）',difference:'差分（分）',qualitySummary:'品質確認済み・許容範囲：',incomplete:'時間未入力のため対象外：',empty:'まだ実測がありません。記録を追加すると集計します。',unsaved:'この画面だけで編集中。必要なら書き出してください。',saved:'このブラウザーに保存しました。',saveError:'ブラウザー保存が使えません。JSONで書き出してください。',loaded:'ノートを読み込みました。',invalid:'読み込めません。対応するJSON形式・入力値・1MB以内の容量をご確認ください。',replaced:'現在のノートを置き換えます。必要なら先に書き出してください。続けますか？',sampleLoaded:'架空の記入例を表示しています。実際の顧客事例・効果ではありません。',cleared:'ノートを空にしました。ブラウザー内の保存も解除しました。',invalidNumber:'時間は0〜100000分の数値を入力してください。',readError:'保存記録を読み込めませんでした。新しいノートを表示しています。',limit:'最大200件です。',exported:'ファイルを書き出しました。保管先・共有先を確認してください。',removed:'記録を削除しました。',deleteConfirm:'この記録を削除しますか？'};
  const en = {title:'AI Pilot Planner',lead:'Four weeks to find out where AI helps your work.',intro:'Choose an owner, a small task and evidence to check. Keep the plan and measurements together for a clearer next decision.',badge1:'No account',badge2:'Japanese / English',badge3:'Edit on your device',privacyHead:'Before you begin',privacy:'This app does not send your entries to an AI. Optional saving keeps your note in this browser. Do not save on shared devices or enter names, counseling details or business secrets. Use neutral project labels.',sample:'Load fictional example',download:'Export note (JSON)',import:'Import JSON',print:'Print / PDF',persist:'Save automatically in this browser',clear:'Clear this note',scope:'Set the scope',project:'Pilot name',owner:'Owner / role (alias is fine)',goal:'Problem and question to investigate',boundary:'Allowed data, excluded data and human checks',plan:'Four-week plan',planHelp:'Choose a small action and a check for each week. The week titles are suggestions; adapt the entries to your situation.',trials:'Record observations',measureHelp:'Compare similar tasks. Enter preparation, work and review in minutes. Blank fields are unmeasured and excluded from totals; they are not zero.',add:'Add observation',csv:'Export observations (CSV)',summary:'Make the next decision',caution:'These are simple totals of your inputs. Consider output quality, rework and reviewer effort alongside time. The figures are not a guarantee of AI performance or business impact.',next:'Continue / change the scope / pause. Record your reasoning and next experiment in the Week 4 evidence field.',closing:'From a small pilot to a useful workflow.',closingCopy:'Daisosha helps clarify work, build prototypes and implement websites, with shared goals and checks.',guide:'Read the four-week guide',contact:'Discuss a project',footer:'Public demo. No client data, confidential code or patent application materials.',week:['Choose a task','Run a small trial','Adjust the approach','Decide what comes next'],action:'Action',evidence:'Evidence and decision rationale',date:'Date',task:'Task label',baseline:'Usual work (min)',prepare:'AI preparation (min)',work:'Work with AI (min)',review:'Review / corrections (min)',quality:'Quality check',note:'Observations / comparison conditions',unchecked:'Not checked',accepted:'Checked and acceptable',rework:'Rework needed',remove:'Delete observation',trial:'Observation',complete:'Included / all observations',baseTotal:'Usual total (min)',actualTotal:'Preparation + work + review (min)',difference:'Difference (min)',qualitySummary:'Checked and acceptable: ',incomplete:'Excluded for missing time: ',empty:'No measurements yet. Add an observation to begin.',unsaved:'Editing in this page only. Export to keep a copy.',saved:'Saved in this browser.',saveError:'Browser storage is unavailable. Export a JSON copy.',loaded:'Note imported.',invalid:'Cannot import. Check the JSON format, values and 1 MB file limit.',replaced:'Replace the current note? Export a copy first if you need it.',sampleLoaded:'Fictional example. These are not client results or evidence of effectiveness.',cleared:'Note cleared and browser saving disabled.',invalidNumber:'Enter a number from 0 to 100000 minutes.',readError:'Stored note could not be read. A blank note is shown.',limit:'Maximum 200 observations.',exported:'File exported. Check where you store or share it.',removed:'Observation deleted.',deleteConfirm:'Delete this observation?'};
  let model = C.blank(), saving = false;
  const tr = () => model.language === 'en' ? en : ja;
  const announce = msg => { $('status').textContent = msg; };
  const el = (tag, txt, cls) => { const n = document.createElement(tag); if (txt !== undefined) n.textContent = txt; if (cls) n.className = cls; return n; };
  function ask(message) {
    return new Promise(resolve=>{
      const dialog=el('dialog'),p=el('p',message),actions=el('div',undefined,'toolbar'),cancel=el('button',model.language==='en'?'Cancel':'戻る'),ok=el('button',model.language==='en'?'Continue':'続ける');
      const previous=document.activeElement;dialog.setAttribute('aria-label',model.language==='en'?'Confirm replacement':'変更の確認');
      const done=value=>{dialog.close();dialog.remove();previous?.focus();resolve(value);};
      cancel.type=ok.type='button';cancel.addEventListener('click',()=>done(false));ok.addEventListener('click',()=>done(true));dialog.addEventListener('cancel',e=>{e.preventDefault();done(false);});
      actions.append(cancel,ok);dialog.append(p,actions);document.body.append(dialog);dialog.showModal();cancel.focus();
    });
  }
  function persist() {
    if (saving) { try { localStorage.setItem(key, JSON.stringify(model)); announce(tr().saved); } catch { saving=false; $('persist').checked=false; announce(tr().saveError); } }
    else announce(tr().unsaved);
  }
  function field(parent, label, value, change, opts={}) {
    const wrap=el('label', undefined, opts.cls), span=el('span',label), input=el(opts.area?'textarea':'input');
    if (!opts.area) input.type=opts.type||'text';
    input.value=value; input.autocomplete='off';
    if (input.type==='number') {input.min='0';input.max='100000';input.step='any';} else input.maxLength=opts.max||2000;
    if(opts.area) input.rows=2;
    input.addEventListener('input',()=>{
      if(!input.checkValidity()){if(input.type==='number'){change('');totals();}announce(tr().invalidNumber);return;}
      change(input.type==='number'?(input.value===''?'':Number(input.value)):input.value);persist();totals();
    });
    wrap.append(span,input);parent.append(wrap);return input;
  }
  function totals(){
    const t=tr(),s=C.summarize(model.trials),box=$('totals');box.replaceChildren();
    for(const [label,value] of [[t.complete,`${s.count} / ${model.trials.length}`],[t.baseTotal,s.baseline],[t.actualTotal,s.actual],[t.difference,s.count?s.difference:'—']]){const n=el('div',undefined,'metric');n.append(el('span',label),el('strong',typeof value==='number'?new Intl.NumberFormat(model.language,{maximumFractionDigits:2}).format(value):value));box.append(n);}
    const p=el('p',s.count?`${t.qualitySummary}${s.accepted} / ${s.count} · ${t.incomplete}${s.incomplete}`:t.empty);p.style.gridColumn='1 / -1';box.append(p);
  }
  function render(){
    const t=tr();document.documentElement.lang=model.language;document.title=t.title+' | Daisosha';document.querySelectorAll('[data-i]').forEach(n=>{n.textContent=t[n.dataset.i];});$('language').value=model.language;$('persist').checked=saving;
    $('guideLink').href='https://daisosha.com/'+(model.language==='en'?'en/':'')+'ai-adoption-first-month.html';$('contactLink').href='https://daisosha.com/contact.php?lang='+model.language;
    for(const [id,k] of [['project','title'],['owner','owner'],['goal','goal'],['boundary','boundary']])$(''+id).value=model[k];
    $('weeks').replaceChildren();model.weeks.forEach((w,i)=>{const card=el('div',undefined,'week');card.append(el('h3',`WEEK ${i+1} · ${t.week[i]}`));field(card,t.action,w.action,v=>w.action=v,{area:true});field(card,t.owner,w.owner,v=>w.owner=v);field(card,t.evidence,w.evidence,v=>w.evidence=v,{area:true});$('weeks').append(card);});
    $('trialList').replaceChildren();model.trials.forEach((r,i)=>{
      const card=el('article',undefined,'trial'),top=el('div',undefined,'trial-top'),remove=el('button',t.remove);remove.type='button';remove.addEventListener('click',async()=>{if(!await ask(t.deleteConfirm))return;model.trials.splice(i,1);render();persist();announce(t.removed);$('add').focus();});top.append(el('h3',`${t.trial} ${i+1}`),remove);card.append(top);const inputs=el('div',undefined,'trial-fields');
      field(inputs,t.date,r.date,v=>r.date=v,{type:'date',cls:'wide'});field(inputs,t.task,r.task,v=>r.task=v,{max:200,cls:'wide'});
      for(const k of ['baseline','prepare','work','review'])field(inputs,t[k],r[k],v=>r[k]=v,{type:'number'});
      const label=el('label',undefined,'wide'),select=el('select');label.append(el('span',t.quality));for(const k of ['unchecked','accepted','rework']){const option=el('option',t[k]);option.value=k;select.append(option);}select.value=r.quality;select.addEventListener('change',()=>{r.quality=select.value;persist();totals();});label.append(select);inputs.append(label);field(inputs,t.note,r.note,v=>r.note=v,{area:true,cls:'full'});card.append(inputs);$('trialList').append(card);
    });$('add').disabled=model.trials.length>=200;totals();
  }
  for(const [id,k] of [['project','title'],['owner','owner'],['goal','goal'],['boundary','boundary']])$(id).addEventListener('input',e=>{model[k]=e.target.value;persist();});
  $('language').addEventListener('change',e=>{model.language=e.target.value;render();persist();});
  $('persist').addEventListener('change',e=>{saving=e.target.checked;if(!saving){try{localStorage.removeItem(key);}catch{announce(tr().saveError);return;}}persist();});
  $('add').addEventListener('click',()=>{if(model.trials.length>=200){announce(tr().limit);return;}model.trials.push({date:'',task:'',baseline:'',prepare:'',work:'',review:'',quality:'unchecked',note:''});render();persist();$('trialList').lastElementChild.querySelector('input').focus();});
  function blobDownload(body,type,name){const url=URL.createObjectURL(new Blob([body],{type})),a=el('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);announce(tr().exported);}
  function valid(){const bad=document.querySelector('input:invalid');if(bad){bad.reportValidity();return false;}try{C.validate(model);return true;}catch{announce(tr().invalid);return false;}}
  $('download').addEventListener('click',()=>{if(valid())blobDownload(JSON.stringify(model,null,2),'application/json','ai-pilot-note.json');});
  $('csv').addEventListener('click',()=>{if(valid())blobDownload(C.csv(model.trials),'text/csv;charset=utf-8','ai-pilot-observations.csv');});
  $('print').addEventListener('click',()=>{if(valid())window.print();});
  window.addEventListener('beforeprint',()=>document.querySelectorAll('textarea').forEach(n=>{n.style.height='auto';n.style.height=n.scrollHeight+8+'px';}));
  window.addEventListener('afterprint',()=>document.querySelectorAll('textarea').forEach(n=>{n.style.height='';}));
  $('clear').addEventListener('click',async()=>{if(!await ask(tr().replaced))return;try{localStorage.removeItem(key);}catch{announce(tr().saveError);return;}const language=model.language;model=C.blank();model.language=language;saving=false;render();announce(tr().cleared);});
  $('import').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>1024*1024)throw new Error('size');const next=C.validate(JSON.parse(await f.text()));if(!await ask(tr().replaced))return;model=next;render();persist();announce(tr().loaded);}catch{announce(tr().invalid);}finally{e.target.value='';}});
  $('sample').addEventListener('click',async()=>{
    if(!await ask(tr().replaced))return;const language=model.language;model=C.blank();model.language=language;const english=language==='en';
    model.title=english?'Fictional example: meeting summary draft':'架空例：会議メモの下書き';model.owner=english?'Pilot lead A':'試行担当A';model.goal=english?'Can a draft reduce total effort without losing action items?':'決定事項を落とさず、準備と確認も含めた負担を減らせるか。';model.boundary=english?'Use invented meeting notes only. A person checks facts and omissions.':'架空の会議メモだけを使用。事実関係・抜け漏れは人が確認。';
    const actions=english?['Choose one repeatable task and record usual effort.','Try two drafts using invented notes.','Review omissions and adjust instructions.','Compare effort and quality; decide whether to continue.']:['一つの定型作業を選び、普段の所要時間を記録。','架空のメモで下書きを2回試す。','抜け漏れを確認し、指示を調整。','時間と品質を比較し、継続の可否を決める。'];
    model.weeks.forEach((w,i)=>{w.action=actions[i];w.owner=english?'Pilot lead A':'試行担当A';w.evidence=english?'Record observations, including unsuccessful attempts.':'うまくいかなかった試行も含めて記録する。';});
    model.trials=[{date:'',task:english?'Fictional trial A':'架空試行A',baseline:30,prepare:8,work:5,review:22,quality:'rework',note:english?'One action item missing; correction included.':'決定事項に漏れ。修正時間を含めた。'},{date:'',task:english?'Fictional trial B':'架空試行B',baseline:30,prepare:5,work:5,review:12,quality:'accepted',note:english?'Check confirmed all required items.':'必要項目を確認できた。'}];render();persist();announce(tr().sampleLoaded);
  });
  let loadError=false;try{const raw=localStorage.getItem(key);if(raw){model=C.validate(JSON.parse(raw));saving=true;}}catch{loadError=true;}
  const requestedLanguage=new URLSearchParams(location.search).get('lang');if(['ja','en'].includes(requestedLanguage))model.language=requestedLanguage;
  render();announce(loadError?tr().readError:saving?tr().saved:tr().unsaved);
})();

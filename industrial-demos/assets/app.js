(()=>{'use strict';
const R=window.AustiveRules, $=id=>document.getElementById(id);
const iso=(offset=0)=>{const d=new Date();d.setDate(d.getDate()+offset);return d.toISOString().slice(0,10)};
const sample={
 production:[
 {id:'SH-101',date:iso(-2),shift:'Early A',planned:150,actual:145,rejected:3,dispatched:130},
 {id:'SH-102',date:iso(-2),shift:'Late B',planned:140,actual:134,rejected:6,dispatched:125},
 {id:'SH-103',date:iso(-1),shift:'Early A',planned:160,actual:172,rejected:4,dispatched:165},
 {id:'SH-104',date:iso(-1),shift:'Late B',planned:155,actual:148,rejected:7,dispatched:146}
 ],
 maintenance:[
 {id:'WO-201',asset:'Conveyor CV-01',due:iso(-3),runningHours:2070,serviceAtHours:2000,criticality:3,status:'Open'},
 {id:'WO-202',asset:'Generator G-04',due:iso(3),runningHours:975,serviceAtHours:1000,criticality:3,status:'In progress'},
 {id:'WO-203',asset:'Truck TR-07',due:iso(12),runningHours:810,serviceAtHours:1000,criticality:2,status:'Open'},
 {id:'WO-204',asset:'Pump P-09',due:iso(-2),runningHours:1220,serviceAtHours:1200,criticality:2,status:'Closed'}
 ],
 fleet:[
 {id:'TR-301',vehicle:'VH-12',route:'Depot → Site A',capacity:28,load:24,plannedArrival:iso(-1)+'T13:00',actualArrival:iso(-1)+'T12:40',status:'Delivered'},
 {id:'TR-302',vehicle:'VH-15',route:'Plant → Yard',capacity:20,load:19,plannedArrival:iso(-1)+'T16:00',actualArrival:iso(-1)+'T18:30',status:'Delivered'},
 {id:'TR-303',vehicle:'VH-09',route:'Mill → Warehouse',capacity:32,load:25,plannedArrival:iso(1)+'T15:00',actualArrival:'',status:'In transit'},
 {id:'TR-304',vehicle:'VH-21',route:'Yard → Depot C',capacity:22,load:24,plannedArrival:iso(1)+'T11:00',actualArrival:'',status:'Planned'}
 ]};
// Synthetic prospect-specific scenarios. These are illustrative fictional records, not customer data.
const profileParam=new URLSearchParams(window.location.search).get('profile');
const profile=['nd','united','raubex'].includes(profileParam)?profileParam:null;
const profileLabels={nd:'Fabrication workshop illustration',united:'Distribution dispatch illustration',raubex:'Road surfacing production illustration'};
const scenarios={
nd:{maintenance:[
{id:'FAB-401',asset:'Workshop overhead hoist',due:iso(6),runningHours:960,serviceAtHours:1000,criticality:3,status:'Open'},
{id:'FAB-402',asset:'Fabrication compressor',due:iso(-1),runningHours:1080,serviceAtHours:1050,criticality:2,status:'Open'},
{id:'FAB-403',asset:'Welding bay power unit',due:iso(15),runningHours:380,serviceAtHours:500,criticality:2,status:'In progress'}
]},
united:{fleet:[
{id:'DIST-501',vehicle:'FLEET-12',route:'Keystone depot → Retail DC',capacity:24,load:20,plannedArrival:iso(-1)+'T11:00',actualArrival:iso(-1)+'T10:45',status:'Delivered'},
{id:'DIST-502',vehicle:'FLEET-18',route:'Port → Warehouse',capacity:28,load:25,plannedArrival:iso(-1)+'T15:00',actualArrival:iso(-1)+'T16:40',status:'Delivered'},
{id:'DIST-503',vehicle:'FLEET-08',route:'Warehouse → Distribution hub',capacity:20,load:18,plannedArrival:iso(1)+'T13:00',actualArrival:'',status:'In transit'}
]},
raubex:{production:[
{id:'ROAD-601',date:iso(-2),shift:'Roadworks early',planned:180,actual:170,rejected:5,dispatched:162},
{id:'ROAD-602',date:iso(-1),shift:'Surfacing late',planned:145,actual:151,rejected:3,dispatched:140},
{id:'ROAD-603',date:iso(0),shift:'Rehabilitation early',planned:165,actual:160,rejected:4,dispatched:154}
]}}
;
const configs={
 production:{name:'Production & dispatch',intro:'Monitor shift plans, output quality, and dispatch reconciliation across sample shifts.',chart:'Planned vs actual production',sub:'Tonnes per shift · fictional operating records',table:'Production shift records',
 fields:[['id','Shift reference','text'],['date','Shift date','date'],['shift','Shift name','text'],['planned','Planned production (t)','number'],['actual','Actual production (t)','number'],['rejected','Rejected output (t)','number'],['dispatched','Dispatched output (t)','number']],
 cols:[['Shift','id'],['Date','date'],['Shift','shift'],['Plan (t)','planned'],['Actual (t)','actual'],['Accepted (t)','accepted'],['Variance','variance'],['Review','review']],
 method:'Accepted output = actual minus rejected. Production variance = actual minus planned (tonnes and %). Dispatch reconciliation compares same-shift dispatched tonnes with accepted output, not inventory across shifts. A negative production variance or dispatch above accepted output is flagged for review. These are illustrative accounting rules, not plant optimisation or process-control algorithms.'},
 maintenance:{name:'Asset maintenance',intro:'Review work orders, service dates and running-hour thresholds.',chart:'Service hours vs current meter',sub:'Illustrative asset meter values',table:'Maintenance work orders',
 fields:[['id','Work order','text'],['asset','Asset name','text'],['due','Service due','date'],['runningHours','Current running hours','number'],['serviceAtHours','Service at running hours','number'],['criticality','Business criticality (1–3)','number'],['status','Work order status','select',['Open','In progress','Closed']]],
 cols:[['Work order','id'],['Asset','asset'],['Service due','due'],['Meter (h)','runningHours'],['Next service (h)','serviceAtHours'],['Priority score','score'],['Review','review']],
 method:'Overdue is true for an open work order when either its calendar service date or running-hour threshold has passed. Illustrative attention score = 2 × criticality (1–3), plus 4 if overdue (or 2 if due within 7 days), plus 3 if the meter exceeds the service threshold (or 1 if within 50 hours). Closed work orders are reported closed. This is a demonstration score, not a safety or maintenance-engineering determination.'},
 fleet:{name:'Fleet intelligence',intro:'Review transport load utilisation, scheduled arrivals and delivery exceptions.',chart:'Load vs vehicle capacity',sub:'Tonnes per trip · illustrative routing records',table:'Trip and delivery records',
 fields:[['id','Trip reference','text'],['vehicle','Vehicle ID','text'],['route','Route','text'],['capacity','Nominal capacity (t)','number'],['load','Planned load (t)','number'],['plannedArrival','Planned arrival','datetime-local'],['actualArrival','Actual arrival (optional)','datetime-local'],['status','Delivery status','select',['Planned','In transit','Delivered','Exception']]],
 cols:[['Trip','id'],['Vehicle','vehicle'],['Route','route'],['Load / cap','capacityDisplay'],['Utilisation','utilization'],['Delay','delay'],['Review','review']],
 method:'Load utilisation = planned load ÷ nominal capacity × 100. Loads exceeding the example capacity are flagged for review; this does not determine legal or safe loading limits. Delivery variance = actual arrival minus scheduled arrival in hours. Only completed deliveries with both timestamps are classified on time or late. No GPS, route optimisation or traffic data is connected.'}
};
let view='production', rows=[], editIndex=null;
function clone(x){return JSON.parse(JSON.stringify(x))}
function storeKey(){return 'austive-industrial-lab-v2-'+(profile||'generic')+'-'+view}
function load(){try{const data=JSON.parse(localStorage.getItem(storeKey()));return Array.isArray(data)?data:clone((scenarios[profile]&&scenarios[profile][view])||sample[view])}catch(_){return clone((scenarios[profile]&&scenarios[profile][view])||sample[view])}}
function persist(){try{localStorage.setItem(storeKey(),JSON.stringify(rows))}catch(_){/* available without persistence */}}
function num(v){return Number(v)||0}
function round(v){return R.round(v,1)}
function fmt(v){return v===null||v===undefined?'—':String(v)}
function escapeHTML(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function derive(row){let r=clone(row),out;
 if(view==='production'){out=R.operations(r);Object.assign(r,out);r.review=r.dispatched>out.accepted?'Reconcile dispatch':out.variance<0?'Below plan':'On track'}
 if(view==='maintenance'){out=R.maintenance(r);Object.assign(r,out);r.review=out.attention}
 if(view==='fleet'){out=R.fleet(r);Object.assign(r,out);r.capacityDisplay=r.load+' / '+r.capacity+' t';r.utilization=out.utilization===null?'—':out.utilization+'%';r.delay=out.delayHours===null?'—':out.delayHours+' h';r.review=out.status}
 return r;}
function summary(){const count=rows.length;let metrics,insights,chartData;
 if(view==='production'){
 const planned=rows.reduce((a,r)=>a+num(r.planned),0),actual=rows.reduce((a,r)=>a+num(r.actual),0),accepted=rows.reduce((a,r)=>a+R.operations(r).accepted,0),dispatched=rows.reduce((a,r)=>a+num(r.dispatched),0);
 const flagged=rows.filter(r=>derive(r).review!=='On track').length;
 metrics=[['Actual production',round(actual)+' t','Across '+count+' shifts'],['Plan achievement',planned?round(actual/planned*100)+'%':'—','Actual ÷ planned'],['Accepted output',round(accepted)+' t','After rejected output'],['Flagged records',flagged,'Variance or reconciliation']];
 insights=[['Dispatch ledger',round(dispatched)+' tonnes dispatched; accepted output '+round(accepted)+' tonnes.','normal'],['Variance',round(actual-planned)+' tonnes versus aggregate planned production.','normal'],['Shift review',flagged+' of '+count+' shifts need an illustrative review.',flagged?'warn':'normal']];
 chartData=rows.slice(0,6).map(r=>({name:r.id,a:num(r.planned),b:num(r.actual)}));
 }else if(view==='maintenance'){
 const processed=rows.map(derive),overdue=processed.filter(r=>r.overdue).length,open=rows.filter(r=>r.status!=='Closed').length,high=processed.filter(r=>r.score>=7&&r.status!=='Closed').length;
 metrics=[['Work orders',count,'Illustrative asset records'],['Open / in progress',open,'Not yet closed'],['Overdue service',overdue,'Date or meter exceeded'],['Priority attention',high,'Score 7 or higher']];
 insights=[['Overdue work',overdue+' open work orders exceed at least one example threshold.',overdue?'danger':'normal'],['Priority queue',high+' open work orders meet the illustrative score threshold.',high?'warn':'normal'],['Scheduling','Calendar and running-hour conditions both contribute to the review.','normal']];
 chartData=rows.slice(0,6).map(r=>({name:r.id,a:num(r.serviceAtHours),b:num(r.runningHours)}));
 }else{
 const evaluated=rows.map(derive),delivered=rows.filter(r=>r.status==='Delivered').length,late=evaluated.filter(r=>r.status==='Late delivery').length,capacity=evaluated.filter(r=>r.overCapacity).length;
 const ratio=rows.reduce((a,r)=>a+num(r.load),0),cap=rows.reduce((a,r)=>a+num(r.capacity),0);
 metrics=[['Trips',count,'Current sample records'],['Delivered',delivered,'Marked completed'],['Load utilisation',cap?round(ratio/cap*100)+'%':'—','Weighted by capacity'],['Review flags',late+capacity,'Late or over capacity']];
 insights=[['Capacity exceptions',capacity+' trip(s) exceed declared demonstration capacity.',capacity?'danger':'normal'],['Delivery variance',late+' completed trip(s) arrive after the scheduled timestamp.',late?'warn':'normal'],['Evidence limit','No ETA calculation without actual arrival; route times are example entries.','normal']];
 chartData=rows.slice(0,6).map(r=>({name:r.id,a:num(r.capacity),b:num(r.load)}));
 }
 return {metrics,insights,chartData};}
function plot(data){const max=Math.max(1,...data.flatMap(d=>[d.a,d.b]));$('chart').innerHTML=data.length?data.map(d=>'<div class="bar-group"><div class="bar-pair"><div class="bar plan" style="height:'+Math.max(2,d.a/max*170)+'px" title="Reference '+escapeHTML(d.a)+'"></div><div class="bar actual" style="height:'+Math.max(2,d.b/max*170)+'px" title="Observed '+escapeHTML(d.b)+'"></div></div><label>'+escapeHTML(d.name)+'</label></div>').join(''):'<p>No records to chart.</p>';}
function render(){
 const cfg=configs[view];const q=$('search').value.toLowerCase().trim();const s=summary();
 $('metrics').innerHTML=s.metrics.map(([label,value,note])=>'<div class="metric"><small>'+escapeHTML(label)+'</small><strong>'+escapeHTML(value)+'</strong><span class="hint">'+escapeHTML(note)+'</span></div>').join('');
 $('insights').innerHTML=s.insights.map(([label,detail,tone])=>'<div class="insight '+tone+'"><b><span class="dot"></span>'+escapeHTML(label)+'</b><p>'+escapeHTML(detail)+'</p></div>').join('');
 plot(s.chartData);
 $('thead').innerHTML='<tr>'+cfg.cols.map(([label])=>'<th scope="col">'+escapeHTML(label)+'</th>').join('')+'<th scope="col">Action</th></tr>';
 const visible=rows.map((row,i)=>({record:derive(row),i})).filter(({record})=>Object.values(record).some(v=>String(v).toLowerCase().includes(q)));
 $('tbody').innerHTML=visible.length?visible.map(({record,i})=>'<tr>'+cfg.cols.map(([,key])=>{const val=record[key];const isStatus=key==='review';const tone=/overdue|capacity review|reconcile|late|priority|below plan|exception/i.test(String(val))?' danger':/scheduled|in transit/i.test(String(val))?' warn':'';return '<td>'+(isStatus?'<span class="chip'+tone+'">'+escapeHTML(fmt(val))+'</span>':escapeHTML(fmt(val)))+'</td>'}).join('')+'<td><button type="button" class="edit" data-edit="'+i+'">Edit</button></td></tr>').join(''):'<tr><td colspan="'+(cfg.cols.length+1)+'">No matching records</td></tr>';
 $('count').textContent=visible.length+' of '+rows.length+' records';
}
function choose(name){view=name;rows=load();const c=configs[view];$('title').textContent=c.name;$('subtitle').textContent=(profile?profileLabels[profile]+' · ':'')+c.intro;$('chartTitle').textContent=c.chart;$('chartDesc').textContent=c.sub;$('tableTitle').textContent=c.table;$('methodology').textContent=c.method;$('search').value='';document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-pressed',String(b.dataset.view===view))});render()}
function openEditor(i){editIndex=i;const c=configs[view],source=i===null?null:rows[i];$('dialogTitle').textContent=i===null?'New '+view+' record':'Edit '+source.id;$('formError').textContent='';
 $('fields').innerHTML=c.fields.map(([key,label,type,options])=>'<label>'+escapeHTML(label)+(type==='select'?'<select name="'+escapeHTML(key)+'">'+options.map(o=>'<option value="'+escapeHTML(o)+'" '+(source&&source[key]===o?'selected':'')+'>'+escapeHTML(o)+'</option>').join('')+'</select>':'<input name="'+escapeHTML(key)+'" type="'+type+'" '+(type==='number'?'step="any" min="0"':'')+' '+(key==='actualArrival'?'':'required')+' value="'+escapeHTML(source?source[key]:type==='date'?iso():type==='datetime-local'?'':'')+'">')+'</label>').join('');$('editor').showModal()}
$('recordForm').addEventListener('submit',e=>{e.preventDefault();const cfg=configs[view],data=new FormData(e.currentTarget),record={};for(const [key,,type] of cfg.fields){const v=String(data.get(key)||'').trim();if(!v&&key!=='actualArrival'){$('formError').textContent='Complete all required fields.';return}record[key]=type==='number'?Number(v):v;if(type==='number'&&(!Number.isFinite(record[key])||record[key]<0)){$('formError').textContent='Numeric fields must be non-negative numbers.';return}}
 if(view==='production'&&record.rejected>record.actual){$('formError').textContent='Rejected output cannot exceed actual production.';return}
 if(view==='maintenance'&&(!Number.isInteger(record.criticality)||record.criticality<1||record.criticality>3)){$('formError').textContent='Criticality must be 1, 2 or 3.';return}
 if(view==='fleet'&&record.capacity<=0){$('formError').textContent='Nominal capacity must be greater than zero.';return}
 if(view==='fleet'&&record.status==='Delivered'&&!record.actualArrival){$('formError').textContent='A delivered trip needs an actual arrival timestamp.';return}
 if(rows.some((r,i)=>r.id.toLowerCase()===record.id.toLowerCase()&&i!==editIndex)){$('formError').textContent='This reference already exists in the current demo.';return}
 if(editIndex===null)rows.unshift(record);else rows[editIndex]=record;persist();$('editor').close();render()});
$('close').addEventListener('click',()=>$('editor').close());$('cancel').addEventListener('click',()=>$('editor').close());
$('add').addEventListener('click',()=>openEditor(null));$('tbody').addEventListener('click',e=>{const b=e.target.closest('[data-edit]');if(b)openEditor(Number(b.dataset.edit))});
$('search').addEventListener('input',render);document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.view)));
$('reset').addEventListener('click',()=>{if(!confirm('Restore fictional sample records for this demonstration?'))return;rows=clone((scenarios[profile]&&scenarios[profile][view])||sample[view]);persist();$('search').value='';render()});
$('export').addEventListener('click',()=>{const cfg=configs[view],keys=cfg.fields.map(f=>f[0]);const csv=[keys,...rows.map(r=>keys.map(k=>r[k]))].map(row=>row.map(x=>'"'+String(x??'').replaceAll('"','""')+'"').join(',')).join('\r\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='austive-'+view+'-synthetic-demo.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)});
$('year').textContent=new Date().getFullYear();choose(['production','maintenance','fleet'].includes(new URLSearchParams(window.location.search).get('view'))?new URLSearchParams(window.location.search).get('view'):'production');
})();
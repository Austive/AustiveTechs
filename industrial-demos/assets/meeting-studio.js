(() => {
"use strict";
const $=id=>document.getElementById(id);
const profiles={
national:{
 name:"National Asphalt — Cliffdale",source:"https://nationalasphalt.co.za/",sourceLabel:"National Asphalt official website",
 context:"National Asphalt publicly documents fixed and mobile asphalt manufacturing, hot/warm/cold mix products, laboratory testing and a Cliffdale operation. Its 2026 Cliffdale plant-manager recruitment highlights safety, quality, production efficiency, profitability and continuous improvement. These facts do not establish any technology deficiency.",
 focus:[["Production-to-dispatch","Ask what shift, product, weighbridge, delivery and customer records must reconcile."],["Quality records","Ask how approved mix design, test certificates and batch documentation are located and shared."],["Management reporting","Ask how production, yield, maintenance and customer fulfilment are summarised."]],
 questions:["What operational reports are most useful to your Cliffdale plant and regional management teams?","How do you reconcile planned production, actual tonnage, rejected material and dispatched orders today?","Which product, mix and laboratory identifiers are captured by existing systems, and which are shared with customers?","Are delivery confirmation, invoicing and production records already connected?","What existing tools work well, and where do manual reconciliations still occur, if anywhere?","What efficiency, customer service or sustainability initiatives are prioritised for the next twelve months?","Which data owner and procurement team would approve a small reporting-only pilot?"],
 pitch:"If they confirm a reporting challenge, demonstrate fictional asphalt shift and dispatch records. Show variance and reconciliation flags, then discuss their actual mix identifiers, QA approvals and stock boundaries. Do not simulate real asphalt control logic, temperatures or mix-design compliance.",
 demos:[["Asphalt production and dispatch","production"],["Maintenance work orders","maintenance"]]
},
npc:{
 name:"NPC — Sterkspruit plant",source:"https://npc.co.za/our-plants-page/",sourceLabel:"NPC Sterkspruit plant overview",
 context:"NPC (Natal Portland Cement), part of Huaxin Building Materials Group, confirms a Sterkspruit concrete batching facility and nearby aggregate quarry serving the western Durban construction market. 'NPC' here is a cement/concrete producer's name; confirm the meeting entity and site.",
 focus:[["Batch-and-delivery documentation","Ask how orders, batch tickets, delivery notes and customer confirmations align."],["Aggregate and concrete reports","Ask how daily quantities and supporting quality records are reconciled."],["Future capacity","Ask which reporting or dispatch workflows could support planned market growth."]],
 questions:["Which part of the Sterkspruit operation will our meeting represent: aggregates, concrete batching, dispatch or management?","How are orders translated into batch and dispatch records in existing systems?","Which steps connect weighbridge or batch tickets to delivery evidence and customer queries?","What reports are already automated, and which require manual interpretation or rework?","How do operations, quality and sales teams share approved documents?","What expansion, sustainability or customer service priorities might affect your digital workflows?","Would an existing-system reporting extension be more useful than a new application? Who approves trials?"],
 pitch:"Show a fictional concrete-and-aggregate shift reconciliation. The existing production dashboard is repurposed as a generic tonnes ledger—not a concrete mix recipe, safety control or quality certification system. If delivery turnaround is the issue, switch to the fleet example.",
 demos:[["Concrete and aggregate reporting","production"],["Fleet and delivery records","fleet"]]
},
raubex:{
 name:"Raubex KZN — Cliffdale",source:"https://raubex.com/roads-and-earthworks/",sourceLabel:"Raubex KZN operations overview",
 context:"Raubex KZN is listed in the Roads and Earthworks division, with road rehabilitation, asphalt surfacing, milling, earthworks, in-situ stabilisation and bitumen-stabilised material services. Its office is listed at 12 Sterkspruit Road, Cliffdale. National Asphalt is in the group's Construction Materials division; clarify separate decision makers.",
 focus:[["Project visibility","Ask how work packages, shifts, material tickets and daily quantities are reviewed."],["Equipment readiness","Ask whether planned maintenance data is available to project coordination teams."],["Cross-division handover","Ask how approved project records move between internal divisions and clients."]],
 questions:["Which project and site-level KPIs are most important to your team?","How do site engineers reconcile daily progress with material dispatch, delivery notes and subcontractor activity?","What reports already come from ERP or project management tools?","Are any approvals, exception follow-ups or end-of-day summaries still manual?","How do maintenance teams provide equipment-availability information to project planners?","What digitalisation, resilience or efficiency goals are planned for upcoming projects?","Does Raubex KZN procurement differ from group-level or National Asphalt procurement?"],
 pitch:"Start with synthetic road-surfacing shift reporting if relevant to the role in the room; switch to asset maintenance if scheduling is their concern. Emphasise compatible reporting and handovers rather than replacing established systems.",
 demos:[["Road project reporting","production"],["Equipment maintenance","maintenance"]]
},
other:{
 name:"Another confirmed contact",source:"",sourceLabel:"",
 context:"The meeting participant must confirm their organisation, activity and process ownership. Start with discovery rather than inferring any software deficiency.",
 focus:[["Process ownership","Clarify the workflow and current systems."],["Value measures","Identify a measurable baseline and success criterion."],["Permissions","Confirm vendor approvals and who can authorise a paid assessment."]],
 questions:["What does your team manage each day?","What reporting or process work consumes the most attention, if any?","Which software is already effective?","What is changing in the next 6–12 months?","What would count as a useful and realistic improvement?","Who owns the data and supplier approval process?","What is the agreed next action after this conversation?"],
 pitch:"Only show a relevant fictional demonstration after the prospect identifies a genuine interest. Otherwise document the discovery conversation and schedule a follow-up.",
 demos:[["Production and dispatch example","production"],["Maintenance example","maintenance"],["Fleet example","fleet"]]
}};
const keys=["day","time","actualCompany","role","workflow","problem","impact","strategy","systems","decision","pilot","next"];
const safe=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let current="national";
const key=()=> "austive-meeting-notes-v2-"+current;
function noteData(){const data={};keys.forEach(k=>data[k]=$(k).value);return data}
function readNotes(){try{return JSON.parse(localStorage.getItem(key())||"{}")}catch(_){return {}}}
function saveNotes(){try{localStorage.setItem(key(),JSON.stringify(noteData()))}catch(_){}}
function restoreNotes(){const data=readNotes();keys.forEach(k=>$(k).value=data[k]||((k==="day")?"Monday 16 Nov 2026":""))}
function showProfile(){
 const p=profiles[current];
 $("context").textContent=p.context;
 $("source").innerHTML=p.source?'<a target="_blank" rel="noopener noreferrer" href="'+safe(p.source)+'">Published company background: '+safe(p.sourceLabel)+" ↗</a>":"Source: meeting participant confirmation required.";
 $("focus").innerHTML=p.focus.map(f=>'<div class="focus-card"><strong>'+safe(f[0])+'</strong><p>'+safe(f[1])+'</p></div>').join("");
 $("questions").innerHTML=p.questions.map(q=>"<li>"+safe(q)+"</li>").join("");
 $("demoPitch").textContent=p.pitch;
 $("demoLinks").innerHTML=p.demos.map(([title,view])=>'<a class="action-link'+(view===p.demos[0][1]?'':' alt')+'" href="./index.html?view='+encodeURIComponent(view)+'&profile='+encodeURIComponent(current)+'" target="_blank" rel="noopener">'+safe(title)+' ↗</a>').join("");
}
$("company").addEventListener("change",e=>{saveNotes();current=e.target.value;showProfile();restoreNotes()});
keys.forEach(k=>$(k).addEventListener("input",saveNotes));
$("download").addEventListener("click",()=>{
 const p=profiles[current], data=noteData();
 const lines=["AUSTIVE TECHNOLOGIES — PROSPECT DISCOVERY NOTES","Generated: "+new Date().toLocaleString("en-ZA"),"Provisional profile: "+p.name,"Record classification: review before sharing","",...keys.flatMap(k=>[k.toUpperCase(),data[k]||"Not reported",""]),"","Follow-up checklist: confirm process owner, data access, procurement, scope and next meeting. Avoid promises until approved."];
 const blob=new Blob([lines.join("\r\n")],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="austive-discovery-"+current+"-"+new Date().toISOString().slice(0,10)+".txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
});
$("clear").addEventListener("click",()=>{if(!confirm("Clear saved notes for this company profile in this browser?"))return;localStorage.removeItem(key());restoreNotes()});
showProfile();restoreNotes();
})();
(() => {
"use strict";
const $=id=>document.getElementById(id);
const profiles={
nd:{
 name:"ND Engineering",source:"https://www.ndengineering.co.za/",sourceLabel:"ND Engineering official site",
 context:"ND Engineering publicly describes its work in steel engineering, fabrication, design, project management and installation of process equipment. This does not establish any unmet systems need.",
 focus:[["Project traceability","Ask how fabrication milestones, inspections and changes are coordinated."],["Equipment and service","Ask how maintenance and workshop work orders are tracked."],["Reporting handovers","Ask how progress and quality records reach clients."]],
 questions:["What type of information must follow a job from quotation through fabrication and installation?","Where do you currently record fabrication progress, inspection status and change approvals?","Are planned versus actual project milestones visible to stakeholders?","How are internal equipment maintenance and service histories maintained?","What could be easier to report to customers without duplicating administrative effort?","Which future initiatives are important for your engineering and project teams?","If useful, who owns the process and approves technology procurement?"],
 pitch:"Start with a short asset maintenance example only if servicing or workshop coordination is relevant. Then ask whether a project-level fabrication tracker would be a better pilot than the existing dashboard.",
 demos:[["Asset maintenance demo","maintenance"],["Production and reporting example","production"]],
},
united:{
 name:"United Distribution & Transport Services",source:"https://www.unitedtransport.co.za",sourceLabel:"United Transport company website",
 context:"Company information describes warehousing, transport, distribution and containerised cargo services. It references an OTIF service objective, but does not prove missing delivery tracking or software.",
 focus:[["Exception visibility","Ask who sees delayed deliveries and how exceptions are escalated."],["Operational handovers","Ask how warehouse, dispatch and delivery records connect."],["KPI reporting","Ask which customer service measures require manual reconciliation."]],
 questions:["Which customer delivery and warehousing metrics matter most, and how are they already reported?","Where does delivery evidence originate, and who approves updates?","How are late arrivals or load discrepancies documented and resolved?","Are any cross-system exports or reconciliations still manual?","How do you approach OTIF analysis, and what are the agreed time-window definitions?","What efficiency or service goals are most important over the next year?","Would a narrow reporting add-on complement current systems, or duplicate them?"],
 pitch:"Use the fleet demonstration to illustrate capacity and completed-delivery variance. Do not imply it provides GPS, live ETA or a replacement for existing transport management software.",
 demos:[["Fleet and dispatch demo","fleet"],["Production and dispatch ledger","production"]],
},
raubex:{
 name:"Raubex KZN",source:"https://raubex.com/roads-and-earthworks/",sourceLabel:"Raubex Roads and Earthworks division",
 context:"Raubex KZN lists road construction, rehabilitation, surfacing, asphalt operations, milling and bitumen-stabilised material work. The group also invests in operational efficiency, so position any new module as an optional complementary tool.",
 focus:[["Site reporting","Ask whether project-level data is reconciled across shifts, sites and contractors."],["Material movement","Ask how batch, tonnage or dispatch records flow into project reporting."],["Equipment utilisation","Ask how site equipment maintenance information reaches operations."]],
 questions:["Which operational or project performance figures are reviewed daily versus monthly?","How do existing systems capture material dispatch, quantities and site delivery confirmation?","Are production, plant and project teams already integrated into one reporting workflow?","Which discrepancies or approvals cause extra administrative effort, if any?","How are milling equipment and project assets monitored for planned service?","What upcoming digital or reporting priorities can suppliers help with?","What are your required supplier and information-security approval processes?"],
 pitch:"Use the illustrative production-versus-plan demo only if the meeting is with a relevant operations team. Alternatively show asset maintenance. Make it clear that same-shift dispatch is not a stock-balance, batch-traceability or road-quality algorithm.",
 demos:[["Production and dispatch demo","production"],["Equipment maintenance demo","maintenance"]]
},
other:{
 name:"Unconfirmed company",source:"",sourceLabel:"",
 context:"Begin by asking the organisation to describe its operations, current systems and priorities. Select a demonstration only if it directly helps answer a question raised during the meeting.",
 focus:[["Current process","Find the process owner, information flow and any repeated manual work."],["Value measure","Ask how the team would judge an improvement."],["Authorisation","Confirm appropriate review, procurement and system-access approval."]],
 questions:["What is your department responsible for each day?","Which information is hardest to obtain or reconcile, if any?","What tools and systems already work well?","What are the major priorities for the next six to twelve months?","Where is a small improvement feasible without disrupting operations?","How are technology suppliers evaluated?","Who would need to approve a small paid discovery engagement?"],
 pitch:"Show only the closest conceptual match after hearing the organisation's own needs. If no match exists, skip the demo and offer to document a short, non-confidential process summary.",
 demos:[["Production and dispatch","production"],["Asset maintenance","maintenance"],["Fleet operations","fleet"]]
}};
const keys=["day","time","actualCompany","role","workflow","problem","impact","strategy","systems","decision","pilot","next"];
const safe=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let current="nd";
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
 $("demoLinks").innerHTML=p.demos.map(([title,view])=>'<a class="action-link'+(view===p.demos[0][1]?'':' alt')+'" href="./index.html?view='+encodeURIComponent(view)+'" target="_blank" rel="noopener">'+safe(title)+' ↗</a>').join("");
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
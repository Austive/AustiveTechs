/* Austive Technologies | Illustrative business rules — never customer-specific control logic. */
(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
  root.AustiveRules=api;
})(typeof window!=="undefined"?window:globalThis,function(){
  const n=(v)=>Number.isFinite(Number(v))?Number(v):0;
  const round=(v,d=1)=>Math.round((v+Number.EPSILON)*10**d)/10**d;
  const daysBetween=(a,b)=>Math.round((Date.parse(a+"T00:00:00Z")-Date.parse(b+"T00:00:00Z"))/86400000);
  function operations(r){
    const plan=Math.max(0,n(r.planned)), actual=Math.max(0,n(r.actual)), rejected=Math.max(0,n(r.rejected)), dispatched=Math.max(0,n(r.dispatched));
    const accepted=Math.max(0,actual-rejected);
    return {variance:round(actual-plan), variancePct:plan?round((actual-plan)/plan*100):null, accepted:round(accepted),
      rejectPct:actual?round(rejected/actual*100):null, dispatchPct:accepted?round(dispatched/accepted*100):null,
      reconciliation:dispatched>accepted?"Review: dispatch exceeds same-shift accepted output": "Illustrative balance only"};
  }
  function maintenance(r,today){
    const date=today||new Date().toISOString().slice(0,10);
    const remaining=daysBetween(r.due,date), open=r.status!=="Closed";
    const hoursRemaining=n(r.serviceAtHours)-n(r.runningHours);
    const overdue=open&&(remaining<0||hoursRemaining<0);
    const score=(n(r.criticality)||1)*2+(overdue?4:remaining<=7?2:0)+(hoursRemaining<0?3:hoursRemaining<=50?1:0);
    return {daysToService:remaining,hoursToService:hoursRemaining,overdue,score,attention:!open?"Closed":overdue?"Overdue":score>=7?"Priority":"Scheduled"};
  }
  function fleet(r){
    const capacity=Math.max(0,n(r.capacity)),load=Math.max(0,n(r.load));
    const utilization=capacity?round(load/capacity*100):null;
    const diff=(r.actualArrival&&r.plannedArrival)?round((Date.parse(r.actualArrival)-Date.parse(r.plannedArrival))/3600000,2):null;
    return {utilization,delayHours:diff,overCapacity:load>capacity,
      status:load>capacity?"Capacity review":r.status==="Delivered"&&diff!==null&&diff>0?"Late delivery":r.status};
  }
  return {operations,maintenance,fleet,round};
});
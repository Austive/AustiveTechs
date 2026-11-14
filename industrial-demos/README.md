# Austive Technologies — Industrial Operations Lab

Three functional, client-independent demonstration modules for discovery meetings with industrial operators and contractors.

## Included demonstrations

| Module | Workflow | Illustrative algorithm | Potential conversation |
| --- | --- | --- | --- |
| Production & dispatch | Shift plans, actual output, quality rejection, same-shift dispatch | Production variance; accepted tonnes; dispatch reconciliation | Asphalt/roadworks, timber, manufacturing |
| Asset maintenance | Work-order register, service dates, running-hour intervals, criticality | Dual-threshold overdue check; transparent attention score | Fabrication, timber, mining-support facilities |
| Fleet intelligence | Trip references, capacity, load and delivery timestamps | Capacity utilisation; schedule variance; exceptions | Distribution, contractor logistics, forestry transport |

**No actual customer data or proprietary production algorithm is used.** Operating assumptions, equipment constraints, safety and legal limits must be agreed with each customer in a scoped pilot. These demos do not control machinery, connect to OT systems, or calculate legal loading limits.

## Launch

Open `industrial-demos/index.html` locally in a browser, or serve repository root over HTTP:

```bash
python3 -m http.server 8080
# http://localhost:8080/industrial-demos/
```

No NPM install, database, API key or backend required. Works offline after assets are loaded.

## Features

- 3 selectable workspaces and accessible edit dialogs
- Fictional starting records and editable user-created data
- KPIs, charts and exception summaries re-compute from records
- Search, CSV export and demo reset
- Local browser storage; no collection or submission of information
- Mobile-responsive design
- Business-rule source: `assets/rules.js`

## QA checklist

- Run `node industrial-demos/tests/rules.test.js` (Node.js 18+ recommended).
- Open each workspace; confirm KPI changes after adding or editing a row.
- Search by record reference; export CSV; reset.
- Test browser refresh, mobile widths, and dialog validation.
- Confirm that only fictional data is used in a public demo.

## Presentation scripts

**Asphalt / roadworks:** “Here is a sample production-shift record. We compare planned and actual tonnes, reject quantities and recorded dispatch. How does your team reconcile these today?”

**Timber / fabrication / mining contractor:** “This example combines upcoming service dates and engine-hours into a maintenance review queue. What criteria does your maintenance team actually use?”

**Logistics / forestry transport:** “This model highlights planned loading and discrepancies between scheduled and actual arrival. Where do you currently store trip and delivery confirmations?”

## Pilot architecture (not implemented)

For an authorised customer pilot, replace browser-only storage with authenticated backend APIs and a relational database; add permissions, audit history, approvals, backups, agreed definitions, testing and production monitoring. Integrations with ERP, fleet telematics, industrial OT or process equipment require formal security and site approvals. No such integrations are implemented.

## Public-release safety

Do not publish prospect contact lists, private pricing, personal details, customer data or proprietary policies in this public repository. The existing website is not replaced by this branch. GitHub Pages, DNS or hosting deployment are **not** configured by this change.

## Project

Austive Technologies — https://www.austivetechs.co.za

## Confirmed prospect meeting profiles (16–17 November 2026)

The confirmed organisations are **National Asphalt**, **NPC Sterkspruit** (verify whether the contact means Natal Portland Cement's Sterkspruit plant), and **Raubex**. The distribution of appointments across Monday and Tuesday remains unknown.

Open `industrial-demos/meeting-studio.html` and select a profile. Research-derived discovery prompts and matched synthetic samples are linked.

| Profile | First demo | Secondary demo | Critical discovery boundaries |
| --- | --- | --- | --- |
| National Asphalt | `?view=production&profile=national` | `?view=maintenance&profile=national` | Do not imply mix-design compliance, quality assurance, plant-control or inventory balancing |
| NPC Sterkspruit | `?view=production&profile=npc` | `?view=fleet&profile=npc` | Sample tonnes are a generic illustrative ledger, **not** concrete recipes, batching logic or cement quality controls |
| Raubex KZN | `?view=production&profile=raubex` | `?view=maintenance&profile=raubex` | Do not imply that illustrative roadwork shift volumes capture actual project accounting or asset safety checks |

**Source starting points:**
- https://nationalasphalt.co.za/
- https://npc.co.za/our-plants-page/
- https://raubex.com/roads-and-earthworks/

Both National Asphalt and Raubex KZN are linked to the Raubex Group; confirm separate site-level process owners and vendor/procurement approval routes.

**Meeting approach:** introduce Austive Technologies, ask how current systems already work, identify any validated bottleneck, then demonstrate only an appropriate example. Note business goals, operational constraints, measures of improvement and agreed next steps without recording confidential customer data. No pilot implementation or integration without written authorisation.

**Privacy:** The meeting studio stores notes locally in the browser; they are not sent to a server. Export notes to an approved private company location and clear them from shared devices. Never commit meeting notes or contact lists to this public repository.

**QA:** `.github/workflows/industrial-demos.yml` runs JavaScript syntax checks and unit tests. Manually verify desktop/mobile presentation and offline availability before customer meetings. The live austivetechs.co.za website remains unchanged.

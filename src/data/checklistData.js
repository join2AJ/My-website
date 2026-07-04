// 5 operational checklists — extracted from ICAO Annex 14/17/19 + DGCA requirements
export const CHECKLISTS = [

  // ══════════════════════════════ RUNWAY AUDIT
  {
    id:'runway_audit', section:'Runway', icon:'🛬', color:'#1249C0', bgColor:'#EEF4FF',
    name:'Runway Audit',
    sub:'Daily Pre-Operations Inspection · Annex 14 §5.2 + §3.1 · DGCA CAR Section 4',
    pills:[
      {text:'Daily / Pre-first flight',bg:'#EEF4FF',color:'#1249C0'},
      {text:'Annex 14 §5.2',bg:'#EEF4FF',color:'#1249C0'},
      {text:'Engineering + Operations',bg:'#F0FFF4',color:'#047857'},
      {text:'ATC Coordination Required',bg:'#FEF3C7',color:'#92400E'},
    ],
    atcEntry:{
      label:'ATC Clearance to Enter Runway — Phraseology',
      tx:'"{Airport} Ground, Engineering Vehicle Victor Kilo 01, request permission to enter Runway 25 for daily inspection, holding at Holding Point Alpha."',
      rx:'"Victor Kilo 01, {Airport} Ground, runway 25 clear, you are cleared to enter, runway inspection approved, report when vacated."',
    },
    phases:[
      {
        title:'Phase 1 — Pre-Inspection (Before Entering Runway)',
        icon:'📋', color:'#5B21B6',
        meta:'Complete before physically entering the runway. Do not enter without ATC clearance.',
        steps:[
          {id:'r_p1_1',action:'Notify AOCC and obtain ATC clearance',detail:'Call AOCC on the operations radio channel. State: vehicle number, inspection type, runway number, estimated time. Get ATC to issue runway clearance. Record clearance time in logbook.',status:true,finding:true},
          {id:'r_p1_2',action:'Assemble inspection team — minimum 2 persons',detail:'Inspector 1 (lead — licensed airside operations officer), Inspector 2 (engineering). Both must hold valid ADP and AEP. Vehicle must have speed governor and working radio.',status:true,finding:true},
          {id:'r_p1_3',action:'Collect inspection equipment',detail:'Tape measure (50m), retroreflectometer, lux meter, friction meter, camera, inspection logbook, NOTAM printout, previous inspection report.',status:true,finding:true},
          {id:'r_p1_4',action:'Check NOTAMs for runway in service',detail:'Review current NOTAMs. Check: any displaced threshold? ILS/PAPI status? Any lighting system unserviceability? Any restricted operations? Note all active NOTAMs before entering.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 2 — Runway Physical Dimensions',
        icon:'📐', color:'#1249C0',
        meta:'Drive or walk the runway. Measure and record. Compare against ICAO Annex 14 Table 3-1 standard values for your aerodrome code.',
        steps:[
          {id:'r_p2_1',action:'Runway width measurement',detail:'Measure physical width at threshold, midpoint, and far end. Code 4E minimum = 45m. Code 4F minimum = 60m.',
            measurements:[
              {label:'Width at Threshold',std:'≥ 45m (Code 4E) / ≥ 60m (Code 4F)',unit:'m',icao:'A14 Table 3-1',key:'rw_thr'},
              {label:'Width at Midpoint',std:'≥ 45m (Code 4E) / ≥ 60m (Code 4F)',unit:'m',icao:'A14 Table 3-1',key:'rw_mid'},
              {label:'Width at Far End',std:'≥ 45m (Code 4E) / ≥ 60m (Code 4F)',unit:'m',icao:'A14 Table 3-1',key:'rw_end'},
            ],status:true,finding:true},
          {id:'r_p2_2',action:'Runway length vs declared distances',detail:'Verify physical length against AIP published TORA, TODA, ASDA, LDA. Any discrepancy must be reported to DGCA immediately.',
            measurements:[
              {label:'TORA (Take-Off Run Available)',std:'As published in AIP',unit:'m',icao:'A14 §2.9',key:'tora'},
              {label:'TODA (Take-Off Distance Available)',std:'TORA + Clearway',unit:'m',icao:'A14 §2.9',key:'toda'},
              {label:'ASDA (Accelerate-Stop Distance)',std:'TORA + Stopway',unit:'m',icao:'A14 §2.9',key:'asda'},
              {label:'LDA (Landing Distance Available)',std:'As published in AIP',unit:'m',icao:'A14 §2.9',key:'lda'},
            ],status:true,finding:true},
          {id:'r_p2_3',action:'Runway slope measurement',detail:'Use clinometer or survey instrument. Longitudinal slope must not exceed 1.25% for Code 4 runway. Transverse slope: 1.0–2.0% for drainage.',
            measurements:[
              {label:'Max longitudinal slope',std:'≤ 1.25% (Code 4)',unit:'%',icao:'A14 §3.1.12',key:'slope_long'},
              {label:'Transverse slope',std:'1.0% – 2.0%',unit:'%',icao:'A14 §3.1.15',key:'slope_trans'},
            ],status:true,finding:true},
        ],
      },
      {
        title:'Phase 3 — Runway Markings',
        icon:'🎨', color:'#047857',
        meta:'Inspect each marking type. Use retroreflectometer for reflectivity. DGCA 2025 surveillance: faded centreline = immediate finding.',
        steps:[
          {id:'r_p3_1',action:'Runway designation marking',detail:'Two-digit number at each end. White, minimum height 9m for Code 4. Check: colour intact, not faded, digits complete, no cracks.',
            measurements:[
              {label:'Character height',std:'≥ 9m (Code 3/4)',unit:'m',icao:'A14 §5.2.1',key:'desig_h'},
              {label:'Retroreflectivity',std:'≥ 300 mcd/m²/lux',unit:'mcd',icao:'A14 App 2',key:'desig_ref'},
            ],status:true,finding:true},
          {id:'r_p3_2',action:'Runway centreline marking',detail:'White stripes with gaps. Stripe + gap = 50–75m total cycle. Width: 0.9m. Must be continuous, no missing sections.',
            measurements:[
              {label:'Stripe width',std:'≥ 0.9m',unit:'m',icao:'A14 §5.2.2',key:'cl_w'},
              {label:'Stripe + gap cycle length',std:'50m – 75m',unit:'m',icao:'A14 §5.2.2',key:'cl_cycle'},
              {label:'Retroreflectivity',std:'≥ 200 mcd/m²/lux',unit:'mcd',icao:'A14 App 2',key:'cl_ref'},
            ],status:true,finding:true},
          {id:'r_p3_3',action:'Threshold marking',detail:'White stripes extending full width. Code 4: 8 stripes. Stripe width 1.8m. Starts 6m from threshold.',
            measurements:[
              {label:'Number of stripes',std:'8 stripes (Code 4)',unit:'no.',icao:'A14 §5.2.3',key:'thr_stripes'},
              {label:'Individual stripe width',std:'1.8m each',unit:'m',icao:'A14 §5.2.3',key:'thr_sw'},
              {label:'Distance from threshold',std:'6m from threshold edge',unit:'m',icao:'A14 §5.2.3',key:'thr_dist'},
            ],status:true,finding:true},
          {id:'r_p3_4',action:'Aiming point marking',detail:'Two white rectangles. For Code 4 (LDA ≥ 2400m): located 400m from threshold. Each rectangle: 45m × 10m.',
            measurements:[
              {label:'Distance from threshold',std:'400m (LDA≥2400m, Code 4)',unit:'m',icao:'A14 §5.2.5',key:'ap_dist'},
              {label:'Length of each bar',std:'45m',unit:'m',icao:'A14 §5.2.5',key:'ap_len'},
              {label:'Width of each bar',std:'10m',unit:'m',icao:'A14 §5.2.5',key:'ap_w'},
            ],status:true,finding:true},
          {id:'r_p3_5',action:'Touchdown zone (TDZ) marking',detail:'Symmetrical pairs of rectangles. First pair at 150m from threshold. For ≥ 2400m: 6 pairs total extending to 900m.',
            measurements:[
              {label:'First pair distance from threshold',std:'150m',unit:'m',icao:'A14 §5.2.6',key:'tdz_first'},
              {label:'Bar length',std:'22.5m',unit:'m',icao:'A14 §5.2.6',key:'tdz_len'},
              {label:'Bar width',std:'3m',unit:'m',icao:'A14 §5.2.6',key:'tdz_bw'},
            ],status:true,finding:true},
          {id:'r_p3_6',action:'Side stripe marking',detail:'White continuous stripe along both runway edges. Width: 0.9m minimum. Check for gaps, fading, rubber contamination.',
            measurements:[
              {label:'Side stripe width',std:'≥ 0.9m',unit:'m',icao:'A14 §5.2.7',key:'ss_w'},
              {label:'Retroreflectivity',std:'≥ 100 mcd/m²/lux',unit:'mcd',icao:'A14 App 2',key:'ss_ref'},
            ],status:true,finding:true},
        ],
      },
      {
        title:'Phase 4 — Surface Condition',
        icon:'🔍', color:'#92400E',
        meta:'Physical condition of runway pavement. Any defect must be measured, photographed, and classified.',
        steps:[
          {id:'r_p4_1',action:'FOD (Foreign Object Debris) sweep',detail:'Walk or drive at 20km/h max. Look for: stones, metal fragments, tyre rubber, bird strike remains. Any FOD: stop, photograph, collect, log location.',status:true,finding:true},
          {id:'r_p4_2',action:'Pavement cracking survey',detail:'Record any cracks. Classify: hairline (<2mm = monitor), moderate (2–5mm = 7-day repair), severe (>5mm = immediate repair).',
            measurements:[{label:'Maximum crack width observed',std:'< 5mm (above = critical)',unit:'mm',icao:'A14 §10',key:'crack_w'}],
            status:true,finding:true},
          {id:'r_p4_3',action:'Rutting measurement',detail:'Use 3m straight edge. Maximum allowable rut depth = 25mm for aircraft movement areas.',
            measurements:[{label:'Maximum rut depth',std:'< 25mm',unit:'mm',icao:'A14 §10',key:'rut_d'}],
            status:true,finding:true},
          {id:'r_p4_4',action:'Rubber contamination assessment',detail:'Check touchdown zone for heavy rubber accumulation. Retroreflectivity below 100 mcd = schedule rubber removal.',
            measurements:[
              {label:'TDZ marking visibility',std:'Marking visible through rubber',unit:'Visual',icao:'A14 §10',key:'rubber'},
              {label:'Friction coefficient (if tested)',std:'≥ 0.25 (ICAO minimum action level)',unit:'μ',icao:'A14 App 1',key:'friction'},
            ],status:true,finding:true},
          {id:'r_p4_5',action:'Drainage check',detail:'Check all drainage outlets on runway, RESA, and strip. No ponding allowed. After rainfall: confirm water drains within 30 minutes.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 5 — RESA & Runway End',
        icon:'🟩', color:'#047857',
        meta:'Runway End Safety Area — the most critical safety buffer. ICAO minimum 90m, recommended 240m.',
        steps:[
          {id:'r_p5_1',action:'RESA length measurement',detail:'Measure from end of runway strip to end of RESA. ICAO standard: minimum 90m for Code 3/4. Recommended: 240m.',
            measurements:[
              {label:'RESA length — End A',std:'≥ 90m (min) / ≥ 240m (recommended)',unit:'m',icao:'A14 §3.5.2',key:'resa_a'},
              {label:'RESA length — End B',std:'≥ 90m (min) / ≥ 240m (recommended)',unit:'m',icao:'A14 §3.5.2',key:'resa_b'},
              {label:'RESA width',std:'≥ 2× runway width',unit:'m',icao:'A14 §3.5.2',key:'resa_w'},
            ],status:true,finding:true},
          {id:'r_p5_2',action:'RESA surface condition',detail:'Surface must be graded (even), no deep ruts, no obstacles, no pools of water. Grass/vegetation: maintained, not obstructing. No parked vehicles within RESA.',status:true,finding:true},
          {id:'r_p5_3',action:'Runway guard lights check',detail:'At each runway-holding position: minimum 2 yellow alternating flashing lights set into pavement. Check all are operational, clean lenses, not damaged.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 6 — Inspection Close-Out',
        icon:'✅', color:'#047857',
        meta:'Complete all documentation before vacating runway.',
        steps:[
          {id:'r_p6_1',action:'Compile all findings with photos',detail:'Every finding must have: location (distance from threshold, offset from centreline), photo, measurement, classification (Critical/Major/Minor), recommended action, timeline.',status:true,finding:true},
          {id:'r_p6_2',action:'Report to ATC that runway inspection is complete',detail:'Inform ATC on radio: vehicle vacating runway, inspection complete. Confirm whether runway is serviceable.',status:true,
            atcComm:{tx:'"Victor Kilo 01, runway inspection complete, vacating via Taxiway Alpha, runway is [SERVICEABLE / UNSERVICEABLE pending maintenance at [location]]."',rx:'"Victor Kilo 01, copy, runway serviceable [or action noted], report when on apron."'}},
          {id:'r_p6_3',action:'Submit inspection report within 30 minutes',detail:'Upload: filled checklist, photos, measurements, findings. Tag severity. Assign to engineering for immediate items.',status:true,finding:true},
          {id:'r_p6_4',action:'Issue NOTAM if any safety-critical finding',detail:'If Critical finding: AOCC to coordinate with ATC for NOTAM within 30 minutes. Do not delay NOTAM for reporting convenience.',status:true,finding:true},
        ],
      },
    ],
  },

  // ══════════════════════════════ PAPI INSPECTION
  {
    id:'papi_check', section:'Lighting', icon:'💡', color:'#92400E', bgColor:'#FFFBEB',
    name:'PAPI Daily Serviceability Check',
    sub:'Precision Approach Path Indicator · ICAO Annex 14 §5.3.5 · DGCA CAR Section 4',
    pills:[
      {text:'Daily before first flight',bg:'#FFFBEB',color:'#92400E'},
      {text:'A14 §5.3.5',bg:'#FFFBEB',color:'#92400E'},
      {text:'Engineering-Electrical',bg:'#F0FFF4',color:'#047857'},
      {text:'Flight inspection annually',bg:'#FEF3C7',color:'#B45309'},
    ],
    phases:[
      {
        title:'Phase 1 — Ground Visual Check',
        icon:'👁️', color:'#92400E',
        meta:'Stand at Pilot Eye Height (approx 5m above runway level) at PAPI installation. Observe from the approach end.',
        steps:[
          {id:'p_1_1',action:'PAPI unit count and lamp status',detail:'PAPI = 4 light units (P1–P4). All lamps must be ON. Zero dark or dim lamps acceptable.',
            measurements:[{label:'Unserviceable lamps',std:'0 (zero unserviceable)',unit:'no.',icao:'A14 §5.3.5',key:'papi_lamps'}],
            status:true,finding:true},
          {id:'p_1_2',action:'PAPI colour signal check',detail:'At 3° glide path: all 4 units white (too high). At exactly 3°: 2 red + 2 white. Below glide path: all 4 red. Verify colour transition by walking from high angle to low angle.',status:true,finding:true},
          {id:'p_1_3',action:'PAPI box alignment visual',detail:'All 4 PAPI boxes must be perfectly horizontal (not tilted). Check from front. Any box physically rotated or tilted = engineering defect, immediate report.',status:true,finding:true},
          {id:'p_1_4',action:'PAPI lens cleanliness',detail:'Walk up to each unit. Lenses must be clean: no mud, insects, moisture, or bird strike marks. Clean with approved solvent if contaminated.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 2 — Photometric Measurement (Weekly)',
        icon:'📡', color:'#1249C0',
        meta:'Intensity and alignment measurements. These require calibrated lux meter and alignment tool.',
        steps:[
          {id:'p_2_1',action:'PAPI intensity measurement',detail:'Measure luminous intensity at the nominal glide path angle from prescribed distance. Minimum intensity for PAPI: Day operations ≥ 500 cd per unit.',
            measurements:[
              {label:'Unit P1 intensity (candela)',std:'≥ 500 cd (day)',unit:'cd',icao:'A14 §5.3.5',key:'papi_p1'},
              {label:'Unit P2 intensity',std:'≥ 500 cd (day)',unit:'cd',icao:'A14 §5.3.5',key:'papi_p2'},
              {label:'Unit P3 intensity',std:'≥ 500 cd (day)',unit:'cd',icao:'A14 §5.3.5',key:'papi_p3'},
              {label:'Unit P4 intensity',std:'≥ 500 cd (day)',unit:'cd',icao:'A14 §5.3.5',key:'papi_p4'},
            ],status:true,finding:true},
          {id:'p_2_2',action:'Glide path angle verification',detail:'Verify actual glide path angle using clinometer/PAPI alignment tool. Nominal: 3.0° (unless published otherwise). Tolerance: ±0.1°.',
            measurements:[
              {label:'Measured glide path angle',std:'3.0° ± 0.1° (or published angle)',unit:'°',icao:'A14 §5.3.5',key:'papi_gp'},
              {label:'On-slope tolerance',std:'Upper limit: 3.5° / Lower limit: 2.5°',unit:'°',icao:'A14 §5.3.5',key:'papi_tol'},
            ],status:true,finding:true},
          {id:'p_2_3',action:'Lateral siting verification',detail:'PAPI units located 30m to left side of runway threshold. Verify units are collinear and perpendicular to runway centreline.',
            measurements:[{label:'Lateral offset from runway edge',std:'30m (±0.5m)',unit:'m',icao:'A14 §5.3.5',key:'papi_lat'}],
            status:true,finding:true},
        ],
      },
      {
        title:'Phase 3 — Annual Flight Inspection',
        icon:'✈️', color:'#5B21B6',
        meta:'PAPI must be flight-inspected annually by AAI/NAVCAL flight inspection unit. This is a regulatory requirement.',
        steps:[
          {id:'p_3_1',action:'Coordinate with AAI Flight Inspection Unit for annual scheduling',detail:'Contact AAI FIU. Inspection done from cockpit at prescribed altitudes. Book well in advance — FIU schedule typically 3–6 months ahead.',status:true,finding:true},
          {id:'p_3_2',action:'Obtain flight inspection certificate after inspection',detail:'Certificate confirms: glide path angle correct, intensity adequate, colour filter correct, no rogue signals. Certificate valid 12 months.',status:true,finding:true},
          {id:'p_3_3',action:'Upload flight inspection certificate to CompliantBharat',detail:'Upload PDF of certificate. System auto-sets next inspection reminder 11 months forward.',status:true,finding:true},
        ],
      },
    ],
  },

  // ══════════════════════════════ BCAS MOCK DRILL
  {
    id:'mock_drill', section:'Security', icon:'🚨', color:'#C41E1E', bgColor:'#FEF0F0',
    name:'BCAS Mock Drill — Bomb Threat',
    sub:'Annex 17 §5 · BCAS Quarterly Drill Requirement · All departments',
    pills:[
      {text:'Quarterly mandatory',bg:'#FEF0F0',color:'#C41E1E'},
      {text:'Annex 17 §5',bg:'#FEF0F0',color:'#C41E1E'},
      {text:'BCAS requirement',bg:'#FEF0F0',color:'#C41E1E'},
      {text:'All departments',bg:'#F5F3FF',color:'#5B21B6'},
    ],
    phases:[
      {
        title:'Phase 1 — Pre-Drill Preparation (D-7 days)',
        icon:'📋', color:'#5B21B6',
        meta:'Plan and brief all departments. Drill must be surprise for frontline staff but known to department heads.',
        steps:[
          {id:'md_1_1',action:'Define drill scenario and objectives',detail:'Choose: Telephonic bomb threat to airport. Brief only department HODs. Set drill date/time.',status:true,finding:true},
          {id:'md_1_2',action:'Notify BCAS regional office 7 days prior',detail:'Send letter to BCAS regional office. Include: date, time, scenario type, objective, participating agencies. BCAS may send observer.',status:true,finding:true},
          {id:'md_1_3',action:'Brief participating agencies — DO NOT brief frontline staff',detail:'Brief: Security Head, CISF Commandant, ATC supervisor, AOCC In-charge, Fire Chief, Terminal Manager, Airline coordinators.',status:true,finding:true},
          {id:'md_1_4',action:'Prepare drill evaluation forms for each agency',detail:'Separate evaluation sheet for: Call-handler, Security control room, CISF, ATC, AOCC, Terminal Operations, Fire Services, Medical.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 2 — Drill Execution',
        icon:'🔴', color:'#C41E1E',
        meta:'Drill starts. Evaluators observe without intervening. Record actual times against expected.',
        steps:[
          {id:'md_2_1',action:'T+0:00 — Bomb threat call placed to airport reception',detail:'Pre-scripted call placed by drill coordinator. Call handler must: stay calm, keep caller on line, complete Bomb Threat Assessment Card, note exact time.',
            measurements:[{label:'Call handler response time (pick up phone)',std:'< 3 rings',unit:'secs',icao:'A17 §5',key:'bt_pickup'}],
            status:true,finding:true},
          {id:'md_2_2',action:'T+0:02 — Call handler escalates to Security Control Room',detail:'After call: immediately notify ISMC/Security control room by dedicated hotline. Record time between call end and ISMC notification.',
            measurements:[{label:'Time from call end to ISMC notification',std:'< 2 minutes',unit:'mins',icao:'A17 §5.2',key:'bt_notif'}],
            status:true,finding:true},
          {id:'md_2_3',action:'T+0:03 — ISMC activates bomb threat response',detail:'Security controller: notifies CISF, AOCC, ATC, activates EOC. Record each notification time.',
            measurements:[
              {label:'ISMC → CISF notification time',std:'< 1 minute from ISMC alert',unit:'mins',icao:'A17 §5.2',key:'bt_cisf'},
              {label:'ISMC → AOCC notification time',std:'< 1 minute from ISMC alert',unit:'mins',icao:'A17 §5.2',key:'bt_aocc'},
              {label:'ISMC → ATC notification time',std:'< 1 minute from ISMC alert',unit:'mins',icao:'A17 §5.2',key:'bt_atc'},
            ],status:true,finding:true},
          {id:'md_2_4',action:'T+0:05 — CISF Dog Squad and EOD activated',detail:'CISF activates dog squad and alerts EOD. K9 team to be at designated search start area within prescribed time.',
            measurements:[{label:'CISF K9 team deployment time',std:'< 5 minutes from CISF notification',unit:'mins',icao:'A17 §5.2',key:'bt_k9'}],
            status:true,finding:true},
          {id:'md_2_5',action:'T+0:07 — Evacuation decision made by Security Head',detail:'Security Head assesses threat credibility using BCAS Bomb Threat Assessment Card score. Decision: Evacuate / Selective evacuation / Sweep only.',
            measurements:[{label:'Decision time from initial alert',std:'< 7 minutes',unit:'mins',icao:'A17 §5.2',key:'bt_evac'}],
            status:true,finding:true},
          {id:'md_2_6',action:'T+0:10 — ATC notified if terminal evacuation affects operations',detail:'If evacuation: ATC notified to hold departures, divert inbound if necessary. ATC issues ground stop as appropriate.',status:true,finding:true},
          {id:'md_2_7',action:'T+0:30 — Drill end, debrief assembles',detail:'Drill coordinator calls END. All evaluators assemble in designated debrief room.',
            measurements:[{label:'Time from activation to drill end',std:'As per scenario script ≈ 30 mins',unit:'mins',icao:'A17 §5',key:'bt_total'}],
            status:true,finding:true},
        ],
      },
      {
        title:'Phase 3 — Post-Drill Debrief & Documentation',
        icon:'📝', color:'#047857',
        meta:'MOST IMPORTANT PHASE. Without proper documentation, the drill has no compliance value.',
        steps:[
          {id:'md_3_1',action:'Conduct structured debrief — each agency reports',detail:'Go around the room. Each agency reports: What went well? What failed? What was the time vs standard? Good findings shared. Bad findings documented without blame.',status:true,finding:true},
          {id:'md_3_2',action:'Record all findings with timestamps',detail:'Drill coordinator compiles: agency → action → actual time → standard → pass/fail → root cause → corrective action → owner → completion date.',status:true,finding:true},
          {id:'md_3_3',action:'Upload drill report within 24 hours',detail:'Complete drill report uploaded: scenario, participants, timeline, findings, corrective actions. System marks quarterly drill as done.',status:true,finding:true},
          {id:'md_3_4',action:'Assign corrective actions with deadlines',detail:'Each finding gets: responsible officer, completion date (max 30 days), evidence of completion required.',status:true,finding:true},
          {id:'md_3_5',action:'Send drill report to BCAS regional office',detail:'Formal report to BCAS: scenario, participants, findings, corrective actions, lessons learned.',status:true,finding:true},
        ],
      },
    ],
  },

  // ══════════════════════════════ AEP RENEWAL
  {
    id:'aep_renewal', section:'Security', icon:'🪪', color:'#B45309', bgColor:'#FFFBEB',
    name:'AEP Renewal Process',
    sub:'Aerodrome Entry Permit · BCAS AEP Guidelines 2022 · eSahaj Portal',
    pills:[
      {text:'Per renewal cycle',bg:'#FFFBEB',color:'#B45309'},
      {text:'BCAS AEP 2022',bg:'#FFFBEB',color:'#B45309'},
      {text:'AEP Section + HR',bg:'#EEF4FF',color:'#1249C0'},
      {text:'eSahaj mandatory',bg:'#F0FFF4',color:'#047857'},
    ],
    phases:[
      {
        title:'Phase 1 — 60 Days Before Expiry',
        icon:'⏰', color:'#B45309',
        meta:'System sends automated alert 60 days before AEP expiry. AEP Section initiates renewal process.',
        steps:[
          {id:'aep_1_1',action:'Generate expiry report from eSahaj portal',detail:'Login to BCAS eSahaj portal. Pull expiry report for all AEPs expiring in next 60 days. Upload to CompliantBharat.',status:true,finding:true},
          {id:'aep_1_2',action:'Notify each AEP holder and their department head',detail:'WhatsApp/email to holder + department head: AEP expiry date, required documents, visit AEP section by date.',status:true,finding:true},
          {id:'aep_1_3',action:'Verify employment status with HR before initiating renewal',detail:'Cross-check: Is the employee still in service? No transfer, resignation, termination pending? HR to confirm in writing. DO NOT renew AEP for employees serving notice period.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 2 — Background Verification',
        icon:'🔍', color:'#5B21B6',
        meta:'BCAS mandates fresh background verification for renewal. No exceptions.',
        steps:[
          {id:'aep_2_1',action:'Initiate background verification with BCAS approved agency',detail:'Must use a BCAS approved background verification agency. Required check: Police verification (all addresses for last 5 years), Criminal antecedents, previous employment.',status:true,finding:true},
          {id:'aep_2_2',action:'Submit documents for verification',detail:'Employee submits: Updated address proof, Police clearance certificate (for any new address), Updated character reference, Aadhaar (mandatory for Indian nationals).',status:true,finding:true},
          {id:'aep_2_3',action:'Track verification timeline',detail:'Background verification takes 15–30 days. If adverse finding: IMMEDIATELY inform BCAS, suspend access pending investigation.',
            measurements:[{label:'Verification turnaround target',std:'≤ 21 days from submission',unit:'days',icao:'BCAS 2022',key:'aep_bgv'}],
            status:true,finding:true},
        ],
      },
      {
        title:'Phase 3 — eSahaj Submission & CACS Update',
        icon:'💻', color:'#047857',
        meta:'All AEP issuance ONLY through eSahaj portal. Paper AEPs not valid under BCAS 2022 guidelines.',
        steps:[
          {id:'aep_3_1',action:'Upload renewal application on BCAS eSahaj portal',detail:'Login to eSahaj. Complete renewal form: updated personal details, new photo (within 6 months), fresh biometric (if first time on this system).',status:true,finding:true},
          {id:'aep_3_2',action:'Pay BCAS fee through eSahaj (online only)',detail:'Fee paid online through eSahaj payment gateway. Keep transaction receipt.',status:true,finding:true},
          {id:'aep_3_3',action:'Collect approved AEP from eSahaj and update CACS',detail:'On BCAS approval: download AEP from eSahaj (chip-embedded smart card issued). Immediately update CACS biometric database with new AEP expiry date.',status:true,finding:true},
          {id:'aep_3_4',action:'Update AEP register in CompliantBharat',detail:'Mark renewal complete. Upload new AEP copy. System updates expiry tracker for next renewal cycle.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 4 — Immediate Cancellation Protocol',
        icon:'🚫', color:'#C41E1E',
        meta:'CRITICAL: Any employee leaving or whose AEP is revoked must have access cancelled SAME DAY.',
        steps:[
          {id:'aep_4_1',action:'On resignation/termination: HR to notify AEP Section within 1 hour',detail:'HR sends written notification immediately on resignation/termination. DO NOT wait for exit formalities.',status:true,finding:true},
          {id:'aep_4_2',action:'Immediately deactivate employee in CACS biometric system',detail:'AEP Section deactivates the employee profile in CACS. Test: swipe the old card — access should be denied. Log deactivation timestamp.',
            measurements:[{label:'Time from HR notification to CACS deactivation',std:'< 60 minutes',unit:'mins',icao:'BCAS 2022',key:'aep_cancel'}],
            status:true,finding:true},
          {id:'aep_4_3',action:'Surrender AEP smart card — must be physically collected',detail:'Employee must surrender smart card to AEP Section before leaving campus. If employee not present: Immediately inform BCAS and cancel on eSahaj portal.',status:true,finding:true},
          {id:'aep_4_4',action:'Submit cancellation on eSahaj portal on same day',detail:'Login to eSahaj. Cancel AEP. Upload: HR termination letter, CACS deactivation confirmation, card surrender receipt (or BCAS report if absconded).',status:true,finding:true},
        ],
      },
    ],
  },

  // ══════════════════════════════ SMS HAZARD REPORT
  {
    id:'sms_hazard', section:'Safety SMS', icon:'⚠️', color:'#047857', bgColor:'#ECFDF5',
    name:'SMS Hazard Report & Risk Assessment',
    sub:'Annex 19 §3.1 · ICAO Doc 9859 · DGCA CAR — Aerodrome SMS',
    pills:[
      {text:'Per hazard identified',bg:'#ECFDF5',color:'#047857'},
      {text:'Annex 19 App 2 §2',bg:'#ECFDF5',color:'#047857'},
      {text:'Safety Manager',bg:'#EEF4FF',color:'#1249C0'},
      {text:'All departments input',bg:'#F5F3FF',color:'#5B21B6'},
    ],
    phases:[
      {
        title:'Phase 1 — Hazard Identification',
        icon:'🔍', color:'#047857',
        meta:'Hazard identified by any staff member. Report goes into system within 24 hours.',
        steps:[
          {id:'sms_1_1',action:'Staff identifies hazard — any method',detail:'Sources: voluntary report (safety form), mandatory occurrence (runway incursion, bird strike), maintenance finding, DGCA finding, near-miss, safety walk, audit. All valid.',status:true,finding:true},
          {id:'sms_1_2',action:'Complete initial hazard description',detail:'Record: What is the hazard? Where exactly (location, department, system)? When first observed? Who identified? Has it happened before? Immediate threat to safety (Y/N)?',status:true,finding:true},
          {id:'sms_1_3',action:'If immediate threat: stop the operation',detail:'CRITICAL: If hazard poses immediate risk — STOP THE OPERATION FIRST, report second. Never document a hazard while letting the unsafe condition continue.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 2 — Risk Assessment Matrix',
        icon:'📊', color:'#1249C0',
        meta:'Assess using ICAO Doc 9859 probability × severity matrix. Document the rationale — not just the score.',
        steps:[
          {id:'sms_2_1',action:'Assess PROBABILITY of occurrence',detail:'Rate 1–5: (5) Frequent — happens regularly; (4) Occasional — has happened several times; (3) Remote — unlikely but possible; (2) Improbable; (1) Extremely improbable. Write rationale.',
            measurements:[{label:'Probability rating selected',std:'Rate 1–5 with written justification',unit:'1-5',icao:'A19 App2 §2.2',key:'sms_prob'}],
            status:true,finding:true},
          {id:'sms_2_2',action:'Assess SEVERITY of consequences',detail:'Rate A–E: (A) Catastrophic — multiple deaths; (B) Hazardous — serious injuries; (C) Major — serious incident; (D) Minor — nuisance; (E) Negligible — no safety effect.',
            measurements:[{label:'Severity rating selected',std:'Rate A–E with written justification',unit:'A-E',icao:'A19 App2 §2.2',key:'sms_sev'}],
            status:true,finding:true},
          {id:'sms_2_3',action:'Calculate Risk Index and determine tolerability',detail:'Risk Index = Probability × Severity matrix (ICAO Doc 9859). Result: Intolerable (immediate action), Tolerable (action required), Acceptable (monitor).',
            measurements:[{label:'Risk Index result',std:'Document: Intolerable / Tolerable / Acceptable',unit:'Category',icao:'A19 + Doc 9859',key:'sms_ri'}],
            status:true,finding:true},
        ],
      },
      {
        title:'Phase 3 — Risk Mitigation',
        icon:'🔧', color:'#B45309',
        meta:'For every Intolerable or Tolerable risk: define mitigation measures before closing the assessment.',
        steps:[
          {id:'sms_3_1',action:'Define mitigation measures (hierarchy of controls)',detail:'Apply in order: (1) Eliminate hazard; (2) Substitute; (3) Engineer controls (barriers, interlocks); (4) Administrative controls (SOPs, training); (5) PPE.',status:true,finding:true},
          {id:'sms_3_2',action:'Assign mitigation owner and deadline',detail:'Each mitigation gets: responsible person (by name), completion deadline, resources required. Intolerable risk: deadline ≤ 7 days. Tolerable risk: deadline ≤ 30 days.',status:true,finding:true},
          {id:'sms_3_3',action:'Re-assess residual risk after mitigation',detail:'After mitigations applied: re-run probability × severity matrix. Residual risk should be Acceptable. If still Tolerable: escalate to Safety Manager.',
            measurements:[{label:'Residual risk category',std:'Must be Acceptable or lower',unit:'Category',icao:'A19 App2 §2.2.3',key:'sms_rr'}],
            status:true,finding:true},
          {id:'sms_3_4',action:'Safety Manager reviews and approves closure',detail:'Safety Manager reviews: hazard description, probability/severity rationale, mitigations, residual risk. Any Intolerable initial risk: Accountable Manager must see the record.',status:true,finding:true},
        ],
      },
      {
        title:'Phase 4 — Monitoring & Learning',
        icon:'📈', color:'#5B21B6',
        meta:'Hazard log stays open until all mitigations are verified complete. Then lesson learned shared.',
        steps:[
          {id:'sms_4_1',action:'Verify mitigation implementation',detail:'Before closing: physical verification that each mitigation measure is actually in place. Not just done on paper — check it exists. Photo evidence where possible.',status:true,finding:true},
          {id:'sms_4_2',action:'Share as safety lesson learned',detail:'Anonymised description of hazard, mitigation, and outcome shared with: all department heads (safety bulletin), peer airports if relevant, DGCA if mandatory occurrence.',status:true,finding:true},
          {id:'sms_4_3',action:'Add to hazard register and trend analysis',detail:'Closed hazard goes into hazard register. Safety Manager reviews register monthly for trends: same hazard type recurring = systemic issue needing deeper fix.',status:true,finding:true},
        ],
      },
    ],
  },
]

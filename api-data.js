/**
 * SUDARSANA CHAKRA COMMAND CENTER — SYNTHETIC DEFENCE DATASET
 * PS 26249: Air Power – Predictive Maintenance & Fleet Availability
 * 
 * NOTICE: DEMO DATA – NOT REAL OPERATIONAL DEFENCE DATA.
 * Final maintenance decision rests with authorized personnel.
 */

const FLEET_DATA = {
  summary: {
    totalAircraft: 24,
    availableAircraft: 18,
    underMaintenance: 4,
    atRiskAircraft: 2,
    predictedFaults: 5,
    criticalAlerts: 1,
    fleetAvailability: 75.0,
    targetAvailability: 80.0,
    availabilityDelta: -5.0,
    lastSyncTimestamp: new Date().toISOString()
  },
  aircraft: [
    {
      id: 'AC-107',
      tailNumber: 'SB-188',
      type: 'Su-30MKI',
      squadron: 'No. 222 Sqn "Tigersharks"',
      base: 'AFS Thanjavur',
      healthScore: 68,
      riskLevel: 'HIGH_RISK',
      primaryAlert: 'Hydraulic Pump HP-3B micro-cavitation degradation',
      rul: '9.8 Days',
      rulHours: 78.4,
      rulConfidence: '±1.2 Days (94.2%)',
      status: 'AT_RISK',
      ringTier: 'MIDDLE',
      ringAngle: 45,
      flightHours: 1482.4,
      sparesStatus: 'SHORTAGE_WARNING'
    },
    {
      id: 'AC-103',
      tailNumber: 'LA-5018',
      type: 'Tejas LCA Mk1A',
      squadron: 'No. 45 Sqn "Flying Daggers"',
      base: 'AFS Sulur',
      healthScore: 48,
      riskLevel: 'CRITICAL',
      primaryAlert: 'Engine Stage 3 HP Turbine Blisk fatigue micro-crack',
      rul: '3.2 Days',
      rulHours: 25.6,
      rulConfidence: '±0.4 Days (98.6%)',
      status: 'CRITICAL_AOG',
      ringTier: 'INNER',
      ringAngle: 180,
      flightHours: 640.2,
      sparesStatus: 'CRITICAL_PROCUREMENT'
    },
    {
      id: 'AC-104',
      tailNumber: 'KB-715',
      type: 'MiG-29UPG',
      squadron: 'No. 28 Sqn "First Supersonics"',
      base: 'AFS Jamnagar',
      healthScore: 78,
      riskLevel: 'WARNING',
      primaryAlert: 'Radome AESA coolant thermal loop fluctuation',
      rul: '22.4 Days',
      rulHours: 179.2,
      rulConfidence: '±2.5 Days (89.0%)',
      status: 'WATCHLIST',
      ringTier: 'MIDDLE',
      ringAngle: 90,
      flightHours: 2180.5,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-106',
      tailNumber: 'KF-112',
      type: 'Mirage 2000-5',
      squadron: 'No. 1 Sqn "Tigers"',
      base: 'AFS Gwalior',
      healthScore: 82,
      riskLevel: 'WARNING',
      primaryAlert: 'Fly-By-Wire rudder actuator micro-slip',
      rul: '18.0 Days',
      rulHours: 144.0,
      rulConfidence: '±1.8 Days (91.4%)',
      status: 'WATCHLIST',
      ringTier: 'MIDDLE',
      ringAngle: 270,
      flightHours: 3120.0,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-101',
      tailNumber: 'RB-008',
      type: 'Rafale DH',
      squadron: 'No. 17 Sqn "Golden Arrows"',
      base: 'AFS Ambala',
      healthScore: 98,
      riskLevel: 'INFORMATION',
      primaryAlert: 'Pre-flight BITE self-test nominal',
      rul: '420.0 Hours',
      rulHours: 420.0,
      rulConfidence: '±15.0 Hours (99.0%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 0,
      flightHours: 512.6,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-102',
      tailNumber: 'SB-192',
      type: 'Su-30MKI',
      squadron: 'No. 222 Sqn "Tigersharks"',
      base: 'AFS Thanjavur',
      healthScore: 96,
      riskLevel: 'INFORMATION',
      primaryAlert: 'Turbofan harmonic vibration within baseline',
      rul: '380.0 Hours',
      rulHours: 380.0,
      rulConfidence: '±12.0 Hours (98.5%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 30,
      flightHours: 1820.0,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-105',
      tailNumber: 'LA-5021',
      type: 'Tejas LCA Mk1A',
      squadron: 'No. 45 Sqn "Flying Daggers"',
      base: 'AFS Sulur',
      healthScore: 99,
      riskLevel: 'INFORMATION',
      primaryAlert: 'Avionics digital telemetry synchronizer active',
      rul: '510.0 Hours',
      rulHours: 510.0,
      rulConfidence: '±20.0 Hours (99.4%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 60,
      flightHours: 410.8,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-108',
      tailNumber: 'SB-204',
      type: 'Su-30MKI',
      squadron: 'No. 222 Sqn "Tigersharks"',
      base: 'AFS Thanjavur',
      healthScore: 95,
      riskLevel: 'INFORMATION',
      primaryAlert: 'Hydraulic accumulator nominal pre-charge',
      rul: '440.0 Hours',
      rulHours: 440.0,
      rulConfidence: '±14.0 Hours (98.2%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 120,
      flightHours: 1240.5,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-109',
      tailNumber: 'RB-011',
      type: 'Rafale DH',
      squadron: 'No. 17 Sqn "Golden Arrows"',
      base: 'AFS Ambala',
      healthScore: 97,
      riskLevel: 'INFORMATION',
      primaryAlert: 'M88 Turbofan thermal signatures balanced',
      rul: '395.0 Hours',
      rulHours: 395.0,
      rulConfidence: '±10.0 Hours (99.1%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 150,
      flightHours: 680.0,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-110',
      tailNumber: 'KB-722',
      type: 'MiG-29UPG',
      squadron: 'No. 28 Sqn "First Supersonics"',
      base: 'AFS Jamnagar',
      healthScore: 91,
      riskLevel: 'INFORMATION',
      primaryAlert: 'Scheduled 50-hr inspection completed',
      rul: '280.0 Hours',
      rulHours: 280.0,
      rulConfidence: '±11.0 Hours (97.8%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 210,
      flightHours: 2450.0,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-111',
      tailNumber: 'KF-119',
      type: 'Mirage 2000-5',
      squadron: 'No. 1 Sqn "Tigers"',
      base: 'AFS Gwalior',
      healthScore: 93,
      riskLevel: 'INFORMATION',
      primaryAlert: 'M53-P2 engine health index 94%',
      rul: '310.0 Hours',
      rulHours: 310.0,
      rulConfidence: '±12.0 Hours (98.0%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 240,
      flightHours: 3400.0,
      sparesStatus: 'AVAILABLE'
    },
    {
      id: 'AC-112',
      tailNumber: 'LA-5026',
      type: 'Tejas LCA Mk1A',
      squadron: 'No. 45 Sqn "Flying Daggers"',
      base: 'AFS Sulur',
      healthScore: 97,
      riskLevel: 'INFORMATION',
      primaryAlert: 'Composite wing skin ultrasound verified',
      rul: '460.0 Hours',
      rulHours: 460.0,
      rulConfidence: '±16.0 Hours (99.0%)',
      status: 'COMBAT_READY',
      ringTier: 'OUTER',
      ringAngle: 300,
      flightHours: 520.4,
      sparesStatus: 'AVAILABLE'
    }
  ],
  alerts: [
    {
      id: 'ALT-9041',
      level: 'CRITICAL',
      title: 'AC-103: Engine Stage 3 Blisk Micro-Crack',
      aircraftId: 'AC-103',
      tailNumber: 'LA-5018',
      component: 'HP Turbine Stage 3 Blisk',
      rul: '3.2 Days (25.6h)',
      time: '12m ago',
      details: 'Vibration spectral anomaly peak at 3,420 Hz (4.8 mm/s). Immediate Boroscope inspection mandatory.'
    },
    {
      id: 'ALT-9042',
      level: 'HIGH_RISK',
      title: 'AC-107: Hydraulic Pump HP-3B Cavitation Warning',
      aircraftId: 'AC-107',
      tailNumber: 'SB-188',
      component: 'Hydraulic Pump Unit HP-3B',
      rul: '9.8 Days (78.4h)',
      time: '28m ago',
      details: 'Pressure ripple distortion rising at 1.4%/day. Spare shortage warning logged at Depot.'
    },
    {
      id: 'ALT-9043',
      level: 'WARNING',
      title: 'AC-104: Radome Thermal Fluctuation',
      aircraftId: 'AC-104',
      tailNumber: 'KB-715',
      component: 'AESA Radar Liquid Cooling Loop',
      rul: '22.4 Days',
      time: '1h 14m ago',
      details: 'Delta-T between inlet and outlet exceeded nominal baseline by 6.2°C during supersonic cruise.'
    },
    {
      id: 'ALT-9044',
      level: 'WARNING',
      title: 'AC-106: FBW Actuator Micro-Slip',
      aircraftId: 'AC-106',
      tailNumber: 'KF-112',
      component: 'Rudder Electro-Hydraulic Actuator',
      rul: '18.0 Days',
      time: '2h 05m ago',
      details: 'Quad-redundant channel 3 showed 18ms phase latency during high-roll rate maneuvers.'
    },
    {
      id: 'ALT-9045',
      level: 'INFORMATION',
      title: 'AC-101: Sortie Post-Flight Log Validated',
      aircraftId: 'AC-101',
      tailNumber: 'RB-008',
      component: 'Spectra EW & Engine Suite',
      rul: '420.0 Hours',
      time: '3h 22m ago',
      details: 'All 214 sensor health parameters nominal. Aircraft cleared for next operational patrol.'
    }
  ],
  forecast: {
    dates: ['Day 0', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
    availabilityWithoutAction: [75, 71, 62, 58, 54, 50, 46],
    availabilityWithSudarshan: [75, 79, 83, 85, 87, 88, 91],
    fleetRiskIndex: [38, 28, 19, 14, 11, 9, 7]
  }
};

const AIRCRAFT_DETAILS = {
  'AC-107': {
    id: 'AC-107',
    tailNumber: 'SB-188',
    type: 'Su-30MKI (Flanker-H Block 20)',
    squadron: 'No. 222 Squadron "Tigersharks"',
    base: 'Air Force Station Thanjavur',
    overallHealth: 68,
    riskLevel: 'HIGH_RISK',
    rul: '9.8 Days (78.4 Flight Hours)',
    rulConfidenceBand: '8.6 - 11.0 Days (Confidence: 94.2%)',
    missionReadiness: 'RESTRICTED_SORTIES (Max 3 sorties before depot window)',
    hoursFlown: 1482.4,
    components: [
      { id: 'AC-107-HYD-PUMP', name: 'Hydraulic Pump Unit HP-3B', category: 'Hydraulics', health: 64, risk: 'HIGH_RISK', rul: '9.8 Days', alert: 'Micro-cavitation vibration trend' },
      { id: 'AC-107-ENG-1', name: 'Port Turbofan (AL-31FP Eng #1)', category: 'Propulsion', health: 88, risk: 'NORMAL', rul: '340 Hours', alert: 'Nominal EGT 740°C' },
      { id: 'AC-107-ENG-2', name: 'Starboard Turbofan (AL-31FP Eng #2)', category: 'Propulsion', health: 91, risk: 'NORMAL', rul: '390 Hours', alert: 'Nominal vibration 1.8 mm/s' },
      { id: 'AC-107-FBW', name: 'Quadplex Fly-By-Wire System', category: 'Flight Control', health: 92, risk: 'NORMAL', rul: '1,200 Hours', alert: '4/4 channels synchronised' },
      { id: 'AC-107-RADAR', name: 'Bars N011M PESA Radar Suite', category: 'Avionics', health: 94, risk: 'NORMAL', rul: '650 Hours', alert: 'Coolant loop nominal' },
      { id: 'AC-107-SPAR', name: 'Port Titanium Main Wing Spar', category: 'Airframe', health: 97, risk: 'NORMAL', rul: '6,517 Hours', alert: 'Cumulative G-fatigue: 18.5%' }
    ],
    peerComparison: {
      metric: 'Hydraulic System Wear vs Fleet Baseline',
      thisAircraftWear: 1.42,
      fleetAverageWear: 1.00,
      deltaNote: '+42% higher hydraulic wear than Tigersharks squadron average'
    },
    maintenanceHistory: [
      { date: '2026-08-14', task: '50-Hour Turnaround Inspection', depot: 'AFS Thanjavur Bay 2', status: 'Completed', notes: 'All fluids replenished' },
      { date: '2026-07-02', task: 'Hydraulic Filter Element Exchange', depot: '24 Base Repair Depot', status: 'Completed', notes: 'Trace micro-particulate observed' },
      { date: '2026-05-18', task: 'Avionics Software Patch v4.2 Installation', depot: 'HAL Technical Team', status: 'Completed', notes: 'Electronic countermeasures updated' }
    ]
  },
  'AC-103': {
    id: 'AC-103',
    tailNumber: 'LA-5018',
    type: 'Tejas LCA Mk1A',
    squadron: 'No. 45 Squadron "Flying Daggers"',
    base: 'Air Force Station Sulur',
    overallHealth: 48,
    riskLevel: 'CRITICAL',
    rul: '3.2 Days (25.6 Flight Hours)',
    rulConfidenceBand: '2.8 - 3.6 Days (Confidence: 98.6%)',
    missionReadiness: 'GROUNDED / MANDATORY INSPECTION',
    hoursFlown: 640.2,
    components: [
      { id: 'AC-103-ENG-BLISK', name: 'HP Turbine Stage 3 Blisk Disc', category: 'Propulsion', health: 32, risk: 'CRITICAL', rul: '3.2 Days', alert: 'Resonance spike at 3,420 Hz' },
      { id: 'AC-103-HYD', name: 'Digital Fly-By-Wire Hydraulics', category: 'Hydraulics', health: 94, risk: 'NORMAL', rul: '800 Hours', alert: 'Pressure 3,000 PSI stable' },
      { id: 'AC-103-RADAR', name: 'Uttam AESA Radar Suite', category: 'Avionics', health: 96, risk: 'NORMAL', rul: '950 Hours', alert: 'T/R modules 100% active' },
      { id: 'AC-103-AIRFRAME', name: 'Carbon-Composite Wing Skin', category: 'Airframe', health: 98, risk: 'NORMAL', rul: '7,350 Hours', alert: 'Zero delamination detected' }
    ],
    peerComparison: {
      metric: 'Turbine Thermal Fatigue vs LCA Fleet Baseline',
      thisAircraftWear: 2.15,
      fleetAverageWear: 1.00,
      deltaNote: '+115% severe thermal cycle excursions detected'
    },
    maintenanceHistory: [
      { date: '2026-09-01', task: 'F404 Engine Diagnostic Health Run', depot: 'AFS Sulur Engine Cell', status: 'Completed', notes: 'Turbine harmonic advisory noted' }
    ]
  }
};

const COMPONENT_DETAILS = {
  'AC-107-HYD-PUMP': {
    id: 'AC-107-HYD-PUMP',
    aircraftId: 'AC-107',
    name: 'Hydraulic Pump Unit HP-3B',
    category: 'Hydraulic Circuit 2 Primary Generation',
    currentHealth: 64,
    degradationRate: '-1.4% health score / 24 hours',
    riskLevel: 'HIGH_RISK',
    rulDays: 9.8,
    confidenceInterval: '8.6 to 11.0 Days (94.2% Confidence)',
    failureRisk: {
      risk7Days: 68,
      risk14Days: 94,
      risk30Days: 99.8
    },
    sensors: [
      {
        name: 'High-Frequency Pressure Ripple (kHz)',
        currentValue: '4.28 kHz',
        thresholdValue: '4.80 kHz',
        baselineValue: '1.80 kHz',
        weakSignalDetected: true,
        weakSignalNote: 'Harmonic peak shift identified at T-48h (trend persistence > 12 sorties)'
      },
      {
        name: 'Case Drain Fluid Temperature',
        currentValue: '86.4 °C',
        thresholdValue: '95.0 °C',
        baselineValue: '72.0 °C',
        weakSignalDetected: true,
        weakSignalNote: 'Progressive thermal drift (+14.4°C over 10 flight days)'
      },
      {
        name: 'Micro-Cavitation Acoustic Signature (dB)',
        currentValue: '78.2 dB',
        thresholdValue: '85.0 dB',
        baselineValue: '55.0 dB',
        weakSignalDetected: true,
        weakSignalNote: 'Impeller blade tip micro-pitting cavitation acoustic profile'
      },
      {
        name: 'Hydraulic System Delivery Pressure (PSI)',
        currentValue: '2,940 PSI',
        thresholdValue: '2,600 PSI min',
        baselineValue: '3,050 PSI',
        weakSignalDetected: false,
        weakSignalNote: 'Within nominal delivery limits (threshold sensor has NOT alarmed yet)'
      }
    ],
    explainableAi: [
      { factor: 'Harmonic Ripple Distortion (4,200 Hz)', contribution: 42, direction: 'RISK_INCREASE', description: 'Fluid shear and cavitation micro-pulses in 9-piston barrel assembly' },
      { factor: 'Case Drain Return Temperature Elevation', contribution: 28, direction: 'RISK_INCREASE', description: 'Internal slippage friction generating excess localized heat' },
      { factor: 'Combat High-G Sortie Load Accumulation', contribution: 18, direction: 'RISK_INCREASE', description: '6 sorties executed above 6.5G in last 14 days' },
      { factor: 'Fluid Chemical Cleanliness (ISO 4406)', contribution: -6, direction: 'RISK_DECREASE', description: 'Low particulate contamination delaying catastrophic scoring' }
    ],
    historicalCases: [
      {
        caseId: 'HIST-2024-SU30-142',
        aircraft: 'Su-30MKI Tail SB-142 (AFS Bareilly)',
        similarity: '96.2% Match',
        outcome: 'Run to failure past Day 10. Pump seized in flight at Day 11. Pilot initiated emergency divert to base. System metal contamination required ₹4.2 Cr full circuit flush and 14 days downtime.'
      },
      {
        caseId: 'HIST-2025-SU30-165',
        aircraft: 'Su-30MKI Tail SB-165 (AFS Thanjavur)',
        similarity: '93.8% Match',
        outcome: 'Proactive replacement executed at Day 8 in scheduled maintenance window. Zero flight cancellation, zero secondary contamination, 12 hours turnaround.'
      },
      {
        caseId: 'HIST-2023-LCA-5012',
        aircraft: 'Tejas LCA Tail LA-5012 (AFS Nal)',
        similarity: '89.4% Match',
        outcome: 'Shaft seal degradation caught at Day 9. Replaced under warranty with zero secondary damage.'
      }
    ]
  }
};

const FAULT_GRAPHS = {
  'AC-107-HYD-PUMP': {
    title: 'Fault Dependency Graph: AC-107 Hydraulic Pump Unit HP-3B',
    nodes: [
      { id: 'sym-1', type: 'SYMPTOM', label: 'Uncommanded Rudder Micro-Jitter', detail: 'Telemetry flags 14ms phase lag at Mach 1.4', x: 50, y: 100 },
      { id: 'sym-2', type: 'SYMPTOM', label: 'Hydraulic Circuit 2 Pressure Oscillation', detail: '4.28 kHz ripple frequency detected', x: 50, y: 240 },
      { id: 'cau-1', type: 'CAUSE', label: 'Impeller Vane Micro-Cavitation', detail: 'Pitting on high-pressure piston faces', x: 260, y: 170 },
      { id: 'cmp-1', type: 'COMPONENT', label: 'Hydraulic Pump HP-3B', detail: 'Serial #HP3B-9812 (Installed 420 hrs ago)', x: 480, y: 170 },
      { id: 'mod-1', type: 'FAILURE_MODE', label: 'Total Pump Seizure & Metal Ingress', detail: 'Catastrophic circuit debris contamination', x: 700, y: 170 },
      { id: 'mnt-1', type: 'MAINTENANCE', label: 'Depot Task #DP-HYD-42', detail: 'Replace pump assembly & ultrasonic line flush', x: 920, y: 100 },
      { id: 'spr-1', type: 'SPARE', label: 'HAL Part #HP-3B-MK2', detail: 'Stock: 1 (Reserved for AC-107), Demand: 3', x: 920, y: 240 }
    ],
    edges: [
      { from: 'sym-1', to: 'cau-1', label: 'Correlated' },
      { from: 'sym-2', to: 'cau-1', label: 'Direct Indicator' },
      { from: 'cau-1', to: 'cmp-1', label: 'Degrades' },
      { from: 'cmp-1', to: 'mod-1', label: 'Unmitigated Path' },
      { from: 'mod-1', to: 'mnt-1', label: 'Resolved By' },
      { from: 'mnt-1', to: 'spr-1', label: 'Requires' }
    ]
  }
};

const DIGITAL_TWIN = {
  'AC-107': {
    aircraftId: 'AC-107',
    tailNumber: 'SB-188',
    type: 'Su-30MKI Twin-Seat Air Superiority Fighter',
    overallHealth: 68,
    operatingCondition: {
      environmentalStress: 'Coastal High-Humidity (Corrosion Category C4)',
      gLoadCyclesLast30Days: 142,
      maxGRecorded: '+8.4G',
      engineReheatUsage: '14.2% of flight time'
    },
    wearCoordinates: [
      { component: 'Nose Radome & AESA Radar', x: 450, y: 50, health: 94, status: 'NORMAL' },
      { component: 'Canards & Foreplane FBW', x: 450, y: 180, health: 92, status: 'NORMAL' },
      { component: 'Hydraulic System 2 (Pump HP-3B)', x: 380, y: 250, health: 64, status: 'HIGH_RISK', alert: 'Micro-cavitation' },
      { component: 'Port Engine Turbofan AL-31FP', x: 420, y: 350, health: 88, status: 'NORMAL' },
      { component: 'Starboard Engine AL-31FP', x: 480, y: 350, health: 91, status: 'NORMAL' },
      { component: 'Port Wing Titanium Spar', x: 280, y: 320, health: 97, status: 'NORMAL' },
      { component: 'Starboard Wing Spar', x: 620, y: 320, health: 98, status: 'NORMAL' }
    ]
  }
};

const SIMULATOR_DATA = {
  aircraftId: 'AC-107',
  componentId: 'AC-107-HYD-PUMP',
  options: [
    {
      id: 'opt-a',
      name: 'Option A: Replace Immediately (Emergency AOG)',
      timeline: 'Immediate (Day 0)',
      projectedHealth: 99,
      catastrophicRisk: 0.1,
      fleetAvailabilityImpact: '-4.1% during immediate 18h downtime; mission disruption today',
      spareImpact: 'Consumes depot buffer (Depot stock drops to 0)',
      downtimeHours: 18,
      recommended: false,
      reasons: 'Disrupts 3 planned combat air patrol sorties today; causes depot stockout before scheduled supply batch arrives.'
    },
    {
      id: 'opt-b',
      name: 'Option B: Replace at Scheduled Window (Day 5)',
      timeline: 'Day 5 (08:00 - 20:00 IST)',
      projectedHealth: 98,
      catastrophicRisk: 4.8,
      fleetAvailabilityImpact: 'Zero unscheduled downtime; 100% of required sorties completed',
      spareImpact: 'Synchronized with incoming HAL batch arriving Day 4',
      downtimeHours: 12,
      recommended: true,
      reasons: 'Optimal balance: Safe 4.8-day buffer before the 9.8-day RUL cliff. Fits scheduled ground turnaround and pre-allocated spare shipment.'
    },
    {
      id: 'opt-c',
      name: 'Option C: Continue Operating (Run to Symptom)',
      timeline: 'Run past Day 9',
      projectedHealth: 18,
      catastrophicRisk: 78.4,
      fleetAvailabilityImpact: 'Severe unplanned AOG; potential loss of aircraft hydraulic control',
      spareImpact: 'Emergency courier required; severe secondary debris damage to flight actuators',
      downtimeHours: 72,
      recommended: false,
      reasons: 'Unacceptable flight safety risk. Breaches Air Force safety directives.'
    }
  ],
  counterfactualNote: 'Counterfactual Analysis: If replaced at Day 5 rather than immediately, the squadron preserves 3 vital coastal defense sorties with 95.2% safety confidence, saving ₹84 Lakhs in emergency logistics.'
};

const PLANNING_DATA = {
  algorithm: 'Sudarshan Multi-Constraint Priority Engine (Risk × Urgency × Constraints)',
  priorityQueue: [
    { rank: 1, aircraftId: 'AC-103', task: 'Replace Stage 3 Blisk', bay: 'AFS Sulur Bay 1', window: 'Immediate (Day 1)', priorityScore: 98.4, team: 'Propulsion Team Alpha' },
    { rank: 2, aircraftId: 'AC-107', task: 'Replace Hydraulic Pump HP-3B', bay: 'AFS Thanjavur Bay 3', window: 'Day 5 (08:00 - 20:00 IST)', priorityScore: 89.2, team: 'Hydraulics Team Bravo' },
    { rank: 3, aircraftId: 'AC-106', task: 'Recalibrate FBW Actuator', bay: 'AFS Gwalior Bay 2', window: 'Day 8 (Scheduled Turnaround)', priorityScore: 74.0, team: 'Avionics Team Charlie' },
    { rank: 4, aircraftId: 'AC-104', task: 'Flush AESA Radar Coolant', bay: 'AFS Jamnagar Bay 4', window: 'Day 12 (Routine)', priorityScore: 68.5, team: 'Radar Specialization Team' }
  ],
  ac107Explanation: 'Why Day 5 for AC-107: Selected to coincide with incoming HAL batch #HAL-2026-992 (delivery Day 4) and scheduled turnaround between Sortie #TK-402 and #TK-403, preventing hangar idle time.'
};

const SPARES_DATA = {
  summary: {
    totalCatalogItems: 48,
    shortageWarnings: 2,
    criticalShortages: 1,
    healthyInventory: 45
  },
  inventory: [
    {
      partNumber: 'HP-3B-MK2',
      name: 'Hydraulic Pump Assembly HP-3B',
      aircraft: 'Su-30MKI',
      inStock: 1,
      reserved: 1,
      expectedDemand30d: 3,
      leadTimeDays: 14,
      status: 'SHORTAGE_WARNING',
      procurement: 'P.O. #HAL-2026-992 (2 units in transit, ETA Day 4)'
    },
    {
      partNumber: 'AL31-TB-774',
      name: 'HP Turbine Stage 3 Blisk Disc',
      aircraft: 'Tejas LCA Mk1A / Su-30MKI',
      inStock: 0,
      reserved: 0,
      expectedDemand30d: 2,
      leadTimeDays: 28,
      status: 'CRITICAL_PROCUREMENT',
      procurement: 'Expedited DRDO/HAL Depot requisition active'
    },
    {
      partNumber: 'FBW-ACT-12',
      name: 'Fly-By-Wire Dual-Chamber Actuator',
      aircraft: 'Mirage 2000-5',
      inStock: 4,
      reserved: 1,
      expectedDemand30d: 2,
      leadTimeDays: 10,
      status: 'HEALTHY',
      procurement: 'Buffer adequate'
    },
    {
      partNumber: 'RAD-COOL-44',
      name: 'AESA Radar Liquid Cooling Seal Kit',
      aircraft: 'MiG-29UPG',
      inStock: 8,
      reserved: 1,
      expectedDemand30d: 2,
      leadTimeDays: 5,
      status: 'HEALTHY',
      procurement: 'Buffer adequate'
    }
  ]
};

const LEARNING_DATA = {
  modelName: 'Sudarshan-Aero-PINN-v4.2',
  trainedFlightHours: 254800,
  currentMetrics: {
    accuracy: 98.4,
    rmseDays: 1.14,
    rSquared: 0.94,
    falsePositiveRate: 2.1
  },
  modelDrift: {
    conceptDriftIndex: 0.042,
    dataDriftIndex: 0.089,
    status: 'STABLE_WITHIN_BOUNDS'
  },
  recentVerifications: [
    {
      aircraftId: 'AC-102',
      component: 'Turbofan Oil Scavenge Pump',
      date: '2026-09-18',
      preHealth: 62,
      postHealth: 99,
      recoveryPercent: 37,
      predictedRulDays: 14.2,
      actualFailureHorizonDays: 13.8,
      residualRisk: 0.8
    },
    {
      aircraftId: 'AC-108',
      component: 'Hydraulic Accumulator Diaphragm',
      date: '2026-08-30',
      preHealth: 58,
      postHealth: 98,
      recoveryPercent: 40,
      predictedRulDays: 18.0,
      actualFailureHorizonDays: 18.5,
      residualRisk: 1.1
    }
  ]
};

const AUDIT_DATA = {
  dataQuality: {
    completeness: 99.4,
    timestampJitterCorrected: 2,
    duplicateRecords: 0,
    edgeSyncStatus: 'SYNCHRONIZED (All 4 Forward Air Bases Online)'
  },
  logs: [
    { id: 'LOG-8812', timestamp: '2026-10-02 14:12:08 UTC', user: 'Squadron Leader R. Sharma', role: 'Command/Admin', action: 'Approved Maintenance Window for AC-107 on Day 5', target: 'AC-107 (SB-188)', result: 'SCHEDULED' },
    { id: 'LOG-8811', timestamp: '2026-10-02 13:45:22 UTC', user: 'Wing Commander V. Pillai', role: 'Maintenance Engineer', action: 'Ran What-If Simulation for Hydraulic Pump HP-3B', target: 'AC-107-HYD-PUMP', result: 'COMPLETED' },
    { id: 'LOG-8810', timestamp: '2026-10-02 12:30:15 UTC', user: 'Master Warrant Officer K. Singh', role: 'Technician', action: 'Downloaded Boroscope Diagnostic Checklist for AC-103', target: 'AC-103 (LA-5018)', result: 'DOWNLOADED' },
    { id: 'LOG-8809', timestamp: '2026-10-02 11:18:40 UTC', user: 'Flight Lieutenant A. Sen', role: 'Inventory Officer', action: 'Allocated 1 unit HP-3B-MK2 to AC-107 Work Order', target: 'Part #HP-3B-MK2', result: 'RESERVED' },
    { id: 'LOG-8808', timestamp: '2026-10-02 09:05:00 UTC', user: 'System Automated Edge Daemon', role: 'System', action: 'Synchronized telemetry packets from AFS Thanjavur depot', target: 'Central Command Server', result: 'SUCCESS' }
  ]
};

const ASSISTANT_KNOWLEDGE_BASE = [
  {
    keywords: ['ac-107', 'hydraulic', 'pump', 'cavitation', 'why', 'status'],
    answer: "Aircraft AC-107 (Su-30MKI, Tail SB-188, No. 222 Sqn 'Tigersharks') has an active HIGH RISK alert on Hydraulic Pump HP-3B. The AI predictive core detected micro-cavitation pressure ripple distortion at 4,200 Hz with a degradation rate of -1.4%/day. The Remaining Useful Life (RUL) is 9.8 Days (±1.2 Days). Case drain temperature has elevated by +14.4°C [Record ID: REC-2026-HYD-041]. Proactive replacement is planned for Day 5 to synchronize with incoming HAL spare shipment [P.O. #HAL-2026-992]."
  },
  {
    keywords: ['ac-103', 'blisk', 'turbine', 'engine', 'crack'],
    answer: "Aircraft AC-103 (Tejas LCA Mk1A, Tail LA-5018, No. 45 Sqn) is currently under CRITICAL status due to a detected micro-crack on HP Turbine Stage 3 Blisk [Record ID: REC-2026-ENG-089]. The vibration spectral anomaly at 3,420 Hz reached 4.8 mm/s with an estimated RUL of only 3.2 Days (25.6 flight hours). The aircraft is restricted from supersonic combat sorties until Boroscope inspection is completed at AFS Sulur [Task #DP-ENG-019]."
  },
  {
    keywords: ['spares', 'shortage', 'stock', 'inventory'],
    answer: "Current spare inventory indicates 2 items on shortage early warning: (1) Hydraulic Pump Unit HP-3B [Part #HP-3B-MK2]: 1 in stock, 1 reserved for AC-107, 2 arriving on Day 4 via P.O. #HAL-2026-992. (2) HP Turbine Stage 3 Blisk [Part #AL31-TB-774]: 0 in stock, lead time 28 days [Requisition ID: REQ-DRDO-2026-012]. All other 45 line-replaceable units have adequate depot buffers."
  },
  {
    keywords: ['planning', 'schedule', 'gantt', 'why day 5', 'day 5'],
    answer: "AC-107 is scheduled for pump replacement on Day 5 at AFS Thanjavur Bay 3 based on the Multi-Constraint Priority Engine (Risk × Urgency × Constraints). Day 5 was selected because: (1) It preserves 3 vital operational coastal defense sorties; (2) Replacement occurs 4.8 days prior to the 9.8-day critical failure cliff; (3) Incoming HAL spare batch arrives on Day 4, ensuring zero hangar idle time [Optimization Dossier: PLN-2026-SUD-107]."
  }
];

module.exports = {
  FLEET_DATA,
  AIRCRAFT_DETAILS,
  COMPONENT_DETAILS,
  FAULT_GRAPHS,
  DIGITAL_TWIN,
  SIMULATOR_DATA,
  PLANNING_DATA,
  SPARES_DATA,
  LEARNING_DATA,
  AUDIT_DATA,
  ASSISTANT_KNOWLEDGE_BASE
};

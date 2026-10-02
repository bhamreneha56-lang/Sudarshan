/**
 * DRISHTI 3D — AIRCRAFT HEALTH EXPLORER DATA ENGINE
 * PS 26249: Air Power – Predictive Maintenance & Fleet Availability
 * 
 * Provides comprehensive 3D mesh mappings, subsystem part specifications,
 * multi-horizon probabilistic failure predictions, XAI attributions,
 * live telemetry sensors, and maintenance readiness.
 */

const DRISHTI_AIRCRAFT = {
  'AC-107': {
    aircraftId: 'AC-107',
    tailNumber: 'SB-188',
    name: 'Sukhoi Su-30MKI (Flanker-H Block 20)',
    type: 'Su-30MKI',
    squadron: 'No. 222 Squadron "Tigersharks"',
    base: 'AFS Thanjavur (Forward Base Node 1)',
    role: 'Air Superiority & Maritime Deep Strike',
    manufactureYear: 2018,
    engineCount: 2,
    engineType: 'Saturn / HAL AL-31FP Thrust-Vectoring Turbofans',
    configuration: 'BVR Air-to-Air + BrahMos-A Maritime Strikecapable',
    overallHealth: 68,
    alertLevel: 'HIGH_RISK',
    operatingStatus: {
      flightHours: 1482.4,
      flightCycles: 946,
      lastFlight: '2026-10-01 16:30 IST (Patrol Sortie #TK-401)',
      status: 'AT_RISK',
      statusLabel: 'At Risk (Managed Sorties Permitted)',
      nextMission: 'CAP Sortie #TK-402 (Scheduled Day 2, 06:00 IST)'
    },
    maintenanceSummary: {
      lastMaintenance: '2026-08-14 (50-Hour Turnaround Inspection)',
      nextPlannedWindow: 'Day 5 (08:00 - 20:00 IST) &bull; Bay 3 AFS Thanjavur',
      openTasks: 2,
      pastFaultsCount: 4,
      recurrenceFlags: 'Recurrence Pattern detected: Hydraulic micro-jitter observed on Tail SB-142 in 2024'
    },
    predictiveSummary: {
      risk7d: 68,
      risk14d: 94,
      risk30d: 99.8,
      predictedFaults: [
        'Hydraulic Pump HP-3B impeller cavitation wear',
        'Circuit 2 pressure ripple harmonic resonance (4,200 Hz)'
      ],
      topAtRiskComponents: [
        { name: 'Hydraulic Pump HP-3B', id: 'AC-107-HYD-PUMP', risk: 'HIGH_RISK', health: 64, rul: '9.8 Days' },
        { name: 'Port Engine (AL-31FP Eng #1)', id: 'AC-107-ENG-1', risk: 'NORMAL', health: 88, rul: '340 Hours' },
        { name: 'Starboard Engine (AL-31FP Eng #2)', id: 'AC-107-ENG-2', risk: 'NORMAL', health: 91, rul: '390 Hours' }
      ],
      lowestRul: '9.8 Days (78.4 Flight Hours)',
      modelConfidence: 94.2
    },
    sparesReadiness: {
      requiredSpares: 'HAL Part #HP-3B-MK2 (Hydraulic Pump Assembly)',
      stockStatus: '1 in stock (Reserved for AC-107)',
      shortageWarning: 'SHORTAGE EARLY WARNING: Buffer stock low; 2 units arriving Day 4 via P.O. #HAL-2026-992'
    },
    healthTrend30d: [95, 94, 93, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68]
  },

  'AC-103': {
    aircraftId: 'AC-103',
    tailNumber: 'LA-5018',
    name: 'HAL Tejas LCA Mk1A',
    type: 'Tejas LCA Mk1A',
    squadron: 'No. 45 Squadron "Flying Daggers"',
    base: 'AFS Sulur',
    role: 'Light Multi-Role Combat & Point Defense',
    manufactureYear: 2022,
    engineCount: 1,
    engineType: 'General Electric / HAL F404-IN20 Afterburning Turbofan',
    configuration: 'Uttam AESA Radar + Digital EW Suite',
    overallHealth: 48,
    alertLevel: 'CRITICAL',
    operatingStatus: {
      flightHours: 640.2,
      flightCycles: 412,
      lastFlight: '2026-09-30 11:15 IST (Test Cell Diagnostic Run)',
      status: 'CRITICAL_AOG',
      statusLabel: 'Grounded / Mandatory Depot Inspection',
      nextMission: 'GROUNDED &bull; Sorties suspended until Boroscope inspection'
    },
    maintenanceSummary: {
      lastMaintenance: '2026-09-01 (Engine Diagnostic Health Run)',
      nextPlannedWindow: 'Immediate (Day 1) &bull; Engine Cell AFS Sulur',
      openTasks: 3,
      pastFaultsCount: 2,
      recurrenceFlags: 'High-thermal excursion signature observed during supersonic break'
    },
    predictiveSummary: {
      risk7d: 98.4,
      risk14d: 99.9,
      risk30d: 100.0,
      predictedFaults: [
        'HP Turbine Stage 3 Blisk root micro-crack (3,420 Hz resonance)',
        'Combustion chamber thermal gradient excursion (+42°C)'
      ],
      topAtRiskComponents: [
        { name: 'HP Turbine Stage 3 Blisk', id: 'AC-103-ENG-BLISK', risk: 'CRITICAL', health: 32, rul: '3.2 Days' },
        { name: 'Digital Fly-By-Wire Hydraulics', id: 'AC-103-HYD', risk: 'NORMAL', health: 94, rul: '800 Hours' }
      ],
      lowestRul: '3.2 Days (25.6 Flight Hours)',
      modelConfidence: 98.6
    },
    sparesReadiness: {
      requiredSpares: 'Part #AL31-TB-774 (HP Turbine Stage 3 Blisk Disc)',
      stockStatus: '0 in stock (CRITICAL PROCUREMENT)',
      shortageWarning: 'CRITICAL SHORTAGE: Expedited requisition #REQ-DRDO-2026-012 active; lead time 28 days'
    },
    healthTrend30d: [92, 90, 88, 85, 80, 75, 68, 62, 56, 52, 48]
  }
};

// Full part specifications for 3D explorer
const DRISHTI_PARTS_LIBRARY = {
  'AC-107': [
    {
      componentId: 'AC-107-HYD-PUMP',
      meshKey: 'hydraulic_pump',
      name: 'Hydraulic Pump Unit HP-3B',
      partName: 'Hydraulic Variable-Displacement Axial Piston Pump',
      category: 'Hydraulic Power Generation',
      health: 64,
      alertLevel: 'HIGH_RISK',
      hotspotPosition: { x: -0.6, y: 0.1, z: -0.2 },
      specification: {
        partNumber: 'HP-3B-MK2-V4',
        manufacturer: 'Hindustan Aeronautics Limited (HAL Accessories Div, Lucknow)',
        category: 'Variable-Displacement Axial 9-Piston Pump',
        function: 'Generates primary 3,000 PSI hydraulic power for Port Flight Controls, Rudders & Canard Actuators',
        installedLocation: 'Left Engine Accessory Drive Gearbox (Fuselage Station FS-420)',
        installationDate: '2025-11-12',
        componentAge: '11 Months',
        totalOperatingHours: 420.5,
        flightCycles: 268,
        lastOverhaul: '2026-04-10 (Bench Calibrated at 24 Base Repair Depot)',
        ratedLimits: {
          operatingPressure: '3,000 PSI nominal (3,250 PSI relief limit)',
          flowRate: '85 L/min at 4,000 RPM',
          maxTemperature: '95.0 °C continuous (110 °C intermittent)',
          maxVibration: '4.80 mm/s RMS (Nominal < 2.5 mm/s)'
        },
        designLife: '1,500 Operating Hours',
        currentConfig: 'Quadplex redundant Circuit 2 primary generation'
      },
      failurePrediction: {
        risk7d: 68,
        risk14d: 94,
        risk30d: 99.8,
        rul: '9.8 Days',
        rulConfidenceInterval: '8.6 to 11.0 Days',
        predictionConfidence: 94.2,
        healthScore: 64,
        degradationRate: '-1.4% health score / 24 hours (Accelerating)',
        futureForecast30d: [64, 62.6, 61.2, 59.8, 58.4, 57.0, 55.4, 53.8, 52.0, 48.0, 42.0, 34.0, 24.0, 15.0, 5.0],
        anomalies: [
          { timestamp: '2026-09-29 14:10 UTC', signal: 'Pressure Ripple Phase Shift', detail: 'Harmonic frequency shift observed at 4,200 Hz (+14% amplitude)' },
          { timestamp: '2026-10-01 09:45 UTC', signal: 'Case Drain Thermal Drift', detail: 'Drain temperature reached 86.4°C (+14.4°C above baseline)' },
          { timestamp: '2026-10-02 08:30 UTC', signal: 'Cavitation Acoustic Spike', detail: 'Impeller micro-pitting acoustic signature at 78.2 dB' }
        ],
        explainableAi: {
          sentence: 'Rising pressure ripple harmonics (4,200 Hz) and elevated case drain return temperature are accelerating micro-pitting fatigue.',
          factors: [
            { factor: 'Harmonic Ripple Distortion (4,200 Hz)', contribution: 42, direction: 'UP' },
            { factor: 'Case Drain Return Temperature (+14.4°C)', contribution: 28, direction: 'UP' },
            { factor: 'High-G Combat Sortie Cycles (>6.5G)', contribution: 18, direction: 'UP' },
            { factor: 'Fluid Chemical Cleanliness (ISO 4406)', contribution: -6, direction: 'DOWN' }
          ]
        },
        failureMode: 'Impeller barrel micro-cavitation leading to piston seizure & metal swarf contamination',
        rootCause: 'Fluid shear stress and localized pressure drop during high-roll rate maneuvers'
      },
      liveSensors: [
        { name: 'Discharge Pressure', value: '2,940 PSI', nominal: '3,000 PSI', status: 'WARN', unit: 'PSI', history: [3010, 2995, 2980, 2960, 2940] },
        { name: 'Case Drain Temp', value: '86.4 °C', nominal: '72.0 °C', status: 'HIGH', unit: '°C', history: [74, 77, 80, 83, 86.4] },
        { name: 'Acoustic Cavitation dB', value: '78.2 dB', nominal: '55.0 dB', status: 'HIGH', unit: 'dB', history: [58, 63, 69, 74, 78.2] },
        { name: 'Drive Shaft RPM', value: '3,850 RPM', nominal: '3,800 RPM', status: 'OK', unit: 'RPM', history: [3810, 3830, 3840, 3845, 3850] }
      ],
      maintenanceAndSpares: {
        history: [
          { date: '2026-07-02', event: 'Filter element replaced; microscopic brass flecks noted in filter bowl' },
          { date: '2026-04-10', event: 'Bench pressure test passed; seal kit refreshed' }
        ],
        similarCases: [
          { caseId: 'HIST-2024-SU30-142', aircraft: 'Su-30MKI (SB-142)', outcome: 'Run past Day 10. Pump seized at Day 11; required ₹4.2 Cr full circuit flush and 14 days AOG.' },
          { caseId: 'HIST-2025-SU30-165', aircraft: 'Su-30MKI (SB-165)', outcome: 'Proactively replaced on Day 8 in scheduled window. Zero operational cancellation.' },
          { caseId: 'HIST-2023-LCA-5012', aircraft: 'Tejas LCA (LA-5012)', outcome: 'Shaft seal degradation caught at Day 9; replaced with zero secondary damage.' }
        ],
        recommendedAction: 'Execute Boroscope optical inspection and replace pump assembly during scheduled turnaround.',
        recommendedWindow: 'Day 5 (08:00 - 20:00 IST) &bull; Bay 3 AFS Thanjavur',
        requiredSpare: {
          partNumber: 'HP-3B-MK2',
          name: 'Hydraulic Pump Assembly HP-3B',
          inStock: 1,
          reserved: 1,
          leadTime: '14 Days',
          shortageWarning: 'SHORTAGE WARNING: 1 unit reserved for AC-107; 2 arriving Day 4'
        }
      }
    },

    {
      componentId: 'AC-107-ENG-1',
      meshKey: 'engine_left',
      name: 'Port AL-31FP Turbofan (Eng #1)',
      partName: 'Twin-Spool Afterburning Turbofan with 2D Thrust Vectoring',
      category: 'Propulsion',
      health: 88,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: -0.4, y: 0.0, z: -1.8 },
      specification: {
        partNumber: 'AL-31FP-SERIES-4',
        manufacturer: 'HAL Koraput Engine Division / UMPO',
        category: 'Twin-Spool Low-Bypass Turbofan',
        function: 'Port primary propulsion delivering 122.5 kN dry / 245 kN afterburner thrust',
        installedLocation: 'Port Nacelle Bay',
        installationDate: '2024-03-15',
        componentAge: '2.5 Years',
        totalOperatingHours: 720.0,
        flightCycles: 480,
        lastOverhaul: '2025-12-05 (100-Hr Hot Section Inspection)',
        ratedLimits: {
          maxEgt: '850.0 °C continuous (920 °C combat reheat)',
          maxN1Spool: '102.5% max RPM',
          maxN2Spool: '101.8% max core RPM',
          vibrationLimit: '4.5 mm/s'
        },
        designLife: '1,500 Flight Hours before major overhaul',
        currentConfig: 'All-axis thrust vectoring nozzle enabled'
      },
      failurePrediction: {
        risk7d: 8.2,
        risk14d: 14.5,
        risk30d: 22.0,
        rul: '340.0 Hours',
        rulConfidenceInterval: '320 - 360 Hours',
        predictionConfidence: 96.5,
        healthScore: 88,
        degradationRate: '-0.2% health score / 100 flight hours (Nominal wear)',
        futureForecast30d: [88, 87.9, 87.8, 87.6, 87.5, 87.4, 87.2, 87.0],
        anomalies: [],
        explainableAi: {
          sentence: 'Turbofan exhaust temperatures and bearing harmonic vibrations align within design baseline bounds.',
          factors: [
            { factor: 'Combustion Chamber Thermal Balance', contribution: -12, direction: 'DOWN' },
            { factor: 'Lube Oil Pressure & Viscosity', contribution: -8, direction: 'DOWN' },
            { factor: 'Turbine Blade Creep Life Consumed', contribution: 4, direction: 'UP' }
          ]
        },
        failureMode: 'Normal blade hot-gas oxidation',
        rootCause: 'Operational thermal duty cycles'
      },
      liveSensors: [
        { name: 'Exhaust Gas Temp', value: '740 °C', nominal: '735 °C', status: 'OK', unit: '°C', history: [732, 735, 738, 739, 740] },
        { name: 'Spool N1 Speed', value: '96.8 %', nominal: '96.5 %', status: 'OK', unit: '%', history: [96.2, 96.5, 96.7, 96.8, 96.8] },
        { name: 'Spool N2 Speed', value: '98.2 %', nominal: '98.0 %', status: 'OK', unit: '%', history: [97.8, 98.0, 98.1, 98.2, 98.2] },
        { name: 'Bearing Vibration', value: '2.1 mm/s', nominal: '2.0 mm/s', status: 'OK', unit: 'mm/s', history: [1.9, 2.0, 2.0, 2.1, 2.1] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-08-14', event: '50-hour bore inspection completed. No thermal hotspots.' }],
        similarCases: [{ caseId: 'HIST-2025-SU30-112', aircraft: 'Su-30MKI (SB-112)', outcome: 'Nominal 1000 hr run completed without unplanned maintenance.' }],
        recommendedAction: 'Continue nominal mission operations; routine inspection at 750 flight hours.',
        recommendedWindow: 'Next routine window (Day 28)',
        requiredSpare: {
          partNumber: 'AL31-FLT-02',
          name: 'Engine Fuel & Lube Filter Kit',
          inStock: 6,
          reserved: 0,
          leadTime: '3 Days',
          shortageWarning: 'BUFFER ADEQUATE'
        }
      }
    },

    {
      componentId: 'AC-107-ENG-2',
      meshKey: 'engine_right',
      name: 'Starboard AL-31FP Turbofan (Eng #2)',
      partName: 'Twin-Spool Afterburning Turbofan with 2D Thrust Vectoring',
      category: 'Propulsion',
      health: 91,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: 0.4, y: 0.0, z: -1.8 },
      specification: {
        partNumber: 'AL-31FP-SERIES-4',
        manufacturer: 'HAL Koraput Engine Division',
        category: 'Twin-Spool Low-Bypass Turbofan',
        function: 'Starboard propulsion delivering 122.5 kN dry / 245 kN afterburner thrust',
        installedLocation: 'Starboard Nacelle Bay',
        installationDate: '2024-03-15',
        componentAge: '2.5 Years',
        totalOperatingHours: 720.0,
        flightCycles: 480,
        lastOverhaul: '2025-12-05',
        ratedLimits: { maxEgt: '850.0 °C', maxN1Spool: '102.5%', maxN2Spool: '101.8%', maxVibration: '4.5 mm/s' },
        designLife: '1,500 Flight Hours',
        currentConfig: 'All-axis thrust vectoring nozzle enabled'
      },
      failurePrediction: {
        risk7d: 6.0,
        risk14d: 11.2,
        risk30d: 18.0,
        rul: '390.0 Hours',
        rulConfidenceInterval: '370 - 410 Hours',
        predictionConfidence: 97.2,
        healthScore: 91,
        degradationRate: '-0.15% health score / 100 flight hours',
        futureForecast30d: [91, 90.9, 90.8, 90.7, 90.6],
        anomalies: [],
        explainableAi: {
          sentence: 'Starboard engine operates in optimal thermal balance with symmetric thrust profiles.',
          factors: [{ factor: 'Symmetric Turbine Thermal EGT', contribution: -14, direction: 'DOWN' }]
        },
        failureMode: 'Nominal wear',
        rootCause: 'Normal operational duty'
      },
      liveSensors: [
        { name: 'Exhaust Gas Temp', value: '732 °C', nominal: '730 °C', status: 'OK', unit: '°C', history: [728, 730, 731, 732, 732] },
        { name: 'Spool N1 Speed', value: '96.5 %', nominal: '96.5 %', status: 'OK', unit: '%', history: [96.0, 96.3, 96.5, 96.5, 96.5] },
        { name: 'Bearing Vibration', value: '1.8 mm/s', nominal: '2.0 mm/s', status: 'OK', unit: 'mm/s', history: [1.7, 1.8, 1.8, 1.8, 1.8] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-08-14', event: 'Routine hot section check nominal.' }],
        similarCases: [],
        recommendedAction: 'Continue normal flight operations.',
        recommendedWindow: 'Day 28 routine cycle',
        requiredSpare: { partNumber: 'AL31-FLT-02', name: 'Engine Filter Kit', inStock: 6, reserved: 0, leadTime: '3 Days', shortageWarning: 'ADEQUATE' }
      }
    },

    {
      componentId: 'AC-107-RADAR',
      meshKey: 'nose_radome',
      name: 'Bars N011M PESA Radar & Radome',
      partName: 'Passive Electronically Scanned Array Radar + Environmental Cooling',
      category: 'Avionics & Sensors',
      health: 94,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: 0.0, y: 0.1, z: 2.2 },
      specification: {
        partNumber: 'BARS-N011M-MOD2',
        manufacturer: 'NIIP / HAL Hyderabad Avionics Division',
        category: 'High-Power Phased Array Radar',
        function: 'Long-range air-to-air tracking (400 km) and air-to-surface maritime synthetic aperture radar',
        installedLocation: 'Forward Fuselage Nose Radome (FS-80)',
        installationDate: '2023-08-20',
        componentAge: '3.1 Years',
        totalOperatingHours: 980.0,
        flightCycles: 610,
        lastOverhaul: '2025-10-15',
        ratedLimits: { receiverTemp: '65.0 °C max', coolantPressure: '42 PSI nominal', beamTransmission: '99.2% nominal' },
        designLife: '2,500 Operating Hours',
        currentConfig: 'Liquid dielectric cooling active'
      },
      failurePrediction: {
        risk7d: 4.5,
        risk14d: 8.0,
        risk30d: 14.0,
        rul: '650.0 Hours',
        rulConfidenceInterval: '620 - 680 Hours',
        predictionConfidence: 98.1,
        healthScore: 94,
        degradationRate: '-0.1% health score / 100 flight hours',
        futureForecast30d: [94, 93.9, 93.8, 93.7],
        anomalies: [],
        explainableAi: { sentence: 'Cooling loop thermal stabilization and high T/R module array efficiency confirm healthy operation.', factors: [] },
        failureMode: 'Nominal semiconductor aging',
        rootCause: 'RF transmission cycles'
      },
      liveSensors: [
        { name: 'Coolant Loop Pressure', value: '41.8 PSI', nominal: '42.0 PSI', status: 'OK', unit: 'PSI', history: [41.5, 41.6, 41.7, 41.8, 41.8] },
        { name: 'Array Core Temp', value: '54.2 °C', nominal: '55.0 °C', status: 'OK', unit: '°C', history: [53, 53.5, 54, 54.2, 54.2] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-06-20', event: 'Dielectric coolant fluid topped up. Radome microwave transparency test passed.' }],
        similarCases: [],
        recommendedAction: 'Inspect dielectric seal during next Depot A-Check.',
        recommendedWindow: 'Scheduled A-Check (Day 45)',
        requiredSpare: { partNumber: 'RAD-COOL-44', name: 'AESA Radar Seal Kit', inStock: 8, reserved: 0, leadTime: '5 Days', shortageWarning: 'ADEQUATE' }
      }
    },

    {
      componentId: 'AC-107-GEARBOX',
      meshKey: 'gearbox',
      name: 'Accessory Drive Gearbox KSA-2',
      partName: 'High-Speed Bevel Accessory Drive Gearbox',
      category: 'Mechanical Power Transmission',
      health: 89,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: -0.5, y: -0.1, z: -0.6 },
      specification: {
        partNumber: 'KSA-2-GB-01',
        manufacturer: 'HAL Koraput Mechanical Division',
        category: 'Multi-Spool Bevel Gear Drive',
        function: 'Drives hydraulic pumps, AC generators, and engine starter-generator from main turbofan spool',
        installedLocation: 'Lower Fuselage Mid-Bay',
        installationDate: '2023-01-10',
        componentAge: '3.7 Years',
        totalOperatingHours: 1120.0,
        flightCycles: 710,
        lastOverhaul: '2025-05-18',
        ratedLimits: { oilTemp: '90.0 °C max', gearMeshVib: '3.8 mm/s', oilPressure: '55 PSI' },
        designLife: '2,000 Flight Hours',
        currentConfig: 'Synthetic ester lubrication'
      },
      failurePrediction: {
        risk7d: 7.0, risk14d: 13.0, risk30d: 21.0, rul: '480.0 Hours', rulConfidenceInterval: '450 - 510 Hours',
        predictionConfidence: 95.8, healthScore: 89, degradationRate: '-0.25%/100h',
        futureForecast30d: [89, 88.8, 88.6, 88.4], anomalies: [],
        explainableAi: { sentence: 'Gear mesh frequencies and oil debris sensor reporting clean baseline values.', factors: [] },
        failureMode: 'Gear tooth fatigue', rootCause: 'Mechanical wear'
      },
      liveSensors: [
        { name: 'Gearbox Lube Pressure', value: '54.5 PSI', nominal: '55.0 PSI', status: 'OK', unit: 'PSI', history: [54, 54.2, 54.3, 54.5, 54.5] },
        { name: 'Lube Oil Temp', value: '76.8 °C', nominal: '75.0 °C', status: 'OK', unit: '°C', history: [75, 75.5, 76, 76.5, 76.8] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-05-18', event: 'Lube oil drain sample tested clean.' }],
        similarCases: [],
        recommendedAction: 'Routine oil spectrographic check at 1,200 hrs.',
        recommendedWindow: 'Day 35',
        requiredSpare: { partNumber: 'GB-SEAL-88', name: 'Gearbox Gasket Set', inStock: 4, reserved: 0, leadTime: '8 Days', shortageWarning: 'ADEQUATE' }
      }
    },

    {
      componentId: 'AC-107-ELECTRICAL',
      meshKey: 'generator_electrical',
      name: 'Integrated Drive Generator (IDG)',
      partName: '40 kVA 115V AC Brushless Integrated Drive Generator',
      category: 'Electrical Power',
      health: 93,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: 0.5, y: -0.1, z: -0.6 },
      specification: {
        partNumber: 'IDG-40K-MK3',
        manufacturer: 'HAL / Lucas-TVS Aerospace',
        category: 'Constant-Speed Drive Electrical Generator',
        function: 'Powers avionics, radar, fly-by-wire computers, and fuel boost pumps',
        installedLocation: 'Starboard Accessory Bay',
        installationDate: '2024-02-14',
        componentAge: '2.6 Years',
        totalOperatingHours: 850.0,
        flightCycles: 540,
        lastOverhaul: '2025-11-02',
        ratedLimits: { outputVoltage: '115V AC ± 3V', frequency: '400 Hz ± 5 Hz', statorTemp: '120.0 °C max' },
        designLife: '2,000 Hours',
        currentConfig: 'Synchronized dual-bus architecture'
      },
      failurePrediction: {
        risk7d: 5.0, risk14d: 9.5, risk30d: 16.0, rul: '580.0 Hours', rulConfidenceInterval: '550 - 610 Hours',
        predictionConfidence: 97.0, healthScore: 93, degradationRate: '-0.15%/100h',
        futureForecast30d: [93, 92.9, 92.8], anomalies: [],
        explainableAi: { sentence: 'Electrical output voltage ripple and stator temperatures are fully within military MIL-STD-704 specifications.', factors: [] },
        failureMode: 'Bearing wear in constant-speed transmission', rootCause: 'Thermal cycles'
      },
      liveSensors: [
        { name: 'AC Output Voltage', value: '115.2 V', nominal: '115.0 V', status: 'OK', unit: 'V', history: [115.0, 115.1, 115.1, 115.2, 115.2] },
        { name: 'Frequency', value: '400.1 Hz', nominal: '400.0 Hz', status: 'OK', unit: 'Hz', history: [400.0, 400.0, 400.1, 400.1, 400.1] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-07-10', event: 'Brushless exciter diode bench verified.' }],
        similarCases: [],
        recommendedAction: 'Routine resistance check at next scheduled turnaround.',
        recommendedWindow: 'Day 30',
        requiredSpare: { partNumber: 'IDG-KIT-14', name: 'IDG Maintenance Kit', inStock: 3, reserved: 0, leadTime: '12 Days', shortageWarning: 'ADEQUATE' }
      }
    },

    {
      componentId: 'AC-107-FUEL',
      meshKey: 'fuel_system',
      name: 'Fuel System & Boost Pumps',
      partName: 'Cross-Feed Fuel Metering & High-Capacity Boost Pump System',
      category: 'Fuel & Fluid Distribution',
      health: 96,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: 0.0, y: 0.0, z: -0.2 },
      specification: {
        partNumber: 'FUEL-SYS-SU30-MK2',
        manufacturer: 'HAL Aircraft Division, Nashik',
        category: 'Pressurized Multi-Cell Fuel Distribution',
        function: 'Transports 9,400 kg internal fuel across 5 fuselage tanks and wing cells to dual AL-31FP engines',
        installedLocation: 'Fuselage Tanks #1 through #5 and Wing Cells',
        installationDate: '2023-05-10',
        componentAge: '3.4 Years',
        totalOperatingHours: 1240.0,
        flightCycles: 820,
        lastOverhaul: '2025-08-14',
        ratedLimits: { deliveryPressure: '65 PSI nominal', flowRate: '12,000 L/hr max', waterContamination: '< 15 PPM' },
        designLife: '4,000 Flight Hours',
        currentConfig: 'In-flight refueling probe active'
      },
      failurePrediction: {
        risk7d: 3.0, risk14d: 5.5, risk30d: 9.0, rul: '890.0 Hours', rulConfidenceInterval: '860 - 920 Hours',
        predictionConfidence: 99.0, healthScore: 96, degradationRate: '-0.08%/100h',
        futureForecast30d: [96, 95.9, 95.9], anomalies: [],
        explainableAi: { sentence: 'Dual electric boost pump delivery pressures and tank sump moisture sensors report nominal status.', factors: [] },
        failureMode: 'Booster pump impeller cavitation', rootCause: 'Fuel vapor locking'
      },
      liveSensors: [
        { name: 'Fuel Rail Pressure', value: '64.8 PSI', nominal: '65.0 PSI', status: 'OK', unit: 'PSI', history: [64.6, 64.7, 64.8, 64.8, 64.8] },
        { name: 'Fuel Temp', value: '28.4 °C', nominal: '30.0 °C', status: 'OK', unit: '°C', history: [26, 27, 27.5, 28, 28.4] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-09-12', event: 'Water sump drained. Zero microbial or moisture contamination.' }],
        similarCases: [],
        recommendedAction: 'Routine pre-flight fuel strainer check.',
        recommendedWindow: 'Daily Flight Line Turnaround',
        requiredSpare: { partNumber: 'PUMP-BST-99', name: 'Submerged Fuel Boost Pump', inStock: 5, reserved: 0, leadTime: '6 Days', shortageWarning: 'ADEQUATE' }
      }
    },

    {
      componentId: 'AC-107-WINGS',
      meshKey: 'wings_controls',
      name: 'Titanium Wing Spars & Elevons',
      partName: 'Swept Wing Main Titanium Box Beam & Fly-By-Wire Flight Controls',
      category: 'Airframe Structural & Control Surfaces',
      health: 97,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: -1.8, y: 0.0, z: -0.5 },
      specification: {
        partNumber: 'WING-SPAR-TI-SU30',
        manufacturer: 'HAL / MIDHANI (Superalloy Titanium Division)',
        category: 'Electron-Beam Welded Titanium Alloy Structure',
        function: 'Carries primary aerodynamic lift and High-G structural loads (+9.0G to -3.0G limits)',
        installedLocation: 'Main Wing Center Box',
        installationDate: '2018-06-01',
        componentAge: '8.3 Years',
        totalOperatingHours: 1482.4,
        flightCycles: 946,
        lastOverhaul: '2024-11-20 (Ultrasound NDT Inspection)',
        ratedLimits: { yieldStrength: '950 MPa', maxGExceedance: '+9.0G / -3.0G', fatigueLife: '8,000 Flight Hours' },
        designLife: '8,000 Flight Hours (Life consumed: 18.5%)',
        currentConfig: 'Strain gauge fiber-optic telemetry active'
      },
      failurePrediction: {
        risk7d: 1.5, risk14d: 3.0, risk30d: 5.0, rul: '6,517.6 Hours', rulConfidenceInterval: '6,400 - 6,650 Hours',
        predictionConfidence: 99.4, healthScore: 97, degradationRate: '-0.02%/100h',
        futureForecast30d: [97, 97, 97], anomalies: [],
        explainableAi: { sentence: 'Wing spar strain gauge telemetry confirms structural fatigue is within 18.5% of design service envelope.', factors: [] },
        failureMode: 'Metal fatigue micro-cracking at fastener holes', rootCause: 'Transonic G-load cycles'
      },
      liveSensors: [
        { name: 'Wing Root Strain', value: '2.14 G', nominal: '2.00 G', status: 'OK', unit: 'G', history: [2.0, 2.1, 2.1, 2.14, 2.14] },
        { name: 'Deflection Index', value: '14.2 mm', nominal: '15.0 mm', status: 'OK', unit: 'mm', history: [13.8, 14.0, 14.1, 14.2, 14.2] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2024-11-20', event: 'Ultrasound non-destructive testing (NDT) passed with zero delamination.' }],
        similarCases: [],
        recommendedAction: 'Next scheduled ultrasound NDT at 2,000 flight hours.',
        recommendedWindow: 'Depot Turnaround Cycle',
        requiredSpare: { partNumber: 'SPAR-TI-KIT', name: 'Fastener & Inspection Kit', inStock: 12, reserved: 0, leadTime: '2 Days', shortageWarning: 'ADEQUATE' }
      }
    },

    {
      componentId: 'AC-107-GEAR',
      meshKey: 'landing_gear',
      name: 'Tricycle Hydraulic Landing Gear',
      partName: 'Heavy-Duty Shock-Absorbing Landing Gear & Multi-Disc Carbon Brakes',
      category: 'Mechanical & Hydraulic Actuation',
      health: 95,
      alertLevel: 'NORMAL',
      hotspotPosition: { x: 0.0, y: -0.6, z: 0.8 },
      specification: {
        partNumber: 'LG-SU30-HD-MK2',
        manufacturer: 'HAL / Samtel Avionics & Landing Systems',
        category: 'Twin-Wheel Nose & Single Heavy-Duty Main Struts',
        function: 'Absorbs carrier-deck equivalent high-sink-rate landings up to 6.8 m/s',
        installedLocation: 'Nose Well & Mid-Fuselage Retraction Bays',
        installationDate: '2021-04-18',
        componentAge: '5.5 Years',
        totalOperatingHours: 1482.4,
        flightCycles: 946,
        lastOverhaul: '2025-07-22',
        ratedLimits: { oleoPressure: '1,450 PSI nitrogen', brakeTemp: '450.0 °C max', tirePressure: '140 PSI' },
        designLife: '3,000 Landings',
        currentConfig: 'Anti-skid digital brake management enabled'
      },
      failurePrediction: {
        risk7d: 3.5, risk14d: 6.8, risk30d: 11.5, rul: '1,120.0 Hours', rulConfidenceInterval: '1,080 - 1,160 Hours',
        predictionConfidence: 98.4, healthScore: 95, degradationRate: '-0.1%/100 landings',
        futureForecast30d: [95, 94.9, 94.8], anomalies: [],
        explainableAi: { sentence: 'Oleo nitrogen strut pressures and anti-skid brake wear pads report nominal clearance.', factors: [] },
        failureMode: 'Oleo seal leakage and brake pad wear', rootCause: 'Touchdown impact friction'
      },
      liveSensors: [
        { name: 'Oleo Nitrogen Pressure', value: '1,442 PSI', nominal: '1,450 PSI', status: 'OK', unit: 'PSI', history: [1440, 1441, 1441, 1442, 1442] },
        { name: 'Brake Disc Temp', value: '142 °C', nominal: '150 °C', status: 'OK', unit: '°C', history: [130, 135, 138, 140, 142] }
      ],
      maintenanceAndSpares: {
        history: [{ date: '2026-06-18', event: 'Tire assembly replaced; brake pads measured 72% thickness remaining.' }],
        similarCases: [],
        recommendedAction: 'Visual inspection of oleo strut chrome plating at every turn-around.',
        recommendedWindow: 'Daily Turnaround',
        requiredSpare: { partNumber: 'LG-SEAL-KIT', name: 'Oleo Strut Nitrogen Seal Kit', inStock: 7, reserved: 0, leadTime: '4 Days', shortageWarning: 'ADEQUATE' }
      }
    }
  ]
};

// Generate fallback DRISHTI dataset for any aircraft ID
function getDrishtiAircraftData(aircraftId) {
  if (DRISHTI_AIRCRAFT[aircraftId]) {
    const data = JSON.parse(JSON.stringify(DRISHTI_AIRCRAFT[aircraftId]));
    data.parts = DRISHTI_PARTS_LIBRARY[aircraftId] || DRISHTI_PARTS_LIBRARY['AC-107'];
    return data;
  }

  // Fallback for AC-101...AC-112
  return {
    aircraftId: aircraftId,
    tailNumber: `IAF-${aircraftId.replace('AC-', '')}`,
    name: `Fighter Aircraft (${aircraftId})`,
    type: 'Multi-Role Combat Fighter',
    squadron: 'Indian Air Force Air Superiority Squadron',
    base: 'AFS Thanjavur / AFS Ambala',
    role: 'Air Superiority & Point Defense',
    manufactureYear: 2020,
    engineCount: 2,
    engineType: 'High-Performance Afterburning Turbofans',
    configuration: 'Combat Ready IAF Standard',
    overallHealth: 96,
    alertLevel: 'INFORMATION',
    operatingStatus: {
      flightHours: 920.0,
      flightCycles: 580,
      lastFlight: '2026-10-01 (Routine Mission)',
      status: 'AVAILABLE',
      statusLabel: 'Combat Ready / Available',
      nextMission: 'Scheduled Training Sortie'
    },
    maintenanceSummary: {
      lastMaintenance: '2026-08-20 (Routine Turnaround)',
      nextPlannedWindow: 'Next routine window (Day 25)',
      openTasks: 0,
      pastFaultsCount: 1,
      recurrenceFlags: 'Zero active recurrence anomalies'
    },
    predictiveSummary: {
      risk7d: 4.2,
      risk14d: 8.5,
      risk30d: 14.0,
      predictedFaults: [],
      topAtRiskComponents: [
        { name: 'Hydraulic System', id: `${aircraftId}-HYD`, risk: 'NORMAL', health: 96, rul: '820 Hours' },
        { name: 'Engine Turbofan', id: `${aircraftId}-ENG`, risk: 'NORMAL', health: 95, rul: '780 Hours' }
      ],
      lowestRul: '780.0 Flight Hours',
      modelConfidence: 98.8
    },
    sparesReadiness: {
      requiredSpares: 'Routine Filter & Seal Kits',
      stockStatus: 'Adequate depot buffers',
      shortageWarning: 'NONE'
    },
    healthTrend30d: [98, 97.8, 97.5, 97.2, 97.0, 96.8, 96.5, 96.0],
    parts: DRISHTI_PARTS_LIBRARY['AC-107']
  };
}

if (typeof window !== 'undefined') {
  window.DRISHTI_AIRCRAFT = DRISHTI_AIRCRAFT;
  window.DRISHTI_PARTS_LIBRARY = DRISHTI_PARTS_LIBRARY;
  window.getDrishtiAircraftData = getDrishtiAircraftData;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getDrishtiAircraftData,
    DRISHTI_AIRCRAFT,
    DRISHTI_PARTS_LIBRARY
  };
}

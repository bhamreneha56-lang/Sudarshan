/**
 * SUDARSANA CHAKRA COMMAND CENTER — CLIENT LOGIC & ROUTER
 * PS 26249: Air Power – Predictive Maintenance & Fleet Availability
 * 
 * Standalone Zero-Dependency Architecture
 * Closed-Loop: Monitor → Detect → Predict → Explain → Simulate → Plan → Maintain → Verify → Learn
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================
  // 1. AUDIO SYNTHESIS ENGINE (Web Audio API)
  // Preserved from welcome page
  // ========================================================
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function createNoiseBuffer(duration = 2.0) {
    if (!audioCtx) return null;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  function playWhoosh(type = 'open') {
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      const noise = audioCtx.createBufferSource();
      noise.buffer = createNoiseBuffer(1.6);
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 3.0;
      const gain = audioCtx.createGain();

      if (type === 'open') {
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.8);
        filter.frequency.exponentialRampToValueAtTime(400, now + 1.5);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.25, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      } else {
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.6);
        filter.frequency.exponentialRampToValueAtTime(800, now + 1.4);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.3, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      }

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(now);
      noise.stop(now + 1.6);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function playTone(freq = 880, type = 'sine', duration = 0.2) {
    initAudio();
    if (!audioCtx || !isSoundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Tone error:', e);
    }
  }

  // ========================================================
  // 2. WELCOME PAGE & TAP TO START (DO NOT MODIFY)
  // ========================================================
  const welcomeScreen = document.getElementById('welcome-screen');
  const appContainer = document.getElementById('app-container');
  const introVideo = document.getElementById('intro-video');
  const tapToStartContainer = document.getElementById('tap-to-start-container');
  const btnTapToStart = document.getElementById('btn-tap-to-start');

  let buttonRevealed = false;
  function revealTapToStart() {
    if (buttonRevealed) return;
    buttonRevealed = true;
    if (tapToStartContainer) {
      tapToStartContainer.classList.add('visible');
    }
  }

  if (introVideo) {
    introVideo.muted = true;
    introVideo.play().catch(e => console.log('Autoplay muted attempt', e));
    introVideo.addEventListener('timeupdate', () => {
      if (introVideo.currentTime >= 6.5) revealTapToStart();
    });
    introVideo.addEventListener('ended', revealTapToStart);
  }

  function enterApplication() {
    initAudio();
    playWhoosh('reveal');
    welcomeScreen.classList.add('fade-out');
    appContainer.classList.remove('hidden');
    if (introVideo) introVideo.pause();

    // ALWAYS navigate to role selection first so user sees ONLY role selection
    window.location.hash = '#/role-select';
    handleRouting();
  }

  if (btnTapToStart) {
    btnTapToStart.addEventListener('click', enterApplication);
  }
  if (welcomeScreen) {
    welcomeScreen.addEventListener('click', () => {
      if (buttonRevealed) enterApplication();
    });
  }

  // ========================================================
  // 3. ROLE CONFIGURATIONS & STRICT FEATURE SEPARATION
  // Only the features belonging to the chosen role are visible!
  // ========================================================
  const ROLE_NAV_CONFIG = {
    admin: {
      name: 'Command / Admin',
      icon: '🎖️',
      label: 'Admin Mode',
      defaultRoute: '#/app/fleet',
      allowedRoutes: ['fleet', 'drishti', 'aircraft', 'planning', 'spares', 'audit', 'assistant'],
      links: [
        { route: 'fleet', url: '#/app/fleet', icon: '🛸', text: 'Fleet Command' },
        { route: 'drishti', url: '#/app/drishti/AC-107', icon: '👁️', text: 'DRISHTI 3D Explorer' },
        { route: 'aircraft', url: '#/app/aircraft/AC-107', icon: '✈️', text: 'Aircraft Twin & Health' },
        { route: 'planning', url: '#/app/planning', icon: '📅', text: 'Maintenance Planning' },
        { route: 'spares', url: '#/app/spares', icon: '📦', text: 'Spares & Inventory' },
        { route: 'audit', url: '#/app/audit', icon: '📋', text: 'Audit & Data Quality' },
        { route: 'assistant', url: '#/app/assistant', icon: '💬', text: 'Knowledge Assistant' }
      ]
    },
    engineer: {
      name: 'Maintenance Engineer',
      icon: '🛠️',
      label: 'Engineer Mode',
      defaultRoute: '#/app/fleet',
      allowedRoutes: ['fleet', 'drishti', 'aircraft', 'component', 'fault-graph', 'twin', 'simulator', 'planning', 'learning', 'assistant'],
      links: [
        { route: 'fleet', url: '#/app/fleet', icon: '🛸', text: 'Fleet Command' },
        { route: 'drishti', url: '#/app/drishti/AC-107', icon: '👁️', text: 'DRISHTI 3D Explorer' },
        { route: 'aircraft', url: '#/app/aircraft/AC-107', icon: '✈️', text: 'Aircraft Twin & Health' },
        { route: 'component', url: '#/app/component/AC-107-HYD-PUMP', icon: '⚙️', text: 'Component Detail (XAI)' },
        { route: 'fault-graph', url: '#/app/fault-graph/AC-107-HYD-PUMP', icon: '🕸️', text: 'Fault Dependency Graph' },
        { route: 'twin', url: '#/app/twin/AC-107', icon: '🛡️', text: 'Digital Health Twin' },
        { route: 'simulator', url: '#/app/simulator', icon: '🔮', text: 'What-If Simulator' },
        { route: 'planning', url: '#/app/planning', icon: '📅', text: 'Maintenance Planning' },
        { route: 'learning', url: '#/app/learning', icon: '🧠', text: 'Prediction & Learning' },
        { route: 'assistant', url: '#/app/assistant', icon: '💬', text: 'Knowledge Assistant' }
      ]
    },
    technician: {
      name: 'Technician',
      icon: '🔧',
      label: 'Technician Mode',
      defaultRoute: '#/app/technician-tasks',
      allowedRoutes: ['technician-tasks', 'drishti', 'aircraft', 'component', 'assistant'],
      links: [
        { route: 'technician-tasks', url: '#/app/technician-tasks', icon: '🔧', text: 'Assigned Work Orders' },
        { route: 'drishti', url: '#/app/drishti/AC-107', icon: '👁️', text: 'DRISHTI 3D (Read-Only)' },
        { route: 'aircraft', url: '#/app/aircraft/AC-107', icon: '✈️', text: 'Aircraft Inspection' },
        { route: 'component', url: '#/app/component/AC-107-HYD-PUMP', icon: '⚙️', text: 'Sensor Diagnostics' },
        { route: 'assistant', url: '#/app/assistant', icon: '💬', text: 'Technical Assistant' }
      ]
    },
    inventory: {
      name: 'Inventory Officer',
      icon: '📦',
      label: 'Logistics Mode',
      defaultRoute: '#/app/spares',
      allowedRoutes: ['spares', 'planning', 'assistant'],
      links: [
        { route: 'spares', url: '#/app/spares', icon: '📦', text: 'Spares & Depot Inventory' },
        { route: 'planning', url: '#/app/planning', icon: '📅', text: 'Planning Readiness' },
        { route: 'assistant', url: '#/app/assistant', icon: '💬', text: 'Logistics Assistant' }
      ]
    },
    auditor: {
      name: 'Auditor',
      icon: '📋',
      label: 'Auditor Mode',
      defaultRoute: '#/app/audit',
      allowedRoutes: ['audit', 'drishti', 'assistant'],
      links: [
        { route: 'audit', url: '#/app/audit', icon: '📋', text: 'Audit Trail & Data Quality' },
        { route: 'drishti', url: '#/app/drishti/AC-107', icon: '👁️', text: 'DRISHTI 3D Inspection' },
        { route: 'assistant', url: '#/app/assistant', icon: '💬', text: 'Compliance Assistant' }
      ]
    }
  };

  let activeRoleKey = localStorage.getItem('sudarshan_role') || 'admin';

  function buildRoleSidebar(roleKey) {
    const config = ROLE_NAV_CONFIG[roleKey] || ROLE_NAV_CONFIG.admin;
    const railNav = document.getElementById('rail-nav');
    if (!railNav) return;
    railNav.innerHTML = config.links.map(l => `
      <a href="${l.url}" class="rail-link" data-route="${l.route}">
        <span class="rail-icon">${l.icon}</span>
        <span class="rail-text">${l.text}</span>
      </a>
    `).join('');
  }

  function updateRoleUI() {
    const roleObj = ROLE_NAV_CONFIG[activeRoleKey] || ROLE_NAV_CONFIG.admin;
    const topRoleName = document.getElementById('topbar-role-name');
    const topRoleIcon = document.getElementById('topbar-role-icon');
    const railRoleLabel = document.getElementById('rail-role-label');
    if (topRoleName) topRoleName.textContent = roleObj.name;
    if (topRoleIcon) topRoleIcon.textContent = roleObj.icon;
    if (railRoleLabel) railRoleLabel.textContent = roleObj.label;
  }

  const btnChangeRole = document.getElementById('btn-change-role');
  if (btnChangeRole) {
    btnChangeRole.addEventListener('click', () => {
      window.location.hash = '#/role-select';
    });
  }

  // ========================================================
  // 4. TOPBAR CLOCK, ALERTS DRAWER, & SEARCH
  // ========================================================
  function updateTopbarClock() {
    const now = new Date();
    const utcStr = now.toISOString().substring(11, 19) + ' UTC';
    const clockEl = document.getElementById('topbar-clock');
    if (clockEl) clockEl.textContent = utcStr;
  }
  setInterval(updateTopbarClock, 1000);
  updateTopbarClock();

  // Alerts Flyout Drawer
  const btnAlertBell = document.getElementById('btn-alert-bell');
  const alertsDrawer = document.getElementById('alerts-drawer');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const drawerAlertsList = document.getElementById('drawer-alerts-list');

  if (btnAlertBell) {
    btnAlertBell.addEventListener('click', () => {
      alertsDrawer.classList.toggle('hidden');
      loadDrawerAlerts('ALL');
    });
  }
  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener('click', () => {
      alertsDrawer.classList.add('hidden');
    });
  }

  async function loadDrawerAlerts(filterLevel = 'ALL') {
    if (!drawerAlertsList) return;
    try {
      const res = await fetch('/api/fleet');
      const data = await res.json();
      let alerts = data.alerts || [];
      if (filterLevel !== 'ALL') {
        alerts = alerts.filter(a => a.level === filterLevel);
      }
      drawerAlertsList.innerHTML = alerts.map(a => `
        <div class="alert-feed-item ${a.level.toLowerCase().replace('_', '-')}" onclick="window.location.hash='#/app/aircraft/${a.aircraftId}'; document.getElementById('alerts-drawer').classList.add('hidden');">
          <div class="feed-header-line">
            <span class="badge-alert ${a.level.toLowerCase().replace('_', '-')}">${a.level}</span>
            <span class="feed-time">${a.time}</span>
          </div>
          <div class="feed-title">${a.title}</div>
          <div class="feed-desc">${a.details}</div>
          <div style="font-size:0.65rem; color:var(--brand-cyan); margin-top:0.3rem;">RUL: ${a.rul} &bull; Tail: ${a.tailNumber} &rarr;</div>
        </div>
      `).join('');
    } catch (e) {
      drawerAlertsList.innerHTML = `<p style="color:var(--text-muted); font-size:0.8rem;">Unable to load alerts.</p>`;
    }
  }

  // Drawer filter pills
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      loadDrawerAlerts(pill.getAttribute('data-filter'));
    });
  });

  // Global Search input
  const globalSearchInput = document.getElementById('global-search-input');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = globalSearchInput.value.trim().toUpperCase();
        if (val.includes('107') || val.includes('HYD') || val.includes('PUMP')) {
          window.location.hash = '#/app/aircraft/AC-107';
        } else if (val.includes('103') || val.includes('BLISK') || val.includes('TEJAS')) {
          window.location.hash = '#/app/aircraft/AC-103';
        } else if (val.includes('SPARE')) {
          window.location.hash = '#/app/spares';
        } else {
          window.location.hash = '#/app/fleet';
        }
      }
    });
  }

  // ========================================================
  // 5. GUIDED DEMO MODE (AC-107 Story Walkthrough)
  // ========================================================
  const DEMO_STEPS = [
    {
      step: 1,
      route: '#/app/fleet',
      title: 'Step 1: Fleet Overview & Anomaly Emergence',
      desc: 'Sudarshan continuously scans all 24 aircraft. Notice AC-107 located in the middle warning ring on the Radial Chakra View with an active HIGH RISK alert.'
    },
    {
      step: 2,
      route: '#/app/aircraft/AC-107',
      title: 'Step 2: AC-107 Aircraft Health & Subsystems',
      desc: 'Inspecting AC-107 (Su-30MKI SB-188). Health score is degraded to 68%. The Hydraulic System flags an active micro-cavitation advisory while the airframe and engines remain nominal.'
    },
    {
      step: 3,
      route: '#/app/component/AC-107-HYD-PUMP',
      title: 'Step 3: Component Detail & Weak Signal Detection',
      desc: 'Hydraulic Pump HP-3B shows an acoustic harmonic shift at 4,200 Hz. The standard threshold sensor has NOT triggered, but Sudarshan predicts failure within 9.8 Days (±1.2 Days).'
    },
    {
      step: 4,
      route: '#/app/drishti/AC-107',
      title: 'Step 4: DRISHTI 3D — Subsystem 3D Digital Twin Inspection',
      desc: 'Direct spatial 3D inspection of AC-107. The Hydraulic Pump Unit HP-3B glows in HIGH RISK amber/orange at FS-420. Click the pump to inspect multi-horizon risk, live telemetry, and XAI attribution in full 3D.'
    },
    {
      step: 5,
      route: '#/app/fault-graph/AC-107-HYD-PUMP',
      title: 'Step 5: XAI Attribution & Fault Dependency Graph',
      desc: 'Trace the full causality: Harmonic distortion (42%) and temperature rise (28%) point to impeller cavitation in HP-3B, leading to failure mode seizure without intervention.'
    },
    {
      step: 6,
      route: '#/app/simulator',
      title: 'Step 6: What-If Simulation & Trade-Offs',
      desc: 'Comparing Options: Replace Immediately (disrupts 3 sorties) vs Inspect/Replace at Day 5 (RECOMMENDED) vs Run to Failure (78.4% catastrophic risk). Day 5 preserves missions and safety.'
    },
    {
      step: 7,
      route: '#/app/planning',
      title: 'Step 7: Maintenance Planning & Gantt Schedule',
      desc: 'The Multi-Constraint Priority Engine schedules AC-107 in Bay 3 at AFS Thanjavur on Day 5, balancing technician workload and flight sorties.'
    },
    {
      step: 8,
      route: '#/app/spares',
      title: 'Step 8: Spares Inventory Shortage Early Warning',
      desc: 'Only 1 unit of HP-3B-MK2 is in stock (reserved for AC-107). 2 incoming units from HAL Nashik are in transit arriving on Day 4, perfectly timing the Day 5 repair window.'
    },
    {
      step: 9,
      route: '#/app/learning',
      title: 'Step 9: Closed-Loop Maintenance Verification',
      desc: 'Simulate executing maintenance: Health recovers from 64% to 98.6% (+34.6% recovery). Residual risk drops to 1.2%, validating repair effectiveness.'
    },
    {
      step: 10,
      route: '#/app/learning',
      title: 'Step 10: Model Retraining with Verified Outcomes',
      desc: 'Click "Retrain Model" to incorporate the outcome into Sudarshan\'s PINN neural network. Accuracy improves to 99.1% and false positive rate drops to 1.3%.'
    }
  ];

  let currentDemoStepIndex = 0;
  const btnGuidedDemo = document.getElementById('btn-guided-demo');
  const guidedDemoOverlay = document.getElementById('guided-demo-overlay');
  const btnCloseDemo = document.getElementById('btn-close-demo');
  const btnDemoPrev = document.getElementById('btn-demo-prev');
  const btnDemoNext = document.getElementById('btn-demo-next');
  const demoStepNumber = document.getElementById('demo-step-number');
  const demoStepTitle = document.getElementById('demo-step-title');
  const demoStepDesc = document.getElementById('demo-step-desc');

  function showDemoStep(index) {
    if (index < 0) index = 0;
    if (index >= DEMO_STEPS.length) {
      guidedDemoOverlay.classList.add('hidden');
      return;
    }
    currentDemoStepIndex = index;
    const step = DEMO_STEPS[index];
    demoStepNumber.textContent = `Step ${step.step} of 10`;
    demoStepTitle.textContent = step.title;
    demoStepDesc.textContent = step.desc;
    window.location.hash = step.route;
    guidedDemoOverlay.classList.remove('hidden');
    playTone(1050, 'sine', 0.1);
  }

  if (btnGuidedDemo) {
    btnGuidedDemo.addEventListener('click', () => {
      showDemoStep(0);
    });
  }
  if (btnCloseDemo) {
    btnCloseDemo.addEventListener('click', () => {
      guidedDemoOverlay.classList.add('hidden');
    });
  }
  if (btnDemoNext) {
    btnDemoNext.addEventListener('click', () => {
      showDemoStep(currentDemoStepIndex + 1);
    });
  }
  if (btnDemoPrev) {
    btnDemoPrev.addEventListener('click', () => {
      showDemoStep(currentDemoStepIndex - 1);
    });
  }

  // ========================================================
  // 6. CLIENT-SIDE ROUTER & VIEW RENDERING
  // ========================================================
  const viewMountPoint = document.getElementById('view-mount-point');
  const breadcrumbBar = document.getElementById('breadcrumb-bar');

  window.addEventListener('hashchange', handleRouting);

  function setBreadcrumbs(crumbs = []) {
    if (!breadcrumbBar) return;
    breadcrumbBar.innerHTML = crumbs.map((c, i) => {
      if (i === crumbs.length - 1) {
        return `<span class="crumb">${c.name}</span>`;
      }
      return `<a href="${c.url}" class="crumb-link">${c.name}</a><span class="crumb-sep">&rsaquo;</span>`;
    }).join('');
  }

  function highlightSidebar(routeKey) {
    const links = document.querySelectorAll('.rail-link');
    links.forEach(l => {
      if (l.getAttribute('data-route') === routeKey) {
        l.classList.add('active');
      } else {
        l.classList.remove('active');
      }
    });
  }

  async function handleRouting() {
    const hash = window.location.hash || '#/role-select';
    const topBar = document.querySelector('.top-bar');
    const sidebarRail = document.getElementById('sidebar-rail');

    // 1. Role Select Route: ONLY show Role Selection cards, hide sidebar & topbar widgets!
    if (hash === '#/role-select' || !localStorage.getItem('sudarshan_role')) {
      if (topBar) topBar.classList.add('role-select-mode');
      if (sidebarRail) sidebarRail.classList.add('hidden-rail');
      setBreadcrumbs([{ name: 'Sudarshan Command Access &bull; Role Selection' }]);
      renderRoleSelectView();
      return;
    }

    // Role is chosen: show sidebar and topbar widgets
    if (topBar) topBar.classList.remove('role-select-mode');
    if (sidebarRail) sidebarRail.classList.remove('hidden-rail');
    updateRoleUI();
    buildRoleSidebar(activeRoleKey);

    const roleConfig = ROLE_NAV_CONFIG[activeRoleKey] || ROLE_NAV_CONFIG.admin;

    // RBAC Route Guard: ensure current route is permitted for this role
    const currentSubRoute = hash.replace('#/app/', '').split('/')[0];
    if (currentSubRoute && !roleConfig.allowedRoutes.includes(currentSubRoute) && !roleConfig.allowedRoutes.includes('all')) {
      window.location.hash = roleConfig.defaultRoute;
      return;
    }

    // 2. Technician Dedicated Tasks Route
    if (hash === '#/app/technician-tasks') {
      highlightSidebar('technician-tasks');
      setBreadcrumbs([{ name: 'Flight Line Assigned Tasks' }]);
      renderTechnicianTasksView();
      return;
    }

    // 3. Fleet Command Route
    if (hash === '#/app/fleet' || hash === '#/' || hash === '') {
      highlightSidebar('fleet');
      setBreadcrumbs([{ name: 'Fleet Command' }]);
      renderFleetView();
      return;
    }

    // 3b. DRISHTI 3D Aircraft Health Explorer Route
    if (hash.startsWith('#/app/drishti')) {
      const rawAcId = hash.replace('#/app/drishti/', '').replace('#/app/drishti', '').trim();
      const acId = rawAcId || 'AC-107';
      highlightSidebar('drishti');
      setBreadcrumbs([
        { name: 'Fleet Command', url: '#/app/fleet' },
        { name: `DRISHTI 3D &bull; ${acId}` }
      ]);
      renderDrishtiView(acId);
      return;
    }

    // 4. Aircraft Detail Route
    if (hash.startsWith('#/app/aircraft/')) {
      const acId = hash.replace('#/app/aircraft/', '');
      highlightSidebar('aircraft');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: `Aircraft ${acId}` }]);
      renderAircraftView(acId);
      return;
    }

    // 5. Component Detail Route
    if (hash.startsWith('#/app/component/')) {
      const compId = hash.replace('#/app/component/', '');
      highlightSidebar('component');
      setBreadcrumbs([
        { name: 'Fleet', url: '#/app/fleet' },
        { name: 'AC-107', url: '#/app/aircraft/AC-107' },
        { name: 'Hydraulic Pump HP-3B (XAI)' }
      ]);
      renderComponentView(compId);
      return;
    }

    // 6. Fault Dependency Graph Route
    if (hash.startsWith('#/app/fault-graph/')) {
      const compId = hash.replace('#/app/fault-graph/', '');
      highlightSidebar('fault-graph');
      setBreadcrumbs([
        { name: 'Fleet', url: '#/app/fleet' },
        { name: 'AC-107', url: '#/app/aircraft/AC-107' },
        { name: 'Fault Dependency Graph' }
      ]);
      renderFaultGraphView(compId);
      return;
    }

    // 7. Digital Health Twin Route
    if (hash.startsWith('#/app/twin/')) {
      const acId = hash.replace('#/app/twin/', '');
      highlightSidebar('twin');
      setBreadcrumbs([
        { name: 'Fleet', url: '#/app/fleet' },
        { name: `Digital Twin (${acId})` }
      ]);
      renderDigitalTwinView(acId);
      return;
    }

    // 8. What-If Simulator Route
    if (hash === '#/app/simulator') {
      highlightSidebar('simulator');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: 'What-If Maintenance Simulator' }]);
      renderSimulatorView();
      return;
    }

    // 9. Maintenance Planning Route
    if (hash === '#/app/planning') {
      highlightSidebar('planning');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: 'Multi-Constraint Planning' }]);
      renderPlanningView();
      return;
    }

    // 10. Spares & Inventory Route
    if (hash === '#/app/spares') {
      highlightSidebar('spares');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: 'Spares & Depot Inventory' }]);
      renderSparesView();
      return;
    }

    // 11. Prediction & Learning Route
    if (hash === '#/app/learning') {
      highlightSidebar('learning');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: 'Continuous Prediction & Learning' }]);
      renderLearningView();
      return;
    }

    // 12. Knowledge Assistant Route
    if (hash === '#/app/assistant') {
      highlightSidebar('assistant');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: 'Knowledge Assistant Q&A' }]);
      renderAssistantView();
      return;
    }

    // 13. Audit & Data Quality Route
    if (hash === '#/app/audit') {
      highlightSidebar('audit');
      setBreadcrumbs([{ name: 'Fleet', url: '#/app/fleet' }, { name: 'Audit Trail & Data Quality' }]);
      renderAuditView();
      return;
    }

    // 404 Route
    render404View();
  }

  // ========================================================
  // VIEW RENDERERS
  // ========================================================

  // --- 1. ROLE SELECT VIEW (Only role cards visible) ---
  function renderRoleSelectView() {
    viewMountPoint.innerHTML = `
      <div class="role-select-view">
        <div class="role-header-banner">
          <h2>SUDARSANA COMMAND ACCESS &bull; ROLE SELECTION</h2>
          <p>Select your authorized credential level. Each role unlocks separate, dedicated feature modules:</p>
        </div>
        <div class="roles-grid">
          <div class="role-card" onclick="window.sudarshanSetRole('admin')">
            <div class="role-card-top">
              <div class="role-icon-box">🎖️</div>
              <div class="role-title-box">
                <h3>Command / Admin</h3>
                <span class="role-access-pill">Full Command Authority</span>
              </div>
            </div>
            <p class="role-desc">Air Force Station Commander & Wing Logistics Chief. Authorizes maintenance windows, reviews fleet readiness, and oversees audit trails.</p>
            <ul class="role-permissions-list">
              <li>Fleet Command Dashboard &amp; Readiness</li>
              <li>Aircraft Twin &amp; Health Overview</li>
              <li>Depot Maintenance Schedule Approval</li>
              <li>Spares Buffer &amp; Procurement Radar</li>
              <li>Immutable Audit Trail Oversight</li>
            </ul>
            <button class="btn-assume-role">ASSUME COMMAND ROLE &rarr;</button>
          </div>

          <div class="role-card" onclick="window.sudarshanSetRole('engineer')">
            <div class="role-card-top">
              <div class="role-icon-box">🛠️</div>
              <div class="role-title-box">
                <h3>Maintenance Engineer</h3>
                <span class="role-access-pill">Diagnostic Engineering</span>
              </div>
            </div>
            <p class="role-desc">Base Engineering Officer. Investigates XAI root causes, tests What-If scenarios, verifies post-maintenance recovery, retrains models.</p>
            <ul class="role-permissions-list">
              <li>Component Detail with Explainable AI (XAI)</li>
              <li>Interactive Fault Dependency Graph</li>
              <li>Digital Health Twin with Stress Simulation</li>
              <li>What-If Maintenance Strategy Simulator</li>
              <li>PINN Neural Network Continuous Learning</li>
            </ul>
            <button class="btn-assume-role">ASSUME ENGINEER ROLE &rarr;</button>
          </div>

          <div class="role-card" onclick="window.sudarshanSetRole('technician')">
            <div class="role-card-top">
              <div class="role-icon-box">🔧</div>
              <div class="role-title-box">
                <h3>Technician</h3>
                <span class="role-access-pill">Flight Line Execution</span>
              </div>
            </div>
            <p class="role-desc">Flight Line Warrant Officer & Crew Chief. Executes Boroscope optical inspections, logs component replacements, runs BITE avionics diagnostics.</p>
            <ul class="role-permissions-list">
              <li>Assigned Work Orders &amp; Checklists</li>
              <li>Aircraft Visual Inspection</li>
              <li>Component Sensor Telemetry Checking</li>
              <li>Technical Procedure Assistant</li>
            </ul>
            <button class="btn-assume-role">ASSUME TECHNICIAN ROLE &rarr;</button>
          </div>

          <div class="role-card" onclick="window.sudarshanSetRole('inventory')">
            <div class="role-card-top">
              <div class="role-icon-box">📦</div>
              <div class="role-title-box">
                <h3>Inventory Officer</h3>
                <span class="role-access-pill">Base Supply & Spares</span>
              </div>
            </div>
            <p class="role-desc">Air Force Depot Supply Officer. Tracks HAL/DRDO lead times, manages line-replaceable unit (LRU) reserves, expedites shipments.</p>
            <ul class="role-permissions-list">
              <li>LRU Spares Catalog &amp; Buffer Tracking</li>
              <li>Shortage Early Warning Radar</li>
              <li>Maintenance Planning Readiness</li>
              <li>HAL/DRDO Purchase Order Tracking</li>
            </ul>
            <button class="btn-assume-role">ASSUME INVENTORY ROLE &rarr;</button>
          </div>

          <div class="role-card" onclick="window.sudarshanSetRole('auditor')">
            <div class="role-card-top">
              <div class="role-icon-box">📋</div>
              <div class="role-title-box">
                <h3>Auditor</h3>
                <span class="role-access-pill">Flight Safety & Compliance</span>
              </div>
            </div>
            <p class="role-desc">Directorate of Flight Safety & Air Force Audit. Inspects immutable decision logs, validates sensor data completeness, ensures compliance.</p>
            <ul class="role-permissions-list">
              <li>Tamper-Proof Immutable Audit Ledger</li>
              <li>Sensor Telemetry Completeness Panel</li>
              <li>Clock Jitter &amp; Edge Sync Oversight</li>
              <li>Historical Verification Records</li>
            </ul>
            <button class="btn-assume-role">ASSUME AUDITOR ROLE &rarr;</button>
          </div>
        </div>
      </div>
    `;
  }

  window.sudarshanSetRole = function(roleKey) {
    if (!ROLE_NAV_CONFIG[roleKey]) roleKey = 'admin';
    activeRoleKey = roleKey;
    localStorage.setItem('sudarshan_role', roleKey);
    updateRoleUI();
    buildRoleSidebar(roleKey);

    const topBar = document.querySelector('.top-bar');
    const sidebarRail = document.getElementById('sidebar-rail');
    if (topBar) topBar.classList.remove('role-select-mode');
    if (sidebarRail) sidebarRail.classList.remove('hidden-rail');

    playTone(980, 'sine', 0.15);
    window.location.hash = ROLE_NAV_CONFIG[roleKey].defaultRoute;
  };

  // --- DEDICATED TECHNICIAN WORK ORDERS VIEW ---
  function renderTechnicianTasksView() {
    viewMountPoint.innerHTML = `
      <div class="technician-tasks-view">
        <div class="ac-header-card">
          <div>
            <h2>FLIGHT LINE TECHNICIAN &bull; ASSIGNED WORK ORDERS</h2>
            <p>Active Work Orders assigned to Flight Line Crew Chief &bull; Station: <strong>AFS Thanjavur Bay 3</strong></p>
          </div>
          <span class="badge-alert warning">2 ASSIGNED ACTIONS</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:1.4rem; margin-top:1.5rem;">
          <!-- Task 1: AC-107 Hydraulic Pump -->
          <div class="hud-card" style="border-left:4px solid var(--alert-high-risk);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span class="badge-alert high-risk">HIGH PRIORITY WORK ORDER</span>
                <h3 style="font-size:1.15rem; color:#fff; margin-top:0.35rem;">TASK #DP-HYD-42: Hydraulic Pump HP-3B Boroscope &amp; Fluid Inspection</h3>
                <p style="font-size:0.75rem; color:var(--text-secondary); font-family:var(--font-mono); margin-top:0.2rem;">
                  Target Aircraft: <strong>AC-107 (Su-30MKI SB-188)</strong> &bull; Bay 3 &bull; Scheduled Due: Day 5 (08:00 IST)
                </p>
              </div>
              <button class="btn btn-secondary btn-xs" onclick="window.location.hash='#/app/component/AC-107-HYD-PUMP'">Inspect Sensor Telemetry &rarr;</button>
            </div>

            <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); padding:1rem; border-radius:4px; margin:1rem 0;">
              <h4 style="font-size:0.82rem; color:var(--brand-cyan); margin-bottom:0.6rem;">MANDATORY PRE-SORTIE INSPECTION CHECKLIST:</h4>
              <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.78rem;">
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" checked style="accent-color:var(--brand-cyan);">
                  <span>1. Visual inspection of Hydraulic Circuit 2 delivery manifold for external weeping or thermal discoloration.</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" checked style="accent-color:var(--brand-cyan);">
                  <span>2. Draw 100ml fluid sample from Circuit 2 sampling port for spectrographic wear-metal analysis (DRDO Lab).</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" style="accent-color:var(--brand-cyan);">
                  <span>3. Insert rigid Boroscope guide into pump casing inspection port; record impeller blade tip micro-pitting.</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" style="accent-color:var(--brand-cyan);">
                  <span>4. Connect ground diagnostic tablet and verify Sudarshan acoustic telemetry synchronizer packet status.</span>
                </label>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">Assigned To: Warrant Officer K. Singh (Hydraulics Team Bravo)</span>
              <button class="btn btn-primary btn-sm" onclick="alert('Work Order #DP-HYD-42 verified and marked completed. Post-maintenance recovery logged into Sudarshan AI.');">✓ Sign &amp; Mark Completed</button>
            </div>
          </div>

          <!-- Task 2: AC-103 Engine Turbine Blisk -->
          <div class="hud-card" style="border-left:4px solid var(--alert-critical);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span class="badge-alert critical">CRITICAL GROUNDING WORK ORDER</span>
                <h3 style="font-size:1.15rem; color:#fff; margin-top:0.35rem;">TASK #DP-ENG-019: HP Turbine Stage 3 Blisk Crack Verification</h3>
                <p style="font-size:0.75rem; color:var(--text-secondary); font-family:var(--font-mono); margin-top:0.2rem;">
                  Target Aircraft: <strong>AC-103 (Tejas LCA LA-5018)</strong> &bull; AFS Sulur Engine Test Bay &bull; Status: AOG / Grounded
                </p>
              </div>
              <button class="btn btn-secondary btn-xs" onclick="window.location.hash='#/app/aircraft/AC-103'">View Aircraft Details &rarr;</button>
            </div>

            <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); padding:1rem; border-radius:4px; margin:1rem 0;">
              <h4 style="font-size:0.82rem; color:var(--alert-critical); margin-bottom:0.6rem;">MANDATORY TECHNICAL DIRECTIVE PROTOCOL:</h4>
              <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.78rem;">
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" checked style="accent-color:var(--alert-critical);">
                  <span>1. Lockout ignition circuits and secure F404 engine bay safety pins.</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" style="accent-color:var(--alert-critical);">
                  <span>2. Guide flexible video-boroscope through igniter port #2 directly onto Stage 3 blisk root radius.</span>
                </label>
                <label style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;">
                  <input type="checkbox" style="accent-color:var(--alert-critical);">
                  <span>3. Measure micro-crack surface length using eddy-current probe; upload high-resolution images to DRDO depot.</span>
                </label>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">Assigned To: Master Warrant Officer V. Pillai (Engine Specialist Cell)</span>
              <button class="btn btn-primary btn-sm" onclick="alert('Boroscope report submitted to Base Engineering Officer. Aircraft remains grounded until replacement blisk arrives.');">Submit Inspection Report &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- 2. FLEET COMMAND VIEW ---
  async function renderFleetView() {
    viewMountPoint.innerHTML = `
      <div class="loading-skeleton-screen">
        <div class="skeleton-header"></div>
        <div class="skeleton-grid"><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div>
      </div>
    `;

    try {
      const res = await fetch('/api/fleet');
      const data = await res.json();
      const s = data.summary;

      viewMountPoint.innerHTML = `
        <div class="fleet-view">
          <!-- 6 High-Impact KPIs -->
          <div class="kpi-row">
            <div class="kpi-card">
              <span class="kpi-label">TOTAL FLEET STRENGTH</span>
              <div class="kpi-value-row">
                <span class="kpi-num">${s.totalAircraft}</span>
                <span class="kpi-trend good">&uarr; 100% active</span>
              </div>
              <span class="kpi-sub">4 Squadrons &bull; 4 Forward Bases</span>
            </div>

            <div class="kpi-card">
              <span class="kpi-label">MISSION AVAILABLE</span>
              <div class="kpi-value-row">
                <span class="kpi-num" style="color:var(--brand-green);">${s.availableAircraft}</span>
                <span class="kpi-trend good">&uarr; +2 vs last week</span>
              </div>
              <span class="kpi-sub">Ready for combat sortie clearance</span>
            </div>

            <div class="kpi-card">
              <span class="kpi-label">UNDER MAINTENANCE</span>
              <div class="kpi-value-row">
                <span class="kpi-num" style="color:var(--text-secondary);">${s.underMaintenance}</span>
                <span class="kpi-trend warn">&bull; Scheduled</span>
              </div>
              <span class="kpi-sub">Turnaround avg: 14.2 hrs</span>
            </div>

            <div class="kpi-card">
              <span class="kpi-label">PREDICTIVE AT-RISK</span>
              <div class="kpi-value-row">
                <span class="kpi-num" style="color:var(--alert-high-risk);">${s.atRiskAircraft}</span>
                <span class="kpi-trend bad">&uarr; AC-107 &amp; AC-103</span>
              </div>
              <span class="kpi-sub">Early intervention window active</span>
            </div>

            <div class="kpi-card">
              <span class="kpi-label">PREDICTED FAULTS (30D)</span>
              <div class="kpi-value-row">
                <span class="kpi-num" style="color:var(--brand-cyan);">${s.predictedFaults}</span>
                <span class="kpi-trend good">99.1% Confidence</span>
              </div>
              <span class="kpi-sub">Catastrophic prevention: 100%</span>
            </div>

            <div class="kpi-card">
              <span class="kpi-label">CRITICAL ALERTS</span>
              <div class="kpi-value-row">
                <span class="kpi-num" style="color:var(--alert-critical);">${s.criticalAlerts}</span>
                <span class="kpi-trend bad">&uarr; Blisk micro-crack</span>
              </div>
              <span class="kpi-sub">Immediate inspection required</span>
            </div>
          </div>

          <!-- Fleet Centerpiece: Radial Chakra Radar View & 30-Day Availability Forecast -->
          <div class="fleet-visual-grid">
            <!-- Radial Chakra Radar Canvas -->
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>SUDARSANA RADIAL CHAKRA &bull; FLEET RISK ORBIT</h3>
                  <p>Orbital radar representation of 24 aircraft. Inner ring = Critical; Mid ring = Watchlist; Outer ring = Optimal.</p>
                </div>
                <span class="badge-alert info">LIVE RADAR 60FPS</span>
              </div>
              <div class="radial-radar-box">
                <canvas id="radial-chakra-canvas" width="600" height="420"></canvas>
                <div class="radar-legend">
                  <div class="radar-legend-item"><span class="dot-legend inner"></span> Inner Ring: Critical (AC-103)</div>
                  <div class="radar-legend-item"><span class="dot-legend mid"></span> Middle Ring: High Risk / Watch (AC-107)</div>
                  <div class="radar-legend-item"><span class="dot-legend outer"></span> Outer Ring: Combat Ready (AC-101, etc.)</div>
                </div>
              </div>
            </div>

            <!-- Fleet Availability & Risk Forecast Trend -->
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>FLEET AVAILABILITY &amp; RISK 30-DAY PROJECTION</h3>
                  <p>Predictive curve comparing Unmanaged Run-to-Failure vs Sudarshan Prescriptive Scheduling.</p>
                </div>
                <div class="chakra-ring-container" style="width:70px; height:70px;">
                  <svg class="chakra-svg-ring" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" class="chakra-ring-bg"></circle>
                    <circle cx="50" cy="50" r="40" stroke="var(--brand-cyan)" stroke-dasharray="251.2" stroke-dashoffset="${251.2 * (1 - s.fleetAvailability / 100)}"></circle>
                  </svg>
                  <div class="chakra-ring-val">
                    <span class="big-num" style="font-size:0.95rem;">${s.fleetAvailability}%</span>
                  </div>
                </div>
              </div>

              <div style="height:260px; margin-top:0.5rem;">
                <canvas id="chart-fleet-forecast" width="460" height="250"></canvas>
              </div>

              <div style="margin-top:1rem; padding:0.8rem; background:rgba(0,0,0,0.3); border-radius:4px; font-size:0.75rem; color:var(--text-secondary); line-height:1.5;">
                <strong style="color:var(--brand-green);">Prescriptive Value:</strong> By pre-empting the hydraulic pump failure on AC-107 and turbine blisk on AC-103, fleet availability is projected to reach <strong style="color:#fff;">91% by Day 30</strong> vs falling to 46% under unmanaged operation.
              </div>
            </div>
          </div>

          <!-- Aircraft Table & Alert Feed -->
          <div class="fleet-data-grid">
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>FLEET STATUS MATRIX (CLICK TO INSPECT TWIN)</h3>
                  <p>Real-time telemetry sync from Forward Base nodes.</p>
                </div>
                <span class="badge-alert normal">24 TAILS MONITORED</span>
              </div>
              <div class="data-table-wrapper">
                <table class="cmd-table">
                  <thead>
                    <tr>
                      <th>Tail / ID</th>
                      <th>Aircraft Type</th>
                      <th>Squadron</th>
                      <th>Health Index</th>
                      <th>Risk Level</th>
                      <th>Predicted RUL</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.aircraft.map(ac => `
                      <tr class="${ac.riskLevel.toLowerCase().replace('_', '-')}-row" onclick="window.location.hash='#/app/aircraft/${ac.id}'">
                        <td class="mono-cell" style="color:var(--brand-cyan);">${ac.id} (${ac.tailNumber})</td>
                        <td>${ac.type}</td>
                        <td style="color:var(--text-secondary);">${ac.squadron}</td>
                        <td>
                          <strong style="color:${ac.healthScore > 90 ? 'var(--brand-green)' : ac.healthScore > 65 ? 'var(--alert-warning)' : 'var(--alert-critical)'}">${ac.healthScore}%</strong>
                        </td>
                        <td><span class="badge-alert ${ac.riskLevel.toLowerCase().replace('_', '-')}">${ac.riskLevel.replace('_', ' ')}</span></td>
                        <td class="mono-cell">${ac.rul}</td>
                        <td style="white-space:nowrap; display:flex; gap:0.35rem; align-items:center;">
                          <button class="btn btn-secondary btn-xs" onclick="event.stopPropagation(); window.location.hash='#/app/aircraft/${ac.id}'">Inspect &rarr;</button>
                          <button class="btn btn-primary btn-xs" onclick="event.stopPropagation(); window.location.hash='#/app/drishti/${ac.id}'" title="Open in DRISHTI 3D">👁️ 3D</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Active Alerts Feed -->
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>OPERATIONAL ALERT STREAM</h3>
                  <p>Triaged into 4 distinct risk tiers.</p>
                </div>
              </div>
              <div class="alerts-feed-list">
                ${data.alerts.map(a => `
                  <div class="alert-feed-item ${a.level.toLowerCase().replace('_', '-')}" onclick="window.location.hash='#/app/aircraft/${a.aircraftId}'">
                    <div class="feed-header-line">
                      <span class="badge-alert ${a.level.toLowerCase().replace('_', '-')}">${a.level}</span>
                      <span class="feed-time">${a.time}</span>
                    </div>
                    <div class="feed-title">${a.title}</div>
                    <div class="feed-desc">${a.details}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      // Initialize Radial Chakra Canvas
      initRadialChakraCanvas(data.aircraft);
      // Initialize Forecast Chart
      initForecastChart(data.forecast);
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load fleet data. Ensure server is running on port 3000.</p>`;
    }
  }

  // --- RADIAL CHAKRA CANVAS (Interactive Radar Disc) ---
  function initRadialChakraCanvas(aircraftList) {
    const canvas = document.getElementById('radial-chakra-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let sweepAngle = 0;

    function renderRadar() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) - 25;

      ctx.clearRect(0, 0, w, h);

      // Radial grid rings
      const rings = [maxR * 0.35, maxR * 0.68, maxR]; // Inner, Mid, Outer
      ctx.lineWidth = 1;
      rings.forEach((r, idx) => {
        ctx.strokeStyle = idx === 0 ? 'rgba(239, 68, 68, 0.25)' : idx === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 229, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Label on ring
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.font = '9px Consolas, monospace';
        const label = idx === 0 ? 'TIER 1 &bull; CRITICAL' : idx === 1 ? 'TIER 2 &bull; WATCHLIST' : 'TIER 3 &bull; COMBAT READY';
        ctx.fillText(label, cx - 40, cy - r + 12);
      });

      // Crosshairs
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
      ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
      ctx.stroke();

      // Rotating Radar Sweep Line
      sweepAngle += 0.015;
      const sweepX = cx + Math.cos(sweepAngle) * maxR;
      const sweepY = cy + Math.sin(sweepAngle) * maxR;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      grad.addColorStop(1, 'rgba(0, 229, 255, 0.15)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - 0.25, sweepAngle);
      ctx.closePath();
      ctx.fill();

      // Draw Aircraft Nodes
      aircraftList.forEach(ac => {
        let rTier = ac.ringTier === 'INNER' ? rings[0] : ac.ringTier === 'MIDDLE' ? rings[1] : rings[2];
        const rad = (ac.ringAngle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * rTier;
        const y = cy + Math.sin(rad) * rTier;

        // Node size based on risk
        const nodeRadius = ac.id === 'AC-103' ? 10 : ac.id === 'AC-107' ? 9 : 6;
        let color = '#00e676';
        if (ac.riskLevel === 'CRITICAL') color = '#ef4444';
        else if (ac.riskLevel === 'HIGH_RISK') color = '#f97316';
        else if (ac.riskLevel === 'WARNING') color = '#f59e0b';

        // Outer glow circle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring for critical/high risk
        if (ac.riskLevel === 'CRITICAL' || ac.riskLevel === 'HIGH_RISK') {
          const pulseR = nodeRadius + 4 + Math.sin(Date.now() / 250) * 3;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Text label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Consolas, monospace';
        ctx.fillText(ac.id, x + 10, y + 4);
      });

      requestAnimationFrame(renderRadar);
    }
    renderRadar();

    // Canvas click handling: find clicked aircraft and route
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.min(cx, cy) - 25;
      const rings = [maxR * 0.35, maxR * 0.68, maxR];

      for (const ac of aircraftList) {
        let rTier = ac.ringTier === 'INNER' ? rings[0] : ac.ringTier === 'MIDDLE' ? rings[1] : rings[2];
        const rad = (ac.ringAngle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * rTier;
        const y = cy + Math.sin(rad) * rTier;
        const dist = Math.hypot(clickX - x, clickY - y);
        if (dist <= 18) {
          playTone(1100, 'sine', 0.12);
          window.location.hash = `#/app/aircraft/${ac.id}`;
          return;
        }
      }
    });
  }

  // --- FORECAST CANVAS CHART ---
  function initForecastChart(f) {
    const canvas = document.getElementById('chart-fleet-forecast');
    if (!canvas || !f) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Axes & grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 30; y < h - 30; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }

    const n = f.dates.length;
    const stepX = (w - 70) / (n - 1);

    // 1. Unmanaged curve (Red/Amber degradation)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    f.availabilityWithoutAction.forEach((val, i) => {
      const x = 45 + i * stepX;
      const y = h - 35 - (val / 100) * (h - 70);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Sudarshan Prescriptive curve (Cyan/Green ascent)
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    f.availabilityWithSudarshan.forEach((val, i) => {
      const x = 45 + i * stepX;
      const y = h - 35 - (val / 100) * (h - 70);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Data points & X-axis labels
    f.dates.forEach((d, i) => {
      const x = 45 + i * stepX;
      const yVal = h - 35 - (f.availabilityWithSudarshan[i] / 100) * (h - 70);
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.arc(x, yVal, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '9px Consolas, monospace';
      ctx.fillText(d, x - 12, h - 12);
    });

    // Legend
    ctx.fillStyle = '#00e5ff';
    ctx.fillText('— With Sudarshan (Target 91%)', 60, 20);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('-- Without Intervention (46%)', 240, 20);
  }

  // --- 3. AIRCRAFT DETAIL VIEW ---
  async function renderAircraftView(aircraftId = 'AC-107') {
    viewMountPoint.innerHTML = `
      <div class="loading-skeleton-screen">
        <div class="skeleton-header"></div>
        <div class="skeleton-grid"><div class="skeleton-card"></div><div class="skeleton-card"></div></div>
      </div>
    `;

    try {
      const res = await fetch(`/api/aircraft/${aircraftId}`);
      const ac = await res.json();

      viewMountPoint.innerHTML = `
        <div class="aircraft-view">
          <!-- Aircraft Header Card -->
          <div class="ac-header-card">
            <div class="ac-meta-left">
              <h2>AIRCRAFT DIGITAL PROFILE &bull; ${ac.id}</h2>
              <p>${ac.type} &bull; Tail Number: <strong>${ac.tailNumber}</strong> &bull; ${ac.squadron} &bull; Base: ${ac.base}</p>
            </div>
            <div class="ac-badges-right" style="display:flex; align-items:center; gap:0.8rem;">
              <button class="btn btn-primary btn-sm" onclick="window.location.hash='#/app/drishti/${ac.id}'" title="Explore in 3D">
                👁️ Open in DRISHTI 3D
              </button>
              <span class="badge-alert ${ac.riskLevel.toLowerCase().replace('_', '-')}">${ac.riskLevel.replace('_', ' ')}</span>
              <div class="rul-box">
                <span class="rul-label">PREDICTED RUL (REMAINING USEFUL LIFE)</span>
                <div class="rul-val">${ac.rul}</div>
                <span style="font-size:0.62rem; color:var(--text-muted); font-family:var(--font-mono);">${ac.rulConfidenceBand}</span>
              </div>
            </div>
          </div>

          <!-- Subsystem Breakdown Cards -->
          <h3 style="font-size:1.05rem; margin-bottom:1rem; color:#fff;">SUBSYSTEM HEALTH &amp; PROGNOSTICS</h3>
          <div class="components-subsystem-grid">
            ${ac.components.map(c => `
              <div class="comp-card" onclick="window.location.hash='#/app/component/${c.id}'">
                <div class="comp-header">
                  <div>
                    <div class="comp-name">${c.name}</div>
                    <div class="comp-cat">${c.category} &bull; ${c.id}</div>
                  </div>
                  <span class="badge-alert ${c.risk.toLowerCase().replace('_', '-')}">${c.health}%</span>
                </div>
                <div class="comp-health-bar">
                  <div class="comp-bar-fill ${c.risk.toLowerCase().replace('_', '-')}" style="width:${c.health}%;"></div>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-secondary); margin-top:0.4rem;">
                  <span>Status: <strong>${c.alert}</strong></span>
                  <span class="mono-cell" style="color:var(--brand-cyan);">RUL: ${c.rul} &rarr;</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Peer Aircraft Comparison & Maintenance History -->
          <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:1.2rem; margin-top:1.5rem;">
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>SQUADRON PEER DEGRADATION BENCHMARK</h3>
                  <p>Comparing ${ac.id} against No. 222 Squadron fleet baseline wear.</p>
                </div>
              </div>
              <div style="padding:1rem 0;">
                <div style="font-size:0.85rem; margin-bottom:0.5rem; color:#fff;">${ac.peerComparison.metric}</div>
                <div style="font-size:1.8rem; font-family:var(--font-mono); font-weight:800; color:var(--alert-high-risk);">${ac.peerComparison.thisAircraftWear}x Baseline</div>
                <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.4rem;">${ac.peerComparison.deltaNote}</p>
              </div>
              <div style="display:flex; gap:0.8rem; margin-top:1rem;">
                <button class="btn btn-primary btn-sm" onclick="window.location.hash='#/app/twin/${ac.id}'">View Full Digital Twin &rarr;</button>
                <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#/app/simulator'">Run What-If Simulation &rarr;</button>
              </div>
            </div>

            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>MAINTENANCE &amp; DEPOT HISTORY</h3>
                  <p>Past 6 months verification logs.</p>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:0.75rem;">
                ${ac.maintenanceHistory.map(m => `
                  <div style="background:rgba(255,255,255,0.03); padding:0.6rem 0.8rem; border-left:2px solid var(--border-cyan); border-radius:0 4px 4px 0;">
                    <div style="display:flex; justify-content:space-between; font-size:0.68rem; color:var(--text-muted); font-family:var(--font-mono);">
                      <span>${m.date}</span>
                      <span style="color:var(--brand-green);">${m.status}</span>
                    </div>
                    <div style="font-size:0.8rem; font-weight:700; color:#fff; margin-top:0.15rem;">${m.task}</div>
                    <div style="font-size:0.72rem; color:var(--text-secondary);">${m.depot} &bull; ${m.notes}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load aircraft data.</p>`;
    }
  }

  // --- 4. COMPONENT DETAIL VIEW (Explainable AI & Weak Signals) ---
  async function renderComponentView(componentId = 'AC-107-HYD-PUMP') {
    viewMountPoint.innerHTML = `
      <div class="loading-skeleton-screen">
        <div class="skeleton-header"></div>
        <div class="skeleton-grid"><div class="skeleton-card"></div><div class="skeleton-card"></div></div>
      </div>
    `;

    try {
      const res = await fetch(`/api/component/${componentId}`);
      const comp = await res.json();

      viewMountPoint.innerHTML = `
        <div class="component-view">
          <!-- Top Banner -->
          <div class="ac-header-card">
            <div>
              <h2>${comp.name} &bull; PREDICTIVE DIAGNOSTICS</h2>
              <p>${comp.category} &bull; Associated Aircraft: <strong>${comp.aircraftId}</strong></p>
            </div>
            <div class="ac-badges-right">
              <span class="badge-alert ${comp.riskLevel.toLowerCase().replace('_', '-')}">${comp.riskLevel}</span>
              <div class="rul-box">
                <span class="rul-label">REMAINING USEFUL LIFE (RUL)</span>
                <div class="rul-val">${comp.rulDays} Days</div>
                <span style="font-size:0.65rem; color:var(--text-muted); font-family:var(--font-mono);">${comp.confidenceInterval}</span>
              </div>
            </div>
          </div>

          <!-- Degradation Rate & Multi-Horizon Failure Risk -->
          <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:1.2rem; margin-bottom:1.5rem;">
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>DEGRADATION VELOCITY</h3>
                  <p>PINN Neural ODE trend tracking.</p>
                </div>
              </div>
              <div style="padding:1rem 0;">
                <div style="font-size:1.8rem; font-family:var(--font-mono); font-weight:800; color:var(--alert-high-risk);">${comp.degradationRate}</div>
                <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:0.5rem; line-height:1.4;">
                  Trend persistence confirms progressive micro-pitting. Traditional threshold sensor alarms will trigger only at Day 9, giving insufficient logistics reaction time.
                </p>
              </div>
            </div>

            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>MULTI-HORIZON PROBABILISTIC FAILURE RISK</h3>
                  <p>Cumulative probability of operational in-flight failure without intervention.</p>
                </div>
              </div>
              <div style="display:flex; justify-content:space-around; align-items:center; padding:0.8rem 0;">
                <div style="text-align:center;">
                  <div style="font-size:1.6rem; font-family:var(--font-mono); font-weight:800; color:var(--alert-warning);">${comp.failureRisk.risk7Days}%</div>
                  <div style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">7-Day Risk</div>
                </div>
                <div style="text-align:center;">
                  <div style="font-size:1.6rem; font-family:var(--font-mono); font-weight:800; color:var(--alert-high-risk);">${comp.failureRisk.risk14Days}%</div>
                  <div style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">14-Day Risk</div>
                </div>
                <div style="text-align:center;">
                  <div style="font-size:1.6rem; font-family:var(--font-mono); font-weight:800; color:var(--alert-critical);">${comp.failureRisk.risk30Days}%</div>
                  <div style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">30-Day Risk</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sensor Streams with Weak Signal Markers -->
          <div class="hud-card" style="margin-bottom:1.5rem;">
            <div class="card-header-clean">
              <div class="card-title-group">
                <h3>TELEMETRY SENSOR STREAMS &bull; WEAK-SIGNAL DETECTION</h3>
                <p>Tracking harmonic phase lag and persistence across 14 sorties (beyond simple threshold limits).</p>
              </div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
              ${comp.sensors.map(s => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid ${s.weakSignalDetected ? 'var(--alert-high-risk)' : 'var(--border-subtle)'}; padding:0.8rem; border-radius:4px;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">${s.name}</span>
                    ${s.weakSignalDetected ? '<span class="badge-alert high-risk">WEAK SIGNAL</span>' : '<span class="badge-alert normal">NOMINAL</span>'}
                  </div>
                  <div style="font-size:1.3rem; font-family:var(--font-mono); font-weight:800; color:#fff; margin:0.4rem 0;">${s.currentValue}</div>
                  <div style="font-size:0.68rem; color:var(--text-muted); font-family:var(--font-mono);">Threshold: ${s.thresholdValue} &bull; Baseline: ${s.baselineValue}</div>
                  <p style="font-size:0.72rem; color:${s.weakSignalDetected ? 'var(--alert-warning)' : 'var(--text-muted)'}; margin-top:0.4rem; line-height:1.3;">
                    ${s.weakSignalNote}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Explainable AI (XAI) Waterfall -->
          <div class="hud-card xai-waterfall-card">
            <div class="card-header-clean">
              <div class="card-title-group">
                <h3>EXPLAINABLE AI (XAI) &bull; FEATURE ATTRIBUTION WATERFALL</h3>
                <p>Plain-language contribution of telemetry vectors toward predicted failure.</p>
              </div>
              <span class="badge-alert info">SHAPLEY INFERENCE (3ms)</span>
            </div>
            <div>
              ${comp.explainableAi.map(x => `
                <div class="xai-bar-row">
                  <div class="xai-factor-name">
                    <strong>${x.factor}</strong>
                    <div style="font-size:0.68rem; color:var(--text-muted);">${x.description}</div>
                  </div>
                  <div class="xai-bar-track">
                    <div class="${x.contribution > 0 ? 'xai-fill-pos' : 'xai-fill-neg'}" style="width:${Math.abs(x.contribution) * 1.8}%;"></div>
                  </div>
                  <div class="xai-score" style="color:${x.contribution > 0 ? 'var(--alert-high-risk)' : 'var(--brand-green)'};">
                    ${x.contribution > 0 ? '+' : ''}${x.contribution}%
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3 Similar Historical Cases -->
          <div class="hud-card" style="margin-top:1.5rem;">
            <div class="card-header-clean">
              <div class="card-title-group">
                <h3>SIMILAR HISTORICAL SQUADRON INCIDENTS (DIGITAL MEMORY)</h3>
                <p>Matching failure signatures in IAF maintenance repository.</p>
              </div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem;">
              ${comp.historicalCases.map(h => `
                <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); padding:0.9rem; border-radius:4px; font-size:0.75rem;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
                    <strong style="color:var(--brand-cyan);">${h.caseId}</strong>
                    <span style="color:var(--brand-saffron); font-family:var(--font-mono);">${h.similarity}</span>
                  </div>
                  <div style="color:#fff; font-weight:600; margin-bottom:0.4rem;">${h.aircraft}</div>
                  <p style="color:var(--text-secondary); line-height:1.4;">${h.outcome}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; gap:1rem; margin-top:1.5rem;">
            <button class="btn btn-primary" onclick="window.location.hash='#/app/fault-graph/${comp.id}'">Inspect Fault Dependency Graph &rarr;</button>
            <button class="btn btn-secondary" onclick="window.location.hash='#/app/simulator'">Launch What-If Simulator &rarr;</button>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load component details.</p>`;
    }
  }

  // --- 5. FAULT DEPENDENCY GRAPH VIEW ---
  async function renderFaultGraphView(componentId = 'AC-107-HYD-PUMP') {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch(`/api/fault-graph/${componentId}`);
      const g = await res.json();

      viewMountPoint.innerHTML = `
        <div class="fault-graph-view">
          <div class="card-header-clean" style="margin-bottom:1rem;">
            <div class="card-title-group">
              <h2>${g.title}</h2>
              <p>Full causal chain: Symptom &rarr; Possible Cause &rarr; Component &rarr; Failure Mode &rarr; Maintenance &rarr; Spare.</p>
            </div>
            <span class="badge-alert info">INTERACTIVE NODE MAP</span>
          </div>

          <div class="fault-graph-stage">
            <canvas id="fault-graph-canvas" width="1050" height="500"></canvas>
            <div class="graph-floating-panel">
              <h4 id="graph-panel-title">Node Selected: Pump HP-3B</h4>
              <p id="graph-panel-desc">Click any node in the graph to illuminate its upstream causes and downstream maintenance actions.</p>
              <button class="btn btn-primary btn-xs" style="width:100%;" onclick="window.location.hash='#/app/simulator'">Simulate Failure Impact &rarr;</button>
            </div>
          </div>
        </div>
      `;

      initFaultGraphCanvas(g);
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load fault dependency graph.</p>`;
    }
  }

  function initFaultGraphCanvas(g) {
    const canvas = document.getElementById('fault-graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let selectedNode = g.nodes[3]; // Default to component

    function drawGraph() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Edges (Curved Beziers)
      g.edges.forEach(e => {
        const fromNode = g.nodes.find(n => n.id === e.from);
        const toNode = g.nodes.find(n => n.id === e.to);
        if (!fromNode || !toNode) return;

        const isHighlighted = selectedNode && (selectedNode.id === fromNode.id || selectedNode.id === toNode.id);
        ctx.strokeStyle = isHighlighted ? '#00e5ff' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;

        ctx.beginPath();
        const midX = (fromNode.x + toNode.x) / 2;
        ctx.moveTo(fromNode.x + 80, fromNode.y + 20);
        ctx.bezierCurveTo(midX, fromNode.y + 20, midX, toNode.y + 20, toNode.x, toNode.y + 20);
        ctx.stroke();

        // Edge label
        ctx.fillStyle = isHighlighted ? '#00e5ff' : 'rgba(255, 255, 255, 0.4)';
        ctx.font = '8px Consolas, monospace';
        ctx.fillText(e.label, midX - 20, (fromNode.y + toNode.y) / 2 + 10);
      });

      // Draw Nodes
      g.nodes.forEach(node => {
        const isSelected = selectedNode && selectedNode.id === node.id;
        ctx.fillStyle = isSelected ? '#12243d' : '#0a1526';
        ctx.strokeStyle = isSelected ? '#00e5ff' : 'rgba(0, 229, 255, 0.25)';
        ctx.lineWidth = isSelected ? 2 : 1;

        ctx.fillRect(node.x, node.y, 140, 48);
        ctx.strokeRect(node.x, node.y, 140, 48);

        // Node Type tag
        ctx.fillStyle = node.type === 'SYMPTOM' ? '#38bdf8' : node.type === 'CAUSE' ? '#f59e0b' : node.type === 'COMPONENT' ? '#f97316' : node.type === 'FAILURE_MODE' ? '#ef4444' : '#00e676';
        ctx.font = 'bold 8px Consolas, monospace';
        ctx.fillText(node.type, node.x + 8, node.y + 14);

        // Node Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(node.label, node.x + 8, node.y + 30);
      });
    }
    drawGraph();

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      for (const node of g.nodes) {
        if (x >= node.x && x <= node.x + 140 && y >= node.y && y <= node.y + 48) {
          selectedNode = node;
          playTone(950, 'sine', 0.1);
          const pTitle = document.getElementById('graph-panel-title');
          const pDesc = document.getElementById('graph-panel-desc');
          if (pTitle) pTitle.textContent = `${node.type}: ${node.label}`;
          if (pDesc) pDesc.textContent = node.detail;
          drawGraph();
          return;
        }
      }
    });
  }

  // --- 6. DIGITAL HEALTH TWIN VIEW ---
  async function renderDigitalTwinView(aircraftId = 'AC-107') {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch(`/api/twin/${aircraftId}`);
      const twin = await res.json();

      viewMountPoint.innerHTML = `
        <div class="twin-view">
          <div class="ac-header-card">
            <div>
              <h2>DIGITAL HEALTH TWIN &bull; ${twin.aircraftId}</h2>
              <p>${twin.type} &bull; Tail: <strong>${twin.tailNumber}</strong> &bull; Overall Health: <strong>${twin.overallHealth}%</strong></p>
            </div>
            <div style="display:flex; gap:0.6rem; align-items:center;">
              <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#/app/drishti/${twin.aircraftId}'">👁️ Open in DRISHTI 3D</button>
              <button class="btn btn-primary btn-sm" onclick="alert('Digital Twin stress cycle simulation active. Telemetry updated.');">⚡ Simulate Flight Stress Cycle</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1.8fr 1fr; gap:1.2rem;">
            <!-- Vector Aircraft Schematic with Component Heatmap -->
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>AIRFRAME SCHEMATIC &amp; SENSOR HEATMAP</h3>
                  <p>Spatial localization of degrading subsystem components.</p>
                </div>
              </div>
              <div style="position:relative; width:100%; height:420px; background:#040913; border:1px solid var(--border-muted); border-radius:4px; overflow:hidden;">
                <svg viewBox="0 0 900 480" style="width:100%; height:100%;">
                  <!-- Fuselage -->
                  <path d="M450,40 L462,110 L470,180 L478,250 L482,340 L488,400 L468,430 L452,430 L450,432 L448,430 L432,430 L412,400 L418,340 L422,250 L430,180 L438,110 Z" fill="rgba(15, 33, 56, 0.9)" stroke="#00e5ff" stroke-width="1.8"/>
                  <polygon points="450,30 460,90 440,90" fill="#00e5ff" opacity="0.3" stroke="#00e5ff" stroke-width="1.5"/>
                  <polygon points="432,160 380,185 390,210 431,195" fill="rgba(0, 229, 255, 0.2)" stroke="#00e5ff" stroke-width="1.5"/>
                  <polygon points="468,160 520,185 510,210 469,195" fill="rgba(0, 229, 255, 0.2)" stroke="#00e5ff" stroke-width="1.5"/>
                  <path d="M428,210 L230,300 L220,340 L280,340 L350,330 L422,320 Z" fill="rgba(10, 28, 50, 0.85)" stroke="#00e5ff" stroke-width="2"/>
                  <path d="M472,210 L670,300 L680,340 L620,340 L550,330 L478,320 Z" fill="rgba(10, 28, 50, 0.85)" stroke="#00e5ff" stroke-width="2"/>
                  <polygon points="420,320 380,390 395,410 426,380" fill="rgba(0, 229, 255, 0.25)" stroke="#00e5ff" stroke-width="1.5"/>
                  <polygon points="480,320 520,390 505,410 474,380" fill="rgba(0, 229, 255, 0.25)" stroke="#00e5ff" stroke-width="1.5"/>

                  <!-- Heatmap Nodes -->
                  ${twin.wearCoordinates.map(c => `
                    <g transform="translate(${c.x}, ${c.y})" style="cursor:pointer;" onclick="window.location.hash='#/app/component/AC-107-HYD-PUMP'">
                      <circle r="${c.status === 'HIGH_RISK' ? 12 : 8}" fill="${c.status === 'HIGH_RISK' ? 'var(--alert-high-risk)' : 'var(--brand-green)'}" opacity="0.8"/>
                      ${c.status === 'HIGH_RISK' ? `<circle r="18" fill="none" stroke="var(--alert-high-risk)" stroke-width="1.5" class="alert-pulse-ring"/>` : ''}
                      <text x="18" y="4" fill="#ffffff" font-size="11px" font-family="Consolas, monospace" font-weight="bold">${c.component} (${c.health}%)</text>
                    </g>
                  `).join('')}
                </svg>
              </div>
            </div>

            <!-- Operating Conditions & Stresses -->
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>OPERATIONAL ENVIRONMENT &amp; STRESSORS</h3>
                  <p>Real-world environmental fatigue accumulation.</p>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:1rem; font-size:0.8rem;">
                <div style="background:rgba(255,255,255,0.03); padding:0.8rem; border-radius:4px;">
                  <span style="color:var(--text-muted); font-size:0.7rem;">ENVIRONMENT</span>
                  <div style="font-weight:700; color:#fff; margin-top:0.2rem;">${twin.operatingCondition.environmentalStress}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03); padding:0.8rem; border-radius:4px;">
                  <span style="color:var(--text-muted); font-size:0.7rem;">G-LOAD EXCURSIONS (30D)</span>
                  <div style="font-weight:700; color:#fff; margin-top:0.2rem;">${twin.operatingCondition.gLoadCyclesLast30Days} cycles &bull; Max G: ${twin.operatingCondition.maxGRecorded}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03); padding:0.8rem; border-radius:4px;">
                  <span style="color:var(--text-muted); font-size:0.7rem;">AFTERBURNER / REHEAT RATIO</span>
                  <div style="font-weight:700; color:#fff; margin-top:0.2rem;">${twin.operatingCondition.engineReheatUsage}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load digital twin.</p>`;
    }
  }

  // --- 7. WHAT-IF SIMULATOR VIEW ---
  async function renderSimulatorView() {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch('/api/simulator');
      const sim = await res.json();

      viewMountPoint.innerHTML = `
        <div class="simulator-view">
          <div class="ac-header-card">
            <div>
              <h2>WHAT-IF MAINTENANCE STRATEGY SIMULATOR</h2>
              <p>Evaluating trade-offs for <strong>${sim.aircraftId}</strong> &bull; Subsystem: <strong>${sim.componentId}</strong></p>
            </div>
            <span class="badge-alert info">PRESCRIPTIVE DECISION SUPPORT</span>
          </div>

          <!-- 3 Side-by-Side Strategy Options -->
          <div class="simulator-options-grid">
            ${sim.options.map(opt => `
              <div class="sim-option-card ${opt.recommended ? 'recommended' : ''}">
                ${opt.recommended ? '<span class="badge-recommended">★ RECOMMENDED STRATEGY</span>' : ''}
                <div class="sim-opt-title">${opt.name}</div>
                <div class="sim-opt-timeline">Execution Window: <strong>${opt.timeline}</strong></div>

                <div class="sim-metrics-box">
                  <div class="sim-metric-row">
                    <span class="label">Projected Post Health:</span>
                    <span class="val" style="color:var(--brand-green);">${opt.projectedHealth}%</span>
                  </div>
                  <div class="sim-metric-row">
                    <span class="label">Catastrophic Failure Risk:</span>
                    <span class="val" style="color:${opt.catastrophicRisk < 5 ? 'var(--brand-green)' : 'var(--alert-critical)'};">${opt.catastrophicRisk}%</span>
                  </div>
                  <div class="sim-metric-row">
                    <span class="label">Downtime Duration:</span>
                    <span class="val">${opt.downtimeHours} Hours</span>
                  </div>
                  <div class="sim-metric-row">
                    <span class="label">Fleet Impact:</span>
                    <span class="val" style="font-size:0.7rem; color:var(--text-secondary); text-align:right;">${opt.fleetAvailabilityImpact}</span>
                  </div>
                  <div class="sim-metric-row">
                    <span class="label">Spare Allocation:</span>
                    <span class="val" style="font-size:0.7rem; color:var(--text-secondary); text-align:right;">${opt.spareImpact}</span>
                  </div>
                </div>

                <div class="sim-reasons-text">
                  <strong>Tactical Rationale:</strong> ${opt.reasons}
                </div>

                <button class="btn ${opt.recommended ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="alert('Strategy selected. Dispatched to Base Maintenance Planning Queue.'); window.location.hash='#/app/planning';">
                  ${opt.recommended ? 'COMMIT RECOMMENDED SCHEDULE &rarr;' : 'Select Alternative Strategy'}
                </button>
              </div>
            `).join('')}
          </div>

          <!-- Counterfactual Note -->
          <div class="counterfactual-callout">
            <strong>${sim.counterfactualNote}</strong>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load simulator data.</p>`;
    }
  }

  // --- 8. MAINTENANCE PLANNING & GANTT VIEW ---
  async function renderPlanningView() {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch('/api/planning');
      const plan = await res.json();

      viewMountPoint.innerHTML = `
        <div class="planning-view">
          <div class="ac-header-card">
            <div>
              <h2>MULTI-CONSTRAINT MAINTENANCE PLANNING ENGINE</h2>
              <p>Optimization Algorithm: <strong>${plan.algorithm}</strong></p>
            </div>
            <span class="badge-alert normal">DYNAMIC SCHEDULER ACTIVE</span>
          </div>

          <!-- Why Day 5 Callout -->
          <div style="background:rgba(0,229,255,0.08); border-left:3px solid var(--brand-cyan); padding:1rem; border-radius:0 4px 4px 0; margin-bottom:1.5rem; font-size:0.82rem; line-height:1.5;">
            <strong style="color:var(--brand-cyan);">Prescriptive Optimization Insight:</strong> ${plan.ac107Explanation}
          </div>

          <!-- Priority Queue Table -->
          <div class="hud-card" style="margin-bottom:1.5rem;">
            <div class="card-header-clean">
              <div class="card-title-group">
                <h3>DEPOT PRIORITY QUEUE (RISK &times; URGENCY &times; CONSTRAINTS)</h3>
                <p>Rank-ordered maintenance slots across 4 Forward Air Bases.</p>
              </div>
            </div>
            <div class="data-table-wrapper">
              <table class="cmd-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Aircraft ID</th>
                    <th>Required Maintenance Action</th>
                    <th>Depot Facility</th>
                    <th>Scheduled Window</th>
                    <th>Assigned Crew</th>
                    <th>Priority Index</th>
                  </tr>
                </thead>
                <tbody>
                  ${plan.priorityQueue.map(p => `
                    <tr>
                      <td class="mono-cell" style="color:var(--brand-saffron);">#${p.rank}</td>
                      <td class="mono-cell" style="color:var(--brand-cyan);">${p.aircraftId}</td>
                      <td>${p.task}</td>
                      <td>${p.bay}</td>
                      <td style="color:#fff; font-weight:600;">${p.window}</td>
                      <td>${p.team}</td>
                      <td class="mono-cell" style="color:var(--alert-high-risk); font-weight:800;">${p.priorityScore}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load planning data.</p>`;
    }
  }

  // --- 9. SPARES & INVENTORY VIEW ---
  async function renderSparesView() {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch('/api/spares');
      const spares = await res.json();

      viewMountPoint.innerHTML = `
        <div class="spares-view">
          <div class="ac-header-card">
            <div>
              <h2>DEPOT SPARES &amp; INVENTORY RADAR</h2>
              <p>Line-Replaceable Unit (LRU) buffer levels, HAL/DRDO lead times, and early shortage warnings.</p>
            </div>
            <span class="badge-alert warning">2 SHORTAGE WARNINGS</span>
          </div>

          <!-- Inventory Table -->
          <div class="hud-card">
            <div class="card-header-clean">
              <div class="card-title-group">
                <h3>LRU INVENTORY CATALOG &amp; DEMAND FORECAST (NEXT 30 DAYS)</h3>
                <p>Integrated with Depot Work Orders and maintenance priority queue.</p>
              </div>
            </div>
            <div class="data-table-wrapper">
              <table class="cmd-table">
                <thead>
                  <tr>
                    <th>Part Number</th>
                    <th>Component Name</th>
                    <th>Aircraft Fleet</th>
                    <th>In Stock</th>
                    <th>Reserved</th>
                    <th>30-Day Demand</th>
                    <th>Lead Time</th>
                    <th>Shortage Alert</th>
                    <th>Procurement Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${spares.inventory.map(sp => `
                    <tr class="${sp.status === 'CRITICAL_PROCUREMENT' ? 'crit-row' : sp.status === 'SHORTAGE_WARNING' ? 'warn-row' : 'info-row'}">
                      <td class="mono-cell" style="color:var(--brand-cyan);">${sp.partNumber}</td>
                      <td>${sp.name}</td>
                      <td>${sp.aircraft}</td>
                      <td class="mono-cell" style="color:${sp.inStock === 0 ? 'var(--alert-critical)' : 'inherit'}; font-weight:bold;">${sp.inStock}</td>
                      <td class="mono-cell">${sp.reserved}</td>
                      <td class="mono-cell">${sp.expectedDemand30d}</td>
                      <td class="mono-cell">${sp.leadTimeDays} Days</td>
                      <td><span class="badge-alert ${sp.status === 'CRITICAL_PROCUREMENT' ? 'critical' : sp.status === 'SHORTAGE_WARNING' ? 'warning' : 'normal'}">${sp.status.replace('_', ' ')}</span></td>
                      <td style="font-size:0.72rem; color:var(--text-secondary);">${sp.procurement}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load spares data.</p>`;
    }
  }

  // --- 10. PREDICTION & LEARNING VIEW (Closed-Loop Model Retraining) ---
  async function renderLearningView() {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch('/api/learning');
      const learn = await res.json();

      viewMountPoint.innerHTML = `
        <div class="learning-view">
          <div class="ac-header-card">
            <div>
              <h2>CONTINUOUS PREDICTION &amp; MODEL LEARNING (CLOSED LOOP)</h2>
              <p>Active Physics-Informed Neural Network: <strong>${learn.modelName}</strong> &bull; Trained Hours: <strong>${learn.trainedFlightHours.toLocaleString()} hrs</strong></p>
            </div>
            <button id="btn-retrain-model" class="btn btn-primary">🧠 Retrain Model with Verified Outcomes</button>
          </div>

          <!-- Model Accuracy & Drift Cards -->
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
            <div class="kpi-card">
              <span class="kpi-label">MODEL ACCURACY</span>
              <span class="kpi-num" id="learn-accuracy" style="color:var(--brand-green);">${learn.currentMetrics.accuracy}%</span>
              <span class="kpi-sub">Cross-validated across 4 bases</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">RUL PREDICTION ERROR</span>
              <span class="kpi-num" id="learn-rmse">${learn.currentMetrics.rmseDays} <small style="font-size:0.75rem;">Days</small></span>
              <span class="kpi-sub">RMSE error margin</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">R² EXPLAINED VARIANCE</span>
              <span class="kpi-num" style="color:var(--brand-cyan);">${learn.currentMetrics.rSquared}</span>
              <span class="kpi-sub">Physics-ODE fit</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">FALSE POSITIVE RATE</span>
              <span class="kpi-num" id="learn-fpr">${learn.currentMetrics.falsePositiveRate}%</span>
              <span class="kpi-sub">Target &lt; 2.5%</span>
            </div>
          </div>

          <!-- Post-Maintenance Verification & Drift -->
          <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:1.2rem;">
            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>POST-MAINTENANCE RECOVERY VERIFICATIONS</h3>
                  <p>Comparing pre-repair degradation against post-repair ground-run telemetry.</p>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:0.8rem;">
                ${learn.recentVerifications.map(v => `
                  <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:0.8rem; border-radius:4px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">
                      <span>${v.aircraftId} &bull; ${v.component}</span>
                      <span>Verified: ${v.date}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.4rem;">
                      <div>Pre: <strong>${v.preHealth}%</strong> &rarr; Post: <strong style="color:var(--brand-green);">${v.postHealth}%</strong> (<span style="color:var(--brand-green);">+${v.recoveryPercent}%</span>)</div>
                      <div class="mono-cell" style="font-size:0.75rem; color:var(--text-secondary);">Predicted ${v.predictedRulDays}d vs Actual ${v.actualFailureHorizonDays}d</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="hud-card">
              <div class="card-header-clean">
                <div class="card-title-group">
                  <h3>MODEL DRIFT RADAR</h3>
                  <p>Monitoring telemetry distribution shifts.</p>
                </div>
                <span class="badge-alert normal">${learn.modelDrift.status}</span>
              </div>
              <div style="padding:1rem 0; font-size:0.8rem; display:flex; flex-direction:column; gap:0.8rem;">
                <div>Concept Drift Index: <strong class="mono-cell" style="color:var(--brand-cyan);">${learn.modelDrift.conceptDriftIndex}</strong> (Nominal &lt; 0.10)</div>
                <div>Data Drift Index: <strong class="mono-cell" style="color:var(--brand-cyan);">${learn.modelDrift.dataDriftIndex}</strong> (Nominal &lt; 0.15)</div>
                <p style="font-size:0.72rem; color:var(--text-secondary); line-height:1.4; margin-top:0.4rem;">
                  Telemetry inputs reflect seasonal coastal monsoon humidity at AFS Thanjavur. Sensor drift remains compensated by Bayesian calibration.
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

      // Retrain Button Listener
      const btnRetrain = document.getElementById('btn-retrain-model');
      if (btnRetrain) {
        btnRetrain.addEventListener('click', async () => {
          btnRetrain.textContent = '🧠 Training in progress...';
          btnRetrain.disabled = true;
          try {
            const updRes = await fetch('/api/learning', { method: 'POST' });
            const upd = await updRes.json();
            playTone(1200, 'sine', 0.2);
            document.getElementById('learn-accuracy').textContent = `${upd.currentMetrics.accuracy}%`;
            document.getElementById('learn-rmse').innerHTML = `${upd.currentMetrics.rmseDays} <small style="font-size:0.75rem;">Days</small>`;
            document.getElementById('learn-fpr').textContent = `${upd.currentMetrics.falsePositiveRate}%`;
            btnRetrain.textContent = '✓ Retraining Complete (v4.3)';
            alert(upd.message);
          } catch (e) {
            btnRetrain.textContent = 'Retrain Error';
          }
        });
      }
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load learning data.</p>`;
    }
  }

  // --- 11. KNOWLEDGE ASSISTANT CHAT VIEW ---
  function renderAssistantView() {
    viewMountPoint.innerHTML = `
      <div class="assistant-view">
        <div class="ac-header-card">
          <div>
            <h2>SUDARSANA DEFENCE KNOWLEDGE ASSISTANT</h2>
            <p>Natural language diagnostic query engine indexing aircraft maintenance logs, HAL part manuals, and Technical Directives.</p>
          </div>
          <span class="badge-alert info">RECORD-GROUNDED AI</span>
        </div>

        <div class="assistant-chat-container">
          <div class="quick-questions-row">
            <span style="font-size:0.68rem; color:var(--text-muted); align-self:center;">SUGGESTED:</span>
            <button class="quick-q-btn" onclick="window.askAssistant('Why is AC-107 scheduled on Day 5 instead of immediately?')">Why is AC-107 scheduled on Day 5?</button>
            <button class="quick-q-btn" onclick="window.askAssistant('What is the status of AC-103 turbine blisk?')">What is the status of AC-103 blisk?</button>
            <button class="quick-q-btn" onclick="window.askAssistant('What spares are currently in shortage?')">What spares are in shortage?</button>
          </div>

          <div class="assistant-chat-messages" id="chat-messages">
            <div class="chat-bubble bot">
              <strong>SUDARSANA AI:</strong> Welcome, ${ROLES[activeRoleKey].name}. I am grounded in IAF technical publications and real-time depot work orders. Ask me any question regarding fleet availability, component degradation, or spare lead times.
            </div>
          </div>

          <div class="assistant-input-bar">
            <input type="text" id="assistant-user-input" placeholder="Type a maintenance question (e.g. Why is AC-107 scheduled on Day 5?)...">
            <button id="btn-assistant-send" class="btn btn-primary btn-sm">Ask Assistant &rarr;</button>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('assistant-user-input');
    const sendBtn = document.getElementById('btn-assistant-send');

    window.askAssistant = async function(text) {
      if (!text) return;
      const chatBox = document.getElementById('chat-messages');
      chatBox.innerHTML += `<div class="chat-bubble user">${text}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;

      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: text })
        });
        const data = await res.json();
        // Highlight record IDs like [REC-...]
        const formattedAnswer = data.answer.replace(/\[(.*?)\]/g, '<span class="record-id-cite">[$1]</span>');
        chatBox.innerHTML += `<div class="chat-bubble bot"><strong>SUDARSANA AI:</strong> ${formattedAnswer}</div>`;
        playTone(900, 'sine', 0.1);
      } catch (e) {
        chatBox.innerHTML += `<div class="chat-bubble bot" style="color:var(--alert-critical);">Error querying knowledge assistant.</div>`;
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        const val = input.value.trim();
        if (val) {
          window.askAssistant(val);
          input.value = '';
        }
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = input.value.trim();
          if (val) {
            window.askAssistant(val);
            input.value = '';
          }
        }
      });
    }
  }

  // --- 12. AUDIT TRAIL & DATA QUALITY VIEW ---
  async function renderAuditView() {
    viewMountPoint.innerHTML = `<div class="loading-skeleton-screen"><div class="skeleton-header"></div></div>`;
    try {
      const res = await fetch('/api/audit');
      const audit = await res.json();

      viewMountPoint.innerHTML = `
        <div class="audit-view">
          <div class="ac-header-card">
            <div>
              <h2>IMMUTABLE AUDIT TRAIL &amp; DATA QUALITY OVERSIGHT</h2>
              <p>Cryptographically validated flight safety compliance log and sensor telemetry health metrics.</p>
            </div>
            <span class="badge-alert normal">TAMPER-PROOF LEDGER</span>
          </div>

          <!-- Data Quality Health Cards -->
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
            <div class="kpi-card">
              <span class="kpi-label">TELEMETRY COMPLETENESS</span>
              <span class="kpi-num" style="color:var(--brand-green);">${audit.dataQuality.completeness}%</span>
              <span class="kpi-sub">Zero packet drop</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">TIMESTAMP JITTER CORRECTED</span>
              <span class="kpi-num">${audit.dataQuality.timestampJitterCorrected}</span>
              <span class="kpi-sub">Bayesian clock alignment</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">DUPLICATE LOG RECORDS</span>
              <span class="kpi-num" style="color:var(--brand-green);">${audit.dataQuality.duplicateRecords}</span>
              <span class="kpi-sub">Integrity verified</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">EDGE-SYNC STATUS</span>
              <span style="font-size:0.85rem; font-weight:700; color:var(--brand-cyan); margin-top:0.4rem;">${audit.dataQuality.edgeSyncStatus}</span>
            </div>
          </div>

          <!-- Audit Table -->
          <div class="hud-card">
            <div class="card-header-clean">
              <div class="card-title-group">
                <h3>HISTORICAL ACCESS &amp; PREDICTIVE ACTIONS LOG</h3>
                <p>Audited operational decisions, overrides, and schedule authorizations.</p>
              </div>
            </div>
            <div class="data-table-wrapper">
              <table class="cmd-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>UTC Timestamp</th>
                    <th>Officer / System</th>
                    <th>Role</th>
                    <th>Action Executed</th>
                    <th>Target Entity</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  ${audit.logs.map(l => `
                    <tr>
                      <td class="mono-cell" style="color:var(--brand-cyan);">${l.id}</td>
                      <td class="mono-cell">${l.timestamp}</td>
                      <td style="color:#fff; font-weight:600;">${l.user}</td>
                      <td><span class="badge-alert info">${l.role}</span></td>
                      <td>${l.action}</td>
                      <td class="mono-cell">${l.target}</td>
                      <td><span class="badge-alert normal">${l.result}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } catch (e) {
      viewMountPoint.innerHTML = `<p style="color:var(--alert-critical); padding:2rem;">Failed to load audit data.</p>`;
    }
  }

  // ========================================================
  // 12b. DRISHTI 3D — AIRCRAFT HEALTH EXPLORER VIEW
  // ========================================================
  let drishtiAnimFrame = null;
  let drishtiTelemetryInterval = null;
  let drishtiThreeRenderer = null;

  async function renderDrishtiView(aircraftId = 'AC-107') {
    // Clean up any ongoing 3D animation loop, timers, or previous WebGL renderer
    if (drishtiAnimFrame) {
      cancelAnimationFrame(drishtiAnimFrame);
      drishtiAnimFrame = null;
    }
    if (drishtiTelemetryInterval) {
      clearInterval(drishtiTelemetryInterval);
      drishtiTelemetryInterval = null;
    }
    if (drishtiThreeRenderer) {
      try { drishtiThreeRenderer.dispose(); } catch (e) {}
      drishtiThreeRenderer = null;
    }

    viewMountPoint.innerHTML = `
      <div class="loading-skeleton-screen">
        <div class="skeleton-header"></div>
        <div class="skeleton-grid"><div class="skeleton-card"></div><div class="skeleton-card"></div></div>
      </div>
    `;

    // 1. Fetch Aircraft 3D Model Data & Fleet List
    let ac = null;
    try {
      const res = await fetch(`/api/drishti/${aircraftId}`);
      ac = await res.json();
    } catch (e) {
      if (window.getDrishtiAircraftData) {
        ac = window.getDrishtiAircraftData(aircraftId);
      }
    }
    if (!ac || !ac.aircraftId) {
      ac = (window.getDrishtiAircraftData && window.getDrishtiAircraftData(aircraftId)) || {
        aircraftId,
        tailNumber: 'SB-188',
        name: `Sukhoi Su-30MKI (${aircraftId})`,
        type: 'Su-30MKI',
        squadron: 'No. 222 Squadron "Tigersharks"',
        base: 'AFS Thanjavur',
        overallHealth: 68,
        alertLevel: 'HIGH_RISK',
        predictiveSummary: { lowestRul: '9.8 Days', risk7d: 68, risk14d: 94, risk30d: 99.8, topAtRiskComponents: [] },
        parts: (window.DRISHTI_PARTS_LIBRARY && window.DRISHTI_PARTS_LIBRARY['AC-107']) || []
      };
    }

    let fleetList = [];
    try {
      const fRes = await fetch('/api/fleet');
      const fData = await fRes.json();
      fleetList = fData.aircraft || [];
    } catch (e) {
      fleetList = [
        { id: 'AC-107', tailNumber: 'SB-188', riskLevel: 'HIGH_RISK', healthScore: 68 },
        { id: 'AC-103', tailNumber: 'LA-5018', riskLevel: 'CRITICAL', healthScore: 48 },
        { id: 'AC-101', tailNumber: 'SB-042', riskLevel: 'NORMAL', healthScore: 94 },
        { id: 'AC-102', tailNumber: 'SB-098', riskLevel: 'NORMAL', healthScore: 91 },
        { id: 'AC-104', tailNumber: 'LA-5020', riskLevel: 'WARNING', healthScore: 78 }
      ];
    }
    if (!fleetList.some(item => item.id === ac.aircraftId)) {
      fleetList.unshift({ id: ac.aircraftId, tailNumber: ac.tailNumber, riskLevel: ac.alertLevel, healthScore: ac.overallHealth });
    }

    const parts = ac.parts || (window.DRISHTI_PARTS_LIBRARY && window.DRISHTI_PARTS_LIBRARY[aircraftId]) || (window.DRISHTI_PARTS_LIBRARY && window.DRISHTI_PARTS_LIBRARY['AC-107']) || [];
    const defaultPart = parts.find(p => p.alertLevel === 'HIGH_RISK' || p.alertLevel === 'CRITICAL') || parts[0];

    // Helper: Alert color
    function getRiskColorHex(level) {
      switch (level) {
        case 'CRITICAL': return 0xef4444;
        case 'HIGH_RISK': return 0xff5722;
        case 'WARNING': return 0xffb703;
        case 'INFORMATION': return 0x3a86ff;
        default: return 0x00e5ff;
      }
    }
    function getRiskCssVar(level) {
      switch (level) {
        case 'CRITICAL': return 'var(--alert-critical)';
        case 'HIGH_RISK': return 'var(--alert-high)';
        case 'WARNING': return 'var(--alert-warning)';
        case 'INFORMATION': return 'var(--alert-info)';
        default: return 'var(--brand-green)';
      }
    }

    // 2. Render HTML Shell
    viewMountPoint.innerHTML = `
      <div class="drishti-view">
        <!-- Top Bar with Aircraft Switcher & Chakra Ring -->
        <div class="drishti-header-bar">
          <div class="drishti-header-left">
            <select class="drishti-ac-selector" id="drishti-ac-switcher" title="Select Aircraft">
              ${fleetList.map(a => `
                <option value="${a.id}" ${a.id === ac.aircraftId ? 'selected' : ''}>
                  ${a.id} &bull; ${a.tailNumber || a.id} (${a.healthScore || 85}%) [${(a.riskLevel || 'NORMAL').replace('_', ' ')}]
                </option>
              `).join('')}
            </select>

            <div class="drishti-title-group">
              <h2>
                ${ac.name}
                <span class="badge-alert ${(ac.alertLevel || 'NORMAL').toLowerCase().replace('_', '-')}">
                  ${(ac.alertLevel || 'NORMAL').replace('_', ' ')}
                </span>
              </h2>
              <p>Tail: <strong>${ac.tailNumber}</strong> &bull; Squadron: ${ac.squadron} &bull; Base: ${ac.base}</p>
            </div>
          </div>

          <div class="drishti-header-right">
            <div class="chakra-ring-container" style="width:68px; height:68px;" title="Chakra Health Index">
              <svg class="chakra-svg-ring" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" class="chakra-ring-bg"></circle>
                <circle cx="50" cy="50" r="40" stroke="${ac.overallHealth > 80 ? 'var(--brand-green)' : ac.overallHealth > 60 ? 'var(--alert-warning)' : 'var(--alert-critical)'}" stroke-dasharray="251.2" stroke-dashoffset="${251.2 * (1 - ac.overallHealth / 100)}"></circle>
              </svg>
              <div class="chakra-ring-val">
                <span class="big-num" style="font-size:0.92rem;">${ac.overallHealth}%</span>
              </div>
            </div>

            <div class="drishti-sync-tag">
              <span>TELEMETRY STREAM: <strong>60 FPS ACTIVE</strong></span>
              <span>EARLIEST CRITICAL RUL: <strong style="color:var(--brand-cyan);">${ac.predictiveSummary ? ac.predictiveSummary.lowestRul : '9.8 Days'}</strong></span>
              <span>CONFIDENCE: <strong style="color:var(--brand-green);">${ac.predictiveSummary ? ac.predictiveSummary.modelConfidence : 94.2}%</strong></span>
            </div>
          </div>
        </div>

        <!-- Main Workspace (3D Viewport on Left, Part Detail Drawer on Right) -->
        <div class="drishti-main-workspace" id="drishti-workspace">
          <!-- 3D Canvas Viewport Box -->
          <div class="drishti-canvas-box" id="drishti-canvas-wrapper">
            <canvas id="drishti-three-canvas"></canvas>

            <!-- HUD Overlay Diagnostics -->
            <div class="drishti-hud-corner drishti-hud-tl">
              <span>DRISHTI 3D &bull; DIGITAL TWIN ENGINE</span><br>
              <span style="color:var(--text-muted);">TARGET: ${ac.aircraftId} &bull; ENGINE: THREE.JS WEBGL</span>
            </div>
            <div class="drishti-hud-corner drishti-hud-tr">
              <span>AZIMUTH: <span id="hud-azimuth">45°</span> &bull; ELEV: <span id="hud-elev">28°</span></span><br>
              <span id="hud-mode-indicator" style="color:var(--brand-cyan);">VIEW: HEALTH STATUS</span>
            </div>
            <div class="drishti-hud-corner drishti-hud-bl">
              <span>AIRFRAME: <strong style="color:#fff;">${ac.type}</strong></span><br>
              <span style="color:var(--text-muted);">CLICK ANY 3D PART OR HOTSPOT TO INSPECT</span>
            </div>
            <div class="drishti-hud-corner drishti-hud-br">
              <span id="hud-selected-part" style="color:var(--brand-cyan);">SELECT COMPONENT</span>
            </div>

            <!-- Quick Subsystem Selector Dropdown Pill -->
            <div class="drishti-part-quick-select">
              <select id="drishti-subsystem-select">
                <option value="">-- Jump to Subsystem Part --</option>
                ${parts.map(p => `
                  <option value="${p.componentId}">
                    ${p.name} [${p.health}% - ${(p.alertLevel || '').replace('_', ' ')}]
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Dynamic 3D Hotspot Chips Container -->
            <div class="drishti-hotspots-overlay" id="drishti-hotspots-layer"></div>

            <!-- Floating Controls Toolbar -->
            <div class="drishti-controls-bar">
              <!-- View modes -->
              <button class="drishti-ctrl-btn active" id="btn-mode-health" title="Health Risk Tints">🎨 Health</button>
              <button class="drishti-ctrl-btn" id="btn-mode-exploded" title="Exploded Subsystems View">💥 Exploded</button>
              <button class="drishti-ctrl-btn" id="btn-mode-xray" title="Wireframe / Internal X-Ray">🔬 X-Ray</button>
              <button class="drishti-ctrl-btn" id="btn-mode-sensors" title="Sensors Telemetry Heatmap">⚡ Sensors</button>
              <div class="drishti-ctrl-divider"></div>
              <!-- Camera presets -->
              <button class="drishti-ctrl-btn" id="btn-cam-front" title="Front View">Front</button>
              <button class="drishti-ctrl-btn" id="btn-cam-side" title="Side View">Side</button>
              <button class="drishti-ctrl-btn" id="btn-cam-top" title="Top View">Top</button>
              <button class="drishti-ctrl-btn" id="btn-cam-engine" title="Engine Zoom">Engine</button>
              <button class="drishti-ctrl-btn" id="btn-cam-gear" title="Landing Gear">Gear</button>
              <div class="drishti-ctrl-divider"></div>
              <button class="drishti-ctrl-btn" id="btn-ctrl-rotate" title="Toggle Auto-Rotation">🔄 Rotate</button>
              <button class="drishti-ctrl-btn" id="btn-ctrl-reset" title="Reset View">⟲ Reset</button>
            </div>
          </div>

          <!-- Part Detail Drawer (Right Panel) -->
          <div class="part-detail-drawer" id="part-detail-drawer">
            <!-- Dynamic Part Details injected here -->
          </div>
        </div>

        <!-- Aircraft Info Panel Below 3D View (Tabs) -->
        <div class="drishti-aircraft-info">
          <div class="info-tabs-nav">
            <button class="info-nav-pill active" data-tab="identity">1. Identity &amp; Configuration</button>
            <button class="info-nav-pill" data-tab="operating">2. Operating Status</button>
            <button class="info-nav-pill" data-tab="maintenance">3. Maintenance Summary</button>
            <button class="info-nav-pill" data-tab="predictive">4. Predictive Summary</button>
            <button class="info-nav-pill" data-tab="spares">5. Spares Readiness</button>
            <button class="info-nav-pill" data-tab="trend">6. Health Trend (30D)</button>
          </div>
          <div class="info-tab-panes" id="drishti-info-panes">
            <!-- Tab 1: Identity & Configuration -->
            <div class="info-tab-content-pane active" id="pane-identity">
              <div class="info-cards-grid">
                <div class="info-stat-card">
                  <div class="info-stat-label">AIRCRAFT TAIL &amp; MODEL</div>
                  <div class="info-stat-value">${ac.aircraftId} (${ac.tailNumber})</div>
                  <div class="info-stat-sub">${ac.name}</div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">OPERATIONAL SQUADRON &amp; BASE</div>
                  <div class="info-stat-value">${ac.squadron}</div>
                  <div class="info-stat-sub">Stationed: ${ac.base}</div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">PROPULSION &amp; ENGINES</div>
                  <div class="info-stat-value">${ac.engineCount || 2}x Turbofans</div>
                  <div class="info-stat-sub">${ac.engineType || 'AL-31FP Thrust-Vectoring'}</div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">CONFIGURATION &amp; ROLE</div>
                  <div class="info-stat-value">${ac.role || 'Air Superiority'}</div>
                  <div class="info-stat-sub">${ac.configuration || 'Multi-Role Tactical Strike'}</div>
                </div>
              </div>
            </div>

            <!-- Tab 2: Operating Status -->
            <div class="info-tab-content-pane" id="pane-operating">
              <div class="info-cards-grid">
                <div class="info-stat-card">
                  <div class="info-stat-label">TOTAL AIRFRAME FLIGHT HOURS</div>
                  <div class="info-stat-value">${ac.operatingStatus ? ac.operatingStatus.flightHours : 1482.4} hrs</div>
                  <div class="info-stat-sub">Cycles: ${ac.operatingStatus ? ac.operatingStatus.flightCycles : 946} combat/routine landings</div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">CURRENT OPERATIONAL STATUS</div>
                  <div class="info-stat-value" style="color:${ac.alertLevel === 'HIGH_RISK' ? 'var(--alert-high)' : ac.alertLevel === 'CRITICAL' ? 'var(--alert-critical)' : 'var(--brand-green)'};">
                    ${ac.operatingStatus ? ac.operatingStatus.statusLabel : 'At Risk (Managed Sorties)'}
                  </div>
                  <div class="info-stat-sub">Recent Sortie: ${ac.operatingStatus ? ac.operatingStatus.lastFlight : 'Routine Patrol'}</div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">NEXT PLANNED MISSION</div>
                  <div class="info-stat-value" style="font-size:0.95rem;">${ac.operatingStatus ? ac.operatingStatus.nextMission : 'CAP Sortie #TK-402'}</div>
                  <div class="info-stat-sub">Mission flight readiness rating: <strong>${ac.overallHealth}%</strong></div>
                </div>
              </div>
            </div>

            <!-- Tab 3: Maintenance Summary -->
            <div class="info-tab-content-pane" id="pane-maintenance">
              <div class="info-cards-grid">
                <div class="info-stat-card">
                  <div class="info-stat-label">LAST TURNAROUND INSPECTION</div>
                  <div class="info-stat-value" style="font-size:0.95rem;">${ac.maintenanceSummary ? ac.maintenanceSummary.lastMaintenance : '2026-08-14 (50-Hour Turnaround)'}</div>
                  <div class="info-stat-sub">Past recorded faults: <strong>${ac.maintenanceSummary ? ac.maintenanceSummary.pastFaultsCount : 4}</strong></div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">NEXT OPTIMAL DEPOT WINDOW</div>
                  <div class="info-stat-value" style="color:var(--brand-cyan); font-size:0.95rem;">${ac.maintenanceSummary ? ac.maintenanceSummary.nextPlannedWindow : 'Day 5 &bull; Bay 3 AFS Thanjavur'}</div>
                  <div class="info-stat-sub">Active Open Tasks: <strong>${ac.maintenanceSummary ? ac.maintenanceSummary.openTasks : 2}</strong></div>
                </div>
                <div class="info-stat-card" style="grid-column: span 2;">
                  <div class="info-stat-label">RECURRENCE PATTERNS &amp; FLEET HISTORY</div>
                  <div class="info-stat-value" style="font-size:0.85rem; font-weight:normal; line-height:1.4;">
                    ${ac.maintenanceSummary ? ac.maintenanceSummary.recurrenceFlags : 'Hydraulic micro-jitter pattern verified against Squadron archives.'}
                  </div>
                  <div class="info-stat-sub" style="color:var(--brand-cyan);">Matched with 24 Base Repair Depot benchmark historical dataset.</div>
                </div>
              </div>
            </div>

            <!-- Tab 4: Predictive Summary -->
            <div class="info-tab-content-pane" id="pane-predictive">
              <div class="failure-horizons-row" style="margin-bottom:1rem;">
                <div class="horizon-box ${ac.predictiveSummary && ac.predictiveSummary.risk7d > 50 ? 'high-risk' : ''}">
                  <div class="horizon-label">7-DAY FAILURE RISK</div>
                  <div class="horizon-val" style="color:${ac.predictiveSummary && ac.predictiveSummary.risk7d > 50 ? 'var(--alert-high)' : 'var(--brand-green)'};">
                    ${ac.predictiveSummary ? ac.predictiveSummary.risk7d : 68}%
                  </div>
                </div>
                <div class="horizon-box ${ac.predictiveSummary && ac.predictiveSummary.risk14d > 50 ? 'high-risk' : ''}">
                  <div class="horizon-label">14-DAY FAILURE RISK</div>
                  <div class="horizon-val" style="color:${ac.predictiveSummary && ac.predictiveSummary.risk14d > 50 ? 'var(--alert-high)' : 'var(--alert-warning)'};">
                    ${ac.predictiveSummary ? ac.predictiveSummary.risk14d : 94}%
                  </div>
                </div>
                <div class="horizon-box high-risk">
                  <div class="horizon-label">30-DAY FAILURE RISK</div>
                  <div class="horizon-val" style="color:var(--alert-critical);">
                    ${ac.predictiveSummary ? ac.predictiveSummary.risk30d : 99.8}%
                  </div>
                </div>
              </div>
              <div class="info-cards-grid">
                <div class="info-stat-card">
                  <div class="info-stat-label">TOP AT-RISK COMPONENTS</div>
                  ${(ac.predictiveSummary && ac.predictiveSummary.topAtRiskComponents && ac.predictiveSummary.topAtRiskComponents.length > 0) ?
                    ac.predictiveSummary.topAtRiskComponents.map(c => `
                      <div style="display:flex; justify-content:space-between; font-size:0.78rem; padding:0.3rem 0; border-bottom:1px solid rgba(255,255,255,0.06);">
                        <span>${c.name}</span>
                        <strong style="color:${c.risk === 'HIGH_RISK' ? 'var(--alert-high)' : c.risk === 'CRITICAL' ? 'var(--alert-critical)' : 'var(--brand-green)'};">${c.health}% (${c.rul})</strong>
                      </div>
                    `).join('') :
                    '<div style="font-size:0.75rem; color:var(--text-secondary);">All components operating within nominal limits.</div>'
                  }
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">PHYSICS-INFORMED AI PREDICTIONS</div>
                  <ul style="font-size:0.76rem; color:var(--text-secondary); margin:0; padding-left:1.1rem; line-height:1.5;">
                    ${(ac.predictiveSummary && ac.predictiveSummary.predictedFaults && ac.predictiveSummary.predictedFaults.length > 0) ?
                      ac.predictiveSummary.predictedFaults.map(f => `<li>${f}</li>`).join('') :
                      '<li>Zero active micro-fault anomalies detected in current flight cycle.</li>'
                    }
                  </ul>
                  <div style="margin-top:0.6rem; font-size:0.72rem; color:var(--brand-cyan);">Confidence Interval: <strong>±1.2 Days (95% CI)</strong></div>
                </div>
              </div>
            </div>

            <!-- Tab 5: Spares Readiness -->
            <div class="info-tab-content-pane" id="pane-spares">
              <div class="info-cards-grid">
                <div class="info-stat-card">
                  <div class="info-stat-label">REQUIRED SPARE ASSEMBLIES</div>
                  <div class="info-stat-value" style="font-size:0.95rem;">${ac.sparesReadiness ? ac.sparesReadiness.requiredSpares : 'HAL Part #HP-3B-MK2'}</div>
                  <div class="info-stat-sub">Stock Status: <strong style="color:var(--brand-cyan);">${ac.sparesReadiness ? ac.sparesReadiness.stockStatus : '1 in stock'}</strong></div>
                </div>
                <div class="info-stat-card">
                  <div class="info-stat-label">SUPPLY CHAIN &amp; EARLY WARNING</div>
                  <div class="info-stat-value" style="font-size:0.85rem; color:var(--alert-warning); line-height:1.4;">
                    ${ac.sparesReadiness ? ac.sparesReadiness.shortageWarning : 'SHORTAGE ADVISORY: Buffer units in transit from HAL Nashik'}
                  </div>
                  <div class="info-stat-sub">Requisition link: <a href="#/app/spares" style="color:var(--brand-cyan);">Open Spares Inventory Radar &rarr;</a></div>
                </div>
              </div>
            </div>

            <!-- Tab 6: 30-Day Health Trend -->
            <div class="info-tab-content-pane" id="pane-trend">
              <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); border-radius:4px; padding:1rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem;">
                  <span style="font-size:0.78rem; font-family:var(--font-mono); color:var(--text-secondary);">
                    AIRCRAFT HEALTH PROFILE &bull; LAST 30 DAYS
                  </span>
                  <span style="font-size:0.78rem; font-family:var(--font-mono); color:${ac.overallHealth > 75 ? 'var(--brand-green)' : 'var(--alert-high)'};">
                    Current: <strong>${ac.overallHealth}%</strong>
                  </span>
                </div>
                <div style="height:120px; width:100%; position:relative;">
                  <svg viewBox="0 0 600 120" style="width:100%; height:100%; overflow:visible;">
                    <!-- Normal baseline guideline -->
                    <line x1="0" y1="30" x2="600" y2="30" stroke="rgba(0, 229, 255, 0.2)" stroke-dasharray="4,4" stroke-width="1"/>
                    <text x="5" y="24" fill="rgba(0, 229, 255, 0.4)" font-size="9" font-family="monospace">OPTIMAL BAND (90%)</text>
                    <!-- Warning threshold guideline -->
                    <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(255, 183, 3, 0.25)" stroke-dasharray="4,4" stroke-width="1"/>
                    <text x="5" y="74" fill="rgba(255, 183, 3, 0.4)" font-size="9" font-family="monospace">WARNING THRESHOLD (65%)</text>

                    <!-- Trend line -->
                    <path d="${(() => {
                      const trend = ac.healthTrend30d || [94, 92, 91, 88, 85, 80, 75, 71, 68];
                      const stepX = 600 / (trend.length - 1);
                      return trend.map((val, i) => {
                        const x = i * stepX;
                        const y = 120 - (val / 100) * 100;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');
                    })()}" fill="none" stroke="${ac.overallHealth > 75 ? '#00e5ff' : '#ff5722'}" stroke-width="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // 3. Tab Navigation Event Listeners (Bottom Info Panel)
    const infoTabs = document.querySelectorAll('.info-nav-pill');
    infoTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        infoTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetId = `pane-${tab.getAttribute('data-tab')}`;
        document.querySelectorAll('.info-tab-content-pane').forEach(p => p.classList.remove('active'));
        const activePane = document.getElementById(targetId);
        if (activePane) activePane.classList.add('active');
        playTone(920, 'sine', 0.08);
      });
    });

    // 4. Aircraft Switcher Dropdown Listener
    const acSwitcher = document.getElementById('drishti-ac-switcher');
    if (acSwitcher) {
      acSwitcher.addEventListener('change', (e) => {
        const nextId = e.target.value;
        playTone(1100, 'sine', 0.1);
        window.location.hash = `#/app/drishti/${nextId}`;
      });
    }

    // 5. Build Three.js 3D Scene
    const canvas = document.getElementById('drishti-three-canvas');
    const container = document.getElementById('drishti-canvas-wrapper');
    if (!canvas || !container || typeof THREE === 'undefined') {
      console.warn('Three.js or canvas not found for Drishti 3D view.');
      return;
    }

    const scene = new THREE.Scene();
    drishtiThreeScene = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4.8, 2.8, 4.8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    drishtiThreeRenderer = renderer;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 16;
    controls.minDistance = 1.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't flip below ground
    controls.target.set(0, 0, 0);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x384c66, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(6, 12, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00e5ff, 1.2);
    dirLight2.position.set(-8, -4, -6);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00e5ff, 2.5, 20);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    // Holographic Sudarshana Chakra Radar Ground Disc
    const chakraRadarGroup = new THREE.Group();
    chakraRadarGroup.position.y = -1.35;
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.28, wireframe: true });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.15 });
    const chakraRing1 = new THREE.Mesh(new THREE.RingGeometry(1.6, 1.63, 48), ringMat1);
    chakraRing1.rotation.x = -Math.PI / 2;
    chakraRadarGroup.add(chakraRing1);

    const chakraRing2 = new THREE.Mesh(new THREE.RingGeometry(3.0, 3.04, 64), ringMat1);
    chakraRing2.rotation.x = -Math.PI / 2;
    chakraRadarGroup.add(chakraRing2);

    const chakraRing3 = new THREE.Mesh(new THREE.RingGeometry(4.4, 4.45, 64), ringMat1);
    chakraRing3.rotation.x = -Math.PI / 2;
    chakraRadarGroup.add(chakraRing3);

    // Radar spokes
    const spokeMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.2 });
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const points = [
        new THREE.Vector3(Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4),
        new THREE.Vector3(Math.cos(angle) * 4.6, 0, Math.sin(angle) * 4.6)
      ];
      const spokeGeo = new THREE.BufferGeometry().setFromPoints(points);
      chakraRadarGroup.add(new THREE.Line(spokeGeo, spokeMat));
    }
    scene.add(chakraRadarGroup);

    // ========================================================
    // BUILD PROCEDURAL FIGHTER JET WITH NAMED SUBSYSTEM GROUPS
    // ========================================================
    const jetRoot = new THREE.Group();
    scene.add(jetRoot);

    const interactiveGroups = [];
    const interactiveMeshes = [];
    const turbineDiscs = [];

    // Base Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x223047,
      metalness: 0.8,
      roughness: 0.35
    });
    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x141f30,
      metalness: 0.85,
      roughness: 0.4
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.45
    });

    // Subsystem Exploded Offset Definitions & Mesh Construction
    function createSubsystemGroup(name, componentId, explodedOffset) {
      const grp = new THREE.Group();
      grp.name = name;
      grp.userData = {
        name,
        componentId,
        basePos: new THREE.Vector3(0, 0, 0),
        explodedOffset: explodedOffset || new THREE.Vector3(0, 0, 0),
        currentOffset: new THREE.Vector3(0, 0, 0)
      };
      interactiveGroups.push(grp);
      jetRoot.add(grp);
      return grp;
    }

    // 1. Fuselage Core Group
    const fuselageGrp = createSubsystemGroup('Fuselage', `${ac.aircraftId}-AIRFRAME`, new THREE.Vector3(0, 0, 0));
    // Center fuselage body
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 3.8, 16);
    bodyGeo.rotateX(Math.PI / 2);
    const bodyMesh = new THREE.Mesh(bodyGeo, titaniumMat);
    bodyMesh.position.set(0, 0, 0);
    fuselageGrp.add(bodyMesh);

    // Forward fuselage
    const fwdGeo = new THREE.ConeGeometry(0.55, 1.8, 16);
    fwdGeo.rotateX(-Math.PI / 2);
    const fwdMesh = new THREE.Mesh(fwdGeo, titaniumMat);
    fwdMesh.position.set(0, 0, 2.8);
    fuselageGrp.add(fwdMesh);

    // 2. Radome / Radar Group (Nose)
    const radarPart = parts.find(p => p.meshKey === 'radar' || p.componentId.includes('RADAR')) || {
      name: 'Bars N011M Phased Array Radar',
      componentId: `${ac.aircraftId}-RADAR`,
      alertLevel: 'NORMAL',
      health: 96
    };
    const radomeGrp = createSubsystemGroup('Radome / Radar', radarPart.componentId, new THREE.Vector3(0, 0, 1.6));
    const radomeMat = new THREE.MeshStandardMaterial({
      color: getRiskColorHex(radarPart.alertLevel),
      emissive: radarPart.alertLevel !== 'NORMAL' ? getRiskColorHex(radarPart.alertLevel) : 0x002233,
      emissiveIntensity: radarPart.alertLevel !== 'NORMAL' ? 0.6 : 0.2,
      metalness: 0.65,
      roughness: 0.35
    });
    const radomeGeo = new THREE.ConeGeometry(0.38, 1.4, 16);
    radomeGeo.rotateX(-Math.PI / 2);
    const radomeMesh = new THREE.Mesh(radomeGeo, radomeMat);
    radomeMesh.position.set(0, 0, 4.4);
    radomeMesh.userData = { partData: radarPart, name: 'Radar / Radome', componentId: radarPart.componentId };
    radomeGrp.add(radomeMesh);
    interactiveMeshes.push(radomeMesh);

    // Pitot tube
    const pitotGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    pitotGeo.rotateX(Math.PI / 2);
    const pitotMesh = new THREE.Mesh(pitotGeo, darkTrimMat);
    pitotMesh.position.set(0, 0, 5.4);
    radomeGrp.add(pitotMesh);

    // 3. Cockpit & Avionics Group
    const avionicsPart = parts.find(p => p.meshKey === 'avionics' || p.componentId.includes('AVIONICS')) || {
      name: 'Integrated Glass Cockpit & Fly-by-Wire',
      componentId: `${ac.aircraftId}-AVIONICS`,
      alertLevel: 'NORMAL',
      health: 94
    };
    const cockpitGrp = createSubsystemGroup('Cockpit & Avionics', avionicsPart.componentId, new THREE.Vector3(0, 1.0, 0.4));
    const canopyGeo = new THREE.SphereGeometry(0.48, 16, 16);
    canopyGeo.scale(0.65, 0.7, 2.2);
    const canopyMesh = new THREE.Mesh(canopyGeo, glassMat);
    canopyMesh.position.set(0, 0.42, 1.8);
    canopyMesh.userData = { partData: avionicsPart, name: 'Glass Cockpit & Avionics', componentId: avionicsPart.componentId };
    cockpitGrp.add(canopyMesh);
    interactiveMeshes.push(canopyMesh);

    // 4. Port Wing & Controls Group
    const flightCtrlPart = parts.find(p => p.meshKey === 'flight_controls' || p.componentId.includes('FLIGHT-CTRL')) || {
      name: 'Primary Flight Control Surfaces',
      componentId: `${ac.aircraftId}-FLIGHT-CTRL`,
      alertLevel: 'NORMAL',
      health: 92
    };
    const portWingGrp = createSubsystemGroup('Port Wing', flightCtrlPart.componentId, new THREE.Vector3(-1.4, 0, -0.3));
    // Main delta swept wing
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(-2.6, -1.8);
    wingShape.lineTo(-2.4, -2.4);
    wingShape.lineTo(-0.2, -1.4);
    wingShape.closePath();
    const wingExtrude = new THREE.ExtrudeGeometry(wingShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 });
    wingExtrude.rotateX(Math.PI / 2);
    const portWingMesh = new THREE.Mesh(wingExtrude, titaniumMat);
    portWingMesh.position.set(-0.5, 0.02, 0.6);
    portWingMesh.userData = { partData: flightCtrlPart, name: 'Port Flight Surfaces', componentId: flightCtrlPart.componentId };
    portWingGrp.add(portWingMesh);
    interactiveMeshes.push(portWingMesh);

    // 5. Starboard Wing Group
    const stbWingGrp = createSubsystemGroup('Starboard Wing', flightCtrlPart.componentId, new THREE.Vector3(1.4, 0, -0.3));
    const stbWingShape = new THREE.Shape();
    stbWingShape.moveTo(0, 0);
    stbWingShape.lineTo(2.6, -1.8);
    stbWingShape.lineTo(2.4, -2.4);
    stbWingShape.lineTo(0.2, -1.4);
    stbWingShape.closePath();
    const stbWingExtrude = new THREE.ExtrudeGeometry(stbWingShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 });
    stbWingExtrude.rotateX(Math.PI / 2);
    const stbWingMesh = new THREE.Mesh(stbWingExtrude, titaniumMat);
    stbWingMesh.position.set(0.5, 0.02, 0.6);
    stbWingMesh.userData = { partData: flightCtrlPart, name: 'Starboard Flight Surfaces', componentId: flightCtrlPart.componentId };
    stbWingGrp.add(stbWingMesh);
    interactiveMeshes.push(stbWingMesh);

    // Canards (Foreplanes)
    const canardPortGeo = new THREE.BoxGeometry(0.9, 0.04, 0.5);
    canardPortGeo.rotateY(0.3);
    const canardPort = new THREE.Mesh(canardPortGeo, darkTrimMat);
    canardPort.position.set(-0.9, 0.12, 1.4);
    portWingGrp.add(canardPort);

    const canardStbGeo = new THREE.BoxGeometry(0.9, 0.04, 0.5);
    canardStbGeo.rotateY(-0.3);
    const canardStb = new THREE.Mesh(canardStbGeo, darkTrimMat);
    canardStb.position.set(0.9, 0.12, 1.4);
    stbWingGrp.add(canardStb);

    // 6. Twin Vertical Stabilizers (Fins)
    const finPortGeo = new THREE.BoxGeometry(0.08, 1.4, 0.9);
    finPortGeo.rotateZ(0.14); // Canted outward
    const finPortMesh = new THREE.Mesh(finPortGeo, titaniumMat);
    finPortMesh.position.set(-0.75, 0.8, -1.2);
    portWingGrp.add(finPortMesh);

    const finStbGeo = new THREE.BoxGeometry(0.08, 1.4, 0.9);
    finStbGeo.rotateZ(-0.14);
    const finStbMesh = new THREE.Mesh(finStbGeo, titaniumMat);
    finStbMesh.position.set(0.75, 0.8, -1.2);
    stbWingGrp.add(finStbMesh);

    // 7. Port Engine AL-31FP Group
    const engPortPart = parts.find(p => p.meshKey === 'engine_port' || p.componentId.includes('ENG-1')) || {
      name: 'Port Engine (AL-31FP Turbofan #1)',
      componentId: `${ac.aircraftId}-ENG-1`,
      alertLevel: 'NORMAL',
      health: 88
    };
    const engPortGrp = createSubsystemGroup('Port Engine', engPortPart.componentId, new THREE.Vector3(-0.9, -0.3, -1.2));
    const engCylGeo = new THREE.CylinderGeometry(0.34, 0.36, 2.6, 16);
    engCylGeo.rotateX(Math.PI / 2);
    const engPortMat = new THREE.MeshStandardMaterial({
      color: 0x1f2638,
      metalness: 0.9,
      roughness: 0.25
    });
    const engPortMesh = new THREE.Mesh(engCylGeo, engPortMat);
    engPortMesh.position.set(-0.72, -0.15, -0.9);
    engPortMesh.userData = { partData: engPortPart, name: 'Port Engine AL-31FP', componentId: engPortPart.componentId };
    engPortGrp.add(engPortMesh);
    interactiveMeshes.push(engPortMesh);

    // Engine nozzle with afterburner ring
    const nozzleGeo = new THREE.CylinderGeometry(0.34, 0.28, 0.6, 16);
    nozzleGeo.rotateX(Math.PI / 2);
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.15 });
    const nozzlePort = new THREE.Mesh(nozzleGeo, nozzleMat);
    nozzlePort.position.set(-0.72, -0.15, -2.4);
    engPortGrp.add(nozzlePort);

    // Rotating Turbine Disc
    const turbineGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 12);
    turbineGeo.rotateX(Math.PI / 2);
    const turbineMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x0088aa,
      emissiveIntensity: 0.5,
      metalness: 0.9
    });
    const turbinePort = new THREE.Mesh(turbineGeo, turbineMat);
    turbinePort.position.set(-0.72, -0.15, -2.2);
    engPortGrp.add(turbinePort);
    turbineDiscs.push(turbinePort);

    // 8. Starboard Engine AL-31FP Group
    const engStbPart = parts.find(p => p.meshKey === 'engine_starboard' || p.componentId.includes('ENG-2')) || {
      name: 'Starboard Engine (AL-31FP Turbofan #2)',
      componentId: `${ac.aircraftId}-ENG-2`,
      alertLevel: 'NORMAL',
      health: 91
    };
    const engStbGrp = createSubsystemGroup('Starboard Engine', engStbPart.componentId, new THREE.Vector3(0.9, -0.3, -1.2));
    const engStbMesh = new THREE.Mesh(engCylGeo, engPortMat);
    engStbMesh.position.set(0.72, -0.15, -0.9);
    engStbMesh.userData = { partData: engStbPart, name: 'Starboard Engine AL-31FP', componentId: engStbPart.componentId };
    engStbGrp.add(engStbMesh);
    interactiveMeshes.push(engStbMesh);

    const nozzleStb = new THREE.Mesh(nozzleGeo, nozzleMat);
    nozzleStb.position.set(0.72, -0.15, -2.4);
    engStbGrp.add(nozzleStb);

    const turbineStb = new THREE.Mesh(turbineGeo, turbineMat);
    turbineStb.position.set(0.72, -0.15, -2.2);
    engStbGrp.add(turbineStb);
    turbineDiscs.push(turbineStb);

    // 9. HIGH-PRESSURE HYDRAULIC PUMP UNIT HP-3B (Focal Anomaly Component)
    const hydPumpPart = parts.find(p => p.meshKey === 'hydraulic_pump' || p.componentId.includes('HYD-PUMP')) || {
      name: 'Hydraulic Pump Unit HP-3B',
      componentId: `${ac.aircraftId}-HYD-PUMP`,
      alertLevel: 'HIGH_RISK',
      health: 64
    };
    const hydPumpGrp = createSubsystemGroup('Hydraulic Pump HP-3B', hydPumpPart.componentId, new THREE.Vector3(-1.6, 0.9, -0.2));
    
    // Hydraulic pump unit geometry & high-visibility alert material
    const pumpRiskColor = getRiskColorHex(hydPumpPart.alertLevel);
    const pumpMat = new THREE.MeshStandardMaterial({
      color: pumpRiskColor,
      emissive: pumpRiskColor,
      emissiveIntensity: hydPumpPart.alertLevel === 'HIGH_RISK' ? 0.75 : hydPumpPart.alertLevel === 'CRITICAL' ? 0.95 : 0.3,
      metalness: 0.85,
      roughness: 0.25
    });

    // Pump main cylinder barrel
    let hydPumpMesh = null;
    const pumpCasingGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.42, 16);
    pumpCasingGeo.rotateZ(Math.PI / 2);
    const pumpMesh = new THREE.Mesh(pumpCasingGeo, pumpMat);
    hydPumpMesh = pumpMesh;
    pumpMesh.position.set(-0.62, 0.08, -0.2);
    pumpMesh.userData = { partData: hydPumpPart, name: 'Hydraulic Pump Unit HP-3B', componentId: hydPumpPart.componentId };
    hydPumpGrp.add(pumpMesh);
    interactiveMeshes.push(pumpMesh);

    // 9-piston rotating barrel accent
    const barrelGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.24, 9);
    barrelGeo.rotateZ(Math.PI / 2);
    const barrelMesh = new THREE.Mesh(barrelGeo, darkTrimMat);
    barrelMesh.position.set(-0.82, 0.08, -0.2);
    hydPumpGrp.add(barrelMesh);

    // High pressure manifold delivery block
    const valveBlockGeo = new THREE.BoxGeometry(0.22, 0.18, 0.24);
    const valveBlock = new THREE.Mesh(valveBlockGeo, pumpMat);
    valveBlock.position.set(-0.46, 0.14, -0.2);
    valveBlock.userData = { partData: hydPumpPart, name: 'Hydraulic Pump Valve Block', componentId: hydPumpPart.componentId };
    hydPumpGrp.add(valveBlock);
    interactiveMeshes.push(valveBlock);

    // Hydraulic delivery tubing lines
    const hydLineGeo = new THREE.TorusGeometry(0.25, 0.03, 8, 24, Math.PI);
    hydLineGeo.rotateX(Math.PI / 2);
    const hydLine = new THREE.Mesh(hydLineGeo, pumpMat);
    hydLine.position.set(-0.6, 0.24, -0.2);
    hydPumpGrp.add(hydLine);

    // 10. Accessory Gearbox & Electrical Generator
    const gearboxPart = parts.find(p => p.meshKey === 'gearbox' || p.componentId.includes('GEARBOX')) || {
      name: 'Engine Accessory Drive Gearbox',
      componentId: `${ac.aircraftId}-GEARBOX`,
      alertLevel: 'NORMAL',
      health: 89
    };
    const gearboxGrp = createSubsystemGroup('Accessory Gearbox', gearboxPart.componentId, new THREE.Vector3(-0.9, -0.8, -0.5));
    const gearboxGeo = new THREE.BoxGeometry(0.36, 0.26, 0.48);
    const gearboxMesh = new THREE.Mesh(gearboxGeo, darkTrimMat);
    gearboxMesh.position.set(-0.48, -0.2, -0.55);
    gearboxMesh.userData = { partData: gearboxPart, name: 'Accessory Gearbox', componentId: gearboxPart.componentId };
    gearboxGrp.add(gearboxMesh);
    interactiveMeshes.push(gearboxMesh);

    const genPart = parts.find(p => p.meshKey === 'generator' || p.componentId.includes('GENERATOR')) || {
      name: 'Main 40 kVA AC Generator',
      componentId: `${ac.aircraftId}-GENERATOR`,
      alertLevel: 'NORMAL',
      health: 93
    };
    const genGrp = createSubsystemGroup('Electrical Generator', genPart.componentId, new THREE.Vector3(0.9, -0.8, -0.5));
    const genGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.44, 16);
    genGeo.rotateX(Math.PI / 2);
    const genMesh = new THREE.Mesh(genGeo, darkTrimMat);
    genMesh.position.set(0.48, -0.2, -0.55);
    genMesh.userData = { partData: genPart, name: 'Main AC Generator', componentId: genPart.componentId };
    genGrp.add(genMesh);
    interactiveMeshes.push(genMesh);

    // 11. Landing Gear Group
    const gearPart = parts.find(p => p.meshKey === 'landing_gear' || p.componentId.includes('GEAR')) || {
      name: 'Landing Gear & Retraction Actuators',
      componentId: `${ac.aircraftId}-GEAR`,
      alertLevel: 'NORMAL',
      health: 95
    };
    const gearGrp = createSubsystemGroup('Landing Gear', gearPart.componentId, new THREE.Vector3(0, -1.2, 0));
    // Nose gear strut + dual wheels
    const noseStrutGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const noseStrut = new THREE.Mesh(noseStrutGeo, darkTrimMat);
    noseStrut.position.set(0, -0.65, 2.0);
    gearGrp.add(noseStrut);

    const wheelGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const wheelNoseL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelNoseL.position.set(-0.08, -1.0, 2.0);
    wheelNoseL.userData = { partData: gearPart, name: 'Nose Landing Gear', componentId: gearPart.componentId };
    gearGrp.add(wheelNoseL);
    interactiveMeshes.push(wheelNoseL);

    const wheelNoseR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelNoseR.position.set(0.08, -1.0, 2.0);
    gearGrp.add(wheelNoseR);

    // Main port & starboard landing wheels
    const wheelMainL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelMainL.position.set(-0.85, -0.9, -0.6);
    wheelMainL.userData = { partData: gearPart, name: 'Port Main Gear', componentId: gearPart.componentId };
    gearGrp.add(wheelMainL);
    interactiveMeshes.push(wheelMainL);

    const wheelMainR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelMainR.position.set(0.85, -0.9, -0.6);
    wheelMainR.userData = { partData: gearPart, name: 'Starboard Main Gear', componentId: gearPart.componentId };
    gearGrp.add(wheelMainR);
    interactiveMeshes.push(wheelMainR);

    // ========================================================
    // 3D FLOATING HOTSPOT CHIPS
    // ========================================================
    const hotspotsLayer = document.getElementById('drishti-hotspots-layer');
    const hotspotAnchors = [
      { part: hydPumpPart, pos: new THREE.Vector3(-0.62, 0.15, -0.2), label: hydPumpPart.name },
      { part: engPortPart, pos: new THREE.Vector3(-0.72, -0.15, -0.9), label: 'AL-31FP Eng #1' },
      { part: engStbPart, pos: new THREE.Vector3(0.72, -0.15, -0.9), label: 'AL-31FP Eng #2' },
      { part: radarPart, pos: new THREE.Vector3(0, 0.1, 4.4), label: 'N011M Radar' },
      { part: avionicsPart, pos: new THREE.Vector3(0, 0.45, 1.8), label: 'Avionics / Glass Cockpit' },
      { part: flightCtrlPart, pos: new THREE.Vector3(-1.8, 0.05, -0.8), label: 'Port Flaperons' },
      { part: gearboxPart, pos: new THREE.Vector3(-0.48, -0.2, -0.55), label: 'Accessory Gearbox' },
      { part: gearPart, pos: new THREE.Vector3(0, -0.9, 2.0), label: 'Nose Gear' }
    ];

    if (hotspotsLayer) {
      hotspotsLayer.innerHTML = hotspotAnchors.map((h, idx) => `
        <div class="hotspot-chip ${h.part.alertLevel.toLowerCase().replace('_', '-')}" id="hotspot-chip-${idx}" title="${h.label}">
          <span class="hotspot-beacon"></span>
          <span>${h.part.health}%</span>
          <span style="font-size:0.62rem; color:var(--text-secondary); opacity:0.8;">${h.label}</span>
        </div>
      `).join('');

      hotspotAnchors.forEach((h, idx) => {
        const el = document.getElementById(`hotspot-chip-${idx}`);
        if (el) {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            selectPart(h.part);
          });
        }
      });
    }

    // ========================================================
    // VIEW MODES & EXPLODED INTERPOLATION
    // ========================================================
    let currentViewMode = 'health'; // 'health' | 'exploded' | 'xray' | 'sensors'
    let explodedFactor = 0.0;
    let targetExplodedFactor = 0.0;
    let isAutoRotating = false;

    function setViewMode(mode) {
      currentViewMode = mode;
      document.querySelectorAll('.drishti-ctrl-btn').forEach(b => {
        if (b.id && b.id.startsWith('btn-mode-')) b.classList.remove('active');
      });
      const btn = document.getElementById(`btn-mode-${mode}`);
      if (btn) btn.classList.add('active');

      const modeInd = document.getElementById('hud-mode-indicator');
      if (modeInd) modeInd.textContent = `VIEW: ${mode.toUpperCase()}`;

      if (mode === 'exploded') {
        targetExplodedFactor = 1.0;
      } else {
        targetExplodedFactor = 0.0;
      }

      // Material appearance switch
      interactiveMeshes.forEach(mesh => {
        if (mode === 'xray') {
          // If it's the high-risk hydraulic pump, keep it solid and pulsing!
          if (mesh.userData.partData && (mesh.userData.partData.alertLevel === 'HIGH_RISK' || mesh.userData.partData.alertLevel === 'CRITICAL')) {
            mesh.material.wireframe = false;
            mesh.material.opacity = 1.0;
            mesh.material.transparent = false;
            mesh.material.emissiveIntensity = 1.0;
          } else {
            mesh.material.wireframe = true;
            mesh.material.opacity = 0.25;
            mesh.material.transparent = true;
          }
        } else {
          mesh.material.wireframe = false;
          if (mesh === canopyMesh) {
            mesh.material.transparent = true;
            mesh.material.opacity = 0.45;
          } else {
            mesh.material.transparent = false;
            mesh.material.opacity = 1.0;
          }
        }
      });

      playTone(1050, 'sine', 0.08);
    }

    // Attach View Mode Buttons
    const btnHealth = document.getElementById('btn-mode-health');
    const btnExploded = document.getElementById('btn-mode-exploded');
    const btnXray = document.getElementById('btn-mode-xray');
    const btnSensors = document.getElementById('btn-mode-sensors');
    if (btnHealth) btnHealth.addEventListener('click', () => setViewMode('health'));
    if (btnExploded) btnExploded.addEventListener('click', () => setViewMode('exploded'));
    if (btnXray) btnXray.addEventListener('click', () => setViewMode('xray'));
    if (btnSensors) btnSensors.addEventListener('click', () => setViewMode('sensors'));

    // Camera Presets
    let cameraLerpTarget = null;
    let cameraTargetFocus = null;

    function flyCameraTo(camPos, lookAtTarget) {
      cameraLerpTarget = camPos.clone();
      cameraTargetFocus = lookAtTarget.clone();
    }

    const btnCamFront = document.getElementById('btn-cam-front');
    const btnCamSide = document.getElementById('btn-cam-side');
    const btnCamTop = document.getElementById('btn-cam-top');
    const btnCamEngine = document.getElementById('btn-cam-engine');
    const btnCamGear = document.getElementById('btn-cam-gear');
    const btnReset = document.getElementById('btn-ctrl-reset');
    const btnRotate = document.getElementById('btn-ctrl-rotate');

    if (btnCamFront) btnCamFront.addEventListener('click', () => flyCameraTo(new THREE.Vector3(0, 0.4, 7.5), new THREE.Vector3(0, 0, 1.0)));
    if (btnCamSide) btnCamSide.addEventListener('click', () => flyCameraTo(new THREE.Vector3(7.5, 0.5, 0), new THREE.Vector3(0, 0, 0)));
    if (btnCamTop) btnCamTop.addEventListener('click', () => flyCameraTo(new THREE.Vector3(0, 8.5, 0.05), new THREE.Vector3(0, 0, 0)));
    if (btnCamEngine) btnCamEngine.addEventListener('click', () => flyCameraTo(new THREE.Vector3(-2.2, 0.8, -2.8), new THREE.Vector3(-0.7, 0, -1.2)));
    if (btnCamGear) btnCamGear.addEventListener('click', () => flyCameraTo(new THREE.Vector3(0, -2.4, 3.2), new THREE.Vector3(0, -0.6, 1.2)));
    if (btnReset) btnReset.addEventListener('click', () => flyCameraTo(new THREE.Vector3(4.8, 2.8, 4.8), new THREE.Vector3(0, 0, 0)));

    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        btnRotate.classList.toggle('active', isAutoRotating);
        playTone(980, 'sine', 0.08);
      });
    }

    // ========================================================
    // PART DETAIL DRAWER & TELEMETRY STREAM LOGIC
    // ========================================================
    const drawerEl = document.getElementById('part-detail-drawer');
    const workspaceEl = document.getElementById('drishti-workspace');
    let currentlySelectedPart = defaultPart;

    function renderPartDrawer(part) {
      if (!drawerEl || !part) return;
      currentlySelectedPart = part;

      // Update HUD corner label
      const hudSelectedPart = document.getElementById('hud-selected-part');
      if (hudSelectedPart) {
        hudSelectedPart.textContent = `${part.name} (${part.health}%)`;
      }

      // Check user role for action authorizations
      const isAuditorOrTech = (activeRoleKey === 'technician' || activeRoleKey === 'auditor');

      drawerEl.innerHTML = `
        <!-- Drawer Header -->
        <div class="part-drawer-header">
          <div>
            <h3>${part.name}</h3>
            <p>${part.partName || part.name} &bull; <strong>${part.componentId}</strong></p>
          </div>
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="badge-alert ${part.alertLevel.toLowerCase().replace('_', '-')}">${part.health}% &bull; ${part.alertLevel.replace('_', ' ')}</span>
            <button class="btn-drawer-close" id="btn-part-drawer-close" title="Collapse Drawer">&times;</button>
          </div>
        </div>

        <!-- 4-Tab Navigation -->
        <div class="part-drawer-tabs">
          <button class="part-tab-btn active" data-ptab="spec">1. Spec</button>
          <button class="part-tab-btn" data-ptab="prediction">2. Prediction</button>
          <button class="part-tab-btn" data-ptab="sensors">3. Live Sensors</button>
          <button class="part-tab-btn" data-ptab="spares">4. Spares &amp; Tasks</button>
        </div>

        <!-- Drawer Content Tabs -->
        <div class="part-drawer-content">
          <!-- TAB 1: SPECIFICATION -->
          <div class="drawer-tab-pane active" id="dtab-spec">
            <div class="spec-grid">
              <div class="spec-cell">
                <div class="spec-key">PART NUMBER</div>
                <div class="spec-val">${part.specification ? part.specification.partNumber : 'HP-3B-MK2-V4'}</div>
              </div>
              <div class="spec-cell">
                <div class="spec-key">MANUFACTURER</div>
                <div class="spec-val">${part.specification ? part.specification.manufacturer : 'HAL Accessories Division'}</div>
              </div>
              <div class="spec-cell full-width">
                <div class="spec-key">PRIMARY FUNCTION</div>
                <div class="spec-val" style="font-size:0.75rem; font-weight:normal; line-height:1.4;">
                  ${part.specification ? part.specification.function : 'Generates 3,000 PSI hydraulic power for Port Flight Controls & Canard Actuators'}
                </div>
              </div>
              <div class="spec-cell">
                <div class="spec-key">INSTALLED LOCATION</div>
                <div class="spec-val">${part.specification ? part.specification.installedLocation : 'Station FS-420'}</div>
              </div>
              <div class="spec-cell">
                <div class="spec-key">COMPONENT AGE</div>
                <div class="spec-val">${part.specification ? part.specification.componentAge : '11 Months'}</div>
              </div>
              <div class="spec-cell">
                <div class="spec-key">OPERATING HOURS</div>
                <div class="spec-val">${part.specification ? part.specification.totalOperatingHours : 420.5} hrs</div>
              </div>
              <div class="spec-cell">
                <div class="spec-key">FLIGHT CYCLES</div>
                <div class="spec-val">${part.specification ? part.specification.flightCycles : 268} cycles</div>
              </div>
              <div class="spec-cell full-width">
                <div class="spec-key">RATED LIMITS &amp; CALIBRATION</div>
                <div class="spec-val" style="font-size:0.72rem; color:var(--text-secondary); line-height:1.4;">
                  ${part.specification && part.specification.ratedLimits ?
                    `Nominal: ${part.specification.ratedLimits.nominalPressure || '3,000 PSI'} &bull; Max Temp: ${part.specification.ratedLimits.maxTemperature || '105°C'} &bull; Vib Limit: ${part.specification.ratedLimits.maxVibration || '4.5 mm/s'}` :
                    'Standard Military Aeronautical Standard MIL-H-5440J'
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: PROBABILISTIC FAILURE PREDICTION (PS 26249 ENGINE) -->
          <div class="drawer-tab-pane" id="dtab-prediction">
            <!-- Multi-Horizon Gauges -->
            <div class="failure-horizons-row">
              <div class="horizon-box ${part.failurePrediction && part.failurePrediction.horizons && part.failurePrediction.horizons.prob7d > 50 ? 'high-risk' : ''}">
                <div class="horizon-label">7-DAY RISK</div>
                <div class="horizon-val" style="color:${part.failurePrediction && part.failurePrediction.horizons && part.failurePrediction.horizons.prob7d > 50 ? 'var(--alert-high)' : 'var(--brand-green)'};">
                  ${part.failurePrediction && part.failurePrediction.horizons ? part.failurePrediction.horizons.prob7d : (part.alertLevel === 'HIGH_RISK' ? 68 : 8)}%
                </div>
              </div>
              <div class="horizon-box ${part.failurePrediction && part.failurePrediction.horizons && part.failurePrediction.horizons.prob14d > 50 ? 'high-risk' : ''}">
                <div class="horizon-label">14-DAY RISK</div>
                <div class="horizon-val" style="color:${part.failurePrediction && part.failurePrediction.horizons && part.failurePrediction.horizons.prob14d > 50 ? 'var(--alert-high)' : 'var(--alert-warning)'};">
                  ${part.failurePrediction && part.failurePrediction.horizons ? part.failurePrediction.horizons.prob14d : (part.alertLevel === 'HIGH_RISK' ? 94 : 14)}%
                </div>
              </div>
              <div class="horizon-box high-risk">
                <div class="horizon-label">30-DAY RISK</div>
                <div class="horizon-val" style="color:var(--alert-critical);">
                  ${part.failurePrediction && part.failurePrediction.horizons ? part.failurePrediction.horizons.prob30d : (part.alertLevel === 'HIGH_RISK' ? 99.8 : 22)}%
                </div>
              </div>
            </div>

            <!-- Remaining Useful Life Banner -->
            <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.8rem; margin:0.3rem 0;">
              <div style="font-size:0.65rem; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase;">PREDICTED RUL (REMAINING USEFUL LIFE)</div>
              <div style="font-size:1.35rem; font-weight:800; font-family:var(--font-mono); color:var(--brand-cyan); margin:0.2rem 0;">
                ${part.failurePrediction ? part.failurePrediction.rulEstimate : '9.8 Days'}
              </div>
              <div style="font-size:0.72rem; color:var(--text-secondary);">
                Confidence Band: <strong>${part.failurePrediction ? part.failurePrediction.rulConfidenceInterval : '±1.2 Days (95% CI)'}</strong>
              </div>
            </div>

            <!-- Failure Mode & Root Cause -->
            <div class="xai-attribution-box">
              <div style="font-size:0.72rem; font-family:var(--font-mono); color:var(--alert-high); font-weight:700; margin-bottom:0.3rem;">
                FAILURE MODE: ${part.failurePrediction ? part.failurePrediction.failureMode : 'Impeller Micro-Cavitation'}
              </div>
              <p style="font-size:0.74rem; color:var(--text-secondary); line-height:1.4; margin:0 0 0.8rem 0;">
                ${part.failurePrediction ? part.failurePrediction.rootCauseHypothesis : 'High-harmonic pressure pulses causing localized vaporization and cavitation pitting on impeller vanes.'}
              </p>

              <!-- XAI Feature Attribution Waterfall -->
              <div style="font-size:0.68rem; font-family:var(--font-mono); color:var(--brand-cyan); margin-bottom:0.5rem; text-transform:uppercase;">
                EXPLAINABLE AI (XAI) ATTRIBUTION BREAKDOWN:
              </div>
              ${part.failurePrediction && part.failurePrediction.xaiAttributions ?
                part.failurePrediction.xaiAttributions.map(x => `
                  <div class="xai-bar-item">
                    <div class="xai-bar-header">
                      <span>${x.feature}</span>
                      <strong style="color:#fff;">${x.percentage}%</strong>
                    </div>
                    <div class="xai-progress-track">
                      <div class="xai-progress-fill" style="width:${x.percentage}%;"></div>
                    </div>
                  </div>
                `).join('') :
                `
                  <div class="xai-bar-item"><div class="xai-bar-header"><span>Harmonic Distortion</span><strong>42%</strong></div><div class="xai-progress-track"><div class="xai-progress-fill" style="width:42%;"></div></div></div>
                  <div class="xai-bar-item"><div class="xai-bar-header"><span>Case Drain Temp</span><strong>28%</strong></div><div class="xai-progress-track"><div class="xai-progress-fill" style="width:28%;"></div></div></div>
                  <div class="xai-bar-item"><div class="xai-bar-header"><span>Combat G-Cycles</span><strong>18%</strong></div><div class="xai-progress-track"><div class="xai-progress-fill" style="width:18%;"></div></div></div>
                `
              }

              <div style="margin-top:0.8rem; font-size:0.7rem; color:var(--text-muted); font-style:italic;">
                Recurrence: ${part.failurePrediction ? part.failurePrediction.historicalRecurrence : 'Observed previously on Tail SB-142 in 2024.'}
              </div>
            </div>
          </div>

          <!-- TAB 3: LIVE SENSORS TELEMETRY STREAM (PS 26249 WEAK SIGNAL) -->
          <div class="drawer-tab-pane" id="dtab-sensors">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.68rem; font-family:var(--font-mono); color:var(--brand-cyan);">STREAM: REAL-TIME EDGE SENSORS</span>
              <span style="font-size:0.65rem; color:var(--brand-green);">● LIVE 1 HZ</span>
            </div>

            <div class="sensor-stream-card">
              <div class="sensor-stream-header">
                <span class="sensor-name">System Operating Pressure</span>
                <span class="sensor-val-live" id="sensor-val-pressure" style="color:var(--brand-cyan);">3,055 PSI</span>
              </div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Normal Band: 2,900 – 3,100 PSI &bull; Redline: 3,450 PSI</div>
              <svg class="sensor-spark-line" viewBox="0 0 200 36">
                <path d="M 0 18 Q 25 12 50 20 T 100 15 T 150 22 T 200 16" fill="none" stroke="#00e5ff" stroke-width="1.8"/>
              </svg>
            </div>

            <div class="sensor-stream-card">
              <div class="sensor-stream-header">
                <span class="sensor-name">Case Drain Temperature</span>
                <span class="sensor-val-live" id="sensor-val-temp" style="color:var(--alert-warning);">88.4 °C</span>
              </div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Normal Band: 65 – 82 °C &bull; Warning: &gt;85 °C</div>
              <svg class="sensor-spark-line" viewBox="0 0 200 36">
                <path d="M 0 28 L 40 25 L 80 22 L 120 18 L 160 14 L 200 11" fill="none" stroke="#ffb703" stroke-width="1.8"/>
              </svg>
            </div>

            <div class="sensor-stream-card" style="border-left:3px solid var(--alert-high);">
              <div class="sensor-stream-header">
                <span class="sensor-name">Vibration RMS (Harmonic Peak)</span>
                <span class="sensor-val-live" id="sensor-val-vib" style="color:var(--alert-high);">4.82 mm/s</span>
              </div>
              <div style="font-size:0.68rem; color:var(--alert-high);">ANOMALY DETECTED: Threshold 4.5 mm/s exceeded</div>
              <svg class="sensor-spark-line" viewBox="0 0 200 36">
                <path d="M 0 30 Q 20 5 40 28 T 80 8 T 120 26 T 160 6 T 200 12" fill="none" stroke="#ff5722" stroke-width="2"/>
              </svg>
            </div>

            <div class="sensor-stream-card">
              <div class="sensor-stream-header">
                <span class="sensor-name">Cavitation Severity Index</span>
                <span class="sensor-val-live" id="sensor-val-cavit" style="color:var(--alert-high);">0.42 (Elevated)</span>
              </div>
              <div style="font-size:0.68rem; color:var(--text-muted);">Threshold: &lt;0.25 Nominal &bull; Acoustic Shift: 4,200 Hz</div>
            </div>
          </div>

          <!-- TAB 4: MAINTENANCE & SPARES READINESS -->
          <div class="drawer-tab-pane" id="dtab-spares">
            <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.8rem;">
              <div style="font-size:0.68rem; font-family:var(--font-mono); color:var(--text-muted);">RECOMMENDED MAINTENANCE ACTION:</div>
              <div style="font-size:0.92rem; font-weight:700; color:#fff; margin:0.3rem 0;">
                ${part.maintenanceAndSpares ? part.maintenanceAndSpares.recommendedTask : 'TASK #DP-HYD-42: Replace Pump & Flush Circuit 2'}
              </div>
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.8rem;">
                Estimated Labor: <strong>${part.maintenanceAndSpares ? part.maintenanceAndSpares.estimatedLabor : '4.5 Hours'}</strong> &bull; Bay 3 AFS Thanjavur
              </div>

              <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.6rem;">
                <div style="font-size:0.68rem; font-family:var(--font-mono); color:var(--text-muted);">DEPOT SPARES READINESS:</div>
                <div style="font-size:0.82rem; font-weight:700; color:var(--brand-cyan); margin:0.2rem 0;">
                  ${part.maintenanceAndSpares ? part.maintenanceAndSpares.requiredSpares : 'HAL Part #HP-3B-MK2 (Assembly)'}
                </div>
                <div style="font-size:0.74rem; color:${part.maintenanceAndSpares && part.maintenanceAndSpares.stockBuffer > 0 ? 'var(--brand-green)' : 'var(--alert-warning)'};">
                  ${part.maintenanceAndSpares ? part.maintenanceAndSpares.depotStockStatus : '1 Unit in Stock (Reserved for AC-107)'}
                </div>
              </div>
            </div>

            <!-- Role Action or Read-Only Indicator -->
            ${!isAuditorOrTech ? `
              <button class="btn btn-primary" style="width:100%; margin-top:0.8rem;" onclick="window.location.hash='#/app/planning';">
                📅 Schedule Maintenance in Gantt Planner &rarr;
              </button>
            ` : `
              <div style="background:rgba(255,255,255,0.04); border:1px dashed var(--border-subtle); border-radius:4px; padding:0.8rem; font-size:0.72rem; color:var(--text-muted); line-height:1.4;">
                <strong style="color:#fff;">READ-ONLY ACCESS (${activeRoleKey.toUpperCase()}):</strong>
                Maintenance scheduling authorizations are restricted to Base Engineering and Command Officers under Air Force Technical Directives.
              </div>
            `}
          </div>
        </div>
      `;

      // Drawer Tab Click Handling
      const drawerTabButtons = drawerEl.querySelectorAll('.part-tab-btn');
      drawerTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          drawerTabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const ptabId = `dtab-${btn.getAttribute('data-ptab')}`;
          drawerEl.querySelectorAll('.drawer-tab-pane').forEach(p => p.classList.remove('active'));
          const targetPane = document.getElementById(ptabId);
          if (targetPane) targetPane.classList.add('active');
          playTone(940, 'sine', 0.08);
        });
      });

      // Drawer Close Button Listener
      const btnCloseDrawer = document.getElementById('btn-part-drawer-close');
      if (btnCloseDrawer) {
        btnCloseDrawer.addEventListener('click', () => {
          workspaceEl.classList.add('drawer-collapsed');
          drawerEl.style.display = 'none';
          if (renderer) renderer.setSize(container.clientWidth, container.clientHeight);
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
        });
      }

      // If drawer was hidden, reveal it
      workspaceEl.classList.remove('drawer-collapsed');
      drawerEl.style.display = 'flex';
      if (renderer) renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    }

    // Function to select part, fly camera, and open drawer
    function selectPart(part) {
      if (!part) return;
      playTone(1100, 'sine', 0.1);
      renderPartDrawer(part);

      // Find mesh anchor
      const foundMesh = interactiveMeshes.find(m => m.userData.componentId === part.componentId || (m.userData.partData && m.userData.partData.componentId === part.componentId));
      if (foundMesh) {
        const worldPos = new THREE.Vector3();
        foundMesh.getWorldPosition(worldPos);
        flyCameraTo(
          new THREE.Vector3(worldPos.x + 1.2, worldPos.y + 0.9, worldPos.z + 1.6),
          worldPos
        );
      }
    }

    // Quick Subsystem Selector Dropdown Listener
    const subSelect = document.getElementById('drishti-subsystem-select');
    if (subSelect) {
      subSelect.addEventListener('change', (e) => {
        const compId = e.target.value;
        const targetPart = parts.find(p => p.componentId === compId);
        if (targetPart) selectPart(targetPart);
      });
    }

    // Initial drawer render with default degraded component
    renderPartDrawer(defaultPart);

    // ========================================================
    // RAYCASTING FOR INTERACTIVE PART SELECTION & HOVER
    // ========================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let pData = hit.userData.partData;
        if (!pData && hit.parent && hit.parent.userData.partData) {
          pData = hit.parent.userData.partData;
        }
        if (!pData && hit.userData.componentId) {
          pData = parts.find(p => p.componentId === hit.userData.componentId);
        }
        if (pData) {
          selectPart(pData);
        }
      }
    });

    // ========================================================
    // PERIODIC LIVE TELEMETRY JITTER STREAM
    // ========================================================
    drishtiTelemetryInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/telemetry/live');
        const live = await res.json();
        const pEl = document.getElementById('sensor-val-pressure');
        const tEl = document.getElementById('sensor-val-temp');
        const vEl = document.getElementById('sensor-val-vib');
        const cEl = document.getElementById('sensor-val-cavit');

        if (live && live['hyd-pump-3b']) {
          const d = live['hyd-pump-3b'];
          if (pEl) pEl.textContent = `${d.pressure} PSI`;
          if (tEl) tEl.textContent = `${d.temp} °C`;
          if (vEl) vEl.textContent = `${d.vibration} mm/s`;
          if (cEl) cEl.textContent = `${d.cavitationIndex} (Harmonic Alert)`;
        }
      } catch (e) {
        // Fallback local jitter
        const jitter = (val, delta) => +(val + (Math.random() * 2 - 1) * delta).toFixed(2);
        const pEl = document.getElementById('sensor-val-pressure');
        const tEl = document.getElementById('sensor-val-temp');
        const vEl = document.getElementById('sensor-val-vib');
        if (pEl) pEl.textContent = `${jitter(3055, 25)} PSI`;
        if (tEl) tEl.textContent = `${jitter(88.4, 0.8)} °C`;
        if (vEl) vEl.textContent = `${jitter(4.82, 0.15)} mm/s`;
      }
    }, 1200);

    // ========================================================
    // MAIN 60 FPS RENDER LOOP
    // ========================================================
    let clock = new THREE.Clock();

    function animate() {
      drishtiAnimFrame = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate Sudarshana Chakra ground radar
      if (chakraRadarGroup) {
        chakraRadarGroup.rotation.y += 0.006;
      }

      // Rotate jet turbine discs
      turbineDiscs.forEach(t => {
        t.rotation.z += 0.25;
      });

      // Auto-rotation toggle
      if (isAutoRotating) {
        jetRoot.rotation.y += 0.008;
      }

      // Smooth camera fly-to interpolation
      if (cameraLerpTarget && cameraTargetFocus) {
        camera.position.lerp(cameraLerpTarget, 0.08);
        controls.target.lerp(cameraTargetFocus, 0.08);
        if (camera.position.distanceTo(cameraLerpTarget) < 0.05) {
          cameraLerpTarget = null;
          cameraTargetFocus = null;
        }
      }

      controls.update();

      // Update HUD Azimuth & Elevation angles
      const azimuthDeg = Math.round((controls.getAzimuthalAngle() * 180) / Math.PI);
      const polarDeg = Math.round((controls.getPolarAngle() * 180) / Math.PI);
      const azEl = document.getElementById('hud-azimuth');
      const elEl = document.getElementById('hud-elev');
      if (azEl) azEl.textContent = `${azimuthDeg}°`;
      if (elEl) elEl.textContent = `${polarDeg}°`;

      // Exploded View smooth translation
      explodedFactor += (targetExplodedFactor - explodedFactor) * 0.08;
      interactiveGroups.forEach(grp => {
        if (grp.userData && grp.userData.explodedOffset) {
          grp.position.copy(grp.userData.basePos).addScaledVector(grp.userData.explodedOffset, explodedFactor);
        }
      });

      // High-Risk Component Pulse Effect (Hydraulic Pump)
      const pulse = 0.5 + 0.5 * Math.sin(time * 5);
      if (hydPumpMesh && hydPumpMesh.material) {
        hydPumpMesh.material.emissiveIntensity = 0.4 + pulse * 0.6;
      }

      // Sensors Mode Telemetry Wave Pulse
      if (currentViewMode === 'sensors') {
        interactiveMeshes.forEach((mesh, idx) => {
          if (mesh.material && mesh.material.emissive) {
            const wave = 0.3 + 0.7 * Math.sin(time * 4 + idx * 0.8);
            mesh.material.emissiveIntensity = wave;
          }
        });
      }

      // Project 3D Hotspot Coordinates to 2D Screen Overlay
      if (hotspotsLayer && hotspotAnchors.length > 0) {
        const rect = canvas.getBoundingClientRect();
        hotspotAnchors.forEach((h, idx) => {
          const chipEl = document.getElementById(`hotspot-chip-${idx}`);
          if (!chipEl) return;

          // Compute world position accounting for group explosion
          const tempPos = h.pos.clone();
          tempPos.addScaledVector(new THREE.Vector3(0, 0, 0), explodedFactor);
          tempPos.project(camera);

          // Check if in front of camera (-1 to 1)
          if (tempPos.z < 1.0 && tempPos.x >= -1.1 && tempPos.x <= 1.1 && tempPos.y >= -1.1 && tempPos.y <= 1.1) {
            const screenX = (tempPos.x * 0.5 + 0.5) * rect.width;
            const screenY = (-(tempPos.y * 0.5) + 0.5) * rect.height;
            chipEl.style.display = 'flex';
            chipEl.style.left = `${screenX}px`;
            chipEl.style.top = `${screenY}px`;
          } else {
            chipEl.style.display = 'none';
          }
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
  }

  // --- 13. 404 NOT FOUND VIEW ---
  function render404View() {
    viewMountPoint.innerHTML = `
      <div style="text-align:center; padding:4rem 2rem;">
        <div style="font-size:3rem; color:var(--alert-warning); font-family:var(--font-mono);">404 &bull; SECTOR NOT FOUND</div>
        <p style="color:var(--text-secondary); margin:1rem 0 2rem;">The requested tactical telemetry sector does not exist or has been reclassified.</p>
        <button class="btn btn-primary" onclick="window.location.hash='#/app/fleet'">Return to Fleet Command &rarr;</button>
      </div>
    `;
  }
});

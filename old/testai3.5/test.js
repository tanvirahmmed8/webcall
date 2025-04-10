(function () {
  // Create stylesheet for the popup
  const style = document.createElement("style");
  style.textContent = `
    /* Theme variables */
    .speaklar-widget {
      --primary-gradient: linear-gradient(30deg, #3151DF 0%, #f2295b 114%);
      --primary-bg: #2d1b69;
      --primary-shadow: rgba(0, 0, 0, 0.3);
      --ring-color: rgba(78, 231, 255, 0.7);
      --border-color: rgba(255, 255, 255, 0.3);
      --error-color: #ff4444;
      --success-color: #00C851;
      --text-primary: #ffffff;
      --text-secondary: #333333;
      --transition-speed: 0.3s;
    }

    /* Base styles */
    .speaklar-widget__popup, .speaklar-widget__toggle {
      position: fixed;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 9999;
      border-radius: 16px;
      box-shadow: 0 4px 15px var(--primary-shadow);
      transition: all var(--transition-speed) ease;
    }

    /* Main popup container */
    .speaklar-widget__popup {
      right: -350px;
      bottom: 20px;
      width: 280px;
      background: var(--primary-gradient);
      background-color: var(--primary-bg);
      padding: 20px;
      color: var(--text-primary);
      backdrop-filter: blur(10px);
    }

    .speaklar-widget__popup--visible {
      right: 108px;
      transform: translateX(0);
    }

    /* Toggle button */
    .speaklar-widget__toggle {
      right: 110px;
      bottom: 20px;
      background: var(--primary-gradient);
      color: var(--text-primary);
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
    }

    .speaklar-widget__toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px var(--primary-shadow);
    }

    /* Avatar styling */
    .speaklar-widget__avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 25px auto 20px;
      display: block;
      object-fit: cover;
      border: 3px solid var(--border-color);
      box-shadow: 0 0 20px rgba(143, 93, 183, 0.7);
      position: relative;
      transition: transform var(--transition-speed) ease;
    }

    .speaklar-widget__avatar:hover {
      transform: scale(1.05);
    }

    /* Form elements */
    .speaklar-widget__popup select,
    .speaklar-widget__popup input,
    .speaklar-widget__popup button {
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
      font-size: 14px;
      transition: all var(--transition-speed) ease;
    }

    .speaklar-widget__popup button {
      background: white;
      color: var(--text-secondary);
      font-weight: 600;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .speaklar-widget__popup button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--primary-shadow);
    }

    .speaklar-widget__popup button--end-call {
      background: var(--error-color);
      color: var(--text-primary);
    }

    /* Status message */
    .speaklar-widget__call-status {
      text-align: center;
      margin: 10px 0;
      font-size: 14px;
      font-weight: 500;
      opacity: 0.9;
    }

    /* Audio visualization */
    .speaklar-widget__audio-visualizer {
      display: flex;
      gap: 4px;
      align-items: flex-end;
      height: 30px;
      justify-content: center;
      padding: 0 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
    }

    .speaklar-widget__audio-bar {
      width: 4px;
      height: 15px;
      background: var(--primary-gradient);
      border-radius: 2px;
      transition: height 0.1s ease;
    }

    /* Audio rings */
    .speaklar-widget__audio-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 2px solid var(--ring-color);
      animation: pulse 2s infinite;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(78, 231, 255, 0.5);
      display: none;
    }

    .audio-ring:nth-child(1) { width: 130%; height: 130%; animation-delay: 0s; }
    .audio-ring:nth-child(2) { width: 150%; height: 150%; animation-delay: 0.5s; }
    .audio-ring:nth-child(3) { width: 170%; height: 170%; animation-delay: 1s; }

    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
    }

    /* Language selector */
    .speaklar-widget__language-dropdown {
      position: relative;
      display: inline-block;
    }

    .speaklar-widget__language-flag {
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      transition: transform var(--transition-speed) ease;
    }

    .language-flag:hover {
      transform: scale(1.1);
    }

    .speaklar-widget__language-dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background: var(--primary-bg);
      min-width: 120px;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 5px;
      bottom: 30px;
      box-shadow: 0 8px 16px var(--primary-shadow);
    }

    .speaklar-widget__language-dropdown-content--visible { display: block; }

    .speaklar-widget__language-option {
      color: var(--text-primary);
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: background var(--transition-speed) ease;
    }

    .language-option:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .speaklar-widget__popup { width: 260px; }
      .speaklar-widget__popup--visible { right: 70px; }
      .speaklar-widget__toggle { right: 70px; padding: 8px 12px; }
      .speaklar-widget__avatar { width: 100px; height: 100px; }
    }

    @media (max-width: 480px) {
      .speaklar-widget__popup {
        width: 230px;
        padding: 15px;
        bottom: 15px;
      }
      .speaklar-widget__popup--visible { right: 60px; }
      .speaklar-widget__toggle {
        right: 60px;
        bottom: 15px;
        padding: 6px 10px;
        font-size: 13px;
      }
      .speaklar-widget__avatar { width: 90px; height: 90px; }
    }
  `;
  document.head.appendChild(style);

  // Load SIP.js library
  const sipScript = document.createElement("script");
  sipScript.src = "https://speaklar.com/speaklar.min.js";
  sipScript.onload = () => {
    createPopup();
    initSpeaklarFunctions();
  };
  document.head.appendChild(sipScript);

  // Global state management
  const state = {
    userAgent: null,
    session: null,
    ringtoneAudio: new Audio("https://call.powerinai.com/assets/mp3/ringtone.mp3"),
  };
  state.ringtoneAudio.loop = true;

  // Audio visualization setup
  function setupAudioVisualization(audioElement) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const source = audioContext.createMediaStreamSource(audioElement.srcObject);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const audioBars = document.querySelectorAll(".audio-bar");

      if (audioBars.length === 0) {
        console.warn("No audio bars found for visualization");
        return;
      }

      function animateBars() {
        requestAnimationFrame(animateBars);
        analyser.getByteFrequencyData(dataArray);

        const average = Array.from(dataArray).reduce((a, b) => a + b, 0) / dataArray.length;
        audioBars.forEach(bar => {
          const variation = Math.random() * 10;
          const height = Math.max(5, Math.min(25, (average / 255) * 30 + variation));
          bar.style.height = `${height}px`;
        });
      }

      animateBars();
    } catch (error) {
      console.error("Error setting up audio visualization:", error);
    }
  }

  // SIP registration and call handling
  function register() {
    const server = "wss://westernaiws.speaklar.com:8089/ws";
    const sipDomain = "103.101.110.120";
    const selectedLanguage = document.getElementById("speaklar-selected-language").value;

    const credentials = selectedLanguage === "bd"
      ? { user: "50004", password: "ln47UEwtbyNHyzd" }
      : { user: "50006", password: "ln47UEwtdyNHyzd" };

    state.userAgent = new SIP.UA({
      uri: `sip:${credentials.user}@${sipDomain}`,
      transportOptions: { wsServers: server },
      authorizationUser: credentials.user,
      password: credentials.password,
      sessionDescriptionHandlerFactoryOptions: {
        constraints: { audio: true, video: false },
        peerConnectionConfiguration: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
      },
      extraHeaders: [`X-Selected-Language: ${selectedLanguage}`],
    });

    state.userAgent.on("registered", () => {
      window.speaklarCall();
    });

    state.userAgent.on("registrationFailed", (error) => {
      console.error("Registration failed:", error);
      updateCallStatus("Registration failed", "error");
    });

    state.userAgent.on("invite", (incomingSession) => {
      state.session = incomingSession;
      state.session.accept();
      handleAcceptedCall();
    });
  }

  function unregister() {
    if (state.userAgent) {
      state.userAgent.unregister();
      state.userAgent = null;
    }
  }

  // UI update functions
  function updateCallStatus(message, type = "info") {
    const statusElement = document.getElementById("speaklar-call-status");
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `status-${type}`;
      statusElement.style.display = message ? "block" : "none";
    }
  }

  function updateCallButton(isEndCall = false) {
    const callButton = document.getElementById("speaklar-call-button");
    if (!callButton) return;

    const buttonConfig = isEndCall
      ? {
          text: "End Call",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" fill="red"/></svg>`,
          className: "end-call",
        }
      : {
          text: "Start Call",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/></svg>`,
          className: "",
        };

    callButton.innerHTML = `${buttonConfig.icon}${buttonConfig.text}`;
    callButton.className = buttonConfig.className;
  }

  // Call handling functions
  function handleAcceptedCall() {
    state.ringtoneAudio.pause();
    state.ringtoneAudio.currentTime = 0;
    updateCallStatus("Connected", "success");

    const remoteAudio = document.getElementById("speaklar-remote-audio");
    if (remoteAudio) {
      const remoteStream = new MediaStream();
      state.session.sessionDescriptionHandler.peerConnection
        .getReceivers()
        .forEach((receiver) => {
          if (receiver.track.kind === "audio") {
            remoteStream.addTrack(receiver.track);
          }
        });
      remoteAudio.srcObject = remoteStream;
      setupAudioVisualization(remoteAudio);
    }

    document.querySelectorAll(".audio-ring").forEach(ring => ring.style.display = "block");
    const audioVisualizer = document.querySelector(".audio-visualizer");
    if (audioVisualizer) audioVisualizer.style.display = "flex";

    updateCallButton(true);
  }

  function handleTerminatedCall() {
    updateCallStatus("Call Ended");
    setTimeout(() => updateCallStatus(""), 3000);

    document.querySelectorAll(".audio-ring").forEach(ring => ring.style.display = "none");
    updateCallButton(false);
  }

  // Initialize Speaklar functions
  function initSpeaklarFunctions() {
    window.toggleCall = function() {
      if (state.session) {
        window.speaklarHangup();
        return;
      }
      window.speaklarCall();
    };

    window.speaklarCall = function() {
      updateCallStatus("Connecting...");
      state.ringtoneAudio.play().catch(err => console.error("Error playing ringtone:", err));

      const target = document.getElementById("targetId").value.trim();
      if (!target) {
        updateCallStatus("Number is missing!", "error");
        state.ringtoneAudio.pause();
        state.ringtoneAudio.currentTime = 0;
        return;
      }

      if (!state.userAgent) {
        register();
        return;
      }

      state.session = state.userAgent.invite(`sip:${target}@103.177.125.134`);
      state.session.on("accepted", handleAcceptedCall);
      state.session.on("terminated", handleTerminatedCall);
    };

    window.speaklarHangup = function() {
      if (state.session) {
        state.session.bye();
        unregister();
        state.session = null;
      }
    };
  }

  // Create UI components
  function createPopup() {
    const container = document.createElement("div");
    container.className = "speaklar-widget";
    const toggleButton = document.createElement("button");
    toggleButton.className = "speaklar-widget__toggle";
    toggleButton.innerHTML = `
      <div class="speaklar-widget__audio-visualizer">
        <div class="speaklar-widget__audio-bar"></div>
        <div class="speaklar-widget__audio-bar"></div>
        <div class="speaklar-widget__audio-bar"></div>
        <div class="speaklar-widget__audio-bar"></div>
      </div>
      <div class="button-text">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
        </svg>
        Voice Call
      </div>
      <div class="speaklar-widget__language-selector">
        <img src="https://flagcdn.com/w40/us.png" alt="Language" class="speaklar-widget__language-flag">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M7 10l5 5 5-5z" fill="black"/>
        </svg>
      </div>
    `;

    const popup = document.createElement("div");
    popup.className = "speaklar-widget__popup";
    popup.innerHTML = `
      <div id="speaklar-avatar-container">
        <img src="https://speaklar.com/assets/img/avatar.png" alt="Avatar" class="speaklar-widget__avatar">
        <div class="speaklar-widget__audio-ring"></div>
        <div class="speaklar-widget__audio-ring"></div>
        <div class="speaklar-widget__audio-ring"></div>
      </div>
      <select id="speaklar-selected-language">
        <option value="en">English</option>
        <option value="bd">Bengali</option>
      </select>
      <input type="text" id="targetId" placeholder="Enter phone number">
      <button class="speaklar-widget__call-button" onclick="toggleCall()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
        </svg>
        Start Call
      </button>
      <div class="speaklar-widget__call-status"></div>
      <audio class="speaklar-widget__remote-audio" autoplay></audio>
    `;

    document.body.appendChild(container);
    container.appendChild(toggleButton);
    container.appendChild(popup);

    toggleButton.addEventListener("click", () => {
      popup.classList.toggle("speaklar-widget__popup--visible");
      toggleButton.classList.toggle("speaklar-hidden");
    });

    const languageSelector = document.querySelector(".language-selector");
    languageSelector.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = document.querySelector(".language-dropdown-content");
      if (dropdown) dropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".language-dropdown")) {
        const dropdown = document.querySelector(".language-dropdown-content");
        if (dropdown && dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      }
    });
  }
})();
  
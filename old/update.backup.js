(function () {
    // Create stylesheet for the popup
    const style = document.createElement("style");
    style.textContent = `
  /* Common variables */
  :root {
    --primary-gradient: linear-gradient(30deg, #3151DF 0%, #f2295b 114%);
    --secondary-gradient: linear-gradient(135deg, #4e54c8, #8f5db7);
    --primary-bg-color: #2d1b69;
    --secondary-bg-color: #3b2c7c;
    --border-radius-lg: 16px;
    --border-radius-md: 8px;
    --border-radius-sm: 4px;
    --border-radius-round: 30px;
    --border-radius-circle: 50%;
    --shadow-default: 0 4px 15px rgba(0, 0, 0, 0.3);
    --shadow-light: 0 4px 10px rgba(0, 0, 0, 0.2);
    --shadow-avatar: 0 0 20px rgba(143, 93, 183, 0.7);
    --transition-default: 0.3s ease;
    --spacing-xs: 5px;
    --spacing-sm: 8px;
    --spacing-md: 10px;
    --spacing-lg: 15px;
    --spacing-xl: 20px;
    --spacing-xxl: 25px;
  }
  
  /* Main popup container */
  #speaklar-popup {
    position: fixed;
    right: -350px;
    bottom: var(--spacing-xl);
    width: 280px;
    background: linear-gradient(30deg, #3151DF 0%, #f2295b 180%);
    background-color: var(--primary-bg-color);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-default);
    padding: var(--spacing-lg);
    transition: right var(--transition-default);
    z-index: 9999;
    font-family: Arial, sans-serif;
    color: white;
  }
  #speaklar-popup.show {
    right: 108px;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    #speaklar-popup {
      width: 260px;
    }
    #speaklar-popup.show {
      right: 70px;
    }
  }
  
  @media (max-width: 480px) {
    #speaklar-popup {
      width: 230px;
      padding: 12px;
      bottom: 15px;
    }
    #speaklar-popup.show {
      right: 60px;
    }
  }
  
  /* Toggle button */
  #speaklar-toggle {
    position: fixed;
    right: 110px;
    bottom: var(--spacing-xl);
    background: var(--primary-gradient);
    color: white;
    border: none;
    border-radius: var(--border-radius-round);
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    z-index: 9998;
    box-shadow: var(--shadow-light);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  /* Responsive toggle button */
  @media (max-width: 768px) {
    #speaklar-toggle {
      right: 70px;
      padding: 8px 12px;
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    #speaklar-toggle {
      right: 60px;
      bottom: 15px;
      padding: 6px 10px;
      font-size: 13px;
    }
  }
  
  /* Headings and text */
  #speaklar-popup h2 {
    margin-top: 0;
    font-size: 18px;
    text-align: center;
    color: white;
  }
  
  /* Avatar styling */
  #speaklar-avatar {
    width: 120px;
    height: 120px;
    border-radius: var(--border-radius-circle);
    margin: 25px auto 15px auto;
    display: block;
    object-fit: cover;
    border: none;
    box-shadow: var(--shadow-avatar);
    position: relative;
  }
  
  /* Responsive avatar */
  @media (max-width: 768px) {
    #speaklar-avatar {
      width: 100px;
      height: 100px;
      margin: 20px auto 12px auto;
    }
  }
  
  @media (max-width: 480px) {
    #speaklar-avatar {
      width: 90px;
      height: 90px;
      margin: 15px auto 10px auto;
    }
  }
  
  /* Form elements */
  #speaklar-popup select, #speaklar-popup input, #speaklar-popup button {
    margin: 8px 0;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--border-radius-sm);
    font-size: 14px;
  }
  #speaklar-popup button {
    background: white;
    color: #333;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: var(--border-radius-round);
  }
  #speaklar-popup button:hover {
    background: white;
  }
  
  /* Responsive form elements */
  @media (max-width: 768px) {
    #speaklar-popup select, #speaklar-popup input, #speaklar-popup button {
      padding: 8px;
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    #speaklar-popup select, #speaklar-popup input, #speaklar-popup button {
      padding: 7px;
      margin: 6px 0;
      font-size: 12px;
    }
  }
  #speaklar-form-container {
    border: 1px solid #eaeaea;
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-md);
    margin-top: var(--spacing-md);
    height: 200px;
  }
  #speaklar-hidden-input {
    display: none;
  }
  #speaklar-language-select {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    font-size: 16px;
    height: 40px;
  }
  
  /* Call status and steps */
  .speaklar-call-status {
    text-align: center;
    margin: 10px 0;
    font-weight: bold;
  }
  .speaklar-step {
    display: none;
  }
  .speaklar-hiden {
    display: none !important;
  }
  .speaklar-step.active {
    display: block;
  }
  
  /* Language buttons */
  .speaklar-language-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
  }
  .speaklar-language-button {
    width: calc(50% - 5px) !important;
    text-align: center;
    margin: 5px 0 !important;
    border-radius: var(--border-radius-round) !important;
  }
  
  /* Form rows */
  .speaklar-form-row {
    margin-bottom: var(--spacing-lg);
  }
  .speaklar-form-row label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: bold;
  }
  .speaklar-form-row input {
    width: 100%;
    padding: var(--spacing-sm);
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: var(--border-radius-sm);
  }
  
  /* Language dropdown */
  .language-dropdown {
    position: relative;
    display: inline-block;
  }
  .language-flag {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: var(--border-radius-circle);
    border: 1px solid rgba(255,255,255,0.3);
    background-color: transparent;
  }
  .language-dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: var(--secondary-bg-color);
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 10000;
    border-radius: var(--border-radius-md);
    overflow: hidden;
    margin-top: var(--spacing-xs);
    bottom: 30px;
  }
  
  /* Responsive language dropdown */
  @media (max-width: 768px) {
    .language-dropdown-content {
      min-width: 110px;
      bottom: 28px;
    }
  }
  
  @media (max-width: 480px) {
    .language-dropdown-content {
      min-width: 100px;
      bottom: 25px;
    }
    .language-option {
      padding: 6px 10px;
      font-size: 13px;
    }
  }
  .language-dropdown-content.show {
    display: block;
  }
  .language-option {
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .language-option:hover {
    background-color: #4e54c8;
  }
  .language-option span {
    margin-right: var(--spacing-sm);
  }
  
  /* Call button and controls */
  .call-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--border-radius-round);
    background: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    width: auto;
  }
  .call-button.end-call {
    background: #e74c3c;
    color: red !important;
  }
  .contact-input {
    background-color: white;
    border: none;
    border-radius: var(--border-radius-md);
    padding: var(--spacing-md) var(--spacing-lg);
    margin: var(--spacing-md) 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .call-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
  }
  
  /* Icons and buttons */
  .call-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-circle);
    background: var(--secondary-gradient);
  }
  .end-call {
    background-color: #e74c3c;
    border-radius: var(--border-radius-round);
    padding: var(--spacing-sm) var(--spacing-lg);
    color: white;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
  .flag-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-md);
    background-color: var(--secondary-bg-color);
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .flag-button img {
    width: 24px;
    height: 16px;
    border-radius: 2px;
  }
  .close-button {
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: var(--spacing-xs);
    width: auto;
    font-weight: bold;
  }
  
  /* Audio visualization */
  .audio-visualizer {
    gap: 4px;
    align-items: flex-end;
    height: 30px;
    justify-content: center;
    width: 40px;
  }
  
  /* Responsive audio visualization */
  @media (max-width: 768px) {
    .audio-visualizer {
      gap: 3px;
      height: 25px;
      width: 35px;
    }
  }
  
  @media (max-width: 480px) {
    .audio-visualizer {
      gap: 2px;
      height: 20px;
      width: 30px;
    }
  }
  .audio-bar {
    width: 4px;
    height: 15px;
    background: var(--primary-gradient);
    border-radius: 2px;
    animation: sound 1.5s infinite ease-in-out;
  }
  .audio-bar:nth-child(1) { animation-delay: 0.2s; }
  .audio-bar:nth-child(2) { animation-delay: 0.3s; }
  .audio-bar:nth-child(3) { animation-delay: 0.4s; }
  .audio-bar:nth-child(4) { animation-delay: 0.5s; }
  @keyframes sound {
    0% { height: 5px; }
    50% { height: 20px; }
    100% { height: 5px; }
  }
  
  /* Audio animation rings */
  .audio-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: var(--border-radius-circle);
    border: 2px solid rgba(78, 231, 255, 0.7);
    animation: pulse 2s infinite;
    pointer-events: none;
    box-shadow: 0 0 10px rgba(78, 231, 255, 0.5);
    display: none;
  }
  .audio-ring:nth-child(1) {
    width: 130%;
    height: 130%;
    animation-delay: 0s;
  }
  .audio-ring:nth-child(2) {
    width: 150%;
    height: 150%;
    animation-delay: 0.5s;
  }
  .audio-ring:nth-child(3) {
    width: 170%;
    height: 170%;
    animation-delay: 1s;
  }
  
  /* Responsive audio rings */
  @media (max-width: 480px) {
    .audio-ring {
      border-width: 1.5px;
    }
  }
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
  }
  
  /* Fix for audio rings display */
  #avatar-container .audio-ring {
    display: none;
  }
  `;
    document.head.appendChild(style);
  
    // Load SIP.js library
    const sipScript = document.createElement("script");
    sipScript.src = "https://speaklar.com/speaklar.min.js";
    sipScript.onload = function () {
      createPopup();
      // Attach the function to window immediately after loading the script
      initSpeaklarFunctions();
    };
    document.head.appendChild(sipScript);
  
    // Global variables
    let userAgent;
    let session;
  
    function initSpeaklarFunctions() {
      // Toggle call function to handle both starting and ending calls
      window.toggleCall = function () {
        const callButton = document.getElementById("speaklar-call-button");
  
        // If session exists, we're in a call and need to hang up
        if (session) {
          speaklarHangup();
          return;
        }
  
        // Otherwise start a new call
        speaklarCall();
      };
  
      // Create ringtone audio element
      const ringtoneAudio = new Audio(
        "https://call.powerinai.com/assets/mp3/ringtone.mp3"
      );
      ringtoneAudio.loop = true;
      // Expose functions to window scope
      window.speaklarCall = function () {
        const callButton = document.getElementById("speaklar-call-button");
        const statusElement = document.getElementById("speaklar-call-status");
  
        if (statusElement) statusElement.textContent = "Connecting...";
        if (statusElement) statusElement.style.display = "block";
  
        // Play ringtone when connecting
        state.ringtoneAudio
          .play()
          .catch((err) => {
            console.error("Error playing ringtone:", err);
            if (statusElement) statusElement.textContent = "Audio error";
          });
  
        const target = document.getElementById("targetId").value.trim();
  
        if (!target) {
          if (statusElement) statusElement.textContent = "Number is missing!";
          state.ringtoneAudio.pause();
          state.ringtoneAudio.currentTime = 0;
          return;
        }
  
        if (!state.userAgent) {
          register();
          return;
        }
  
        try {
          state.session = state.userAgent.invite(`sip:${target}@103.177.125.134`);
          
          // Add error handling for session
          state.session.on('failed', (response) => {
            console.error('Call failed:', response);
            if (statusElement) statusElement.textContent = 'Call failed';
            resetCallUI();
          });
          
          state.session.on('terminated', () => {
            console.log('Call terminated');
            resetCallUI();
          });
        } catch (error) {
          console.error('Error creating session:', error);
          if (statusElement) statusElement.textContent = 'Connection error';
          state.ringtoneAudio.pause();
          state.ringtoneAudio.currentTime = 0;
        }
  
        session.on("accepted", () => {
          // console.log("✅ Call connected!");
          // Stop ringtone when call is connected
          ringtoneAudio.pause();
          ringtoneAudio.currentTime = 0;
          if (statusElement) statusElement.textContent = "Connected";
          let remoteAudio = document.getElementById("speaklar-remote-audio");
          if (remoteAudio) {
            let remoteStream = new MediaStream();
  
            session.sessionDescriptionHandler.peerConnection
              .getReceivers()
              .forEach((receiver) => {
                if (receiver.track.kind === "audio") {
                  // console.log("🔊 Received audio track:", receiver.track);
                  remoteStream.addTrack(receiver.track);
                }
              });
  
            remoteAudio.srcObject = remoteStream;
  
            // Set up audio visualization
            setupAudioVisualization(remoteAudio);
          }
  
          // Show audio rings animation
          const audioRings = document.querySelectorAll(".audio-ring");
          audioRings.forEach((ring) => {
            ring.style.display = "block";
          });
  
          // Show audio visualizer
          const audioVisualizer = document.querySelector(".audio-visualizer");
          if (audioVisualizer) {
            audioVisualizer.style.display = "flex";
          }
  
          // Update call button to show "End Call"
          const callButton = document.getElementById("speaklar-call-button");
          if (callButton) {
            callButton.textContent = "End Call";
            callButton.classList.add("end-call");
  
            // Update the SVG icon to the hangup icon
            callButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" fill="red"/>
                </svg>
                End Call
              `;
          }
        });
  
        session.on("terminated", () => {
          // console.log("📴 Call ended!");
          if (statusElement) statusElement.textContent = "Call Ended";
          setTimeout(() => {
            if (statusElement) statusElement.textContent = "";
          }, 3000);
  
          // Hide audio rings animation
          const audioRings = document.querySelectorAll(".audio-ring");
          audioRings.forEach((ring) => {
            ring.style.display = "none";
          });
  
          // Hide audio visualizer
          const audioVisualizer = document.querySelector(".audio-visualizer");
          if (audioVisualizer) {
            // audioVisualizer.style.display = "none";
          }
  
          // Reset call button to "Start Call"
          const callButton = document.getElementById("speaklar-call-button");
          if (callButton) {
            callButton.classList.remove("end-call");
            callButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
                </svg>
                Start Call
              `;
          }
        });
      };
  
      window.speaklarHangup = function () {
        if (state.session) {
          state.session.bye();
          unregister();
          resetCallUI();
        }
      };

      // Helper function to reset UI elements after call ends
      function resetCallUI() {
        const statusElement = document.getElementById("speaklar-call-status");
        const callButton = document.getElementById("speaklar-call-button");
        const audioRings = document.querySelectorAll(".audio-ring");
        const audioVisualizer = document.querySelector(".audio-visualizer");

        if (statusElement) statusElement.textContent = "";
        if (callButton) {
          callButton.textContent = "Call";
          callButton.classList.remove("end-call");
          callButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
            </svg>
            Start Call
          `;
        }

        audioRings.forEach(ring => ring.style.display = "none");
        if (audioVisualizer) audioVisualizer.style.display = "none";

        // Clean up audio visualization
        if (state.visualizationAnimationFrame) {
          cancelAnimationFrame(state.visualizationAnimationFrame);
          state.visualizationAnimationFrame = null;
        }

        // Stop ringtone
        state.ringtoneAudio.pause();
        state.ringtoneAudio.currentTime = 0;
      }
    }
  
    function register() {
      var server = "wss://westernaiws.speaklar.com:8089/ws";
      var sipUser = "50004";
      var sipPassword = "ln47UEwtbyNHyzd";
      var sipDomain = "103.101.110.120";
  
      // Get the selected language to send to server
      const selectedLanguage = document.getElementById(
        "speaklar-selected-language"
      ).value;
  
      if (selectedLanguage == "bd") {
        sipUser = "50004";
      } else {
        sipUser = "50006";
        sipPassword = "ln47UEwtdyNHyzd";
      }
  
      try {
        state.userAgent = new SIP.UA({
          uri: `sip:${sipUser}@${sipDomain}`,
          transportOptions: { wsServers: server },
          authorizationUser: sipUser,
          password: sipPassword,
          sessionDescriptionHandlerFactoryOptions: {
            constraints: { audio: true, video: false },
            peerConnectionConfiguration: {
              iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            },
          },
          extraHeaders: [`X-Selected-Language: ${selectedLanguage}`],
        });
  
        state.userAgent.on("registered", () => {
          console.log("SIP Registered successfully");
          window.speaklarCall();
        });
  
        state.userAgent.on("registrationFailed", (error) => {
          console.error("Registration failed:", error);
          const statusElement = document.getElementById("speaklar-call-status");
          if (statusElement) statusElement.textContent = "Registration failed";
          resetCallUI();
        });

        state.userAgent.on("unregistered", () => {
          console.log("SIP Unregistered");
          state.userAgent = null;
          state.session = null;
          resetCallUI();
        });

        state.userAgent.on("transportError", () => {
          console.error("Transport error occurred");
          const statusElement = document.getElementById("speaklar-call-status");
          if (statusElement) statusElement.textContent = "Connection error";
          resetCallUI();
        });
      } catch (error) {
        console.error("Error creating SIP user agent:", error);
        const statusElement = document.getElementById("speaklar-call-status");
        if (statusElement) statusElement.textContent = "Connection error";
        resetCallUI();
      }
  
      userAgent.on("invite", (incomingSession) => {
        // console.log("📞 Incoming call...");
        session = incomingSession;
        session.accept();
        session.sessionDescriptionHandler.peerConnection
          .getReceivers()
          .forEach((receiver) => {
            if (receiver.track.kind === "audio") {
              const remoteAudio = document.getElementById(
                "speaklar-remote-audio"
              );
              if (remoteAudio) {
                remoteAudio.srcObject = new MediaStream([receiver.track]);
              }
            }
          });
      });
    }
  
    function unregister() {
      if (userAgent) {
        userAgent.unregister();
        // console.log("🚪 SIP Unregistered!");
        userAgent = null;
      }
    }
  
    // Audio visualization function
    function setupAudioVisualization(audioElement) {
      try {
        // Clean up previous visualization if exists
        if (state.visualizationAnimationFrame) {
          cancelAnimationFrame(state.visualizationAnimationFrame);
        }
        if (state.audioContext) {
          state.audioContext.close();
        }

        // Create audio context
        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        state.analyser = state.audioContext.createAnalyser();
        state.analyser.fftSize = 256;

        // Add gain node for volume control
        const gainNode = state.audioContext.createGain();
        gainNode.gain.value = state.volume;

        // Get audio source
        const source = state.audioContext.createMediaStreamSource(audioElement.srcObject);
        source.connect(gainNode);
        gainNode.connect(state.analyser);

        // Set up data array for frequency analysis
        const dataArray = new Uint8Array(state.analyser.frequencyBinCount);

        // Get audio bars
        const audioBars = document.querySelectorAll(".audio-bar");
        if (audioBars.length === 0) {
          console.warn("No audio bars found for visualization");
          return;
        }

        // Animation function
        function animateBars() {
          state.visualizationAnimationFrame = requestAnimationFrame(animateBars);

          // Get frequency data
          state.analyser.getByteFrequencyData(dataArray);

          // Calculate average frequency
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;

          // Animate bars based on audio level
          audioBars.forEach((bar, index) => {
            // Create variation between bars
            const variation = Math.random() * 10;
            const height = Math.max(
              5,
              Math.min(25, (average / 255) * 30 + variation)
            );
            bar.style.height = `${height}px`;
          });
        }

        // Start animation
        animateBars();
      } catch (error) {
        console.error("Error setting up audio visualization:", error);
      }
    }
  
    // Initialize state object
    const state = {
      volume: 0.5,
      audioContext: null,
      analyser: null,
      userAgent: null,
      session: null,
      ringtoneAudio: new Audio("https://call.powerinai.com/assets/mp3/ringtone.mp3"),
      visualizationAnimationFrame: null
    };

    // Add volume control function
    window.adjustVolume = function(value) {
      state.volume = Math.max(0, Math.min(1, value));
      if (state.audioContext) {
        const gainNode = state.audioContext.createGain();
        gainNode.gain.value = state.volume;
      }
    };

    function createPopup() {
      // Create toggle button (initial call button)
      const toggleButton = document.createElement("button");
      toggleButton.id = "speaklar-toggle";
      toggleButton.innerHTML = `
         <div style="display: flex; align-items: center;">
            <div class="audio-visualizer" style="display: flex;background: white;color: black;padding: 2px 6px;border-radius: 15px;">
            <div class="audio-bar" style="height: 7.92841px;"></div>
            <div class="audio-bar" style="height: 5px;"></div>
            <div class="audio-bar" style="height: 6.07958px;"></div>
            <div class="audio-bar" style="height: 6.27877px;"></div>
          </div>
          </div>
          <div style="display: flex;align-items: center;background: white;color: black;padding: 8px 8px;border-radius: 15px; font-weight: bold;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
            </svg>
            Voice Call
          </div>
          <div style="display: flex; align-items: center; border-left: 1px solid rgba(255,255,255,0.3); padding-left: 10px; background: white; color: black; padding: 8px 8px; border-radius: 15px;">
            <img src="https://flagcdn.com/w40/us.png" style="width: 20px; height: 20px; border-radius: 50%;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px;">
              <path d="M7 10l5 5 5-5z" fill="black"/>
            </svg>
          </div>
        `;
      toggleButton.onclick = togglePopup;
      document.body.appendChild(toggleButton);
  
      // Add CSS for language dropdown
      const additionalStyle = document.createElement("style");
      additionalStyle.textContent = `
          .language-dropdown {
            position: relative;
            display: inline-block;
          }
          .language-flag {
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.3);
            background-color: transparent;
          }
          .language-dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: #3b2c7c;
            min-width: 120px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 10000;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 5px;
          }
          .language-dropdown-content.show {
            display: block;
          }
          .language-option {
            color: white;
            padding: 8px 12px;
            text-decoration: none;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .language-option:hover {
            background-color: #4e54c8;
          }
          .language-option span {
            margin-right: 8px;
          }
          #speaklar-popup {
            background-color: #2d1b69;
            border-radius: 16px;
          }
          #speaklar-avatar {
            width: 120px;
            height: 120px;
            border: none;
            box-shadow: 0 0 20px rgba(143, 93, 183, 0.7);
            margin: 25px auto 15px auto;
            position: relative;
            border-radius: 50%;
            object-fit: cover;
          }
          /* Audio animation rings */
          .audio-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 2px solid rgba(78, 231, 255, 0.7);
            animation: pulse 2s infinite;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(78, 231, 255, 0.5);
          }
          .audio-ring:nth-child(1) {
            width: 130%;
            height: 130%;
            animation-delay: 0s;
          }
          .audio-ring:nth-child(2) {
            width: 150%;
            height: 150%;
            animation-delay: 0.5s;
          }
          .audio-ring:nth-child(3) {
            width: 170%;
            height: 170%;
            animation-delay: 1s;
          }
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 0.8;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0;
            }
          }
          
          /* X close button styling */
          .close-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
            width: auto;
            font-weight: bold;
          }
          
          /* Audio visualizer bars styling */
          .audio-bar {
            width: 4px;
            height: 15px;
            background: linear-gradient(30deg, #3151DF 0%, #f2295b 114%);
            border-radius: 2px;
            animation: sound 1.5s infinite ease-in-out;
          }
          .audio-bar:nth-child(1) { animation-delay: 0.2s; }
          .audio-bar:nth-child(2) { animation-delay: 0.3s; }
          .audio-bar:nth-child(3) { animation-delay: 0.4s; }
          .audio-bar:nth-child(4) { animation-delay: 0.5s; }
          @keyframes sound {
            0% { height: 5px; }
            50% { height: 20px; }
            100% { height: 5px; }
          }
          #speaklar-toggle {
            position: fixed;
            right: 110px;
            bottom: 20px;
            background: linear-gradient(30deg, #3151DF 0%, #f2295b 114%);
            color: white;
            border: none;
            border-radius: 30px;
            padding: 10px 15px;
            cursor: pointer;
            z-index: 9998;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .call-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 15px;
            border-radius: 30px;
            background: #e74c3c;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: bold;
            width: auto;
          }
          .call-button.end-call {
            background: #e74c3c;
          }
          .contact-input {
            background-color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 15px;
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
            font-size: 14px;
            color: #333;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .call-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
          }
          .call-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4e54c8, #8f5db7);
          }
          .end-call {
            background-color: #e74c3c;
            border-radius: 30px;
            padding: 8px 15px;
            color: white;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .flag-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #3b2c7c;
            cursor: pointer;
            border: none;
            padding: 0;
          }
          .flag-button img {
            width: 24px;
            height: 16px;
            border-radius: 2px;
          }
          .close-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
            width: auto;
          }
          /* Audio visualization */
          .audio-visualizer {
            // display: none;
            gap: 4px;
            align-items: flex-end;
            height: 30px;
            justify-content: center;
            width: 40px;
          }
          .audio-bar {
            width: 3px;
            background-color: white;
            border-radius: 3px;
            height: 15px;
            animation: sound 1.5s infinite ease-in-out;
          }
          .audio-bar:nth-child(1) { animation-delay: 0.2s; }
          .audio-bar:nth-child(2) { animation-delay: 0.3s; }
          .audio-bar:nth-child(3) { animation-delay: 0.4s; }
          .audio-bar:nth-child(4) { animation-delay: 0.5s; }
          @keyframes sound {
            0% { height: 5px; }
            50% { height: 20px; }
            100% { height: 5px; }
          }
          /* Fix for audio rings display */
          #avatar-container .audio-ring {
            display: none;
          }
        `;
      document.head.appendChild(additionalStyle);
  
      // Create popup container
      const popup = document.createElement("div");
      popup.id = "speaklar-popup";
  
      // Avatar URL - replace with your team member's photo or avatar
      const avatarUrl =
        "https://powerinai.com/wp-content/uploads/2025/03/Asset-1.png";
  
      // Default phone number (hidden)
      const defaultPhoneNumber = "7001";
  
      // Default language
      const defaultLanguage = "en";
  
      // Initialize with steps for the workflow
      popup.innerHTML = `
      <input type="hidden" id="speaklar-hidden-input" value="${defaultPhoneNumber}">
      <input type="hidden" id="speaklar-selected-language" value="${defaultLanguage}">
      
      <!-- Call Widget (only step now) -->
      <div id="step-call" class="speaklar-step active">
        <div style="position: absolute; right: 10px; top: 10px; display: flex; gap: 10px;">
          <button id="speaklar-close-call" class="close-button">✕</button>
  
        </div>
        <div id="avatar-container" style="position: relative; width: 120px; height: 120px; margin: 25px auto 15px auto;">
          <img id="speaklar-avatar" src="${avatarUrl}" alt="Support Agent">
          <!-- Audio animation rings -->
          <div class="audio-ring" style="display: none;"></div>
          <div class="audio-ring" style="display: none;"></div>
          <div class="audio-ring" style="display: none;"></div>
        </div>
        
        <input type="text" class="contact-input" id="targetId" placeholder="Your Contact Number" style="text-align: center;">
        
        <div class="call-controls" style="display: flex; justify-content: space-between; margin-top: 15px;">
          <!-- Audio visualizer -->
          <div class="audio-visualizer" style="display: flex; background: white; color: black; padding: 4px 8px; border-radius: 15px; margin-right: 12px;">
            <div class="audio-bar"></div>
            <div class="audio-bar"></div>
            <div class="audio-bar"></div>
            <div class="audio-bar"></div>
          </div>
          
          <!-- Call/End Call button -->
          <button id="speaklar-call-button" onclick="toggleCall()" class="call-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
            </svg>
            Start Call
          </button>
           <div style="background: white;color: black;padding: 4px 8px;border-radius: 15px;margin-left: 12px;display: flex;align-items: center;">
          <div class="language-dropdown">
            <img id="current-language-flag" src="https://flagcdn.com/w40/us.png" class="language-flag" alt="Language">
            <div id="language-dropdown-menu" class="language-dropdown-content">
              <div class="language-option" data-lang="en"><span>🇺🇸</span> English</div>
              <div class="language-option" data-lang="bd"><span>bd</span> Bangla</div>
              </div>
            </div>
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px;">
              <path d="M7 10l5 5 5-5z" fill="black"/>
            </svg>
        </div>
        </div>
        
        <div class="speaklar-call-status" id="speaklar-call-status" style="display: none;"></div>
        </button>
        <audio id="speaklar-remote-audio" autoplay></audio>
      </div>
    `;
      document.body.appendChild(popup);
  
      // Set up language dropdown functionality
      const languageFlag = document.getElementById("current-language-flag");
      const dropdownMenu = document.getElementById("language-dropdown-menu");
      const languageOptions = document.querySelectorAll(".language-option");
  
      // Flag click event to show/hide dropdown
      languageFlag.addEventListener("click", function () {
        dropdownMenu.classList.toggle("show");
      });
  
      // Close dropdown when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !event.target.matches(".language-flag") &&
          !event.target.closest(".language-dropdown-content")
        ) {
          dropdownMenu.classList.remove("show");
        }
      });
  
      // Language selection functionality
      languageOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const selectedLang = this.getAttribute("data-lang");
          document.getElementById("speaklar-selected-language").value =
            selectedLang;
  
          // Update flag image based on selection
          const flagCode = getFlagCodeFromLang(selectedLang);
          languageFlag.src = `https://flagcdn.com/w40/${flagCode}.png`;
  
          // Hide dropdown after selection
          dropdownMenu.classList.remove("show");
        });
      });
  
      // Helper function to get flag code from language code
      function getFlagCodeFromLang(lang) {
        const flagMap = {
          en: "us",
          bd: "bd",
        };
        return flagMap[lang] || "us";
      }
  
      // Set up close button for call view
      document
        .getElementById("speaklar-close-call")
        .addEventListener("click", function () {
          togglePopup();
        });
    }
  
    // function togglePopup() {
    //   const popup = document.getElementById("speaklar-popup");
    //   popup.classList.toggle("show");
    // }
    function togglePopup() {
      const popup = document.getElementById("speaklar-popup");
      const toggleButton = document.getElementById("speaklar-toggle");
  
      // Toggle the 'show' class for the popup
      popup.classList.toggle("show");
  
      // Check if 'show' class is now added or removed
      if (popup.classList.contains("show")) {
        // If 'show' class is added, hide the toggle button by adding 'speaklar-hiden' class
        toggleButton.classList.add("speaklar-hiden");
      } else {
        // If 'show' class is removed, remove 'speaklar-hiden' from the toggle button
        toggleButton.classList.remove("speaklar-hiden");
      }
    }
  })();
  
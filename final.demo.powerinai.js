(function () {
  // Create a unique namespace for this widget to prevent conflicts with other code
  const WIDGET_NAMESPACE = "spcl";

  // Create stylesheet for the popup with namespaced selectors
  const style = document.createElement("style");
  style.textContent = `
  /* Common variables - scoped with widget container */
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
  
  #${WIDGET_NAMESPACE}-current-language-flag {
    max-width: none !important;
  }

  /* Main popup container */
  #${WIDGET_NAMESPACE}-popup {
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
  
  /* Volume controller */
  
  #${WIDGET_NAMESPACE}-volume-controller input, #${WIDGET_NAMESPACE}-volume-controller button {
    //  margin: 0 !important;
    padding: 0 !important;
  }
  #${WIDGET_NAMESPACE}-volume-controller input{
     
  }
  #${WIDGET_NAMESPACE}-volume-controller button {
    width: 0px !important;
  }

  #${WIDGET_NAMESPACE}-volume-controller {
    position: absolute;
    top: 9px;
    left: 10px;
    background: var(--primary-gradient);
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-md);
    z-index: 9999;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow-light);
    transition: all var(--transition-default);
    overflow: hidden;
  }
  #${WIDGET_NAMESPACE}-volume-controller.${WIDGET_NAMESPACE}-collapsed {
    width: 40px;
  }
  #${WIDGET_NAMESPACE}-volume-toggle {
    background: transparent !important;
    border: none !important;
    color: white !important;
    cursor: pointer !important;
    padding: 0;
    margin-left: 5px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
  }
  #${WIDGET_NAMESPACE}-volume-slider {
    width: 100px;
    margin: 0 var(--spacing-sm);
    -webkit-appearance: none;
    height: 5px;
    border-radius: var(--border-radius-sm);
    background: rgba(255, 255, 255, 0.3);
    outline: none;
    transition: width var(--transition-default), opacity var(--transition-default);
  }
  #${WIDGET_NAMESPACE}-volume-controller.${WIDGET_NAMESPACE}-collapsed #${WIDGET_NAMESPACE}-volume-slider {
    width: 0;
    opacity: 0;
    margin: 0;
  }
  #${WIDGET_NAMESPACE}-volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: var(--border-radius-circle);
    background: white;
    cursor: pointer;
  }
  #${WIDGET_NAMESPACE}-volume-slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: var(--border-radius-circle);
    background: white;
    cursor: pointer;
    border: none;
  }
    /* iOS specific styles */
    @supports (-webkit-touch-callout: none) {
      #${WIDGET_NAMESPACE}-volume-slider {
        /* Increase touch target size for iOS */
        height: 20px;
        /* Ensure slider is not affected by iOS default styling */
        background-size: 100% 5px;
        background-position: center;
        background-repeat: no-repeat;
      }
      #${WIDGET_NAMESPACE}-volume-slider::-webkit-slider-thumb {
        /* Make thumb larger on iOS for better touch target */
        width: 20px;
        height: 20px;
      }
    }


  #${WIDGET_NAMESPACE}-popup.${WIDGET_NAMESPACE}-show {
    right: 111px;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    #${WIDGET_NAMESPACE}-popup {
      width: 260px;
    }
    #${WIDGET_NAMESPACE}-popup.${WIDGET_NAMESPACE}-show {
      right: 20%;
    }
  }
  
  @media (max-width: 480px) {
    #${WIDGET_NAMESPACE}-popup {
      width: 250px;
      padding: 12px;
      bottom: 15px;
    }
    #${WIDGET_NAMESPACE}-popup.${WIDGET_NAMESPACE}-show {
      right: 25%;
    }
  }
  
  /* Toggle button */
  #${WIDGET_NAMESPACE}-toggle {
    position: fixed;
    right: 20px;
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
    #${WIDGET_NAMESPACE}-toggle {
      right: 20px;
      padding: 8px 12px;
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    #${WIDGET_NAMESPACE}-toggle {
      right: 20px;
      bottom: 15px;
      padding: 6px 10px;
      font-size: 13px;
    }
  }
  
  /* Headings and text */
  #${WIDGET_NAMESPACE}-popup h2 {
    margin-top: 0;
    font-size: 18px;
    text-align: center;
    color: white;
  }
  
  /* Avatar styling */
  #${WIDGET_NAMESPACE}-avatar {
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
    #${WIDGET_NAMESPACE}-avatar {
      width: 100px;
      height: 100px;
      margin: 20px auto 12px auto;
    }
  }
  
  @media (max-width: 480px) {
    #${WIDGET_NAMESPACE}-avatar {
      width: 90px;
      height: 90px;
      margin: 15px auto 10px auto;
    }
  }
  
  /* Form elements */
  #${WIDGET_NAMESPACE}-popup select, #${WIDGET_NAMESPACE}-popup input, #${WIDGET_NAMESPACE}-popup button {
    margin: 8px 0;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--border-radius-sm);
    font-size: 14px;
  }
  #${WIDGET_NAMESPACE}-popup button {
    background: white;
    color: #333;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: var(--border-radius-round);
  }
  #${WIDGET_NAMESPACE}-popup button:hover {
    background: white;
  }
  
  /* Responsive form elements */
  @media (max-width: 768px) {
    #${WIDGET_NAMESPACE}-popup select, #${WIDGET_NAMESPACE}-popup input, #${WIDGET_NAMESPACE}-popup button {
      padding: 8px;
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    #${WIDGET_NAMESPACE}-popup select, #${WIDGET_NAMESPACE}-popup input, #${WIDGET_NAMESPACE}-popup button {
      padding: 7px;
      margin: 6px 0;
      font-size: 12px;
    }
  }
  #${WIDGET_NAMESPACE}-form-container {
    border: 1px solid #eaeaea;
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-md);
    margin-top: var(--spacing-md);
    height: 200px;
  }
  #${WIDGET_NAMESPACE}-hidden-input {
    display: none;
  }
  #${WIDGET_NAMESPACE}-language-select {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    font-size: 16px;
    height: 40px;
  }
  
  /* Call status and steps */
  .${WIDGET_NAMESPACE}-call-status {
    text-align: center;
    margin: 10px 0;
    font-weight: bold;
  }
  .${WIDGET_NAMESPACE}-step {
    display: none;
  }
  .${WIDGET_NAMESPACE}-hidden {
    display: none !important;
  }
  .${WIDGET_NAMESPACE}-step.${WIDGET_NAMESPACE}-active {
    display: block;
  }
  
  /* Language buttons */
  .${WIDGET_NAMESPACE}-language-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
  }
  .${WIDGET_NAMESPACE}-language-button {
    width: calc(50% - 5px) !important;
    text-align: center;
    margin: 5px 0 !important;
    border-radius: var(--border-radius-round) !important;
  }
  
  /* Form rows */
  .${WIDGET_NAMESPACE}-form-row {
    margin-bottom: var(--spacing-lg);
  }
  .${WIDGET_NAMESPACE}-form-row label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: bold;
  }
  .${WIDGET_NAMESPACE}-form-row input {
    width: 100%;
    padding: var(--spacing-sm);
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: var(--border-radius-sm);
  }
  
  /* Language dropdown */
  .${WIDGET_NAMESPACE}-language-dropdown {
    position: relative;
    display: inline-block;
  }
  .${WIDGET_NAMESPACE}-language-flag {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: var(--border-radius-circle);
    border: 1px solid rgba(255,255,255,0.3);
    background-color: transparent;
  }
  .${WIDGET_NAMESPACE}-language-dropdown-content {
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
    .${WIDGET_NAMESPACE}-language-dropdown-content {
      min-width: 110px;
      bottom: 28px;
    }
  }
  
  @media (max-width: 480px) {
    .${WIDGET_NAMESPACE}-language-dropdown-content {
      min-width: 100px;
      bottom: 25px;
    }
    .${WIDGET_NAMESPACE}-language-option {
      padding: 6px 10px;
      font-size: 13px;
    }
  }
  .${WIDGET_NAMESPACE}-language-dropdown-content.${WIDGET_NAMESPACE}-show {
    display: block;
  }
  .${WIDGET_NAMESPACE}-language-option {
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .${WIDGET_NAMESPACE}-language-option:hover {
    background-color: #4e54c8;
  }
  .${WIDGET_NAMESPACE}-language-option span {
    margin-right: var(--spacing-sm);
  }
  
  /* Call button and controls */
  .${WIDGET_NAMESPACE}-call-button {
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
  .${WIDGET_NAMESPACE}-call-button.${WIDGET_NAMESPACE}-end-call {
    background: #e74c3c;
    color: red !important;
  }
  .${WIDGET_NAMESPACE}-contact-input {
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
  .${WIDGET_NAMESPACE}-call-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
  }
  
  /* Icons and buttons */
  .${WIDGET_NAMESPACE}-call-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-circle);
    background: var(--secondary-gradient);
  }
  .${WIDGET_NAMESPACE}-end-call {
    background-color: #e74c3c;
    border-radius: var(--border-radius-round);
    padding: var(--spacing-sm) var(--spacing-lg);
    color: white;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
  .${WIDGET_NAMESPACE}-flag-button {
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
  .${WIDGET_NAMESPACE}-flag-button img {
    width: 24px;
    height: 16px;
    border-radius: 2px;
  }
  .${WIDGET_NAMESPACE}-close-button {
    background: transparent;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 7px 9px !important; 
    border-radius: var(--border-radius-md) !important;
    width: auto;
    font-weight: bold !important;
  }
  
  /* Audio visualization */
  .${WIDGET_NAMESPACE}-audio-visualizer {
    gap: 4px;
    align-items: flex-end;
    height: 30px;
    justify-content: center;
    width: 40px;
  }
  
  @media (max-width: 768px) {
    .${WIDGET_NAMESPACE}-audio-visualizer {
      gap: 3px;
      height: 25px;
      width: 35px;
    }
  }
  
  @media (max-width: 480px) {
    .${WIDGET_NAMESPACE}-audio-visualizer {
      gap: 2px;
      height: 20px;
      width: 30px;
    }
  }
  .${WIDGET_NAMESPACE}-audio-bar {
    width: 4px;
    height: 15px;
    background: var(--primary-gradient);
    border-radius: 2px;
    animation: ${WIDGET_NAMESPACE}-sound 1.5s infinite ease-in-out;
  }
  .${WIDGET_NAMESPACE}-audio-bar:nth-child(1) { animation-delay: 0.2s; }
  .${WIDGET_NAMESPACE}-audio-bar:nth-child(2) { animation-delay: 0.3s; }
  .${WIDGET_NAMESPACE}-audio-bar:nth-child(3) { animation-delay: 0.4s; }
  .${WIDGET_NAMESPACE}-audio-bar:nth-child(4) { animation-delay: 0.5s; }
  @keyframes ${WIDGET_NAMESPACE}-sound {
    0% { height: 5px; }
    50% { height: 20px; }
    100% { height: 5px; }
  }
  
  /* Audio animation rings */
  .${WIDGET_NAMESPACE}-audio-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: var(--border-radius-circle);
    border: 2px solid rgba(78, 231, 255, 0.7);
    animation: ${WIDGET_NAMESPACE}-pulse 2s infinite;
    pointer-events: none;
    box-shadow: 0 0 10px rgba(78, 231, 255, 0.5);
    display: none;
  }
  .${WIDGET_NAMESPACE}-audio-ring:nth-child(1) {
    width: 130%;
    height: 130%;
    animation-delay: 0s;
  }
  .${WIDGET_NAMESPACE}-audio-ring:nth-child(2) {
    width: 150%;
    height: 150%;
    animation-delay: 0.5s;
  }
  .${WIDGET_NAMESPACE}-audio-ring:nth-child(3) {
    width: 170%;
    height: 170%;
    animation-delay: 1s;
  }
  
  /* Responsive audio rings */
  @media (max-width: 480px) {
    .${WIDGET_NAMESPACE}-audio-ring {
      border-width: 1.5px;
    }
  }
  @keyframes ${WIDGET_NAMESPACE}-pulse {
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
  #${WIDGET_NAMESPACE}-avatar-container .${WIDGET_NAMESPACE}-audio-ring {
    display: none;
  }
  `;
  document.head.appendChild(style);

  // Create a container element to scope all widget elements
  const widgetContainer = document.createElement("div");
  widgetContainer.id = `${WIDGET_NAMESPACE}-container`;
  document.body.appendChild(widgetContainer);

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
  let visualizationAnimationFrame;
  let audioContext;
  let volume = 1; // Default volume set to full
  let ringtoneAudio;
  let isMicrophoneMuted = false; // Track microphone mute state

  // Create ringtone audio element
  ringtoneAudio = new Audio(
    "https://call.powerinai.com/assets/mp3/ringtone.mp3"
  );
  ringtoneAudio.loop = true;

  // State object is already defined above, removing duplicate initialization

  function initSpeaklarFunctions() {
    // Toggle microphone mute/unmute function
    window.toggleMicrophone = function () {
      if (!session) {
        console.log("No active call to mute/unmute mic.");
        const statusElement = document.getElementById(
          `${WIDGET_NAMESPACE}-call-status`
        );

        if (statusElement)
          statusElement.textContent = "No active call to mute/unmute mic.";
        if (statusElement) statusElement.style.display = "block";
        return;
      }

      try {
        // Get the microphone toggle button
        const micToggleBtn = document.getElementById(
          `${WIDGET_NAMESPACE}-mic-toggle`
        );
        //   const micToggleText = micToggleBtn.querySelector('span');
        const micToggleSvg = micToggleBtn.querySelector("svg");

        // Get the local audio track from the peer connection
        const senders =
          session.sessionDescriptionHandler.peerConnection.getSenders();
        const audioSender = senders.find(
          (sender) => sender.track && sender.track.kind === "audio"
        );

        if (audioSender && audioSender.track) {
          // Toggle the enabled state of the audio track
          isMicrophoneMuted = !isMicrophoneMuted;
          audioSender.track.enabled = !isMicrophoneMuted;

          // Update the button UI
          if (isMicrophoneMuted) {
            // Show muted state
            //   micToggleText.textContent = "";
            micToggleSvg.innerHTML = `
              <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" fill="black"/>
            `;
            micToggleBtn.style.background = "#ffcccc";
          } else {
            // Show unmuted state
            //   micToggleText.textContent = "";
            micToggleSvg.innerHTML = `
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="black"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="black"/>
            `;
            micToggleBtn.style.background = "white";
          }
        } else {
          console.warn("No audio track found to mute/unmute");
        }
      } catch (error) {
        console.error("Error toggling microphone:", error);
      }
    };

    // Toggle call function to handle both starting and ending calls
    window.toggleCall = function () {
      const callButton = document.getElementById(
        `${WIDGET_NAMESPACE}-call-button`
      );

      // If session exists, we're in a call and need to hang up
      if (session) {
        speaklarHangup();
        return;
      }

      // Otherwise start a new call
      speaklarCall();
    };

    // Expose functions to window scope
    window.speaklarCall = function () {
      const callButton = document.getElementById(
        `${WIDGET_NAMESPACE}-call-button`
      );
      const statusElement = document.getElementById(
        `${WIDGET_NAMESPACE}-call-status`
      );

      if (statusElement) statusElement.textContent = "Connecting...";
      if (statusElement) statusElement.style.display = "block";

      // Play ringtone when connecting
      ringtoneAudio.play().catch((err) => {
        console.error("Error playing ringtone:", err);
        if (statusElement) statusElement.textContent = "Audio error";
      });

      const target = document
        .getElementById(`${WIDGET_NAMESPACE}-targetId`)
        .value.trim();

      // Regular expression to validate phone number
      const phoneNumberPattern = /^[+]?([0-9]{1,4})?([0-9]{6,15})$/; // Adjust the pattern as per your requirements (e.g., country-specific)

      if (!target) {
        if (statusElement) statusElement.textContent = "Number is missing!";
        ringtoneAudio.pause();
        ringtoneAudio.currentTime = 0;
        return;
      }

      // Validate phone number format
      if (!phoneNumberPattern.test(target)) {
        if (statusElement) statusElement.textContent = "Invalid phone number!";
        ringtoneAudio.pause();
        ringtoneAudio.currentTime = 0;
        return;
      }

      if (!userAgent) {
        register();
        return;
      }

      try {
        session = userAgent.invite(`sip:${target}@103.177.125.134`);

        // Add error handling for session
        session.on("failed", (response) => {
          console.error("Call failed:", response);
          if (statusElement) statusElement.textContent = "Call failed";
          resetCallUI();
        });

        session.on("terminated", () => {
          console.log("Call terminated");
          resetCallUI();
        });
      } catch (error) {
        console.error("Error creating session:", error);
        if (statusElement) statusElement.textContent = "Connection error";
        ringtoneAudio.pause();
        ringtoneAudio.currentTime = 0;
        return;
      }

      session.on("accepted", () => {
        // Stop ringtone when call is connected
        ringtoneAudio.pause();
        ringtoneAudio.currentTime = 0;
        if (statusElement) statusElement.textContent = "Connected";
        let remoteAudio = document.getElementById(
          `${WIDGET_NAMESPACE}-remote-audio`
        );
        if (remoteAudio) {
          let remoteStream = new MediaStream();

          session.sessionDescriptionHandler.peerConnection
            .getReceivers()
            .forEach((receiver) => {
              if (receiver.track.kind === "audio") {
                remoteStream.addTrack(receiver.track);
              }
            });

          remoteAudio.srcObject = remoteStream;
        }

        // Show audio rings animation
        const audioRings = document.querySelectorAll(
          `.${WIDGET_NAMESPACE}-audio-ring`
        );
        audioRings.forEach((ring) => {
          ring.style.display = "block";
        });

        // Update call button to show "End Call"
        const callButton = document.getElementById(
          `${WIDGET_NAMESPACE}-call-button`
        );
        if (callButton) {
          callButton.textContent = "End Call";
          callButton.classList.add(`${WIDGET_NAMESPACE}-end-call`);

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
        if (statusElement) statusElement.textContent = "Call Ended";
        setTimeout(() => {
          if (statusElement) statusElement.textContent = "";
        }, 3000);

        // Hide audio rings animation
        const audioRings = document.querySelectorAll(
          `.${WIDGET_NAMESPACE}-audio-ring`
        );
        audioRings.forEach((ring) => {
          ring.style.display = "none";
        });

        // Reset call button to "Start Call"
        const callButton = document.getElementById(
          `${WIDGET_NAMESPACE}-call-button`
        );
        if (callButton) {
          callButton.classList.remove(`${WIDGET_NAMESPACE}-end-call`);
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
      if (session) {
        session.bye();
        unregister();
        resetCallUI();
      }
    };
  }

  // Helper function to reset UI elements after call ends
  function resetCallUI() {
    const statusElement = document.getElementById(
      `${WIDGET_NAMESPACE}-call-status`
    );
    const callButton = document.getElementById(
      `${WIDGET_NAMESPACE}-call-button`
    );
    const targetId = document.getElementById(`${WIDGET_NAMESPACE}-targetId`);
    const audioRings = document.querySelectorAll(
      `.${WIDGET_NAMESPACE}-audio-ring`
    );

    const micToggleBtn = document.getElementById(
      `${WIDGET_NAMESPACE}-mic-toggle`
    );

    if (targetId) targetId.value = "";

    if (statusElement) statusElement.textContent = "";
    if (callButton) {
      callButton.textContent = "Call";
      callButton.classList.remove(`${WIDGET_NAMESPACE}-end-call`);
      callButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
            </svg>
            Start Call
          `;
    }

    // Reset microphone button state
    if (micToggleBtn) {
      const micToggleText = micToggleBtn.querySelector("span");
      const micToggleSvg = micToggleBtn.querySelector("svg");

      // Reset to unmuted state
      isMicrophoneMuted = false;
      // micToggleText.textContent = "";
      micToggleBtn.style.background = "white";
      micToggleSvg.innerHTML = `
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="black"/>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="black"/>
      `;
    }

    audioRings.forEach((ring) => (ring.style.display = "none"));

    isCallActive = false; // ✅ Stop animation

    // Stop ringtone
    if (typeof ringtoneAudio !== "undefined" && ringtoneAudio) {
      ringtoneAudio.pause();
      ringtoneAudio.currentTime = 0;
    }
  }

  function register() {
    var server = "wss://westernaiws.speaklar.com:8089/ws"; // External URL kept as is
    var sipUser = "50005";
    var sipPassword = "ln47UEwtcyNHyzd";
    var sipDomain = "103.101.110.120";

    // Get the selected language to send to server
    const selectedLanguage = document.getElementById(
      `${WIDGET_NAMESPACE}-selected-language`
    ).value;
    console.log("Selected Language:", selectedLanguage);

    if (selectedLanguage == "bn") {
      sipUser = "50005";
    } else {
      sipUser = "50007";
      sipPassword = "ln47UEwteyNHyzd";
    }

    try {
      userAgent = new SIP.UA({
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

      userAgent.on("registered", () => {
        console.log("SIP Registered successfully");
        window.speaklarCall();
      });

      userAgent.on("registrationFailed", (error) => {
        console.error("Registration failed:", error);
        const statusElement = document.getElementById(
          `${WIDGET_NAMESPACE}-call-status`
        );
        if (statusElement) statusElement.textContent = "Registration failed";
        resetCallUI();
      });

      userAgent.on("unregistered", () => {
        console.log("SIP Unregistered");
        userAgent = null;
        session = null;
        resetCallUI();
      });

      userAgent.on("transportError", () => {
        console.error("Transport error occurred");
        const statusElement = document.getElementById(
          `${WIDGET_NAMESPACE}-call-status`
        );
        if (statusElement) statusElement.textContent = "Connection error";
        resetCallUI();
      });
    } catch (error) {
      console.error("Error creating SIP user agent:", error);
      const statusElement = document.getElementById(
        `${WIDGET_NAMESPACE}-call-status`
      );
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
              `${WIDGET_NAMESPACE}-remote-audio`
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
      session = null;
    }
  }

  // State object is already defined above, removing duplicate initialization
  // Function to unlock audio on iOS devices
  function unlockAudioForIOS(audioElement) {
    if (!audioElement) return;

    // Create a temporary audio context
    const tempContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Play a silent sound to unlock the audio
    const silentSource = tempContext.createBufferSource();
    silentSource.buffer = tempContext.createBuffer(1, 1, 22050);
    silentSource.connect(tempContext.destination);
    silentSource.start(0);

    // Also try to play the audio element itself
    const playPromise = audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Audio playback started successfully
          audioElement.pause();
        })
        .catch((error) => {
          // Auto-play was prevented, but we've still "unlocked" the audio
          console.log("Audio unlock attempt: ", error);
        });
    }
  }

  // Add volume control function
  window.adjustVolume = function (value) {
    volume = Math.max(0, Math.min(1, value));
    if (audioContext) {
      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume;
    }
    // Update volume slider value if it exists
    const volumeSlider = document.getElementById(
      `${WIDGET_NAMESPACE}-volume-slider`
    );
    if (volumeSlider) {
      volumeSlider.value = volume;
    }

    // Update any audio elements
    const remoteAudio = document.getElementById(
      `${WIDGET_NAMESPACE}-remote-audio`
    );
    if (remoteAudio) {
      // Special handling for iOS devices
      if (isIOS()) {
        // On iOS, we need to unlock audio first
        unlockAudioForIOS(remoteAudio);
        // Set volume with a slight delay to ensure it takes effect
        setTimeout(() => {
          remoteAudio.volume = volume;
        }, 100);
      } else {
        remoteAudio.volume = volume;
      }
    }
    if (ringtoneAudio) {
      // Special handling for iOS devices
      if (isIOS()) {
        // On iOS, we need to unlock audio first
        unlockAudioForIOS(ringtoneAudio);
        // Set volume with a slight delay to ensure it takes effect
        setTimeout(() => {
          ringtoneAudio.volume = volume;
        }, 100);
      } else {
        ringtoneAudio.volume = volume;
      }
    }
    // Save volume setting to localStorage for persistence
    try {
      localStorage.setItem(`${WIDGET_NAMESPACE}-volume`, volume);
    } catch (e) {
      console.log("Could not save volume setting");
    }
  };

  // Detect iOS device
  function isIOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  function createVolumeController() {
    // This function is now empty as the volume controller is directly added to the popup.innerHTML
    // The toggle functionality is added after the popup is created
  }

  function createPopup() {
    // Create volume controller
    createVolumeController();

    // Create toggle button (initial call button)
    const toggleButton = document.createElement("button");
    toggleButton.id = `${WIDGET_NAMESPACE}-toggle`;
    toggleButton.innerHTML = `
         <div style="display: flex; align-items: center;">
            <div class="${WIDGET_NAMESPACE}-audio-visualizer" style="display: flex;background: white;color: black;padding: 2px 6px;border-radius: 15px;">
            <div class="${WIDGET_NAMESPACE}-audio-bar" style="height: 7.92841px;"></div>
            <div class="${WIDGET_NAMESPACE}-audio-bar" style="height: 5px;"></div>
            <div class="${WIDGET_NAMESPACE}-audio-bar" style="height: 6.07958px;"></div>
            <div class="${WIDGET_NAMESPACE}-audio-bar" style="height: 6.27877px;"></div>
          </div>
          </div>
          <div style="display: flex;align-items: center;background: white;color: black;padding: 8px 8px;border-radius: 15px; font-weight: bold;font-size: 14px;">
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
          .${WIDGET_NAMESPACE}-language-dropdown {
            position: relative;
            display: inline-block;
          }
          .${WIDGET_NAMESPACE}-language-flag {
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.3);
            background-color: transparent;
          }
          .${WIDGET_NAMESPACE}-language-dropdown-content {
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
          .${WIDGET_NAMESPACE}-language-dropdown-content.${WIDGET_NAMESPACE}-show {
            display: block;
          }
          .${WIDGET_NAMESPACE}-language-option {
            color: white;
            padding: 8px 12px;
            text-decoration: none;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .${WIDGET_NAMESPACE}-language-option:hover {
            background-color: #4e54c8;
          }
          .${WIDGET_NAMESPACE}-language-option span {
            margin-right: 8px;
          }
          #${WIDGET_NAMESPACE}-popup {
            background-color: #2d1b69;
            border-radius: 16px;
          }
          #${WIDGET_NAMESPACE}-avatar {
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
          ${WIDGET_NAMESPACE}-audio-ring {
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
          ${WIDGET_NAMESPACE}-audio-ring:nth-child(1) {
            width: 130%;
            height: 130%;
            animation-delay: 0s;
          }
          ${WIDGET_NAMESPACE}-audio-ring:nth-child(2) {
            width: 150%;
            height: 150%;
            animation-delay: 0.5s;
          }
          ${WIDGET_NAMESPACE}-audio-ring:nth-child(3) {
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
          .${WIDGET_NAMESPACE}-close-button {
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
          .${WIDGET_NAMESPACE}-audio-bar {
            width: 4px;
            height: 15px;
            background: linear-gradient(30deg, #3151DF 0%, #f2295b 114%);
            border-radius: 2px;
            animation: ${WIDGET_NAMESPACE}-sound 1.5s infinite ease-in-out;
          }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(1) { animation-delay: 0.2s; }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(2) { animation-delay: 0.3s; }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(3) { animation-delay: 0.4s; }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(4) { animation-delay: 0.5s; }
          @keyframes ${WIDGET_NAMESPACE}-sound {
            0% { height: 5px; }
            50% { height: 20px; }
            100% { height: 5px; }
          }
          #${WIDGET_NAMESPACE}-toggle {
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
          .${WIDGET_NAMESPACE}-call-button {
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
          .${WIDGET_NAMESPACE}-call-button.${WIDGET_NAMESPACE}-end-call {
            background: #e74c3c;
          }
          .${WIDGET_NAMESPACE}-contact-input {
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
          .${WIDGET_NAMESPACE}-call-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
          }
          .${WIDGET_NAMESPACE}-call-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4e54c8, #8f5db7);
          }
          .${WIDGET_NAMESPACE}-end-call {
            background-color: #e74c3c;
            border-radius: 30px;
            padding: 8px 15px;
            color: white;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .${WIDGET_NAMESPACE}-flag-button {
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
          .${WIDGET_NAMESPACE}-flag-button img {
            width: 24px;
            height: 16px;
            border-radius: 2px;
          }
          .${WIDGET_NAMESPACE}-close-button {
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
            width: auto;
          }
          /* Audio visualization */
          .${WIDGET_NAMESPACE}-audio-visualizer {
            gap: 4px;
            align-items: flex-end;
            height: 30px;
            justify-content: center;
            width: 40px;
          }
          .${WIDGET_NAMESPACE}-audio-bar {
            width: 3px;
            background-color: white;
            border-radius: 3px;
            height: 15px;
            animation: ${WIDGET_NAMESPACE}-sound 1.5s infinite ease-in-out;
          }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(1) { animation-delay: 0.2s; }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(2) { animation-delay: 0.3s; }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(3) { animation-delay: 0.4s; }
          .${WIDGET_NAMESPACE}-audio-bar:nth-child(4) { animation-delay: 0.5s; }
          @keyframes ${WIDGET_NAMESPACE}-sound {
            0% { height: 5px; }
            50% { height: 20px; }
            100% { height: 5px; }
          }
          /* Fix for audio rings display */
          #${WIDGET_NAMESPACE}-avatar-container .${WIDGET_NAMESPACE}-audio-ring {
            display: none;
          }
        `;
    document.head.appendChild(additionalStyle);

    // Create popup container
    const popup = document.createElement("div");
    popup.id = `${WIDGET_NAMESPACE}-popup`;

    // Avatar URL - replace with your team member's photo or avatar
    const avatarUrl =
      "https://powerinai.com/wp-content/uploads/2025/03/Asset-1.png";

    // Default phone number (hidden)
    const defaultPhoneNumber = "7001";

    // Default language
    const defaultLanguage = "en";

    // Initialize with steps for the workflow
    popup.innerHTML = `
      <input type="hidden" id="${WIDGET_NAMESPACE}-hidden-input" value="${defaultPhoneNumber}">
      <input type="hidden" id="${WIDGET_NAMESPACE}-selected-language" value="${defaultLanguage}">
      
      <!-- Volume Controller -->
      <div id="${WIDGET_NAMESPACE}-volume-controller">
        <div style="display: flex; align-items: center; width:90%;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${WIDGET_NAMESPACE}-volume-icon">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="white"/>
          </svg>
          <input type="range" id="${WIDGET_NAMESPACE}-volume-slider" min="0" max="1" step="0.01" value="${volume}" oninput="adjustVolume(this.value)">
        </div>
        <button id="${WIDGET_NAMESPACE}-volume-toggle" title="Toggle volume controller" style="width:20px !important;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="white"/>
          </svg>
        </button>
      </div>
      
      <!-- Call Widget (only step now) -->
      <div id="step-call" class="${WIDGET_NAMESPACE}-step ${WIDGET_NAMESPACE}-active">
        <div style="position: absolute; right: 8px; top: 0px; display: flex; gap: 10px;">
          <button id="${WIDGET_NAMESPACE}-close-call" class="${WIDGET_NAMESPACE}-close-button">✕</button>
  
        </div>
        <div id="avatar-container" style="position: relative; width: 120px; height: 120px; margin: 25px auto 15px auto;">
          <img id="${WIDGET_NAMESPACE}-avatar" src="${avatarUrl}" alt="Support Agent">
          <!-- Audio animation rings -->
          <div class="${WIDGET_NAMESPACE}-audio-ring" style="display: none;"></div>
          <div class="${WIDGET_NAMESPACE}-audio-ring" style="display: none;"></div>
          <div class="${WIDGET_NAMESPACE}-audio-ring" style="display: none;"></div>
        </div>
        
        <input type="text" class="${WIDGET_NAMESPACE}-contact-input" id="${WIDGET_NAMESPACE}-targetId" placeholder="Your Contact Number" style="text-align: center;">
        
        <div class="${WIDGET_NAMESPACE}-call-controls" style="display: flex; justify-content: space-between; margin-top: 15px;">
         <!-- Microphone mute/unmute button -->
            <button id="${WIDGET_NAMESPACE}-mic-toggle" class="${WIDGET_NAMESPACE}-mic-toggle" style="display: flex;align-items: center;background: white;color: black;padding: 10px 13px;border-radius: 15px;margin-right: 12px;border: none;cursor: pointer;justify-content: center;width: auto;" onclick="toggleMicrophone()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="black"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="black"/>
              </svg>
            </button>
          
          <!-- Call/End Call button -->
          <button id="${WIDGET_NAMESPACE}-call-button" onclick="toggleCall()" class="${WIDGET_NAMESPACE}-call-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" fill="black"/>
            </svg>
            Start Call
          </button>
           <div style="background: white;color: black;padding: 4px 8px;border-radius: 15px;margin-left: 12px;display: flex;align-items: center;">
          <div class="${WIDGET_NAMESPACE}-language-dropdown">
            <img id="${WIDGET_NAMESPACE}-current-language-flag" src="https://flagcdn.com/w40/us.png" class="${WIDGET_NAMESPACE}-language-flag" alt="Language">
            <div id="${WIDGET_NAMESPACE}-language-dropdown-menu" class="${WIDGET_NAMESPACE}-language-dropdown-content">
              <div class="${WIDGET_NAMESPACE}-language-option" data-lang="en"><span>🇺🇸</span> English</div>
              <div class="${WIDGET_NAMESPACE}-language-option" data-lang="bn"><span>🇧🇩</span> Bangla</div>
              </div>
            </div>
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px;">
              <path d="M7 10l5 5 5-5z" fill="black"/>
            </svg>
        </div>
        </div>
        
        <div class="${WIDGET_NAMESPACE}-call-status" id="${WIDGET_NAMESPACE}-call-status" style="display: none;"></div>
        </button>
        <audio id="${WIDGET_NAMESPACE}-remote-audio" autoplay></audio>
      </div>
    `;
    document.body.appendChild(popup);

    // Set up language dropdown functionality
    const languageFlag = document.getElementById(
      `${WIDGET_NAMESPACE}-current-language-flag`
    );
    const dropdownMenu = document.getElementById(
      `${WIDGET_NAMESPACE}-language-dropdown-menu`
    );
    const languageOptions = document.querySelectorAll(
      `.${WIDGET_NAMESPACE}-language-option`
    );

    // Flag click event to show/hide dropdown
    languageFlag.addEventListener("click", function () {
      dropdownMenu.classList.toggle(`${WIDGET_NAMESPACE}-show`);
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !event.target.matches(`.${WIDGET_NAMESPACE}-language-flag`) &&
        !event.target.closest(`.${WIDGET_NAMESPACE}-language-dropdown-content`)
      ) {
        dropdownMenu.classList.remove(`${WIDGET_NAMESPACE}-show`);
      }
    });

    // Language selection functionality
    languageOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const selectedLang = this.getAttribute("data-lang");
        document.getElementById(`${WIDGET_NAMESPACE}-selected-language`).value =
          selectedLang;

        // Update flag image based on selection
        const flagCode = getFlagCodeFromLang(selectedLang);
        languageFlag.src = `https://flagcdn.com/w40/${flagCode}.png`;

        // Hide dropdown after selection
        dropdownMenu.classList.remove(`${WIDGET_NAMESPACE}-show`);
      });
    });

    // Helper function to get flag code from language code
    function getFlagCodeFromLang(lang) {
      const flagMap = {
        en: "us",
        bn: "bd",
      };
      return flagMap[lang] || "us";
    }

    // Set up close button for call view
    document
      .getElementById(`${WIDGET_NAMESPACE}-close-call`)
      .addEventListener("click", function () {
        togglePopup();
      });

    // Add toggle functionality for volume controller
    const volumeToggle = document.getElementById(
      `${WIDGET_NAMESPACE}-volume-toggle`
    );
    const volumeController = document.getElementById(
      `${WIDGET_NAMESPACE}-volume-controller`
    );

    // Initialize volume controller in expanded state
    if (volumeController) {
      volumeController.classList.add(`${WIDGET_NAMESPACE}-collapsed`);
    }

    if (volumeToggle) {
      volumeToggle.addEventListener("click", function () {
        volumeController.classList.toggle(`${WIDGET_NAMESPACE}-collapsed`);
        // Update toggle icon based on state
        if (
          volumeController.classList.contains(`${WIDGET_NAMESPACE}-collapsed`)
        ) {
          this.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" fill="white"/>
          </svg>`;
        } else {
          this.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="white"/>
          </svg>`;
        }
      });
    }

    // Initialize volume slider with current volume
    const volumeSlider = document.getElementById(
      `${WIDGET_NAMESPACE}-volume-slider`
    );
    if (volumeSlider) {
      volumeSlider.value = volume;
    }
  }

  function togglePopup() {
    const popup = document.getElementById(`${WIDGET_NAMESPACE}-popup`);
    const toggleButton = document.getElementById(`${WIDGET_NAMESPACE}-toggle`);

    // Toggle the 'show' class for the popup
    popup.classList.toggle(`${WIDGET_NAMESPACE}-show`);

    // Check if 'show' class is now added or removed
    if (popup.classList.contains(`${WIDGET_NAMESPACE}-show`)) {
      // If 'show' class is added, hide the toggle button by adding '${WIDGET_NAMESPACE}-hidden' class
      toggleButton.classList.add(`${WIDGET_NAMESPACE}-hidden`);
    } else {
      // If 'show' class is removed, remove '${WIDGET_NAMESPACE}-hidden' from the toggle button
      toggleButton.classList.remove(`${WIDGET_NAMESPACE}-hidden`);
    }
  }
})();

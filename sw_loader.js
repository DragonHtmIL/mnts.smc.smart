if ('serviceWorker' in navigator) {
  if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
    navigator.serviceWorker.register('/mnts.smc.smart/sw.js', { scope: '/mnts.smc.smart/' }).then(registration => {
      const infoEl = document.getElementById("swInfo");
      if (infoEl) {
        infoEl.innerHTML = "Service Worker registered with scope: " + registration.scope;
      }
    }).catch(error => {
      const infoEl = document.getElementById("swInfo");
      if (infoEl) {
        infoEl.innerHTML = "Service Worker registration failed: " + error.message;
      }
    });
    document.getElementById("manifestTestLoad")?.setAttribute('href', '/mnts.smc.smart/manifest.webmanifest');
  } else {
    const infoEl = document.getElementById("swInfo");
    if (infoEl) {
      infoEl.innerHTML = "Service workers can be registered only on HTTPS: protocol.";
    }
  }
}
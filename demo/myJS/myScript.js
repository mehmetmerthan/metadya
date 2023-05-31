function myJsScript() {
  var container = document.querySelector("#unity-container");
  var canvas = document.querySelector("#unity-canvas");
  var loadingBar = document.querySelector("#unity-loading-bar");
  var progressBarFull = document.querySelector("#unity-progress-bar-full");
  var fullscreenButton = document.querySelector("#unity-fullscreen-button");
  var warningBanner = document.querySelector("#unity-warning");

  function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') div.style = 'background: red; padding: 10px;';
    else {
      if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
      setTimeout(function () {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    updateBannerVisibility();
  }

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/mtdy.loader.js";
  var config = {
    dataUrl: buildUrl + "/mtdy.data",
    frameworkUrl: buildUrl + "/mtdy.framework.js",
    codeUrl: buildUrl + "/mtdy.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Metadya",
    productVersion: "0.1",
    showBanner: unityShowBanner,
  };


  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:

    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
    container.className = "unity-mobile";
    canvas.className = "unity-mobile";
    document.getElementById("Idle").id = "IdleMobile";
    document.getElementById("nextPose").id = "nextPoseMobile";
    document.getElementById("dance").id = "danceMobile";
    fullscreenButton.style.width = "30px";
    fullscreenButton.style.height = "30px";
    fullscreenButton.style.display = "none";
    document.getElementById("fittingRoom").style.display = "none";
    canvas.style.display = "none";
  } else {
    canvas.style.width = "500px";
    canvas.style.height = "500px";
    document.getElementById("Room").style.display = "none";
  }

  loadingBar.style.display = "block";
  document.getElementById("button-group").style.display = "none";
  let control = true;
  var myInstance = null;
  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      window.myInstance = unityInstance;
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          if (control === true) {
            document.getElementById("button-group").style.display = "flex";
            fullscreenButton.style.display = "block";
            document.getElementById("button-group").style.display = "block";
            control = false;
          } else {
            document.getElementById("button-group").style.display = "none";
            idle();
            control = true;
          }
        }
        else {
          if (control === true) {
            canvas.style.width = "900px";
            canvas.style.height = "450px";
            document.getElementById("button-group").style.display = "flex";
            fullscreenButton.style.display = "block";
            document.getElementById("button-group").style.display = "block";
            control = false;
          } else {
            canvas.style.width = "500px";
            canvas.style.height = "500px";
            document.getElementById("button-group").style.display = "none";
            idle();
            control = true;
          }

        };
        room();

      };
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);

  let roomControl = true;
  function Room() {
    if (roomControl === true) {
      canvas.style.display = "block";
      fullscreenButton.style.display = "block";
      document.getElementById("fittingRoom").style.display = "block";
      roomControl = false;
    } else {
      canvas.style.display = "none";
      fullscreenButton.style.display = "none";
      document.getElementById("fittingRoom").style.display = "none";
      roomControl = true;
    }
  }
  window.Room = Room;
}



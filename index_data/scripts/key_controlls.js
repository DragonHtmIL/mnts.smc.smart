document.addEventListener("keydown", function (event) {
  const target = event.target;
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  ) {
    if (event.key !== "Escape") return;
  }
  const menu = document.getElementById("menu");
  const alertBox = document.getElementById("alert");
  const loading = document.getElementById("loading");
  const accenter = document.getElementById("accenter");
  const isMenuOpen = menu?.style.display === "block";
  const isAlertOpen = alertBox?.style.display === "block";
  const isLoading = loading?.style.display === "flex";
  const isAccenterOpen = accenter?.style.display === "block";
  if (event.key === "Escape") {
    if (isMenuOpen) {
      handleInterval();
      document.getElementById('menu').style.display='none';
      closeSettingsSound();
      menuPauseWalkSound();
      miniModalClose();
    } else if (!isAlertOpen && !isLoading) {
      clearInterval(setIntervalId);
      document.getElementById('menu').style.display='block';
      openSettingsSound();
      menuPauseWalkSound();
    }
    return;
  }
  if (event.key === " ") {
    const alert = document.getElementById("alert");
    const checkbox = document.getElementById("chechboxPausing");
    const alertcancel = document.getElementById("alertCenter");
    const alertnull = document.getElementById("alertLeft");
    const alertconfirm = document.getElementById("alertRight");
    alertconfirm.style.display = "block";
    if(checkbox.checked === false) {
      clearInterval(setIntervalId);
      checkbox.classList.add("pauser");
      alert.style.display = "block";
      alertcancel.value = "...";
      alertcancel.style.display = "none";
      alertnull.value = "...";
      alertnull.style.display = "none";
      checkbox.checked = true;
      if(localStorage.getItem("lang") === "en") {
        document.getElementById("alertText").innerHTML = "Game paused, touch ''Continue'' to continue.";
        if(velocityY === -1) {
          document.getElementById("alertText").innerHTML += "<br>" + "You be continue to up.";
        }else
        if(velocityY === 1) {
          document.getElementById("alertText").innerHTML += "<br>" + "You be continue to down.";
        }else
        if(velocityX === -1) {
          document.getElementById("alertText").innerHTML += "<br>" + "You be continue to left.";
        }else
        if(velocityX === 1) {
          document.getElementById("alertText").innerHTML += "<br>" + "You be continue to right.";
        }
        alertconfirm.value = "Continue";
      }else
      if(localStorage.getItem("lang") === "ru") {
        document.getElementById("alertText").innerHTML = "Игра приостановлена, коснитесь ''Продолжить'', чтобы продолжить.";
        if(velocityY === -1) {
          document.getElementById("alertText").innerHTML += "<br>" + "Вы будете продолжать вверх.";
        }else
        if(velocityY === 1) {
          document.getElementById("alertText").innerHTML += "<br>" + "Вы будете продолжать вниз.";
        }else
        if(velocityX === -1) {
          document.getElementById("alertText").innerHTML += "<br>" + "Вы будете продолжать влево.";
        }else
        if(velocityX === 1) {
          document.getElementById("alertText").innerHTML += "<br>" + "Вы будете продолжать вправо.";
        }
        alertconfirm.value = "Продолжать";
      }else
      if(localStorage.getItem("lang") === "he") {
        document.getElementById("alertText").innerHTML = "משחק נעצר, גע ''המשך'' בכדי להמשיך.";
        if(velocityY === -1) {
          document.getElementById("alertText").innerHTML += "<br>" + "אתם תמשיכו למעלה.";
        }else
        if(velocityY === 1) {
          document.getElementById("alertText").innerHTML += "<br>" + "אתם תמשיכו למטה.";
        }else
        if(velocityX === -1) {
          document.getElementById("alertText").innerHTML += "<br>" + "אתם תמשיכו שמאלה.";
        }else
        if(velocityX === 1) {
          document.getElementById("alertText").innerHTML += "<br>" + "אתם תמשיכו ימינה.";
        }
        alertconfirm.value = "המשך";
      }
      alertconfirm.onclick = function() {
        document.getElementById('chechboxPausing').click();
        alertconfirm.style.display = "none";
      }
    }else
    if(checkbox.checked === true) {
      if(localStorage.getItem("lang") === "en") {
        document.getElementById("alertText").innerHTML = "Ready to continue in...";
      }else
      if(localStorage.getItem("lang") === "ru") {
        document.getElementById("alertText").innerHTML = "Готово продолжить через...";
      }else
      if(localStorage.getItem("lang") === "he") {
        document.getElementById("alertText").innerHTML = "מוכן להמשיך בעוד...";
      }
      setTimeout(() => {
        document.getElementById("alertText").innerHTML = "3";
      },1000);
      setTimeout(() => {
        document.getElementById("alertText").innerHTML = "2";
      },2000);
      setTimeout(() => {
        document.getElementById("alertText").innerHTML = "1";
      },3000);
      setTimeout(() => {
        document.getElementById("alertText").innerHTML = "0";
        if(localStorage.getItem("difficulty") === "normal") {
          setIntervalId = setInterval(initGame, 140);
        }else
        if(localStorage.getItem("difficulty") === "hard") {
          setIntervalId = setInterval(initGame, 100);
        }else
        if(localStorage.getItem("difficulty") === "hell") {
          setIntervalId = setInterval(initGame, 50);
        };
        alert.style.display = "none";
        checkbox.classList.remove("pauser");
        checkbox.checked = false;
        document.getElementById("btn000").classList.remove("pauser");
        playActiveMoveSound();
      },4000);
    }
    menuPauseWalkSound();
    defaultClickSound();
  }
  if (event.key === "Enter") {
    if (isAlertOpen) {
      document.getElementById("alertRight")?.click();
    } else if (document.getElementById("loseModal")?.style.display === "block") {
      closeModalSound();
      document.getElementById("loseModal").style.display = "none";
      gameOver = false;
      updateFoodPosition();
      updateSnakePosition();
      velocityX = 0;
      velocityY = 0;
      snakeBody = [];
      score = 0;
      if(localStorage.getItem("lang") === "en") {
        scoreElement.innerText = `Score: ${score}`;
      } else if(localStorage.getItem("lang") === "ru") {
        scoreElement.innerText = `Счет: ${score}`;
      } else if(localStorage.getItem("lang") === "he") {
        scoreElement.innerText = `ציון: ${score}`;
      }
      localStorage.setItem("steelScore", localStorage.getItem("high-score"));
      clearInterval(fireworksIntervalId);
      fireworksIntervalId = setInterval(playFireworksSounds, 1000);
    }
    return;
  }
});
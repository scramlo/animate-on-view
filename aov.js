const animatedElements = document.querySelectorAll('.animated');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    //every animated element needs to start transparent
    entry.target.style.opacity = "0";

    if ((entry.intersectionRatio > 0) && (entry.target.dataset.aov)) { //when on screen and has animations

      //get animation settings if any and create array
      animationNames = entry.target.dataset.aov.split(" ");
      newAnimationSettingsArray = [];

      //for each animation, create a string with the duration and delay attached
      for (var i = 0; i < animationNames.length; i++) {

        let duration = "2s";
        let delay = "0s";

        //check if there are special delay settings
        if (entry.target.dataset.aovDelay) {
          delay = entry.target.dataset.aovDelay + "s";
        }

        //check if there are special duration settings
        if (entry.target.dataset.aovDuration) {
          duration = entry.target.dataset.aovDuration + "s";
        }

        let singleAnimation = animationNames[i] + " " + duration + " " + delay + " forwards";
        newAnimationSettingsArray.push(singleAnimation);
      }

      //create final animation settings string
      let finalAnimationSettings = newAnimationSettingsArray.join();

      //launch the change
      entry.target.style.animation = finalAnimationSettings;

    } else { //when off screen

      //reset settings
      entry.target.style.opacity = "0";
      entry.target.style.transform = "initial";
      entry.target.style.animation = "";
    }
  });
});

animatedElements.forEach(element => {
  observer.observe(element);
});
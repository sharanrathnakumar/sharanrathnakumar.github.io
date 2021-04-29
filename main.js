var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "/images/" + animation + "/" + frameNumber + ".png";
};

let Frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
    block: [],
  };
  let imagesToLoad = 0;

  ["idle", "kick", "punch", "forward", "backward", "block"].forEach(
    (animation) => {
      let animationFrames = Frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });

  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let quedAnimation = [];

  let aux = () => {
    let selectedAnimation;

    if (quedAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = quedAnimation.shift();
    }

    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("forward").onclick = () => {
    quedAnimation.push("forward");
  };

  document.getElementById("backward").onclick = () => {
    quedAnimation.push("backward");
  };

  document.getElementById("kick").onclick = () => {
    quedAnimation.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    quedAnimation.push("punch");
  };
document.getElementById("block").onclick = () => {
    quedAnimation.push("block");
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowUp") {
      quedAnimation.push("kick");
    } else if (key === "ArrowDown") {
      quedAnimation.push("block");
    } else if (key === "ArrowRight") {
      quedAnimation.push("forward");
    } else if (key === "ArrowLeft") {
      quedAnimation.push("backward");
    } else if (key === "Enter") {
      quedAnimation.push("punch");
    }
  });
});

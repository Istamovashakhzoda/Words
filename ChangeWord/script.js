console.clear;
gsap.config({ trialWarn: false });
gsap.registerPlugin(Draggable, InertiaPlugin);

const slides = gsap.utils.toArray(".rolodex li");

const slideCount = slides.length;
const itemH = slides[0].offsetHeight;
const wrapH = slideCount * itemH;
const wrapVal = gsap.utils.wrap(0, slideCount * itemH);
const r = (slideCount * itemH) / (2 * Math.PI);

gsap.set(".rolodex", { height: `${2 * Math.round(r)}px` });
const proxy = document.createElement("div");

// no idea why, but this one is on gulls site? Maybe old code?
// gsap.set('.rolodex ul', { z: -1 * r, rotateX: '90deg' });

slides.forEach((s, i) => {
  gsap.set(s, {
    yPercent: -50,
    y: r,
    z: r,
    rotateX: `${i * (360 / slides.length)}deg`,
    transformOrigin: `50% 50% -${r}px`
  });
});

const animation = gsap.to(slides, {
  duration: 1,
  rotateX: "-=360deg",
  ease: "none",
  paused: true
});

const drag = Draggable.create(proxy, {
  type: "y",
  trigger: ".rolodex ul",
  inertia: true,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {
    y: (y) => {
      return Math.round(y / itemH) * itemH;
    }
  }
});

function updateProgress() {
  animation.progress(wrapVal(this.y) / wrapH);
}

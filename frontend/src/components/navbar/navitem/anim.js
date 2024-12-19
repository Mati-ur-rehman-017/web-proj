export const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.25,
      delay: 0.4 + i * 0.01,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.15 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.65, type: "linear", ease: [0.76, 0, 0.24, 1] },
  },
};

export default function (to, from, savedPosition) {
  return new Promise((resolve) => {
    // Set a timeout of 1500 milliseconds
    setTimeout(() => {
      if (savedPosition) {
        resolve(savedPosition);
      } else {
        resolve({ x: 0, y: 0 });
      }
    }, 1500);
  });
}

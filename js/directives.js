/* v-reveal: fades an element in when it scrolls into view. Usage: v-reveal="index" */
const revealDirective = {
  mounted(el, binding) {
    el.style.transitionDelay = (binding.value % 3) * 90 + 'ms';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in');
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
  }
};

export let load_gsap = async () => {
  if (!window.gsap) {
    const gsapModule = await import("https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js");
    const { gsap } = gsapModule;

    const { ScrollTrigger } = await import("https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js");
    const { ScrollToPlugin } = await import("https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollToPlugin.js");

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;
    window.ScrollToPlugin = ScrollToPlugin;
  }
};

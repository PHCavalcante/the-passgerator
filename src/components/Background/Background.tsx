import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: { value: "#000" },
      },
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      detectRetina: true,
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        number: {
          density: { enable: true, area: 800 },
          value: 80,
        },
        color: { value: "#ff5722" },
        shape: {
          type: "triangle",
        },
        opacity: {
          value: 0.7,
          random: { enable: true, minimumValue: 0.1 },
        },
        size: {
          value: 3,
          random: { enable: true, minimumValue: 1 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#d9e1e8",
          opacity: 0.4,
          width: 1,
        },
      },
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return null;
};

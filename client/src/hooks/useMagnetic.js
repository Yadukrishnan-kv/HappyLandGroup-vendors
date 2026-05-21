import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const bound = element.getBoundingClientRect();
      const x = e.clientX - (bound.left + bound.width / 2);
      const y = e.clientY - (bound.top + bound.height / 2);

      // Move element towards cursor
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      // Elastic spring back to center
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

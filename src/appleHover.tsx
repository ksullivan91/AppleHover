import { useRef, useEffect } from 'react';

export const useAppleHover = ({
  scale = 1.01,
  duration = 0.25,
  transitionTimingFunction = 'linear',
  shadowTimingFunction = 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  shadow = true,
  shadowColor = '000',
  cardBackgroundColor = 'fff',
  cardBackgroundOpacity = 1.0,
  shadowOpacity = 0.15,
  delay = 0,
  modifier = 3,
}) => {
  const cardRef = useRef<HTMLElement>(null);

  const hexToRgb = (hex: string): string => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the hex string
    let r: number, g: number, b: number;
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      throw new Error('Invalid HEX color.');
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (card.firstElementChild?.clientHeight) {
      card.style.setProperty(
        'height',
        `${card.firstElementChild.clientHeight}px`
      );
      card.style.setProperty(
        'width',
        `${card.firstElementChild.clientWidth}px`
      );
    }
    const stylizeCards = () => {
      const rgbColor = hexToRgb(cardBackgroundColor);
      card.style.transition = `transform ${duration}s ${transitionTimingFunction} ${delay}s, box-shadow ${duration}s ${shadowTimingFunction} ${delay}s`;
      card.style.background = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${cardBackgroundOpacity})`;
    };

    const mouseMove = (event: any) => {
      console.log('mouseMove');
      const halfW = card.clientWidth / 2,
        perspective = card.offsetWidth * 1.3333333,
        halfH = card.clientHeight / 2,
        coorX = halfW - (event.pageX - card.offsetLeft),
        coorY = halfH - (event.pageY - card.offsetTop),
        degX = (coorY / halfH) * modifier, // max. degree = 5
        degY = (coorX / halfW) * -modifier; // max. degree = 5

      card.style.setProperty(
        'transform',
        'perspective( ' +
          perspective +
          'px ) translate3d( 0, -2px, 0 ) scale( ' +
          scale +
          ' ) rotateX(' +
          degX +
          'deg) rotateY(' +
          degY +
          'deg)'
      );
      if (shadow)
        card.style.setProperty(
          'box-shadow',
          -degY +
            'px ' +
            degX +
            'px 8px 0px rgba(' +
            shadowColor[0] +
            ', ' +
            shadowColor[1] +
            ', ' +
            shadowColor[2] +
            ', ' +
            shadowOpacity +
            ')'
        );
    };

    const mouseOut = () => {
      card.style.removeProperty('transform');
      card.style.removeProperty('box-shadow');
    };

    stylizeCards();
    card.addEventListener('mousemove', mouseMove);
    card.addEventListener('mouseleave', mouseOut);

    return () => {
      card.removeEventListener('mousemove', mouseMove);
      card.removeEventListener('mouseleave', mouseOut);
    };
  }, [
    scale,
    duration,
    transitionTimingFunction,
    shadowTimingFunction,
    shadow,
    shadowColor,
    cardBackgroundColor,
    cardBackgroundOpacity,
    shadowOpacity,
    delay,
    modifier,
  ]);

  return cardRef;
};

export interface AppleHoverProps {
  scale?: number;
  duration?: number;
  transitionTimingFunction?: string;
  shadowTimingFunction?: string;
  shadow?: boolean;
  shadowColor?: string;
  cardBackgroundColor?: string;
  cardBackgroundOpacity?: number;
  shadowOpacity?: number;
  delay?: number;
  modifier?: number;
  children: React.ReactNode;
}

export const AppleHover: React.FC<AppleHoverProps> = ({
  children,
  ...props
}) => {
  const hoverRef = useAppleHover(props);

  return (
    <div
      ref={hoverRef as React.RefObject<HTMLDivElement>}
      className='apple-card'
    >
      {children}
    </div>
  );
};

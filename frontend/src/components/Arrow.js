import React from 'react';
import { FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '../styles/chat-arrow.css';

export default function Arrow({ 
  direction = 'up', 
  size = 24, 
  color = 'white', 
  onClick, 
  className = '',
  disabled = false 
}) {
  const arrowClasses = [
    'arrow-component',
    `arrow-${direction}`,
    disabled ? 'arrow-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  if (onClick) {
    return (
      <button
        className={arrowClasses}
        onClick={onClick}
        disabled={disabled}
        aria-label={`Arrow pointing ${direction}`}
      >
        {/* Arrow icon placeholder */}
      </button>
    );
  }

  return (
    <div className={arrowClasses}>
      {/* Arrow icon placeholder */}
    </div>
  );
}

// Preset arrow components for common use cases
export const UpArrow = (props) => <Arrow direction="up" {...props} />;
export const DownArrow = (props) => <Arrow direction="down" {...props} />;
export const LeftArrow = (props) => <Arrow direction="left" {...props} />;
export const RightArrow = (props) => <Arrow direction="right" {...props} />;

// Scroll to top arrow component
export const ScrollToTopArrow = ({ showBelow = 100, ...props }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShow(window.pageYOffset > showBelow);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBelow]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <div className="arrow-component">
      <button onClick={scrollToTop} aria-label="Scroll to top">
        <FiArrowUp size={24} />
      </button>
    </div>
  );
};
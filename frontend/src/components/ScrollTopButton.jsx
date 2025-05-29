import "../index.css";
import { useEffect, useState} from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
        className='scroll-top-btn'
        onClick={scrollToTop}
        style={{
            display: visible ? 'block' : 'none',
        }}
    >
      ↑
    </button>
  );
}

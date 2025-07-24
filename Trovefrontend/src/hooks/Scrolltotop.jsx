import { useEffect } from 'react';

const Scrolltotop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; // ✅ Ensuring component returns something
};

export default Scrolltotop;

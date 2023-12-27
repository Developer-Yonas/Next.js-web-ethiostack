import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="social-media-links" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a href="https://twitter.com/yonas_wbw" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '2rem', color: '#1DA1F2', margin: '0 10px' }} />
        </a>
        <a href="https://github.com/Developer-Yonas" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2rem', color: '#333', margin: '0 10px' }} />
        </a>
        <a href="https://www.instagram.com/yonas_wbw" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2rem', color: '#E1306C', margin: '0 10px' }} />
        </a>
        <a href="https://www.linkedin.com/in/yonas-woldegerima-aaa673245" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '2rem', color: '#0077B5', margin: '0 10px' }} />
        </a>
        <a href="https://www.telegram.me/yonas_wbw" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '2rem', color: '#0088cc', margin: '0 10px' }} />
        </a>
        {/* Add more social media links as needed */}
      </div>
      <div className="copyright">
        &copy; 2023 By : Yonas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

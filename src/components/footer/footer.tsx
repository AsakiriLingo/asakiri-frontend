import React from 'react';

import { Image } from '@/components/image';
import './footer.scss';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <Image
                width="48px"
                height="48px"
                alt="asakiri logo"
                src="./asakiri-logo.svg"
              />
              <div className="footer-logo-text">
                <h3 className="footer-heading">Asakiri</h3>
                <p>Write. Teach. Learn - Digital Language Textbook</p>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Quick Links</h3>
              <ul>
                <li>
                  <a href="./">Home</a>
                </li>
                <li>
                  <a href="./partners">Partners</a>
                </li>
                <li>
                  <a href="./about">About Us</a>
                </li>
                <li>
                  <a href="./privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="./terms">Terms & Conditions</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="footer-heading">Contact Us</h3>
              <div className="footer-links">
                <Image
                  src="./bluesky-logo.svg"
                  width="16px"
                  height="16px"
                  alt="Bluesky icon"
                />
                <a href="https://bsky.app/profile/asakiri.com" target="_blank">
                  Blue Sky
                </a>
              </div>
              <div className="footer-links">
                <Image
                  src="./discord-logo.svg"
                  width="16px"
                  height="16px"
                  alt="Discord icon"
                />
                <a href="https://discord.gg/6VhDw5RXJ2" target="_blank">
                  Discord
                </a>
              </div>
              <div className="footer-links">
                <Image
                  src="./icons/email.svg"
                  width="16px"
                  height="16px"
                  alt="Email icon"
                />
                <a href="mailto:email@example.com" target="_blank">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer">
        <p>&copy; 2025 Asakiri. All rights reserved.</p>
      </footer>
    </>
  );
};

import React, { useEffect } from 'react';

interface KofiWidgetProps {
  username: string;
  color?: string;
  text?: string;
}

interface KofiWidgetOverlay {
  draw: (
    username: string,
    config: {
      type: 'floating-chat';
      'floating-chat.donateButton.text': string;
      'floating-chat.donateButton.background-color': string;
      'floating-chat.donateButton.text-color': string;
    }
  ) => void;
}

declare global {
  interface Window {
    kofiWidgetOverlay: KofiWidgetOverlay;
  }
}

const KofiWidget: React.FC<KofiWidgetProps> = ({
  username,
  color = '#0EC02B',
  text = 'Support Us',
}) => {
  useEffect(() => {
    const loadKofiWidget = () => {
      const script: HTMLScriptElement = document.createElement('script');
      script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
      script.async = true;
      script.onload = () => {
        window.kofiWidgetOverlay.draw(username, {
          type: 'floating-chat',
          'floating-chat.donateButton.text': text,
          'floating-chat.donateButton.background-color': color,
          'floating-chat.donateButton.text-color': '#fff',
        });
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        const widgetFrame = document.getElementById('kofi-widget-overlay');
        if (widgetFrame) {
          widgetFrame.remove();
        }
      };
    };

    loadKofiWidget();
  }, [username, color, text]);

  return null;
};

export default KofiWidget;

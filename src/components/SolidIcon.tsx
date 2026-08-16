import React from 'react';

export type IconName =
  | 'search'
  | 'email'
  | 'whatsapp'
  | 'phone'
  | 'certificate'
  | 'award'
  | 'star'
  | 'location'
  | 'calendar'
  | 'clock'
  | 'users'
  | 'user'
  | 'building'
  | 'check'
  | 'check-circle'
  | 'shield'
  | 'book'
  | 'laptop'
  | 'leaf'
  | 'palette'
  | 'briefcase'
  | 'heart'
  | 'chart'
  | 'filter'
  | 'plus'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'external-link'
  | 'sprout'
  | 'globe'
  | 'bell'
  | 'lock'
  | 'info'
  | 'alert'
  | 'send';

interface SolidIconProps {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
}

export default function SolidIcon({ name, className = '', size = 20, color }: SolidIconProps) {
  const style = color ? { color } : undefined;
  const dimensionProps = { width: size, height: size };

  switch (name) {
    case 'search':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M10 2a8 8 0 016.32 12.905l4.387 4.388a1 1 0 01-1.414 1.414l-4.388-4.387A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
        </svg>
      );

    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12.012 2c-5.508 0-9.988 4.479-9.988 9.988 0 1.761.459 3.477 1.332 4.992l-1.415 5.166 5.291-1.387c1.458.796 3.106 1.217 4.78 1.217 5.508 0 9.988-4.479 9.988-9.988 0-5.509-4.48-9.988-9.988-9.988zm5.787 14.287c-.244.686-1.42 1.31-1.956 1.371-.502.057-1.144.116-3.666-.924-3.08-1.272-5.06-4.42-5.214-4.624-.151-.204-1.246-1.658-1.246-3.161 0-1.503.786-2.24 1.066-2.545.244-.265.534-.332.713-.332.179 0 .358.002.513.009.167.008.391-.064.611.465.228.549.774 1.892.842 2.03.069.137.114.298.023.48-.092.183-.137.297-.274.457-.137.16-.289.358-.412.481-.137.137-.281.286-.121.561.16.275.711 1.173 1.528 1.901 1.05 .936 1.937 1.226 2.212 1.363.275.137.435.114.595-.069.16-.183.686-.799.869-1.074.183-.275.366-.228.618-.137.252.092 1.599.754 1.874.891.275.137.458.206.526.32.068.114.068.663-.176 1.349z" />
        </svg>
      );

    case 'phone':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
        </svg>
      );

    case 'certificate':
    case 'award':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2a6 6 0 00-6 6c0 2.44 1.455 4.542 3.555 5.446l-1.353 5.41a1 1 0 001.408 1.12L12 18.7l2.39 1.276a1 1 0 001.408-1.12l-1.353-5.41A6.002 6.002 0 0018 8a6 6 0 00-6-6zm0 3a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );

    case 'location':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
      );

    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
        </svg>
      );

    case 'clock':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-4a1 1 0 110-2h3V7a1 1 0 112 0v6z" />
        </svg>
      );

    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      );

    case 'user':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );

    case 'building':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
        </svg>
      );

    case 'check':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      );

    case 'check-circle':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
        </svg>
      );

    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      );

    case 'laptop':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
        </svg>
      );

    case 'leaf':
    case 'sprout':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M17 3H7c-2.21 0-4 1.79-4 4v10c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4zm-5 14a4 4 0 01-4-4c0-2.21 4-6 4-6s4 3.79 4 6a4 4 0 01-4 4z" />
        </svg>
      );

    case 'palette':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.4-.46-.61-1.04-.61-1.68 0-1.38 1.12-2.5 2.5-2.5H18c2.21 0 4-1.79 4-4 0-4.97-4.48-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8s1.5.67 1.5 1.5S7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      );

    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      );

    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );

    case 'chart':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zM16.2 13H19v6h-2.8z" />
        </svg>
      );

    case 'filter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
        </svg>
      );

    case 'plus':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      );

    case 'chevron-right':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      );

    case 'chevron-left':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      );

    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      );

    case 'external-link':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg>
      );

    case 'globe':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.81 2h2.95c.32 1.3.8 2.51 1.38 3.56A8.03 8.03 0 015.07 16zm2.95-8H5.07a8.03 8.03 0 013.52-3.56C8.01 5.49 7.53 6.7 7.21 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.34.16-2h4.68c.09.66.16 1.32.16 2 0 .68-.07 1.34-.16 2zm1.47 5.56c.58-1.05 1.06-2.26 1.38-3.56h2.95a8.03 8.03 0 01-3.52 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
        </svg>
      );

    case 'bell':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
      );

    case 'lock':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
      );

    case 'info':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );

    case 'alert':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
      );

    case 'send':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} {...dimensionProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

import React from 'react';

function Section({ children, style }) {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '2.5rem 1.2rem',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export default Section;

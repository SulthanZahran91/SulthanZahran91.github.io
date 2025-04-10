import React from 'react';
// Example: npm install react-icons
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem', // Space between icons
    margin: '2rem 0 0.5rem 0', // Margin top and bottom
  },
  link: {
    fontSize: '1.8rem', // Icon size
    color: '#555', // Icon color
    textDecoration: 'none',
  },
  // Basic hover effect (add more styles as needed)
  linkHover: {
     color: '#000',
  },
   // Styles for dark mode (could be managed by CSS variables or theme context)
  darkLink: {
     color: '#bbb',
  },
  darkLinkHover: {
     color: '#fff',
  },
  note: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#888',
    marginTop: '0.5rem',
  },
  darkNote: {
    color: '#aaa',
  }
};


function ContactLinks() {
  // State to manage hover (optional, can be done with CSS :hover)
  const [hoveredIcon, setHoveredIcon] = React.useState(null);
  const [isDark, setIsDark] = React.useState(false);

  // Check for dark mode on mount (basic example)
  React.useEffect(() => {
    if (document.body.classList.contains('dark')) {
        setIsDark(true);
    }
    // Optional: listen for changes if you have a theme toggle
  }, []);

  const getLinkStyle = (iconName) => ({
    ...styles.link,
    ...(isDark ? styles.darkLink : {}),
    ...(hoveredIcon === iconName ? (isDark ? styles.darkLinkHover : styles.linkHover) : {}),
  });


  return (
    <div>
      <div style={styles.container}>
        {/* Replace text with actual icons */}
        <a
          href="mailto:zsulthan9@gmail.com" // Replace with your email
          title="Email"
          style={getLinkStyle('email')}
          onMouseEnter={() => setHoveredIcon('email')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
            { <FaEnvelope /> }
        </a>
        <a
          href="https://wa.me/6281291616145" // Replace with your WhatsApp link
          target="_blank" rel="noopener noreferrer"
          title="WhatsApp"
          style={getLinkStyle('whatsapp')}
          onMouseEnter={() => setHoveredIcon('whatsapp')}
          onMouseLeave={() => setHoveredIcon(null)}
          >
             { <FaWhatsapp /> }
        </a>
        <a
          href="https://linkedin.com/in/sulthan-zahran-ui" // Replace with your LinkedIn profile
          target="_blank" rel="noopener noreferrer"
          title="LinkedIn"
          style={getLinkStyle('linkedin')}
           onMouseEnter={() => setHoveredIcon('linkedin')}
           onMouseLeave={() => setHoveredIcon(null)}
         >
             { <FaLinkedin /> }
        </a>
        <a
          href="https://github.com/SulthanZahran1" // Replace with your GitHub profile or relevant link
          target="_blank" rel="noopener noreferrer"
          title="GitHub / Portfolio"
          style={getLinkStyle('github')}
          onMouseEnter={() => setHoveredIcon('github')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
             { <FaGithub /> }
        </a>
      </div>
      <p style={{ ...styles.note, ...(isDark ? styles.darkNote : {}) }}>
        You can contact me anywhere using the links above
      </p>
    </div>
  );
}

export default ContactLinks;
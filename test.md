## `components\astro\Footer.astro`
```astro
---
const currentYear = new Date().getFullYear();
---
<footer>
	© {currentYear} Sulthan Zahran Ma'ruf. Powered by Astro. Hosted by GitHub Pages.
    </footer>

<style>
	footer {
		text-align: center;
		padding: 1.5rem 1rem;
		font-size: 0.8rem;
		color: #888;
		margin-top: 2rem;
        border-top: 1px solid #eee;
	}
    body.dark footer {
        color: #aaa;
        border-top-color: #444;
    }
</style>
```

## `components\astro\Header.astro`
```astro
---
const currentPath = Astro.url.pathname;
const isActive = (href) => {
  if (href === '/') {
    return currentPath === '/';
  }
  return currentPath === href || currentPath.startsWith(href + '/');
}
---

<header>
	<nav>
        <a href="/" class:list={[{ active: isActive('/') }]}>about</a>
		<a href="/cv" class:list={[{ active: isActive('/cv') }]}>cv</a>
		<a href="/projects" class:list={[{ active: isActive('/projects') }]}>projects</a>
		<a href="/repositories" class:list={[{ active: isActive('/repositories') }]}>repositories</a>
</header>

<style>
	header {
		padding: 1rem;
        max-width: 800px;
        margin: 0 auto; /* Center nav within max-width */
        width: 100%;
        box-sizing: border-box; /* Include padding in width */
	}
	nav {
		display: flex;
		justify-content: flex-end; /* Right align items */
		gap: 1rem; /* Space between links */
	}
    nav a, nav button {
        color: #888; /* Lighter color for nav */
        font-size: 0.9rem;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: none; /* Ensure no default underline */
        padding-bottom: 2px; /* Add space for potential border */
        border-bottom: 2px solid transparent; /* Placeholder for active style */
        transition: color 0.2s ease, border-color 0.2s ease; /* Smooth transition */

    }
    nav a:hover, nav button:hover {
        color: #333; /* Darken on hover */
        text-decoration: none;
    }
    
    nav a.active {
        color: #333; /* Make text darker/stand out */
        font-weight: 600; /* Slightly bolder */
        border-bottom-color: #333; /* Example: Add an underline effect */
    }

    body.dark nav a, body.dark nav button {
        color: #aaa;
    }
     body.dark nav a:hover, body.dark nav button:hover {
        color: #eee;
    }
    .theme-toggle-placeholder {
        /* Basic styling for placeholder */
        font-size: 1.2rem;
        line-height: 1;
    }
</style>
```

## `components\react\ContactLinks.jsx`
```jsx
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
```

## `components\react\Timeline.jsx`
```jsx
import React, { useState, useRef, useEffect } from 'react';

function HorizontalTimeline({ data }) {
  const [expandedId, setExpandedId] = useState(null);
  const handleToggle = (id) => setExpandedId(expandedId === id ? null : id);

  // Refs
  const itemContainerRefs = useRef([]);
  const contentBoxRefs = useRef([]);

  // State for heights
  const [dynamicMinHeights, setDynamicMinHeights] = useState({});

  // Base min-height
  const baseMinHeightRem = 14;
  const [baseMinHeightPx, setBaseMinHeightPx] = useState(baseMinHeightRem * 16);

  useEffect(() => {
    itemContainerRefs.current = itemContainerRefs.current.slice(0, data.length);
    contentBoxRefs.current = contentBoxRefs.current.slice(0, data.length);
  }, [data]);

  // Effect to calculate and set min-height
  useEffect(() => {
    const newMinHeights = {};
    // Buffer space - clearance needed above/below the expanded content
    const bufferPx = 50; // e.g., 2rem (adjust as needed)

    data.forEach((item, index) => {
      let targetMinHeightPx = baseMinHeightPx; // Default to base PX

      if (item.id === expandedId) {
        const contentBoxWrapper = contentBoxRefs.current[index];
        if (contentBoxWrapper) {
          // Use rAF to measure after render/transition start
          requestAnimationFrame(() => {
             const currentWrapper = contentBoxRefs.current[index];
             if (currentWrapper) {
                 const contentHeight = currentWrapper.scrollHeight;

                 // --- REVISED CALCULATION ---
                 // The item container needs roughly double the content height
                 // because the content sits entirely above or below the 50% mark.
                 const requiredMinHeight = Math.max(
                     baseMinHeightPx,
                     (contentHeight * 3) + bufferPx // Double content height + buffer
                 );
                 // --- END REVISION ---

                 targetMinHeightPx = requiredMinHeight;

                 // Update state for this specific ID inside rAF
                 setDynamicMinHeights(prev => {
                     const newHeightStr = `${targetMinHeightPx}px`;
                     if (prev[item.id] !== newHeightStr) {
                         // console.log(`Item ${item.id} UPDATING: contentHeight=${contentHeight}px, targetMinHeight=${newHeightStr}`);
                         return { ...prev, [item.id]: newHeightStr };
                     }
                     return prev;
                 });
             }
          });
          // Synchronous calculation for initial state update structure
          targetMinHeightPx = Math.max(baseMinHeightPx, ((contentBoxWrapper.scrollHeight || 0) * 2) + bufferPx);
        }
        // Store target height string for final state update check
        newMinHeights[item.id] = `${targetMinHeightPx}px`;

      } else {
         // Collapsed items use base PX value string
         newMinHeights[item.id] = `${baseMinHeightPx}px`;
      }
    });

    // Update state for all items, ensuring resets happen correctly
     setDynamicMinHeights(prev => {
         const finalHeights = {};
         let changed = false;
         data.forEach(item => {
             // Use the height calculated in the loop or fallback to base
             const targetHeight = newMinHeights[item.id] || `${baseMinHeightPx}px`;
             // For the expanded item, the rAF will handle the definitive update,
             // but we ensure the structure is here. For others, this applies the reset.
             if (prev[item.id] !== targetHeight) {
                 finalHeights[item.id] = targetHeight;
                 changed = true;
             } else {
                 finalHeights[item.id] = prev[item.id]; // Keep existing if no change needed
             }
         });
         // Only return new state object if changed
         return changed ? finalHeights : prev;
     });

  }, [expandedId, data, baseMinHeightPx]);


  // --- Colors ---
  const typeColors = { /* ... */ };

  return (
    // Outer container
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-auto pb-8 timeline-scrollbar">
      {/* Inner container */}
      <div className="relative flex space-x-8 px-4 sm:px-6 lg:px-8 py-16 min-w-max max-w-7xl mx-auto items-center">
        {/* Line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full z-0"></div>
        {/* Map */}
        {data.map((item, index) => {
          const isExpanded = expandedId === item.id;
          const dotColor = typeColors[item.type] || typeColors.default;
          const isUp = index % 2 === 0;

          return (
            // Item container - Apply dynamic style, add transition
            <div
              key={item.id}
              ref={el => itemContainerRefs.current[index] = el}
              className="relative flex-shrink-0 w-72 md:w-80 z-10 transition-[min-height] duration-300 ease-in-out" // Transition on min-height
              // Apply computed height using pixel value or fallback to base pixel height
              style={{ minHeight: dynamicMinHeights[item.id] || `${baseMinHeightPx}px` }}
            >
              {/* Dot */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 ${dotColor} rounded-full border-4 border-white dark:border-gray-900 z-20`}></div>
              {/* Content Box Wrapper */}
              <div
                ref={el => contentBoxRefs.current[index] = el}
                className={`absolute left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] z-10 ${ isUp ? 'bottom-[50%]' : 'top-[50%]' }`}
              >
                {/* Inner Content Box */}
                <div
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-lg h-full flex flex-col"
                  onClick={() => handleToggle(item.id)}
                >
                   {/* Content */}
                   <div className="flex-grow">
                        <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{item.date}</span>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.subtitle} {item.location ? `● ${item.location}` : ''}</p>
                    </div>
                    {/* Icon */}
                    <div className="text-right mt-2">
                        <span className={`inline-block transform transition-transform duration-300 text-blue-500 dark:text-blue-400 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>▶</span>
                    </div>
                    {/* Details */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${ isExpanded ? 'max-h-96 mt-3' : 'max-h-0' }`}>
                         {Array.isArray(item.details) ? ( <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">{item.details.map((detail, i) => <li key={i}>{detail}</li>)}</ul>) : (<p className="text-sm text-gray-700 dark:text-gray-300">{item.details}</p>)}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default HorizontalTimeline;
```

## `layouts\Layout.astro`
```astro
---
import Header from '../components/astro/Header.astro';
import Footer from '../components/astro/Footer.astro';
import '../styles/global.css'; 

export interface Props {
	title?: string; // Optional title prop
}

const { title = 'Sulthan Zahran Ma\'ruf - Portfolio' } = Astro.props;
---
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="generator" content={Astro.generator} />
	<title>{title}</title>

	<style is:global>
		body {
			font-family: sans-serif;
			margin: 0;
			padding: 0;
			display: flex;
			flex-direction: column;
			min-height: 100vh;
            background-color: #fff; /* Light theme default */
            color: #333;
		}
        main {
            flex-grow: 1;
            max-width: 1000px;
            margin: 2rem auto; /* Center content */
            padding: 0 1rem;
        }
        a {
            color: inherit; /* Or set a specific link color */
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }

		/* Add styles for dark mode if implementing ThemeToggle */
		body.dark {
			background-color: #222;
			color: #eee;
		}
	</style>
    <link rel="stylesheet" href="/global.css"> </head>
<body>
	<Header />
	<main>
		<slot /> </main>
	<Footer />
    <script>
        // Basic script to apply dark mode if needed (can be enhanced in ThemeToggle)
		const theme = localStorage.getItem('theme');
		if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.body.classList.add('dark');
		}
	</script>
</body>
</html>


```

## `pages\cv.astro`
```astro
---
import BaseLayout from '../layouts/Layout.astro';

import HorizontalTimeline from '../components/react/Timeline.jsx';


const timelineData = [
  {
    id: 'lg-cns-dev',
    date: 'Apr 2024 - Now',
    title: 'Smart Factory Logistics Developer',
    subtitle: 'LG CNS Indonesia / LG Sinarmas Technology Solutions',
    location: 'Karawang, Indonesia',
    type: 'work',
    details: [
      'Analyzed supply chain data and production metrics to identify and eliminate 4 major bottlenecks.',
      'Developed an application that analyzes complex SQL queries for faster debugging.',
      'Developed and implemented dispatch system optimizations.',
    ]
  },
  {
    id: 'polychemie-si',
    date: 'Jan - Mar 2024',
    title: 'System Integrator',
    subtitle: 'PT Polychemie Asia Pacific',
    location: 'Jakarta, Indonesia',
    type: 'work',
    details: [
      'Tasked with implementing a data acquisition system for temperature and flow.',
      'Explored DAQ, PLC, and Arduino approaches.',
    ]
  },
  {
    id: 'faan-lab-ra',
    date: 'Oct 2023 - Mar 2024',
    title: 'Research Assistant',
    subtitle: 'FAAN Lab, Universitas Indonesia',
    location: 'Jakarta, Indonesia',
    type: 'work', 
    details: [
        'Engineered a Real-time Data Analyzer for advanced spectroscopic analysis using MATLAB App Designer.',
    ]
  },
   {
    id: 'mitx-cert',
    date: 'December 2024', 
    title: 'Supply Chain Analytics Certification',
    subtitle: 'MITx',
    location: 'Online',
    type: 'certification',
    details: [
        'Applied advanced statistical techniques (ANOVA, control charts).',
        'Implemented optimization methods (linear/integer programming).',
        'Utilized probability distributions and stochastic models.',
    ]
  },
   {
    id: 'ui-edu',
    date: '2019 - 2023',
    title: 'Bachelor of Science in Instrumentation Physics',
    subtitle: 'Universitas Indonesia',
    location: 'Depok, Indonesia',
    type: 'education',
    details: [
        'Thesis: Development of an Arduino-Based Automated Probe System for data acquisition and analysis.',
    ]
  },
  {
    id: 'indyscc-award',
    date: '2022',
    title: '4th on Hero HPL Challenge (1st South East Asian team)',
    subtitle: 'IndySCC 22 @ ACM/IEEE Supercomputing Conference',
    location: 'Dallas, USA',
    type: 'award',
    details: [
      'Supercomputing competition involving setting up a server cluster from barebones in 72 hours to solve HPC problems.',
    ]
  },
   {
    id: 'sugitama-intern',
    date: 'Jun - Jul 2022',
    title: 'PLC Programmer (Internship)',
    subtitle: 'PT Sugitama Intiarto',
    location: 'Tangerang Selatan, Indonesia',
    type: 'work',
    details: [
        'Worked on cream spreader machine programming (PLC and HMI).',
    ]
  },
   {
    id: 'robotics-club',
    date: 'Jun 2020 - Aug 2021',
    title: 'Programming PIC',
    subtitle: 'Universitas Indonesia Robotics Club',
    location: 'Jakarta, Indonesia',
    type: 'organization', 
    details: [
        'Programmed Line Follower Robot.',
        'Programmed and handled electrical for Digital Twins-based Robot.',
        'Integrated cameras for Digital Twins Arena.',
    ]
  },
  
];

---

<BaseLayout title="CV - Sulthan Zahran Ma'ruf">
  <section class="cv-section py-8 md:py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-2">Curriculum Vitae</h1>
    <p class="text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8 md:mb-12">
      A timeline of my professional experience, education, and key achievements. Scroll horizontally to explore.
    </p>

    {/* Render the React HorizontalTimeline component */}
    <HorizontalTimeline data={timelineData} client:visible />

  </section>
</BaseLayout>

<style is:global>
  /* Optional: Style scrollbars for better look if desired */
  /* Target the timeline container specifically if needed */
  .timeline-scrollbar::-webkit-scrollbar {
    height: 8px; /* Height of horizontal scrollbar */
  }
  .timeline-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
   .dark .timeline-scrollbar::-webkit-scrollbar-track {
     background: #4b5563; /* gray-600 */
   }
  .timeline-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
   .dark .timeline-scrollbar::-webkit-scrollbar-thumb {
     background: #d1d5db; /* gray-300 */
   }
  .timeline-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
   .dark .timeline-scrollbar::-webkit-scrollbar-thumb:hover {
     background: #9ca3af; /* gray-400 */
  }

  /* Hide scrollbar by default and show on hover for container (alternative) */
  /* .timeline-container-class { scrollbar-width: none; } // Firefox */
  /* .timeline-container-class::-webkit-scrollbar { display: none; } // Chrome/Safari */
  /* .timeline-container-class:hover { scrollbar-width: auto; } // Firefox */
  /* .timeline-container-class:hover::-webkit-scrollbar { display: block; } // Chrome/Safari */

</style>
```

## `pages\index.astro`
```astro
---
import BaseLayout from '../layouts/Layout.astro';
import ContactLinks from '../components/react/ContactLinks.jsx'; // Import the React component
---
<BaseLayout>
	<section class="hero">
		<h1>Sulthan Zahran Ma'ruf</h1>
		<h2>Software Engineer, part of LG Sinarmas.</h2>
		<p>
			I'm Sulthan Zahran Ma'ruf, a logistics developer passionate about untangling complex operational puzzles. 
			My experience ranges from analyzing supply chain data to pinpoint factory bottlenecks (eliminating 4 major ones recently) 
			and developing custom applications for faster debugging and optimization, to designing and implementing data acquisition systems.
			I combine practical factory insights with strong analytical and technical skills to deliver measurable 
			improvements.
		</p>

		<div class="contact-links-wrapper">
			<ContactLinks client:visible />
		</div>

	</section>
</BaseLayout>

<style>
	.hero {
        padding-top: 2rem;
	}

	h1, h2 {
        text-align: center; 
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 1.2rem;
		font-weight: normal;
		color: #666;
		margin-top: 0;
        margin-bottom: 1.5rem;
	}
    body.dark h2 {
        color: #ccc;
    }

	p {
		line-height: 1.6;
        text-align: justify; /* Justify the paragraph text */
        max-width: 65ch;     
        margin-left: auto;   
        margin-right: auto;
        margin-bottom: 2rem; 
	}

    .contact-links-wrapper {
        text-align: center; 
    }

</style>
```

## `styles\global.css`
```css
@import "tailwindcss";
```


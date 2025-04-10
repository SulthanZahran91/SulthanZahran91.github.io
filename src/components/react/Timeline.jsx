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
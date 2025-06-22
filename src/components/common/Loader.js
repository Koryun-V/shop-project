import React from 'react';

const Loader = ({
                  height,
                  width,
                  count,
                  className,
                  iClassname,
                  iCount = 2,
                  iWidth,
                  iHeight
                }) => {
  const normalize = (val) =>
    typeof val === 'string' && !val.includes('px') && !val.includes('%')
      ? `${val}px`
      : val;

  const finalHeight = normalize(height);
  const finalWidth = normalize(width);
  const finalIHeight = normalize(iHeight);
  const finalIWidth = normalize(iWidth);

  return (
    <div className={`loader-wrapper ${className}`}>
      {Array.from({ length: parseInt(count) }).map((_, i) => (
        <div
          className="skeleton-block"
          key={i}
          style={{ height: finalHeight, width: finalWidth }}
        >
          <div className="skeleton-shimmer" />
          <div className={`loader-wrapper flex ${iClassname}`}>
            {Array.from({ length: iCount }).map((_, j) => (
              <div
                className="skeleton-block"
                key={j}
                style={{ height: finalIHeight, width: finalIWidth }}
              >
                <div className="skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;


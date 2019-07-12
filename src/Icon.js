import React from "react";

/**
 * Accessible icon component, loading icons from separate sprite.
 */
const Icon = ({ name, className }) => (
  <svg className={`icon icon--${name} ${className || ""}`} aria-hidden="true">
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;

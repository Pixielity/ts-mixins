'use strict';

/**
 * @pixielity/ts-mixins v1.0.0
 * 
 * Advanced TypeScript mixins package
 * 
 * @license MIT
 * @copyright 2025 Your Name <your.email@example.com>
 */


// src/utils/copy-props.util.ts
var copyProps = (dest, src, exclude = []) => {
  const props = Object.getOwnPropertyDescriptors(src);
  for (const prop of exclude) delete props[prop];
  Object.defineProperties(dest, props);
};

exports.copyProps = copyProps;
//# sourceMappingURL=copy-props.util.js.map
//# sourceMappingURL=copy-props.util.js.map
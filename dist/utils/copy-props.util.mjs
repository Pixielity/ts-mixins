// src/utils/copy-props.util.ts
var copyProps = (dest, src, exclude = []) => {
  const props = Object.getOwnPropertyDescriptors(src);
  for (const prop of exclude) delete props[prop];
  Object.defineProperties(dest, props);
};
if (typeof module !== "undefined") { module.exports = module.exports.default; }

export { copyProps };
//# sourceMappingURL=copy-props.util.mjs.map
//# sourceMappingURL=copy-props.util.mjs.map
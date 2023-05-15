const clamp = (val, min, max) => {
  return Math.max(Math.min(val, max), min);
}

export default clamp;

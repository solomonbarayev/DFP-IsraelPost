const getNestedObject = (obj: Record<string, any>, path: string) => {
  if (!path) return obj;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
  return current;
};

export default getNestedObject;
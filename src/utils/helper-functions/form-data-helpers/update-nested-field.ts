const updateNestedField = (formData: Record<string, any>, field: string, value: any) => {
  const data = JSON.parse(JSON.stringify(formData));
  const parts = field.split(".");
  let current: Record<string, any> = data;

  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {} as Record<string, any>;
    current = current[parts[i]] as Record<string, any>;
  }
  current[parts[parts.length - 1]] = value;
  return data;
};

export default updateNestedField;
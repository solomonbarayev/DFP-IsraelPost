interface Role {
  ADMIN: string;
  USER: string;
  FORM_USER: string;
}

// Core role constants - used internally for logic (English)
export const CORE_ROLES: Role = {
  ADMIN: "ADMIN",
  USER: "USER",
  FORM_USER: "FORM_USER",
};

// Default role translations (Hebrew) - for backward compatibility
// Will be deprecated once all components use role translation service
export const ROLES: Role = {
  ADMIN: "מנהל",
  USER: "נציג",
  FORM_USER: "משתמש",
};

// Default fallback translations
export const DEFAULT_ROLE_TRANSLATIONS: Role = {
  ADMIN: "מנהל",
  USER: "נציג",
  FORM_USER: "משתמש",
};

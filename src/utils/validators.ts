export const isFilledName = (v: string) => (v || '').trim().length > 1;
export const isRrn6 = (v: string) => /^\d{6}$/.test(v || '');
export const isRrn1 = (v: string) => /^\d{1}$/.test(v || '');
export const isPhone = (v: string) => /^01[016789]-?\d{3,4}-?\d{4}$/.test(v || '');

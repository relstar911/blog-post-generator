// Add shared utility functions here
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

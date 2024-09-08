import { formatDate, validateEmail } from '../src/utils/index';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = new Date('2023-10-01T00:00:00Z');
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('2023-10-01');
    });
  });

  describe('validateEmail', () => {
    it('should return true for a valid email', () => {
      const email = 'test@example.com';
      const isValid = validateEmail(email);
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid email', () => {
      const email = 'invalid-email';
      const isValid = validateEmail(email);
      expect(isValid).toBe(false);
    });
  });
});
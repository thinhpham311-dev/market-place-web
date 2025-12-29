import { isValidNumber, CountryCode } from "libphonenumber-js";

/**
 * Validates a phone number for a specific country.
 *
 * @param value - The phone number to validate.
 * @param country - The country code (ISO 3166-1 alpha-2) to validate against.
 * @returns A boolean indicating whether the phone number is valid.
 */
export const isValidPhoneNumber = (value: string, country?: CountryCode): boolean => {
  try {
    return isValidNumber(value, country);
  } catch {
    return false; // Return false if validation fails
  }
};

export const PropertiesValidate = <T>(
  items: T[],
  validateFn: (item: T, index: number) => string | null,
): string[] => {
  const errors: string[] = [];

  items.forEach((item, index) => {
    const error = validateFn(item, index);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
};

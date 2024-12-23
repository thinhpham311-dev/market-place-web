
import { isValidNumber, CountryCode } from 'libphonenumber-js';

/**
 * Validates a phone number for a specific country.
 *
 * @param value - The phone number to validate.
 * @param country - The country code (ISO 3166-1 alpha-2) to validate against.
 * @returns A boolean indicating whether the phone number is valid.
 */
export function isValidPhoneNumber(value: string, country?: CountryCode): boolean {
    try {
        return isValidNumber(value, country);
    } catch {
        return false; // Return false if validation fails
    }
}
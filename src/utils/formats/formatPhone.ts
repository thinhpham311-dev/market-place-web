import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

interface IFormatPhone {
    phone: string;
    country?: CountryCode; // Mặc định là 'VN'
}

const formatPhone = ({ phone, country = 'VN' }: IFormatPhone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, country);
    if (!phoneNumber) return phone; // Không hợp lệ
    return phoneNumber.formatInternational(); // Ví dụ: +84 90 123 4567
}

export {
    formatPhone
}
export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
}

export const countries: Country[] = [
  { code: "US", name: "United States", phoneCode: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", phoneCode: "+1", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44", flag: "🇬🇧" },
  { code: "FR", name: "France", phoneCode: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", phoneCode: "+49", flag: "🇩🇪" },
  { code: "IT", name: "Italy", phoneCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", phoneCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", phoneCode: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", phoneCode: "+32", flag: "🇧🇪" },
  { code: "AT", name: "Austria", phoneCode: "+43", flag: "🇦🇹" },
  { code: "CH", name: "Switzerland", phoneCode: "+41", flag: "🇨🇭" },
  { code: "AU", name: "Australia", phoneCode: "+61", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", phoneCode: "+64", flag: "🇳🇿" },
  { code: "JP", name: "Japan", phoneCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", phoneCode: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", phoneCode: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", phoneCode: "+91", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", phoneCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", phoneCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", phoneCode: "+54", flag: "🇦🇷" },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code);
};

export const validatePhoneNumber = (
  phone: string,
  countryCode: string,
): boolean => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "");

  // Basic validation - should have 7-15 digits
  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  // Country-specific validation
  switch (countryCode) {
    case "US":
    case "CA":
      return digits.length === 10; // US/Canada phone numbers
    case "GB":
      return digits.length >= 10 && digits.length <= 11;
    case "FR":
      return digits.length === 10;
    case "DE":
      return digits.length >= 10 && digits.length <= 12;
    case "AU":
      return digits.length === 9;
    default:
      return digits.length >= 7 && digits.length <= 15;
  }
};

export const formatPhoneNumber = (
  phone: string,
  countryCode: string,
): string => {
  const digits = phone.replace(/\D/g, "");

  switch (countryCode) {
    case "US":
    case "CA":
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      break;
    case "GB":
      if (digits.length === 11) {
        return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
      }
      break;
    case "FR":
      if (digits.length === 10) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
      }
      break;
  }

  return phone; // Return original if no specific formatting
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, "");

  // Check if it's the right length
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateExpiryDate = (expiry: string): boolean => {
  const cleaned = expiry.replace(/\D/g, "");

  if (cleaned.length !== 4) {
    return false;
  }

  const month = parseInt(cleaned.slice(0, 2), 10);
  const year = parseInt(cleaned.slice(2), 10);

  if (month < 1 || month > 12) {
    return false;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

export const validateCVV = (cvv: string): boolean => {
  const cleaned = cvv.replace(/\D/g, "");
  return cleaned.length >= 3 && cleaned.length <= 4;
};

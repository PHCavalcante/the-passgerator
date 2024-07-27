type PasswordStrength =
  | "Very weak"
  | "weak"
  | "Average"
  | "Strong"
  | "Very strong";

type TimeToCrack =
  | "Instantly"
  | "1 second"
  | "Seconds"
  | "1 minute"
  | "Minutes"
  | "1 hour"
  | "Hours"
  | "Days"
  | "Weeks"
  | "1 month"
  | "Months"
  | "1 year"
  | "Years"
  | "Centuries"
  | "Millennia"
  | "million"
  | "Millions"
  | "∞";
export function checkPasswordStrength(
  password: string
): [PasswordStrength, TimeToCrack] {
  const length = password.length;

  const hasNumbers = /\d/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthMatrix: { [key: string]: [PasswordStrength, TimeToCrack] } = {
    "4-Numbers Only": ["Very weak", "Instantly"],
    "4-Symbols Only": ["Very weak", "Instantly"],
    "4-Upper Letters": ["Very weak", "Instantly"],
    "4-Upper, Symbols": ["Very weak", "Instantly"],
    "4-Numbers, Upper Letters": ["Very weak", "Instantly"],
    "4-Numbers, Symbols": ["Very weak", "Instantly"],
    "4-Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "4-Numbers, Lowercase Letters": ["Very weak", "Instantly"],
    "4-Upper and Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "4-Numbers, Upper Letters, Symbols": ["Very weak", "Instantly"],
    "4-Numbers, Lowercase Letters, Symbols": ["Very weak", "Instantly"],

    "5-Symbols Only": ["Very weak", "Instantly"],
    "5-Upper Letters": ["Very weak", "Instantly"],
    "5-Upper, Symbols": ["Very weak", "Instantly"],
    "5-Numbers, Upper Letters": ["Very weak", "Instantly"],
    "5-Numbers, Symbols": ["Very weak", "Instantly"],
    "5-Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "5-Numbers, Lowercase Letters": ["Very weak", "Instantly"],
    "5-Upper and Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "5-Numbers, Upper Letters, Symbols": ["Very weak", "Instantly"],
    "5-Numbers, Lowercase Letters, Symbols": ["Very weak", "Instantly"],

    "6-Symbols Only": ["Very weak", "Instantly"],
    "6-Upper Letters": ["Very weak", "Instantly"],
    "6-Upper, Symbols": ["Very weak", "Instantly"],
    "6-Numbers, Upper Letters": ["Very weak", "Instantly"],
    "6-Numbers, Symbols": ["Very weak", "Instantly"],
    "6-Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "6-Numbers, Lowercase Letters": ["Very weak", "Instantly"],
    "6-Upper and Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "6-Numbers, Upper Letters, Symbols": ["Very weak", "Instantly"],
    "6-Numbers, Lowercase Letters, Symbols": ["Very weak", "Instantly"],

    "7-Symbols Only": ["Very weak", "Instantly"],
    "7-Upper Letters": ["Very weak", "Instantly"],
    "7-Upper, Symbols": ["Very weak", "Seconds"],
    "7-Numbers, Upper Letters": ["Very weak", "Seconds"],
    "7-Numbers, Symbols": ["Very weak", "Seconds"],
    "7-Lowercase Letters, Symbols": ["Very weak", "Seconds"],
    "7-Numbers, Lowercase Letters": ["Very weak", "Seconds"],
    "7-Upper and Lowercase Letters, Symbols": ["Very weak", "Seconds"],
    "7-Numbers, Upper Letters, Symbols": ["Very weak", "Seconds"],
    "7-Numbers, Lowercase Letters, Symbols": ["Very weak", "Seconds"],

    "8-Upper, Symbols": ["Very weak", "Seconds"],

    "5-Numbers Only": ["Very weak", "Instantly"],
    "6-Numbers Only": ["Very weak", "Instantly"],
    "7-Numbers Only": ["Very weak", "Instantly"],
    "8-Numbers Only": ["Very weak", "Instantly"],
    "9-Numbers Only": ["Very weak", "Instantly"],
    "10-Numbers Only": ["Very weak", "Instantly"],
    "11-Numbers Only": ["Very weak", "Instantly"],
    "12-Numbers Only": ["Very weak", "1 second"],
    "13-Numbers Only": ["Very weak", "Seconds"],
    "14-Numbers Only": ["Very weak", "Seconds"],
    "15-Numbers Only": ["Very weak", "Minutes"],
    "16-Numbers Only": ["weak", "Hours"],
    "17-Numbers Only": ["weak", "Hours"],
    "18-Numbers Only": ["Average", "Days"],
    "19-Numbers Only": ["Average", "Days"],
    "20-Numbers Only": ["Strong", "Days"],

    "4-Lowercase Letters": ["Very weak", "Instantly"],
    "5-Lowercase Letters": ["Very weak", "Instantly"],
    "6-Lowercase Letters": ["Very weak", "Instantly"],
    "7-Lowercase Letters": ["Very weak", "Instantly"],
    "8-Lowercase Letters": ["Very weak", "Instantly"],
    "9-Lowercase Letters": ["Very weak", "Seconds"],
    "10-Lowercase Letters": ["Very weak", "Minutes"],
    "11-Lowercase Letters": ["Very weak", "Minutes"],
    "12-Lowercase Letters": ["weak", "Hours"],
    "13-Lowercase Letters": ["weak", "Weeks"],
    "14-Lowercase Letters": ["weak", "1 year"],
    "15-Lowercase Letters": ["Average", "Years"],
    "16-Lowercase Letters": ["Average", "Centuries"],
    "17-Lowercase Letters": ["Average", "Millennia"],
    "18-Lowercase Letters": ["Average", "Millennia"],

    "4-Upper and Lowercase Letters": ["Very weak", "Instantly"],
    "5-Upper and Lowercase Letters": ["Very weak", "Instantly"],
    "6-Upper and Lowercase Letters": ["Very weak", "Instantly"],
    "7-Upper and Lowercase Letters": ["Very weak", "1 second"],
    "8-Upper and Lowercase Letters": ["Very weak", "Seconds"],
    "9-Upper and Lowercase Letters": ["weak", "Minutes"],
    "10-Upper and Lowercase Letters": ["Average", "Hours"],
    "11-Upper and Lowercase Letters": ["Average", "1 month"],
    "12-Upper and Lowercase Letters": ["Average", "Years"],
    "13-Upper and Lowercase Letters": ["Strong", "Centuries"],
    "14-Upper and Lowercase Letters": ["Strong", "Millennia"],
    "15-Upper and Lowercase Letters": ["Strong", "Millennia"],
    "16-Upper and Lowercase Letters": ["Very strong", "Millions"],
    "17-Upper and Lowercase Letters": ["Very strong", "∞"],
    "18-Upper and Lowercase Letters": ["Very strong", "∞"],

    "4-Numbers, Upper and Lowercase Letters": ["Very weak", "Instantly"],
    "5-Numbers, Upper and Lowercase Letters": ["Very weak", "Instantly"],
    "6-Numbers, Upper and Lowercase Letters": ["Very weak", "Instantly"],
    "7-Numbers, Upper and Lowercase Letters": ["Very weak", "Seconds"],
    "8-Numbers, Upper and Lowercase Letters": ["weak", "Minutes"],
    "9-Numbers, Upper and Lowercase Letters": ["Average", "Hours"],
    "10-Numbers, Upper and Lowercase Letters": ["Average", "Days"],
    "11-Numbers, Upper and Lowercase Letters": ["Strong", "Months"],
    "12-Numbers, Upper and Lowercase Letters": ["Strong", "Years"],
    "13-Numbers, Upper and Lowercase Letters": ["Strong", "Millennia"],
    "14-Numbers, Upper and Lowercase Letters": ["Very strong", "Millennia"],
    "15-Numbers, Upper and Lowercase Letters": ["Very strong", "Millions"],
    "16-Numbers, Upper and Lowercase Letters": ["Very strong", "Millions"],
    "17-Numbers, Upper and Lowercase Letters": ["Very strong", "∞"],
    "18-Numbers, Upper and Lowercase Letters": ["Very strong", "∞"],

    "4-Numbers, Upper and Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "5-Numbers, Upper and Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "6-Numbers, Upper and Lowercase Letters, Symbols": ["Very weak", "Instantly"],
    "7-Numbers, Upper and Lowercase Letters, Symbols": ["Very weak", "Seconds"],
    "8-Numbers, Upper and Lowercase Letters, Symbols": ["Average", "Minutes"],
    "9-Numbers, Upper and Lowercase Letters, Symbols": ["Average", "Hours"],
    "10-Numbers, Upper and Lowercase Letters, Symbols": ["Strong", "Weeks"],
    "11-Numbers, Upper and Lowercase Letters, Symbols": ["Strong", "Years"],
    "12-Numbers, Upper and Lowercase Letters, Symbols": ["Strong", "Years"],
    "13-Numbers, Upper and Lowercase Letters, Symbols": ["Very strong","Millennia"],
    "14-Numbers, Upper and Lowercase Letters, Symbols": ["Very strong","million"],
    "15-Numbers, Upper and Lowercase Letters, Symbols": ["Very strong","Millions"],
    "16-Numbers, Upper and Lowercase Letters, Symbols": ["Very strong", "∞"],
    "17-Numbers, Upper and Lowercase Letters, Symbols": ["Very strong", "∞"],
    "18-Numbers, Upper and Lowercase Letters, Symbols": ["Very strong", "∞"],
  };

  let key = `${length}-`;
  if (hasNumbers && !hasLowercase && !hasUppercase && !hasSymbols) {
    key += "Numbers Only";
  } else if (!hasNumbers && hasLowercase && !hasUppercase && !hasSymbols) {
    key += "Lowercase Letters";
  } else if (!hasNumbers && !hasLowercase && hasUppercase && !hasSymbols) {
    key += "Upper Letters";
  } else if (!hasNumbers && !hasLowercase && !hasUppercase && hasSymbols) {
    key += "Symbols Only";
  } else if (hasNumbers && !hasLowercase && !hasUppercase && hasSymbols) {
    key += "Numbers, Symbols";
  } else if (!hasNumbers && hasLowercase && !hasUppercase && hasSymbols) {
    key += "Lowercase Letters, Symbols";
  } else if (hasNumbers && !hasLowercase && hasUppercase && !hasSymbols) {
    key += "Numbers, Upper Letters";
  } else if (!hasNumbers && !hasLowercase && hasUppercase && hasSymbols) {
    key += "Upper, Symbols";
  } else if (!hasNumbers && hasLowercase && hasUppercase && !hasSymbols) {
    key += "Upper and Lowercase Letters";
  } else if (hasNumbers && hasLowercase && !hasUppercase && !hasSymbols) {
    key += "Numbers, Lowercase Letters";
  } else if (hasNumbers && hasLowercase && hasUppercase && !hasSymbols) {
    key += "Numbers, Upper and Lowercase Letters";
  } else if (hasNumbers && hasLowercase && hasUppercase && hasSymbols) {
    key += "Numbers, Upper and Lowercase Letters, Symbols";
  } else if (!hasNumbers && hasLowercase && hasUppercase && hasSymbols) {
    key += "Upper and Lowercase Letters, Symbols";
  } else if (hasNumbers && !hasLowercase && hasUppercase && hasSymbols) {
    key += "Numbers, Upper Letters, Symbols";
  } else if (hasNumbers && hasLowercase && !hasUppercase && hasSymbols) {
    key += "Numbers, Lowercase Letters, Symbols";
  }
  return (
    strengthMatrix[key] || ["Very strong", "∞"]
  );
}
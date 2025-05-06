
interface CurrencyConfig {
  symbol: string;
  code: string;
  position: 'before' | 'after';
  decimals: number;
  thousandsSeparator: string;
  decimalSeparator: string;
}

// Default users for testing
export const defaultUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'Actif',
    lastLogin: new Date().toISOString().split('T')[0]
  },
  {
    id: 2,
    name: 'Freelance User',
    email: 'freelance@example.com',
    role: 'Utilisateur',
    status: 'Actif',
    type: 'Freelance',
    siret: '12345678901234',
    lastLogin: new Date().toISOString().split('T')[0]
  }
];

// Currency configurations based on locale
const currencyConfigs: Record<string, CurrencyConfig> = {
  'fr-FR': {
    symbol: '€',
    code: 'EUR',
    position: 'after',
    decimals: 2,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  'en-US': {
    symbol: '$',
    code: 'USD',
    position: 'before',
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  'en-GB': {
    symbol: '£',
    code: 'GBP',
    position: 'before',
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
};

// Get user's locale or default to fr-FR
export const getUserLocale = (): string => {
  try {
    return navigator.language || 'fr-FR';
  } catch (e) {
    return 'fr-FR';
  }
};

// Get the currency configuration for the current locale
export const getCurrencyConfig = (): CurrencyConfig => {
  const locale = getUserLocale();
  const config = currencyConfigs[locale] || currencyConfigs['fr-FR'];
  return config;
};

// Format a number as currency based on the user's locale
export const formatCurrency = (value: number): string => {
  const config = getCurrencyConfig();
  
  // Format the number with the appropriate decimal and thousands separators
  let formattedValue = value.toFixed(config.decimals);
  let [intPart, decimalPart] = formattedValue.split('.');
  
  // Add thousands separator
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
  
  // Combine parts with the appropriate decimal separator
  formattedValue = decimalPart 
    ? `${intPart}${config.decimalSeparator}${decimalPart}`
    : intPart;
  
  // Add the symbol in the appropriate position
  if (config.position === 'before') {
    return `${config.symbol}${formattedValue}`;
  } else {
    return `${formattedValue} ${config.symbol}`;
  }
};

// Get the currency symbol only
export const getCurrencySymbol = (): string => {
  return getCurrencyConfig().symbol;
};

// Get the currency code (EUR, USD, etc.)
export const getCurrencyCode = (): string => {
  return getCurrencyConfig().code;
};

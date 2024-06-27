export interface Phone {
  countryCode: string;
  number: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: Phone;
}

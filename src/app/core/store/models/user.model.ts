interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

interface Name {
  firstname: string;
  lastname: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

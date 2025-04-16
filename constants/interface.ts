export interface Driver {
  id: string;
  name: string;
  image: string;
  carImage: string;
  carModel: string;
  license: string;
  color: string;
  distance: string;
  rating: number;
  trips: number;
  location: { latitude: number; longitude: number };
  address: string;
  experience: string;
  acceptance: string;
  languages: string[];
  music: string[];
  reviews: { name: string; comment: string; stars: number; time: string }[];
}

export interface Ride {
  id: string;
  type: string;
  price: string;
  eta: string;
}

export interface Review {
  name: string;
  comment: string;
  stars: number;
  time: string;
}

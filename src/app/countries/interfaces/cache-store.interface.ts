import { Country } from "./country.interface";
import { Region } from "./region.type";


export interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region?: Region; // opcional por que en la 1° carga siempre necesitaria tener data
  countries: Country[];
}
import { Country } from "./pais.interface";
import { Region } from "./region-type";


export interface cacheStore {
  byCapital: TermCountris;
  byCountries: TermCountris;
  byRegion: RegionCountries
}

export interface TermCountris {
    term: string;
    countries: Country[];
}

export interface RegionCountries {
  region?: Region;
  countries: Country[];
}
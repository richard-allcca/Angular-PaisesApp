export interface RegionData {
   alpha2Code: string;
   alpha3Code: string;
   altSpellings: string[];
   area?: number;
   borders?: string[];
   callingCodes: string[];
   capital: string;
   cioc?: string;
   currencies: Currency[];
   demonym: string;
   flag: string;
   flags: Flags;
   gini?: number;
   independent: boolean;
   languages: Language[];
   latlng: number[];
   name: string;
   nativeName: string;
   numericCode: string;
   population: number;
   region: Region;
   regionalBlocs: RegionalBloc[];
   subregion: string;
   timezones: string[];
   topLevelDomain: string[];
   translations: Translations;
}

export interface Currency {
   code: string;
   name: string;
   symbol: string;
}

export interface Flags {
   png: string;
   svg: string;
}

export interface Language {
   iso639_1: string;
   iso639_2: string;
   name: string;
   nativeName: string;
}

export enum Region {
   Americas = "Americas",
   Europe = "Europe",
}

export interface RegionalBloc {
   acronym: Acronym;
   name: Name;
   otherAcronyms?: string[];
   otherNames?: string[];
}

export enum Acronym {
   Eu = "EU",
   Usan = "USAN",
}

export enum Name {
   EuropeanUnion = "European Union",
   UnionOfSouthAmericanNations = "Union of South American Nations",
}

export interface Translations {
   br: string;
   de: string;
   es: string;
   fa: string;
   fr: string;
   hr: string;
   hu: string;
   it: string;
   ja: string;
   nl: string;
   pt: string;
}

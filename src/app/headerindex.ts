export interface Headerindex {
  numberIndex: number;
  dateIndex: number;
  geohashIndex: number;
}

export interface ViewData {
  phone: string;
  inDateTime: string;
  geohash: string;
}

export interface StayTime {
  start: string;
  end: string;
}

export interface PhoneGeoHash {
  phone: string;
  geohash: string;
  inDateTime: string;
}

export interface PhoneGeoHashDateTimeCounts {
  phone: string;
  geohash: string;
  dateTimes: StayTime[];
  sumDateTimes: number;
}

export const  GET_CURRENT: number = 1;
export const  GET_PREVIOS: number = 2;

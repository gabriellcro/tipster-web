export type League = {
  id: number;
  name: string;
  logo: string;
  country: string;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
  leagues: League[];
};

export type LeaguesData = Record<string, Country>;

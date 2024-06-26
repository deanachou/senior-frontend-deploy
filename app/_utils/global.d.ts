export interface PinData {
  pin: Pin[];
}

export interface HintData {
  hints: Hint[];
}

export interface Pin {
  poi_id: number;
  is_completed?: boolean;
  title: string;
  description: string;
  img_url: string;
  exact_latitude: number;
  exact_longitude: number;
  search_latitude: number;
  search_longitude: number;
  search_radius: number;
  // is_main_attraction: boolean;
  tags: string[];
}

export interface Hint {
  poi_id: number;
  hint_id: number;
  user_id: number;
  content: string;
}

export interface MarkerContainerProps {
  pin: Pin;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPoiId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface User {
  email: string;
  creatingEmail: string;
  password: string;
  creatingPassword: string;
  displayName: string;
}

export interface Account {
  username: string,
  totalXp: number,
  level: number,
  xpToNextLevel: number
}

export interface Leaderboards {
  username: string;
  score: number;
}

export interface levelAndXp {
  level: number;
  totalXp: number;
  xpToNextLevel: number;
}

export interface trackingPinID {
  poi_id: number;
}

export type PokemonType =
  | 'Normal' | 'Feuer' | 'Wasser' | 'Pflanze' | 'Elektro' | 'Eis'
  | 'Kampf'  | 'Gift'  | 'Boden'  | 'Flug'    | 'Psycho'  | 'Käfer'
  | 'Gestein'| 'Geist' | 'Drache' | 'Unlicht' | 'Stahl'   | 'Fee';  //hilfe von chat gpt

export interface Pokemon {
  name: string;
  level: number;      // 1–100
  type1: PokemonType; // Pflicht
  type2?: PokemonType;// optional
  attacks: string[];  // z. B. ["Donnerblitz","Ruckzuckhieb"]
}

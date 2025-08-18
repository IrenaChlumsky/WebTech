export type PokemonType =
  | 'Normal' | 'Feuer' | 'Wasser' | 'Pflanze' | 'Elektro' | 'Eis'
  | 'Kampf'  | 'Gift'  | 'Boden'  | 'Flug'    | 'Psycho'  | 'Käfer'
  | 'Gestein'| 'Geist' | 'Drache' | 'Unlicht' | 'Stahl'   | 'Fee';  

export interface Pokemon {
  _id?: string;
  name: string;
  level: number;     
  type1: PokemonType; 
  type2?: PokemonType;
  attacks: string[]; 
}

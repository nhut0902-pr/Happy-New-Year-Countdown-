
export interface Wish {
  id: string;
  text: string;
  left: number;
  duration: number;
  delay: number;
  fontSize: number;
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  sx: number;
  sy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

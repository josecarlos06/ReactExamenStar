export const abecedarioUIColores = {
  A: "#E74C3C",
  B: "#6A1D9D",
  C: "#2E8B57",
  D: "#F39C12",
  E: "#D84C2C",
  F: "#1F6B46",
  G: "#7A1A1A",
  H: "#E67E22",
  I: "#7A3F9D",
  J: "#8EBC46",
  K: "#9B2222",
  L: "#17A899",
  M: "#C68E17",
  Ñ: "#C68E17",
  N: "#C72C3C",
  O: "#28B463",
  P: "#E91E63",
  Q: "#9B4D6A",
  R: "#F39C12",
  S: "#8B4513",
  T: "#D2D07A",
  U: "#A3B8D6",
  V: "#6A1D9D",
  W: "#68B830",
  X: "#D84C2C",
  Y: "#E74C3C",
  Z: "#D500F9",
};

export const cleanInput = (e: React.FormEvent<HTMLInputElement>) => {
  const { value } = e.currentTarget;
  const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$/;
  if (!regex.test(value)) {
    e.currentTarget.value = value.replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]/g, "");
  }
};

/* 
export const cleanInput = (e: React.FormEvent<HTMLInputElement>) => {
  const { value } = e.currentTarget;
  let cleanedValue = "";
  let lastChar = "";
  let repeatCount = 0;

  for (const char of value) {
    if (
      /[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]/.test(char) 
    ) {
      if (char === lastChar) {
        repeatCount++;
      } else {
        repeatCount = 1; 
      }
      if (repeatCount <= 2) {
        cleanedValue += char;
      }

      lastChar = char; 
    }
  }

  e.currentTarget.value = cleanedValue;
}; */
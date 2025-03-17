export const abecedarioUIColores = {
  A: "#E74C3C", // Tomate moderado
  B: "#6A1D9D", // Azul Violeta moderado
  C: "#2E8B57", // Verde Medio oscuro
  D: "#F39C12", // Amarillo Oro suave
  E: "#D84C2C", // Naranja Rojo suave
  F: "#1F6B46", // Verde Mar moderado
  G: "#7A1A1A", // Rojo Oscuro moderado
  H: "#E67E22", // Naranja Oscuro suave
  I: "#7A3F9D", // Púrpura Oscuro suave
  J: "#8EBC46", // Verde Amarillo moderado
  K: "#9B2222", // Rojo Fuego atenuado
  L: "#17A899", // Verde Aqua oscuro
  M: "#C68E17", // Oro suave
  N: "#C72C3C", // Rojo Carmesí moderado
  O: "#28B463", // Verde Lima oscuro
  P: "#E91E63", // Rosa Profundo suave
  Q: "#9B4D6A", // Rosa Púrpura atenuado
  R: "#F39C12", // Amarillo Oro suave
  S: "#8B4513", // Chocolate moderado
  T: "#D2D07A", // Amarillo Claro suave
  U: "#A3B8D6", // Azul Claro Acero suave
  V: "#6A1D9D", // Azul Violeta moderado
  W: "#68B830", // Verde Lima oscuro
  X: "#D84C2C", // Naranja Rojo suave
  Y: "#E74C3C", // Tomate moderado
  Z: "#D500F9", // Fucsia suave
};

export const cleanInput = (e: React.FormEvent<HTMLInputElement>) => {
  const { value } = e.currentTarget;
  const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$/;
  if (!regex.test(value)) {
    e.currentTarget.value = value.replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]/g, "");
  }
};
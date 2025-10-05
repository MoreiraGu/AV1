export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarTelefone(telefone: string): boolean {
  const regex = /^\d{10,11}$/;
  return regex.test(telefone.replace(/\D/g, ""));
}

export function validarData(data: string): boolean {
  return !isNaN(Date.parse(data));
}

export function validarNumero(valor: number): boolean {
  return typeof valor === "number" && !isNaN(valor) && valor >= 0;
}
function calculateWeightedSum(digits: string[], startWeight: number): number {
  return digits.reduce(
    (acc, currValue, i) => acc + Number(currValue) * (startWeight - i),
    0
  );
}

function getDigits(cpf: string, count: number): string[] {
  return Array.from(cpf).slice(0, count);
}

function calculateVerificationDigit(sum: number): number {
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function hasRepeatedDigits(cpf: string): boolean {
  return /^(\d)\1{10}$/.test(cpf);
}

function isValidCPF(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, "");

  if (cleanCpf.length !== 11) {
    return false;
  }

  if (hasRepeatedDigits(cleanCpf)) {
    return false;
  }

  // Calcula primeiro dígito verificador
  const firstDigitSum = calculateWeightedSum(getDigits(cleanCpf, 9), 10);
  const firstVerificationDigit = calculateVerificationDigit(firstDigitSum);

  // Calcula segundo dígito verificador
  const secondDigitSum = calculateWeightedSum(getDigits(cleanCpf, 10), 11);
  const secondVerificationDigit = calculateVerificationDigit(secondDigitSum);

  // Compara dígitos calculados com os informados
  const calculatedDigits = `${firstVerificationDigit}${secondVerificationDigit}`;
  const providedDigits = cleanCpf.slice(-2);

  return calculatedDigits === providedDigits;
}

export default isValidCPF;
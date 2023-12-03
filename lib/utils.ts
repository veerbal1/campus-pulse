import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidQRCode(qrCode: string) {
  // Regular expression for the QR code format "event://UUID"
  const qrCodeRegex =
    /^event:\/\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  // Test the QR code against the regular expression
  return qrCodeRegex.test(qrCode);
}

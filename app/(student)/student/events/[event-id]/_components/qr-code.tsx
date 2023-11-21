'use client';
import { useQRCode } from 'next-qrcode';

function QRCode({ qrCode }: { qrCode: string }) {
  const { Canvas } = useQRCode();
  console.log('QR CODE', qrCode);
  return (
    <div className="qr mx-auto h-56 w-56 rounded-lg">
      <Canvas
        text={qrCode}
        options={{
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 224,
          color: {
            dark: '#010599FF',
            light: '#FFBF60FF',
          },
        }}
      />
    </div>
  );
}

export default QRCode;

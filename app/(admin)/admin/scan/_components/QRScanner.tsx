'use client';
import { isValidQRCode } from '@/lib/utils';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import VerifingQR from './verifying-qr-animation';
function QRScanner() {
  const [state, setState] = useState({
    message: '',
    pending: false,
  });

  const verify = (qr: string) => {
    if (!isValidQRCode(qr)) {
      alert('QR Invalid');
      return;
    }
    setState((ps) => ({ ...ps, pending: true }));
    if (!state.pending) {
      fetch('/api/verify-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'qr-text': qr,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            toast.success(data.message);
          } else if (data.status === 'failed') {
            toast.error(data.message);
          }
          setState((ps) => ({ ...ps, pending: false }));
        });
    }
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
        Verify QR Codes
      </h3>
      {state.pending && <VerifingQR />}
      <div className="md:hidden">
        <QrScanner
          stopDecoding={state.pending}
          onDecode={(result) => {
            verify(result);
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>

      <div className="hidden md:block">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Use mobile device for QR scanning
        </h4>
      </div>
    </div>
  );
}

export default QRScanner;

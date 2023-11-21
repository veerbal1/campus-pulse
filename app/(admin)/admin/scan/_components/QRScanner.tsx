'use client';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
function QRScanner() {
  const [state, setState] = useState({
    message: '',
    pending: false,
  });

  const verify = (qr: string) => {
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
          alert('Verified');
          setState((ps) => ({ ...ps, pending: false }));
        });
    }
  };
  return (
    <div className="flex flex-col justify-center w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Verify QR Codes
      </h3>
      {state.pending && 'Pending'}
      {window.screen.width < 768 ? (
        <div className="md:hidden">
          <QrScanner
            stopDecoding={state.pending}
            onDecode={(result) => {
              verify(result);
            }}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      ) : null}

      <div className="hidden md:block">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Use mobile device for QR scanning
        </h4>
      </div>
    </div>
  );
}

export default QRScanner;

"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf6f2] px-6 font-sans text-[#3c3633]">
        <h1 className="text-xl font-semibold">Algo salió mal</h1>
        <p className="max-w-md text-center text-sm opacity-90">
          Volvé a intentar o recargá la página. Si el problema continúa, contactá al equipo de tu
          clínica o a soporte.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-[#592A19] px-4 py-2 text-sm font-medium text-white"
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}

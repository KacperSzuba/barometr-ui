"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * The form, and the second question a correct password sometimes gets.
 *
 * Two steps in one component because they are one act: the challenge that comes back
 * from the first is the only thing the second needs, and it is not usable for anything
 * else. Neither step ever sees a token — both post to a route handler, which turns the
 * answer into cookies this page cannot read.
 */
export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

interface Challenge {
  challengeId: string;
  expiresIn: number;
}

function SignInForm() {
  const router = useRouter();
  const destination = useSearchParams().get("cel") ?? "/konto";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const [path, payload] = challenge
      ? ["/api/auth/2fa", { challengeId: challenge.challengeId, code, rememberDevice }]
      : ["/api/auth/login", { email, password }];

    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const answer = await response.json();

      if (!response.ok) {
        setError(answer.error ?? "Nie udało się zalogować.");
        return;
      }

      if (answer.status === "two-factor") {
        setChallenge(answer as Challenge);
        return;
      }

      // `refresh` and not just `push`: the cookies were set by the response that has
      // only just arrived, so the server has to be asked again with them in hand.
      router.replace(destination);
      router.refresh();
    } catch {
      setError("Serwis nie odpowiada.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[420px] flex-col justify-center px-6">
      <div className="mb-7">
        <div className="mb-2 text-[9px] tracking-[.16em] text-ink/55">BAROMETR</div>
        <h1 className="text-[27px] leading-[1.15] font-medium">
          {challenge ? "Drugi składnik" : "Zaloguj się"}
        </h1>
        {challenge && (
          <p className="mt-2 text-[12px] leading-[1.5] text-ink/60">
            Wpisz kod z aplikacji uwierzytelniającej albo jeden z kodów zapasowych.
          </p>
        )}
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3">
        {challenge ? (
          <>
            <Field
              label="Kod"
              value={code}
              onChange={setCode}
              type="text"
              autoComplete="one-time-code"
            />
            <label className="flex items-center gap-2 text-[11px] text-ink/60">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(event) => setRememberDevice(event.target.checked)}
              />
              Nie pytaj na tym urządzeniu przez 30 dni
            </label>
          </>
        ) : (
          <>
            <Field
              label="Adres e-mail"
              value={email}
              onChange={setEmail}
              type="email"
              autoComplete="username"
            />
            <Field
              label="Hasło"
              value={password}
              onChange={setPassword}
              type="password"
              autoComplete="current-password"
            />
          </>
        )}

        {error && (
          <div role="alert" className="text-[11.5px] leading-[1.5] text-accent-soft">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 border border-white/15 bg-white/[.06] px-4 py-2.5 text-[11px] tracking-[.13em] disabled:opacity-50"
        >
          {busy ? "…" : challenge ? "POTWIERDŹ" : "ZALOGUJ"}
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
  autoComplete: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[9px] tracking-[.13em] text-ink/55">{label.toUpperCase()}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="border border-white/12 bg-white/[.04] px-3 py-2 text-[12.5px] outline-none focus:border-white/30"
      />
    </label>
  );
}

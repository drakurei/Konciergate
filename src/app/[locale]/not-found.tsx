import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <Logo framed tone="light" className="mb-10 h-16 w-16" />
      <p className="text-eyebrow mb-4">Erreur 404</p>
      <h1 className="text-3xl font-light tracking-tight md:text-5xl">
        Cette page n&apos;existe pas.
      </h1>
      <p className="mt-4 max-w-md text-white/60">
        La page que vous recherchez a peut-être été déplacée ou n&apos;est plus disponible.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 items-center rounded-full border border-white/35 px-7 text-sm text-white transition-colors hover:bg-white hover:text-ink"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}

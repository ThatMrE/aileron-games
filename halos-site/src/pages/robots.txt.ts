// The preview disallows all crawling. HALOS_INDEX=1 (SEO audit builds only)
// allows it, matching the noindex switch in Base.astro.
export function GET() {
  const indexable = process.env.HALOS_INDEX === '1';
  return new Response(`User-agent: *\n${indexable ? 'Allow' : 'Disallow'}: /\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

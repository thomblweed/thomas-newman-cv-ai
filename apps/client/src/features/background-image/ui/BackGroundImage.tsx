export const BackgroundImage = () => (
  <picture className="fixed -z-10 inset-0 mix-blend-soft-light overflow-hidden">
    <source media="(min-width: 2400px)" srcSet="/images/space-city-2400.webp" />
    <source media="(min-width: 1920px)" srcSet="/images/space-city-1920.webp" />
    <source media="(min-width: 1280px)" srcSet="/images/space-city-1440.webp" />
    <source media="(min-width: 500px)" srcSet="/images/space-city-960.webp" />
    <img
      src="/images/space-city-480.webp"
      alt="space city"
      className="object-cover min-w-full min-h-full"
    />
  </picture>
);

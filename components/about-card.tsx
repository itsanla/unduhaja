interface AboutCardProps {
  title: string;
  subTitle: string;
  description: string;
}

export default function AboutCard({
  title,
  description,
  subTitle,
}: AboutCardProps) {
  return (
    <div className="rounded-2xl bg-gray-900 shadow-none">
      <div className="flex h-[453px] flex-col items-center justify-center rounded-2xl p-5">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-white/80">
          {subTitle}
        </p>
        <h4 className="text-center text-2xl font-bold text-white">
          {title}
        </h4>
        <p className="mt-2 mb-10 w-full text-center text-base font-normal text-white/80 lg:w-8/12">
          {description}
        </p>
        <a
          href="/converter"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
        >
          Coba Sekarang
        </a>
      </div>
    </div>
  );
}

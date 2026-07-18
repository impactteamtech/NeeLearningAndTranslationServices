type AboutCTAHeaderProps = {
  visible: boolean;
};

export const AboutCTAHeader = ({ visible }: AboutCTAHeaderProps) => (
  <div
    className={`mx-auto mb-10 max-w-2xl text-center transition-all duration-700 ${
      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`}
  >

    <h2 className="font-roxborough text-4xl font-bold tracking-[-0.035em] text-haiti-navy sm:text-5xl">
      Your next word is waiting.
    </h2>
    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
      Try a quick challenge, then turn a small win into real confidence.
    </p>
  </div>
);

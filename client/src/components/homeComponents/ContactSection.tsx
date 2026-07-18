import ContactForm from "../contact-page-components/ContactForm";
import ContactInfo from "../contact-page-components/ContactInfo";

const ContactSection = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-10 isolate w-full overflow-hidden py- scroll-mt-28"
    >
  
      <div className="w-full px-[clamp(20px,5vw,40px)]">
        <div className="mb-12 flex items-center flex-col">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-haiti-red">
            Let&apos;s talk
          </p>
          <h2
            id="contact-heading"
            className="font-roxborough text-center text-[clamp(2.25rem,5vw,4rem)] w-full  font-bold leading-[1.05] tracking-[-0.035em] text-haiti-navy"
          >
            Start your learning or translation journey.
          </h2>
          <p className="mt-5 text-center max-w-xl text-base leading-relaxed text-gray-500">
            Tell us what you need and our bilingual team will get back to you
            within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

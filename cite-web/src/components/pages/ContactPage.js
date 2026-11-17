import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <section className="section-container py-20">
      <h1 className="mb-6 text-4xl font-bold">
        Let's Discuss Your Project
      </h1>

      <div className="theme-card max-w-2xl p-8">
        <ContactForm />
      </div>
    </section>
  );
}
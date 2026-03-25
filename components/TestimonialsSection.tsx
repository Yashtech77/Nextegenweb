import { testimonials } from '@/lib/data';
import SectionHeading from './SectionHeading';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#050B18] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <SectionHeading
            badge="Client Stories"
            title="Trusted by"
            highlight="Happy Clients"
            subtitle="Don't take our word for it. Here's what the founders and product leaders we've worked with have to say."
          />
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>

        {/* Second row - 2 centered */}
        {testimonials.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
            {testimonials.slice(3, 5).map((testimonial, i) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i + 3} />
            ))}
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
          {[
            '⭐ 5.0 avg. client rating',
            '🚀 50+ products shipped',
            '🔒 NDA available',
            '💬 Responsive communication',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

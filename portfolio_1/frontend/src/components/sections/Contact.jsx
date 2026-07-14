import { useSubmitMessage } from '../../hooks/useContact';
import { useSettings } from '../../hooks/useSettings';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatedSection } from '../common/AnimatedSection';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

// Define the validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' })
});

export default function Contact() {
  const { data: settings } = useSettings();

  const socials = settings?.socials || { email: '', github: '', linkedin: '' };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' }
  });

  const contactMutation = useSubmitMessage();

  const onSubmit = (data) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setTimeout(() => contactMutation.reset(), 5000);
      }
    });
  };

  return (
    <AnimatedSection id="contact">
      <div className="mb-24 flex flex-col gap-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Let's Build Something Great</h2>
        <div className="h-[1px] w-full max-w-sm bg-[var(--color-border-custom)]"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Form */}
        <div className="border-thin bg-surface p-8 md:p-12 rounded">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Name</label>
              <input 
                type="text" 
                id="name" 
                {...register('name')}
                disabled={contactMutation.isPending}
                className={`bg-transparent border-b py-3 focus:outline-none transition-colors text-[var(--color-primary-text)] font-light disabled:opacity-50 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-[var(--color-border-custom)] focus:border-[var(--color-accent)]'}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Email</label>
              <input 
                type="email" 
                id="email" 
                {...register('email')}
                disabled={contactMutation.isPending}
                className={`bg-transparent border-b py-3 focus:outline-none transition-colors text-[var(--color-primary-text)] font-light disabled:opacity-50 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[var(--color-border-custom)] focus:border-[var(--color-accent)]'}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Message</label>
              <textarea 
                id="message" 
                rows="4"
                {...register('message')}
                disabled={contactMutation.isPending}
                className={`bg-transparent border-b py-3 focus:outline-none transition-colors text-[var(--color-primary-text)] font-light resize-none disabled:opacity-50 ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-[var(--color-border-custom)] focus:border-[var(--color-accent)]'}`}
                placeholder="How can we collaborate?"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            {contactMutation.isError && (
              <p className="text-red-500 text-sm font-medium">{contactMutation.error.message}</p>
            )}
            
            {contactMutation.isSuccess && (
              <p className="text-green-500 text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
            )}

            <button 
              type="submit" 
              disabled={contactMutation.isPending || contactMutation.isSuccess}
              className="mt-4 px-8 py-4 bg-[var(--color-accent-secondary)] text-white font-medium rounded hover:bg-opacity-90 transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {contactMutation.isPending ? 'Sending...' : contactMutation.isSuccess ? 'Sent' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="flex flex-col justify-center gap-12 lg:pl-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-serif font-medium text-[var(--color-primary-text)]">Digital Presence</h3>
            <div className="text-[var(--color-secondary-text)] font-light max-w-md leading-relaxed flex flex-col gap-4">
              <p>Whether it's building a modern web application, integrating AI into an existing product, or collaborating on an ambitious idea, I'm always excited to work on projects that create real impact.</p>
              <p>If you're looking for someone who enjoys solving problems, writing clean code, and continuously learning, I'd love to connect.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <a href={`mailto:${socials.email}`} className="flex items-center gap-4 group w-fit">
              <div className="p-4 border-thin bg-surface rounded group-hover:border-[var(--color-accent)] transition-colors">
                <FaEnvelope size={24} className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <span className="text-lg font-light group-hover:text-[var(--color-accent)] transition-colors">{socials.email}</span>
            </a>
            
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit">
                <div className="p-4 border-thin bg-surface rounded group-hover:border-[var(--color-accent-secondary)] transition-colors">
                  <FaLinkedin size={24} className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-accent-secondary)] transition-colors" />
                </div>
                <span className="text-lg font-light group-hover:text-[var(--color-accent-secondary)] transition-colors">LinkedIn</span>
              </a>
            )}

            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit">
                <div className="p-4 border-thin bg-surface rounded group-hover:border-[var(--color-primary-text)] transition-colors">
                  <FaGithub size={24} className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-primary-text)] transition-colors" />
                </div>
                <span className="text-lg font-light group-hover:text-[var(--color-primary-text)] transition-colors">GitHub</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}

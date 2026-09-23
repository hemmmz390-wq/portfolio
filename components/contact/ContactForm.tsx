"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const fieldClass =
  "mt-2 w-full border-b border-border bg-transparent py-2 font-body text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-foreground focus:outline-none";
const labelClass = "font-body text-[10px] uppercase tracking-[0.25em] text-muted";
const errorClass = "mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/60";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border-t border-border pt-10">
        <p className="font-display text-4xl uppercase leading-tight tracking-tight text-foreground">
          Thank you.
          <br />
          Your message has been sent.
        </p>
        <p className="mt-4 font-body text-sm text-muted">I&rsquo;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid max-w-2xl grid-cols-1 gap-8 tablet:grid-cols-2"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" autoComplete="name" {...register("name")} className={fieldClass} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={fieldClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          id="company"
          autoComplete="organization"
          {...register("company")}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>
          Project Type
        </label>
        <input id="projectType" {...register("projectType")} className={fieldClass} />
      </div>

      <div className="tablet:col-span-2">
        <label htmlFor="budget" className={labelClass}>
          Budget (optional)
        </label>
        <input id="budget" {...register("budget")} className={fieldClass} />
      </div>

      <div className="tablet:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" rows={5} {...register("message")} className={fieldClass} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="tablet:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          data-cursor-label="SEND"
          className="border-b border-border pb-1 font-body text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-foreground disabled:opacity-50"
        >
          Send Message →
        </button>
      </div>
    </form>
  );
}

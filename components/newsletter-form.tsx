"use client";
import { useState, useCallback, useMemo } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonInput from "@/components/ui/button-input";

// Basic client-side email format validation function
const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email) {
        setMessage("Please enter an email address.");
        setStatus("error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("Please enter a valid email address.");
        setStatus("error");
        return;
      }

      setStatus("loading");
      setMessage("Submitting...");

      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Subscription successful!");
          setEmail(""); // Clear input on success
        } else {
          setStatus("error");
          setMessage(
            data.message || "Subscription failed. Please check the email."
          );
        }
      } catch (e) {
        setStatus("error");
        setMessage("Network connection error. Please try again.");
        console.error("Client Submission Error:", e);
      }
    },
    [email]
  );

  const statusClass = useMemo(() => {
    return status === "success"
      ? "text-green-500 font-medium"
      : status === "error"
      ? "text-red-500 font-medium"
      : "text-xs mb-2 text-gray-500";
  }, [status]);

  // Determine if the submit button should be disabled
  const isDisabled = status === "loading" || !isValidEmail(email);

  return (
    <section className="space-y-1">
      <h4 className="font-semibold">Subscribe to Newsletter</h4>
      <p className={statusClass}>
        {message || "Get notified when I publish something new"}
      </p>

      <form onSubmit={handleSubmit}>
        <ButtonInput className="max-w-[300px]">
          <input
            type="email"
            data-slot="input"
            className="focus:outline-none ring-0 border-0 px-2 py-1 w-full"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Reset status/message if user starts typing again after an error
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            variant={"outline"}
            className="border-0 border-l text-primary rounded-none ml-auto"
            disabled={isDisabled}
          >
            {status === "loading" ? "..." : <Send />}
          </Button>
        </ButtonInput>
      </form>
    </section>
  );
};

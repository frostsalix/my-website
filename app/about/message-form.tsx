"use client";

import { FormEvent, useState } from "react";

const RECEIVER_EMAIL = "frostsalix@gmail.com";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    const subject = `Message from ${trimmedName}`;
    const body = `Name: ${trimmedName}\n\nMessage:\n${trimmedMessage}`;
    const href = `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="form-field" htmlFor="sender-name">
        Name
      </label>
      <input
        id="sender-name"
        className="form-input"
        name="name"
        type="text"
        autoComplete="name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label className="form-field" htmlFor="sender-message">
        Message
      </label>
      <textarea
        id="sender-message"
        className="form-textarea"
        name="message"
        required
        rows={7}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <button type="submit" className="form-submit">
        Send me message
      </button>
    </form>
  );
}
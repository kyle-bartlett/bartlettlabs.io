"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { possessive, type Prospect } from "./prospects";
import { visitorId } from "./track";

type Msg = { role: "user" | "assistant"; content: string };
type Lead = { name: string; phone: string; project: string; location?: string };
type Reply = { ok: boolean; reply?: string; lead?: Lead | null };

const MAX_CHARS = 600;

function suggestions(p: Prospect): string[] {
  const places = p.area.split("·").map((s) => s.trim());
  return [
    `How much does ${p.services[0].toLowerCase()} cost?`,
    `Do you work in ${places[1] ?? places[0]}?`,
    "Can someone come take a look this week?",
  ];
}

/** The demo website assistant for one prospect (src/lib/prospect-chat.ts). */
export function ProspectChat({ prospect: p }: { prospect: Prospect }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [closed, setClosed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, busy, lead]);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || busy || closed) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    let data: Reply = { ok: false };
    try {
      const res = await fetch("/api/prospect-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: p.slug,
          messages: next,
          visitor: visitorId(),
          leadSent: lead !== null,
        }),
      });
      data = (await res.json()) as Reply;
    } catch {
      // falls through to the fallback reply below
    }
    const reply =
      data.reply ||
      `Sorry, I can't answer right now. Call ${p.shortName} at ${p.phone}.`;
    setMessages([...next, { role: "assistant", content: reply }]);
    if (data.lead) setLead(data.lead);
    if (!data.ok) setClosed(true);
    setBusy(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <section className="prospect-chat" id="preview-chat">
      <div className="prospect-chat-copy">
        <p className="prospect-kicker">Website assistant concept</p>
        <h2>Questions answered in seconds, even at 10pm.</h2>
        <p>
          Try it. It answers as {p.shortName}, asks the follow-up questions that
          matter and collects what {p.shortName} needs to call back.
        </p>
        <ul>
          <li>Never quotes a price {p.shortName} hasn&apos;t set</li>
          <li>Hands every request to {p.shortName} by text</li>
          <li>Answers in English or Spanish</li>
        </ul>
      </div>

      <div className="prospect-chat-panel">
        <div className="prospect-chat-top">
          <strong>{p.shortName}</strong>
          <span>Virtual assistant · replies in seconds</span>
        </div>
        <div
          className="prospect-chat-list"
          ref={listRef}
          aria-live="polite"
          aria-label={`Chat with ${possessive(p.shortName)} assistant`}
        >
          <p className="prospect-bubble prospect-bubble-them">
            Hi, I&apos;m {possessive(p.shortName)} virtual assistant. What can I
            help you with today?
          </p>
          {messages.map((m, i) => (
            <p
              key={i}
              className={`prospect-bubble ${m.role === "user" ? "prospect-bubble-me" : "prospect-bubble-them"}`}
            >
              {m.content}
            </p>
          ))}
          {busy && (
            <p
              className="prospect-bubble prospect-bubble-them prospect-chat-typing"
              aria-label="Typing"
            >
              <span />
              <span />
              <span />
            </p>
          )}
          {lead && (
            <div className="prospect-chat-lead">
              <strong>
                On {possessive(p.shortName)} live site, this texts you right
                now:
              </strong>
              <span>
                New request: {lead.name}, {lead.phone}. {lead.project}
                {lead.location ? ` (${lead.location})` : ""}
              </span>
            </div>
          )}
        </div>
        {messages.length === 0 && (
          <div className="prospect-chat-chips">
            {suggestions(p).map((s) => (
              <button key={s} type="button" onClick={() => void send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        <form className="prospect-chat-form" onSubmit={submit}>
          <label className="sr-only" htmlFor={`chat-${p.slug}`}>
            Your message
          </label>
          <input
            id={`chat-${p.slug}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_CHARS}
            placeholder={closed ? "Chat ended" : "Type your question"}
            disabled={closed}
            autoComplete="off"
          />
          <button type="submit" disabled={busy || closed || !input.trim()}>
            Send
          </button>
        </form>
        <small>
          Demo built for {p.shortName}. Messages here don&apos;t reach the
          company.
        </small>
      </div>
    </section>
  );
}

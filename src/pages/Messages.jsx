import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuImage, LuMessageSquare, LuPhone, LuSend } from "react-icons/lu";
import { proByUid } from "../../data/catalog";
import { useApp } from "../store/useApp";
import { cx } from "../lib/format";
import { Avatar, VerifiedTick } from "../ui/brand";
import { Button, Card, EmptyState, StatusDot } from "../ui/primitives";

const AUTO_REPLIES = [
  "Understood, I will note that down.",
  "I have the parts with me, no problem.",
  "I am about ten minutes away now.",
  "Please keep the area clear so I can work.",
];

export default function Messages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, chats, sendMessage, receiveMessage, toast } = useApp();
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  const threads = useMemo(
    () =>
      bookings
        .filter((b) => b.status !== "cancelled")
        .map((b) => {
          const messages = chats[b.id] || [];
          return { booking: b, pro: proByUid(b.proUid), last: messages[messages.length - 1], count: messages.length };
        }),
    [bookings, chats]
  );

  const active = threads.find((t) => t.booking.id === id);
  const messages = active ? chats[active.booking.id] || [] : [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, id]);

  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;
    sendMessage(active.booking.id, text);
    setDraft("");
    setTimeout(() => {
      receiveMessage(active.booking.id, AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]);
    }, 1600);
  };

  if (!threads.length) {
    return (
      <div className="shell max-w-xl py-16 lg:py-24">
        <EmptyState
          icon={LuMessageSquare}
          title="No conversations yet"
          body="Once you book a professional, your messages with them appear here."
          action={<Button to="/services">Explore services</Button>}
        />
      </div>
    );
  }


  return (
    <div className="shell py-6 lg:py-10">
      <h1 className="font-display text-[26px] font-bold leading-tight sm:text-[32px]">Messages</h1>
      <p className="mt-2 text-[15px] text-ink-muted">One thread per booking, so nothing gets mixed up.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[320px_1fr]">
        <div className={cx("space-y-2.5", id && "hidden lg:block")}>
          {threads.map((t) => (
            <Link
              key={t.booking.id}
              to={`/messages/${t.booking.id}`}
              className={cx(
                "flex items-start gap-3 rounded-card border p-3.5 transition-all",
                t.booking.id === id ? "border-brand-600 bg-brand-50" : "border-line bg-white hover:border-brand-200"
              )}
            >
              <Avatar name={t.pro?.name} initials={t.pro?.initials} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold">{t.pro?.name}</p>
                <p className="tnum truncate text-[12px] text-ink-soft">
                  {t.booking.packageLabel} · {t.booking.id}
                </p>
                <p className="mt-1 truncate text-[12.5px] text-ink-muted">
                  {t.last ? t.last.text : "No messages yet"}
                </p>
              </div>
              {t.last && <span className="shrink-0 text-[11px] text-ink-soft">{t.last.at}</span>}
            </Link>
          ))}
        </div>

        {active ? (
          <Card className="flex h-[70vh] min-h-[480px] flex-col overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <button
                onClick={() => navigate("/messages")}
                className="grid size-9 place-items-center rounded-lg text-ink-muted hover:bg-canvas lg:hidden"
                aria-label="Back to conversations"
              >
                <LuArrowLeft className="size-[18px]" />
              </button>
              <Avatar name={active.pro?.name} initials={active.pro?.initials} size={40} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate text-[14.5px] font-semibold">
                  {active.pro?.name} <VerifiedTick className="size-3.5" />
                </p>
                <p className="flex items-center gap-1.5 text-[12px] text-brand-700">
                  <StatusDot /> Online
                </p>
              </div>
              <Button variant="secondary" size="sm" icon={LuPhone} href={`tel:${active.pro?.phone?.replace(/\s/g, "")}`}>
                Call
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-canvas px-4 py-4">
              <p className="mx-auto w-fit rounded-full bg-white px-3 py-1 text-[11.5px] text-ink-soft">
                Booking {active.booking.id} · {active.booking.packageLabel}
              </p>

              {messages.map((m) => (
                <div key={m.id} className={cx("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                  <div
                    className={cx(
                      "max-w-[78%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-soft",
                      m.from === "me"
                        ? "rounded-br-md bg-brand-600 text-white"
                        : "rounded-bl-md border border-line bg-white text-ink"
                    )}
                  >
                    {m.text}
                    <span
                      className={cx(
                        "tnum mt-1 block text-[10.5px]",
                        m.from === "me" ? "text-white/70" : "text-ink-soft"
                      )}
                    >
                      {m.at}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-line px-3 py-3">
              <button
                onClick={() => toast("Photo sharing is stubbed in this build")}
                aria-label="Send a photo"
                className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
              >
                <LuImage className="size-[18px]" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Write a message…"
                aria-label="Message"
                className="h-11 flex-1 rounded-xl border border-line bg-white px-3.5 text-sm placeholder:text-ink-soft focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
              />
              <Button size="md" onClick={send} disabled={!draft.trim()} aria-label="Send">
                <LuSend className="size-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <div className="hidden lg:block">
            <EmptyState
              icon={LuMessageSquare}
              title="Pick a conversation"
              body="Select a booking on the left to read and reply to its thread."
            />
          </div>
        )}
      </div>
    </div>
  );
}

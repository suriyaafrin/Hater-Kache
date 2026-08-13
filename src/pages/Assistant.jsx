import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowRight, LuSend, LuSparkles, LuTriangleAlert } from "react-icons/lu";
import { QUICK_PROMPTS, diagnose } from "../../data/assistant";
import { categoryBySlug, professionalsNear } from "../../data/catalog";
import { packageById } from "../../data/pricing";
import { useApp } from "../store/useApp";
import { takaRange } from "../lib/format";
import { Avatar, ProximityRing, RatingInline } from "../ui/brand";
import { Button, Card, Skeleton, Tag } from "../ui/primitives";


export default function Assistant() {
  const { area } = useApp();
  const [input, setInput] = useState("");
  const [thread, setThread] = useState([]);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef(null);

  const ask = (text = input) => {
    const question = text.trim();
    if (!question) return;
    setThread((t) => [...t, { role: "user", text: question }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThread((t) => [...t, { role: "assistant", result: diagnose(question), question }]);
      setThinking(false);
    }, 900);
  };

  return (
    <div className="shell max-w-3xl py-8 lg:py-12">
      <Tag tone="brand" icon={LuSparkles}>
        Hater-Kache Assistant
      </Tag>
      <h1 className="mt-4 font-display text-[30px] font-bold leading-tight sm:text-[38px]">
        Not sure what service you need?
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        Describe the symptom the way you would to a neighbour. You will get the likely causes, the right service, a
        price range, and who nearby can do it.
      </p>

      {thread.length === 0 && (
        <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => ask(p)}
              className="rounded-xl border border-line bg-white p-4 text-left text-[13.5px] leading-relaxed transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
            >
              “{p}”
            </button>
          ))}
        </div>
      )}

      <div className="mt-7 space-y-4">
        {thread.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-[14px] text-white">
                {m.text}
              </p>
            </div>
          ) : (
            <Answer key={i} result={m.result} question={m.question} area={area} />
          )
        )}

        {thinking && (
          <Card className="max-w-[92%] space-y-2.5 p-5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </Card>
        )}
      </div>

      <div className="safe-bottom sticky bottom-16 z-20 mt-8 flex items-center gap-2 border-t border-line bg-white/95 py-4 backdrop-blur lg:bottom-0">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Describe what is happening…"
          aria-label="Describe your problem"
          className="h-12 flex-1 rounded-xl border border-line bg-white px-4 text-[15px] placeholder:text-ink-soft focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
        />
        <Button size="lg" className="h-12 shrink-0" onClick={() => ask()} disabled={!input.trim()}>
          <LuSend className="size-4" />
          <span className="hidden sm:inline">Ask</span>
        </Button>
      </div>

      <p className="mt-3 text-center text-[12px] leading-relaxed text-ink-soft">
        Suggestions are a starting point, not a diagnosis. The professional confirms the fault on site.
      </p>
    </div>
  );
}

function Answer({ result, question, area }) {
  const nearby = useMemo(
    () => (result ? professionalsNear(area, { category: result.service.slug, limit: 3 }) : []),
    [result, area]
  );

  if (!result) {
    return (
      <Card className="max-w-[92%] p-5">
        <p className="text-[14px] font-semibold">I could not match that to a service</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
          Try naming the appliance or the room — “fridge not cooling”, “bathroom tap leaking”, “breaker keeps
          tripping”. Or browse the categories and pick the closest one.
        </p>
        <Button variant="secondary" size="sm" className="mt-4" to="/services" iconRight={LuArrowRight}>
          Browse services
        </Button>
      </Card>
    );
  }

  const category = categoryBySlug(result.service.slug);
  const pkg = packageById(result.service.slug, result.service.packageId);
  const Icon = category?.icon;

  return (
    <Card className="max-w-[95%] p-5 animate-fade-up">
      <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">Most likely</p>
      <p className="mt-1 font-display text-[17px] font-bold">{result.problem}</p>

      <div className="mt-4">
        <p className="text-[13px] font-semibold">Possible causes</p>
        <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-ink-muted">
          {result.causes.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-400" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-warn/20 bg-warn-soft p-3.5">
        <LuTriangleAlert className="mt-0.5 size-4 shrink-0 text-warn" />
        <p className="text-[13px] leading-relaxed text-ink-muted">{result.urgency}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-canvas p-4">
        {Icon && (
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
            <Icon className="size-5" aria-hidden />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">Recommended</p>
          <p className="text-[14.5px] font-semibold">{result.service.label}</p>
          <p className="tnum text-[13px] text-brand-700">{takaRange(result.min, result.max)}</p>
        </div>
        <Button size="sm" to={`/book?category=${result.service.slug}${pkg ? `&package=${pkg.id}` : ""}`}>
          Book this
        </Button>
      </div>

      {nearby.length > 0 && (
        <div className="mt-4">
          <p className="tnum text-[13px] font-semibold">
            {nearby.length} professionals near {area.label}
          </p>
          <ul className="mt-2.5 space-y-2">
            {nearby.map((p) => (
              <li key={p.uid}>
                <Link
                  to={`/pro/${p.uid}`}
                  className="flex items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-brand-200"
                >
                  <Avatar name={p.name} initials={p.initials} size={38} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-semibold">{p.name}</span>
                    <RatingInline rating={p.rating} reviews={p.reviews} size={12} />
                  </span>
                  <ProximityRing km={p.km} size={40} label={false} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 border-t border-line pt-3 text-[13px] text-ink-muted">
        <span className="font-semibold text-ink">One more thing:</span> {result.ask}
      </p>
      <span className="sr-only">Answer to: {question}</span>
    </Card>
  );
}

"use client";

import ProtectedPage from "../_components/ProtectedPage";
import { useSettings, type TextSize } from "../_components/SettingsProvider";

const TEXT_SIZE_OPTIONS: { value: TextSize; label: string; preview: string }[] = [
  { value: "small",   label: "Small",       preview: "Aa" },
  { value: "default", label: "Default",     preview: "Aa" },
  { value: "large",   label: "Large",       preview: "Aa" },
  { value: "xlarge",  label: "Extra large", preview: "Aa" },
];

interface ToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ id, label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start gap-5 py-5 border-b border-stone-200 last:border-b-0">
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="block text-base font-semibold text-stone-900 cursor-pointer">
          {label}
        </label>
        <p className="text-base text-stone-600 mt-1 leading-relaxed hc-text-muted">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-14 h-8 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
          checked ? "bg-rose-500" : "bg-stone-300"
        }`}
      >
        <span className="sr-only">{checked ? "On" : "Off"}</span>
        <span
          aria-hidden="true"
          className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { settings, update, reset } = useSettings();

  return (
    <ProtectedPage>
      <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Accessibility</h1>
      <p className="text-stone-600 mb-8 text-base leading-relaxed">
        Adjust the app to suit you. Your preferences are saved on this device and apply across every page.
      </p>

      {/* TEXT SIZE */}
      <section
        aria-labelledby="text-size-heading"
        className="bg-white rounded-2xl border border-stone-200 p-7 mb-6 hc-card"
      >
        <h2 id="text-size-heading" className="font-serif text-xl font-bold text-stone-900 mb-2">
          Text size
        </h2>
        <p className="text-base text-stone-600 mb-5 hc-text-muted">
          Choose the size that's most comfortable to read.
        </p>
        <div role="radiogroup" aria-labelledby="text-size-heading" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TEXT_SIZE_OPTIONS.map((opt) => {
            const selected = settings.textSize === opt.value;
            return (
              <button
                key={opt.value}
                role="radio"
                aria-checked={selected}
                onClick={() => update("textSize", opt.value)}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 min-h-[100px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
                  selected
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white text-stone-700 border-stone-300 hover:border-rose-400"
                }`}
              >
                <span
                  className={`font-serif font-bold ${
                    opt.value === "small"   ? "text-lg" :
                    opt.value === "default" ? "text-2xl" :
                    opt.value === "large"   ? "text-3xl" :
                                              "text-4xl"
                  }`}
                  aria-hidden="true"
                >
                  {opt.preview}
                </span>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* TOGGLES */}
      <section
        aria-labelledby="display-heading"
        className="bg-white rounded-2xl border border-stone-200 p-7 mb-6 hc-card"
      >
        <h2 id="display-heading" className="font-serif text-xl font-bold text-stone-900 mb-2">
          Display preferences
        </h2>
        <p className="text-base text-stone-600 mb-3 hc-text-muted">
          Toggle features that may help you read and navigate more easily.
        </p>

        <div className="divide-y divide-stone-200">
          <Toggle
            id="hc-toggle"
            label="High contrast mode"
            description="Use pure black and white with thicker borders. Helps if you have low vision or use the app in bright sunlight."
            checked={settings.highContrast}
            onChange={(v) => update("highContrast", v)}
          />
          <Toggle
            id="motion-toggle"
            label="Reduce motion"
            description="Disable animations and transitions. Helpful if movement on screen feels distracting or causes discomfort."
            checked={settings.reduceMotion}
            onChange={(v) => update("reduceMotion", v)}
          />
          <Toggle
            id="links-toggle"
            label="Always underline links"
            description="Underline every link, not just the ones you hover. Makes links easier to find at a glance."
            checked={settings.underlineLinks}
            onChange={(v) => update("underlineLinks", v)}
          />
          <Toggle
            id="spacing-toggle"
            label="Increase letter spacing"
            description="Wider gaps between letters and lines. Often helpful for readers with dyslexia."
            checked={settings.increaseSpacing}
            onChange={(v) => update("increaseSpacing", v)}
          />
        </div>
      </section>

      {/* PREVIEW */}
      <section
        aria-labelledby="preview-heading"
        className="bg-rose-50 rounded-2xl border-2 border-rose-200 p-7 mb-6 hc-card"
      >
        <h2 id="preview-heading" className="font-serif text-xl font-bold text-stone-900 mb-3">
          Preview
        </h2>
        <p className="text-base text-stone-800 leading-relaxed">
          The quick brown fox jumps over the lazy dog. This is what your text will look like with the
          settings you've chosen — try changing the options above to see the page update in real time.
        </p>
        <p className="text-base text-stone-700 mt-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-rose-600 font-medium">
            This is an example link
          </a>{" "}
          for testing the underline setting.
        </p>
      </section>

      {/* RESET */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <p className="text-sm text-stone-500 hc-text-muted">
          Settings are saved on this device only.
        </p>
        <button
          onClick={() => {
            if (confirm("Reset all accessibility settings to their defaults?")) reset();
          }}
          className="bg-white border-2 border-stone-300 text-stone-800 hover:bg-stone-50 text-base font-medium px-5 py-3 rounded-xl min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-500"
        >
          Reset to defaults
        </button>
      </div>
    </ProtectedPage>
  );
}

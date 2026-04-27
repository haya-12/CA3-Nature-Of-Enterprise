"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type TextSize = "small" | "default" | "large" | "xlarge";

export interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  increaseSpacing: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: "default",
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false,
  increaseSpacing: false,
};

interface SettingsContextValue {
  settings: AccessibilitySettings;
  update: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  update: () => {},
  reset:  () => {},
});

const STORAGE_KEY = "campus_a11y_settings";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  // Restore from localStorage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch { /* ignore */ }
  }, []);

  // Apply settings as data-attributes on <html> whenever they change
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-text-size",       settings.textSize);
    html.setAttribute("data-high-contrast",   String(settings.highContrast));
    html.setAttribute("data-reduce-motion",   String(settings.reduceMotion));
    html.setAttribute("data-underline-links", String(settings.underlineLinks));
    html.setAttribute("data-spacing",         String(settings.increaseSpacing));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch { /* ignore */ }
  }, [settings]);

  const update = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  return (
    <SettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

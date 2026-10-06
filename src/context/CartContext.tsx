"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProduct, type Product } from "@/lib/products";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

export type CartLine = {
  slug: string;
  size: string;
  colour: string;
  quantity: number;
};

export type ResolvedLine = CartLine & {
  key: string;
  product: Product;
};

type CartContextValue = {
  lines: ResolvedLine[];
  count: number;
  isOpen: boolean;
  /** Increments on every add so the bag icon can animate. */
  pulse: number;
  addLine: (line: CartLine) => void;
  removeLine: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  openBag: () => void;
  closeBag: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cezar-bag-v1";

const lineKey = (line: CartLine) => `${line.slug}__${line.size}__${line.colour}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .filter((entry): entry is CartLine => {
                if (!entry || typeof entry !== "object") return false;
                const candidate = entry as Partial<CartLine>;
                return typeof candidate.slug === "string";
              })
              .filter((entry) => Boolean(getProduct(entry.slug))),
          );
        }
      }
    } catch {
      /* storage unavailable - the bag simply starts empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore persistence failures */
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const addLine = useCallback((line: CartLine) => {
    setItems((current) => {
      const key = lineKey(line);
      const existing = current.find((item) => lineKey(item) === key);
      if (existing) {
        return current.map((item) =>
          lineKey(item) === key ? { ...item, quantity: item.quantity + line.quantity } : item,
        );
      }
      return [...current, line];
    });
    setPulse((value) => value + 1);
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((key: string) => {
    setItems((current) => current.filter((item) => lineKey(item) !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => lineKey(item) !== key)
        : current.map((item) => (lineKey(item) === key ? { ...item, quantity } : item)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  const lines = useMemo<ResolvedLine[]>(
    () =>
      items.reduce<ResolvedLine[]>((accumulator, item) => {
        const product = getProduct(item.slug);
        if (product) {
          accumulator.push({ ...item, key: lineKey(item), product });
        }
        return accumulator;
      }, []),
    [items],
  );

  const count = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      isOpen,
      pulse,
      addLine,
      removeLine,
      setQuantity,
      clear,
      openBag,
      closeBag,
    }),
    [lines, count, isOpen, pulse, addLine, removeLine, setQuantity, clear, openBag, closeBag],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}

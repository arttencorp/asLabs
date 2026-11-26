"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Beaker,
  Microscope,
  ChevronLeft,
  ChevronRight,
  Dna,
  FlaskConical,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TestTube2,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WhatsAppContact } from "@/components/whatsapp-contact";
import {
  getProductReferencePricePen,
  hasVerifiedProductPrice,
  featuredScientificProducts,
  molecularProducts,
  productCategories,
  REFERENCE_SHIPPING_PEN,
  type MolecularProduct,
} from "@/data/kits-reactivos";

const PAGE_SIZE = 24;

const categoryGroups: Record<
  string,
  readonly (typeof productCategories)[number][]
> = {
  molecular: [
    "PCR y qPCR",
    "Extracción y purificación",
    "ARN y transcriptómica",
    "Cuantificación y detección",
    "Clonación y expresión",
    "Reactivos moleculares",
    "Electroforesis",
  ],
  microbiologia: ["Bacteriología y medios", "Identificación bacteriana"],
  medios: ["Medios de cultivo"],
  equipos: ["Equipos moleculares", "Consumibles PCR", "Materiales moleculares"],
  bacteriofagos: ["Bacteriófagos"],
  laboratorio: [
    "Agitadores magnéticos",
    "Centrífugas",
    "Pipeteo y dispensación",
    "Mezcladores vortex",
    "Agitadores orbitales",
    "Agitadores de techo",
    "Incubadoras y calentadores",
    "Medición de pH",
  ],
};

export type CatalogPageConfig = {
  scope:
    | "molecular"
    | "microbiologia"
    | "medios"
    | "equipos"
    | "bacteriofagos"
    | "laboratorio";
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  introTitle: string;
  intro: string[];
  useCases: Array<{ title: string; text: string }>;
  faq: Array<{ question: string; answer: string }>;
  notice?: string;
  noticeTitle?: string;
};

const catalogFamilies = [
  [
    "Biología molecular",
    "PCR, qPCR, extracción y análisis",
    "biologia-molecular",
    "molecular",
  ],
  [
    "Microbiología",
    "Identificación y pruebas bacterianas",
    "microbiologia",
    "microbiologia",
  ],
  [
    "Medios de cultivo",
    "Agares y medios deshidratados",
    "medios-de-cultivo",
    "medios",
  ],
  [
    "Equipos y consumibles",
    "Instrumentos y materiales de laboratorio",
    "equipos-consumibles",
    "equipos",
  ],
  [
    "Bacteriófagos",
    "Mezclas y controles para investigación",
    "bacteriofagos",
    "bacteriofagos",
  ],
  [
    "Equipos de laboratorio",
    "50 referencias de importación",
    "equipos-de-laboratorio",
    "laboratorio",
  ],
] as const;

const heroHighlights = [
  { icon: Dna, title: "Biología molecular", text: "PCR, qPCR y extracción" },
  {
    icon: Microscope,
    title: "Microbiología",
    text: "Identificación y cultivo",
  },
  {
    icon: Beaker,
    title: "Equipamiento",
    text: "Instrumentación y consumibles",
  },
  {
    icon: MessageCircle,
    title: "Asesoría técnica",
    text: "Selección por aplicación",
  },
];

function matchesCategory(product: MolecularProduct, selected: string) {
  if (selected === "Todos") return true;
  if (selected.startsWith("grupo:"))
    return (
      categoryGroups[selected.slice(6)]?.includes(product.category) ?? false
    );
  return product.category === selected;
}

function money(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value);
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: MolecularProduct;
  index: number;
  onAdd: (product: MolecularProduct) => void;
}) {
  const price = getProductReferencePricePen(product);

  return (
    <motion.article
      id={product.id}
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.045, 0.25) }}
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col overflow-hidden border border-[#cfd9d2] bg-white transition-colors hover:border-[#8eaa99]"
    >
      <div className="relative h-36 overflow-hidden border-b border-[#e2e8e3] bg-[#fafcfb] sm:h-40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.025]"
        />
        <span className="absolute left-3 top-3 border border-[#d9e2dc] bg-white/[.92] px-2.5 py-1 text-[8px] font-semibold text-[#285d42] backdrop-blur-md">
          {product.category}
        </span>
        <span className="absolute bottom-2.5 right-2.5 bg-[#123e2d] px-2.5 py-1 text-[8px] font-semibold text-white">
          {product.catalogNumber}
        </span>
        {product.researchUseOnly && (
          <span className="absolute right-3 top-3 rounded-full border border-amber-200 bg-amber-50/95 px-2.5 py-1 text-[8px] font-black uppercase tracking-[.08em] text-amber-800 shadow-sm">
            Solo investigación
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[9px] font-semibold text-[#4d7d60]">
          {product.brand}
        </p>
        <h2 className="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-5 tracking-[-.015em] text-[#123e2d]">
          {product.name}
        </h2>
        <p className="mt-2 line-clamp-1 text-[10px] font-medium text-[#77877e]">
          {product.presentation}
        </p>

        <div className="mt-auto pt-3">
          <div>
            {price !== null ? (
              <>
                <p className="text-[8px] font-semibold text-[#718279]">
                  Precio referencial
                  {product.priceBasis ? ` · ${product.priceBasis}` : ""}
                </p>
                <p className="mt-0.5 text-lg font-semibold tracking-[-.03em] text-[#0b4a33]">
                  {product.priceBasis ? money(price) : `Desde ${money(price)}`}{" "}
                  {product.taxNote && (
                    <span className="text-[10px] font-bold text-[#5f7569]">
                      {product.taxNote}
                    </span>
                  )}
                </p>
                {product.shippingPen && (
                  <p className="mt-1 text-[9px] font-semibold text-[#7b8d83]">
                    Envío ref. por pedido: {money(product.shippingPen)}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-[8px] font-semibold text-[#718279]">
                  Precio
                </p>
                <p className="mt-0.5 text-sm font-black tracking-[-.02em] text-[#0b4a33]">
                  Bajo cotización
                </p>
              </>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/kits-reactivos/${product.id}`}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 border border-[#ceded3] px-2 text-[10px] font-semibold text-[#285b41] transition hover:border-[#8eb19d] hover:bg-[#eff6f1]"
            >
              Ver ficha <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {product.presentationOptions?.length ? (
              <Link
                href={`/kits-reactivos/${product.id}`}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 bg-[#14744d] px-2 text-[10px] font-semibold text-white transition hover:bg-[#0f5e3e]"
              >
                <SlidersHorizontal className="h-4 w-4" /> Elegir
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => onAdd(product)}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 bg-[#14744d] px-2 text-[10px] font-semibold text-white transition hover:bg-[#0f5e3e]"
              >
                <ShoppingCart className="h-4 w-4" />{" "}
                {price !== null ? "Añadir" : "Cotizar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CartDrawer({
  open,
  cart,
  onClose,
  onSet,
}: {
  open: boolean;
  cart: Record<string, number>;
  onClose: () => void;
  onSet: (id: string, quantity: number) => void;
}) {
  const entries = molecularProducts.filter(
    (product) => (cart[product.id] ?? 0) > 0,
  );
  const units = entries.reduce((total, product) => total + cart[product.id], 0);
  const allPricesAvailable =
    entries.length > 0 && entries.every(hasVerifiedProductPrice);
  const hasTaxExcludedProducts = entries.some((product) =>
    Boolean(product.taxNote),
  );
  const shippingValues = [
    ...new Set(
      entries.map((product) => product.shippingPen ?? REFERENCE_SHIPPING_PEN),
    ),
  ];
  const shippingReference =
    shippingValues.length === 1 ? shippingValues[0] : null;
  const subtotalFrom = allPricesAvailable
    ? entries.reduce(
        (total, product) =>
          total + getProductReferencePricePen(product)! * cart[product.id],
        0,
      )
    : null;
  const message = [
    "Hola, deseo solicitar una cotización de kits y reactivos:",
    "",
    ...entries.map(
      (product) =>
        `• ${product.name} (${product.catalogNumber}) — ${cart[product.id]} unidad(es)${product.taxNote ? ` · ${product.taxNote}` : ""}${product.researchUseOnly ? " · solo para investigación" : ""}`,
    ),
    "",
    ...(subtotalFrom !== null
      ? [
          `Subtotal referencial desde: ${money(subtotalFrom)}${hasTaxExcludedProducts ? " (incluye productos con IGV no sumado)" : ""}`,
          shippingReference !== null
            ? `Envío base referencial por pedido: ${money(shippingReference)}`
            : "Envío referencial: por confirmar porque el pedido combina familias distintas.",
          "Total final: por confirmar según variables, impuestos, destino y conservación.",
        ]
      : [
          "Precio, presentación, importación y envío: por confirmar en cotización.",
        ]),
    "",
    "Por favor, confirmen disponibilidad, tipo de cambio y plazo de importación.",
  ].join("\n");

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[180]">
          <motion.button
            type="button"
            aria-label="Cerrar pedido"
            className="absolute inset-0 bg-[#062c20]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Pedido de kits y reactivos"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-[#f9fbf9] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[#dfe8e2] px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4f8062]">
                  Solicitud referencial
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#173f2d]">
                  Tu pedido
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#dbe5de] bg-white text-[#53675b]"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {entries.length ? (
                entries.map((product) => {
                  const quantity = cart[product.id];
                  const price = getProductReferencePricePen(product);
                  return (
                    <article
                      key={product.id}
                      className="mb-3 rounded-3xl border border-[#dfe8e2] bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e7f2ea] text-[#1e6a46]">
                          <FlaskConical className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold leading-5 text-[#173f2d]">
                            {product.name}
                          </p>
                          <p className="mt-1 text-[10px] font-semibold text-[#648071]">
                            {product.catalogNumber}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSet(product.id, 0)}
                          aria-label={`Eliminar ${product.name}`}
                          className="grid h-9 w-9 place-items-center rounded-xl text-[#9aa69f] hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#dfe7e2] bg-[#f5f8f5] p-1">
                          <button
                            type="button"
                            onClick={() => onSet(product.id, quantity - 1)}
                            aria-label="Reducir cantidad"
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onSet(product.id, quantity + 1)}
                            aria-label="Aumentar cantidad"
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-right font-black text-[#0d5137]">
                          {price !== null
                            ? `Desde ${money(price * quantity)}${product.taxNote ? ` ${product.taxNote}` : ""}`
                            : "Bajo cotización"}
                        </p>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-[#e8f3eb] text-[#28704d]">
                    <ShoppingCart className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#173f2d]">
                    Tu pedido está vacío
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#718178]">
                    Añade las referencias que deseas cotizar.
                  </p>
                </div>
              )}
            </div>
            {entries.length > 0 && (
              <footer className="max-h-[48vh] overflow-y-auto border-t border-[#dfe8e2] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-7">
                {subtotalFrom !== null ? (
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between text-[#66786e]">
                      <dt>
                        Subtotal desde · {units}{" "}
                        {units === 1 ? "unidad" : "unidades"}
                      </dt>
                      <dd className="font-bold text-[#2d4639]">
                        {money(subtotalFrom)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 text-[#66786e]">
                      <dt className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Envío referencial
                      </dt>
                      <dd className="text-right font-bold text-[#2d4639]">
                        {shippingReference !== null
                          ? money(shippingReference)
                          : "Por confirmar"}
                      </dd>
                    </div>
                    <div className="border-t border-dashed border-[#dfe8e2] pt-4">
                      <p className="font-bold text-[#173f2d]">
                        Total final por confirmar
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-[#829087]">
                        Depende de la variante, impuestos, destino y cadena de
                        frío.
                      </p>
                    </div>
                    {hasTaxExcludedProducts && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] leading-4 text-amber-900">
                        El subtotal contiene referencias publicadas “+ IGV”. El
                        impuesto se calcula en la cotización final.
                      </div>
                    )}
                  </dl>
                ) : (
                  <div className="rounded-2xl border border-[#ead9ba] bg-[#fff9ee] p-4">
                    <p className="text-sm font-bold text-[#60491e]">
                      Cotización personalizada · {units}{" "}
                      {units === 1 ? "unidad" : "unidades"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#7b6845]">
                      No se calculará ningún total hasta validar precio,
                      presentación, importación y envío.
                    </p>
                  </div>
                )}
                <WhatsAppContact
                  message={message}
                  className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#14744d] px-5 text-base font-bold text-white shadow-lg shadow-[#14744d]/20 transition hover:bg-[#0f5e3e]"
                >
                  Solicitar cotización <ArrowRight className="h-4 w-4" />
                </WhatsAppContact>
                <p className="mt-3 text-center text-[10px] leading-4 text-[#809087]">
                  Un asesor confirmará el precio, stock, tipo de cambio y
                  condiciones de importación.
                </p>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function KitsReactivosClient({
  pageConfig,
}: {
  pageConfig?: CatalogPageConfig;
}) {
  const catalogProducts = pageConfig
    ? molecularProducts
    : featuredScientificProducts;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    pageConfig ? `grupo:${pageConfig.scope}` : "Todos",
  );
  const [brand, setBrand] = useState("Todas");
  const [sort, setSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const brandFilterOptions = useMemo(() => {
    const scopedProducts = pageConfig
      ? molecularProducts.filter((product) =>
          matchesCategory(product, `grupo:${pageConfig.scope}`),
        )
      : featuredScientificProducts;
    return [
      "Todas",
      ...Array.from(
        new Set(scopedProducts.map((product) => product.brand)),
      ).sort(),
    ];
  }, [pageConfig]);

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase("es");
    const results = catalogProducts.filter((product) => {
      const categoryMatch = matchesCategory(product, category);
      const matchesBrand = brand === "Todas" || product.brand === brand;
      const haystack =
        `${product.name} ${product.brand} ${product.catalogNumber} ${product.description}`.toLocaleLowerCase(
          "es",
        );
      return categoryMatch && matchesBrand && haystack.includes(normalized);
    });

    return [...results].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "es");
      return 0;
    });
  }, [brand, catalogProducts, category, query, sort]);

  useEffect(() => setCurrentPage(1), [brand, category, query, sort]);

  useEffect(() => {
    if (pageConfig) return;
    const params = new URLSearchParams(window.location.search);
    const requestedGroup = params.get("grupo");
    const requestedCategory = params.get("categoria");
    if (requestedGroup && categoryGroups[requestedGroup])
      setCategory(`grupo:${requestedGroup}`);
    else if (
      requestedCategory &&
      productCategories.includes(
        requestedCategory as (typeof productCategories)[number],
      )
    )
      setCategory(requestedCategory);
  }, [pageConfig]);

  const scopedCategories = pageConfig
    ? categoryGroups[pageConfig.scope]
    : productCategories;
  const heroIcon =
    pageConfig?.scope === "molecular"
      ? Dna
      : pageConfig?.scope === "equipos"
        ? SlidersHorizontal
        : pageConfig?.scope === "laboratorio"
          ? Beaker
          : pageConfig?.scope === "bacteriofagos"
            ? ShieldCheck
            : FlaskConical;
  const HeroIcon = heroIcon;

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    const requestedPage = Number(
      new URLSearchParams(window.location.search).get("pagina"),
    );
    if (
      Number.isInteger(requestedPage) &&
      requestedPage >= 1 &&
      requestedPage <= pageCount
    )
      setCurrentPage(requestedPage);
  }, [pageCount]);

  const pageItems = useMemo(() => {
    const pages = new Set([
      1,
      pageCount,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ]);
    return [...pages]
      .filter((page) => page >= 1 && page <= pageCount)
      .sort((a, b) => a - b);
  }, [currentPage, pageCount]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), pageCount));
    window.requestAnimationFrame(() =>
      document
        .getElementById("catalog-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const add = (product: MolecularProduct) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }));
  };

  const setQuantity = (id: string, quantity: number) => {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  };

  const itemCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const currentFamily = catalogFamilies.find(
    ([, , , scope]) => scope === pageConfig?.scope,
  );
  const catalogPath = currentFamily
    ? `/kits-reactivos/${currentFamily[2]}`
    : "/kits-reactivos";
  const paginationHref = (page: number) =>
    `${catalogPath}${page > 1 ? `?pagina=${page}` : ""}#catalog-results`;

  return (
    <>
      <Navbar overlay />
      <main className="overflow-x-clip bg-[#f4f6f3] text-[#173f2d]">
        <section
          data-navbar-theme="dark"
          className="relative isolate overflow-hidden bg-[#062b22] pb-12 pt-28 text-white sm:pt-32 lg:pb-14"
        >
          <Image
            src={pageConfig?.image ?? "/lab-scientists.png"}
            alt={pageConfig?.title ?? "Kits y reactivos para laboratorio"}
            fill
            priority
            className="-z-20 object-cover object-center opacity-[.38]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,28,22,.97)_0%,rgba(4,28,22,.86)_45%,rgba(4,28,22,.36)_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />

          <div className="relative mx-auto grid max-w-[1360px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              {pageConfig && (
                <nav
                  aria-label="Ruta de navegación"
                  className="mb-3 flex flex-wrap items-center gap-2 text-[9px] font-semibold text-white/58"
                >
                  <Link href="/">Inicio</Link>
                  <span aria-hidden="true">/</span>
                  <Link href="/kits-reactivos">Kits y reactivos</Link>
                  <span aria-hidden="true">/</span>
                  <span aria-current="page" className="text-white/90">
                    {pageConfig.eyebrow}
                  </span>
                </nav>
              )}
              <div className="flex items-center gap-3 text-[10px] font-medium text-[#b7d4c5]">
                <HeroIcon className="h-3.5 w-3.5" />
                {pageConfig?.eyebrow ?? "Suministros científicos"}
                <span className="h-px w-24 bg-white/15" />
              </div>
              <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.3rem,4.4vw,4.5rem)] font-medium leading-[.99] tracking-[-.05em]">
                {pageConfig?.title ??
                  "Kits, reactivos y equipos para trabajo científico."}
              </h1>
              <p className="mt-5 max-w-2xl text-xs leading-6 text-white/68 sm:text-sm">
                {pageConfig?.description ??
                  "Referencias para biología molecular, microbiología, cultivo, identificación y equipamiento de laboratorio con asesoría técnica."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#catalogo"
                  className="inline-flex min-h-10 items-center gap-2 bg-[#d5a34f] px-5 text-xs font-semibold text-[#173428] transition hover:bg-[#e4b866]"
                >
                  Explorar catálogo <ArrowRight className="h-3.5 w-3.5" />
                </a>
                {!pageConfig && (
                  <WhatsAppContact
                    message="Hola, quisiera asesoría para elegir un kit de extracción de ADN."
                    className="inline-flex min-h-10 items-center gap-2 border border-white/[.22] px-5 text-xs font-semibold text-white transition hover:bg-white hover:text-[#062b22]"
                  >
                    <Dna className="h-3.5 w-3.5" /> Extracción de ADN
                  </WhatsAppContact>
                )}
              </div>
            </motion.div>
            {!pageConfig && (
              <div className="hidden border-l border-t border-white/[.18] lg:grid lg:grid-cols-2">
                {heroHighlights.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="min-h-[130px] border-b border-r border-white/[.18] p-5"
                  >
                    <Icon className="h-5 w-5 text-[#b7d4c5]" />
                    <p className="mt-7 text-xs font-medium text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-[9px] text-white/45">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          id="catalogo"
          data-navbar-theme="light"
          className="scroll-mt-20 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
            {!pageConfig && (
              <nav
                aria-label="Familias del catálogo"
                className="grid border-l border-t border-[#cfd9d2] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
              >
                {catalogFamilies.map(([title, description, slug]) => (
                  <Link
                    key={slug}
                    href={`/kits-reactivos/${slug}`}
                    className="group min-h-[76px] border-b border-r border-[#cfd9d2] bg-white px-4 py-3 text-[#264b39] transition hover:bg-[#eef3ef]"
                  >
                    <span className="block text-[10px] font-semibold leading-4 text-[#176844]">
                      {title}
                    </span>
                    <span className="mt-1 block text-[8px] leading-3 text-[#718178]">
                      {description}
                    </span>
                  </Link>
                ))}
              </nav>
            )}
            {pageConfig?.notice && (
              <div
                role="note"
                className="mb-6 flex items-start gap-3 rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950 shadow-sm"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <p>
                  <strong>
                    {pageConfig.noticeTitle ?? "Información importante."}
                  </strong>{" "}
                  {pageConfig.notice}
                </p>
              </div>
            )}
            <div className="mt-9 flex flex-col gap-4 border-b border-[#cbd5ce] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold text-[#0b7a55]">
                  Índice de suministros
                </p>
                <h2 className="mt-2 text-[clamp(1.9rem,3vw,3.1rem)] font-medium tracking-[-.04em]">
                  Encuentra la referencia adecuada.
                </h2>
                <p className="mt-2 text-xs leading-5 text-[#687970]">
                  Filtra por aplicación, categoría o marca y revisa la ficha
                  técnica antes de cotizar.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <WhatsAppContact
                  message="Hola, quisiera asesoría para elegir un kit, reactivo o medio de cultivo."
                  className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#b8cfc0] bg-white px-4 text-[11px] font-semibold text-[#176844] transition hover:border-[#76a88b]"
                >
                  <MessageCircle className="h-4 w-4" /> Asesoría
                </WhatsAppContact>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#173f2d] px-4 text-[11px] font-semibold text-white"
                >
                  <ShoppingCart className="h-4 w-4" /> Pedido{" "}
                  {itemCount > 0 && (
                    <span className="rounded-full bg-[#d7f2dd] px-2 py-0.5 text-[10px] text-[#173f2d]">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-7 lg:grid-cols-[250px_1fr]">
              <aside
                className="h-fit border border-[#cfd9d2] bg-white lg:sticky lg:top-24"
                aria-label="Filtros del catálogo"
              >
                <div className="flex items-center gap-2 border-b border-[#dce3de] px-4 py-4">
                  <SlidersHorizontal className="h-4 w-4 text-[#176844]" />
                  <p className="text-[11px] font-semibold text-[#243a2f]">
                    Filtrar catálogo
                  </p>
                </div>
                <div className="space-y-4 p-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[9px] font-medium text-[#67776e]">
                      Buscar referencia
                    </span>
                    <span className="relative block">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6c7f74]" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Producto, marca o código"
                        className="h-10 w-full border border-[#dfe8e2] bg-[#f8faf8] pl-9 pr-3 text-[11px] outline-none transition focus:border-[#72a387]"
                      />
                    </span>
                  </label>
                  <label>
                    <span className="mb-1.5 block text-[9px] font-medium text-[#67776e]">
                      Categoría
                    </span>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="h-10 w-full border border-[#dfe8e2] bg-[#f8faf8] px-3 text-[10px] font-medium text-[#385344] outline-none focus:border-[#72a387]"
                    >
                      <option
                        value={
                          pageConfig ? `grupo:${pageConfig.scope}` : "Todos"
                        }
                      >
                        {pageConfig
                          ? `Toda la familia: ${currentFamily?.[0]}`
                          : "Todas las categorías"}
                      </option>
                      {!pageConfig && (
                        <optgroup label="Familias principales">
                          <option value="grupo:molecular">
                            Biología molecular
                          </option>
                          <option value="grupo:microbiologia">
                            Microbiología
                          </option>
                          <option value="grupo:medios">
                            Medios de cultivo
                          </option>
                          <option value="grupo:equipos">
                            Equipos y consumibles
                          </option>
                          <option value="grupo:bacteriofagos">
                            Bacteriófagos
                          </option>
                          <option value="grupo:laboratorio">
                            Equipos de laboratorio
                          </option>
                        </optgroup>
                      )}
                      <optgroup label="Categorías específicas">
                        {scopedCategories.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </label>
                  <label className="relative">
                    <span className="mb-1.5 block text-[9px] font-medium text-[#67776e]">
                      Marca
                    </span>
                    <select
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                      className="h-10 w-full border border-[#dfe8e2] bg-[#f8faf8] px-3 text-[10px] font-medium text-[#385344] outline-none focus:border-[#72a387]"
                    >
                      <option value="Todas">Todas las marcas</option>
                      {brandFilterOptions.slice(1).map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="mb-1.5 block text-[9px] font-medium text-[#67776e]">
                      Orden
                    </span>
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                      className="h-10 w-full border border-[#dfe8e2] bg-[#f8faf8] px-3 text-[10px] font-medium text-[#385344] outline-none focus:border-[#72a387]"
                    >
                      <option value="featured">Destacados</option>
                      <option value="name">Nombre A–Z</option>
                    </select>
                  </label>
                </div>
                <div className="border-t border-[#dce3de] p-4">
                  <p className="text-[9px] leading-4 text-[#76857c]">
                    La presentación, stock y condiciones de importación se
                    validan antes de confirmar el pedido.
                  </p>
                </div>
              </aside>
              <div className="min-w-0">
                <div
                  id="catalog-results"
                  className="scroll-mt-28 flex items-center justify-between border-b border-[#d7dfd9] pb-3"
                >
                  <p className="text-[11px] font-semibold text-[#385344]">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "resultado" : "resultados"}
                  </p>
                  <span className="text-[9px] font-medium text-[#829087]">
                    Página {currentPage} de {pageCount}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {pageProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        onAdd={add}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                {filtered.length > PAGE_SIZE && (
                  <nav
                    aria-label="Paginación del catálogo"
                    className="mt-9 flex flex-wrap items-center justify-center gap-1.5"
                  >
                    {currentPage === 1 ? (
                      <span
                        aria-disabled="true"
                        className="grid h-9 w-9 place-items-center border border-[#ceded3] bg-white text-[#285b41] opacity-35"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </span>
                    ) : (
                      <Link
                        href={paginationHref(currentPage - 1)}
                        onClick={() => goToPage(currentPage - 1)}
                        aria-label="Página anterior"
                        className="grid h-9 w-9 place-items-center border border-[#ceded3] bg-white text-[#285b41] transition hover:border-[#78a48a] hover:bg-[#eff6f1]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                    )}
                    {pageItems.map((page, index) => (
                      <div key={page} className="contents">
                        {index > 0 && pageItems[index - 1] !== page - 1 && (
                          <span className="px-1 text-[#8b9b91]">…</span>
                        )}
                        <Link
                          href={paginationHref(page)}
                          onClick={() => goToPage(page)}
                          aria-current={
                            page === currentPage ? "page" : undefined
                          }
                          className={`grid h-9 min-w-9 place-items-center px-3 text-xs font-semibold transition ${page === currentPage ? "bg-[#14744d] text-white" : "border border-[#ceded3] bg-white text-[#486052] hover:border-[#78a48a] hover:bg-[#eff6f1]"}`}
                        >
                          {page}
                        </Link>
                      </div>
                    ))}
                    {currentPage === pageCount ? (
                      <span
                        aria-disabled="true"
                        className="grid h-9 w-9 place-items-center border border-[#ceded3] bg-white text-[#285b41] opacity-35"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    ) : (
                      <Link
                        href={paginationHref(currentPage + 1)}
                        onClick={() => goToPage(currentPage + 1)}
                        aria-label="Página siguiente"
                        className="grid h-9 w-9 place-items-center border border-[#ceded3] bg-white text-[#285b41] transition hover:border-[#78a48a] hover:bg-[#eff6f1]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </nav>
                )}
                {!filtered.length && (
                  <div className="mt-5 rounded-[28px] border border-dashed border-[#cbd9cf] bg-white px-6 py-16 text-center">
                    <Search className="mx-auto h-8 w-8 text-[#84a08f]" />
                    <h3 className="mt-4 text-lg font-bold">
                      No encontramos esa referencia
                    </h3>
                    <p className="mt-2 text-sm text-[#74857b]">
                      Prueba con otro término o solicita una búsqueda especial.
                    </p>
                  </div>
                )}

                <p className="mt-7 border-l-2 border-[#d5a34f] bg-[#fff9ee] px-4 py-3 text-[10px] leading-5 text-[#715b35]">
                  <strong>Precios referenciales desde.</strong> Un asesor
                  confirmará presentación, impuestos, stock, cadena de frío y
                  condiciones de importación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {pageConfig && (
          <section
            data-navbar-theme="light"
            className="border-t border-[#dfe8e2] bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
          >
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">
                  Preguntas frecuentes
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-.03em] text-[#173f2d] sm:text-3xl">
                  Antes de solicitar una cotización
                </h2>
              </div>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {pageConfig.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-[20px] border border-[#dce7df] bg-[#f8faf8] p-5 open:bg-white open:shadow-sm"
                  >
                    <summary className="cursor-pointer list-none pr-6 text-sm font-bold leading-6 text-[#264b39] marker:content-none">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="float-right -mr-6 text-[#168158] transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-xs leading-6 text-[#687a70]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          data-navbar-theme="dark"
          className="bg-[#062b22] px-5 py-14 text-white sm:px-8 sm:py-16"
        >
          <div className="mx-auto grid max-w-[1360px] border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Beaker,
                title: "Selección técnica",
                text: "Referencias filtradas según aplicación y protocolo.",
              },
              {
                icon: PackageCheck,
                title: "Importación coordinada",
                text: "Validamos stock, conservación y tiempo de entrega.",
              },
              {
                icon: Truck,
                title: "Envío referencial",
                text:
                  pageConfig?.scope === "laboratorio"
                    ? "S/360 por pedido, sujeto a destino y condiciones."
                    : "S/250 por pedido, sujeto a destino y condiciones.",
              },
              {
                icon: TestTube2,
                title: "Soporte molecular",
                text: "Acompañamiento para elegir kits y reactivos.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="min-h-[170px] border-b border-r border-white/15 p-5 sm:p-6"
              >
                <item.icon className="h-5 w-5 text-[#d5a34f]" />
                <h3 className="mt-7 text-sm font-medium">{item.title}</h3>
                <p className="mt-2 text-[10px] leading-5 text-white/52">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label={`Abrir pedido, ${itemCount} productos`}
        className="fixed bottom-5 right-4 z-[120] inline-flex min-h-14 items-center gap-3 rounded-full bg-[#173f2d] px-5 text-sm font-bold text-white shadow-[0_18px_50px_-16px_rgba(5,45,31,.75)] transition hover:-translate-y-1 sm:bottom-7 sm:right-7"
      >
        <ShoppingCart className="h-5 w-5" />
        Pedido
        {itemCount > 0 && (
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#d9f4df] px-1 text-[10px] text-[#173f2d]">
            {itemCount}
          </span>
        )}
      </button>
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onSet={setQuantity}
      />
      <Footer />
    </>
  );
}

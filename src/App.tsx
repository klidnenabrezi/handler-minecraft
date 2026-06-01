import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  CreditCard,
  DatabaseBackup,
  Gamepad2,
  Headphones,
  MessageCircle,
  MonitorCog,
  PackageCheck,
  QrCode,
  ReceiptText,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Smartphone,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const useCases = [
  {
    key: "smp",
    title: "Private SMP",
    subtitle: "Small friend group, vanilla-first, low maintenance.",
    recommendation: "Cow",
  },
  {
    key: "modded",
    title: "Modded Survival",
    subtitle: "Forge/Fabric, datapacks, heavier memory needs.",
    recommendation: "Horse",
  },
  {
    key: "creator",
    title: "Creator Community",
    subtitle: "Discord community, scheduled events, plugin stack.",
    recommendation: "Fox",
  },
  {
    key: "event",
    title: "Event / Minigames",
    subtitle: "Short-term event server with ops assistance.",
    recommendation: "Bee",
  },
];

const packages = [
  {
    name: "Chicken",
    ram: "1 GB RAM",
    storage: "5 GB NVMe",
    players: "Up to 10",
    price: 24999,
    bestFor: "Tiny vanilla worlds",
    tag: "Entry",
  },
  {
    name: "Cow",
    ram: "2 GB RAM",
    storage: "15 GB NVMe",
    players: "Up to 15",
    price: 39999,
    bestFor: "Private SMP",
    tag: "Starter",
  },
  {
    name: "Horse",
    ram: "4 GB RAM",
    storage: "30 GB NVMe",
    players: "Up to 25",
    price: 59999,
    bestFor: "Plugins / light mods",
    tag: "Recommended",
    featured: true,
  },
  {
    name: "Fox",
    ram: "8 GB RAM",
    storage: "50 GB NVMe",
    players: "Up to 40",
    price: 89999,
    bestFor: "Active communities",
    tag: "Creator",
  },
  {
    name: "Bee",
    ram: "12 GB RAM",
    storage: "80 GB NVMe",
    players: "Up to 60",
    price: 129999,
    bestFor: "Events / minigames",
    tag: "Scale",
  },
  {
    name: "Creeper",
    ram: "16 GB RAM",
    storage: "100 GB NVMe",
    players: "80+",
    price: 169999,
    bestFor: "Public server ops",
    tag: "Ops",
  },
];

const addOns = [
  { key: "backup", name: "Daily World Backup", desc: "7-day rolling backup window", price: 15000, icon: DatabaseBackup },
  { key: "setup", name: "Plugin / Modpack Setup", desc: "Handler checks and installs baseline stack", price: 30000, icon: MonitorCog },
  { key: "support", name: "Priority Launch Support", desc: "WhatsApp launch support for first setup", price: 20000, icon: Headphones },
];

const handoffSteps = [
  {
    icon: SlidersHorizontal,
    title: "Choose your play style",
    text: "Pick SMP, modded survival, creator community, or event hosting. No need to understand infra first.",
  },
  {
    icon: MessageCircle,
    title: "Handler reviews the request",
    text: "We check player count, plugin/mod requirements, backup needs, and launch timeline.",
  },
  {
    icon: MonitorCog,
    title: "Server gets configured",
    text: "Handler provisions the setup, applies baseline configs, and prepares the handoff package.",
  },
  {
    icon: PackageCheck,
    title: "Launch with support",
    text: "You receive access details, basic guidance, and a support path for future changes.",
  },
];

function formatIDR(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("IDR", "Rp");
}

export default function HandlerMinecraftHostingPrototype() {
  const [selectedUseCase, setSelectedUseCase] = useState(useCases[1]);
  const [selectedPackage, setSelectedPackage] = useState(packages[2]);
  const [billing, setBilling] = useState("Monthly");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState(["backup"]);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [customerName, setCustomerName] = useState("Brezcraft SMP");
  const [whatsapp, setWhatsapp] = useState("+62 812-0000-0000");
  const [serverAddress, setServerAddress] = useState("brezcraft.handlerlab.id");

  const basePrice = useMemo(() => {
    return billing === "Quarterly" ? Math.round(selectedPackage.price * 3 * 0.9) : selectedPackage.price;
  }, [selectedPackage, billing]);

  const addOnTotal = useMemo(() => {
    return addOns.filter((item) => selectedAddOns.includes(item.key)).reduce((sum, item) => sum + item.price, 0);
  }, [selectedAddOns]);

  const total = basePrice + addOnTotal;
  const adminFee = paymentMethod === "QRIS" ? 1000 : paymentMethod === "Virtual Account" ? 4000 : 0;
  const grandTotal = total + adminFee;

  const recommendedPackage = packages.find((pkg) => pkg.name === selectedUseCase.recommendation) || packages[2];

  const toggleAddOn = (key) => {
    setSelectedAddOns((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  const openCheckout = () => {
    setCheckoutStep(1);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#14081f] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.34),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.24),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.35),rgba(20,8,31,1))]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10203a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-lg shadow-fuchsia-900/30">
              <span className="text-lg font-black">H</span>
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">HandlerLab</p>
              <p className="-mt-1 text-[11px] font-medium text-white/55">Minecraft Hosting Prototype</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-white/65 md:flex">
            <a href="#use-case" className="transition hover:text-white">Use Case</a>
            <a href="#packages" className="transition hover:text-white">Packages</a>
            <a href="#handoff" className="transition hover:text-white">Handoff</a>
            <a href="#summary" className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/15">Checkout Preview</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 shadow-xl shadow-black/10">
              <Sparkles size={16} className="text-pink-300" />
              New product vertical: game server infrastructure
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Minecraft servers, configured like custom PCs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Handler Minecraft Hosting turns server setup into a guided handoff: choose the experience, tell us your constraints, and let Handler recommend the right performance profile before launch.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#use-case" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-3 font-bold shadow-xl shadow-fuchsia-950/30 transition hover:-translate-y-0.5">
                Start Configuration <ArrowRight size={18} />
              </a>
              <button onClick={openCheckout} className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/85 transition hover:bg-white/10">
                Go to Checkout
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#0f172a]/80 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50">Recommended setup</p>
                  <h2 className="text-2xl font-black">{recommendedPackage.name} Profile</h2>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] p-3">
                  <Server size={24} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Memory", recommendedPackage.ram, Cpu],
                  ["Storage", recommendedPackage.storage, Server],
                  ["Players", recommendedPackage.players, Users],
                  ["Ops Layer", "Guided Handoff", Headphones],
                ].map(([label, value, Icon]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon size={18} className="mb-3 text-pink-300" />
                    <p className="text-xs uppercase tracking-wider text-white/40">{label}</p>
                    <p className="mt-1 font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-fuchsia-300/20 bg-gradient-to-r from-violet-500/10 to-pink-500/10 p-4">
                <p className="text-sm font-bold text-pink-100">Handler Fit Check</p>
                <p className="mt-1 text-sm leading-6 text-white/60">
                  Based on your selected use case, this setup balances player capacity, plugin/mod headroom, and launch complexity.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="use-case" className="mx-auto max-w-7xl px-5 py-12">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 font-bold text-pink-300">1. Guided Selection</p>
            <h2 className="text-3xl font-black md:text-5xl">Start with the world, not the RAM number.</h2>
            <p className="mt-4 text-white/60">Most hosts make users pick specs first. Handler starts from the actual Minecraft experience, then maps that into a practical server profile.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSelectedUseCase(item);
                  const next = packages.find((pkg) => pkg.name === item.recommendation);
                  if (next) setSelectedPackage(next);
                }}
                className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 ${
                  selectedUseCase.key === item.key
                    ? "border-pink-300/50 bg-gradient-to-br from-violet-500/20 to-pink-500/15 shadow-xl shadow-fuchsia-950/20"
                    : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                }`}
              >
                <Gamepad2 className="mb-5 text-pink-300" />
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-white/58">{item.subtitle}</p>
                <p className="mt-4 text-sm font-bold text-white">Recommended: {item.recommendation}</p>
              </button>
            ))}
          </div>
        </section>

        <section id="packages" className="mx-auto max-w-7xl px-5 py-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-2 font-bold text-pink-300">2. Recommended Packages</p>
              <h2 className="text-3xl font-black md:text-5xl">Clear packages, no spreadsheet trauma.</h2>
              <p className="mt-4 text-white/60">Specs are still visible, but the UI explains what each package is actually good for.</p>
            </div>
            <div className="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
              {["Monthly", "Quarterly"].map((item) => (
                <button
                  key={item}
                  onClick={() => setBilling(item)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${billing === item ? "bg-white text-[#14081f]" : "text-white/60 hover:text-white"}`}
                >
                  {item}{item === "Quarterly" ? " -10%" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <button
                key={pkg.name}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative rounded-3xl border p-5 text-left transition hover:-translate-y-1 ${
                  selectedPackage.name === pkg.name
                    ? "border-pink-300/60 bg-white/[0.08] shadow-2xl shadow-fuchsia-950/25"
                    : "border-white/10 bg-white/[0.035] hover:bg-white/[0.06]"
                }`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-pink-300">{pkg.tag}</p>
                    <h3 className="mt-2 text-2xl font-black">{pkg.name}</h3>
                  </div>
                  {pkg.featured && <span className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 text-xs font-black">Best Fit</span>}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#0f172a]/65 p-3"><p className="text-white/40">RAM</p><p className="font-bold">{pkg.ram}</p></div>
                  <div className="rounded-2xl bg-[#0f172a]/65 p-3"><p className="text-white/40">Storage</p><p className="font-bold">{pkg.storage}</p></div>
                  <div className="rounded-2xl bg-[#0f172a]/65 p-3"><p className="text-white/40">Players</p><p className="font-bold">{pkg.players}</p></div>
                  <div className="rounded-2xl bg-[#0f172a]/65 p-3"><p className="text-white/40">Best For</p><p className="font-bold">{pkg.bestFor}</p></div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black">{formatIDR(pkg.price)}</p>
                    <p className="text-xs text-white/45">per month</p>
                  </div>
                  <ChevronRight className="text-white/35" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Operational Trust", text: "Baseline DDoS protection, sensible configs, and clearer ownership of support responsibilities." },
              { icon: DatabaseBackup, title: "Backup Mindset", text: "Minecraft worlds are memories. The UI explicitly positions backup planning as part of the product." },
              { icon: Zap, title: "Performance Fit", text: "Packages are mapped to use cases so users do not overbuy or underbuy blindly." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <item.icon className="mb-5 text-pink-300" />
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="handoff" className="mx-auto max-w-7xl px-5 py-12">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 font-bold text-pink-300">3. Handler Handoff</p>
            <h2 className="text-3xl font-black md:text-5xl">Human-in-the-loop by design.</h2>
            <p className="mt-4 text-white/60">The prototype shows the core Handler philosophy: automation where useful, human review where mistakes would be expensive.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {handoffSteps.map((step, index) => (
              <div key={step.title} className="relative rounded-3xl border border-white/10 bg-[#0f172a]/70 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                    <step.icon size={22} />
                  </div>
                  <span className="text-4xl font-black text-white/10">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="summary" className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/20 backdrop-blur-xl lg:grid-cols-[1fr_0.75fr]">
            <div className="p-7 md:p-10">
              <p className="mb-2 font-bold text-pink-300">4. Checkout Flow</p>
              <h2 className="text-3xl font-black md:text-5xl">From package choice to paid order.</h2>
              <p className="mt-4 max-w-2xl text-white/60">The checkout prototype continues the flow into customer details, add-ons, payment method, and paid confirmation while still keeping Handler's guided review model.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Customer and server identity captured",
                  "Optional add-ons selected",
                  "QRIS / VA / bank transfer payment",
                  "Paid order becomes Handler Ops ticket",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#0f172a]/60 p-4 text-sm font-semibold text-white/75">
                    <CheckCircle2 size={18} className="text-pink-300" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-white/10 bg-[#0f172a]/85 p-7 md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm text-white/45">Current configuration</p>
              <h3 className="mt-2 text-3xl font-black">{selectedPackage.name}</h3>
              <p className="mt-1 text-white/55">{selectedUseCase.title} · {selectedPackage.bestFor}</p>

              <div className="my-6 space-y-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex justify-between text-sm"><span className="text-white/45">Package</span><span className="font-bold">{selectedPackage.ram}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/45">Storage</span><span className="font-bold">{selectedPackage.storage}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/45">Billing</span><span className="font-bold">{billing}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/45">Add-ons</span><span className="font-bold">{selectedAddOns.length} selected</span></div>
                <div className="border-t border-white/10 pt-4 flex justify-between"><span className="font-bold">Estimated Total</span><span className="font-black text-pink-200">{formatIDR(grandTotal)}</span></div>
              </div>

              <button onClick={openCheckout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-4 font-black shadow-xl shadow-fuchsia-950/25 transition hover:-translate-y-0.5">
                Continue to Checkout <ArrowRight size={18} />
              </button>
              <p className="mt-4 text-center text-xs leading-6 text-white/40">Demo copy: after payment, the order becomes a Handler Ops ticket for review and provisioning.</p>
            </aside>
          </div>
        </section>
      </main>

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md">
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172a] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#10203a]/80 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-300">Handler Checkout</p>
                <h2 className="text-xl font-black">Complete Minecraft Hosting Order</h2>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="rounded-xl bg-white/10 p-2 transition hover:bg-white/15">
                <X size={18} />
              </button>
            </div>

            <div className="grid max-h-[calc(92vh-72px)] overflow-y-auto lg:grid-cols-[1fr_390px]">
              <div className="p-5 md:p-8">
                <div className="mb-8 grid grid-cols-3 gap-3">
                  {[
                    [1, "Details"],
                    [2, "Payment"],
                    [3, "Confirmation"],
                  ].map(([step, label]) => (
                    <div key={step} className={`rounded-2xl border p-3 ${checkoutStep >= step ? "border-pink-300/40 bg-gradient-to-r from-violet-500/15 to-pink-500/10" : "border-white/10 bg-white/[0.03]"}`}>
                      <p className="text-xs text-white/45">Step {step}</p>
                      <p className="font-black">{label}</p>
                    </div>
                  ))}
                </div>

                {checkoutStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                    <p className="mb-2 font-bold text-pink-300">Customer Details</p>
                    <h3 className="text-3xl font-black">Name the server, then attach the ops context.</h3>
                    <p className="mt-3 text-white/55">For a real Handler build, these fields would become the initial ticket snapshot.</p>

                    <div className="mt-7 grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-white/70">Project / community name</span>
                        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-pink-300/30 transition focus:ring-4" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-white/70">WhatsApp contact</span>
                        <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-pink-300/30 transition focus:ring-4" />
                      </label>
                      <label className="block md:col-span-2">
                        <span className="mb-2 block text-sm font-bold text-white/70">Preferred server address</span>
                        <input value={serverAddress} onChange={(e) => setServerAddress(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-pink-300/30 transition focus:ring-4" />
                      </label>
                    </div>

                    <div className="mt-8">
                      <p className="mb-3 font-black">Launch add-ons</p>
                      <div className="grid gap-3 md:grid-cols-3">
                        {addOns.map((item) => (
                          <button key={item.key} onClick={() => toggleAddOn(item.key)} className={`rounded-3xl border p-4 text-left transition hover:-translate-y-1 ${selectedAddOns.includes(item.key) ? "border-pink-300/50 bg-pink-500/10" : "border-white/10 bg-white/[0.04]"}`}>
                            <item.icon className="mb-4 text-pink-300" />
                            <h4 className="font-black">{item.name}</h4>
                            <p className="mt-2 min-h-[44px] text-sm text-white/50">{item.desc}</p>
                            <p className="mt-4 font-black text-pink-100">+ {formatIDR(item.price)}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                    <p className="mb-2 font-bold text-pink-300">Payment</p>
                    <h3 className="text-3xl font-black">Choose how the invoice gets paid.</h3>
                    <p className="mt-3 text-white/55">Prototype payment screen. In production this would be connected to a payment gateway or manual invoice verification.</p>

                    <div className="mt-7 grid gap-4 md:grid-cols-3">
                      {[
                        { name: "QRIS", desc: "Fast wallet scan", icon: QrCode },
                        { name: "Virtual Account", desc: "Bank app transfer", icon: Smartphone },
                        { name: "Manual Transfer", desc: "Upload proof later", icon: Wallet },
                      ].map((method) => (
                        <button key={method.name} onClick={() => setPaymentMethod(method.name)} className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 ${paymentMethod === method.name ? "border-pink-300/50 bg-gradient-to-br from-violet-500/20 to-pink-500/15" : "border-white/10 bg-white/[0.04]"}`}>
                          <method.icon className="mb-5 text-pink-300" />
                          <h4 className="font-black">{method.name}</h4>
                          <p className="mt-2 text-sm text-white/55">{method.desc}</p>
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                      {paymentMethod === "QRIS" ? (
                        <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
                          <div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-4 text-[#14081f]">
                            <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-2">
                              {Array.from({ length: 25 }).map((_, index) => (
                                <div key={index} className={`${[0, 1, 5, 6, 18, 19, 23, 24, 12, 14, 20].includes(index) ? "bg-[#14081f]" : "bg-slate-200"} rounded`} />
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-white/45">Scan to pay</p>
                            <h4 className="mt-1 text-2xl font-black">QRIS HandlerLab</h4>
                            <p className="mt-3 text-white/55">Amount is locked to this checkout session. After payment, press confirm to show the successful order state.</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-white/45">Payment instruction</p>
                          <h4 className="mt-1 text-2xl font-black">{paymentMethod}</h4>
                          <div className="mt-4 rounded-2xl bg-[#0f172a]/80 p-4 font-mono text-sm text-pink-100">8808 1200 4599 0012 · HandlerLab</div>
                          <p className="mt-3 text-sm text-white/55">Use the exact total shown in the order summary so verification can be matched automatically.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 3 && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[460px] items-center justify-center">
                    <div className="max-w-2xl text-center">
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-2xl shadow-fuchsia-950/40">
                        <CheckCircle2 size={40} />
                      </div>
                      <p className="font-bold text-pink-300">Payment Received</p>
                      <h3 className="mt-2 text-4xl font-black">Order submitted to Handler Ops.</h3>
                      <p className="mt-4 text-white/60">Your Minecraft hosting request has been paid and converted into a provisioning ticket. Handler will review the configuration before launch.</p>
                      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-left">
                        <div className="flex items-center gap-3">
                          <ReceiptText className="text-pink-300" />
                          <div>
                            <p className="font-black">HL-MC-2026-0427</p>
                            <p className="text-sm text-white/45">Provisioning queue · Estimated handoff: same day / next business day</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
                  <button onClick={() => checkoutStep === 1 ? setCheckoutOpen(false) : setCheckoutStep(checkoutStep - 1)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                    <ArrowLeft size={18} /> {checkoutStep === 1 ? "Back to page" : "Previous"}
                  </button>
                  {checkoutStep < 3 ? (
                    <button onClick={() => setCheckoutStep(checkoutStep + 1)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-3 font-black shadow-xl shadow-fuchsia-950/25 transition hover:-translate-y-0.5">
                      {checkoutStep === 1 ? "Continue to Payment" : "Confirm Payment"} <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button onClick={() => setCheckoutOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-black text-[#14081f] transition hover:-translate-y-0.5">
                      Done <CheckCircle2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              <aside className="border-t border-white/10 bg-[#111827]/75 p-5 lg:border-l lg:border-t-0">
                <p className="mb-4 text-sm font-black text-pink-300">Order Summary</p>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                      <Server />
                    </div>
                    <div>
                      <h4 className="text-xl font-black">{selectedPackage.name}</h4>
                      <p className="text-sm text-white/45">{selectedUseCase.title}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-white/45">Project</span><span className="max-w-[190px] truncate font-bold">{customerName}</span></div>
                    <div className="flex justify-between"><span className="text-white/45">Address</span><span className="max-w-[190px] truncate font-bold">{serverAddress}</span></div>
                    <div className="flex justify-between"><span className="text-white/45">Contact</span><span className="font-bold">{whatsapp}</span></div>
                    <div className="flex justify-between"><span className="text-white/45">Billing</span><span className="font-bold">{billing}</span></div>
                    <div className="border-t border-white/10 pt-3 flex justify-between"><span className="text-white/45">Base</span><span className="font-bold">{formatIDR(basePrice)}</span></div>
                    <div className="flex justify-between"><span className="text-white/45">Add-ons</span><span className="font-bold">{formatIDR(addOnTotal)}</span></div>
                    <div className="flex justify-between"><span className="text-white/45">Payment fee</span><span className="font-bold">{formatIDR(adminFee)}</span></div>
                    <div className="border-t border-white/10 pt-4 flex justify-between text-lg"><span className="font-black">Total</span><span className="font-black text-pink-200">{formatIDR(grandTotal)}</span></div>
                  </div>
                </div>

                <div className="mt-4 rounded-[2rem] border border-pink-300/20 bg-gradient-to-r from-violet-500/10 to-pink-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-pink-100">
                    <ShieldCheck size={17} /> Handler Promise
                  </div>
                  <p className="text-sm leading-6 text-white/55">Payment confirms the slot. Provisioning still gets reviewed by Handler before launch so the server is not blindly deployed with the wrong assumptions.</p>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

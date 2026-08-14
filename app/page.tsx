"use client";

import { useEffect, useRef, useState } from "react";

const BOT_URL = "https://t.me/WolfPN_bot?start=ref_REF-3CF3E36D";
const REGISTRATION_URL = "https://wolfpn-v2.com/cabinet/register?ref=REF-3CF3E36D";
const SUPPORT_URL = "https://t.me/WolfPNsupport_bot";

const plans = [
  {
    term: "1 месяц",
    oldPrice: null,
    price: "279 ₽",
    rate: "9,3 ₽ / день",
    note: "Для знакомства",
    features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"],
  },
  {
    term: "3 месяца",
    oldPrice: "837 ₽",
    price: "749 ₽",
    rate: "249 ₽ / месяц",
    note: "Экономия 88 ₽",
    features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"],
  },
  {
    term: "6 месяцев",
    oldPrice: "1 674 ₽",
    price: "1 399 ₽",
    rate: "233 ₽ / месяц",
    note: "Экономия 275 ₽",
    features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"],
  },
  {
    term: "12 месяцев",
    oldPrice: "3 348 ₽",
    price: "2 499 ₽",
    rate: "208 ₽ / месяц · 6,8 ₽ / день",
    note: "Максимальная выгода",
    features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"],
    featured: true,
  },
];

const unblockPlans = [
  { traffic: "90 ГБ", price: "419 ₽", rate: "13,9 ₽ / день", featured: false },
  { traffic: "150 ГБ", price: "649 ₽", rate: "21,6 ₽ / день", featured: false },
  { traffic: "200 ГБ", price: "699 ₽", rate: "Самый выгодный", featured: true },
];

const unlimitedUnblockPlans = [
  { term: "15 дней", price: "449 ₽", rate: "≈ 29,9 ₽ / день", featured: false },
  { term: "30 дней", price: "777 ₽", rate: "25,9 ₽ / день", featured: true },
];

const vpnServices = [
  { key: "wolf", name: "WolfPN", mark: "W", tone: "wolf" },
  { key: "nord", name: "NordVPN", mark: "N", tone: "nord" },
  { key: "express", name: "ExpressVPN", mark: "E", tone: "express" },
  { key: "proton", name: "Proton VPN", mark: "P", tone: "proton" },
  { key: "private", name: "PrivateVPN", mark: "V", tone: "private" },
  { key: "pure", name: "PureVPN", mark: "P", tone: "pure" },
];

const faq = [
  {
    question: "Можно ли проверить WolfPN до оплаты?",
    answer:
      "Да. Откройте Telegram-бота и получите пробный доступ, чтобы проверить скорость и стабильность подключения на своём устройстве.",
  },
  {
    question: "На каких устройствах работает WolfPN?",
    answer:
      "WolfPN можно подключить на iOS, Android, Windows и macOS. В Telegram-боте есть понятная инструкция для каждой платформы.",
  },
  {
    question: "Сохраняется ли история посещённых сайтов?",
    answer:
      "WolfPN придерживается политики без логов посещений. Интернет-трафик передаётся через защищённый VPN-канал.",
  },
  {
    question: "Подойдёт ли VPN для видео, работы и игр?",
    answer:
      "Да. WolfPN рассчитан на повседневные задачи, видеосервисы, мессенджеры, удалённую работу и игры. Итоговая скорость зависит также от провайдера и выбранной локации.",
  },
  {
    question: "Можно ли подключить несколько устройств?",
    answer:
      "Да. Одна подписка работает максимум на четырёх устройствах. Дополнительные устройства можно докупить после приобретения подписки.",
  },
  {
    question: "Что делать, если VPN не подключается?",
    answer:
      "Напишите в Telegram-поддержку WolfPN. Поможем выбрать локацию и пройти настройку на вашем устройстве.",
  },
  {
    question: "Чем отличаются Стандартная, Unblock и Безлимитный Unblock?",
    answer:
      "Стандартная подписка даёт доступ ко всем локациям без лимита трафика. Unblock рассчитан на 30 дней и предлагает 90, 150 или 200 ГБ для регионов с ограничениями мобильного интернета. Безлимитный Unblock доступен на 15 или 30 дней без лимита трафика.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

function CheckIcon({ muted = false }: { muted?: boolean }) {
  return (
    <span className={`check${muted ? " check-muted" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-9" /></svg>
    </span>
  );
}

function CrossIcon() {
  return <span className="cross" aria-hidden="true">×</span>;
}

function CompareValue({ value }: { value: "yes" | "no" | "dash" | "terms" | "free" }) {
  if (value === "yes") return <CheckIcon />;
  if (value === "no") return <CrossIcon />;
  if (value === "terms") return <span className="compare-pill">По условиям</span>;
  if (value === "free") return <span className="compare-pill compare-pill-free">Есть Free</span>;
  return <span className="dash" aria-label="Не является стандартной опцией">—</span>;
}

function ServiceBrand({ service }: { service: (typeof vpnServices)[number] }) {
  return (
    <span className={`service-brand service-${service.tone}`}>
      {service.key === "wolf" ? <BrandArtwork decorative /> : <i aria-hidden="true">{service.mark}</i>}
      <strong>{service.name}</strong>
    </span>
  );
}

function LogoMark() {
  return (
    <svg className="logo-mark" aria-hidden="true" viewBox="0 0 44 50">
      <path d="M3 4h38v27L22 46 3 31V4Z" />
      <path d="m11 15 5 17 6-10 6 10 5-17" />
    </svg>
  );
}

function BrandArtwork({ decorative = false }: { decorative?: boolean }) {
  return (
    <span className="brand-artwork" aria-hidden={decorative || undefined}>
      <img
        src="/media/wolf-brand.webp"
        alt={decorative ? "" : "WOLF Private Network"}
        width="640"
        height="640"
        decoding="async"
      />
    </span>
  );
}

function FeatureIcon({ type }: { type: "lock" | "eye" | "devices" | "support" | "speed" }) {
  const paths = {
    lock: <><rect x="7" y="13" width="18" height="15" rx="3" /><path d="M11 13V9a5 5 0 0 1 10 0v4M16 19v4" /></>,
    eye: <><path d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16Z" /><circle cx="16" cy="16" r="3" /><path d="m5 27 22-22" /></>,
    devices: <><rect x="3" y="7" width="19" height="14" rx="2" /><rect x="21" y="11" width="8" height="16" rx="2" /><path d="M9 26h7M12.5 21v5" /></>,
    support: <><path d="M5 17a11 11 0 0 1 22 0v7h-6v-8h6M5 16h6v8H5v-8Z" /><path d="M21 27c-2 1.4-4 2-7 2" /></>,
    speed: <><path d="M5 24a12 12 0 1 1 22 0M16 22l7-9" /><circle cx="16" cy="22" r="2" /></>,
  };
  return <svg viewBox="0 0 32 32" aria-hidden="true">{paths[type]}</svg>;
}

function Header({ onConnect }: { onConnect: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState<"ru" | "en">("ru");

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 620) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const menuText = menuLanguage === "ru"
    ? { home: "Главная", prices: "Тарифы", benefits: "Преимущества", about: "Про VPN", support: "Поддержка", connect: "Подключить WolfPN" }
    : { home: "Home", prices: "Plans", benefits: "Benefits", about: "About VPN", support: "Support", connect: "Connect WolfPN" };

  return (
    <header className="site-header shell">
      <a href="#home" className="brand header-brand" aria-label="WolfPN — на главную">
        <BrandArtwork decorative />
        <span>WOLFPN</span>
      </a>
      <nav className="desktop-nav" aria-label="Навигация по сайту">
        <a href="#home">Главная</a>
        <a href="#prices">Тарифы</a>
        <a href="#advantages">Преимущества</a>
        <a href="#comparison">Сравнение</a>
        <a href="#privacy">О VPN</a>
        <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Поддержка</a>
      </nav>
      <div className="header-actions">
        <span className="header-chip">RU</span>
        <span className="header-chip">₽ RUB</span>
        <button className="header-install" type="button" onClick={onConnect}>Подключить</button>
      </div>
      <button
        className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
      <nav id="mobile-navigation" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Мобильная навигация">
        <div className="mobile-nav-links">
          <a href="#home" onClick={closeMenu}>{menuText.home}</a>
          <a href="#prices" onClick={closeMenu}>{menuText.prices}</a>
          <a href="#advantages" onClick={closeMenu}>{menuText.benefits}</a>
          <a href="#privacy" onClick={closeMenu}>{menuText.about}</a>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>{menuText.support}</a>
        </div>
        <div className="mobile-nav-footer">
          <div className="mobile-languages" aria-label="Язык меню">
            <button className={menuLanguage === "ru" ? "is-active" : ""} type="button" onClick={() => setMenuLanguage("ru")}>RU</button>
            <button className={menuLanguage === "en" ? "is-active" : ""} type="button" onClick={() => setMenuLanguage("en")}>EN</button>
          </div>
          <button className="mobile-nav-connect" type="button" onClick={() => { closeMenu(); onConnect(); }}>
            {menuText.connect} <ArrowIcon />
          </button>
        </div>
      </nav>
    </header>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 4 3.8 10.7c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.7.1 1 .9 1 .6 0 .9-.3 1.2-.6l2.1-2 4.5 3.3c.8.5 1.4.2 1.6-.8L23 5.3C23.3 4.1 22.5 3.5 21 4Z" />
      <path d="m8 13.6 10.7-6.7c.5-.3 1-.1.6.3l-8.8 8-.3 3.2L8 13.6Z" />
    </svg>
  );
}

function BrowserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
    </svg>
  );
}

function ConnectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="connect-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="connect-modal" role="dialog" aria-modal="true" aria-labelledby="connect-title">
        <button ref={closeButtonRef} className="connect-close" type="button" onClick={onClose} aria-label="Закрыть окно">×</button>

        <div className="connect-brand">
          <BrandArtwork />
          <div><strong>WOLFPN</strong><span>Private Network</span></div>
        </div>
        <p className="connect-kicker">Подключение</p>
        <h2 id="connect-title">Как вам удобнее начать?</h2>
        <p className="connect-lead">Выберите быстрый запуск через Telegram или регистрацию на сайте.</p>

        <div className="connect-options">
          <a className="connect-option connect-option-telegram" href={BOT_URL} target="_blank" rel="noreferrer">
            <span className="connect-option-icon"><TelegramIcon /></span>
            <span><strong>Telegram-бот</strong><small>Быстрое подключение и инструкции</small></span>
            <ArrowIcon />
          </a>

          {REGISTRATION_URL ? (
            <a className="connect-option" href={REGISTRATION_URL} target="_blank" rel="noreferrer">
              <span className="connect-option-icon"><BrowserIcon /></span>
              <span><strong>Регистрация на сайте</strong><small>Создать доступ через браузер</small></span>
              <ArrowIcon />
            </a>
          ) : (
            <button className="connect-option connect-option-pending" type="button" disabled>
              <span className="connect-option-icon"><BrowserIcon /></span>
              <span><strong>Регистрация на сайте</strong><small>Ожидаю вашу вторую ссылку</small></span>
              <span className="connect-soon">Скоро</span>
            </button>
          )}
        </div>

        <p className="connect-footnote">Переход ведёт на официальный сервис WOLF Private Network.</p>
      </section>
    </div>
  );
}

export default function Home() {
  const [connectOpen, setConnectOpen] = useState(false);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const showImmediately = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)").matches;

    if (showImmediately || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7%" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <Header onConnect={() => setConnectOpen(true)} />

        <div className="hero-copy shell">
          <p className="hero-wordmark" aria-label="WolfPN">WOLFPN</p>
          <h1 id="hero-title">Шифрование для вашей свободы</h1>
          <p className="hero-lead">
            Быстрый и приватный VPN для телефона и компьютера. Защищённое
            подключение через Telegram без сложной настройки.
          </p>

          <div className="hero-features" aria-label="Ключевые возможности WolfPN">
            <span><i><FeatureIcon type="lock" /></i>AES-256</span>
            <span><i><FeatureIcon type="eye" /></i>Без логов</span>
            <span><i><FeatureIcon type="speed" /></i>Тест бесплатно</span>
            <span><i><FeatureIcon type="devices" /></i>Любые устройства</span>
            <a href={SUPPORT_URL} target="_blank" rel="noreferrer"><i><FeatureIcon type="support" /></i>Поддержка 24/7</a>
          </div>

          <button className="button button-black hero-button" type="button" onClick={() => setConnectOpen(true)}>
            Подключить WolfPN <ArrowIcon />
          </button>
        </div>

        <div className="hero-stage shell" aria-label="WolfPN на смартфоне">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-hand hero-hand-left" aria-hidden="true" />
          <div className="phone phone-hero" aria-hidden="true">
            <div className="phone-island" />
            <div className="phone-status"><span>16:44</span><span>5G&nbsp;&nbsp;85%</span></div>
            <div className="phone-brand"><LogoMark /><span>WOLFPN</span></div>
            <div className="phone-map">
              <span className="map-line line-one" /><span className="map-line line-two" />
              <span className="map-line line-three" /><i />
            </div>
            <div className="phone-timer">00:07:45<small>Соединение защищено</small></div>
            <div className="phone-panel">
              <div><span>Локация</span><strong>Оптимальный сервер</strong></div>
              <div><span>Статус</span><strong>Подключено</strong></div>
            </div>
            <div className="phone-nav"><span>◉</span><span>⌂</span><span>⚙</span></div>
          </div>
          <div className="hero-hand hero-hand-right" aria-hidden="true" />
        </div>
      </section>

      <section className="quick-benefits reveal-section" id="advantages" aria-labelledby="benefits-title" data-reveal>
        <div className="shell">
          <p className="section-kicker">Преимущества</p>
          <h2 id="benefits-title">Полный доступ.<br />Ничего лишнего.</h2>
          <div className="benefit-strip">
            <article><FeatureIcon type="speed" /><h3>Стабильная скорость</h3><p>Для видео, общения, работы и игр.</p></article>
            <article><FeatureIcon type="lock" /><h3>Защищённый канал</h3><p>Шифрование соединения по стандарту AES-256.</p></article>
            <article><FeatureIcon type="devices" /><h3>На ваших устройствах</h3><p>iOS, Android, Windows и macOS.</p></article>
            <article><FeatureIcon type="support" /><h3>Помощь 24/7</h3><p><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Поддержка и настройка через Telegram.</a></p></article>
          </div>
        </div>
      </section>

      <section className="pricing-section reveal-section" id="prices" aria-labelledby="pricing-title" data-reveal>
        <div className="shell">
          <p className="section-kicker">Тарифы</p>
          <h2 id="pricing-title">Выберите тип подписки</h2>
          <p className="section-lead">Стандартный доступ для повседневного VPN или Unblock для регионов с ограничениями мобильного интернета.</p>

          <div className="subscription-guide" aria-label="Типы подписок WolfPN">
            <a href="#standard"><span className="guide-icon">◎</span><div><strong>Стандартная</strong><p>Все локации, без лимита трафика</p></div><em>от 208 ₽ / месяц</em></a>
            <a href="#unblock"><span className="guide-icon">▣</span><div><strong>Unblock</strong><p>90, 150 или 200 ГБ на 30 дней</p></div><em>от 419 ₽</em></a>
            <a href="#unlimited-unblock"><span className="guide-icon">∞</span><div><strong>Безлимитный Unblock</strong><p>Без ограничений по трафику</p></div><em>от 449 ₽</em></a>
          </div>

          <div className="tariff-family-heading" id="standard">
            <div><span>01 / Стандартная</span><h3>Доступ ко всем локациям</h3></div>
            <p>Без ограничений по трафику и скорости. Одна подписка — до четырёх устройств.</p>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <article className={`plan-card${plan.featured ? " plan-featured" : ""}`} key={plan.term}>
                {plan.featured && <span className="plan-ribbon">Выгодное предложение</span>}
                <div className="plan-content">
                  <p className="plan-note">{plan.note}</p>
                  <h3>{plan.term}</h3>
                  {plan.oldPrice && <del className="plan-old-price">{plan.oldPrice}</del>}
                  <p className="plan-price">{plan.price}</p>
                  <p className="plan-rate">{plan.rate}</p>
                  <div className="plan-divider" />
                  <ul>
                    {plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}
                    <li><CheckIcon /><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Поддержка в Telegram</a></li>
                  </ul>
                  <button className={plan.featured ? "plan-button plan-button-accent" : "plan-button"} type="button" onClick={() => setConnectOpen(true)}>
                    Подключить
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="unblock-family" id="unblock">
            <div className="tariff-family-heading unblock-heading">
              <div><span>02 / Unblock</span><h3>Оставайтесь на связи</h3></div>
              <p>Тариф на 30 дней для регионов, где действуют ограничения мобильного интернета и белые списки.</p>
            </div>

            <div className="unblock-grid">
              {unblockPlans.map((plan) => (
                <article className={`unblock-card${plan.featured ? " unblock-featured" : ""}`} key={plan.traffic}>
                  {plan.featured && <span className="unblock-badge">Самый выгодный</span>}
                  <div className="unblock-card-top"><span>30 дней</span><strong>{plan.traffic}</strong></div>
                  <p className="unblock-price">{plan.price}</p>
                  <p className="unblock-rate">{plan.rate}</p>
                  <ul>
                    <li><CheckIcon />Лимит трафика: {plan.traffic}</li>
                    <li><CheckIcon />До 4 устройств</li>
                    <li><CheckIcon />Нет рекламы на YouTube</li>
                    <li><CheckIcon /><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Помощь в Telegram</a></li>
                  </ul>
                  <button className="unblock-button" type="button" onClick={() => setConnectOpen(true)}>Выбрать {plan.traffic}<ArrowIcon /></button>
                </article>
              ))}
            </div>

            <div className="unblock-info">
              <div><strong>Когда поможет</strong><p>Если в регионе периодически действуют ограничения мобильного интернета или стандартные локации уже не подключаются.</p></div>
              <div className="unblock-warning"><strong>Важно</strong><p>Если не работают даже сайты из белого списка — ВК, Яндекс или Госуслуги — Unblock технически может не помочь.</p></div>
            </div>
          </div>

          <div className="unblock-family unlimited-family" id="unlimited-unblock">
            <div className="tariff-family-heading unblock-heading">
              <div><span>03 / Безлимитный Unblock</span><h3>Трафик без ограничений</h3></div>
              <p>Unblock без необходимости следить за остатком гигабайт — на 15 или 30 дней.</p>
            </div>

            <div className="unlimited-grid">
              {unlimitedUnblockPlans.map((plan) => (
                <article className={`unblock-card unlimited-card${plan.featured ? " unblock-featured" : ""}`} key={plan.term}>
                  {plan.featured && <span className="unblock-badge">Лучший выбор</span>}
                  <div className="unblock-card-top"><span>Безлимитный трафик</span><strong>{plan.term}</strong></div>
                  <p className="unblock-price">{plan.price}</p>
                  <p className="unblock-rate">{plan.rate}</p>
                  <ul>
                    <li><CheckIcon />Без лимита трафика</li>
                    <li><CheckIcon />До 4 устройств</li>
                    <li><CheckIcon />Нет рекламы на YouTube</li>
                    <li><CheckIcon /><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Помощь в Telegram</a></li>
                  </ul>
                  <button className="unblock-button" type="button" onClick={() => setConnectOpen(true)}>Выбрать {plan.term}<ArrowIcon /></button>
                </article>
              ))}
            </div>

            <div className="unblock-info">
              <div><strong>Без подсчёта ГБ</strong><p>Подходит для регулярного использования в регионах с ограничениями мобильного интернета.</p></div>
              <div className="unblock-warning"><strong>Обратите внимание</strong><p>Тариф может не помочь, если недоступны сайты белого списка, и не предназначен для постоянного активного торрент-трафика.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-section reveal-section" id="comparison" aria-labelledby="comparison-title" data-reveal>
        <div className="shell">
          <p className="section-kicker">Сравнение</p>
          <h2 id="comparison-title">WolfPN среди популярных VPN</h2>
          <p className="section-lead">Сравниваем понятные продуктовые возможности: как начинается подключение, где получить помощь и какие варианты доступа доступны.</p>

          <div className="service-rail" aria-label="Сервисы в сравнении">
            {vpnServices.map((service) => (
              <div className={`service-card${service.key === "wolf" ? " service-card-wolf" : ""}`} key={service.key}>
                <ServiceBrand service={service} />
                <small>{service.key === "wolf" ? "Наш выбор" : "Популярный сервис"}</small>
              </div>
            ))}
          </div>

          <div className="comparison-wrap">
            <table className="service-comparison">
              <thead>
                <tr>
                  <th scope="col">Критерий</th>
                  {vpnServices.map((service) => (
                    <th scope="col" className={service.key === "wolf" ? "wolf-column" : ""} key={service.key}>
                      <ServiceBrand service={service} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row"><strong>Запуск через Telegram</strong><span>Быстрый старт в привычном мессенджере</span></th><td className="wolf-column"><CompareValue value="yes" /></td><td><CompareValue value="no" /></td><td><CompareValue value="no" /></td><td><CompareValue value="no" /></td><td><CompareValue value="no" /></td><td><CompareValue value="no" /></td></tr>
                <tr><th scope="row"><strong>Версия для основных платформ</strong><span>iOS, Android, Windows и macOS</span></th><td className="wolf-column"><CompareValue value="yes" /></td><td><CompareValue value="yes" /></td><td><CompareValue value="yes" /></td><td><CompareValue value="yes" /></td><td><CompareValue value="yes" /></td><td><CompareValue value="yes" /></td></tr>
                <tr><th scope="row"><strong>Проверка сервиса до покупки</strong><span>Тест, бесплатная версия или условия возврата</span></th><td className="wolf-column"><CompareValue value="yes" /></td><td><CompareValue value="terms" /></td><td><CompareValue value="terms" /></td><td><CompareValue value="terms" /></td><td><CompareValue value="terms" /></td><td><CompareValue value="terms" /></td></tr>
                <tr><th scope="row"><strong>Специализированные Unblock-тарифы</strong><span>Отдельный вариант для региональных ограничений</span></th><td className="wolf-column"><CompareValue value="yes" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td></tr>
                <tr><th scope="row"><strong>Помощь с настройкой в Telegram</strong><span>Русскоязычная поддержка 24/7</span></th><td className="wolf-column"><CompareValue value="yes" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td><td><CompareValue value="dash" /></td></tr>
              </tbody>
            </table>
          </div>
          <p className="comparison-note">Сравнение относится к формату подключения и общедоступным продуктовым опциям. Условия сторонних сервисов могут меняться; товарные знаки принадлежат их владельцам.</p>
        </div>
      </section>

      <section className="risk-section reveal-section" aria-labelledby="risk-title" data-reveal>
        <div className="shell">
          <h2 id="risk-title">Когда обычного подключения недостаточно</h2>
          <p className="risk-lead">Четыре сценария, в которых WolfPN делает подключение удобнее и спокойнее.</p>
          <div className="risk-grid">
            <article className="risk-card">
              <div className="risk-symbol">WI‑FI</div>
              <span className="risk-label">Публичная сеть</span>
              <h3>Кафе, аэропорт или отель</h3>
              <p>В незнакомой сети лучше не оставлять соединение без дополнительной защиты. WolfPN шифрует трафик между устройством и VPN-сервером.</p>
              <div className="risk-result"><CheckIcon />Защищённый канал</div>
            </article>
            <article className="risk-card">
              <div className="risk-symbol">ACCESS</div>
              <span className="risk-label">Ограниченная сеть</span>
              <h3>Привычный сервис недоступен</h3>
              <p>Подключение через другую VPN-локацию меняет сетевой маршрут и помогает вернуть доступ к привычным сайтам и приложениям.</p>
              <div className="risk-result"><CheckIcon />Альтернативный маршрут</div>
            </article>
            <article className="risk-card">
              <div className="risk-symbol">PLAY</div>
              <span className="risk-label">Онлайн-игры</span>
              <h3>Играть комфортнее</h3>
              <p>WolfPN помогает подобрать стабильный маршрут для онлайн-игр и игровых сервисов. Итоговый пинг зависит от провайдера, сервера и расстояния.</p>
              <div className="risk-result"><CheckIcon />Маршрут для игр</div>
            </article>
            <article className="risk-card">
              <div className="risk-symbol">ON</div>
              <span className="risk-label">Всегда на связи</span>
              <h3>VPN можно не отключать</h3>
              <p>Госуслуги, MAX, ВК, Wildberries, Ozon и другие привычные сервисы продолжают открываться, пока WolfPN работает в фоне.</p>
              <div className="risk-result"><CheckIcon />Без постоянных переключений</div>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section reveal-section" id="privacy" aria-labelledby="privacy-title" data-reveal>
        <div className="shell">
          <p className="section-kicker">О WolfPN</p>
          <h2 id="privacy-title">Приватность без сложных слов</h2>
          <p className="section-lead">Понятный сервис для повседневного доступа — без лишних настроек и перегруженных экранов.</p>

          <div className="privacy-layout">
            <div className="privacy-lists">
              <div className="privacy-list">
                <h3>Что защищаем:</h3>
                <p><CheckIcon muted />Интернет-соединение</p>
                <p><CheckIcon muted />Трафик в публичных сетях</p>
                <p><CheckIcon muted />Привычный доступ к сервисам</p>
              </div>
              <div className="privacy-list">
                <h3>Что не усложняем:</h3>
                <p><CheckIcon muted />Подключение на устройстве</p>
                <p><CheckIcon muted />Выбор подходящего тарифа</p>
                <p><CheckIcon muted />Получение помощи</p>
              </div>
              <div className="privacy-list">
                <h3>Как начать:</h3>
                <p><CheckIcon muted />Открыть Telegram-бота</p>
                <p><CheckIcon muted />Получить пробный доступ</p>
                <p><CheckIcon muted />Подключиться по инструкции</p>
              </div>
            </div>

            <div className="privacy-device" aria-label="Приложение WolfPN на смартфоне">
              <div className="privacy-orbit" aria-hidden="true" />
              <div className="phone phone-privacy" aria-hidden="true">
                <div className="phone-island" />
                <div className="phone-brand"><LogoMark /><span>WOLFPN</span></div>
                <div className="privacy-screen-title">Безопасный маршрут</div>
                <div className="route-stack"><span>1&nbsp;&nbsp; Входной сервер</span><span>2&nbsp;&nbsp; Оптимальный маршрут</span><span>3&nbsp;&nbsp; Выходная локация</span></div>
                <div className="screen-button">ПОДКЛЮЧЕНО</div>
              </div>
            </div>

            <div className="privacy-statement">
              <p>WolfPN помогает защитить соединение и не сохраняет историю посещённых сайтов.</p>
              <strong>Без сложной регистрации.<br />Без истории посещений.<br />С поддержкой 24/7.</strong>
              <button className="privacy-connect" type="button" onClick={() => setConnectOpen(true)}>Попробовать WolfPN <ArrowIcon /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="setup-section reveal-section" id="setup" aria-labelledby="setup-title" data-reveal>
        <div className="shell setup-grid">
          <div>
            <p className="section-kicker">Подключение</p>
            <h2 id="setup-title">Три шага — и вы онлайн</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Откройте бота</strong><p>Перейдите в WolfPN через Telegram.</p></div></li>
            <li><span>02</span><div><strong>Получите доступ</strong><p>Выберите тест или подходящий тариф.</p></div></li>
            <li><span>03</span><div><strong>Подключитесь</strong><p>Следуйте инструкции для своего устройства.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="final-cta reveal-section" aria-labelledby="final-cta-title" data-reveal>
        <div className="shell final-cta-card">
          <div className="final-cta-copy">
            <p className="section-kicker">Попробуйте сейчас</p>
            <h2 id="final-cta-title">Проверьте WolfPN на своём интернете</h2>
            <p>Запустите бесплатный тест, оцените скорость на своих устройствах и выберите тариф только после проверки.</p>
            <div className="final-cta-actions">
              <button className="button final-cta-button" type="button" onClick={() => setConnectOpen(true)}>Начать бесплатно <ArrowIcon /></button>
              <a href={SUPPORT_URL} target="_blank" rel="noreferrer"><i className="live-dot" aria-hidden="true" /> Поддержка на связи 24/7</a>
            </div>
          </div>
          <div className="final-cta-visual" aria-hidden="true">
            <div className="cta-orbit cta-orbit-one" />
            <div className="cta-orbit cta-orbit-two" />
            <LogoMark />
            <span>WOLFPN</span>
          </div>
        </div>
      </section>

      <section className="faq-section reveal-section" id="faq" aria-labelledby="faq-title" data-reveal>
        <div className="shell faq-shell">
          <p className="section-kicker">Поддержка</p>
          <h2 id="faq-title">Часто задаваемые<br />вопросы</h2>
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <a className="faq-support-link" href={SUPPORT_URL} target="_blank" rel="noreferrer">
            Не нашли ответ? Написать в @WolfPNsupport_bot <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand"><BrandArtwork decorative /><span>WOLFPN</span></a>
            <p>Безопасный интернет<br />без лишних границ</p>
            <span>© 2026 WolfPN</span>
          </div>
          <div><h3>Продукт</h3><a href="#prices">Тарифные планы</a><a href="#advantages">Преимущества</a><a href="#setup">Как подключиться</a><a href="#privacy">О приватности</a></div>
          <div><h3>Устройства</h3><span>iOS и iPadOS</span><span>Android</span><span>Windows</span><span>macOS</span></div>
          <div><h3>Поддержка</h3><a href="#faq">FAQ</a><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Telegram: @WolfPNsupport_bot</a><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Помощь 24/7</a></div>
        </div>
      </footer>

      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </main>
  );
}

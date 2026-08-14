"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BOT_URL, REGISTRATION_URL, SUPPORT_URL } from "../../lib/site";
import type { SeoPage } from "../../lib/seo-pages";
import styles from "./trial-period.module.css";

type RelatedPage = { slug: string; title: string; eyebrow: string };

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
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
      <img src="/media/wolf-brand.webp" alt={decorative ? "" : "WOLF Private Network"} width="640" height="640" decoding="async" />
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

function CheckIcon() {
  return <span className="check" aria-hidden="true"><svg viewBox="0 0 18 18"><path d="m3.5 9.2 3.3 3.3 7.7-8" /></svg></span>;
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
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
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
      <section className="connect-modal" role="dialog" aria-modal="true" aria-labelledby="trial-connect-title">
        <button ref={closeButtonRef} className="connect-close" type="button" onClick={onClose} aria-label="Закрыть окно">×</button>
        <div className="connect-brand">
          <BrandArtwork />
          <div><strong>WOLFPN</strong><span>Private Network</span></div>
        </div>
        <p className="connect-kicker">Подключение</p>
        <h2 id="trial-connect-title">Как вам удобнее начать?</h2>
        <p className="connect-lead">Выберите быстрый запуск через Telegram без отдельного аккаунта WolfPN или регистрацию на сайте.</p>
        <div className="connect-options">
          <a className="connect-option connect-option-telegram" href={BOT_URL} target="_blank" rel="noreferrer">
            <span className="connect-option-icon"><TelegramIcon /></span>
            <span><strong>Без регистрации</strong><small>Быстрый запуск через Telegram-бот</small></span>
            <ArrowIcon />
          </a>
          <a className="connect-option" href={REGISTRATION_URL} target="_blank" rel="noreferrer">
            <span className="connect-option-icon"><BrowserIcon /></span>
            <span><strong>С регистрацией</strong><small>Создать доступ через официальный сайт</small></span>
            <ArrowIcon />
          </a>
        </div>
        <p className="connect-footnote">Оба способа ведут на официальный сервис WOLF Private Network.</p>
      </section>
    </div>
  );
}

function Header({ onConnect }: { onConnect: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header shell">
      <Link href="/" className="brand header-brand" aria-label="WolfPN — на главную"><BrandArtwork decorative /><span>WOLFPN</span></Link>
      <nav className="desktop-nav" aria-label="Навигация по сайту">
        <Link href="/">Главная</Link>
        <Link href="/tarify">Тарифы</Link>
        <a href="#page-benefits">Преимущества</a>
        <a href="#page-steps">Как начать</a>
        <Link href="/chto-takoe-vpn">Про VPN</Link>
        <a href={SUPPORT_URL} target="_blank" rel="noreferrer">Поддержка</a>
      </nav>
      <div className="header-actions">
        <span className="header-chip">RU</span>
        <span className="header-chip">₽ RUB</span>
        <button className="header-install" type="button" onClick={onConnect}>Подключить</button>
      </div>
      <button className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="trial-mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
        <span /><span /><span />
      </button>
      <nav id="trial-mobile-navigation" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Мобильная навигация">
        <div className="mobile-nav-links">
          <Link href="/" onClick={closeMenu}>Главная</Link>
          <Link href="/tarify" onClick={closeMenu}>Тарифы</Link>
          <a href="#page-benefits" onClick={closeMenu}>Преимущества</a>
          <a href="#page-steps" onClick={closeMenu}>Как начать</a>
          <Link href="/chto-takoe-vpn" onClick={closeMenu}>Про VPN</Link>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Поддержка</a>
        </div>
        <div className="mobile-nav-footer">
          <div className="mobile-languages" aria-label="Язык меню"><button className="is-active" type="button">RU</button><button type="button">EN</button></div>
          <button className="mobile-nav-connect" type="button" onClick={() => { closeMenu(); onConnect(); }}>Подключить WolfPN <ArrowIcon /></button>
        </div>
      </nav>
    </header>
  );
}

const standardPlans = [
  { term: "1 месяц", oldPrice: null, price: "279 ₽", rate: "9,3 ₽ / день", note: "Для знакомства", features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"] },
  { term: "3 месяца", oldPrice: "837 ₽", price: "749 ₽", rate: "249 ₽ / месяц", note: "Экономия 88 ₽", features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"] },
  { term: "6 месяцев", oldPrice: "1 674 ₽", price: "1 399 ₽", rate: "233 ₽ / месяц", note: "Экономия 275 ₽", features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"] },
  { term: "12 месяцев", oldPrice: "3 348 ₽", price: "2 499 ₽", rate: "208 ₽ / месяц · 6,8 ₽ / день", note: "Максимальная выгода", features: ["Безлимитный трафик и скорость", "Доступ ко всем локациям", "До 4 устройств"], featured: true },
];

const trafficUnblockPlans = [
  { traffic: "90 ГБ", price: "419 ₽", rate: "13,9 ₽ / день", featured: false },
  { traffic: "150 ГБ", price: "649 ₽", rate: "21,6 ₽ / день", featured: false },
  { traffic: "200 ГБ", price: "699 ₽", rate: "Самый выгодный", featured: true },
];

const unlimitedUnblockPlans = [
  { term: "15 дней", price: "449 ₽", rate: "≈ 29,9 ₽ / день", featured: false },
  { term: "30 дней", price: "777 ₽", rate: "25,9 ₽ / день", featured: true },
];

function StandardPricingSection({ onConnect }: { onConnect: () => void }) {
  return (
    <section className="pricing-section reveal-section" id="standard-prices" aria-labelledby="standard-prices-title" data-reveal>
      <div className="shell">
        <p className="section-kicker">Стандартная подписка</p>
        <h2 id="standard-prices-title">Все стандартные тарифы</h2>
        <p className="section-lead">Одинаковые возможности во всех вариантах. Выберите только удобный срок и стоимость.</p>
        <div className="tariff-family-heading" id="standard">
          <div><span>01 / Стандартная</span><h3>Доступ ко всем локациям</h3></div>
          <p>Без ограничений по трафику и скорости. Одна подписка работает максимум на четырёх устройствах.</p>
        </div>
        <div className="plans-grid">
          {standardPlans.map((plan) => (
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
                <button className={plan.featured ? "plan-button plan-button-accent" : "plan-button"} type="button" onClick={onConnect}>Подключить</button>
              </div>
            </article>
          ))}
        </div>
        <div className="unblock-info">
          <div><strong>Что входит</strong><p>Все доступные локации, безлимитный трафик, скорость без искусственного ограничения и подключение до четырёх устройств.</p></div>
          <div><strong>Как выбрать</strong><p>Начните с пробного доступа или одного месяца. Более длительный срок снижает среднюю стоимость подписки.</p></div>
        </div>
      </div>
    </section>
  );
}

function UnblockPricingSection({ onConnect }: { onConnect: () => void }) {
  return (
    <section className="pricing-section reveal-section" id="unblock-prices" aria-labelledby="unblock-prices-title" data-reveal>
      <div className="shell">
        <p className="section-kicker">Специальное подключение</p>
        <h2 id="unblock-prices-title">Все тарифы Unblock</h2>
        <p className="section-lead">Для регионов, где периодически действуют ограничения мобильного интернета и стандартные локации уже не помогают.</p>

        <div className="tariff-family-heading unblock-heading">
          <div><span>01 / Unblock с трафиком</span><h3>90, 150 или 200 ГБ</h3></div>
          <p>Каждый пакет действует 30 дней. Выберите объём под обычное общение, работу, видео и другие повседневные задачи.</p>
        </div>
        <div className="unblock-grid">
          {trafficUnblockPlans.map((plan) => (
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
              <button className="unblock-button" type="button" onClick={onConnect}>Выбрать {plan.traffic}<ArrowIcon /></button>
            </article>
          ))}
        </div>
        <div className="unblock-info">
          <div><strong>Когда поможет</strong><p>Когда в регионе периодически ограничивают мобильный интернет, но сервисы из белого списка продолжают открываться.</p></div>
          <div className="unblock-warning"><strong>Когда может не помочь</strong><p>Если не работают даже ВК, Яндекс или Госуслуги, ограничение может находиться на уровне, который Unblock не способен исправить.</p></div>
        </div>

        <div className="unblock-family unlimited-family">
          <div className="tariff-family-heading unblock-heading">
            <div><span>02 / Безлимитный Unblock</span><h3>Без подсчёта гигабайт</h3></div>
            <p>Подходит для регулярного использования, когда не хочется следить за остатком трафика.</p>
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
                <button className="unblock-button" type="button" onClick={onConnect}>Выбрать {plan.term}<ArrowIcon /></button>
              </article>
            ))}
          </div>
          <div className="unblock-info">
            <div><strong>Без ограничения по объёму</strong><p>Не нужно отслеживать остаток гигабайт. Доступны варианты на 15 и 30 дней.</p></div>
            <div className="unblock-warning"><strong>Обратите внимание</strong><p>Безлимитный Unblock не предназначен для постоянного активного торрент-трафика. Совместимость зависит от оператора и типа ограничения.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const commonFaq = [
  { question: "Можно сначала проверить WolfPN?", answer: "Да. Откройте окно подключения и выберите Telegram-бот, чтобы узнать актуальные условия пробного доступа." },
  { question: "Нужно создавать отдельный аккаунт WolfPN?", answer: "Для быстрого запуска через Telegram отдельный аккаунт WolfPN не нужен. Также доступна регистрация через браузер." },
  { question: "На каких устройствах работает WolfPN?", answer: "Поддерживаются iOS, Android, Windows и macOS. Инструкция для выбранного устройства выдаётся при подключении." },
  { question: "Куда обращаться, если возникла проблема?", answer: "Напишите в @WolfPNsupport_bot и укажите устройство, операционную систему и тип интернет-соединения." },
];

function makeBenefitCards(page: SeoPage) {
  const copy = page.sections.flatMap((section) => section.paragraphs);
  return [
    { icon: "01", label: page.eyebrow, title: page.highlights[0] ?? page.title, text: copy[0] ?? page.description },
    { icon: "02", label: "Практика", title: page.highlights[1] ?? "Понятная настройка", text: copy[1] ?? "Получите инструкцию и проверьте работу на своём устройстве." },
    { icon: "03", label: "Возможности", title: page.highlights[2] ?? "Помощь 24/7", text: copy[2] ?? "Если появятся вопросы, поддержка поможет проверить подключение." },
    { icon: "W", label: "WolfPN", title: "Проверьте на своей сети", text: "Итог зависит от устройства, провайдера и выбранной локации. Начните с теста в привычных условиях." },
  ];
}

export default function SeoExperiencePage({ page, related }: { page: SeoPage; related: RelatedPage[] }) {
  const [connectOpen, setConnectOpen] = useState(false);
  const benefitCards = makeBenefitCards(page);
  const faq = [...(page.faq ?? []), ...commonFaq]
    .filter((item, index, items) => items.findIndex((candidate) => candidate.question === item.question) === index)
    .slice(0, 5);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const immediate = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)").matches;
    if (immediate || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: .08, rootMargin: "0px 0px -5%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const openConnect = () => setConnectOpen(true);

  return (
    <main className={styles.page}>
      <section className="hero seo-hero" id="page-home" aria-labelledby="page-title">
        <Header onConnect={openConnect} />
        <div className="hero-copy shell">
          <p className="hero-wordmark" aria-label="WolfPN">WOLFPN</p>
          <h1 id="page-title">{page.title}</h1>
          <p className="hero-lead">{page.intro}</p>
          <div className="hero-features" aria-label={`Главное о ${page.title}`}>
            <span><i><FeatureIcon type="speed" /></i>{page.highlights[0] ?? "Пробный доступ"}</span>
            <span><i><FeatureIcon type="eye" /></i>{page.highlights[1] ?? "Без логов"}</span>
            <span><i><FeatureIcon type="lock" /></i>{page.highlights[2] ?? "AES-256"}</span>
            <span><i><FeatureIcon type="devices" /></i>Любые устройства</span>
            <a href={SUPPORT_URL} target="_blank" rel="noreferrer"><i><FeatureIcon type="support" /></i>Поддержка 24/7</a>
          </div>
          <button className="button button-black hero-button" type="button" onClick={openConnect}>{page.cta} <ArrowIcon /></button>
        </div>

        <div className="hero-stage shell" aria-label={`${page.title} — WolfPN на смартфоне`}>
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-hand hero-hand-left" aria-hidden="true" />
          <div className="phone phone-hero" aria-hidden="true">
            <div className="phone-island" />
            <div className="phone-status"><span>16:44</span><span>5G&nbsp;&nbsp;85%</span></div>
            <div className="phone-brand"><LogoMark /><span>WOLFPN</span></div>
            <div className="phone-map"><span className="map-line line-one" /><span className="map-line line-two" /><span className="map-line line-three" /><i /></div>
            <div className="phone-timer">00:07:45<small>Соединение защищено</small></div>
            <div className="phone-panel"><div><span>Раздел</span><strong>{page.group}</strong></div><div><span>Статус</span><strong>Подключено</strong></div></div>
            <div className="phone-nav"><span>◉</span><span>⌂</span><span>⚙</span></div>
          </div>
          <div className="hero-hand hero-hand-right" aria-hidden="true" />
        </div>
      </section>

      {page.slug === "tarify" ? <StandardPricingSection onConnect={openConnect} /> : null}
      {page.slug === "unblock-vpn" ? <UnblockPricingSection onConnect={openConnect} /> : null}

      <section className={`${styles.benefits} reveal-section`} id="page-benefits" aria-labelledby="page-benefits-title" data-reveal>
        <div className="shell">
          <p className="section-kicker">{page.group}</p>
          <h2 id="page-benefits-title">Главное о<br />{page.title}</h2>
          <p className={styles.sectionLead}>{page.description}</p>
          <div className={styles.benefitGrid}>
            {benefitCards.map((card) => <article key={card.title}><strong className={styles.cardIcon}>{card.icon}</strong><span>{card.label}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.testSection} reveal-section`} aria-labelledby="page-details-title" data-reveal>
        <div className={`shell ${styles.testGrid}`}>
          <div className={styles.testCopy}>
            <p className="section-kicker">Подробный разбор</p>
            <h2 id="page-details-title">{page.eyebrow}.<br />По шагам.<br />Без лишнего.</h2>
            <p>Собрали практическую информацию по теме «{page.title}»: что учитывать, как проверить результат и куда обратиться, если понадобится помощь.</p>
            <button type="button" onClick={openConnect}>{page.cta} <ArrowIcon /></button>
          </div>
          <div className={styles.testCards}>
            {page.sections.map((section, index) => (
              <article key={section.heading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets?.length ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.steps} reveal-section`} id="page-steps" aria-labelledby="page-steps-title" data-reveal>
        <div className="shell">
          <p className="section-kicker">Подключение</p>
          <h2 id="page-steps-title">Три шага до WolfPN</h2>
          <div className={styles.stepsGrid}>
            <article><span>01</span><div><h3>Выберите способ</h3><p>Telegram без отдельного аккаунта WolfPN или регистрация на сайте.</p></div></article>
            <article><span>02</span><div><h3>Получите инструкцию</h3><p>Выберите iOS, Android, Windows или macOS и выполните понятные шаги.</p></div></article>
            <article><span>03</span><div><h3>Проверьте результат</h3><p>Оцените работу WolfPN в своих обычных задачах и выберите подходящий тариф.</p></div></article>
          </div>
          <button className={styles.stepsButton} type="button" onClick={openConnect}>{page.cta} <ArrowIcon /></button>
        </div>
      </section>

      <section className={`${styles.faq} reveal-section`} aria-labelledby="page-faq-title" data-reveal>
        <div className={`shell ${styles.faqGrid}`}>
          <div><p className="section-kicker">Ответы</p><h2 id="page-faq-title">Частые вопросы</h2></div>
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className={`${styles.related} reveal-section`} aria-labelledby="page-related-title" data-reveal>
          <div className="shell">
            <p className="section-kicker">Продолжить изучение</p>
            <h2 id="page-related-title">Материалы по теме</h2>
            <div className={styles.relatedGrid}>
              {related.map((item, index) => (
                <Link href={`/${item.slug}`} key={item.slug}>
                  <span>{String(index + 1).padStart(2, "0")} · {item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <strong>Открыть материал <ArrowIcon /></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`${styles.finalCta} reveal-section`} data-reveal>
        <div className={`shell ${styles.finalCard}`}>
          <div><p className="section-kicker">Начать сейчас</p><h2>{page.cta}</h2><p>Выберите подключение без отдельного аккаунта через Telegram или зарегистрируйтесь на сайте.</p></div>
          <button type="button" onClick={openConnect}>{page.cta} <ArrowIcon /></button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand"><Link href="/" className="brand"><BrandArtwork decorative /><span>WOLFPN</span></Link><p>Безопасный интернет<br />без лишних границ</p><span>© 2026 WolfPN</span></div>
          <div><h3>Продукт</h3><Link href="/tarify">Тарифные планы</Link><Link href="/vpn-s-probnym-periodom">Пробный доступ</Link><Link href="/unblock-vpn">Unblock VPN</Link><Link href="/sravnenie-vpn">Сравнение VPN</Link></div>
          <div><h3>Устройства</h3><Link href="/vpn-dlya-iphone">iOS и iPadOS</Link><Link href="/vpn-dlya-android">Android</Link><Link href="/vpn-dlya-windows">Windows</Link><Link href="/vpn-dlya-macos">macOS</Link></div>
          <div><h3>Поддержка</h3><Link href="/faq">FAQ</Link><a href={SUPPORT_URL} target="_blank" rel="noreferrer">Telegram: @WolfPNsupport_bot</a><Link href="/privacy-policy">Конфиденциальность</Link></div>
        </div>
      </footer>

      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </main>
  );
}

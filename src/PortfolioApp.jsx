import React from 'react';

// portfolio-components.jsx — 고연심 포트폴리오 섹션 컴포넌트

function useInView(ref, threshold = 0.18) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

// ── NAVBAR ────────────────────────────────────────────────────────
function NavBar({ isDark, accent, scrolled }) {
  const textColor = isDark ? 'rgba(245,240,232,0.75)' : 'rgba(13,27,46,0.65)';
  const bgColor = scrolled ?
  isDark ? 'rgba(13,27,46,0.88)' : 'rgba(253,251,247,0.92)' :
  'transparent';
  const borderColor = scrolled ? `${accent}22` : 'transparent';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 72px',
      background: bgColor,
      backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: `1px solid ${borderColor}`,
      transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease'
    }}>
      <div style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '20px', fontWeight: 700, color: accent, letterSpacing: '0.02em'
      }}></div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {[['소개', '#about'], ['강의분야', '#services'], ['경력', '#career'], ['출강기관', '#clients'], ['문의', '#contact']].map(([label, href]) =>
        <a key={label} href={href} style={{
          color: textColor, textDecoration: 'none',
          fontFamily: '"Noto Serif KR", serif',
          fontSize: '13px', letterSpacing: '0.06em',
          transition: 'color 0.25s, opacity 0.25s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = accent}
        onMouseLeave={(e) => e.currentTarget.style.color = textColor}>
          {label}</a>
        )}
        <a href="#contact" style={{
          border: `1px solid ${accent}`, color: accent,
          padding: '9px 22px',
          fontFamily: '"Noto Serif KR", serif', fontSize: '12px', letterSpacing: '0.1em',
          textDecoration: 'none', transition: 'all 0.25s ease'
        }}
        onMouseEnter={(e) => {e.currentTarget.style.background = accent;e.currentTarget.style.color = '#0D1B2E';}}
        onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = accent;}}>
          문의하기</a>
      </div>
    </nav>);

}

// ── HERO ─────────────────────────────────────────────────────────
function HeroSection({ theme }) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {const t = setTimeout(() => setVis(true), 150);return () => clearTimeout(t);}, []);
  const { bg, text, accent } = theme.hero;

  return (
    <section id="hero" data-section="0" style={{
      minHeight: '100vh', backgroundColor: bg,
      display: 'flex', alignItems: 'center',
      padding: '112px 72px 80px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${accent}07 1px, transparent 1px), linear-gradient(90deg, ${accent}07 1px, transparent 1px)`,
        backgroundSize: '72px 72px'
      }} />

      <div style={{
        display: 'grid', gridTemplateColumns: '1.15fr 0.85fr',
        gap: '72px', alignItems: 'center',
        maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1
      }}>
        {/* TEXT SIDE */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '40px',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
            transition: 'all 0.9s ease'
          }}>
            <div style={{ width: '28px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              AI Curator · AI Expert · Edutainer
            </span>
          </div>

          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(60px, 8.5vw, 110px)', lineHeight: 0.95,
            color: text, fontWeight: 700, margin: '0 0 10px',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
            transition: 'all 0.9s ease 0.1s'
          }}>고연심</h1>

          <div style={{
            width: '52px', height: '3px', background: accent, marginBottom: '36px',
            opacity: vis ? 1 : 0, transition: 'all 0.9s ease 0.18s'
          }} />

          <p style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: 'clamp(19px, 2.6vw, 30px)', color: text, lineHeight: 1.7,
            fontWeight: 300, marginBottom: '48px',
            opacity: vis ? 0.82 : 0, transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all 0.9s ease 0.24s'
          }}>
            AI로 일하는 방식을<br />새롭게 설계합니다
          </p>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '52px',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(18px)',
            transition: 'all 0.9s ease 0.34s'
          }}>
            {['DeepCompass AI 연구소 소장', '한국인공지능인재개발원 교수', '한국 AI 전문가협회 교수위원'].map((role, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '22px', height: '1px', background: accent, flexShrink: 0 }} />
                <span style={{ color: text, opacity: 0.52, fontFamily: '"Noto Serif KR", serif', fontSize: '13px', letterSpacing: '0.02em' }}>{role}</span>
              </div>
            )}
          </div>

          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'all 0.9s ease 0.44s' }}>
            <a href="#contact" style={{
              display: 'inline-block', background: accent, color: '#0D1B2E',
              padding: '18px 44px', textDecoration: 'none',
              fontFamily: '"Noto Serif KR", serif', fontSize: '15px', fontWeight: 600, letterSpacing: '0.06em',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)';e.currentTarget.style.boxShadow = `0 14px 42px ${accent}48`;}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = 'none';}}>
              AI 강의·컨설팅 문의하기</a>
          </div>
        </div>

        {/* PHOTO SIDE */}
        <div style={{
          position: 'relative',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(32px)',
          transition: 'all 1.1s ease 0.28s'
        }}>
          {/* Decorative offset frame */}
          <div style={{
            position: 'absolute', top: '-18px', right: '-18px', bottom: '18px', left: '18px',
            border: `1px solid ${accent}22`, pointerEvents: 'none', zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1, lineHeight: 0 }}>
            <img src="portfolio-photo.png" alt="고연심 AI 전문가" style={{
              width: '100%', height: 'clamp(480px, 58vh, 680px)',
              objectFit: 'cover', objectPosition: 'top center', display: 'block'
            }} />
            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
              background: `linear-gradient(to top, ${bg} 0%, transparent 100%)`,
              pointerEvents: 'none'
            }} />
          </div>
          {/* Small decorative circle */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '-28px',
            width: '72px', height: '72px', borderRadius: '50%',
            border: `1px solid ${accent}28`, pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '72px',
        display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.28
      }}>
        <div style={{ width: '40px', height: '1px', background: text }} />
        <span style={{ color: text, fontFamily: '"DM Sans", sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>);

}

// ── ABOUT ─────────────────────────────────────────────────────────
function AboutSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const { bg, text, accent } = theme.about;

  const stats = [
  { num: '50+', label: '출강 기관' },
  { num: '6', label: '강의 분야' },
  { num: 'Ph.D', label: '문화예술학 박사' },
  { num: 'AI Lab', label: '연구소 소장' }];


  return (
    <section id="about" data-section="1" ref={ref} style={{
      backgroundColor: bg, padding: '128px 72px'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '96px', alignItems: 'center' }}>

        {/* Left: text */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.9s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>About</span>
          </div>
          <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400, lineHeight: 1.55, marginBottom: '32px' }}>
            쉽고, 재미있고,<br />유익한 AI 교육의 선구자
          </h2>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '15.5px', color: text, opacity: 0.68, lineHeight: 1.95, marginBottom: '20px', fontWeight: 300 }}>
            생성형 AI · AI 에이전트 · 업무자동화 · 디지털 전환 분야의 전문 강사로, 실무 현장에서 바로 적용할 수 있는 맞춤형 AI 교육과 컨설팅을 제공합니다.
          </p>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '15.5px', color: text, opacity: 0.68, lineHeight: 1.95, marginBottom: '40px', fontWeight: 300 }}>
            멀티 교수법과 감성·공감 중심의 차별화된 강의(Edutainer) 방식으로 기관과 기업의 AI 전환을 이끌어 왔습니다.
          </p>
          {/* Education badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '16px',
            padding: '18px 24px', border: `1px solid ${accent}28`
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%', border: `1.5px solid ${accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent }} />
            </div>
            <div>
              <div style={{ color: text, fontFamily: '"Noto Serif KR", serif', fontSize: '14px', fontWeight: 500 }}></div>
              <div style={{ color: text, opacity: 0.5, fontFamily: '"Noto Serif KR", serif', fontSize: '12.5px', marginTop: '3px' }}></div>
            </div>
          </div>
        </div>

        {/* Right: stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.9s ease 0.18s'
        }}>
          {stats.map(({ num, label }, i) =>
          <div key={i} style={{
            padding: '48px 32px', textAlign: 'center',
            background: `${accent}0D`,
            borderTop: `2px solid ${accent}${i < 2 ? '70' : '35'}`
          }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 4vw, 48px)', color: accent, fontWeight: 700, marginBottom: '8px', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '12.5px', color: text, opacity: 0.55, letterSpacing: '0.04em' }}>{label}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── SERVICES ─────────────────────────────────────────────────────
function ServicesSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, 0.12);
  const { bg, text, accent, cardBg } = theme.services;

  const svcs = [
  { n: '01', title: '생성형 AI 업무혁신', items: ['업무 자동화 · 반복업무 제거', '프롬프트 설계 · 챗봇 제작', '노코드 에이전트 구축'] },
  { n: '02', title: '기획 · 리서치', items: ['시장 / 경쟁 / 사례 조사', '요약 · 인사이트 도출', '실행전략 전환 (1-pager)'] },
  { n: '03', title: '데이터 분석 · 시각화', items: ['엑셀 / CSV 분석 자동화', 'KPI 설계 · 대시보드 제작', '보고서 자동 생성 (ADA)'] },
  { n: '04', title: 'AI 콘텐츠 제작', items: ['브랜딩 비주얼 · 카드뉴스', '포스터 · 썸네일 디자인', '플랫폼별 포맷 최적화'] },
  { n: '05', title: 'AI 출판 · 지식상품화', items: ['AI 전자책 기획 · 원고 작성', '편집 자동화 · 표지 제작', '출판 워크플로우 설계'] },
  { n: '06', title: '영상 · 음악 & 워크숍', items: ['숏폼 영상 기획 · AI 제작', 'AI 음악 · 스토리보드 제작', '직무별 실습형 맞춤 교육'] }];


  return (
    <section id="services" data-section="2" ref={ref} style={{ backgroundColor: bg, padding: '128px 72px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '72px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '1px', background: accent }} />
              <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Lecture Areas</span>
            </div>
            <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400 }}>강의 분야</h2>
          </div>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.5, lineHeight: 1.75, maxWidth: '300px', textAlign: 'right', fontWeight: 300 }}>
            생성형 AI부터 에이전트·자동화까지,<br />실무 중심 6개 핵심 분야를 다룹니다
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {svcs.map((s, i) =>
          <div key={i} style={{
            backgroundColor: cardBg, padding: '48px 36px', position: 'relative', overflow: 'hidden',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
            transition: `all 0.7s ease ${0.06 * i}s`
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${accent}12`}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = cardBg}>
            
              <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: '50px', fontWeight: 700,
              color: accent, opacity: 0.15, position: 'absolute', top: '16px', right: '20px', lineHeight: 1
            }}>{s.n}</div>
              <div style={{ width: '28px', height: '2px', background: accent, marginBottom: '20px' }} />
              <h3 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '17px', color: text, fontWeight: 500, marginBottom: '20px', lineHeight: 1.4 }}>{s.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {s.items.map((item, j) =>
              <li key={j} style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '13px', color: text, opacity: 0.58, paddingLeft: '16px', position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, top: '7px', width: '4px', height: '4px', borderRadius: '50%', background: accent, opacity: 0.55 }} />
                    {item}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── CAREER ────────────────────────────────────────────────────────
function CareerSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const { bg, text, accent } = theme.career;

  const careers = [
  { year: '2026', title: 'DeepCompass AI 연구소 소장', org: 'DeepCompass AI Lab', active: true },
  { year: '2026', title: '한국인공지능인재개발원 교수', org: '한국인공지능인재개발원', active: true },
  { year: '2026', title: 'AI 전문가협회 교수위원', org: '한국 AI 전문가협회', active: true },
  { year: '2026', title: 'AI 프롬프트 연구소 책임연구원', org: 'AI 프롬프트 연구소', active: true },
  { year: '2023', title: '문화예술학 박사 취득', org: '단국대학교 일반대학원', active: false }];

  const chars = [
  { tag: 'Easy', desc: '쉽고 명쾌한 강의' },
  { tag: 'Fun', desc: '재미있는 에듀테이너' },
  { tag: 'Useful', desc: '실무에 바로 적용' }];


  return (
    <section id="career" data-section="3" ref={ref} style={{ backgroundColor: bg, padding: '128px 72px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '72px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Career</span>
          </div>
          <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400 }}>경력 및 학력</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Timeline */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)', transition: 'all 0.9s ease 0.1s' }}>
            {careers.map((c, i) =>
            <div key={i} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${accent}`, background: c.active ? accent : 'transparent', marginTop: '4px', flexShrink: 0 }} />
                  {i < careers.length - 1 && <div style={{ width: '1px', flex: 1, background: `${accent}28`, margin: '4px 0', minHeight: '36px' }} />}
                </div>
                <div style={{ paddingBottom: '32px' }}>
                  <div style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.14em', marginBottom: '6px' }}>
                    {c.year} · {c.active ? '현직' : '학력'}
                  </div>
                  <div style={{ color: text, fontFamily: '"Noto Serif KR", serif', fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>{c.title}</div>
                  <div style={{ color: text, opacity: 0.45, fontFamily: '"Noto Serif KR", serif', fontSize: '13px' }}>{c.org}</div>
                </div>
              </div>
            )}
          </div>

          {/* Characteristics */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition: 'all 0.9s ease 0.2s' }}>
            <div style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '28px' }}>강의 특징</div>
            {chars.map(({ tag, desc }, i) =>
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              padding: '22px 24px', marginBottom: '2px',
              borderLeft: `2px solid ${accent}`, background: `${accent}09`
            }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, color: accent, minWidth: '56px', fontStyle: 'italic' }}>{tag}</span>
                <span style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.72 }}>{desc}</span>
              </div>
            )}
            {/* Quote */}
            <div style={{ marginTop: '36px', padding: '28px 28px 28px 28px', border: `1px solid ${accent}1E`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '20px', fontFamily: '"Playfair Display", serif', fontSize: '44px', color: accent, lineHeight: 1, opacity: 0.42 }}>"</div>
              <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.65, lineHeight: 1.85, fontWeight: 300, margin: '8px 0 0' }}>
                AI 에이전트 시대, 기업 혁신과 디지털 전환을 선도하는 최고의 HRD 파트너로 함께 하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ── CLIENTS ──────────────────────────────────────────────────────
function ClientsSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const { bg, text, accent, tagBg } = theme.clients;

  const groups = [
  { label: '관공서', items: ['기획재정부', '경북도교육청', '파주교육지원청', '순천시청', '대전중구청', '원주국토관리청'] },
  { label: '대학교', items: ['중앙대학교', '한국산업기술대학교', '동덕여자대학교', '한성대학교', '파주두원공과대학교', '선린대학교'] },
  { label: '공공·유관기관', items: ['경기인재개발원', '경기고양인재개발원', '부천평생학습센터', '증평평생학습센터', '한국능률협회'] },
  { label: '법인 및 단체', items: ['서울시관광협회', '천주교주교회의', '화성새일터', '부천복지관', '한양문고', '청년창업센터'] }];


  return (
    <section id="clients" data-section="4" ref={ref} style={{ backgroundColor: bg, padding: '128px 72px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: '80px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', background: accent }} />
            <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Clients & Partners</span>
            <div style={{ width: '40px', height: '1px', background: accent }} />
          </div>
          <h2 style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 3.2vw, 42px)', color: text, fontWeight: 400, marginBottom: '16px' }}>출강 기관</h2>
          <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '14.5px', color: text, opacity: 0.48, fontWeight: 300 }}>정부 기관, 대학교, 공공기관, 기업 등 50개 이상의 기관에서 강의</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '52px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'all 0.9s ease 0.14s'
        }}>
          {groups.map(({ label, items }, i) =>
          <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ width: '18px', height: '1px', background: accent }} />
                <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {items.map((item, j) =>
              <span key={j} style={{
                fontFamily: '"Noto Serif KR", serif', fontSize: '13px', color: text, opacity: 0.75,
                padding: '8px 16px', background: tagBg, border: `1px solid ${accent}14`
              }}>{item}</span>
              )}
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: accent, opacity: 0.45, padding: '8px 10px', alignSelf: 'center' }}>+ 外</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── CONTACT ──────────────────────────────────────────────────────
function ContactSection({ theme }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, 0.2);
  const { bg, text, accent } = theme.contact;

  return (
    <section id="contact" data-section="5" ref={ref} style={{
      backgroundColor: bg, padding: '128px 72px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${accent}09 1px, transparent 1px)`,
        backgroundSize: '36px 36px', pointerEvents: 'none'
      }} />
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px',
          opacity: inView ? 1 : 0, transition: 'all 0.8s ease'
        }}>
          <div style={{ width: '40px', height: '1px', background: accent }} />
          <span style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Contact</span>
          <div style={{ width: '40px', height: '1px', background: accent }} />
        </div>

        <h2 style={{
          fontFamily: '"Noto Serif KR", serif', fontSize: 'clamp(26px, 4vw, 50px)', color: text,
          fontWeight: 300, lineHeight: 1.55, marginBottom: '24px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.8s ease 0.1s'
        }}>
          AI 강의와 컨설팅,<br />지금 바로 문의하세요
        </h2>

        <p style={{
          fontFamily: '"Noto Serif KR", serif', fontSize: '15.5px', color: text, lineHeight: 1.85,
          marginBottom: '56px', fontWeight: 300,
          opacity: inView ? 0.52 : 0, transition: 'all 0.8s ease 0.2s'
        }}>
          맞춤형 AI 교육 설계부터 기관 워크숍 운영까지,<br />귀 기관에 최적화된 프로그램을 제안해 드립니다.
        </p>

        <div style={{ marginBottom: '64px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'all 0.8s ease 0.3s' }}>
          <a href="mailto:emas7788@naver.com" style={{
            display: 'inline-block', background: accent, color: '#0D1B2E',
            padding: '22px 56px', textDecoration: 'none',
            fontFamily: '"Noto Serif KR", serif', fontSize: '16px', fontWeight: 600, letterSpacing: '0.08em',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)';e.currentTarget.style.boxShadow = `0 16px 48px ${accent}50`;}}
          onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = 'none';}}>
            AI 강의·컨설팅 문의하기</a>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '56px',
          opacity: inView ? 0.62 : 0, transition: 'all 0.8s ease 0.4s'
        }}>
          {[
            { label: 'Tel', value: '010-7432-6833', href: 'tel:01074326833' },
            { label: 'Email', value: 'emas7788@naver.com', href: 'mailto:emas7788@naver.com' }
          ].map(({ label, value, href }) =>
            <a key={label} href={href} style={{ textAlign: 'center', textDecoration: 'none' }}>
              <div style={{ color: accent, fontFamily: '"DM Sans", sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
              <div style={{ color: text, fontFamily: '"Noto Serif KR", serif', fontSize: '15px' }}>{value}</div>
            </a>
          )}
        </div>

        <div style={{
          marginTop: '96px', paddingTop: '32px', borderTop: `1px solid ${accent}1A`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          opacity: inView ? 0.38 : 0, transition: 'all 0.8s ease 0.5s'
        }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', color: text }}>고연심</span>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '11px', color: text, letterSpacing: '0.08em' }}>© 2026 Koh Yeon Sim. All rights reserved.</span>
        </div>
      </div>
    </section>);

}

// portfolio-app.jsx — 테마 정의 + App 컴포넌트

const THEMES = {
  'golden-night': {
    hero:     { bg: '#0D1B2E', text: '#F5F0E8', accent: '#C9A84C' },
    about:    { bg: '#1E3A5F', text: '#F5F0E8', accent: '#C9A84C' },
    services: { bg: '#F5F0E8', text: '#0D1B2E', accent: '#B8922E', cardBg: '#FFFFFF' },
    career:   { bg: '#0D1B2E', text: '#F5F0E8', accent: '#C9A84C' },
    clients:  { bg: '#1E3A5F', text: '#F5F0E8', accent: '#C9A84C', tagBg: 'rgba(201,168,76,0.08)' },
    contact:  { bg: '#0D1B2E', text: '#F5F0E8', accent: '#C9A84C' },
    sectionDark: [true, true, false, true, true, true],
  },
  'cyan-tech': {
    hero:     { bg: '#060F1C', text: '#DCF0F6', accent: '#00C8E8' },
    about:    { bg: '#0A1628', text: '#DCF0F6', accent: '#00C8E8' },
    services: { bg: '#EBF6FA', text: '#071422', accent: '#008EB0', cardBg: '#FFFFFF' },
    career:   { bg: '#060F1C', text: '#DCF0F6', accent: '#00C8E8' },
    clients:  { bg: '#0A1628', text: '#DCF0F6', accent: '#00C8E8', tagBg: 'rgba(0,200,232,0.07)' },
    contact:  { bg: '#060F1C', text: '#DCF0F6', accent: '#00C8E8' },
    sectionDark: [true, true, false, true, true, true],
  },
  'light-elegance': {
    hero:     { bg: '#FDFBF7', text: '#0D1B2E', accent: '#C9A84C' },
    about:    { bg: '#F0EBE0', text: '#1E3A5F', accent: '#C9A84C' },
    services: { bg: '#FFFFFF',  text: '#0D1B2E', accent: '#B8922E', cardBg: '#FDFBF7' },
    career:   { bg: '#F5F0E8', text: '#0D1B2E', accent: '#1E3A5F' },
    clients:  { bg: '#EDE8DE', text: '#0D1B2E', accent: '#C9A84C', tagBg: 'rgba(30,58,95,0.07)' },
    contact:  { bg: '#1E3A5F', text: '#F5F0E8', accent: '#C9A84C' },
    sectionDark: [false, false, false, false, false, true],
  },
};

function App() {
  const theme = THEMES['golden-night'];

  const [scrolled, setScrolled] = React.useState(false);
  const [sectionIdx, setSectionIdx] = React.useState(0);

  // Scroll → nav style
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver → which section is active (for nav color)
  React.useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setSectionIdx(+e.target.dataset.section);
      });
    }, { threshold: 0.42 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const isDark = theme.sectionDark[sectionIdx] ?? true;
  const navAccent = '#C9A84C';

  return (
    <div className="portfolio-site">
      <NavBar isDark={isDark} accent={navAccent} scrolled={scrolled} />
      <HeroSection theme={theme} />
      <AboutSection theme={theme} />
      <ServicesSection theme={theme} />
      <CareerSection theme={theme} />
      <ClientsSection theme={theme} />
      <ContactSection theme={theme} />
    </div>
  );
}

export default App;


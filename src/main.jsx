import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const highlights = [
  '한국인공지능인재개발원 교수',
  '딥컴퍼스 AI 연구소 소장 / Founder',
  '문화예술학 박사 · 단국대학교 일반대학원',
  '생성형 AI 교육 · AI 에이전트 · DX 컨설팅 전문가',
];

const services = [
  {
    title: '생성형 AI 업무혁신',
    desc: '문서·보고서·반복업무 자동화, 역할 기반 프롬프트 설계, 검증 템플릿과 챗봇 제작까지 실무 중심으로 교육합니다.',
  },
  {
    title: 'AI 에이전트·노코드 구축',
    desc: 'ChatGPT, Claude, Gemini, Perplexity, AI Studio 등 최신 도구를 활용해 업무형 AI 에이전트와 자동화 흐름을 설계합니다.',
  },
  {
    title: 'AI 콘텐츠·출판 제작',
    desc: '포스터, 썸네일, 카드뉴스, 전자책, 원고 편집, 표지·내지 제작, 콘텐츠 재가공까지 지식상품화 과정을 안내합니다.',
  },
  {
    title: '기관 맞춤 실습형 워크숍',
    desc: '행정, 교육, 마케팅, HR 등 직무별 실습 과제를 설계하고 현장에서 바로 쓰는 프롬프트팩과 결과물을 만듭니다.',
  },
];

const expertise = [
  'ChatGPT 업무 활용', 'Claude·Gemini·Perplexity', 'AI 에이전트', 'MCP',
  '프롬프트 엔지니어링', '문서·보고 자동화', '데이터 분석·시각화', 'AI 콘텐츠 제작',
  'AI 전자책·출판', '숏폼 영상 기획', 'AI 음악 제작', 'DX 컨설팅'
];

const books = [
  '세상을 바꾸는 메타버스 (2021, 공저)',
  '챗GPT_새로운 글쓰기도구의 탄생과 활용 (2023, 공저)',
  'ChatGPT4_더욱 강력해진 인공지능의 혁신과 활용 (2023, 공저)',
  '나도작가되기 (2024)',
  '블로그 첫 발걸음 입문 단계 1.0 (2024)',
];

const lectures = [
  '한양문고 Google AI 도구 특강',
  '서울시관광협회 생성형 AI 업무 활용 교육',
  '대전 중구청 생성형 AI 공무원 실무 교육',
  '한국인공지능인재개발원 생성형 AI 에이전트 마스터 과정',
  '딥컴퍼스 AI 연구소 생성형 AI 코호트 과정',
  '반포느티나무쉼터 시니어 AI 활용 교육',
  '고양신문 AI 마케팅·콘텐츠 교육',
  '공공기관 AI 디지털 전환 교육 다수',
];

const clients = [
  '중·고등학교', '대학교·대학원', '관공서', '공공기관', '법인·단체', '기업·HRD', '시니어 기관', '창업·소상공인 기관'
];

function App() {
  return (
    <main>
      <nav className="nav">
        <a className="logo" href="#top">고연심<span>AI</span></a>
        <div>
          <a href="#profile">프로필</a>
          <a href="#programs">강의</a>
          <a href="#career">경력</a>
          <a href="#contact">문의</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Generative AI · AI Agent · DX Consulting</p>
          <h1>현장에서 바로 쓰는 생성형 AI 교육과 AI 에이전트 설계</h1>
          <p className="lead">
            고연심은 한국인공지능인재개발원 교수이자 딥컴퍼스 AI 연구소 소장으로,
            ChatGPT와 최신 생성형 AI 도구를 활용한 업무혁신, AI 에이전트, 콘텐츠 제작,
            기관 맞춤 DX 교육을 진행합니다.
          </p>
          <div className="ctaRow">
            <a className="button primary" href="mailto:emas7788@naver.com">강의 문의하기</a>
            <a className="button ghost" href="tel:01074326833">010-7432-6833</a>
          </div>
        </div>
        <div className="portraitCard">
          <div className="glow" />
          <img src="/assets/goyeonsim-profile.jpg" alt="AI 전문가 고연심 프로필 사진" />
          <div className="badge">DeepCompass AI Lab</div>
        </div>
      </section>

      <section className="intro">
        <div>
          <p className="sectionLabel">Brand Message</p>
          <h2>기술 설명을 넘어, 업무와 삶에 적용되는 AI 활용법을 전합니다.</h2>
        </div>
        <p>
          메타버스, NFT, 생성형 AI, AI 에이전트까지 20년 이상의 디지털 신기술 강의 경험을 바탕으로
          공무원, 기업 임직원, 대학생, 시니어, 소상공인 등 다양한 대상에게 쉽고 실용적인 AI 교육을 제공합니다.
        </p>
      </section>

      <section className="grid two" id="profile">
        <div className="panel dark">
          <p className="sectionLabel">Profile</p>
          <h2>고연심<br /><small>Koh Yeon Sim</small></h2>
          <p className="role">교수 · 소장 · 생성형 AI 교육 전문가</p>
          <ul className="checkList">
            {highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="panel">
          <p className="sectionLabel">Education & Research</p>
          <h2>학력과 연구</h2>
          <ul className="checkList normal">
            <li>문화예술학 박사 Ph.D. in Cultural Arts Studies</li>
            <li>단국대학교 일반대학원 문화예술학과 박사</li>
            <li>단국대학교 문화예술대학원 문화관리학과 석사</li>
            <li>가상미술관의 지속가능성 연구 — 박사학위논문</li>
            <li>뉴미디어 기반 가상박물관 유형 분석과 미래 방향 — 조형미디어학</li>
          </ul>
        </div>
      </section>

      <section className="services" id="programs">
        <div className="sectionHead">
          <div>
            <p className="sectionLabel">Programs</p>
            <h2>강의와 컨설팅 분야</h2>
          </div>
        </div>
        <div className="tagCloud wide">
          {expertise.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="serviceGrid">
          {services.map((service, idx) => (
            <article className="service" key={service.title}>
              <span>{String(idx + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid two" id="career">
        <div className="panel">
          <p className="sectionLabel">Books</p>
          <h2>저서 실적</h2>
          <ul className="checkList normal">
            {books.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="panel">
          <p className="sectionLabel">Lectures</p>
          <h2>주요 출강 이력</h2>
          <ul className="checkList normal">
            {lectures.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="proof">
        <p className="sectionLabel">For Organizations</p>
        <h2>학교·공공기관·기업·단체까지, 대상에 맞춘 실전형 AI 강의</h2>
        <div className="clientList">
          {clients.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="sectionLabel">Contact</p>
          <h2>생성형 AI 교육, AI 에이전트, DX 컨설팅을 상담하세요.</h2>
          <p>기관의 목적과 수강자 수준에 맞춰 강의 주제, 실습 과제, 결과물, 운영 방식을 함께 설계합니다.</p>
        </div>
        <div className="contactCard">
          <a href="tel:01074326833">010-7432-6833</a>
          <a href="mailto:emas7788@naver.com">emas7788@naver.com</a>
          <small>강의 · 컨설팅 · 기관 맞춤 과정 문의</small>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

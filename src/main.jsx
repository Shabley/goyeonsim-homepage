import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const services = [
  {
    title: '비즈니스 AI 교육',
    desc: 'ChatGPT, GPTs 챗봇, AI 프로세스 자동화, 업무 혁신을 실무자가 바로 적용할 수 있게 설계합니다.',
  },
  {
    title: '생성형 AI 업무 혁신',
    desc: '문서·보고·반복 업무, 프롬프트 설계, 검증과 실행 템플릿까지 조직 맞춤형으로 구축합니다.',
  },
  {
    title: 'AI 콘텐츠 기획·제작',
    desc: '브랜드 비주얼, 카드뉴스, 뉴스레터, 블로그, 영상·숏폼까지 마케팅 콘텐츠 흐름을 만듭니다.',
  },
  {
    title: 'AI 강사·기관 맞춤 과정',
    desc: '학교, 공공기관, 기업, 단체의 대상과 목표에 맞춰 강의안·실습·성과물을 중심으로 운영합니다.',
  },
];

const highlights = [
  'DeepCompass AI Lab 연구소장',
  '서경대 혁신지능융합개발원 교수',
  '서경대 AI 전문가협회 교수위원',
  'AI 프로세스 연구팀 책임연구원',
];

const clients = [
  '중·고등학교', '대학·대학원', '관공서', '공공기관', '기업·HRD', '문화·복지기관', '창업·소상공인 기관'
];

const curriculum = [
  'ChatGPT 업무 활용', 'GPTs 챗봇 제작', '프롬프트 엔지니어링', '문서·보고 자동화',
  '데이터 분석과 시각화', 'AI 콘텐츠 마케팅', '영상·숏폼 기획', '기관 맞춤 교육 설계'
];

function App() {
  return (
    <main>
      <nav className="nav">
        <a className="logo" href="#top">고연심<span>AI</span></a>
        <div>
          <a href="#expertise">전문분야</a>
          <a href="#programs">강의</a>
          <a href="#contact">문의</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">AI Expert · AI Edutainer</p>
          <h1>AI를 쉽고, 재미있고, 바로 쓸 수 있게 만드는 전문가</h1>
          <p className="lead">
            고연심은 생성형 AI, ChatGPT, GPTs 챗봇, 업무 자동화와 콘텐츠 기획을 연결해
            개인과 조직이 실제 성과를 만드는 AI 활용법을 전합니다.
          </p>
          <div className="ctaRow">
            <a className="button primary" href="mailto:emas7788@naver.com">강의 문의하기</a>
            <a className="button ghost" href="tel:01074326833">010-7432-6833</a>
          </div>
        </div>
        <div className="portraitCard">
          <div className="glow" />
          <img src="/assets/goyeonsim-profile.png" alt="AI 전문가 고연심 프로필 사진" />
          <div className="badge">DeepCompass AI Lab</div>
        </div>
      </section>

      <section className="intro">
        <div>
          <p className="sectionLabel">Brand Message</p>
          <h2>AI 교육은 기술 설명이 아니라, 현장의 변화를 만드는 설계입니다.</h2>
        </div>
        <p>
          강의는 Easy, Fun, Useful을 기준으로 구성합니다. 복잡한 AI 개념을 쉽게 풀고,
          참여형 실습으로 재미를 더하며, 수강자가 바로 사용할 수 있는 결과물 중심으로 마무리합니다.
        </p>
      </section>

      <section className="grid two" id="expertise">
        <div className="panel dark">
          <p className="sectionLabel">Profile</p>
          <h2>고연심</h2>
          <p className="role">AI 전문가 · AI 엔터테이너</p>
          <ul className="checkList">
            {highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="panel">
          <p className="sectionLabel">Expertise</p>
          <h2>강의와 컨설팅 분야</h2>
          <div className="tagCloud">
            {curriculum.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="services" id="programs">
        <div className="sectionHead">
          <p className="sectionLabel">Programs</p>
          <h2>브랜딩 가능한 AI 교육 프로그램</h2>
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

      <section className="proof">
        <p className="sectionLabel">For Organizations</p>
        <h2>학교·공공기관·기업까지, 대상에 맞춘 실전형 AI 강의</h2>
        <div className="clientList">
          {clients.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="sectionLabel">Contact</p>
          <h2>AI 교육, 콘텐츠 기획, 조직 맞춤 프로그램을 상담하세요.</h2>
          <p>브랜드와 교육 목적에 맞춰 강의 주제, 난이도, 실습 결과물, 운영 방식을 함께 설계합니다.</p>
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

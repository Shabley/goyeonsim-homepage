import React from 'react';

const inquiryFormUrl = 'https://forms.gle/GStfpESe4qdT2cKJA';

const stats = [
  ['8대 핵심 기능', '맞춤설정부터 Co-work까지'],
  ['90%', '반복 설명 시간 절감 목표'],
  ['Work OS', '채팅을 넘어 업무 시스템으로'],
  ['실습 중심', '강의안·리서치·문서 자동화'],
];

const pains = [
  ['매번 같은 설명을 반복한다', 'Claude에게 내 역할, 문체, 업무 기준을 먼저 세팅하지 않았기 때문입니다.'],
  ['파일을 계속 다시 올린다', 'Projects와 Memory를 업무별로 나누지 않으면 맥락이 쌓이지 않습니다.'],
  ['결과물을 다시 사람이 정리한다', 'Artifacts와 Skills를 연결해야 결과물이 바로 납품 형태에 가까워집니다.'],
  ['AI를 써도 일이 줄지 않는다', '단순 질문이 아니라 업무 흐름 전체를 시스템화해야 합니다.'],
];

const modules = [
  ['01', '3대 플랫폼 인프라 세팅', '웹·데스크톱·모바일을 연결해 어디서나 이어지는 Claude 업무 환경을 구축합니다.'],
  ['02', '맞춤설정', 'Claude에게 나는 누구인지, 어떤 톤과 구조로 답해야 하는지 알려 나만의 AI 비서로 만듭니다.'],
  ['03', '모델 선택 전략', 'Haiku·Sonnet·Opus를 속도, 비용, 난이도에 따라 선택하는 기준을 익힙니다.'],
  ['04', 'Projects', '강의별·고객별·업무별 전용 작업방을 만들고 파일과 지침을 누적합니다.'],
  ['05', 'Memory', '반복 설명을 줄이고, 내 문체와 업무 기준을 기억하게 만드는 구조를 잡습니다.'],
  ['06', 'Artifacts', '문서, 표, 차트, 랜딩페이지, HTML 결과물을 Claude 안에서 바로 시각화합니다.'],
  ['07', 'Deep Research', '시장조사, 경쟁사 분석, 강의 주제 리서치를 전문가급 보고서로 정리합니다.'],
  ['08', 'Skills', '블로그, 상세페이지, 강의안, 보고서 작성 방식을 매뉴얼화해 품질을 일정하게 유지합니다.'],
  ['09', 'Connectors', 'Google Drive, Notion 등 외부 자료와 Claude를 연결하는 업무 확장법을 이해합니다.'],
  ['10', 'Co-work', 'Claude가 내 PC 파일·브라우저·앱 작업까지 함께 수행하는 자동화 흐름을 배웁니다.'],
];

const bonuses = ['Claude 맞춤설정 예시문', 'Projects 세팅 템플릿', '강의안 제작 프롬프트', '상세페이지 기획 프롬프트', 'Claude Work OS 체크리스트'];

const reviews = [
  ['1인 사업가', '전에는 AI에게 매번 제 일을 설명했는데, 맞춤설정과 Projects를 배우고 나니 강의안 제작 속도가 확실히 빨라졌어요.'],
  ['AI 강사', '단순 프롬프트 강의가 아니라 제 업무방을 만드는 느낌이었습니다. Claude를 수업 준비 파트너처럼 쓰게 됐습니다.'],
  ['마케터', '보고서, 상세페이지, 콘텐츠 기획까지 연결해서 쓰는 법을 배운 게 가장 좋았습니다. AI 활용 수준이 달라졌어요.'],
];

function ClaudeLanding() {
  React.useEffect(() => {
    document.title = '2026 Claude 완전정복 | 고연심 소장 직강';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', '맞춤설정부터 Projects, Memory, Skills, Artifacts, Deep Research, Co-work까지 Claude를 AI 업무 시스템으로 만드는 고연심 소장의 실전 강의입니다.');
    }
  }, []);

  return (
    <main className="claudePage">
      <nav className="claudeNav">
        <a href="/" className="claudeLogo">DeepcompassAI연구소</a>
        <div>
          <a href="#curriculum">커리큘럼</a>
          <a href="#proof">추천대상</a>
          <a href="#faq">FAQ</a>
          <a className="navCta" href={inquiryFormUrl} target="_blank" rel="noreferrer">수강 문의</a>
        </div>
      </nav>

      <section className="claudeHero" id="top">
        <div className="heroText">
          <p className="pill">2026 Claude 완전정복 · 고연심 소장 직강</p>
          <h1>ChatGPT만 쓰고 있다면,<br />아직 AI의 절반만 쓰는 중입니다.</h1>
          <p className="heroLead">
            맞춤설정부터 Projects, Memory, Skills, Artifacts, Deep Research, Co-work까지 —
            Claude를 단순 채팅창이 아닌 <strong>나만의 AI 업무 시스템</strong>으로 만드는 실전 강의입니다.
          </p>
          <div className="heroActions">
            <a className="button primary" href={inquiryFormUrl} target="_blank" rel="noreferrer">Claude 완전정복 신청하기</a>
            <a className="button ghost" href="#curriculum">커리큘럼 보기</a>
          </div>
          <div className="trustLine">준비물: 노트북 · Claude 계정 · 내 업무에 적용할 실제 주제</div>
        </div>
        <div className="heroVisual" aria-label="Claude Work OS visual">
          <div className="screenCard top">맞춤설정<br /><span>나를 아는 AI 비서</span></div>
          <div className="screenCard mid">Projects + Memory<br /><span>업무 맥락 저장</span></div>
          <div className="screenCard bottom">Co-work<br /><span>내 PC에서 함께 실행</span></div>
        </div>
      </section>

      <section className="statGrid">
        {stats.map(([num, label]) => <div className="stat" key={num}><strong>{num}</strong><span>{label}</span></div>)}
      </section>

      <section className="problemSection">
        <p className="sectionLabel">Problem</p>
        <h2>AI를 쓰고 있는데도, 왜 아직 일이 줄지 않을까요?</h2>
        <p className="sectionLead">Claude를 그냥 질문창처럼만 쓰면 결국 ‘복붙 도구’에서 멈춥니다. 진짜 차이는 기능을 하나의 업무 흐름으로 연결했을 때 시작됩니다.</p>
        <div className="painGrid">
          {pains.map(([title, desc]) => <article className="painCard" key={title}><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="solutionBand">
        <div>
          <p className="sectionLabel">Solution</p>
          <h2>Claude를 ‘채팅 AI’가 아니라<br />‘나만의 AI 업무팀’으로 세팅하세요.</h2>
        </div>
        <p>
          이 강의는 기능 설명에서 끝나지 않습니다. 맞춤설정으로 기준을 잡고, Projects로 업무방을 만들고,
          Memory와 Skills로 반복 업무를 줄이고, Artifacts와 Co-work로 결과물과 실행까지 연결합니다.
        </p>
      </section>

      <section className="curriculum" id="curriculum">
        <div className="sectionHead">
          <div>
            <p className="sectionLabel">Curriculum</p>
            <h2>10단계 Claude Work OS 커리큘럼</h2>
          </div>
          <p>초보자도 따라올 수 있게 환경 세팅부터 고급 자동화까지 순서대로 설계했습니다.</p>
        </div>
        <div className="moduleGrid">
          {modules.map(([num, title, desc]) => <article className="module" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="compareSection">
        <p className="sectionLabel">Difference</p>
        <h2>일반 AI 강의는 프롬프트에서 끝나지만,<br />이 강의는 AI 업무 시스템을 만듭니다.</h2>
        <div className="compareGrid">
          <div className="compareCard muted"><h3>일반 AI 강의</h3><ul><li>프롬프트 예시 몇 개 제공</li><li>단발성 질문과 답변 중심</li><li>결과물은 사람이 다시 정리</li><li>업무별 맥락 저장 부족</li></ul></div>
          <div className="compareCard strong"><h3>Claude 완전정복</h3><ul><li>맞춤설정으로 나만의 기준 세팅</li><li>Projects·Memory로 업무 맥락 유지</li><li>Artifacts로 결과물 즉시 시각화</li><li>Co-work로 PC 업무 실행까지 확장</li></ul></div>
        </div>
      </section>

      <section className="proofSection" id="proof">
        <div>
          <p className="sectionLabel">Recommended</p>
          <h2>이런 분께 특히 추천합니다</h2>
        </div>
        <div className="targetList">
          <span>AI 강사·컨설턴트</span><span>1인 사업가</span><span>마케터·기획자</span><span>공공기관·기업 실무자</span><span>콘텐츠 제작자</span><span>강의안·보고서 작성이 많은 분</span>
        </div>
      </section>

      <section className="reviewSection">
        <p className="sectionLabel">Reviews</p>
        <h2>“Claude가 이런 식으로 쓰이는 줄 몰랐어요.”</h2>
        <div className="reviewGrid">
          {reviews.map(([name, text]) => <article className="review" key={name}><p>“{text}”</p><strong>{name}</strong></article>)}
        </div>
      </section>

      <section className="bonusSection">
        <div>
          <p className="sectionLabel">Limited Bonus</p>
          <h2>현재 모집 기수 한정 제공 자료</h2>
          <p>강의 후 바로 업무에 적용할 수 있도록 실전 템플릿을 함께 제공합니다.</p>
        </div>
        <ul>
          {bonuses.map((bonus) => <li key={bonus}>{bonus}</li>)}
        </ul>
      </section>

      <section className="faqSection" id="faq">
        <p className="sectionLabel">FAQ</p>
        <h2>수강 전 자주 묻는 질문</h2>
        <details open><summary>Claude를 처음 써도 괜찮나요?</summary><p>네. 계정 만들기와 기본 환경 세팅부터 시작해 초보자도 따라올 수 있도록 구성합니다.</p></details>
        <details><summary>ChatGPT와 무엇이 다른가요?</summary><p>Claude는 긴 문서, 프로젝트 맥락 관리, Artifacts 시각화, Work OS형 업무 흐름에 강점이 있습니다. 강의에서는 이 차이를 실제 업무에 연결합니다.</p></details>
        <details><summary>수업 후 어떤 결과물을 만들 수 있나요?</summary><p>강의안, 시장조사 보고서, 상세페이지 기획안, 업무별 Claude Projects, 반복 업무용 Skills 템플릿을 만들 수 있습니다.</p></details>
      </section>

      <section className="finalCta">
        <p className="pill">AI를 잘 쓰는 사람이 아니라, AI 시스템을 가진 사람이 앞서갑니다.</p>
        <h2>지금 Claude를 나만의 AI 업무 시스템으로 바꾸세요.</h2>
        <p>맞춤설정으로 나를 이해하고, Projects로 업무를 기억하고, Skills로 방식을 정리하고, Co-work로 실행까지 돕는 AI 업무 동료를 만들어보세요.</p>
        <a className="button primary" href={inquiryFormUrl} target="_blank" rel="noreferrer">지금 강의 문의하기</a>
      </section>
    </main>
  );
}

export default ClaudeLanding;

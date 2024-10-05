# TodoList 프로젝트

## Skill

- Next.js 14 : 서버사이드렌더링 + 정적 사이트 생성 등 빌드 시 서버를 생성한다.
- Typescript : Typing을 위한 언어
- TailwindCSS : 스타일링 시간을 단축하기 위한 유틸리티 클래스 제공
  CSS의 각 속성들을 클래스에 직관적으로 표현하여 효율적으로 사용할 수 있도록 제공함.
- Supabase : 관계형 DB(PostgreSQL), 스토리지, Edge Function(Serverless 서비스), Auth(OAuth2), Realtime 등 다양한 기능 제공

## RSC vs RCC

- RSC (React Server Component) : Server Side에서 생성가능

  - 데이터 조회
  - DB 직접 접근

- RCC (React Client Component) : SSR+CSR모두 가능
- SSR의 경우 미리 HTML을 만들어 두기 위햄.
  - 리액트 훅
  - 이벤트
  - 브라우저 BOM
  - 컴포넌트에 'use client'추가하면 클라이언트 컴포넌트가됨. => 서버사이드렌더링에서 사용 가능
    - SSR -> CSR

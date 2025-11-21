# 알고리즘 셰프 - Algorithm Chef

환영합니다! 이 프로젝트는 Anima에 의해 자동으로 생성된 React 애플리케이션입니다.
"알고리즘 셰프"는 사용자의 냉장고 속 식재료와 개인 성향을 기반으로 맞춤형 레시피를 추천하고, 식재료 나눔 커뮤니티를 제공하는 서비스입니다.

## 시작하기

> **전제 조건:**
> 다음 단계를 수행하려면 시스템에 [NodeJS](https://nodejs.org/en/)가 설치되어 있어야 합니다.

프로젝트를 시작하려면 먼저 다음 명령어로 의존성을 설치해야 합니다:

```bash
npm install
```

그 다음, 다음 명령어로 개발 버전을 실행할 수 있습니다:

```bash
npm run dev
```

몇 초 후, 프로젝트는 [http://localhost:5173/](http://localhost:5173/) 주소에서 접근할 수 있습니다.

결과에 만족하면, 다음 명령어로 릴리스용 프로젝트를 빌드할 수 있습니다:

```bash
npm run build
```

## 주요 기능

*   **반응형 디자인**: 모든 페이지는 다양한 화면 크기(데스크톱, 태블릿, 모바일)에 최적화되어 있습니다.
*   **통합 헤더**: 모든 페이지에 일관된 탐색 및 인증 기능을 제공하는 단일 헤더 컴포넌트가 적용되었습니다.
*   **메뉴 내비게이션**: 헤더 좌측의 햄버거 메뉴를 통해 주요 페이지(홈, 메뉴 추천, 재료 나눔 게시판, 마이페이지)로 쉽게 이동할 수 있습니다.
*   **사용자 인증**:
    *   로그인 및 회원가입 팝업 시스템.
    *   성별, 생년월일 입력 및 성향(건강 목표, 알레르기, 선호/비선호 재료, 선호 요리, 매운맛 선호도, 알림 설정) 선택 기능.
    *   로그인 시 사용자 이름 표시 및 로그아웃 버튼으로 전환.
    *   아이디/비밀번호 유효성 검사 및 중복 아이디 확인 (현재 `localStorage` 기반 목업).
*   **나의 냉장고**:
    *   식재료 목록을 카테고리별로 필터링하고 검색할 수 있습니다.
    *   새로운 식재료를 추가하거나 영수증을 등록할 수 있는 기능 (팝업 및 전용 페이지).
*   **메뉴 추천**:
    *   Gemini API와 연동될 검색창 (현재 목업).
    *   식재료 기반 및 성향 기반 자동 메뉴 추천 기능.
    *   레시피 카드를 최대 12개까지 표시하며, 좌우 스크롤 버튼으로 페이지 이동 가능.
    *   각 레시피 카드를 클릭하면 상세 레시피 페이지로 이동합니다.
*   **재료 나눔 게시판**:
    *   게시글 목록을 페이지네이션(최대 5페이지)으로 탐색할 수 있습니다.
    *   로그인한 사용자만 새 글을 작성할 수 있습니다.
    *   각 게시글은 고유한 댓글 기능을 가지며, 댓글은 `localStorage`에 저장됩니다.
    *   게시글 상세 페이지에서 현재 게시글의 앞뒤 2개씩, 총 4개의 관련 게시글을 표시합니다.
*   **마이페이지**:
    *   로그인 상태에 따라 사용자 성향 정보를 표시하거나 로그인 요청 메시지를 출력합니다.
    *   사용자의 건강 목표, 알레르기, 선호/비선호 재료, 선호 요리, 매운맛 선호도, 알림 설정을 확인할 수 있습니다.

## 백엔드 연동 가이드

이 프로젝트는 프론트엔드 기능 구현에 중점을 두었으며, 모든 데이터는 현재 `localStorage`를 사용하여 목업(mockup)으로 처리됩니다. 실제 백엔드와 연동하려면 다음 지침을 따르세요:

1.  **API 클라이언트 설치**: `axios`와 같은 HTTP 클라이언트 라이브러리를 설치합니다.
    ```bash
    npm install axios
    ```

2.  **API 엔드포인트 정의**: 백엔드에서 제공하는 API 엔드포인트를 정의합니다. 예:
    *   `GET /api/users/{username}/ingredients` (사용자 냉장고 재료)
    *   `GET /api/ingredients/all` (모든 식재료 DB)
    *   `POST /api/ingredients` (식재료 추가)
    *   `POST /api/login` (로그인)
    *   `POST /api/signup` (회원가입)
    *   `POST /api/users/{username}/preferences` (사용자 성향 저장)
    *   `GET /api/users/{username}/preferences` (사용자 성향 조회)
    *   `GET /api/posts` (모든 게시글)
    *   `POST /api/posts` (새 게시글 작성)
    *   `GET /api/posts/{id}/comments` (게시글 댓글 조회)
    *   `POST /api/posts/{id}/comments` (댓글 작성)
    *   `GET /api/recommend/ingredients` (식재료 기반 레시피 추천)
    *   `GET /api/recommend/tendencies` (성향 기반 레시피 추천)
    *   `POST /api/gemini-search` (Gemini API 검색)

3.  **목업 데이터 교체**: 프로젝트 코드 내의 `// TODO: Backend Integration: Replace with API call` 주석을 찾아 `localStorage`를 사용하는 목업 로직을 실제 `axios` 호출로 교체합니다.

    **예시 (로그인):**
    ```javascript
    // src/components/LoginPopup/LoginPopup.jsx
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/login', { username, password });
        login(response.data.user); // Assuming backend returns user data
        onClose();
      } catch (error) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        console.error("Login error:", error);
      }
    };
    ```

    **예시 (게시글 목록):**
    ```javascript
    // src/screens/CommunityPage/sections/Communitypage/Communitypage.jsx
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get('/api/posts');
          setAllPosts(response.data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
          setAllPosts(DEFAULT_POSTS); // Fallback to default posts
        }
      };
      fetchPosts();
    }, []);
    ```

4.  **환경 변수 설정**: API의 기본 URL 등은 `.env` 파일을 사용하여 관리하는 것이 좋습니다.
    ```
    VITE_API_BASE_URL=http://localhost:8080/api
    ```
    그리고 코드에서는 `import.meta.env.VITE_API_BASE_URL`과 같이 접근합니다.

이 가이드를 통해 "알고리즘 셰프" 프론트엔드를 실제 백엔드 서비스와 성공적으로 연동할 수 있을 것입니다.

# Carrot Market

## Tailwindcss Setup

1. npm install -D tailwindcss postcss autoprefixer
2. npx tailwindcss init -p
    - postcss.config.js
    - tailwind.config.js 생성
        - contenet 설정 : 어느 파일에 tailwindcss를 사용할건지 설정함.
3. globals.css 수정

### Tailwindcss

1. 기본은 모바일 버전으로 시작해 Desktop 버전으로 사이즈 조절 할수 있다.
2. 3.0 이전에서는 빌드할떄 사용하는 클래스명을 제외하고 전부 삭제하는 purging 프로세스가 필요했다. 3.0이후로는 사용하는 클래스만 생성해준다(JIT:Just In Time Compiler)
3. 원하는 크기로 변경하고 싶을때는 /** className="text-[12px] bg-[url('imageUrl')] text-[#000]" **/ 이런식으로 넣어준다.

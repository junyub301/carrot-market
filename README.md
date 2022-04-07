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

## Prisma

1. npm i prisma -D
2. npx prisma init
3. .env에서 DATABASE_URL 수정
4. /prisma/schema.prisma 파일 수정

## PlanetScale cli / mysql-client 설치

1. brew install planetscale/tap/pscale
2. brew install mysql-client
3. pscale auth login 명령 실행 후 로그인
4. pscale database create carrot-market --region ap-northeast 로 데이터베이스 설치
5. pscale connect carrot-market로 데이터베이스 연결 -> 출력된 url을 가지고 .env DATABASE_URL 수정
6. npx prisma db push

## Error

Next.js ODR(On-demand Revalidation)를 사용하기 위해 Next 버전을 12.1.0으로 올렸더니
"Cannot set property 'reactRoot' of undefined" 에러 발생

-   해결방법
    next.config.js의 moudle.expors 안에 다음 코드 추가

```
experimental: {
reactRoot: true,
},
```

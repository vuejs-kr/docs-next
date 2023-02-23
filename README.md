# after 2023.02

공식 번역 사이트로 이전 되었습니다. 

https://github.com/vuejs-translations/docs-ko

이후의 번역 작업은 위 본가쪽 저장소에서 진행됩니다. 

이 저장소에 참여해 주신 분들에게 감사드립니다 :) 


조만간 본 저장소는 archive 모드로 전환될 예정입니다 




# after 2022.04

vue v3 문서 번역을 위한 저장소입니다 

현재 번역이 진행중입니다. 2022.04.18

브랜치는 main 입니다.

vue의 새로운 문서 시스템이 vitepress를 적극적으로 사용하면서 gitlocalize로는 지나치게 많은 부분이 깨지는 현상이 발생하여 사용이 힘들다고 판단되어 

main 브랜치를 기준으로 PR을 받는 방식으로 번역중에 있습니다. 

main 브랜치를 체크아웃 받으신후 번역은 ko-KR 디렉토리에서 해주시면됩니다. 

루트 폴더는 Upstream과의 싱크를 위해 사용될 예정입니다. 



# vuejs.org

## Contributing

This site is built with [VitePress](https://github.com/vuejs/vitepress) and depends on [@vue/theme](https://github.com/vuejs/vue-theme). Site content is written in Markdown format located in `src`. For simple edits, you can directly edit the file on GitHub and generate a Pull Request.

For local development, [pnpm](https://pnpm.io/) is preferred as package manager:

```bash
pnpm i
pnpm run dev
```

This project requires Node.js to be `v14.0.0` or higher, because we use new JavaScript features in our code, such as optional chaining.


## Working on the content

- See VitePress docs on supported [Markdown Extensions](https://vitepress.vuejs.org/guide/markdown.html) and the ability to [use Vue syntax inside markdown](https://vitepress.vuejs.org/guide/using-vue.html).

- See the [Writing Guide](https://github.com/vuejs/docs/blob/main/.github/contributing/writing-guide.md) for our rules and recommendations on writing and maintaining documentation content.

## Working on the theme

If changes need to made for the theme, check out the [instructions for developing the theme alongside the docs](https://github.com/vuejs/vue-theme#developing-with-real-content).

# Botanical typography

The garden uses the Latin subsets of EB Garamond, served locally under the
`Botanical Serif` CSS family. Regular and italic files retain the variable
weight range from 400 to 800. Both use `font-display: swap`, with Georgia as
the fallback. Interface controls use the system sans-serif stack.

| File | Bytes |
| --- | ---: |
| EBGaramond-Latin.woff2 | 44,172 |
| EBGaramond-Italic-Latin.woff2 | 47,824 |
| Total | 91,996 |

The font declarations live in the botanical route's stylesheet. Its family
alias is scoped to `.botanical-page`, with a conditional document font for
root metrics while the garden is mounted. Other portfolio pages keep their
existing fonts. There are no runtime requests to Google Fonts.

## Sources and license

Downloaded on 2026-11-06 from the Google Fonts CSS API. The WOFF2 binaries
are unmodified; the complete SIL Open Font License is included in `OFL.txt`.

- [Upstream family and source files](https://github.com/google/fonts/tree/main/ofl/ebgaramond)
- [Google Fonts stylesheet](https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap)
- [Regular Latin WOFF2](https://fonts.gstatic.com/s/ebgaramond/v33/SlGUmQSNjdsmc35JDF1K5GR1SDk_YAPI.woff2)
- [Italic Latin WOFF2](https://fonts.gstatic.com/s/ebgaramond/v33/SlGWmQSNjdsmc35JDF1K5GRweDs1ZyHKpWg.woff2)
- [Upstream license](https://github.com/google/fonts/blob/main/ofl/ebgaramond/OFL.txt)

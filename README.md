# Prototyp: vibe coding + Cloudflare

Klikalny prototyp robiony w rozmowie z AI (Claude Code), bez Figmy. Każda opublikowana zmiana
trafia automatycznie pod stały link, który można wysłać zespołowi albo klientowi.

```
Ty opisujesz zmianę → Claude zmienia kod → podgląd na swoim komputerze
→ /opublikuj → GitHub → Cloudflare buduje (~1–2 min) → link jest aktualny
```

- **Główny link** (`main`): wersja dla klienta.
- **Warianty**: każda gałąź (np. „checkout-v2”) ma osobny link do podglądu, a główny link się nie
  zmienia.

---

## 1. Instalacja na komputerze (raz, ~20 min)

1. Zainstaluj:
   - **Node.js 24** ze strony [nodejs.org](https://nodejs.org) (wersja LTS),
   - **Git**: na Macu wystarczy w Terminalu wpisać `xcode-select --install`,
   - **Claude Code**: `curl -fsSL https://claude.ai/install.sh | bash`
     ([instrukcja](https://code.claude.com/docs/en/setup)). Wymaga płatnego konta Claude
     (Pro/Max/Team). Wolisz bez terminala? To samo działa w aplikacji Claude Desktop, w zakładce
     *Code*.
2. Pobierz projekt i zainstaluj zależności (w Terminalu):
   ```bash
   git clone <adres-repo>
   cd <nazwa-repo>
   npm install
   ```
3. Uruchom `claude` w tym folderze i napisz: **„uruchom podgląd”**. Prototyp otworzy się pod
   http://localhost:5173 i będzie się odświeżał sam przy każdej zmianie.

## 2. Podpięcie Cloudflare (raz, ~10 min)

Potrzebny jest dostęp do konta Cloudflare (ERI) i do repo na GitHubie.

1. **Nazwa linku.** W pliku `wrangler.jsonc` pole `name` (np. `atlantic-prototyp`) będzie częścią
   adresu. Ustaw ją przed podpięciem, bo późniejsza zmiana zmienia link.
2. W [panelu Cloudflare](https://dash.cloudflare.com): **Workers & Pages → Create application →
   Import a repository**. Połącz GitHuba (zgoda na dostęp do tego repo) i wybierz repo.
3. Ustawienia (nazwy przycisków mogą się trochę różnić):
   | Pole | Wartość |
   | --- | --- |
   | Project / Worker name | **dokładnie** to samo co `name` w `wrangler.jsonc` |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Preview builds (gałęzie inne niż `main`) | włączone, polecenie `npx wrangler preview` |
4. **Deploy.** Po 1–2 minutach prototyp działa pod
   `https://<name>.<subdomena-konta>.workers.dev`.
5. Wpisz ten link do `AGENTS.md` w sekcji *Links*, żeby Claude podawał go po publikacji.

### Zabezpieczenie linku (zalecane, gdy prototyp jest dla klienta)

Bez tego link jest „niepubliczny, ale otwarty”: nie trafi do Google, ale każdy, kto go ma, może
wejść.

Worker w panelu → **Settings → Domains & Routes** → przy *workers.dev* i *Preview URLs* kliknij
**Enable Cloudflare Access** → **Manage Cloudflare Access** i dodaj adresy e-mail, które mają mieć
dostęp (konkretne osoby albo całą domenę, np. `@klient.com`). Wchodzący podaje e-mail i dostaje
jednorazowy kod.

> Reguła dostępu do *Preview URLs* jest wspólna dla całego konta Cloudflare. Uzgodnij ją z osobą,
> która zarządza kontem.

## 3. Codzienna praca

1. Otwórz Terminal w folderze projektu i wpisz `claude`.
2. Opisuj, co chcesz zobaczyć, np.:
   - „Dodaj ekran koszyka z listą produktów i podsumowaniem”
   - „Po kliknięciu *Pay* pokaż ekran potwierdzenia”
   - „Zmień główny kolor na granatowy i zaokrąglij bardziej przyciski”

   Możesz pisać po polsku. Prototyp (teksty, nazwy ekranów, adresy, przykładowe dane) jest po
   angielsku, więc Claude sam przetłumaczy treści.
3. Sprawdzaj efekt na http://localhost:5173 (poproś „uruchom podgląd”, jeśli nie działa).
4. Gotowe? Napisz **`/opublikuj`**. Claude sprawdzi, czy wszystko się buduje, zapisze zmiany i
   zapyta o zgodę na wysłanie. Po 1–2 minutach zmiany są pod linkiem.

### Warianty: osobny link na „wersję B”

- **`/wariant checkout-v2`**: Claude tworzy osobną gałąź. Po `/opublikuj` wariant ma własny link
  `https://checkout-v2-<name>.<subdomena-konta>.workers.dev`. Główny link się nie zmienia.
- Wariant wygrał? Napisz: „przenieś wariant checkout-v2 na główny link”.
- Powrót do głównej wersji: „przełącz na main”.

## Gdzie co jest

| Co | Gdzie |
| --- | --- |
| Ekrany | `src/screens/` (jeden plik = jeden ekran) |
| Lista ekranów na stronie głównej (*All screens*) | `src/screens/index.ts` |
| Nazwa i opis prototypu | `src/prototype.ts` |
| Przykładowe dane | `src/mocks/` |
| Kolory, zaokrąglenia, font | `src/index.css` |
| Instrukcje dla AI | `AGENTS.md` |

## Gdy coś nie działa

- **Link nie pokazuje zmian**: odczekaj 2 minuty i odśwież stronę z pominięciem cache
  (Cmd+Shift+R). Status budowania: panel Cloudflare → Worker → *Deployments*.
- **Budowanie na Cloudflare się nie udało**: skopiuj log z panelu i wklej Claude'owi z prośbą
  „build na Cloudflare nie przechodzi, oto log”.
- **`npm install` odmawia instalacji paczki**: projekt celowo nie instaluje paczek młodszych niż 7
  dni (ochrona przed złośliwymi paczkami). Claude dobierze starszą wersję.
- **Awaryjnie, bez GitHuba**: `npx wrangler login` (raz), potem `npm run deploy`.

## Zasady

- Żadnych prawdziwych danych klienta, haseł ani kluczy API. Repo i link mogą zobaczyć inne osoby.
- Repo z prototypem dla klienta powinno być na GitHubie **prywatne**.

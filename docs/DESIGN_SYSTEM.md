# DESIGN SYSTEM — KOUD · Digital Engineering Experience

Source de vérité du code : `app/styles/tokens.css` (thèmes) et `app/globals.css` (Tailwind v4 `@theme`).

## 1. Lecture de la référence (9 interfaces)

| Trait observé | Décision |
|---|---|
| Fond bleu-noir profond, halos bleus diffus, globe terrestre | Fond `--bg` + « atmosphère » (radial gradients colorés par `--atmo`) + scène WebGL abstraite (champ de points en sphère, rappel du globe sans imagerie générique) |
| CTA vert acide plein + CTA secondaire contour | `Button` variants `primary` / `ghost` |
| Eyebrow en petites capitales espacées, couleur accent | `Eyebrow` en Geist Mono 11–12 px, `tracking 0.18em` |
| Titres massifs blancs, interlignage serré | Échelle `display` fluide, `-0.045em` |
| Rangée de chiffres clés sous le hero | `FactRow` : **uniquement des faits vérifiés** (pas de « 100 % Passion ») |
| Navigation fine, pill « Me contacter → » | `SiteHeader` flottant, pill CTA |
| Cartes projets avec capture + tags + flèche | `ProjectCard`. Sans capture réelle → **couverture typographique** propre au projet (jamais une fausse capture) |
| Onglets soulignés (Aperçu, Interfaces, Architecture…) | `CaseStudyNav` : ancres sticky avec soulignement animé |
| Galerie Desktop / Tablette / Mobile | `Gallery` : segmented control + lightbox clavier |
| Chatbot avec orbe lumineux, questions suggérées | `KoudAI` : orbe CSS animé (pas d'image), suggestions en chips |
| Contact : formulaire sur panneau vitré | `Panel` + formulaire tokenisé |

Améliorations apportées : contrastes ≥ 4,5:1 sur tous les textes (la référence utilise des gris trop pâles) ; hiérarchie à 3 niveaux au lieu de 2 ; cible tactile ≥ 44 px ; mobile conçu, pas réduit.

## 2. Tokens sémantiques

Aucun composant ne référence une couleur brute. Tout passe par ces variables, redéfinies par thème via `html[data-theme]`.

| Token | Rôle |
|---|---|
| `--bg` | Fond de page |
| `--surface` | Panneaux, cartes |
| `--surface-2` | Champs, états survolés |
| `--line` / `--line-strong` | Bordures |
| `--text` | Texte principal |
| `--text-muted` | Texte secondaire (≥ 4,5:1 sur `--bg` et `--surface`) |
| `--accent` | Remplissage des CTA principaux |
| `--accent-ink` | Texte posé sur `--accent` |
| `--accent-fg` | Accent utilisé **comme couleur de texte** (variante plus claire ou plus foncée pour rester lisible) |
| `--atmo-1`, `--atmo-2` | Couleurs d'ambiance : halos, scène 3D, orbe IA |
| `--focus` | Anneau de focus |
| `--glass` | Fond des surfaces vitrées (header, panneaux) |
| `--danger`, `--success` | États de formulaire |

### Thèmes

| Thème | `--bg` | `--surface` | `--accent` | `--accent-ink` | `--atmo-1` | Usage |
|---|---|---|---|---|---|---|
| **Obsidian** (défaut, fidèle à la référence) | #080B12 | #111827 | #B9FF66 | #0A0F05 | #2563EB | noir premium + vert acide |
| **Midnight** | #070A14 | #0F172A | #2563EB | #FFFFFF | #3B82F6 | noir + bleu électrique |
| **Aurora** | #0A0B1E | #14143A | #7C3AED | #FFFFFF | #8B5CF6 | bleu nuit + violet |
| **Daylight** | #F6F7FA | #FFFFFF | #1D4ED8 | #FFFFFF | #2563EB | clair éditorial |
| **Ivory** | #F3F0E8 | #FBF9F3 | #141414 | #F3F0E8 | #A16207 | blanc cassé + noir |
| **System** (défaut) | — | — | — | — | — | résout vers Obsidian ou Daylight selon `prefers-color-scheme` ; c'est le choix par défaut, pour respecter l'appareil. Pour imposer Obsidian, modifier `DEFAULT_PREFS` dans `lib/theme.ts`. |

Les ratios de contraste sont **calculés et testés** par `tests/contrast.spec.ts` et affichés en direct dans le Lab (« Contrast Inspector »).

### Modificateurs (Theme Studio)

- `data-contrast="high"` : `--text-muted` rapproché de `--text`, bordures renforcées. Il remplace un « curseur de luminosité », qui aurait dégradé les contrastes.
- `data-motion="reduced"` : force le mouvement réduit même si l'OS ne le demande pas. Le réglage de l'OS est **toujours** respecté.
- `data-perf="lite"` : désactive WebGL, flous `backdrop-filter`, parallaxe. Il est activé automatiquement si `navigator.connection.saveData` ou si `hardwareConcurrency ≤ 2`. La 3D n'est de toute façon chargée que sur écran ≥ 1024 px.

## 3. Typographie

- **Geist Sans** (variable, OFL, déjà présente dans le repo) : titres et texte.
- **Geist Mono** : métadonnées techniques (eyebrows, années, stacks, compteurs).
- Raison : la référence utilise une grotesque géométrique ; Geist est sous licence libre, déjà locale (zéro requête réseau), et son mono jumeau crée naturellement le contraste « éditorial vs. technique » demandé.

| Style | Taille | Graisse | Interlignage | Tracking |
|---|---|---|---|---|
| `display-xl` (hero) | clamp(2.75rem, 7.2vw, 6.75rem) | 600 | 0.95 | -0.045em |
| `display-l` (titres de page) | clamp(2.25rem, 5vw, 4.5rem) | 600 | 1.0 | -0.04em |
| `h2` | clamp(1.75rem, 3vw, 2.75rem) | 600 | 1.05 | -0.03em |
| `h3` | 1.25rem | 600 | 1.25 | -0.015em |
| `body-l` | 1.125rem | 400 | 1.6 | 0 |
| `body` | 1rem | 400 | 1.65 | 0 |
| `meta` (mono) | 0.75rem | 500 | 1.4 | 0.14em, majuscules |

## 4. Espacements, rayons, grilles

- Échelle 4 px (Tailwind par défaut).
- Sections : `py-24 md:py-32`. Gouttière : `px-4 sm:px-6 lg:px-10` (16 px minimum sur mobile).
- Conteneur : `max-w-[1280px]`. Texte long : `max-w-[68ch]`.
- Rayons : `--radius-sm` 8px · `--radius` 14px · `--radius-lg` 22px · pill.
- Grille projets : 1 col (< 640) → 2 (≥ 768) → 3 (≥ 1200). La carte « featured » (DECLIC) occupe 2 colonnes.

## 5. Mouvement

| Token | Valeur |
|---|---|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--dur-fast` | 160ms |
| `--dur` | 320ms |
| `--dur-slow` | 700ms |

Principes : le mouvement **révèle** (apparition, profondeur), il ne décore pas. Pas de défilement détourné (pas de Lenis). Aucune animation ne bloque le contenu : le texte est visible sans JS (les révélations partent d'un état visible si JS est désactivé). En mouvement réduit, toutes les translations, la parallaxe et la rotation 3D sont coupées ; seuls les fondus ≤ 160 ms restent.

## 6. Composants fondamentaux

`Button` · `LinkButton` · `Eyebrow` · `Tag` · `Panel` · `SectionHeading` · `Reveal` · `SiteHeader` · `MobileMenu` · `ThemeStudio` · `SiteFooter` · `ProjectCard` · `ProjectCover` · `FilterBar` · `Gallery` · `Lightbox` · `CaseStudyNav` · `ArchitectureDiagram` · `Timeline` · `VideoPlayer` · `KoudAI` · `ContactForm` · `Prose` (MDX).

Règles : focus visible partout (`outline 2px var(--focus)`, offset 3px) ; cibles ≥ 44 px ; tout survol a un équivalent `:focus-visible` ; aucun bouton inactif présenté comme actif (les éléments en attente de contenu sont libellés comme tels).

## 7. À éviter (rappel du brief)

Cartes identiques partout, dégradés sans intention, faux terminaux, barres de compétences, chiffres non sourcés, images génériques.

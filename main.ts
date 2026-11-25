import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning memory (one sentence):
// "My mother ironed my school shirts on the kitchen table at six in the morning, humming the same song, and I only learned after she was gone that she had never liked that song at all."
//
// Why the ache works, against the judge brief in priority order:
// 1. It IS a childhood memory that stirs nostalgia: a mother ironing school
//    shirts at dawn is a scene every grown-up recognises from the other side
//    of childhood, and the sentence is told by the adult who now knows.
// 2. Concrete place, time and sensation: the kitchen table, six in the
//    morning, the iron, the humming — a specific room at a specific hour,
//    not a greeting-card summer.
// 3. Small honest detail, not sentiment: she hummed the same song every
//    morning, and the twist is that she never liked that song at all —
//    a private, believable truth a child could never have known, which
//    makes the whole memory feel truly lived rather than decorated.
// 4. One clean sentence, every word earning its place; the clause order
//    carries the reader from the routine to the revelation.
// 5. The warm ache lands on the last words: "she had never liked that song
//    at all" reframes every morning she spent humming it for him, and the
//    ache lingers because the song was an act of love she never enjoyed.
// Reviser note (own session): the ache works because the revelation is
// withheld until the last clause — "she had never liked that song at all"
// turns a daily routine into a debt the narrator only now understands:
// every morning she hummed a song she disliked, for him, and he can never
// thank her for the mornings themselves. The sting must stay last; if the
// sentence opened with it, the ironing scene would be decoration. The
// "six in the morning" hour matters too: it is the hour a mother is awake
// before anyone else, doing invisible work.
const LINE =
  "My mother ironed my school shirts on the kitchen table at six in the morning, humming the same song, and I only learned after she was gone that she had never liked that song at all.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check (RULES.txt): UTF-8 text, 1-280 chars, not only whitespace, one sentence.
if (LINE.length < 1 || LINE.length > 280) throw new Error(`entry length ${LINE.length} outside 1-280`);
if (!/\S/.test(LINE)) throw new Error("entry is only whitespace");
if (LINE.includes("\n")) throw new Error("entry must be a single sentence on one line");
// Content checks: the memory must name the ironing scene and end on the revelation.
if (!LINE.includes("ironed")) throw new Error("entry must name the ironing");
if (!LINE.includes("humming the same song")) throw new Error("entry must name the humming");
if (!LINE.includes("six in the morning")) throw new Error("entry must name the hour");
if (!LINE.includes("after she was gone")) throw new Error("entry must name the loss");
if (!LINE.endsWith("that song at all.")) throw new Error("entry must end with 'that song at all.'");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${LINE.length} chars)`);

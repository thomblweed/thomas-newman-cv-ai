# Answer card form follows the narrowed result set

An Answer card is derived on the client from a `get_roles` tool result (ADR 0003),
and the form it takes is now chosen by **cardinality alone**: one Role renders a
Full card, two render one Compact card each, and three or more render a single
List block with one row per Role. `sections: []` still suppresses the
card entirely, and `sections` otherwise only emphasises — it never selects the
form.

The previous rule was "hint first, cardinality as the fallback", which meant an
unfiltered result of eleven Roles produced eleven Compact cards above the prose of
a two-sentence answer. The wall was not a component bug: it was the client
faithfully rendering a result set that had never been narrowed, because the tool
had no way to express most narrowing. So the decision has two halves that only
work together — the form is a pure function of cardinality, and `get_roles` gains
deterministic filters (`tech`, `industry`, `employmentType`, alongside the
existing `company` and date filters) so the cardinality can actually be small.

The property worth remembering is that the cardinality rule is a **terminal
guarantee**: because a detailed card requires a result of one or two Roles, no
tool call — however badly scoped by the model — can produce a wall of detailed
cards again. Maximum detail is bounded by result size, not by model obedience.
The cost is that a question whose result is legitimately broad gets an overview
(List rows) rather than detail, which is the correct trade: an overview question
is answered by an overview.

The List block is an overview that still answers the question: each row shows
identity plus a one-line summary chosen from the `sections` hint (matching Tech
chips when `tech` was filtered, otherwise a technology count; responsibility or
achievement counts; duration). Rows carry no expandable detail.

## Considered Options

- **A "narrowed or nothing" gate** — render cards only when the result carries a
  narrowing signal, otherwise none. Rejected: it requires the client to infer
  "was this narrowed?" from `part.arguments`, which is the same fragile
  argument-inspection that produced the original behaviour, and it leaves a
  career-overview question with no visual answer at all.
- **A client-side cap (render N, collapse the rest behind "show more")** —
  rejected as a standalone rule. The cap survives here as a *consequence* of the
  cardinality rule, without new interaction state or a truncation affordance.
- **A free-text `match` parameter scanned across tech, tags, industry, title and
  content** — rejected: one parameter for every question is tempting, but it
  makes "why did this Role match?" unanswerable and matches prose ("I used Java
  once") as eagerly as it matches a tech stack.
- **A new presentation parameter so the model picks the form** — rejected:
  layout vocabulary in a data tool, and `sections` already carries the semantic
  intent ADR 0003 established.
- **Truncating the List form** — rejected: collapsed rows stay one block, so
  eleven rows still read as an overview, and truncation is new state for no reported pain.
- **A plain identity-only List row** — rejected: a title and dates per Role answered
  none of the question asked (e.g. achievements, React usage). The hint-driven summary line fixes that.
- **Expandable List rows** — tried and rejected: the disclosure marker rendered above the
  title and the per-Role detail is more than an overview needs.

## Consequences

- **Compact** is narrowed to exactly two Roles; it is no longer the general
  multi-Role fallback.
- **`sections` gains `period`**, so timeline questions have an emphasis to
  express. It remains an intent about the answer, read from `part.arguments`, and
  still never changes what the tool returns.
- A filter matching nothing returns `[]` and the assistant says it does not have
  that information. There is **no silent widening**: widening for a precise
  question would resurrect the wall exactly where the model was being careful.
- `tech` and `industry` use **OR** semantics — the common question is "have you
  worked with X?" — documented in the tool description rather than inferred.
- ADR 0003's core decision (derive the card on the client from the existing tool
  result; model intent, UI only) is unchanged and still stands. This record
  replaces only its *scope* section.

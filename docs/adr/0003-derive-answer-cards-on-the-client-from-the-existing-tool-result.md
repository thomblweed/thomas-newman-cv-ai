# Derive Answer cards on the client from the existing tool result

The chat's structured answers — Tech chips, responsibilities and achievements — are
derived on the client from the `get_roles` tool result already carried on the
assistant message, rather than by giving the model an `outputSchema` and rendering
the object it streams. TanStack AI documents streaming structured output, and an
`outputSchema` would hand the client a typed payload, but it makes the _whole_ answer
one object: every question, including one whose answer is a phone number, would have
to fit that schema, and the model's conversational freedom and tool-first flow would
be traded away to obtain data we already have. Markdown directives (a fenced block
the model emits, swapped for a component) and restyling the existing markdown were
the other alternatives — the first puts layout syntax in the prompt, the second
cannot show icons.

The consequence worth remembering is that the answer path is front-end only:
`ToolCallPart.output` is the single source for a card, and the model's token payload
is deliberately left unchanged so answer quality is unaffected.

## Answer card scope

A card is rendered in two forms, chosen on the client by
`resolveAnswerCard(role, sectionsHint, roleCount)`, not by the model:

- **Full** — one Role and no hint: identity header, every Tech chip, and the
  Responsibilities and Key Achievements sections open.
- **Compact** — a broad answer (more than one Role): identity header, every Tech
  chip, and a count line, with the two sections behind one collapsed native
  `<details>`.

Every card carries the Role's identity — company (with the client appended when
one exists), title and period — because a card whose rows cannot be attributed to
a Role is not an answer. The counts are derived from the parsed markdown, never
from the tool output's frontmatter fields.

## Model intent, UI only

`get_roles` accepts an optional `sections` array
(`'tech' | 'responsibilities' | 'achievements'`). The model uses it to say what the
question is _about_ — `['responsibilities']` for "what did you do at Slice?", absent
for a career overview, `[]` for a question that had to call the tool but wants no
card. It is a semantic intent, not layout syntax: the client reads it from
`part.arguments` and it does **not** change what the tool returns to the model, so
the "payload deliberately left unchanged" property above still holds for input as
well as output. Precedence is hint first, cardinality as the fallback, so a dropped
hint degrades to a sane default rather than a wrong card.

`get_roles` also accepts an optional free-text `company`, matched
case-insensitively against both `company` and `client` and applied server-side, so
the model can narrow a role-specific question to one Role before the card is
resolved. The model chooses scope; the client chooses form.

A future feature that wants the model to _choose_ layout may add `outputSchema`
alongside this, but should not replace it.

## Considered Options

- **A model-chosen `view` enum instead of `sections`.** Rejected: `sections`
  composes ("tech + achievements"), expresses suppression as `[]`, and carries no
  presentation vocabulary the data tool would have to own.
- **A client that infers the answer shape from the question text.** Rejected: the
  client cannot reliably read intent, and a wrong guess is worse than the compact
  default.
- **Splitting `get_roles` into a compact and a detailed tool.** Rejected for now:
  it makes the model's tool _choice_ carry presentation meaning and doubles the
  tool surface for one data source.
- **Exact-match `company` filter or a slug enum.** Rejected: the model has never
  seen `Buildit | Wipro Digital` or the filenames before its first call, so both
  fail exactly when they are needed.

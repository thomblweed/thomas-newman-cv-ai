# Thomas Newman CV AI

A portfolio site that answers questions about Thomas Newman's professional experience through a chat interface backed by a language model.

## Language

**Thread**:
One continuous conversation between a visitor and the CV assistant. A new Thread begins on each page load, and its transcript is not retained once the page is closed.
_Avoid_: Session, conversation, chat

**Role**:
One employment engagement in the CV: a period at a single company, or — for consulting engagements — a single client project within that period. Each Role is one markdown file under `data/cv/roles/`, and its period is what the assistant filters on when asked about a time range.
_Avoid_: Job, position, entry

**Current role**:
The Role whose period has no end — the only one whose period end is "present". The CV data has exactly one at a time, so "current" is read from the data rather than declared in code.
_Avoid_: Latest role, present role

**Answer card**:
A block the chat renders with an answer, built from the Role tool result rather than from the model's prose. Every Answer card names its Role, and its form follows how many Roles the result contains: **Full** for one Role, **Compact** for two, and **List** for three or more. One Answer card is rendered per Role in the Full and Compact forms; List renders one block of rows.
_Avoid_: Tool result, rich block, table, panel

**Full Answer card**:
The Answer card for a single Role: identity, every Tech chip, and the responsibilities and achievements sections open. Sections the question is not about may be omitted, but the card never collapses behind a disclosure.
_Avoid_: Detailed card, expanded card

**Compact Answer card**:
The Answer card for one of exactly two Roles in an answer: identity, every Tech chip, and a count line, with the responsibilities and achievements sections behind one collapsed disclosure.
_Avoid_: Summary card, teaser card

**List Answer card**:
The Answer card for an answer spanning three or more Roles: one block holding a row per Role. A row shows the identity — company with its client, title and period — plus a one-line summary taken from the Sections hint, with no expandable detail.
_Avoid_: Summary list, role list, table

**Filter**:
A narrowing dimension the model passes to the Role tool so the Role tool result contains only the Roles a question is about. The closed dimensions are a period, a company or client, a technology, an industry, and a working arrangement; each is deterministic, and a Filter that matches no Role yields no Roles rather than widening.
_Avoid_: Query, search, constraint

**Tech chip**:
One technology in a Role's tech stack, shown as a label with its icon.
_Avoid_: Tag, badge, pill

**Sections hint**:
The optional `sections` list the model passes to the Role tool to say which parts of an Answer card the question is about — tech stack, responsibilities, achievements, period, or any combination. It is an intent about the answer, not a layout instruction: the client reads it from the tool call's arguments, an empty list means render no Answer card, and it never changes what the tool returns to the model.
_Avoid_: View, template, rendering config

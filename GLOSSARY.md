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
A block the chat renders with an answer, built from the Role tool result rather than from the model's prose. Every Answer card names its Role and comes in one of two forms: **Full** (identity, Tech chips, and the responsibilities and achievements sections open) when one Role answers the question, and **Compact** (identity, Tech chips, and a count line, with the sections collapsed) when several Roles do. One Answer card is rendered per Role.
_Avoid_: Tool result, rich block, table, panel

**Tech chip**:
One technology in a Role's tech stack, shown as a label with its icon.
_Avoid_: Tag, badge, pill

**Sections hint**:
The optional `sections` list the model passes to the Role tool to say which parts of an Answer card the question is about — tech stack, responsibilities, achievements, or any combination. It is an intent about the answer, not a layout instruction: the client reads it from the tool call's arguments, an empty list means render no Answer card, and it never changes what the tool returns to the model.
_Avoid_: View, template, rendering config

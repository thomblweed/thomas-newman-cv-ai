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

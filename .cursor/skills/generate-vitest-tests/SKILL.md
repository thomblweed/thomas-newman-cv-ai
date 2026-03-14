---
name: generate-vitest-tests
description: Generate tests for a file using Vitest and Testing Library with strict BDD-style naming conventions
---

Write comprehensive tests for the selected file using **Vitest** and **Testing Library**.

Follow these conventions strictly:

## Test Structure Rules

1. **No top-level `describe` block** wrapping the whole file — the filename provides that context. Only use `describe` when grouping multiple tests for the same "When" condition.
2. Test descriptions must use BDD style.

Single test (top-level):

```tsx
it('should do something when the user performs an action')
```

3. If there are **multiple tests for the same "When" condition**, group them using a `'When ...'` describe block:

```tsx
describe('When the user submits the form', () => {
  it('should call the submit handler');
  it('should disable the submit button');
});
```

4. The **describe block describes the user action**.
5. The **it block describes the expected outcome**.

## Testing Stack

Use:

- Vitest (environment: `happy-dom`)
- Testing Library
- userEvent for interactions
- screen queries
- accessible queries first (`getByRole`, `getByLabelText`, etc.)

Vitest globals (`describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`, etc.) are available in every test file without importing — do **not** import them from `vitest`.

Imports and top-level setup should follow this pattern:

```ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
```

`userEvent.setup()` is called once at the top of the file and shared across all tests — never inside individual `it` blocks.

## Mock lifecycle

- `beforeEach`: initialise state required for tests to run correctly.
- `afterEach`: clear mocks and reset spy call history only.

```ts
beforeEach(() => {
  mockFlag = false;       // required setup — test depends on this starting value
});

afterEach(() => {
  mockFn.mockClear();     // reset only — clears call history between tests
});
```

Never put `mockClear` / `mockReset` in `beforeEach`, and never put required state initialisation in `afterEach`.

## Known limitation

`userEvent.keyboard` does not reliably propagate keyboard modifier state (e.g. `shiftKey`) in happy-dom. Use `fireEvent.keyDown` with an explicit modifier object for those cases:

```ts
import { fireEvent } from '@testing-library/react';

fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
```

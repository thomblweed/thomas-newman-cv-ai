import { messageDrawsContent } from './messageDrawsContent';

import type { ChatContextType } from '../types/ChatContext.type';
import type { Role } from '../../interfaces/role.interface';

type Message = ChatContextType['messages'][number];
type MessagePart = Message['parts'][number];

const makeRole = (overrides: Partial<Role> = {}): Role => ({
  type: 'role',
  company: 'Slice',
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  duration_months: 10,
  employment_type: 'full-time',
  tech_stack: ['react'],
  content: '## Responsibilities\n\n### Delivery\n\nShipped new features',
  ...overrides
});

const makeMessage = (parts: MessagePart[]): Message =>
  ({ role: 'assistant', parts }) as Message;

const textPart = (content: string) =>
  ({ type: 'text', content }) as MessagePart;

const toolCallPart = ({
  name = 'get_roles',
  state = 'complete',
  arguments: args = '{}',
  output
}: {
  name?: string;
  state?: string;
  arguments?: string;
  output?: unknown;
} = {}) =>
  ({
    type: 'tool-call',
    id: 'tool-call-1',
    name,
    arguments: args,
    state,
    output
  }) as MessagePart;

it('should draw content when a text part has text', () => {
  expect(messageDrawsContent(makeMessage([textPart('Hello')]))).toBe(true);
});

it('should not draw content when a message has no parts', () => {
  expect(messageDrawsContent(makeMessage([]))).toBe(false);
});

it('should not draw content when a text part is only whitespace', () => {
  expect(messageDrawsContent(makeMessage([textPart('   ')]))).toBe(false);
});

it('should draw content for a thinking part', () => {
  expect(
    messageDrawsContent(
      makeMessage([{ type: 'thinking', content: '' } as MessagePart])
    )
  ).toBe(true);
});

describe('When a message carries a get_roles call', () => {
  it('should draw content once the call is complete and a role resolves to a card', () => {
    expect(
      messageDrawsContent(makeMessage([toolCallPart({ output: [makeRole()] })]))
    ).toBe(true);
  });

  it('should not draw content while the call is still streaming', () => {
    expect(
      messageDrawsContent(
        makeMessage([toolCallPart({ state: 'input-complete' })])
      )
    ).toBe(false);
  });

  it('should not draw content when the call returned no roles', () => {
    expect(
      messageDrawsContent(makeMessage([toolCallPart({ output: [] })]))
    ).toBe(false);
  });

  it('should not draw content when the roles have nothing for a card to show', () => {
    const role = makeRole({
      content: '# A role with no lists',
      tech_stack: []
    });

    expect(
      messageDrawsContent(makeMessage([toolCallPart({ output: [role] })]))
    ).toBe(false);
  });

  it('should not draw content when the sections hint suppresses every card', () => {
    expect(
      messageDrawsContent(
        makeMessage([
          toolCallPart({ arguments: '{"sections":[]}', output: [makeRole()] })
        ])
      )
    ).toBe(false);
  });

  it('should not draw content for another tool', () => {
    expect(
      messageDrawsContent(
        makeMessage([
          toolCallPart({ name: 'get_profile', output: { email: 'a@b.com' } })
        ])
      )
    ).toBe(false);
  });
});

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/')({
  component: App
});

function App() {
  return <div></div>;
}

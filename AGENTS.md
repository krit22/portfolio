<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Code Verification Protocol

Always run the following commands to verify code changes before declaring a task complete:
1. `npm run lint` — Verify zero ESLint or formatting errors exist.
2. `npm run build` — Verify TypeScript compilation and Next.js static build succeed cleanly.

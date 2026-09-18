# LinkedIn

I just finished wiring Bartlett Labs' website into an AI-assisted revenue system.

The interesting part isn't the chatbot. It's what happens after the conversation.

If someone books an audit, Cal.com sends the event into a self-hosted n8n workflow and the CRM records the lead as **Audit booked**.

If someone shows strong intent but doesn't book, a second workflow catches the signal through Gmail OAuth and records the lead as **Chat lead**.

Both paths preserve context, suppress duplicate activity, alert the team, and give a human the next action.

The stack now connects:

- Next.js and Coolify
- Cloudflare
- Widgo AI
- Cal.com
- Gmail and Pushover phone alerts
- Self-hosted n8n
- A custom authenticated CRM API

This is the kind of AI work I care about. Not a demo that talks, but a production system that notices intent, moves data safely, and helps someone act.

What part of your customer journey still depends on somebody remembering to copy and paste?

# X

I built Bartlett Labs a two-path AI revenue system:

Booked audit → n8n → CRM
Hot chat without a booking → Gmail OAuth → n8n → CRM

Both preserve context, suppress duplicates, alert the team, and create a human next action.

AI is useful when it closes operational gaps.

---
title: "Everyone Is Selling You an Agentic OS. Almost Nobody Can Explain What It Is."
date: 2026-11-24
draft: false
description: "Personal agents like Muse, dots and Claude Duet work for one person. Your company's agents need a house: identity, guardrails, shared knowledge and an owner. What an agentic OS is, and why industry can't skip it."
tags: ["AI Agents", "Agentic OS", "Engineering Leadership", "AI Governance", "Architecture"]
categories: ["AI & Automation"]
showTableOfContents: true
icon: "layers"
cover: ./agentic-os-house.png
images: ["w48-agentic-os-og.png"]
---

In ten weeks, Meta, OpenAI, Anthropic and xAI launched almost the same product: a personal agent with its own computer in the cloud that keeps working when you close the app. Meanwhile banks and law firms are being sold something else with a bigger name: an "agentic operating system".

Ask ten leaders what the difference is and you'll get ten answers. Fair enough: the words are a mess. But it's the most important architecture question your company will face about AI in the next two years, because one of these things works for a person, and the other is where your company's agents live.

Let me untangle the words first, then explain why your company needs a house for its agents.

## Five words, one picture

Think of the computer on your desk.

- **AI** is the field, like "computing". It names the topic, not the product.
- **An LLM** is the engine, like the processor. Text in, text out. It remembers nothing and does nothing on its own.
- **An agent** is a program that uses the engine: an LLM with a goal, some tools and a loop. It does a task.
- **An orchestrator** runs a process: several agents and normal code, in order, with a plan for when step three fails.
- **An agentic OS** is where agents live and run: it gives them an identity, permissions, memory, connections to your systems, the ability to work in the background, and a way to ask a human before doing something risky.

![Figure 1 (animated): the same customer question, "Where is my order #4812?", handled by each layer. The LLM only guesses an answer. The agent uses tools in a loop (ERP, carrier) and replies with the real date. The orchestrator runs a late-order process across a support, a logistics and a billing agent, with a person as plan B. The agentic OS is the house where all the agents live, with badges, rules, memory, connectors, a logbook and approvals: a €5,000 refund waits for a person, and what the agents learn stays.](agentic-os-four-layers.gif)

One sentence to remember: **an agent does a task, an orchestrator runs a process, an agentic OS runs agents.**

## Personal agents work for a person

Meta's [Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) "runs on its own dedicated computer in the cloud" and checks with you before sending an email or making a purchase. OpenAI's [dots](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/) pursue goals in the background and you message them through Slack or Teams. Anthropic's [Claude Duet](https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/), still a research preview, has its own virtual machine, over 6,000 connectors and asks for approval before payments.

They're impressive, and your people will use them. But look at who they serve: **one person**. Their memory is that person's memory. Their rules are that person's settings. When that person leaves, the knowledge goes with them.

That's perfect for an inbox. It's not how a company works.

A company needs to know which agents exist, who owns each one, what each may touch, what they've learned, and what they did last Tuesday at 3 a.m. No personal agent can answer that, because it was never built to.

| | Personal agent (Muse, dots, Duet…) | Your company's agentic OS |
|---|---|---|
| Works for | One person | The company |
| Memory | That person's | Shared, with an owner, and it stays |
| Rules | The user's settings | The company's guardrails, the same for every agent |
| Systems | Email, calendar, documents, the web | ERP, MES, CRM, the plant, the old system with no API |
| When someone leaves | The knowledge leaves too | The knowledge stays in the house |
| Who answers for it | The user, hopefully | A named owner per agent |

## The house for your company's agents

The easiest way to think about an agentic OS for a company is a house. Not a hotel where anyone checks in, and not a contractor who brings their own tools and leaves with their notes. A house with an address, rules and people responsible for it.

![Figure 2: The house for your company's agents. All of the company's agents (support, logistics, billing, quotes, planning, reports) live inside it, and the house gives every one of them a badge, house rules, a library of shared knowledge, one connection per system, a logbook and a named owner. Under the house, your systems: ERP, CRM, plant floor, spreadsheets and the old system with no API.](agentic-os-house.png)

**The badge: every agent has an identity.** No agent works anonymously. Every agent that works for the company lives in the house and is registered there, with a name, a purpose and the permissions that come with it. Microsoft just [reported](https://techcommunity.microsoft.com/blog/agent-365-blog/whats-new-in-microsoft-agent-365-ignite-2026/4571753) more than 50 million agents registered in Agent 365 since May, and added a view for inactive and ownerless agents. When a vendor builds a screen for agents nobody owns, it's because there are enough of them to need one.

**The house rules: guardrails written once.** What an agent may read, what it may change, how much it may spend, and when a person has to say yes. Written once for the house, not reinvented in every project. In a factory, a bank or a hospital, these rules are the difference between a useful assistant and an incident report.

**The library: knowledge that stays.** Every agent that learns how your business works should leave that knowledge in the house, not in someone's chat history. Which customer gets priority, why the Monday report excludes returns, which machine always reads two degrees high. With an owner who decides what goes in.

**The plumbing: one connection per system.** Your ERP, your MES, your CRM. Connected once, properly, with the right permissions, and shared by every agent. Not twenty agents each with their own way into the ERP.

**The logbook and the landlord.** Every action recorded, so you can answer "what happened?" in minutes. And every agent with a named owner who answers for it and can switch it off.

## Why this matters more in industry

An agent that drafts an email badly costs you an awkward reply. An agent that changes a production order, a payment or a clinical record badly costs you a lot more.

That's why the industry vendors are the ones already using the name. Fiserv launched [agentOS](https://investors.fiserv.com/news-releases/news-release-details/fiserv-launches-agentos-operating-system-agentic-ai-banking) for banks, "built to operate natively across Fiserv's platforms" with policy enforcement and human oversight in the design. Legora calls its [aOS](https://legora.com/newsroom/legora-introduces-the-legora-aos-the-agentic-operating-system-for-legal-work) "the agentic operating system for legal work", summed up in one line: "The Agent handles execution. The lawyer makes the calls that matter."

Industries share three things that make a house non-negotiable: rules that come from regulators, not preferences; systems that were never built to talk to agents; and knowledge that lives in experienced people's heads. A personal agent can't carry any of those. A house can.

## A made-up example

A mid-sized distributor lets its sales team use personal agents. Within a month, agents summarise customer emails and draft quotes. Everyone is happy.

Then someone asks an agent to update a delivery date in the ERP. The agent finds a way in. Nobody had decided whether an agent may change a delivery date, who gets told, or what happens to the three systems that copy that date overnight.

Now run the same request inside a house. The agent has a badge. The house rule says agents may propose a new delivery date, and a planner approves it. The library knows about the three systems that copy it. The logbook records who asked, what changed and who approved. Same agent, same model. Completely different risk.

(Made-up example, not a real company.)

## What to do this month

1. **Count your agents.** Every agent running in your company, who owns it and what it touches. If you can't list your top ten, start there.
2. **Write the house rules.** One page: what agents may read, change and spend, and when a person approves.
3. **Build one door per system.** Pick the system agents will need most and give it one documented, governed way in.
4. **Give knowledge an owner.** Decide where what agents learn is kept and who approves what goes in.
5. **Move your agents into the house.** Every new agent is born inside it, with a badge, an owner and the house rules from day one. No agent lives outside.

## The uncomfortable question

If your company already runs twenty agents built by five teams, who decides what each of them may touch, and where does what they learn about your business end up?

If the answer is "nobody" and "in each team's project", you don't have an agent strategy yet. You have agents and no house.

## Takeaways

- **An agent does a task, an orchestrator runs a process, an agentic OS runs agents.** The LLM is the engine under all of them.
- **Personal agents work for a person.** Their memory, rules and accountability belong to that person.
- **Your company's agents live in a house:** a badge for each one, house rules, shared knowledge, one connection per system, a logbook and an owner per agent.
- **In regulated and industrial companies, the house isn't optional.** The cost of an agent mistake is too high to leave the rules to each user.
- **Start small:** count your agents, write one page of rules, and build one good door.

*Working through this with your team? I'm always happy to compare notes: hello@mcorte.com*

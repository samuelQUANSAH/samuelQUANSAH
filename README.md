# Samuel Quansah

**Founding Systems Engineer | AI Architect | U.S. Navy Veteran 🇺🇸**

I design and build autonomous agentic AI systems that combine advanced retrieval pipelines, multi-agent orchestration, secure cloud architectures, and strict compliance frameworks. 

My engineering philosophy balances the power of SOTA AI models with production-grade engineering principles: cost awareness, deterministic safety gates, absolute observability, and clean CI/CD automation.

---

## ⚡ Headless AI & Agentic Run Metrics
*Human hours for designing and thinking, machine hours for building and running. Stats updated by autonomous agent pipelines.*

### Work Metrics (Observed Runtime)
| Metric | Yesterday | Prior 7 Days | Prior 28 Days | Prior 365 Days |
| :--- | :--- | :--- | :--- | :--- |
| **Interactive Human Attention** | 1.2h | 10.4h | 62.4h | ~750h |
| **Interactive AI Generation** | 8.4h | 72.1h | 510.2h | ~2,350h |
| **Headless Worker/Agent Execution** | 24.5h | 192.3h | 1,120.4h | ~4,500h |
| **Additive Work (Human + Machine)** | 34.1h | 274.8h | 1,693.0h | ~7,600h |
| **Interactive Agent Sessions** | 18 | 52 | 380 | 7,800 |
| **Autonomous Worker Sessions** | 140 | 810 | 4,200 | 28,000 |

### Model & Token Consumption (Last 30 Days)
| Model | Requests | Input Tokens | Output Tokens | Cache Read | API Cost | Caching Savings |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **gemini-2.5-pro** | 114,200 | 710.2M | 28.4M | 13,850.2M | $9,420.50 | $35,210.10 |
| **claude-3-5-sonnet** | 42,100 | 210.5M | 7.9M | 3,420.5M | $1,580.40 | $9,120.50 |
| **gemini-2.5-flash** | 158,400 | 920.1M | 38.2M | 15,210.0M | $890.30 | $12,410.20 |
| **Total** | **314,700** | **1,840.8M** | **74.5M** | **32,480.7M** | **$11,891.20** | **$56,740.80** |

> **Performance Note**: 94.6% Cache Hit Rate achieved via context-caching strategies and token-budget middleware, saving **$56,740.80** in LLM compute overhead.

---

## 🛠️ Tech Stack & Capabilities

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![AWS Bedrock](https://img.shields.io/badge/AWS_Bedrock-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![OpenSearch Serverless](https://img.shields.io/badge/OpenSearch_Serverless-005EB8?style=flat-square&logo=opensearch&logoColor=white)
![Cloudflare & Terraform](https://img.shields.io/badge/Cloudflare_&_Terraform-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![FOSSA](https://img.shields.io/badge/FOSSA_Compliance-4B0082?style=flat-square)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-F05A28?style=flat-square&logo=opentelemetry&logoColor=white)

* **Agentic Orchestration**: Multi-agent task planning, belief-state tracking, LangGraph orchestration, and deterministic routing.
* **Cost-Aware RAG**: High-fidelity context containment, semantic vector mapping, caching middlewares, and strict token-budget limits.
* **Security & Governance**: Human-in-the-loop (HITL) gates, strict role-based access control (RBAC), and secrets isolation.
* **Cloud Architecture**: Infrastructure as Code (IaC) with Terraform, secure AWS CDK deployments, and EventBridge automation.

---

## 🌟 Featured Public Systems

### 🛡️ [Terraform Secure AWS Enterprise Blueprint](https://github.com/samuelQUANSAH/terraform-secure-aws-enterprise-blueprint)
*Infrastructure-as-Code (IaC) framework demonstrating enterprise-grade posture and secure networking.*
* Deploys strict Cloudflare WAF JS challenges, rate limits, and custom edge routing rules.
* Configures secure VPC architectures, private subnets, IAM boundaries, and least-privilege KMS policies.
* Automates CI/CD validation via Terraform linting, security scans, and cost-anomaly detection alerts.

### 🤖 [AWS Agentic Operations Command Center](https://github.com/samuelQUANSAH/aws-agentic-ops-command-center)
*AWS-native event-driven multi-agent orchestrator managing serverless infrastructure audit tasks.*
* Features a strict **Human-in-the-Loop (HITL) gate** suspending high-risk agent operations until a signed operator approval is logged.
* Ingests cost and operational alerts via EventBridge, triggering parallel RAG validation workflows.
* Built using Python, AWS Step Functions, DynamoDB, and Bedrock.

### 🔍 [CHI Framework (Cognitive Hidden Intelligence)](https://github.com/samuelQUANSAH/agentic-rag-prototype)
*Developer kit for AI observability, reasoning tracing, and execution debugging.*
* Exposes detailed belief-state tracking pipelines to audit agent thoughts and decisions before API submission.
* Renders real-time trace timelines showing tool selection, context retrieval docs, and raw reasoning tokens.
* Developed with Python, LangGraph, FastAPI, React, and OpenTelemetry.

### 🕹️ [DeepStride AI](https://github.com/samuelQUANSAH/DeepstrideAi_Build101)
*Interactive SpaceX-inspired landing platform demonstrating autonomous agent pathfinding.*
* Visualizes an AICA DevOps agent running a pathfinding algorithm to locate, triage, and repair bugs (Syntax defects, Port conflicts).
* Streams real-time telemetry logs mapping the agent's logic steps, thoughts, and compilation states.
* Built using React 19, TypeScript, Tailwind CSS v4, Framer Motion, and React Flow.

### 💳 [RAG Token Guardrails](https://github.com/samuelQUANSAH/scaleopssolutions)
*Secure context controller and API caching middleware targeting enterprise Bedrock installations.*
* Runs a local Microsoft Presidio PII redaction pipeline blocking sensitive keys, names, and addresses during ingestion.
* Implements Redis context-caching and dynamically caps `top_k` query expansions to prevent LLM budget runaways.

---

## 🛡️ Security & Governance Principles

1. **Control before Autonomy**: High-impact administrative actions require a verified cryptographic signature or operator approval.
2. **Least Privilege Scope**: Agents execute with minimal AWS IAM policies, isolated credentials, and scoped tools.
3. **Observability First**: All tool invocation logs, query variables, and reasoning tokens are persisted and auditable.
4. **Copyleft Guardrails**: Integrated FOSSA scanners automatically block restrictive software licenses (e.g., GPLv3) from entering the codebase.

---

## 📬 Connect & Collaborate
* **LinkedIn**: [Samuel Quansah](https://www.linkedin.com/in/samuel-quansah-/)
* **GitHub**: [@samuelQUANSAH](https://github.com/samuelQUANSAH)
* **Location**: United States (Navy Veteran)

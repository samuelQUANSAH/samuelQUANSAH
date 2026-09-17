# Hi there, I'm Samuel K. Quansah 👋

```
  ██████╗ ██╗███╗   ██╗██████╗ ██╗      █████╗ ██████╗ ███████╗    ██████╗ ███████╗██╗  ██╗
  ██╔══██╗██║████╗  ██║██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██║  ██║
  ██████╔╝██║██╔██╗ ██║██║  ██║██║     ███████║██████╔╝███████╗    ██████╔╝█████╗  ██║  ██║
  ██╔══██╗██║██║╚██╗██║██║  ██║██║     ██╔══██║██╔══██╗╚════██║    ██╔══██╗██╔══╝  ╚██╗██╔╝
  ██████╔╝██║██║ ╚████║██████╔╝███████╗██║  ██║██████╔╝███████║    ██║  ██║███████╗ ╚████╔╝ 
  ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝  ╚═══╝  
```

### 🚀 AI Solutions Architect | Forward Deployed Engineer | Low-Latency Systems & AI Governance
**U.S. Navy Veteran** | **Secret Security Clearance** | **M.S. Cybersecurity (GPA 4.0)** | **M.S. Computer Information Systems**

---

### ⚡ Low-Latency Performance & Engineering Benchmarks

| Metric / Objective | Benchmark / Performance Achieved | Architectural Strategy |
| :--- | :--- | :--- |
| **Catalog & Event Search** | **$p95 < 800\text{ ms}$** across 1M+ sessions | PostgreSQL `pg_trgm` + Redis read replicas & write-ahead locks |
| **Real-Time Telemetry** | **5,000+ Concurrent Connections** | Async Python (`uvloop` + FastAPI) + WebSockets / SSE streams |
| **Vector Retrieval (RAG)** | **$p95 < 45\text{ ms}$** retrieval latency | `pgvector` HNSW indexing over high-dimensional embeddings |
| **LLM Inference Round-Trips** | **65% Latency Reduction** | Semantic prompt caching (Redis) & speculative model routing |
| **Backlog Reduction** | **60% Automated First-Pass Triage** | LangGraph multi-agent pipeline + EHR template drift handling |
| **Production Scale** | **$2.5M+ GMV Processed** | Zero unrecovered transaction failures; idempotency locking |

---

### 🏢 Private Enterprise & Stealth Contributions

Although much of my recent work lives in private client repositories, here is an architectural overview of key production systems built:

#### 1. Model Context Protocol (MCP) & Agent Identity Security (Blindlabs.dev)
* **Scope:** Architected host-to-server authorization models for autonomous AI agent tool invocation.
* **Security Mechanics:** Implemented OAuth 2.0 Token Exchange (**RFC 8693**) and Dynamic Client Registration (**DCR**) with Okta, Auth0, and WorkOS to establish cryptographically isolated tenant identities during multi-agent calls.

#### 2. Clinical Claim & Medical Data Intelligence Platform (Confidential B2B SaaS)
* **Scope:** Governed RAG and multi-agent triage system processing clinical intake and EHR data.
* **Architecture:** Built LangGraph pipelines with Presidio PII redaction before LLM API calls, pgvector HNSW vector search, and **LangSmith/OpenTelemetry** eval-first observability.

#### 3. High-Throughput Revenue Commerce Platform (B2C Commerce)
* **Scope:** Full-stack B2C e-commerce engine handling 35,000+ purchasing customers and $2.5M+ GMV.
* **Architecture:** High-concurrency Python/PostgreSQL backend with Stripe webhook idempotency locks, transaction isolation, and sub-800ms search latency.

#### 4. Industrial Sensor Anomaly Detection (Sandvik)
* **Scope:** Real-time ML anomaly detection and statistical quality control.
* **Architecture:** Python data pipelines monitoring sensor drift and changing operational behavior under strict industrial reliability constraints.

---

### 🛠️ Technical Stack & Tooling

```
  Languages        ::: Python (FastAPI, PyTorch), TypeScript, JavaScript, SQL, Bash
  AI & Agents      ::: Model Context Protocol (MCP), LangGraph, LangChain, RAG, Anthropic Claude, OpenAI, Presidio
  Observability    ::: LangSmith, Langfuse, OpenTelemetry, Semantic Caching, Latency Benchmarking
  Agentic Workflow ::: Claude Code, Cursor, Antigravity, Codex, Copilot
  Databases        ::: PostgreSQL, pgvector (HNSW), Redis, DynamoDB, AWS S3
  Cloud & DevOps   ::: AWS (EC2, Lambda, RDS, S3, CDK), Docker, Kubernetes, Terraform, CI/CD
```

---

### 🎓 Education & Certifications
* **M.S. Computer Information Systems** — California Miramar University *(Expected Dec 2026)* | GPA 3.87
* **M.S. Cybersecurity Technology** — University of Maryland Global Campus *(Oct 2024)* | GPA 4.00
* **B.S. Geomatics Engineering** — KNUST *(Jun 2015)*
* **AWS Certified CloudOps Engineer Associate** | **AWS Certified Data Engineer Associate**
* **CompTIA Security+ CE** | **CompTIA Cloud+** | **Professional Scrum Master I**

---

### 📫 Connect & Portfolio
* **Portfolio / Live Systems:** [blindlabs.dev](https://blindlabs.dev)
* **LinkedIn:** [linkedin.com/in/samuel-quansah](https://linkedin.com/in/samuel-quansah)
* **Email:** [samuelquansah@hotmail.com](mailto:samuelquansah@hotmail.com)

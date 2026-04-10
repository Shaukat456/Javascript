# 🚀 APIs & Basic Networking for Software Developers

### A Complete Course — From Scratch to Advanced

> **Course Overview:** This course takes you from zero to advanced understanding of API types and networking concepts used in real-world software development. Each lesson builds on the previous one, includes real-world scenarios, and ends with interview Q&A.

---

## 📚 Table of Contents

| #   | Lesson                                             | Level           |
| --- | -------------------------------------------------- | --------------- |
| 01  | What is an API? Fundamentals & Mental Models       | 🟢 Beginner     |
| 02  | How the Internet Works — Networking Basics         | 🟢 Beginner     |
| 03  | HTTP & HTTPS — The Language of the Web             | 🟢 Beginner     |
| 04  | REST APIs — The Industry Standard                  | 🟡 Intermediate |
| 05  | GraphQL APIs — Query What You Need                 | 🟡 Intermediate |
| 06  | SOAP APIs — Enterprise-Grade Web Services          | 🟡 Intermediate |
| 07  | gRPC APIs — High-Performance Communication         | 🟡 Intermediate |
| 08  | WebSockets — Real-Time Bidirectional Communication | 🟡 Intermediate |
| 09  | Webhooks — Event-Driven APIs                       | 🟡 Intermediate |
| 10  | Authentication & Security in APIs                  | 🟡 Intermediate |
| 11  | API Design Best Practices & Versioning             | 🔴 Advanced     |
| 12  | Networking Deep Dive — TCP/IP, DNS, CDN            | 🔴 Advanced     |
| 13  | Microservices & API Gateway Patterns               | 🔴 Advanced     |
| 14  | Rate Limiting, Caching & Performance               | 🔴 Advanced     |
| 15  | API Testing, Monitoring & Documentation            | 🔴 Advanced     |

---

## Lesson 01 — What is an API? Fundamentals & Mental Models

### 🧠 Concept

**API** stands for **Application Programming Interface**. It is a contract between two pieces of software that defines:

- **What** requests can be made
- **How** to make them
- **What** responses to expect

> **Mental Model:** Think of a restaurant. You (the client) look at a **menu** (API documentation), place an **order** (API request) with the **waiter** (API), and the kitchen (server) prepares your food (processes data) and sends it back to you (response). You never see the kitchen — you just interact through the waiter.

### 🏗️ Core Components of an API

```
┌─────────────────────────────────────────────────┐
│                  API Architecture                │
│                                                  │
│  [Client App]  ──request──▶  [API Layer]         │
│                                    │             │
│                              [Business Logic]    │
│                                    │             │
│                              [Database/Service]  │
│                                    │             │
│  [Client App]  ◀──response──  [API Layer]        │
└─────────────────────────────────────────────────┘
```

### 📦 Types of APIs (Overview)

| Type      | Protocol      | Best For               | Example         |
| --------- | ------------- | ---------------------- | --------------- |
| REST      | HTTP          | Web & Mobile Apps      | Twitter API     |
| GraphQL   | HTTP          | Flexible data fetching | GitHub API v4   |
| SOAP      | HTTP/SMTP     | Enterprise systems     | PayPal (legacy) |
| gRPC      | HTTP/2        | Microservices          | Google internal |
| WebSocket | WS/WSS        | Real-time apps         | Slack, Chat     |
| Webhook   | HTTP callback | Event notifications    | Stripe payments |

### 🌍 Real-World Scenario

**Scenario:** You're building a weather app.

- Your app calls the **OpenWeatherMap REST API** with a city name
- The API returns JSON with temperature, humidity, and forecast
- Your app displays this to users

Without the API, you'd need to build your own weather satellites and data infrastructure. APIs let you **leverage existing services**.

### 🎯 Key Terms

- **Endpoint:** A specific URL where an API can be accessed (e.g., `/api/users`)
- **Request:** Data sent from client to server
- **Response:** Data returned from server to client
- **Payload:** The body/data of a request or response
- **SDK:** Software Development Kit — a wrapper around an API for easier use

---

### 💬 Interview Questions & Answers — Lesson 01

**Q1: What is an API and why is it important in software development?**

> **A:** An API is a defined interface that allows different software components to communicate with each other. It's important because it enables modularity (teams can work independently), reusability (use existing services), abstraction (hide implementation details), and scalability (distribute functionality across services). For example, instead of building payment processing from scratch, a developer integrates Stripe's API.

---

**Q2: What is the difference between an API and a web service?**

> **A:** All web services are APIs, but not all APIs are web services. An API is a broad concept — it can be a library API (like Python's `os` module), operating system API, or web API. A web service is specifically an API accessible over a network using web protocols like HTTP. REST, SOAP, and GraphQL are all web services.

---

**Q3: Can you name some real-world applications where APIs are critical?**

> **A:**
>
> - **Payment gateways** (Stripe, PayPal) — process transactions
> - **Social login** (Google OAuth, Facebook Login) — authentication
> - **Maps** (Google Maps API) — location services in Uber, Airbnb
> - **SMS/Email** (Twilio, SendGrid) — notifications
> - **Cloud storage** (AWS S3 API) — file uploads
> - **AI capabilities** (OpenAI API) — chatbots, language models

---

**Q4: What is the difference between public, private, and partner APIs?**

> **A:**
>
> - **Public API:** Open to any developer (e.g., OpenWeatherMap, GitHub API). May require registration.
> - **Private API:** Internal to an organization, used between internal services (e.g., a company's internal user service API).
> - **Partner API:** Shared with specific business partners under agreements (e.g., shipping company's API shared only with e-commerce partners).

---

## Lesson 02 — How the Internet Works — Networking Basics

### 🧠 Concept

Before building APIs, you need to understand the infrastructure they run on. The internet is a global network of computers communicating via standardized protocols.

### 🌐 The OSI Model (Simplified)

```
┌──────────────────────────────────────────┐
│  OSI Model — 7 Layers                    │
│                                          │
│  7. Application  ← HTTP, FTP, DNS        │
│  6. Presentation ← Encryption, Encoding  │
│  5. Session      ← Connection mgmt       │
│  4. Transport    ← TCP, UDP (ports)      │
│  3. Network      ← IP Addressing         │
│  2. Data Link    ← MAC Addresses         │
│  1. Physical     ← Cables, WiFi          │
└──────────────────────────────────────────┘
```

> **For API developers, focus on layers 3 (Network), 4 (Transport), and 7 (Application).**

### 🔢 IP Addresses

Every device on the internet has an **IP address** — a unique identifier.

```
IPv4:  192.168.1.1        (32-bit, ~4.3 billion addresses)
IPv6:  2001:0db8:85a3::   (128-bit, virtually unlimited)
```

- **Public IP:** Visible on the internet (your router's IP)
- **Private IP:** Internal network (192.168.x.x)
- **Localhost:** `127.0.0.1` — your own machine

### 🚪 Ports

Ports are like **doors** on a server. Each service listens on a specific port:

| Port | Service                |
| ---- | ---------------------- |
| 80   | HTTP                   |
| 443  | HTTPS                  |
| 22   | SSH                    |
| 3306 | MySQL                  |
| 5432 | PostgreSQL             |
| 3000 | Node.js (dev)          |
| 8080 | HTTP alt / Dev servers |
| 6379 | Redis                  |

### 🏠 DNS — Domain Name System

DNS translates human-readable domain names to IP addresses.

```
User types: www.google.com
     ↓
DNS Query: "What is the IP for google.com?"
     ↓
DNS Response: 142.250.74.46
     ↓
Browser connects to: 142.250.74.46:443
```

**DNS Resolution Steps:**

1. Check browser cache
2. Check OS cache (`/etc/hosts`)
3. Query local DNS resolver (ISP)
4. Query root nameservers
5. Query TLD nameservers (`.com`)
6. Query authoritative nameserver for `google.com`
7. Return IP address

### 🔄 TCP vs UDP

| Feature     | TCP                             | UDP                          |
| ----------- | ------------------------------- | ---------------------------- |
| Connection  | Connection-oriented (handshake) | Connectionless               |
| Reliability | Guaranteed delivery             | Best-effort                  |
| Order       | Ordered packets                 | No ordering                  |
| Speed       | Slower                          | Faster                       |
| Use Case    | HTTP, APIs, file transfer       | Video streaming, gaming, DNS |

**TCP 3-Way Handshake:**

```
Client → SYN     → Server   (I want to connect)
Client ← SYN-ACK ← Server   (OK, I'm ready)
Client → ACK     → Server   (Great, let's communicate)
```

### 🌍 Real-World Scenario

**Scenario:** You deploy a Node.js REST API to AWS.

- Your app runs on port `3000` internally
- Nginx reverse proxy listens on port `80/443` and forwards to `3000`
- DNS points `api.yourcompany.com` to AWS Elastic IP
- TCP ensures all API request/response packets arrive reliably

---

### 💬 Interview Questions & Answers — Lesson 02

**Q1: What happens when you type `https://api.github.com/users` in a browser?**

> **A:**
>
> 1. Browser checks DNS cache, then queries DNS for `api.github.com`
> 2. DNS returns GitHub's IP address
> 3. Browser initiates TCP connection (3-way handshake) on port 443
> 4. TLS/SSL handshake occurs for HTTPS encryption
> 5. Browser sends HTTP GET request
> 6. GitHub's server processes and returns JSON response
> 7. Browser receives and displays data

---

**Q2: What is the difference between TCP and UDP and when would you use each?**

> **A:** TCP is reliable, ordered, and connection-based — ideal for APIs, web requests, and any data where completeness matters. UDP is faster and connectionless — ideal for real-time applications like video calls, online gaming, or live streaming where a dropped packet is acceptable but latency is critical. DNS also uses UDP for initial queries due to speed.

---

**Q3: What is a reverse proxy and why is it used with APIs?**

> **A:** A reverse proxy (e.g., Nginx, HAProxy) sits in front of your API servers and handles incoming requests. Benefits include: load balancing across multiple servers, SSL termination, caching, compression, rate limiting, and hiding internal server architecture. When you call `api.example.com`, you're likely hitting a reverse proxy that forwards to multiple backend servers.

---

**Q4: What is NAT (Network Address Translation)?**

> **A:** NAT allows multiple devices on a private network to share a single public IP address. Your router uses NAT — all devices in your home appear to the internet as one IP. For APIs, this matters because `X-Forwarded-For` headers are used to pass the real client IP through proxies and NAT layers.

---

## Lesson 03 — HTTP & HTTPS — The Language of the Web

### 🧠 Concept

**HTTP (HyperText Transfer Protocol)** is the foundation of all web APIs. Every REST API, GraphQL endpoint, and webhook uses HTTP.

### 📨 HTTP Request Structure

```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...
Accept: application/json

{
  "name": "Ahmed Khan",
  "email": "ahmed@example.com"
}
```

**Parts:**

- **Method:** `POST` (the action)
- **Path:** `/api/users` (the resource)
- **HTTP Version:** `HTTP/1.1`
- **Headers:** Metadata about the request
- **Body:** The payload (data being sent)

### 📬 HTTP Response Structure

```http
HTTP/1.1 201 Created
Content-Type: application/json
X-Request-Id: abc123

{
  "id": 42,
  "name": "Ahmed Khan",
  "email": "ahmed@example.com",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### 🔢 HTTP Methods (Verbs)

| Method  | Action                | Idempotent | Body     |
| ------- | --------------------- | ---------- | -------- |
| GET     | Read/Retrieve         | ✅ Yes     | ❌ No    |
| POST    | Create                | ❌ No      | ✅ Yes   |
| PUT     | Replace (full update) | ✅ Yes     | ✅ Yes   |
| PATCH   | Partial update        | ❌ No      | ✅ Yes   |
| DELETE  | Remove                | ✅ Yes     | Optional |
| HEAD    | Like GET, no body     | ✅ Yes     | ❌ No    |
| OPTIONS | CORS preflight        | ✅ Yes     | ❌ No    |

> **Idempotent** means calling the endpoint multiple times produces the same result. DELETE `/users/1` ten times has the same effect as once — the user is deleted.

### 📊 HTTP Status Codes

```
1xx — Informational
  100 Continue

2xx — Success
  200 OK
  201 Created
  204 No Content

3xx — Redirection
  301 Moved Permanently
  302 Found (Temporary)
  304 Not Modified (cached)

4xx — Client Errors
  400 Bad Request
  401 Unauthorized (not logged in)
  403 Forbidden (logged in, no permission)
  404 Not Found
  409 Conflict
  422 Unprocessable Entity
  429 Too Many Requests

5xx — Server Errors
  500 Internal Server Error
  502 Bad Gateway
  503 Service Unavailable
  504 Gateway Timeout
```

### 🔒 HTTPS & TLS

HTTPS = HTTP + TLS (Transport Layer Security). TLS provides:

1. **Encryption:** Data is unreadable in transit
2. **Authentication:** Server proves its identity via certificate
3. **Integrity:** Data cannot be tampered with

```
HTTP  → Data travels as plaintext  (❌ Never use for APIs)
HTTPS → Data is encrypted with TLS (✅ Always use in production)
```

### 📋 Common HTTP Headers

```http
# Request Headers
Authorization: Bearer {token}        ← Authentication
Content-Type: application/json       ← Format of body sent
Accept: application/json             ← Format you want back
X-API-Key: abc123                    ← API key auth
X-Request-ID: uuid-here              ← Tracing
Cache-Control: no-cache              ← Caching directives
Origin: https://myapp.com            ← CORS

# Response Headers
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1705312800
ETag: "abc123"                       ← Cache validation
Access-Control-Allow-Origin: *       ← CORS
```

### 🌍 Real-World Scenario

**Scenario:** Building a login system.

- `POST /auth/login` with `{email, password}` → returns `200 OK` with JWT token
- `GET /profile` with `Authorization: Bearer {token}` → returns `200 OK` with user data
- Wrong credentials → `401 Unauthorized`
- Accessing admin endpoint as regular user → `403 Forbidden`
- Sending malformed JSON → `400 Bad Request`

---

### 💬 Interview Questions & Answers — Lesson 03

**Q1: What is the difference between 401 and 403?**

> **A:** `401 Unauthorized` means the client is not authenticated — they haven't provided credentials or the credentials are invalid (not logged in). `403 Forbidden` means the client IS authenticated but doesn't have permission to access that resource (logged in but lacks required role/permission). Example: Accessing `/admin` when you're logged in as a regular user returns 403.

---

**Q2: What is the difference between PUT and PATCH?**

> **A:** `PUT` replaces the entire resource. If you PUT `{name: "Ali"}` to a user with `{name: "Ahmed", age: 25}`, you'll get `{name: "Ali"}` — age is gone. `PATCH` partially updates — PATCHing `{name: "Ali"}` preserves age and only updates the name. In practice, most APIs use PATCH for updates and PUT for full replacements.

---

**Q3: What is CORS and why does it matter for APIs?**

> **A:** Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks web pages from making requests to a different domain than the one that served the page. If your frontend is at `app.example.com` and your API is at `api.example.com`, the browser will block requests unless the API sends `Access-Control-Allow-Origin` headers. The browser sends an `OPTIONS` preflight request to check permissions before the actual request. APIs must be configured to allow specific origins.

---

**Q4: What is HTTP/2 and how is it different from HTTP/1.1?**

> **A:** HTTP/2 introduced multiplexing (multiple requests over one connection simultaneously), header compression (HPACK), server push, and binary framing. HTTP/1.1 sends one request per connection at a time (or uses workarounds like connection pooling). HTTP/2 significantly reduces latency, especially for APIs making many parallel requests. gRPC is built on HTTP/2 to take advantage of these features.

---

## Lesson 04 — REST APIs — The Industry Standard

### 🧠 Concept

**REST (Representational State Transfer)** is an architectural style (not a protocol) for designing networked APIs. Coined by Roy Fielding in 2000, it defines six constraints that make APIs scalable and maintainable.

### 📐 REST Constraints

1. **Client-Server:** Separation of concerns — client handles UI, server handles data
2. **Stateless:** Each request contains all information needed; server stores no session state
3. **Cacheable:** Responses should indicate if they can be cached
4. **Uniform Interface:** Consistent resource naming and HTTP verbs
5. **Layered System:** Client doesn't know if connected directly or through proxies
6. **Code on Demand (optional):** Server can send executable code to client

### 🗂️ Resource-Based URLs

REST is built around **resources** (nouns, not verbs):

```
✅ CORRECT (REST)          ❌ WRONG (RPC-style)
GET    /users              GET /getUsers
GET    /users/42           GET /getUserById?id=42
POST   /users              POST /createUser
PUT    /users/42           POST /updateUser/42
DELETE /users/42           GET /deleteUser?id=42

# Nested resources
GET    /users/42/orders         All orders for user 42
GET    /users/42/orders/7       Order 7 of user 42
POST   /users/42/orders         Create order for user 42
```

### 📝 REST API Design Example

**Scenario:** E-commerce Product API

```
# Products
GET    /api/v1/products              → List all products
GET    /api/v1/products?category=phones&limit=10  → Filtered list
GET    /api/v1/products/123          → Get product 123
POST   /api/v1/products              → Create new product
PUT    /api/v1/products/123          → Replace product 123
PATCH  /api/v1/products/123          → Update product 123
DELETE /api/v1/products/123          → Delete product 123

# Nested: Reviews for a product
GET    /api/v1/products/123/reviews  → All reviews for product 123
POST   /api/v1/products/123/reviews  → Add review to product 123
```

### 📦 Request & Response Examples

**Create a user:**

```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "Fatima Malik",
  "email": "fatima@example.com",
  "role": "customer"
}
```

```http
HTTP/1.1 201 Created
Location: /api/v1/users/99

{
  "id": 99,
  "name": "Fatima Malik",
  "email": "fatima@example.com",
  "role": "customer",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

**Paginated list:**

```http
GET /api/v1/products?page=2&limit=20&sort=price&order=asc
```

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 450,
    "totalPages": 23,
    "hasNext": true,
    "hasPrev": true
  }
}
```

### 🌍 Real-World Scenario

**Scenario:** Building a Task Management API (like Trello)

```
GET    /boards                     → User's boards
POST   /boards                     → Create board
GET    /boards/1/lists             → Lists in board 1
POST   /boards/1/lists             → Add list to board 1
GET    /boards/1/lists/3/cards     → Cards in list 3
POST   /boards/1/lists/3/cards     → Create card
PATCH  /boards/1/lists/3/cards/7  → Update card (e.g., move, rename)
DELETE /boards/1/lists/3/cards/7  → Delete card
```

---

### 💬 Interview Questions & Answers — Lesson 04

**Q1: What makes an API truly RESTful vs just using HTTP?**

> **A:** A RESTful API follows Roy Fielding's constraints: statelessness (no server-side sessions), uniform interface (consistent resource naming with HTTP verbs), client-server separation, cacheability, and a layered system. Many APIs call themselves REST but don't follow all constraints — they're called REST-like or HTTP APIs. True REST also uses HATEOAS (Hypermedia as the Engine of Application State) where responses include links to related actions, though few APIs implement this.

---

**Q2: What is HATEOAS and do modern APIs use it?**

> **A:** HATEOAS means API responses include hyperlinks to related actions/resources. For example, a user response would include `"_links": {"self": "/users/1", "orders": "/users/1/orders", "delete": "/users/1"}`. It makes APIs self-discoverable. In theory it's ideal, in practice most APIs skip it because it adds complexity and clients often already know the API structure. GitHub's API partially implements it.

---

**Q3: How would you design a REST API for a social media "like" feature?**

> **A:** Since "like" is an action on a resource, model it as a sub-resource:
>
> - `POST /posts/42/likes` → Like post 42 (creates the like)
> - `DELETE /posts/42/likes/{userId}` → Unlike post 42
> - `GET /posts/42/likes` → Get all users who liked post 42
> - `GET /posts/42/likes/count` → Get like count
>   This keeps the URL noun-based while the HTTP verb expresses the action.

---

**Q4: What is the Richardson Maturity Model?**

> **A:** It's a model with 4 levels measuring how RESTful an API is:
>
> - **Level 0:** One endpoint, uses HTTP as transport (like SOAP over HTTP)
> - **Level 1:** Multiple resources/endpoints, but only one HTTP verb
> - **Level 2:** Proper HTTP verbs (GET, POST, DELETE) used correctly
> - **Level 3:** HATEOAS — responses include links to related actions
>   Most production APIs are at Level 2. Level 3 is the theoretical ideal.

---

## Lesson 05 — GraphQL APIs — Query What You Need

### 🧠 Concept

**GraphQL** is a query language for APIs developed by Facebook (2015). Instead of multiple REST endpoints, GraphQL exposes a **single endpoint** where clients specify exactly what data they need.

### ⚖️ REST vs GraphQL

```
REST Problem — Over-fetching:
GET /users/42
Returns: id, name, email, address, phone, preferences, metadata...
(You only needed name and email)

REST Problem — Under-fetching:
GET /users/42        → get user
GET /users/42/posts  → get their posts
GET /users/42/friends → get their friends
(3 round trips for one screen)

GraphQL Solution — One query, exact data:
{
  user(id: 42) {
    name
    email
    posts(limit: 3) {
      title
      createdAt
    }
    friends(limit: 5) {
      name
      avatar
    }
  }
}
```

### 📝 GraphQL Fundamentals

**Schema Definition (SDL):**

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  tags: [String!]!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

type Subscription {
  newPost: Post!
  userStatusChanged(userId: ID!): User!
}
```

**Query:**

```graphql
query GetUserProfile {
  user(id: "42") {
    name
    email
    posts(limit: 3) {
      id
      title
      tags
    }
  }
}
```

**Mutation (Create):**

```graphql
mutation CreateNewUser {
  createUser(input: { name: "Omar Sheikh", email: "omar@example.com" }) {
    id
    name
    createdAt
  }
}
```

**Subscription (Real-time):**

```graphql
subscription OnNewPost {
  newPost {
    id
    title
    author {
      name
    }
  }
}
```

### 🔍 GraphQL Key Concepts

| Concept       | Description                               |
| ------------- | ----------------------------------------- |
| Schema        | Defines all types, queries, mutations     |
| Resolver      | Function that fetches data for each field |
| Query         | Read data                                 |
| Mutation      | Write/modify data                         |
| Subscription  | Real-time data via WebSocket              |
| Fragment      | Reusable field selections                 |
| Variables     | Parameterize queries                      |
| Introspection | Query the schema itself                   |

### 🌍 Real-World Scenario

**Scenario:** GitHub uses GraphQL for its v4 API. Their REST v3 API required many requests to build a repository page. With GraphQL:

```graphql
query GitHubRepoPage($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    description
    stargazerCount
    forkCount
    issues(first: 10, states: OPEN) {
      nodes {
        title
        author {
          login
        }
        createdAt
      }
    }
    pullRequests(first: 5, states: OPEN) {
      nodes {
        title
        headRefName
      }
    }
  }
}
```

One request replaces what would have been 4+ REST calls.

---

### 💬 Interview Questions & Answers — Lesson 05

**Q1: What are the advantages and disadvantages of GraphQL over REST?**

> **A:** **Advantages:** No over/under-fetching, single endpoint, strongly typed schema, self-documenting (introspection), great for complex/nested data, clients control response shape, real-time via subscriptions. **Disadvantages:** Complex to set up, caching is harder (all POST to one endpoint), N+1 query problem in resolvers, overkill for simple CRUD, learning curve, rate limiting is trickier. Best suited for complex applications with diverse clients (mobile, web, desktop).

---

**Q2: What is the N+1 problem in GraphQL and how do you solve it?**

> **A:** If you query 10 users with their posts, GraphQL might run 1 query for users and then 10 separate queries for each user's posts — 11 total. This is N+1. The solution is **DataLoader** (Facebook's library) which batches and caches requests: instead of 10 individual `SELECT * FROM posts WHERE user_id = ?` calls, it fires one `SELECT * FROM posts WHERE user_id IN (1,2,...,10)`.

---

**Q3: How does GraphQL handle versioning compared to REST?**

> **A:** GraphQL doesn't need versioning in the traditional sense. REST requires `/v1/`, `/v2/` endpoints when the API changes. In GraphQL, you simply add new fields/types (backward compatible) and mark old ones with `@deprecated` directive. Clients that don't request deprecated fields are unaffected. The schema evolves without breaking existing clients. This is one of GraphQL's major advantages.

---

**Q4: When would you choose REST over GraphQL?**

> **A:** Choose REST when: the API is simple CRUD with limited data relationships, public API where caching is critical (REST is easier to cache with GET requests), team is smaller/less experienced with GraphQL, microservice-to-microservice communication (where gRPC or REST is simpler), file uploads are needed (GraphQL handles them awkwardly), or you need strict HTTP method semantics and status codes.

---

## Lesson 06 — SOAP APIs — Enterprise-Grade Web Services

### 🧠 Concept

**SOAP (Simple Object Access Protocol)** is a protocol (not just an architectural style) for exchanging structured information in web services. It uses **XML** exclusively and is highly formal with strict contracts.

### 📋 SOAP vs REST

| Aspect         | SOAP                 | REST                |
| -------------- | -------------------- | ------------------- |
| Protocol       | Protocol (strict)    | Architectural style |
| Format         | XML only             | JSON, XML, etc.     |
| Contract       | WSDL (required)      | OpenAPI (optional)  |
| Transport      | HTTP, SMTP, JMS      | HTTP only           |
| Security       | WS-Security built-in | OAuth/JWT           |
| Error handling | Fault elements       | HTTP status codes   |
| Use case       | Enterprise, banking  | Web/mobile apps     |
| Verbosity      | Very verbose         | Lightweight         |

### 📝 SOAP Message Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:tns="http://example.com/bankservice">

  <soap:Header>
    <tns:Authentication>
      <tns:Username>user123</tns:Username>
      <tns:Password>pass456</tns:Password>
    </tns:Authentication>
  </soap:Header>

  <soap:Body>
    <tns:TransferFunds>
      <tns:FromAccount>ACC001</tns:FromAccount>
      <tns:ToAccount>ACC002</tns:ToAccount>
      <tns:Amount>5000.00</tns:Amount>
      <tns:Currency>PKR</tns:Currency>
    </tns:TransferFunds>
  </soap:Body>

</soap:Envelope>
```

**SOAP Fault (Error) Response:**

```xml
<soap:Envelope>
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>Insufficient funds</faultstring>
      <detail>
        <tns:ErrorDetail>
          <tns:Code>E001</tns:Code>
          <tns:Message>Account balance too low for transfer</tns:Message>
        </tns:ErrorDetail>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>
```

### 🌍 Real-World Scenario

**SOAP is still heavily used in:**

- **Banking systems:** Inter-bank transfers, SWIFT integrations
- **Government APIs:** Tax filing, national ID verification
- **Healthcare:** HL7 FHIR (some implementations), insurance claims
- **ERP systems:** SAP, Oracle integrations
- **Legacy enterprise systems:** Airlines, insurance companies

**Example:** Pakistan's FBR (Federal Board of Revenue) e-filing system uses SOAP-based web services for tax submissions.

---

### 💬 Interview Questions & Answers — Lesson 06

**Q1: Why is SOAP still used in enterprise systems despite REST being simpler?**

> **A:** SOAP persists because: it has built-in security standards (WS-Security, WS-Trust), supports ACID-compliant transactions across services, provides formal contracts via WSDL that generate code automatically, works over multiple protocols (not just HTTP), and many enterprise systems were built decades ago and can't be easily migrated. Banking and government systems also value SOAP's strict typing and formal validation.

---

**Q2: What is WSDL?**

> **A:** WSDL (Web Services Description Language) is an XML document that describes a SOAP web service — what operations are available, what parameters they take, what they return, and where the service is located. It's the formal contract of a SOAP service. IDEs and tools can import WSDL to auto-generate client code (stubs), which is why enterprise teams value it for type safety across team boundaries.

---

**Q3: What are WS-\* standards?**

> **A:** WS-\* (Web Services standards) are extensions built on top of SOAP for enterprise features: WS-Security (message-level encryption/signing), WS-ReliableMessaging (guaranteed delivery), WS-Transaction (distributed transactions), WS-Coordination, and WS-Policy. These make SOAP more feature-rich than REST for complex enterprise scenarios but also significantly more complex to implement.

---

## Lesson 07 — gRPC APIs — High-Performance Communication

### 🧠 Concept

**gRPC** (Google Remote Procedure Call) is a modern, high-performance RPC framework by Google. It uses **Protocol Buffers (protobuf)** for serialization and **HTTP/2** for transport.

### ⚡ Why gRPC?

```
REST/JSON:
{"userId": 42, "name": "Ahmed", "email": "ahmed@example.com"}
Size: 58 bytes (text)

gRPC/Protobuf:
Binary encoding: ~15 bytes (binary, compressed)
Speed: ~7x faster serialization than JSON
```

### 📝 Protocol Buffers (Protobuf)

**Define your schema in `.proto` file:**

```protobuf
syntax = "proto3";

package userservice;

service UserService {
  rpc GetUser (GetUserRequest) returns (UserResponse);
  rpc CreateUser (CreateUserRequest) returns (UserResponse);
  rpc ListUsers (ListUsersRequest) returns (stream UserResponse);
  rpc StreamUsers (stream UserEvent) returns (stream UserResponse);
}

message GetUserRequest {
  int64 user_id = 1;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
  string role = 3;
}

message UserResponse {
  int64 id = 1;
  string name = 2;
  string email = 3;
  string role = 4;
  int64 created_at = 5;
}

message ListUsersRequest {
  int32 page = 1;
  int32 limit = 2;
}

message UserEvent {
  string event_type = 1;
  int64 user_id = 2;
}
```

### 🔄 gRPC Communication Patterns

| Pattern                 | Description                      | Use Case                 |
| ----------------------- | -------------------------------- | ------------------------ |
| Unary                   | Single request, single response  | GetUser, CreateUser      |
| Server Streaming        | One request, stream of responses | File download, live feed |
| Client Streaming        | Stream of requests, one response | File upload, bulk insert |
| Bidirectional Streaming | Stream in both directions        | Chat, real-time gaming   |

### 🌍 Real-World Scenario

**Scenario:** Ride-sharing app microservices

```
Client App
    ↓ REST/JSON (for mobile)
API Gateway
    ↓ gRPC (internal, high-speed)
├── UserService.proto
├── DriverService.proto
├── LocationService.proto (bidirectional streaming for live tracking)
├── PricingService.proto
└── PaymentService.proto
```

Uber, Netflix, and Google use gRPC internally because the performance gains matter at scale.

---

### 💬 Interview Questions & Answers — Lesson 07

**Q1: When would you choose gRPC over REST?**

> **A:** Choose gRPC for: microservice-to-microservice communication (internal APIs), when performance and bandwidth are critical (mobile networks, high-throughput systems), polyglot environments (auto-generates clients in 10+ languages from .proto), real-time streaming needs, and when strongly-typed contracts between services are important. Avoid gRPC for: public APIs (less browser-friendly), when you need human-readable requests for debugging, and when simplicity matters more than performance.

---

**Q2: What are Protocol Buffers and why are they faster than JSON?**

> **A:** Protocol Buffers (protobuf) is Google's binary serialization format. It's faster than JSON because: it uses binary encoding (no text parsing), field names are replaced with small integer identifiers (no repeated string keys), the schema is pre-defined (no need to discover structure at runtime), and the binary format is more compact. Serialization/deserialization is typically 3–10x faster and payload size is 2–5x smaller than equivalent JSON.

---

**Q3: What is the difference between gRPC and REST in terms of browser support?**

> **A:** REST over HTTP/1.1 works natively in all browsers. gRPC uses HTTP/2 with binary framing — browsers can't directly call gRPC services because browser `Fetch API` doesn't expose HTTP/2 trailers (needed by gRPC). The solution is **gRPC-Web**, a proxy (like Envoy) that translates browser HTTP/1.1 calls to gRPC. This is why gRPC is primarily used for backend-to-backend communication, with REST/GraphQL for client-facing APIs.

---

## Lesson 08 — WebSockets — Real-Time Bidirectional Communication

### 🧠 Concept

**WebSockets** provide a **persistent, full-duplex** connection between client and server. Unlike HTTP (request-response), WebSockets allow both sides to send data at any time without a new request.

### 🔄 HTTP vs WebSocket

```
HTTP (Polling — Inefficient):
Client: "Any new messages?" → Server: "No"
Client: "Any new messages?" → Server: "No"
Client: "Any new messages?" → Server: "Yes! Here: {...}"
(New TCP connection each time — wasteful)

WebSocket (Efficient):
Client: "Open connection"
Server: "Connection open ✅"
[5 minutes later]
Server: "New message! {...}"
[2 minutes later]
Server: "User X is typing..."
[30 seconds later]
Client: "Send this message: {...}"
(Single persistent connection)
```

### 🤝 WebSocket Handshake

```http
# Client initiates upgrade from HTTP to WebSocket
GET /chat HTTP/1.1
Host: ws.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

# Server accepts upgrade
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### 📝 WebSocket Implementation

**Server (Node.js):**

```javascript
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map(); // userId → ws

wss.on("connection", (ws, req) => {
  const userId = getUserIdFromToken(req);
  clients.set(userId, ws);

  console.log(`User ${userId} connected`);

  ws.on("message", (data) => {
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case "SEND_MESSAGE":
        broadcastToRoom(payload.roomId, {
          type: "NEW_MESSAGE",
          payload: {
            text: payload.text,
            sender: userId,
            timestamp: new Date(),
          },
        });
        break;

      case "TYPING":
        broadcastToRoom(
          payload.roomId,
          {
            type: "USER_TYPING",
            payload: { userId },
          },
          [userId],
        ); // Exclude sender
        break;
    }
  });

  ws.on("close", () => {
    clients.delete(userId);
    console.log(`User ${userId} disconnected`);
  });
});
```

**Client (Browser):**

```javascript
const ws = new WebSocket("wss://api.example.com/chat");

ws.onopen = () => {
  console.log("Connected to server");
  ws.send(
    JSON.stringify({ type: "AUTH", token: localStorage.getItem("token") }),
  );
};

ws.onmessage = (event) => {
  const { type, payload } = JSON.parse(event.data);

  if (type === "NEW_MESSAGE") {
    displayMessage(payload);
  } else if (type === "USER_TYPING") {
    showTypingIndicator(payload.userId);
  }
};

ws.onclose = (event) => {
  console.log("Disconnected. Reconnecting...");
  setTimeout(connectWebSocket, 3000); // Auto-reconnect
};

ws.onerror = (error) => console.error("WebSocket error:", error);

// Send a message
function sendMessage(text, roomId) {
  ws.send(
    JSON.stringify({
      type: "SEND_MESSAGE",
      payload: { text, roomId },
    }),
  );
}
```

### 🌍 Real-World Scenarios

| App               | WebSocket Use            |
| ----------------- | ------------------------ |
| Slack / WhatsApp  | Real-time messaging      |
| Google Docs       | Collaborative editing    |
| Binance / Trading | Live price updates       |
| Uber              | Driver location tracking |
| Online games      | Multiplayer state sync   |
| Live sports       | Score updates            |

---

### 💬 Interview Questions & Answers — Lesson 08

**Q1: When should you use WebSockets vs REST polling vs Server-Sent Events?**

> **A:**
>
> - **WebSockets:** Full bidirectional, real-time. Use for chat, multiplayer games, collaborative tools, live trading.
> - **Server-Sent Events (SSE):** One-way server → client, simpler to implement, works over HTTP. Use for live feeds, notifications, progress updates where client doesn't need to send data frequently.
> - **Long Polling:** Client sends request, server holds it until data available. Old technique, higher overhead. Use when WebSockets aren't supported.
> - **Short Polling:** Regular interval requests. Simple but wasteful. Use only for infrequently updating data with simple requirements.

---

**Q2: How do you handle WebSocket reconnection in production?**

> **A:** Implement exponential backoff: try reconnecting at 1s, then 2s, 4s, 8s, up to a maximum (e.g., 30s). Track a reconnection attempt counter. On reconnect, re-authenticate (re-send auth token), rejoin rooms/channels, and request any missed messages using a timestamp/sequence number. Libraries like `reconnecting-websocket` handle this automatically.

---

**Q3: How do WebSockets scale across multiple servers?**

> **A:** WebSockets maintain a persistent connection to a specific server. If you have 3 servers, clients on server A can't directly receive messages from clients on server B. Solution: use a **pub/sub broker** (Redis Pub/Sub, Apache Kafka) where each server publishes and subscribes to channels. When user on server A sends a message, it publishes to Redis channel, all servers receive it and forward to their connected clients. This is how Slack and WhatsApp scale.

---

## Lesson 09 — Webhooks — Event-Driven APIs

### 🧠 Concept

**Webhooks** are HTTP callbacks — instead of your app polling an API for updates, the external service **pushes data to your endpoint** when an event occurs.

```
Polling (Inefficient):
Your App → "Did payment succeed?" → Stripe
Your App → "Did payment succeed?" → Stripe  (every 5 seconds)
Your App → "Did payment succeed?" → Stripe

Webhook (Efficient):
[Payment succeeds]
Stripe → POST your-app.com/webhooks/stripe → Your App
Your App processes the event
```

### 📝 Webhook Implementation

**Receiving a Stripe Webhook:**

```javascript
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }), // Raw body for signature verification
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      // Verify webhook signature (CRITICAL for security)
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error(`Signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        await fulfillOrder(paymentIntent.metadata.orderId);
        await sendConfirmationEmail(paymentIntent.metadata.customerEmail);
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        await notifyPaymentFailed(failedPayment.metadata.orderId);
        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object;
        await deactivateUserSubscription(subscription.customer);
        break;
    }

    // Must return 200 quickly (Stripe retries if no response in 30s)
    res.json({ received: true });
  },
);
```

### 🔒 Webhook Security

Always verify webhook signatures to prevent fake payloads:

```javascript
// GitHub webhook signature verification
const crypto = require("crypto");

function verifyGitHubWebhook(req, secret) {
  const signature = req.headers["x-hub-signature-256"];
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(req.rawBody).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
```

### 🌍 Real-World Webhook Scenarios

| Service  | Event                      | Your Action                 |
| -------- | -------------------------- | --------------------------- |
| Stripe   | `payment_intent.succeeded` | Fulfill order, send receipt |
| GitHub   | `push`                     | Trigger CI/CD pipeline      |
| Twilio   | `message.received`         | Process incoming SMS        |
| Shopify  | `order.created`            | Update inventory            |
| SendGrid | `email.bounced`            | Mark email as invalid       |
| Slack    | `app_mention`              | Respond to bot message      |

---

### 💬 Interview Questions & Answers — Lesson 09

**Q1: What challenges come with receiving webhooks in production?**

> **A:**
>
> 1. **Idempotency:** Webhooks can be delivered more than once (retries). Process by storing event IDs and skipping duplicates.
> 2. **Response time:** Must respond with 200 quickly (< 5–30s). Offload heavy processing to a queue (Redis, RabbitMQ).
> 3. **Failures:** Your server might be down when webhook fires. Providers retry, so implement proper idempotency.
> 4. **Security:** Always verify signatures.
> 5. **Ordering:** Events may arrive out of order. Don't assume event sequence.
> 6. **Debugging:** Use tools like ngrok for local testing, and providers like Stripe's webhook dashboard for replay.

---

**Q2: How do you handle webhook delivery failures?**

> **A:** Design your endpoint to be idempotent (same event processed twice = same result). Store incoming events in a database first with a status of "pending". A background worker processes them. If processing fails, retry with exponential backoff. Log all incoming webhooks before processing for debugging. Use a dead letter queue for events that fail after all retries.

---

## Lesson 10 — Authentication & Security in APIs

### 🧠 Concept

API security ensures only authorized users/apps can access your endpoints. It covers authentication (who are you?) and authorization (what can you do?).

### 🔑 Authentication Methods

**1. API Keys**

```http
GET /api/data
X-API-Key: sk_live_abc123xyz456
```

- Simple, stateless
- Hard to revoke specific permissions
- Use for: machine-to-machine, public APIs

**2. Basic Authentication**

```http
GET /api/data
Authorization: Basic dXNlcjpwYXNz  ← base64("user:password")
```

- Only use over HTTPS
- Credentials sent every request
- Use for: internal tools, simple APIs

**3. Bearer Token (JWT)**

```http
GET /api/data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**JWT Structure:**

```
Header.Payload.Signature
eyJhbGci...  .  eyJ1c2VySWQiOjQy...  .  SflKxwRJSMeKKF2QT4...

Decoded Payload:
{
  "userId": 42,
  "email": "user@example.com",
  "role": "admin",
  "iat": 1705312800,   ← Issued at
  "exp": 1705316400    ← Expires at (1 hour)
}
```

**4. OAuth 2.0 Flows**

```
Authorization Code Flow (Web Apps):
User → Your App → Redirect to Google
Google → User enters credentials
Google → Redirect back with code
Your App → Exchange code for token
Your App → Use token for API calls

Client Credentials Flow (Machine-to-Machine):
Your Service → POST /oauth/token {client_id, client_secret}
Auth Server → Returns access_token
Your Service → Calls API with token
```

### 🛡️ API Security Best Practices

```
✅ Always use HTTPS
✅ Validate and sanitize all inputs
✅ Use parameterized queries (prevent SQL injection)
✅ Implement rate limiting
✅ Short-lived tokens (15min access, 7 days refresh)
✅ Rotate API keys regularly
✅ Log all authentication events
✅ Use CORS properly (don't use wildcard * in production)
✅ Validate Content-Type headers
✅ Implement request size limits

❌ Never store passwords in plaintext
❌ Never log credentials or tokens
❌ Never put secrets in URLs (visible in server logs)
❌ Never trust client-side validation alone
```

### 🌍 Real-World Scenario

**Scenario:** E-commerce API Security

```
Public endpoints (no auth):
GET /products
GET /products/:id
GET /categories

Authenticated (JWT required):
GET /profile
POST /orders
GET /orders/:id

Admin only (JWT + admin role):
POST /products
DELETE /products/:id
GET /admin/users

Service-to-service (OAuth client credentials):
POST /internal/inventory/reserve
POST /internal/emails/send
```

---

### 💬 Interview Questions & Answers — Lesson 10

**Q1: What is the difference between authentication and authorization?**

> **A:** Authentication is verifying identity — "Who are you?" (login with credentials). Authorization is verifying permissions — "What are you allowed to do?" (can this user access this resource?). In APIs: authentication is handled by JWT/OAuth (verifying the token is valid and identifying the user), authorization is handled by role checks or permission scopes (verifying the user has access to the specific endpoint or data).

---

**Q2: What is a JWT and what are its security considerations?**

> **A:** JWT (JSON Web Token) is a compact, self-contained token with a header, payload, and signature. The server doesn't need to store sessions — it just verifies the signature. Security considerations: use short expiry times (15–60 min) to limit damage if stolen; use refresh tokens for new access tokens; store access tokens in memory (not localStorage — XSS risk); store refresh tokens in HttpOnly cookies (CSRF-protected); always validate the `alg` field to prevent the `alg:none` attack; use strong secret keys (256+ bits).

---

**Q3: What is OAuth 2.0 and how does it differ from API Keys?**

> **A:** OAuth 2.0 is a delegated authorization framework — it lets users grant third-party apps limited access to their accounts without sharing passwords (e.g., "Login with Google"). It has scopes (granular permissions), expiring tokens, and revocable access. API Keys are simpler static credentials for machine-to-machine authentication without user context. OAuth is for user-delegated access; API keys are for direct service authentication.

---

**Q4: How would you protect an API from SQL injection?**

> **A:** Never concatenate user input into SQL strings. Always use parameterized queries/prepared statements:
>
> ```javascript
> // DANGEROUS
> db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
> // SAFE
> db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
> ```
>
> Also use an ORM (Sequelize, Prisma), validate input types, and implement a WAF (Web Application Firewall) at the infrastructure level.

---

## Lesson 11 — API Design Best Practices & Versioning

### 🧠 Concept

Good API design is about **consistency, predictability, and developer experience (DX)**. A well-designed API is intuitive, hard to misuse, and easy to evolve.

### 📐 Naming Conventions

```
✅ Use plural nouns for resources
/users        /orders       /products

✅ Use kebab-case for multi-word resources
/blog-posts   /order-items  /api-keys

✅ Use consistent query parameter names
?page=1&limit=20&sort=createdAt&order=desc&search=laptop

✅ Use ISO 8601 for dates
"createdAt": "2025-01-15T10:30:00Z"

✅ Use camelCase for JSON fields
{"userId": 42, "firstName": "Ahmed", "createdAt": "..."}

❌ Avoid verbs in URLs
/getUser   /createPost   /deleteOrder
```

### 📦 Response Structure Standards

```json
// Success Response
{
  "success": true,
  "data": {
    "id": 42,
    "name": "Ahmed"
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}

// List Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "age", "message": "Must be 18 or older" }
    ]
  },
  "meta": {
    "timestamp": "2025-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### 🔖 API Versioning Strategies

**1. URL Versioning (Most Common)**

```
/api/v1/users    ← Version 1
/api/v2/users    ← Version 2 (breaking changes)
```

✅ Visible, easy to route, cacheable  
❌ URL is not "pure" (version isn't a resource)

**2. Header Versioning**

```http
GET /api/users
API-Version: 2
```

✅ Clean URLs  
❌ Harder to test in browser

**3. Accept Header (Content Negotiation)**

```http
GET /api/users
Accept: application/vnd.company.v2+json
```

✅ Most REST-compliant  
❌ Complex, less developer-friendly

**Versioning Best Practices:**

```
- Never break existing APIs (add fields, don't remove)
- Deprecate with notice period (6–12 months)
- Add Sunset header when deprecating:
  Sunset: Sat, 01 Jun 2026 00:00:00 GMT
- Document migration guides
- Support N-1 versions minimum
```

### 🌍 Real-World Scenario

**Stripe API Versioning:** Stripe uses date-based versioning (`2023-10-16`). Each API key has a default version. When you create a new integration you pin to a version. Stripe maintains backward compatibility for years and deprecates very slowly — a model other companies should follow.

---

### 💬 Interview Questions & Answers — Lesson 11

**Q1: What is backward compatibility and why is it critical in API design?**

> **A:** Backward compatibility means existing clients continue to work after an API update. Breaking changes include: removing fields, renaming fields, changing field types, removing endpoints, changing authentication. Non-breaking: adding new optional fields, adding new endpoints, adding new optional parameters. You can check compatibility by treating the API as a contract — any change that requires clients to update their code is a breaking change and requires a version bump.

---

**Q2: How do you document an API effectively?**

> **A:** Use **OpenAPI (Swagger) specification** for REST APIs — it generates interactive docs, client SDKs, and can validate requests. Good documentation includes: endpoint descriptions, request/response examples, error codes, authentication guide, rate limits, changelog, and a quickstart guide. Tools: Swagger UI, Redoc, Stoplight, Postman documentation. The best docs show code examples in multiple languages and have a live "try it" feature.

---

## Lesson 12 — Networking Deep Dive — TCP/IP, DNS, CDN

### 🧠 Advanced Networking Concepts

### 📡 How a CDN Works

```
Without CDN:
User in Karachi → Request → Origin Server in US (200ms latency)

With CDN:
User in Karachi → Request → CDN Edge in Dubai (20ms latency)
                            ↓ (if not cached)
                         Origin Server in US
```

**CDN Use Cases for APIs:**

- Caching static API responses (product lists, configurations)
- Edge computing (running logic close to users with Cloudflare Workers)
- DDoS protection (absorb traffic before it hits origin)
- SSL termination at edge

### 🔄 Load Balancing Algorithms

| Algorithm         | How it Works                                  | Best For                  |
| ----------------- | --------------------------------------------- | ------------------------- |
| Round Robin       | Rotate through servers                        | Uniform load              |
| Least Connections | Send to server with fewest active connections | Variable request duration |
| IP Hash           | Same client → same server                     | Session persistence       |
| Weighted          | More powerful servers get more traffic        | Mixed hardware            |

### 🔒 TLS/SSL Deep Dive

```
TLS 1.3 Handshake (Simplified):

Client → ClientHello (supported ciphers, TLS version) → Server
Client ← ServerHello (chosen cipher, certificate)    ← Server
Client verifies server certificate with CA
Client → Encrypted session data                      → Server
[Secure channel established — all data encrypted]
```

### 🌍 Real-World Scenario

**Scenario:** High-traffic API Architecture

```
                    [Cloudflare CDN/WAF]
                           ↓
                    [Load Balancer]
                   /      |      \
            [API1]    [API2]    [API3]
                \      |      /
                 [Redis Cache]
                       ↓
                 [PostgreSQL Primary]
                 [PostgreSQL Replica]
```

---

### 💬 Interview Questions & Answers — Lesson 12

**Q1: What is the difference between a load balancer and a reverse proxy?**

> **A:** A reverse proxy handles requests on behalf of backend servers — it provides SSL termination, compression, caching, and URL rewriting. A load balancer distributes traffic across multiple backend server instances. In practice, tools like Nginx can act as both simultaneously. A dedicated load balancer (AWS ALB, HAProxy) focuses on traffic distribution with health checking and session persistence. They're often used together: load balancer in front, reverse proxy at each server.

---

**Q2: What is DNS TTL and why does it matter for API deployments?**

> **A:** TTL (Time to Live) is how long DNS resolvers cache a record before re-querying. A TTL of 300 (5 minutes) means after changing a DNS record, old IPs may still be served for up to 5 minutes. For deployments: lower TTL before a migration (300s), make the DNS change, wait, then increase TTL again (3600s+). Low TTL increases DNS query load but enables faster failovers.

---

## Lesson 13 — Microservices & API Gateway Patterns

### 🧠 Concept

In microservices architecture, an **API Gateway** is the single entry point that routes requests to appropriate services, handles cross-cutting concerns, and provides a unified interface.

### 🏗️ API Gateway Pattern

```
                    Client
                      ↓
              [API Gateway]
          /       |       |       \
   [Auth       [User    [Order   [Product
   Service]    Service] Service] Service]
                              ↓
                         [Payment
                          Service]
```

**API Gateway Responsibilities:**

- Request routing
- Authentication/Authorization
- Rate limiting
- SSL termination
- Request/response transformation
- Circuit breaking
- Logging & monitoring
- API aggregation (combine multiple service calls)

### 🔌 Service Communication Patterns

```
Synchronous (Direct):
OrderService → HTTP/gRPC → PaymentService
(Waits for response — coupling)

Asynchronous (Event-driven):
OrderService → Publish "order.created" → Message Queue
                                               ↓
PaymentService reads and processes event
(Decoupled — no direct dependency)
```

### 🛡️ Circuit Breaker Pattern

```
Normal:        Service A → Service B (healthy)

B fails:       Service A → Service B (timeout × 5)
               Circuit Opens (stop calling B temporarily)

Fallback:      Service A → Returns cached/default data

Recovery:      Half-open: Allow 1 test request
               If success → Circuit Closes
               If fail → Stay open
```

### 🌍 Real-World Scenario

**Netflix Microservices:**

- 700+ microservices
- API Gateway (Zuul/Spring Cloud Gateway) routes to services
- Each service owns its data
- Hystrix/Resilience4j handles circuit breaking
- Eureka for service discovery

---

### 💬 Interview Questions & Answers — Lesson 13

**Q1: What problems does an API Gateway solve?**

> **A:** Without an API Gateway, clients must know all service locations, each service implements auth/rate limiting redundantly, cross-service concerns create code duplication, and changing services requires client updates. An API Gateway centralizes: authentication (one place to validate tokens), rate limiting, SSL, logging, routing, and can aggregate multiple service calls into one client response. Clients talk to one URL; internal topology can change freely.

---

**Q2: What is service discovery and why is it needed in microservices?**

> **A:** In microservices, service instances start/stop dynamically (containers scaling up/down). Service discovery lets services find each other's addresses dynamically. Client-side discovery: service asks a registry (Consul, Eureka) for addresses and load-balances itself. Server-side discovery: load balancer queries registry and routes (AWS ALB + ECS). Without it, you'd hardcode IPs which breaks when containers restart with new IPs.

---

## Lesson 14 — Rate Limiting, Caching & Performance

### 🧠 Rate Limiting Algorithms

**1. Fixed Window:**

```
Allow 100 requests per minute.
At :00 counter resets to 0.
Problem: 100 at :59, 100 at :01 = 200 in 2 seconds
```

**2. Sliding Window:**

```
Track requests in last 60 seconds (rolling window).
Better accuracy, higher memory.
```

**3. Token Bucket (Most Common):**

```
Bucket holds 100 tokens.
Each request consumes 1 token.
Tokens refill at 10/second.
Allows bursts up to bucket size.
```

**4. Leaky Bucket:**

```
Requests enter a queue (bucket).
Processed at constant rate (leak).
Smooths traffic, no bursts allowed.
```

### 🗄️ Caching Strategies

```
Cache-Aside (Most Common):
1. App checks cache
2. Cache miss → query database
3. Store result in cache
4. Return data

Write-Through:
1. App writes to cache
2. Cache writes to database
3. Consistent but write latency

Write-Behind:
1. App writes to cache
2. Cache writes to database asynchronously
3. Risk of data loss on crash
```

**HTTP Caching Headers:**

```http
# Server response
Cache-Control: public, max-age=3600    ← Cache for 1 hour
ETag: "abc123"                          ← Version identifier
Last-Modified: Wed, 15 Jan 2025 10:00:00 GMT

# Client re-request
If-None-Match: "abc123"
If-Modified-Since: Wed, 15 Jan 2025 10:00:00 GMT

# Server response if unchanged
HTTP/1.1 304 Not Modified              ← No body, saves bandwidth
```

### 🌍 Real-World Scenario

**Twitter's Caching Strategy:**

- Timeline reads are cached in Redis (expensive to recompute)
- Tweet content cached in Memcached
- CDN caches public profiles and images
- Rate limits: 500 tweets/day, 2400 API reads/15 min per app

---

### 💬 Interview Questions & Answers — Lesson 14

**Q1: What headers does an API return for rate limiting and what do they mean?**

> **A:**
>
> - `X-RateLimit-Limit: 1000` — max requests per window
> - `X-RateLimit-Remaining: 743` — requests left in current window
> - `X-RateLimit-Reset: 1705316400` — Unix timestamp when window resets
> - When exceeded: `429 Too Many Requests` with `Retry-After: 60` header (seconds to wait)
> - Client should implement exponential backoff when hitting 429s.

---

**Q2: What is cache invalidation and why is it called hard?**

> **A:** Cache invalidation is deciding when to remove/update cached data when the underlying data changes. It's "hard" because: if you invalidate too eagerly, you lose cache benefits; too lazily, users see stale data. Common strategies: TTL-based expiry (simple but can serve stale data), event-driven invalidation (publish cache-busting events on writes), versioned cache keys (`user:42:v3`), and write-through (update cache on every write). Phil Karlton famously said naming and cache invalidation are the two hardest problems in CS.

---

## Lesson 15 — API Testing, Monitoring & Documentation

### 🧠 API Testing Levels

```
Unit Tests       → Test individual functions/handlers
Integration Tests → Test API endpoints with real DB
Contract Tests   → Verify API meets its specification
End-to-End Tests → Full flow from client to database
Load Tests       → Performance under concurrent requests
Security Tests   → Pen testing, auth bypass attempts
```

### 📝 Integration Test Example (Jest + Supertest)

```javascript
const request = require("supertest");
const app = require("../app");
const db = require("../database");

describe("POST /api/v1/users", () => {
  beforeAll(async () => await db.migrate.latest());
  afterAll(async () => await db.destroy());
  afterEach(async () => await db("users").delete());

  it("should create a user with valid data", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .set("Authorization", "Bearer test_admin_token")
      .send({
        name: "Ahmed Khan",
        email: "ahmed@test.com",
        role: "customer",
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject({
      name: "Ahmed Khan",
      email: "ahmed@test.com",
    });
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.password).toBeUndefined(); // Never expose
  });

  it("should return 400 for invalid email", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({ name: "Test", email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("should return 409 for duplicate email", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({ ...validUser });
    const response = await request(app)
      .post("/api/v1/users")
      .send({ ...validUser });

    expect(response.status).toBe(409);
  });
});
```

### 📊 API Monitoring & Observability

**The Three Pillars:**

```
1. Metrics  → Quantitative measurements
   - Request rate (req/s)
   - Error rate (% of 5xx responses)
   - Latency (p50, p95, p99)
   - Resource usage (CPU, memory)

2. Logs     → Structured event records
   - Request/response logs (with requestId)
   - Error logs with stack traces
   - Audit logs (who did what)

3. Traces   → Distributed request tracing
   - How long each service took
   - Where the bottleneck is
   - Full request path through microservices
```

**Key Metrics to Monitor:**

```
Golden Signals (Google SRE):
- Latency:    p99 < 500ms for critical endpoints
- Traffic:    Requests per second
- Errors:     Error rate < 0.1%
- Saturation: CPU < 70%, memory < 80%
```

### 🛠️ Tools Ecosystem

| Category      | Tools                                    |
| ------------- | ---------------------------------------- |
| API Design    | Postman, Insomnia, Swagger Editor        |
| Testing       | Jest, Supertest, k6, Artillery           |
| Documentation | Swagger UI, Redoc, Slate                 |
| Monitoring    | Datadog, Prometheus + Grafana, New Relic |
| Tracing       | Jaeger, Zipkin, AWS X-Ray                |
| API Gateway   | Kong, AWS API Gateway, Nginx             |
| Mocking       | WireMock, Mockoon, MSW                   |

---

### 💬 Interview Questions & Answers — Lesson 15

**Q1: What is contract testing and how is it different from integration testing?**

> **A:** Integration testing verifies your API works correctly internally. Contract testing verifies the API meets a published specification that consumers depend on. Tools like Pact enable consumer-driven contract testing: the consumer defines what they expect, the provider verifies it matches. This is critical in microservices where changing one service can break consumers. Pact runs in CI/CD — if your API change breaks the contract, the pipeline fails before deployment.

---

**Q2: What metrics would you set up for a new production API?**

> **A:** Minimum viable monitoring:
>
> - **Latency:** p50, p95, p99 per endpoint
> - **Error rate:** 4xx vs 5xx rates separately
> - **Request volume:** req/s to detect anomalies
> - **Uptime/availability:** Synthetic monitoring (ping every minute)
> - **Database query times:** Slow query alerts
> - **Queue depth** (if using async processing)
>   Alert when: p99 > 2s, error rate > 1%, uptime < 99.9%. Use dashboards for trends, PagerDuty for incidents.

---

**Q3: How do you design an API for testability?**

> **A:** Design for dependency injection — don't hardcode database connections or external services; inject them so tests can substitute mocks. Use factory functions for creating test data. Keep handlers thin (validation → service layer → response) for easier unit testing. Use environment variables for configuration. Provide a test environment with test credentials. Add a `requestId` to every request/response for log correlation. Make side effects (emails, payments) easily mockable.

---

## 🎓 Course Summary & Career Roadmap

### Concepts Mastered

```
✅ API fundamentals and mental models
✅ Internet and networking basics (OSI, TCP/IP, DNS)
✅ HTTP/HTTPS protocol deep understanding
✅ REST API design and best practices
✅ GraphQL queries, mutations, subscriptions
✅ SOAP for enterprise scenarios
✅ gRPC and Protocol Buffers
✅ WebSockets for real-time applications
✅ Webhooks for event-driven architecture
✅ API authentication (JWT, OAuth, API Keys)
✅ API versioning and design standards
✅ Advanced networking (CDN, load balancing, TLS)
✅ Microservices and API Gateway patterns
✅ Rate limiting and caching strategies
✅ API testing, monitoring and documentation
```

### 🛤️ Next Steps

| Level        | What to Learn Next                                     |
| ------------ | ------------------------------------------------------ |
| Intermediate | Build a full REST API with Node.js/Express or FastAPI  |
| Intermediate | Implement JWT auth from scratch                        |
| Intermediate | Deploy an API to AWS/GCP with HTTPS                    |
| Advanced     | Build a GraphQL API with Apollo Server                 |
| Advanced     | Implement gRPC services in Go or Python                |
| Advanced     | Design a microservices system with an API Gateway      |
| Advanced     | Set up full observability stack (Prometheus + Grafana) |

### 📚 Recommended Resources

- **REST:** "RESTful Web APIs" by Leonard Richardson
- **GraphQL:** graphql.org official docs, "The Road to GraphQL"
- **gRPC:** grpc.io official documentation
- **Networking:** "Computer Networking: A Top-Down Approach"
- **Security:** OWASP API Security Top 10 (free online)
- **Practice:** Build a Postman workspace with all API types

---

> 💡 **Pro Tip for Interviews:** Always connect concepts to real-world scenarios. When asked about REST vs GraphQL, mention GitHub's v3 vs v4 API. When asked about WebSockets, mention how Slack or trading platforms use them. Interviewers value practical understanding over textbook definitions.

---

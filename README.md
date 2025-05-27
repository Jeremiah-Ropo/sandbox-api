# Dynamic API Validator – Take-Home Assessment

This project is a minimal NestJS-based backend that enables users to define and trigger custom API endpoints with runtime-executed validation logic in a secure sandbox environment.

## ✨ Features

- Define custom API configurations via `/config`
- Dynamically execute custom validation logic using `vm2`
- Secure sandboxing for user-defined JavaScript functions
- Validate incoming request payloads against custom logic
- Handle valid and invalid cases with custom response messages
- Includes a predefined handler for valid results

---

## 📦 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Storage:** In-memory (`Map`) or `configs.json` file
- **Security:** `vm2` for sandboxed execution

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jeremiah-Ropo/sandbox-api.git
cd sandox-api

```

### 2. Install dependencies

```bash
yarn install

```
### 3. Run the server

```bash
yarn start:dev

```

### 4. Test the API (save a custom API config)

```bash
curl -X POST
http://localhost:3000/config
-H "Content-Type: application/json"
-d '
{
  "name": "test-api",
  "method": "POST",
  "body": {
    "email": "",
    "username": ""
  },
  "customValidation": "function customValidation(data) {\n  const email = data.body.email;\n  if (!email) {\n    return { isValid: false, message: 'Email is required.' };\n  }\n  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  if (!emailRegex.test(email)) {\n    return { isValid: false, message: 'Email is invalid.' };\n  }\n  return { isValid: true, message: 'Email is valid.' };\n}"
}
'

```

---




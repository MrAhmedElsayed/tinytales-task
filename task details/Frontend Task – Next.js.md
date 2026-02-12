Here is your cleaned and well-structured reference in **Markdown**:

---

# Frontend Task – Next.js

## Overview

Build an authentication flow using **Next.js** and integrate it with the provided APIs.
The project must include authentication pages, API integration, and a pixel-perfect UI implementation based on the provided Figma design.

---

## Base Configuration

* **Base URL:**

  ```
  https://tinytales.trendline.marketing/api
  ```

* **Figma Design:**
  [https://www.figma.com/design/LwAzcMC020tu1lX5CtK7La/Untitled?node-id=1-386](https://www.figma.com/design/LwAzcMC020tu1lX5CtK7La/Untitled?node-id=1-386)

* **Postman Collection:**
  `Task frontend (2025).postman_collection.json`

---

# 1. Authentication Flow (Next.js)

## 1.1 Register Page

### Required Fields

* Full Name (`name`)
* Email (`email`)
* Password (`password`)
* Password Confirmation (`password_confirmation`)
* Phone Number (`mobile`)
* Country Code (`mobile_country_code`)

### Endpoint

```
POST /auth/register
```

### Headers

```
Accept: application/json
```

### Body (form-data)

```
name
email
mobile
password
password_confirmation
mobile_country_code
```

---

## 1.2 Login Page

### Required Fields

* Email
* Password

### Endpoint

```
POST /auth/login
```

### Headers

```
Accept: application/json
```

### Body (form-data)

```
email
password
```

---

## 1.3 Verify Account Page

### Description

User enters a verification code after registration.

> ✅ Correct verification code for testing: `123456`

### Endpoint

```
POST /auth/verify-email
```

### Headers

```
Accept: application/json
Authorization: Bearer {TOKEN}
```

### Body (form-data)

```
code
```

---

## 1.4 Resend Verification Code

### Endpoint

```
POST /auth/verify-email/resend-code
```

### Headers

```
Accept: application/json
Authorization: Bearer {TOKEN}
```

---

## 1.5 Get Authenticated User Data

### Endpoint

```
GET /auth/user-data
```

### Headers

```
Accept: application/json
Authorization: Bearer {TOKEN}
```

---

## 1.6 Logout

### Endpoint

```
POST /auth/logout
```

### Headers

```
Accept: application/json
Authorization: Bearer {TOKEN}
```

---

# 2. Post-Login Behavior

After successful login:

* Save the returned **token** in `localStorage`
* Redirect user to a **Dashboard**
* Display:

```
Welcome, [User Name]
```

---

# 3. User Interface (UI)

* A UI mockup will be provided.
* The required page must be:

  * Pixel-perfect
  * Fully responsive (Desktop + Mobile)

### Evaluation Criteria

* **Register & Login Pages**

  * Focus: API integration
  * UI design is secondary

* **UI Mockup Page**

  * Focus: Exact visual implementation
  * Must match Figma precisely

---

# 4. API Integration Rules

* Use the provided Postman collection.
* Use the provided `BASE_URL`.
* Handle:

  * Token storage
  * Authorization headers
  * Proper error handling
  * Loading states

---

# 5. Submission Requirements

You must:

1. Push the project to a **GitHub repository**
2. Include a `README.md` with:

   * Installation steps
   * Setup instructions
   * How to run locally
3. Deploy a **Live Demo** (e.g., Vercel)
4. Submit:

   * GitHub repository link
   * Live demo link

---

# 6. Deadline

⏳ Maximum delivery time:
**48 hours (2 days)** from receiving the task.

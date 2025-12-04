# 🧾 November Final Evaluation Instructions

## 🧠 Tech Stack

### 🎨 Frontend

- **React JS**
- **Vanilla CSS** or **Module CSS**

### ⚙️ Backend

- **Node JS**
- **Express JS**

## 🤖 Use of AI Tools

- You **can use AI tools** to **boost your productivity**.
- ❌ **Do not** hand over your entire work to AI.

> ⚠️ Note: Projects using **any other tech stack** (e.g., Python) or **Tailwind CSS** will be **flagged and rejected**.

## 🚫 Project Rejection / Flagging Criteria (50% Evaluation Cap)

Your project will be **flagged** and marked for **50% evaluation only** if **any** of the following occur:

1. 🎨 Project **design does not match** the provided **Figma design**.
2. 💻 **UI is different**, even if backend logic works correctly.
3. ⚙️ **Different tech stack** is used instead of the mentioned one.
4. 📚 **Disallowed libraries** are used.
5. 🖼️ **Different assets** are used instead of those in Figma.
6. 🧩 **Images copied directly** from Figma that can be **recreated using CSS**.

## 📄 Software Requirement Document --- *Hubly CRM*

## 🧩 System Components

### 1️⃣ User Side (Public-Facing Landing Page)

#### 1.1 Landing Page

- A simple, responsive landing page with a **Chat Icon** floating at the bottom right corner.
- Clicking the icon opens a **Mini Chat Box**.

#### 1.2 Mini Chat Box Functionality

- When opened, it displays an **introductory form** asking for:
  - **Name**
  - **Email**
  - **Phone Number**
- A **Thank You** button submits the form.
- Once submitted:
  - A ticket is automatically created.
  - The user is shown a "Thank You, our team will get back to you soon" message.

### 2️⃣ Admin Side

#### 2.1 Authentication

- **Login Page**
  - Admin and team members can log in with credentials.
- **Signup Page**
  - Only accessible initially for creating the first Admin account.
  - Subsequent accounts are created by the Admin from the **Team Management** section.
- Passwords are securely stored (hashed).
- On password change, the affected user should be logged out immediately.
- Email cannot be changed once registered.

## 🧭 Dashboard & Modules

### 3️⃣ Dashboard

- Displays system summary and quick metrics:
  - **All Tickets**
  - **Resolved Tickets**
  - **Unresolved Tickets**
- Includes a **Search bar** allowing filtering by **Ticket ID**.
- Pagination or lazy loading for scalability.

#### Edge Cases

- If no tickets exist → Show "No tickets found" placeholder.
- If a ticket ID doesn't exist → Show a "Ticket not found" alert.

### 4️⃣ Contact Center

#### 4.1 Chat List Panel

- Displays all available chat threads (sorted by latest message or unread status).
- Each item shows:
  - Ticket ID
  - User Name
  - Chat Status (Resolved/Unresolved)
  - Assigned teammate (if any)

#### 4.2 Chat Box Section

- Displays messages for the selected chat.
- Supports:
  - Sending text messages
  - Viewing conversation history
  - Marking as resolved/unresolved
- Messages are stored in the database (not real-time).

#### 4.3 Details Section

- Shows the following info for the selected chat:
  - **Sender Details:** Name, Email, Phone
  - **Assigned Teammate:** Name + Profile
  - **Ticket Status:** Open, In Progress, Resolved
- Admin can **assign** the ticket to another teammate.
- By default, all new chats/tickets are assigned to **Admin**.
- Admin can reassign tickets to other team members.

#### Edge Cases

- If the teammate assigned is deleted → ticket auto-reassigns to Admin.
- If the chat data fails to load → fallback message "Unable to load chat details."

### 5️⃣ Analytics

Displays key metrics in visual format (charts/graphs):

#### 5.1 Metrics

- **Average Reply Time** --- line or bar chart showing the average time taken for first response.
- **Resolved Tickets (%)** --- pie chart showing ratio of resolved vs unresolved.
- **Total Chats Till Date** --- numeric counter with date range filter.

#### Edge Cases

- If insufficient data → show "No data available yet" message.

### 6️⃣ Chat Bot Settings

Configurable options for personalizing the chat experience:

| Setting | Description |
|---------|-------------|
| **Header Color** | Customize chat box header color |
| **Background Color** | Customize main chat area background |
| **Initial Message** | Text shown to user when chat opens |
| **Intro Form Fields** | Editable labels, placeholders, and visibility of form fields |
| **Pop Message Text** | Message that appears when hovering over or near chat icon |
| **Missed Chat Timer** | Defines timeframe (e.g., 5 mins) beyond which a chat is flagged as "missed" |

#### Edge Cases

- If configuration fails to load → default values are applied.
- Invalid color code → fallback to default color scheme.

### 7️⃣ Team Management

#### 7.1 Roles

- **Admin**
  - Full access to all features.
  - Can add/edit/delete team members.
  - Can update team member roles.
- **Team Members**
  - Can edit only their **own profile**.
  - Cannot delete themselves or others.
  - Cannot modify roles or permissions.

#### 7.2 Rules

- Only **one Admin** account can exist.
- Team members:
  - Can update password and name.
  - On password change → force logout.
  - Cannot change registered email.

#### Edge Cases

- If admin deletes a team member → reassign all their tickets to Admin.
- If the admin account is deleted (should be restricted).

## ⚙️ Technical Notes

- **No Socket.io or WebSocket.** Chats and updates are handled using standard API calls (polling or manual refresh).
- **Database Structure** (example):
  - **Users**: name, email, phone, role, password, createdAt
  - **Tickets**: ticketId, userId, assignedTo, status, messages[], createdAt, updatedAt
  - **Settings**: chatBotConfig, missedChatTimer, etc.
  - **Messages**: ticketId, senderId, text, timestamp

## 🧠 Edge Case Summary

| Area | Edge Case | Expected Behavior |
|------|-----------|-------------------|
| Login | Wrong password | Show "Invalid credentials" |
| Signup | Duplicate email | Block and show "Email already exists" |
| Ticket Search | Invalid ID | Show "No ticket found" |
| Chat Load | Missing messages | Show placeholder "No messages yet" |
| Assignment | Teammate deleted | Auto-reassign to Admin |
| Password Change | For active session | Force logout and require re-login |
| Chat Settings | Invalid color code | Use default theme |
| Analytics | No data | Display "No data available" |

## 🎨 UI/UX Notes

- Clean, modern design using a consistent color palette.
- Responsive layout for desktop and mobile.
- Clear visual distinction between resolved/unresolved chats.
- Use of tooltips and hover states for clarity.
- Simple chart visuals in Analytics (bar/pie/line).

## 🔗 Links to Submit

Please provide the following **deployed and repository links**:

- 🌐 **User Side Deployed Link**
- 🧭 **Management Side Deployed Link**
- ⚙️ **Backend Deployed Link**
- 💾 **GitHub Repository Links**

> 💡 If the submission form has only **one input field**, paste **all links separated by commas**.

### ✅ Submission Format Example:

```
https://user-frontend-link.com, https://management-frontend-link.com, https://backend-link.com, https://github.com/username/project-repo
```

### 🕒 Final Reminder

- Match the Figma **exactly** --- structure, color, spacing, and assets.
- Stick **strictly** to the **given tech stack**.
- Avoid **Tailwind CSS** or **third-party UI libraries**.
- Use **Vanilla CSS** or **CSS Modules** only.
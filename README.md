# Common Table — Smart Canteen Management System

A responsive, browser-based canteen prototype built with plain HTML, CSS, and JavaScript. Browse the sample menu, make a demo account, reserve a table, build a cart, place a simulated order, and manage canteen operations from the Admin view.

## Run in VS Code

1. Open the `smart-canteen-management-system` folder in VS Code.
2. Open `index.html` in a browser, or use the **Live Server** extension and choose **Open with Live Server**.
3. No package installation or build step is required.

The sample menu uses image links from Unsplash; an internet connection is needed to load those photos. Without a connection, the rest of the app remains usable.

## Publish with GitHub Pages

In the repository, open **Settings → Pages** and set the build source to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` then deploys the static site whenever changes are pushed to `main`. After the first successful deployment, the site is available at `https://shreeja-444.github.io/canteen-management-system/`.

## Install as an app

The site is a Progressive Web App and can be installed from a supported browser when served over HTTPS (or localhost). Use **Install app** when it appears, or choose **Install** / **Add to Home Screen** in the browser menu. The app shell is cached for offline opening; menu photos and web fonts still need an internet connection.

## Try the prototype

- Browse 20 sample dishes across breakfast, Indian meals, snacks, beverages, and desserts; search/filter, sort by price, and add available food to your bag.
- Use the **Guest** button to open the dedicated sign-in page, or create an account there to reserve a table and place an order. Demo passwords are stored only in this browser; never use a real password.
- Choose takeaway, dine-in, or pre-order in the bag. Pre-orders require a pickup time at least 10 minutes ahead; regular order ready-time estimates use item prep times and the active queue. Dine-in orders need an available table. Cash orders are marked pending; UPI is marked paid as a simulation. No financial details are requested and no payment is processed.
- Follow tokens and estimated queue positions under **My orders**. Cancellation is available while an order is still Placed.
- Open **Admin** to update menu items, table availability, order statuses, service hours, and the announcement. Admin is intentionally open in this prototype and is not secure authentication.
- Use the moon control to toggle dark mode. **Reset demo data** is in Admin and erases this app's saved local demo data after confirmation.

## Data and production use

Menu edits, demo accounts, cart contents, orders, table reservations, feedback, hours, announcements, and theme preferences are stored in this browser's `localStorage`. They are not shared between devices or browsers. Queue positions, crowd levels, and ready times are estimates based on the sample queue; they are not live kitchen telemetry. Payments are simulated only.

`localStorage` is suitable for a classroom/demo prototype, not a production canteen. A production system needs a backend and database, secure authentication and authorization, server-managed table/menu inventory, server-generated queue and order updates, input validation on the server, and a compliant payment provider integration.

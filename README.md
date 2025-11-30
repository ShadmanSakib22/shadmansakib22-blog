## Blog Website - Headless WordPress

- Utilizes Next.js in the Frontend and WordPress in the Backend.
- Integrates GraphQL API for data fetching.
- The Frontend is deployed on Vercel - Live: .
- The WordPress backend is deployed on AeonFree.

## Features

- Responsive Design
- Light/Dark Mode
- Search Functionality
- Pagination
- Categories
- Tags
- Newsletter
- SEO Friendly (Metadata fetched from - Yoast, Sitemap, Robots.txt, RSS)

# Future Considerations

- Multi-language Support
- Contact Form
- Comments
- Social Media Integration

## Tech Stack

- Next.js
- Tailwind CSS
- WordPress
- GraphQL
- Vercel
- Cpanel

## Installation Instructions

1. **Create a `.env` file**  
   In the root directory of your project, create a new `.env` file.

2. **Add the following environment variable:**

   ```env
   WORDPRESS_URL="https://yourwebsite.com"

   ```

3. **Install the official WordPress GraphQl Plugin:**  
   [Official GraphQl Plugin](https://www.wpgraphql.com/)

4. **Install the project:**
   In the root directory of your project, run the following command:

`pnpm install`

5. **Run the project locally**
   In the root directory of your project, run the following command:

`pnpm dev`

Now you should be able to visit your project under: localhost:3000

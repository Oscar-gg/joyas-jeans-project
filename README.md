# Joyas Jeans

## Análisis de requerimientos de software Gpo 301

This project is a fullstack web application for a jeans store. The application allows the users to see the products, filter them, and contact the store. The application also allows the store to manage the products and order history.

### Members:

| Name                    | Email                                                               | Github                                                       | Role      |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ | --------- |
| Oscar Arreola | [oscar.arreola.jr@gmail.com](mailto:oscar.arreola.jr@gmail.com) | [@Oscar-gg](https://github.com/Oscar-gg) | Backend & frontend |
| Carolina Ochoa | [-](-) | [@Carolina8a](https://github.com/Carolina8a) |Frontend |
| Arturo Dix | [-](-) | [@-](-) | Tester, Organization contact |

## Technologies used

- [T3 Stack](https://create.t3.gg/): A fullstack template for TypeScript projects with Next.js, Prisma, and tRPC

  - [Next.js](https://nextjs.org)
  - [NextAuth.js](https://next-auth.js.org)
  - [Prisma](https://prisma.io)
  - [Tailwind CSS](https://tailwindcss.com)
  - [tRPC](https://trpc.io)

- [Vercel](https://vercel.com/): Used for deployment.

- [Coackroackdb](https://www.cockroachlabs.com/): Used to host the database.

## Considerations of current deployment

- For demonstration purposes, admin routes (/admin) can be accesed without authentication, however, some functionality may be unable to be used without admin role, such as modifying data.
- The database may be erased after some time, since it is hosted in a free tier.

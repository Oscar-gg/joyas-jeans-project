import Head from "next/head";
import { Navbar } from "~/components/layout/Navbar";
import React from "react";

export const Layout = ({
  children,
  title = "Joyas Jeans",
  description = "Página web de Joyas Jeans",
  mainClassName = "",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  mainClassName?: string;
}) => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Levi", path: "/levi" },
    { name: "Admin", path: "/admin", visibility: "admin" },
    { name: "Nosotros", path: "/nosotros"},
    { name: "AVISO", path: "/aviso"},
    { name: "contacto", path: "/contacto"},
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
          className={mainClassName}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Genos:wght@600&family=Playfair+Display&family=Raleway&family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
     
      </Head>
      <Navbar routes={routes} />
      <main>{children}</main>
    </>
  );
};

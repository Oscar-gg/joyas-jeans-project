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
    { name: "About", path: "/about" },
    { name: "Admin", path: "/admin", visibility: "admin" },
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
      </Head>
      <Navbar routes={routes} />
      <main>{children}</main>
    </>
  );
};

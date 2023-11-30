import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/Layout";

import { api } from "~/utils/api";

export default function Home() {
  const mutation = api.product.uploadData.useMutation();

  return (
    <Layout>
      <div className="flex items-center justify-center pt-3">
        <h1 className="head m-3 p-3 text-4xl font-semibold">JEAN MODEL</h1>
      </div>
    </Layout>
  );
}

"use client"
import ClientProvider from './ClientProvider';
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from '@apollo/client';
import client from '@/axios/apolloClient';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <ClientProvider >
            {children}
          </ClientProvider>
        </ApolloProvider>

      </body>
    </html>
  );
}

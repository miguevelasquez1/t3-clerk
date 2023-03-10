import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

import { api } from "../utils/api";

import "../styles/globals.css";

const publicPages : Array<string> = ['/'];

const MyApp: AppType<object> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider {...pageProps} >
      {isPublicPage ? (
          <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
              <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

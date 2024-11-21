"use client";
import { useRouter } from "next/navigation";

interface TrustedRedirectProps extends React.ComponentProps<"a"> {
  children: React.ReactNode;
  trustedDomains?: string[];
  autoInvoke?: boolean;
  redirectUrl?: string;
}

const TrustedRedirect: React.FC<TrustedRedirectProps> = ({
  trustedDomains = [],
  children,
  href,
  target,
  autoInvoke = false,
  redirectUrl = "/out-bound-redirect/",
  ...rest
}) => {
  const router = useRouter();

  const validateURL = async (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const domain = parsedUrl?.hostname;

      if (!trustedDomains?.includes(domain)) {
        return {
          valid: false,
          message: "Domain not trusted.",
          redirectDomain: url
        };
      }

      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        return { valid: false, message: "URL is not reachable." };
      }

      return { valid: true, message: "Valid URL." };
    } catch (error) {
      return { valid: false, message: "Invalid URL format." };
    }
  };

  const performRedirect = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const validation = await validateURL(href!);

    if (validation?.valid) {
      window?.open(href, target);
    } else {
      if (validation?.redirectDomain) {
        window?.sessionStorage?.setItem("url", validation.redirectDomain);
      }
      router.push(
        `${redirectUrl}?message=${encodeURIComponent(validation?.message)}`
      );
    }
  };

  if (autoInvoke && href) {
    const fakeEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    });
    performRedirect(
      fakeEvent as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>
    );
  }
  return (
    <a {...rest} href={href} onClick={performRedirect}>
      {children}
    </a>
  );
};

export default TrustedRedirect;

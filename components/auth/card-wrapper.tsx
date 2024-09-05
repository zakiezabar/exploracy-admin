"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader, 
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import Image from "next/image";

interface CardWrapperProps {
  children: React.ReactNode;
  showLogo?: boolean;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  showLogo,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-2xl shadow-primary-700/20 rounded-2xl">
      {showLogo && (
        <div className="flex justify-center pt-8">
          <Image src="/images/logo-full-primary.svg" width={300} height={200} alt="Exploracy logo"/>
        </div>
      )}
      <CardHeader>
        <Header label={headerLabel} />
        <p className="text-center text-neutral-400 text-sm mt-2">{headerDescription}</p>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonLabel && backButtonHref && (
      <CardFooter>
        <BackButton 
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
      )}
    </Card>
  );
};
import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyProps<T extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

export function TypographyH1({
  className,
  children,
  ...props
}: TypographyProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  className,
  children,
  ...props
}: TypographyProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  className,
  children,
  ...props
}: TypographyProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  className,
  children,
  ...props
}: TypographyProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TypographyP({
  className,
  children,
  ...props
}: TypographyProps<"p">) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBlockquote({
  className,
  children,
  ...props
}: TypographyProps<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function TypographyLead({
  className,
  children,
  ...props
}: TypographyProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-xl", className)} {...props}>
      {children}
    </p>
  );
}

export function TypographyLarge({
  className,
  children,
  ...props
}: TypographyProps<"div">) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  );
}

export function TypographySmall({
  className,
  children,
  ...props
}: TypographyProps<"small">) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({
  className,
  children,
  ...props
}: TypographyProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
}

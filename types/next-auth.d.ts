import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
      tenant_id?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    tenant_id?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    tenant_id?: string | null;
  }
}

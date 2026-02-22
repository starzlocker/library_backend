import type { Pool } from "pg";

declare global {
  pgPool: Pool | undefined
}

export {}
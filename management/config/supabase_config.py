import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Safety Check: Stop execution if variables failed to load
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("CRITICAL: Your system is failing to read .env variables.")

# Verify that you did not accidentally paste your database connection string here
if "postgresql" in SUPABASE_URL:
    raise ValueError("CRITICAL: Your SUPABASE_URL is wrongly mapped to a Postgres string.")

supabase_config: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


print(SUPABASE_URL)
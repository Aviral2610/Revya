function toSearchParams(query = {}) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  return params;
}

function buildClientError(message, details = {}) {
  const error = new Error(message);
  Object.assign(error, details);
  return error;
}

async function parseResponseBody(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function createSupabaseRestClient({ serviceLabel, supabaseKey, supabaseUrl }) {
  const normalizedUrl = supabaseUrl ? supabaseUrl.replace(/\/$/, "") : "";
  const baseUrl = normalizedUrl ? `${normalizedUrl}/rest/v1` : "";
  const isConfigured = Boolean(baseUrl && supabaseKey);

  async function request(path, { body, cache = "no-store", headers = {}, method = "GET", query } = {}) {
    if (!isConfigured) {
      return {
        data: null,
        error: buildClientError(`${serviceLabel} Supabase client is not configured.`)
      };
    }

    const url = new URL(`${baseUrl}${path}`);
    const params = toSearchParams(query);
    url.search = params.toString();

    const response = await fetch(url, {
      method,
      cache,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        ...headers
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    const data = await parseResponseBody(response);

    if (!response.ok) {
      return {
        data: null,
        error: buildClientError(`Supabase request failed with ${response.status}.`, {
          details: data,
          status: response.status
        })
      };
    }

    return {
      data,
      error: null
    };
  }

  return {
    isConfigured,
    from(table) {
      const encodedTable = encodeURIComponent(table);

      return {
        async select({ columns = "*", filters = {}, limit, order } = {}) {
          const query = { select: columns };

          Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") {
              return;
            }

            query[key] = `eq.${value}`;
          });

          if (typeof limit === "number") {
            query.limit = limit;
          }

          if (order?.column) {
            query.order = `${order.column}.${order.ascending === false ? "desc" : "asc"}`;
          }

          return request(`/${encodedTable}`, { query });
        },

        async maybeSingle(options = {}) {
          const result = await this.select({ ...options, limit: 1 });

          if (result.error) {
            return result;
          }

          return {
            data: Array.isArray(result.data) ? (result.data[0] ?? null) : result.data,
            error: null
          };
        },

        async upsert(values, { onConflict } = {}) {
          return request(`/${encodedTable}`, {
            method: "POST",
            query: onConflict ? { on_conflict: onConflict } : undefined,
            headers: {
              Prefer: "resolution=merge-duplicates,return=representation"
            },
            body: values
          });
        }
      };
    }
  };
}

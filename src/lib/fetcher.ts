type FetcherOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: FormData | Record<string, unknown> | null;
  isFormData?: boolean;
};

export const fetcher = async <T = unknown>(url: string, options: FetcherOptions = {}): Promise<T> => {
  const { method = 'GET', data = null, isFormData = false } = options;

  const fetchOptions: RequestInit = {
    method,
    credentials: 'include',
  };

  if (data) {
    if (isFormData && data instanceof FormData) {
      fetchOptions.body = data;
    } else if (typeof data === 'object' && data !== null) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
      };
      fetchOptions.body = JSON.stringify(data);
    }
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const { message } = await res.json();
    throw { message, status: res.status };
  }

  return res.json() as Promise<T>;
};

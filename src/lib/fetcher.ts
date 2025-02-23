type FetcherOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: FormData | Record<string, unknown> | object | null;
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

  const contentType = res.headers.get('Content-Type') || '';
  console.log(`Fetching ${url}, status: ${res.status}, content-type: ${contentType}`);

  if (!res.ok) {
    const { message } = await res.json();
    throw { message, status: res.status };
  }

  if (contentType.includes('application/json')) {
    return res.json() as Promise<T>;
  }

  if (contentType.includes('text/html')) {
    return res.text().then(text => text as unknown as T);
  }

  throw new Error(`Unsupported content type: ${contentType}`);
};

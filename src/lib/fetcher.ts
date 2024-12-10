type FetcherMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type FetcherOptions = {
  method?: FetcherMethod;
  data?: FormData | null;
  isFormData?: boolean;
};

export const fetcher = async <T = unknown>(url: string, options: FetcherOptions = {}): Promise<T> => {
  const { method = 'GET', data = null, isFormData = false } = options;

  const fetchOptions: RequestInit = {
    method,
  };

  if (data) {
    if (isFormData) {
      fetchOptions.body = data;
    } else {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
      };
      fetchOptions.body = JSON.stringify(data);
    }
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const errorText = await res.json();
    throw Object.assign(new Error(errorText.message), { status: res.status });
  }

  return res.json() as Promise<T>;
};

interface RequestLike {
  headers?: Record<string, string | string[] | undefined>;
}

interface ResponseLike {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  end: (body: string) => void;
}

const getHeader = (headers: RequestLike["headers"], name: string): string | null => {
  if (!headers) return null;
  const raw = headers[name] ?? headers[name.toLowerCase()];
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw[0] ?? null;
  return null;
};

export default function handler(req: RequestLike, res: ResponseLike) {
  const country = getHeader(req.headers, "x-vercel-ip-country");
  res.setHeader("content-type", "application/json");
  res.status(200).end(JSON.stringify({ country }));
}

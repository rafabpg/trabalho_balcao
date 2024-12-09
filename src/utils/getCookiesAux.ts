function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

interface ParsedCookie {
  [key: string]: string;
}

export function getCookieValue(cookieName: string, key: string): string | null {
  const cookieValue = getCookie(cookieName);
  if (cookieValue) {
    const parsedValue: ParsedCookie = JSON.parse(
      decodeURIComponent(cookieValue)
    );
    return parsedValue[key] || null;
  }
  return null;
}

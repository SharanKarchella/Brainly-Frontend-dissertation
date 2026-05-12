const KEY = "brainly_tags";

export function loadTagMap(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveTagMap(map: Record<string, string[]>): void {
  localStorage.setItem(KEY, JSON.stringify(map));
}

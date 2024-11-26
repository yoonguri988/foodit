const API_NUM = 1717;
export async function getFoods({ order = "", cursor = "", limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/${API_NUM}/foods?${query}`
  );
  const body = await response.json();
  return body;
}
